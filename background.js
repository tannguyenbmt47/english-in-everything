// Service worker: mở side panel, xử lý dịch/tra nghĩa/lưu từ vựng cho content
// script (trang web bất kỳ) và context menu.
importScripts("config.js", "translator.js", "vocab.js", "notes.js", "todo.js", "cache.js");

// Dọn cache bản dịch quá hạn (>3 tuần) khi service worker khởi động.
trCachePurge();

// Phím tắt: mở nhanh side panel / dịch đoạn đang bôi đen.
chrome.commands.onCommand.addListener(async (command, tab) => {
  try {
    if (command === "open-panel") {
      const windowId = tab?.windowId ?? (await chrome.windows.getLastFocused()).id;
      await chrome.sidePanel.open({ windowId });
    } else if (command === "translate-selection" && tab?.id) {
      chrome.tabs.sendMessage(tab.id, { type: "pvt-translate-selection" }).catch(() => {});
    }
  } catch (err) {
    console.error("command " + command + ":", err);
  }
});

// ============================================================
// NHẮC VIỆC HẰNG NGÀY — thông báo hệ thống đúng giờ đã đặt (mặc định 11h).
// ============================================================
const REMINDER_DEFAULT = { enabled: true, items: [{ time: "11:00", text: "Task cứng hằng ngày — bắt tay làm ngay!" }] };

async function getReminders() {
  const r = await chrome.storage.local.get("reminders");
  return r.reminders || REMINDER_DEFAULT;
}

// Đặt lại toàn bộ báo thức nhắc việc theo cấu hình.
async function scheduleReminders() {
  const all = await chrome.alarms.getAll();
  await Promise.all(all.filter((a) => a.name.startsWith("rem:")).map((a) => chrome.alarms.clear(a.name)));
  const rem = await getReminders();
  if (!rem.enabled) return;
  (rem.items || []).forEach((it, i) => {
    const [h, m] = String(it.time || "11:00").split(":").map((x) => parseInt(x, 10) || 0);
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
    chrome.alarms.create("rem:" + i, { when: next.getTime(), periodInMinutes: 1440 });
  });
}
chrome.runtime.onInstalled.addListener(scheduleReminders);
chrome.runtime.onStartup.addListener(scheduleReminders);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.reminders) scheduleReminders();
});
scheduleReminders();

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (!alarm.name.startsWith("rem:")) return;
  const rem = await getReminders();
  const it = (rem.items || [])[parseInt(alarm.name.slice(4), 10)];
  if (!it) return;

  // Bỏ qua lần BẮN BÙ (khi trình duyệt đóng lúc đến giờ, Chrome bắn trễ khi mở
  // lại). Chỉ kích hoạt nếu đang trong khoảng ±30 phút quanh giờ đã hẹn.
  const [hh, mm] = String(it.time || "0:0").split(":").map((x) => parseInt(x, 10) || 0);
  const sched = new Date();
  sched.setHours(hh, mm, 0, 0);
  let diff = Date.now() - sched.getTime();
  if (diff < -12 * 3600000) diff += 24 * 3600000;   // giờ hẹn là hôm qua
  else if (diff > 12 * 3600000) diff -= 24 * 3600000; // giờ hẹn là ngày mai
  if (Math.abs(diff) > 30 * 60000) { scheduleReminders(); return; }

  const text = it.text || "Đến giờ làm việc đã định!";
  const awayMin = Math.max(0, parseInt(it.awayMin, 10) || 0);

  // Đặt cờ CHẶN toàn màn hình. Có thời lượng -> khóa tới khi hết giờ (bắt rời máy).
  await chrome.storage.local.set({
    reminderPending: { text, ts: Date.now(), awayUntil: awayMin ? Date.now() + awayMin * 60000 : 0 },
  });

  // Chuyển ngay tab đang mở sang trang nhắc (chặn), kèm thông báo hệ thống.
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id && /^https?:\/\//i.test(tab.url || "")) {
      const gateBase = chrome.runtime.getURL("gate.html");
      chrome.tabs.update(tab.id, { url: `${gateBase}?mode=reminder&next=${encodeURIComponent(tab.url)}` }).catch(() => {});
    }
  } catch {}
  chrome.notifications.create("rem-" + Date.now(), {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/icon128.png"),
    title: "⏰ Đến giờ làm việc!",
    message: text,
    priority: 2,
    requireInteraction: true,
  });
});

chrome.notifications.onClicked.addListener((id) => { if (id.startsWith("rem-")) chrome.notifications.clear(id); });

// ============================================================
// POMODORO — đồng hồ chạy nền, đếm ngược trên BADGE icon (không chiếm màn hình).
// ============================================================
async function getPomo() {
  const r = await chrome.storage.local.get("pomo");
  return r.pomo || { running: false, phase: "work", endsAt: 0, pausedLeft: 0, workMin: 25, breakMin: 5, round: 0 };
}
async function setPomo(p) { await chrome.storage.local.set({ pomo: p }); }

async function pomoUpdateBadge() {
  const p = await getPomo();
  if (!p.running) {
    chrome.action.setBadgeText({ text: "" });
    chrome.action.setTitle({ title: "English in Everything" });
    return;
  }
  const mins = Math.max(0, Math.ceil((p.endsAt - Date.now()) / 60000));
  chrome.action.setBadgeText({ text: String(mins) });
  chrome.action.setBadgeBackgroundColor({ color: p.phase === "work" ? "#dc2626" : "#16a34a" });
  const label = p.phase === "work" ? "🎯 " + (p.task || "Tập trung") : "☕ Nghỉ";
  chrome.action.setTitle({ title: `${label} · còn ${mins} phút` });
}
async function pomoArm(p) {
  await chrome.alarms.clear("pomo-end");
  await chrome.alarms.clear("pomo-badge");
  if (p.running) {
    chrome.alarms.create("pomo-end", { when: p.endsAt });
    chrome.alarms.create("pomo-badge", { periodInMinutes: 0.5 });
  }
  await pomoUpdateBadge();
}

// Điều khiển từ side panel.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.pomo) return; // chỉ xử lý message pomodoro
  (async () => {
    let p = await getPomo();
    const dur = (phase) => (phase === "break" ? p.breakMin : p.workMin) * 60000;
    if (typeof msg.workMin === "number") p.workMin = Math.max(1, Math.min(120, msg.workMin));
    if (typeof msg.breakMin === "number") p.breakMin = Math.max(1, Math.min(60, msg.breakMin));
    if (typeof msg.task === "string") p.task = msg.task.slice(0, 120);

    if (msg.pomo === "start") {
      const left = p.pausedLeft > 0 ? p.pausedLeft : dur(p.phase);
      p.running = true; p.endsAt = Date.now() + left; p.pausedLeft = 0;
    } else if (msg.pomo === "pause") {
      if (p.running) { p.pausedLeft = Math.max(0, p.endsAt - Date.now()); p.running = false; }
    } else if (msg.pomo === "reset") {
      p.running = false; p.phase = "work"; p.pausedLeft = 0; p.endsAt = 0; p.round = 0;
    } else if (msg.pomo === "skip") {
      p.phase = p.phase === "work" ? "break" : "work"; p.pausedLeft = 0;
      p.endsAt = Date.now() + dur(p.phase); // giữ trạng thái running như cũ
      if (!p.running) p.pausedLeft = dur(p.phase);
    }
    await setPomo(p);
    await pomoArm(p);
    sendResponse({ ok: true, state: p });
  })();
  return true;
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "pomo-badge") { pomoUpdateBadge(); return; }
  if (alarm.name !== "pomo-end") return;
  const p = await getPomo();
  if (!p.running) return;
  const finishedWork = p.phase === "work";
  p.phase = finishedWork ? "break" : "work";
  if (finishedWork) p.round = (p.round || 0) + 1;
  p.endsAt = Date.now() + (p.phase === "break" ? p.breakMin : p.workMin) * 60000;
  await setPomo(p);
  await pomoArm(p);
  chrome.notifications.create("pomo-" + Date.now(), {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icons/icon128.png"),
    title: finishedWork ? "🍅 Hết phiên làm — nghỉ thôi!" : "⏱️ Hết giờ nghỉ — vào việc!",
    message: finishedWork
      ? `Nghỉ ${p.breakMin} phút. Đã xong ${p.round} phiên${p.task ? " · " + p.task : ""}.`
      : `Tập trung ${p.workMin} phút${p.task ? ": " + p.task : ""}.`,
    priority: 2,
  });
});

// Mở Side Panel khi bấm icon extension.
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((err) => console.error("setPanelBehavior:", err));

// Menu chuột phải khi bôi đen văn bản. Tạo lại an toàn (removeAll trước) để
// tránh lỗi trùng id khi reload, và đăng ký cả khi khởi động trình duyệt.
function setupContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({ id: "pvt-translate", title: "Dịch sang tiếng Việt", contexts: ["selection"] });
    chrome.contextMenus.create({ id: "pvt-vocab", title: "Lưu vào từ vựng", contexts: ["selection"] });
  });
}
chrome.runtime.onInstalled.addListener(setupContextMenus);
chrome.runtime.onStartup.addListener(setupContextMenus);
setupContextMenus();

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = (info.selectionText || "").trim();
  if (!text || !tab?.id) return;
  try {
    const config = await requireConfig();
    if (info.menuItemId === "pvt-translate") {
      const translated = await runWithTimeout((signal) => translatePlain({ config, text, signal }), 30000);
      sendToTab(tab.id, { type: "pvt-show-result", title: "Bản dịch", text: translated, term: text });
    } else if (info.menuItemId === "pvt-vocab") {
      await addVocab({ term: text, meaning: "", source: tab.url }); // lưu ngay
      sendToTab(tab.id, { type: "pvt-toast", text: `✓ Đã lưu: ${text} — đang tra nghĩa…` });
      const entry = await lookupEntry(config, text, "");
      await addVocab({ term: text, source: tab.url, ...entry });
      sendToTab(tab.id, { type: "pvt-toast", text: `📖 ${text}${entry.phonetic ? " " + entry.phonetic : ""}: ${entry.meaning}` });
    }
  } catch (err) {
    sendToTab(tab.id, { type: "pvt-toast", text: "⚠️ " + err.message });
  }
});

// Chạy một tác vụ có giới hạn thời gian; hết giờ sẽ hủy và báo lỗi rõ ràng.
function runWithTimeout(fn, ms) {
  const controller = new AbortController();
  const timeout = new Promise((_, reject) =>
    setTimeout(() => {
      controller.abort();
      reject(new Error(`Quá thời gian chờ máy chủ (${Math.round(ms / 1000)}s). Kiểm tra mạng, API key hoặc thử model khác.`));
    }, ms)
  );
  return Promise.race([Promise.resolve(fn(controller.signal)), timeout]);
}

// Nhận yêu cầu từ content script / side panel.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    try {
      const config = await requireConfig();
      if (msg.type === "translate") {
        const cached = await trCacheGet("plain", config.model, config.translatePrompt, msg.text);
        if (cached) { sendResponse({ ok: true, text: cached, cached: true }); return; }
        const text = await runWithTimeout((signal) => translatePlain({ config, text: msg.text, signal }), 30000);
        trCacheSet("plain", config.model, config.translatePrompt, msg.text, "", text);
        sendResponse({ ok: true, text });
      } else if (msg.type === "lookup") {
        const meaning = await cachedMeaning(config, msg.term, msg.context);
        sendResponse({ ok: true, meaning });
      } else if (msg.type === "lookupMany") {
        const map = await cachedMeaningMany(config, msg.items || []);
        sendResponse({ ok: true, meanings: Object.fromEntries(map) });
      } else if (msg.type === "collocations") {
        const map = await ensureCollocations(config, msg.terms || []);
        sendResponse({ ok: true, items: Object.fromEntries(map) });
      } else if (msg.type === "compare") {
        const text = await cachedCompare(config, msg.a, msg.b);
        sendResponse({ ok: true, text });
      } else if (msg.type === "mnemonic") {
        const mnemonic = await stubbornWordTip(config, msg.term);
        sendResponse({ ok: true, mnemonic });
      } else if (msg.type === "lookupWord") {
        // Tra cứu đầy đủ (không lưu) cho công cụ Tra cứu.
        const entry = await lookupEntry(config, msg.term, msg.context);
        sendResponse({ ok: true, entry });
      } else if (msg.type === "saveVocab") {
        // Lưu NGAY để không mất từ; phản hồi tức thì.
        await addVocab({ term: msg.term, meaning: msg.meaning || "", context: msg.context, source: msg.source });
        sendResponse({ ok: true, meaning: msg.meaning || "", pending: !msg.meaning });
        // Tra cứu ở nền (nghĩa + từ điển) rồi cập nhật + báo lại cho tab.
        if (!msg.meaning) {
          try {
            const entry = await lookupEntry(config, msg.term, msg.context);
            await addVocab({ term: msg.term, context: msg.context, source: msg.source, ...entry });
            if (sender.tab?.id) sendToTab(sender.tab.id, { type: "pvt-vocab-updated", term: msg.term, ...entry });
          } catch (e) {
            if (sender.tab?.id) sendToTab(sender.tab.id, { type: "pvt-vocab-updated", term: msg.term, meaning: "(chưa tra được nghĩa — " + e.message + ")" });
          }
        }
      } else {
        sendResponse({ ok: false, error: "Loại yêu cầu không hợp lệ." });
      }
    } catch (err) {
      try { sendResponse({ ok: false, error: err.message }); } catch {}
    }
  })();
  return true; // giữ kênh mở cho phản hồi bất đồng bộ
});

async function requireConfig() {
  const config = await getConfig();
  if (!config.apiKey) throw new Error("Chưa cấu hình OpenAI API Key (mở ⚙️ trong extension).");
  return config;
}

// Tra cứu đầy đủ một từ: nghĩa tiếng Việt (LLM) + phiên âm/audio/định nghĩa (Free Dictionary API).
// ============================================================
// Tra nghĩa TIẾT KIỆM: cache lại (nghĩa của một từ trong một ngữ cảnh không đổi)
// và gom nhiều từ vào MỘT lượt gọi. Cùng model + cùng prompt + cùng ngữ cảnh thì
// kết quả y hệt, nên cache không làm giảm độ chính xác.
// ============================================================
async function cachedMeaning(config, term, context) {
  const t = String(term || "").trim();
  if (!t) return "";
  const prompt = config.lookupPrompt || "";
  const hit = await trCacheGet("mean", config.model, prompt, t, context || "");
  if (hit) return hit;
  const meaning = await runWithTimeout((signal) => lookupMeaning({ config, term: t, context, signal }), 30000);
  if (meaning) await trCacheSet("mean", config.model, prompt, t, context || "", meaning);
  return meaning;
}

const MEANING_BATCH = 25; // đủ lớn để tiết kiệm, đủ nhỏ để model không bỏ sót mục

async function cachedMeaningMany(config, items) {
  const prompt = config.lookupPrompt || "";
  const out = new Map();
  const miss = [];
  for (const it of items) {
    const term = String(it?.term || "").trim();
    if (!term || out.has(term.toLowerCase())) continue;
    const hit = await trCacheGet("mean", config.model, prompt, term, it.context || "");
    if (hit) out.set(term.toLowerCase(), hit);
    else miss.push({ term, context: it.context || "" });
  }
  for (let i = 0; i < miss.length; i += MEANING_BATCH) {
    const chunk = miss.slice(i, i + MEANING_BATCH);
    const got = await runWithTimeout((signal) => lookupMeaningBatch({ config, items: chunk, signal }), 60000)
      .catch(() => new Map());
    for (const it of chunk) {
      const m = got.get(it.term.toLowerCase());
      if (!m) continue;
      out.set(it.term.toLowerCase(), m);
      await trCacheSet("mean", config.model, prompt, it.term, it.context, m);
    }
  }
  return out;
}

// Cụm đi chung của từ trừu tượng: lưu thẳng vào mục từ vựng (collocs/cloze) nên
// mỗi từ chỉ sinh một lần trong đời; cả phiên gom vào một lượt gọi.
const COLLOC_BATCH = 12;

async function ensureCollocations(config, terms) {
  const list = await getVocab();
  const out = new Map();
  const miss = [];
  for (const t of terms) {
    const v = list.find((x) => x.term.toLowerCase() === String(t).trim().toLowerCase());
    if (!v) continue;
    if (Array.isArray(v.collocs) && v.collocs.length) {
      out.set(v.term.toLowerCase(), { collocs: v.collocs, cloze: v.cloze || "", clozeVi: v.clozeVi || "" });
    } else if (!miss.some((x) => x.term.toLowerCase() === v.term.toLowerCase())) {
      miss.push({ term: v.term, meaning: v.meaning });
    }
  }
  for (let i = 0; i < miss.length; i += COLLOC_BATCH) {
    const chunk = miss.slice(i, i + COLLOC_BATCH);
    const got = await runWithTimeout((signal) => generateCollocations({ config, items: chunk, signal }), 60000)
      .catch(() => new Map());
    for (const it of chunk) {
      const data = got.get(it.term.toLowerCase());
      if (!data) continue;
      out.set(it.term.toLowerCase(), data);
      await addVocab({ term: it.term, collocs: data.collocs, cloze: data.cloze, clozeVi: data.clozeVi });
    }
  }
  return out;
}

// Phân biệt một CẶP từ: cache theo cặp (đã sắp xếp) nên nhầm đi nhầm lại bao
// nhiêu lần cũng chỉ tốn đúng một lượt gọi.
async function cachedCompare(config, a, b) {
  const x = String(a || "").trim().toLowerCase();
  const y = String(b || "").trim().toLowerCase();
  if (!x || !y || x === y) return "";
  const pair = [x, y].sort().join(" | ");
  const hit = await trCacheGet("cmp", config.model, "compare", pair);
  if (hit) return hit;
  const text = String(
    await runWithTimeout((signal) => compareWords({ config, a: x, b: y, signal }), 30000)
  ).trim();
  if (text) await trCacheSet("cmp", config.model, "compare", pair, "", text);
  return text;
}

// Mẹo nhớ cho từ hay sai: sinh MỘT LẦN rồi lưu thẳng vào mục từ vựng — lần gặp
// sau lấy lại từ kho, không gọi API nữa.
async function stubbornWordTip(config, term) {
  const t = String(term || "").trim();
  if (!t) return "";
  const list = await getVocab();
  const v = list.find((x) => x.term.toLowerCase() === t.toLowerCase());
  if (v?.mnemonic) return v.mnemonic;

  const mnemonic = await runWithTimeout(
    (signal) => generateMnemonic({ config, term: t, meaning: v?.meaning, definition: v?.definition, signal }),
    30000
  );
  const text = String(mnemonic || "").trim();
  if (text && v) await addVocab({ term: v.term, mnemonic: text });
  return text;
}

async function lookupEntry(config, term, context) {
  const useDict = config.useDictionary !== false;
  const [meaning, dict] = await Promise.all([
    cachedMeaning(config, term, context).catch(() => ""),
    useDict ? runWithTimeout((s) => fetchDictionary(term, s), 12000).catch(() => null) : Promise.resolve(null),
  ]);
  const first = dict?.meanings?.[0];
  return {
    meaning: meaning || "",
    phonetic: dict?.phonetic || "",
    audio: dict?.audio || "",
    pos: first?.pos || "",
    definition: first?.definition || "",
    example: first?.example || "",
  };
}

function sendToTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, message).catch(() => {});
}

// ============================================================
// HỌC THỤ ĐỘNG — chặn duyệt web cho tới khi hoàn thành phiên học.
// ============================================================
const GATE_DEFAULTS = {
  enabled: false,
  todoEnabled: true,      // bắt lập danh sách việc TRƯỚC
  journalEnabled: true,   // bắt viết nhật ký buổi tối
  journalHour: 21,        // 21h = 9h tối
  morningEnabled: true,
  grammarLesson: true, // đầu ngày học 1 bài ngữ pháp chi tiết trước khi kiểm tra
  startHour: 5,
  vocabCount: 30,
  grammarCount: 12,
  saveWrongVocab: true, // tự lưu từ sai khi lướt MXH vào kho
  socialEnabled: true,
  socialCount: 3,
  socialMaxPerDay: 5,
  socialCooldownMin: 120, // trả bài xong -> rảnh bao nhiêu phút mới khóa lại
  passMinutes: 20,
  socialSites: ["facebook.com", "instagram.com", "tiktok.com", "x.com", "twitter.com", "threads.net", "reddit.com"],
};

async function getGateSettings() {
  const r = await chrome.storage.local.get("gateSettings");
  return { ...GATE_DEFAULTS, ...(r.gateSettings || {}) };
}
async function getGateState() {
  const r = await chrome.storage.local.get("gateState");
  return r.gateState || { morningDoneDate: "", socialPassUntil: 0, morningSnoozeUntil: 0 };
}
// Ngày cần viết nhật ký: các ngày trước còn thiếu (tối đa 7) + hôm nay nếu đã qua journalHour.
function gDateStr(offsetDays) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
async function journalRequiredDates(s) {
  const list = await getJournal();
  const have = new Set(list.map((j) => j.date));
  const r = await chrome.storage.local.get("journalStart");
  let start = r.journalStart;
  if (!start) { start = todayStr(); await chrome.storage.local.set({ journalStart: start }); }

  const req = [];
  for (let i = 7; i >= 1; i--) {
    const d = gDateStr(-i);
    if (d >= start && !have.has(d)) req.push(d);
  }
  const t = todayStr();
  if (new Date().getHours() >= (s.journalHour ?? 21) && t >= start && !have.has(t)) req.push(t);
  return req;
}

// Trả về tên miền mạng xã hội khớp (hoặc null nếu không phải).
function matchedSocialSite(url, sites) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    return sites.find((d) => h === d || h.endsWith("." + d)) || null;
  } catch { return null; }
}

// Kiểm tra & chặn một tab. Dùng cho cả khi điều hướng lẫn khi chuyển tab.
async function maybeGate(tabId, url) {
  if (!url || !/^https?:\/\//i.test(url)) return;
  const gateBase = chrome.runtime.getURL("gate.html");
  if (url.startsWith(gateBase)) return;

  // Nhắc việc đang chờ -> CHẶN mọi trang (độc lập với cổng học), cho tới khi xác nhận.
  // Nếu có thời lượng "rời máy" và đã hết giờ -> tự gỡ chặn.
  const rp = (await chrome.storage.local.get("reminderPending")).reminderPending;
  if (rp) {
    if (rp.awayUntil && Date.now() >= rp.awayUntil) {
      await chrome.storage.local.remove("reminderPending");
    } else {
      chrome.tabs.update(tabId, { url: `${gateBase}?mode=reminder&next=${encodeURIComponent(url)}` }).catch(() => {});
      return;
    }
  }

  const s = await getGateSettings();
  if (!s.enabled) return;
  const st = await getGateState();
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // 0) VIỆC CẦN LÀM — bắt lập danh sách trước tiên trong ngày.
  if (
    s.todoEnabled &&
    now.getHours() >= s.startHour &&
    st.todoDoneDate !== today &&
    Date.now() > (st.morningSnoozeUntil || 0)
  ) {
    chrome.tabs.update(tabId, { url: `${gateBase}?mode=todo&next=${encodeURIComponent(url)}` }).catch(() => {});
    return;
  }

  // 1) Cổng HẰNG NGÀY: chặn SUỐT CẢ NGÀY cho tới khi hoàn thành phiên học của ngày đó.
  if (
    s.morningEnabled &&
    now.getHours() >= s.startHour &&
    st.morningDoneDate !== today &&
    Date.now() > (st.morningSnoozeUntil || 0)
  ) {
    chrome.tabs.update(tabId, { url: `${gateBase}?mode=morning&next=${encodeURIComponent(url)}` }).catch(() => {});
    return;
  }

  // 1.5) NHẬT KÝ: từ journalHour (mặc định 21h) hoặc còn nợ ngày trước -> bắt viết.
  if (s.journalEnabled && Date.now() > (st.morningSnoozeUntil || 0) && (await journalRequiredDates(s)).length) {
    chrome.tabs.update(tabId, { url: `${gateBase}?mode=journal&next=${encodeURIComponent(url)}` }).catch(() => {});
    return;
  }

  // 2) Cổng mạng xã hội: trả bài xong thì RẢNH trong khoảng cooldown (mặc định 2h),
  // hết cooldown mới khóa lại. Cũng dừng khóa khi đã đủ hạn mức số lần/ngày.
  if (s.socialEnabled && matchedSocialSite(url, s.socialSites)) {
    const usedToday = st.socialGateDate === today ? st.socialGateCount || 0 : 0;
    const quotaLeft = usedToday < (s.socialMaxPerDay ?? 5);
    const inCooldown = Date.now() < (st.socialCooldownUntil || 0);
    if (quotaLeft && !inCooldown) {
      chrome.tabs.update(tabId, { url: `${gateBase}?mode=social&next=${encodeURIComponent(url)}` }).catch(() => {});
    }
  }
}

// Khi điều hướng sang URL mới. Một số trình duyệt (Brave) không luôn trả
// changeInfo.url -> lấy dự phòng từ đối tượng tab khi trang bắt đầu tải.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const url = changeInfo.url || (changeInfo.status === "loading" ? tab?.url : null);
  if (url) maybeGate(tabId, url);
});

// Khi chuyển sang tab đã mở sẵn (nếu không có, người dùng chỉ cần đổi tab là lách được).
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try {
    const tab = await chrome.tabs.get(tabId);
    maybeGate(tabId, tab.url);
  } catch { /* tab đã đóng */ }
});

// Khi cửa sổ được focus lại (quay lại trình duyệt sau khi làm việc khác).
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  try {
    const [tab] = await chrome.tabs.query({ active: true, windowId });
    if (tab) maybeGate(tab.id, tab.url);
  } catch { /* bỏ qua */ }
});
