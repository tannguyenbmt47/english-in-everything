const els = {
  apiKey: document.getElementById("apiKey"),
  toggleKey: document.getElementById("toggleKey"),
  baseUrl: document.getElementById("baseUrl"),
  model: document.getElementById("model"),
  gradeModel: document.getElementById("gradeModel"),
  embedModel: document.getElementById("embedModel"),
  temperature: document.getElementById("temperature"),
  tempVal: document.getElementById("tempVal"),
  systemPrompt: document.getElementById("systemPrompt"),
  translatePrompt: document.getElementById("translatePrompt"),
  lookupPrompt: document.getElementById("lookupPrompt"),
  qaPrompt: document.getElementById("qaPrompt"),
  ragPrompt: document.getElementById("ragPrompt"),
  chatPrompt: document.getElementById("chatPrompt"),
  ieltsPrompt: document.getElementById("ieltsPrompt"),
  dailyGoal: document.getElementById("dailyGoal"),
  remEnabled: document.getElementById("remEnabled"),
  remList: document.getElementById("remList"),
  quizCount: document.getElementById("quizCount"),
  useDictionary: document.getElementById("useDictionary"),
  ttsProvider: document.getElementById("ttsProvider"),
  ttsVoice: document.getElementById("ttsVoice"),
  ttsModel: document.getElementById("ttsModel"),
  glossary: document.getElementById("glossary"),
  concurrency: document.getElementById("concurrency"),
  concVal: document.getElementById("concVal"),
  // Học thụ động
  gateEnabled: document.getElementById("gateEnabled"),
  gateRecall: document.getElementById("gateRecall"),
  gateColloc: document.getElementById("gateColloc"),
  gateTodo: document.getElementById("gateTodo"),
  gateJournal: document.getElementById("gateJournal"),
  gateJournalHour: document.getElementById("gateJournalHour"),
  gateMorning: document.getElementById("gateMorning"),
  gateLesson: document.getElementById("gateLesson"),
  gateStartHour: document.getElementById("gateStartHour"),
  gateVocabCount: document.getElementById("gateVocabCount"),
  gateGrammarCount: document.getElementById("gateGrammarCount"),
  gateSocial: document.getElementById("gateSocial"),
  gateSocialCount: document.getElementById("gateSocialCount"),
  gateSocialAI: document.getElementById("gateSocialAI"),
  gateSaveWrong: document.getElementById("gateSaveWrong"),
  gateLevel: document.getElementById("gateLevel"),
  gateSocialMax: document.getElementById("gateSocialMax"),
  gateSocialCooldown: document.getElementById("gateSocialCooldown"),
  gatePassMinutes: document.getElementById("gatePassMinutes"),
  gateSites: document.getElementById("gateSites"),
  gateTest: document.getElementById("gateTest"),
  gateReset: document.getElementById("gateReset"),
  gateStatus: document.getElementById("gateStatus"),
  resetPrompt: document.getElementById("resetPrompt"),
  save: document.getElementById("save"),
  status: document.getElementById("status"),
};

const GATE_DEFAULTS = {
  enabled: false,
  recallMode: true,
  collocMode: true, // từ trừu tượng hỏi bằng cụm đi chung + câu ngữ cảnh
  todoEnabled: true,
  journalEnabled: true,
  journalHour: 21,
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
  socialAI: true,
  level: "B2-C1",
  passMinutes: 0,
  socialSites: ["facebook.com", "instagram.com", "tiktok.com", "x.com", "twitter.com", "threads.net", "reddit.com"],
};

// Tự lưu thiết lập "Học thụ động" ngay khi thay đổi (không cần bấm Lưu).
function wireGateAutoSave() {
  const inputs = [
    els.gateEnabled, els.gateRecall, els.gateColloc, els.gateTodo, els.gateJournal, els.gateJournalHour,
    els.gateMorning, els.gateLesson, els.gateStartHour, els.gateVocabCount,
    els.gateGrammarCount, els.gateSocial, els.gateSocialAI, els.gateSaveWrong, els.gateSocialCount, els.gateSocialMax, els.gateSocialCooldown, els.gatePassMinutes, els.gateSites,
  ];
  inputs.forEach((inp) => {
    if (!inp) return;
    inp.addEventListener("change", async () => {
      await chrome.storage.local.set({ gateSettings: readGateSettings() });
      els.status.textContent = "✓ Đã lưu (Học thụ động)";
      els.status.className = "status ok";
      showGateStatus();
      setTimeout(() => { els.status.textContent = ""; els.status.className = "status"; }, 1800);
    });
  });
}

// Ánh xạ id textarea -> giá trị prompt mặc định.
const PROMPT_DEFAULTS = {
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  translatePrompt: DEFAULT_TRANSLATE_PROMPT,
  lookupPrompt: DEFAULT_LOOKUP_PROMPT,
  qaPrompt: DEFAULT_QA_PROMPT,
  ragPrompt: DEFAULT_RAG_PROMPT,
  chatPrompt: DEFAULT_CHAT_PROMPT,
  ieltsPrompt: DEFAULT_IELTS_PROMPT,
};

async function load() {
  const cfg = await getConfig();
  els.apiKey.value = cfg.apiKey;
  els.baseUrl.value = cfg.baseUrl;
  els.model.value = cfg.model;
  els.gradeModel.value = cfg.gradeModel;
  els.embedModel.value = cfg.embedModel;
  els.temperature.value = cfg.temperature;
  els.tempVal.textContent = cfg.temperature;
  els.systemPrompt.value = cfg.systemPrompt;
  els.translatePrompt.value = cfg.translatePrompt;
  els.lookupPrompt.value = cfg.lookupPrompt;
  els.qaPrompt.value = cfg.qaPrompt;
  els.ragPrompt.value = cfg.ragPrompt;
  els.chatPrompt.value = cfg.chatPrompt;
  els.ieltsPrompt.value = cfg.ieltsPrompt;
  els.dailyGoal.value = cfg.dailyGoal;
  await loadReminders();
  els.quizCount.value = cfg.quizCount;
  els.useDictionary.checked = cfg.useDictionary !== false;
  els.ttsProvider.value = cfg.ttsProvider || "auto";
  els.ttsVoice.value = cfg.ttsVoice || "alloy";
  els.ttsModel.value = cfg.ttsModel || "tts-1";
  els.glossary.value = (cfg.glossary || []).map((g) => `${g.en} = ${g.vi}`).join("\n");
  els.concurrency.value = cfg.concurrency || 3;
  els.concVal.textContent = cfg.concurrency || 3;

  const r = await chrome.storage.local.get("gateSettings");
  const g = { ...GATE_DEFAULTS, ...(r.gateSettings || {}) };
  els.gateEnabled.checked = !!g.enabled;
  els.gateRecall.checked = g.recallMode !== false;
  els.gateColloc.checked = g.collocMode !== false;
  els.gateTodo.checked = g.todoEnabled !== false;
  els.gateJournal.checked = g.journalEnabled !== false;
  els.gateJournalHour.value = g.journalHour ?? 21;
  els.gateMorning.checked = !!g.morningEnabled;
  els.gateLesson.checked = g.grammarLesson !== false;
  els.gateStartHour.value = g.startHour;
  els.gateVocabCount.value = g.vocabCount;
  els.gateGrammarCount.value = g.grammarCount;
  els.gateSocial.checked = !!g.socialEnabled;
  els.gateSocialCount.value = g.socialCount;
  els.gateSocialAI.checked = g.socialAI !== false;
  els.gateSaveWrong.checked = g.saveWrongVocab !== false;
  els.gateLevel.value = g.level || "B2-C1";
  els.gateSocialMax.value = g.socialMaxPerDay ?? 5;
  els.gateSocialCooldown.value = g.socialCooldownMin ?? 120;
  els.gatePassMinutes.value = g.passMinutes;
  els.gateSites.value = (g.socialSites || []).join("\n");
}

// ---------- Nhắc việc hằng ngày ----------
// Giữ khớp với REMINDER_DEFAULT trong background.js — lệch nhau thì trang cấu
// hình hiện một đằng, service worker lên lịch một nẻo.
const REMINDER_DEFAULT = { enabled: false, items: [] };
async function loadReminders() {
  const r = await chrome.storage.local.get("reminders");
  const rem = r.reminders || REMINDER_DEFAULT;
  els.remEnabled.checked = rem.enabled !== false;
  els.remList.value = (rem.items || [])
    .map((it) => `${it.time} | ${it.text}${it.awayMin ? " | " + it.awayMin : ""}`)
    .join("\n");
}
function readReminders() {
  const items = els.remList.value
    .split("\n")
    .map((line) => {
      const m = line.match(/^\s*(\d{1,2}):(\d{2})\s*[|\-–]\s*(.*)$/);
      if (!m) return null;
      const h = Math.min(23, parseInt(m[1], 10));
      const mm = Math.min(59, parseInt(m[2], 10));
      // Phần sau có thể là "nội dung | số phút chặn".
      const parts = m[3].split("|").map((x) => x.trim());
      const text = parts[0];
      const awayMin = Math.max(0, Math.min(240, parseInt(parts[1], 10) || 0));
      return text ? { time: `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`, text, awayMin } : null;
    })
    .filter(Boolean);
  return { enabled: els.remEnabled.checked, items };
}

function readGateSettings() {
  const num = (input, def, min, max) => {
    const v = parseInt(input.value, 10);
    return isNaN(v) ? def : Math.min(max, Math.max(min, v));
  };
  return {
    enabled: els.gateEnabled.checked,
    recallMode: els.gateRecall.checked,
    collocMode: els.gateColloc.checked,
    todoEnabled: els.gateTodo.checked,
    journalEnabled: els.gateJournal.checked,
    journalHour: num(els.gateJournalHour, GATE_DEFAULTS.journalHour, 0, 23),
    morningEnabled: els.gateMorning.checked,
    grammarLesson: els.gateLesson.checked,
    startHour: num(els.gateStartHour, GATE_DEFAULTS.startHour, 0, 23),
    vocabCount: num(els.gateVocabCount, GATE_DEFAULTS.vocabCount, 0, 200),
    grammarCount: num(els.gateGrammarCount, GATE_DEFAULTS.grammarCount, 0, 50),
    socialEnabled: els.gateSocial.checked,
    socialCount: num(els.gateSocialCount, GATE_DEFAULTS.socialCount, 1, 20),
    socialAI: els.gateSocialAI.checked,
    saveWrongVocab: els.gateSaveWrong.checked,
    level: els.gateLevel.value || GATE_DEFAULTS.level,
    socialMaxPerDay: num(els.gateSocialMax, GATE_DEFAULTS.socialMaxPerDay, 1, 50),
    socialCooldownMin: num(els.gateSocialCooldown, GATE_DEFAULTS.socialCooldownMin, 0, 720),
    passMinutes: num(els.gatePassMinutes, GATE_DEFAULTS.passMinutes, 0, 240),
    socialSites: els.gateSites.value.split("\n").map((s) => s.trim().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "")).filter(Boolean),
  };
}

els.toggleKey.addEventListener("click", () => {
  const isPwd = els.apiKey.type === "password";
  els.apiKey.type = isPwd ? "text" : "password";
  els.toggleKey.textContent = isPwd ? "Ẩn" : "Hiện";
});

els.temperature.addEventListener("input", () => {
  els.tempVal.textContent = els.temperature.value;
});
els.concurrency.addEventListener("input", () => {
  els.concVal.textContent = els.concurrency.value;
});

els.resetPrompt.addEventListener("click", () => {
  els.systemPrompt.value = DEFAULT_SYSTEM_PROMPT;
});

// Thử ngay: lưu thiết lập rồi mở trang khóa để xem giao diện/luồng học.
els.gateTest.addEventListener("click", async () => {
  await chrome.storage.local.set({ gateSettings: readGateSettings() });
  chrome.tabs.create({ url: chrome.runtime.getURL("gate.html?mode=morning&next=") });
});

// Đặt lại trạng thái: coi như hôm nay chưa học, xóa vé mạng xã hội -> chặn lại ngay.
els.gateReset.addEventListener("click", async () => {
  await chrome.storage.local.set({ gateState: { morningDoneDate: "", socialPassUntil: 0, morningSnoozeUntil: 0 } });
  await showGateStatus();
});

// Hiển thị trạng thái hiện tại để tự chẩn đoán.
async function showGateStatus() {
  const r = await chrome.storage.local.get(["gateSettings", "gateState"]);
  const g = { ...GATE_DEFAULTS, ...(r.gateSettings || {}) };
  const st = r.gateState || {};
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const lines = [
    `Bật chặn: ${g.enabled ? "CÓ" : "KHÔNG"}`,
    `Cổng hằng ngày: ${g.morningEnabled ? "bật" : "tắt"} · chỉ chặn từ ${g.startHour}h (bây giờ ${d.getHours()}h)`,
    `Hôm nay (${today}) đã học xong: ${st.morningDoneDate === today ? "RỒI → không chặn" : "CHƯA → sẽ chặn"}`,
    `Vé mạng xã hội: ${st.socialPassUntil && st.socialPassUntil > Date.now()
      ? "còn " + Math.ceil((st.socialPassUntil - Date.now()) / 60000) + " phút"
      : "không có"}`,
  ];
  els.gateStatus.textContent = lines.join("\n");
}

// Nút khôi phục mặc định cho từng prompt phụ.
document.querySelectorAll("[data-reset]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.reset;
    if (els[id] && PROMPT_DEFAULTS[id]) els[id].value = PROMPT_DEFAULTS[id];
  });
});

els.save.addEventListener("click", async () => {
  const baseUrl = els.baseUrl.value.trim().replace(/\/+$/, "") || DEFAULT_CONFIG.baseUrl;
  await saveConfig({
    apiKey: els.apiKey.value.trim(),
    baseUrl,
    model: els.model.value.trim() || DEFAULT_CONFIG.model,
    gradeModel: els.gradeModel.value.trim(),
    embedModel: els.embedModel.value.trim() || DEFAULT_CONFIG.embedModel,
    temperature: parseFloat(els.temperature.value),
    systemPrompt: els.systemPrompt.value,
    translatePrompt: els.translatePrompt.value,
    lookupPrompt: els.lookupPrompt.value,
    qaPrompt: els.qaPrompt.value,
    ragPrompt: els.ragPrompt.value,
    chatPrompt: els.chatPrompt.value,
    ieltsPrompt: els.ieltsPrompt.value,
    dailyGoal: Math.max(5, parseInt(els.dailyGoal.value, 10) || DEFAULT_CONFIG.dailyGoal),
    quizCount: Math.min(100, Math.max(1, parseInt(els.quizCount.value, 10) || DEFAULT_CONFIG.quizCount)),
    useDictionary: els.useDictionary.checked,
    ttsProvider: els.ttsProvider.value,
    ttsVoice: els.ttsVoice.value.trim() || DEFAULT_CONFIG.ttsVoice,
    ttsModel: els.ttsModel.value.trim() || DEFAULT_CONFIG.ttsModel,
    glossary: els.glossary.value
      .split("\n")
      .map((line) => {
        const i = line.indexOf("=");
        if (i < 0) return null;
        const en = line.slice(0, i).trim();
        const vi = line.slice(i + 1).trim();
        return en && vi ? { en, vi } : null;
      })
      .filter(Boolean),
    concurrency: parseInt(els.concurrency.value, 10) || DEFAULT_CONFIG.concurrency,
  });
  await chrome.storage.local.set({ gateSettings: readGateSettings() });
  await chrome.storage.local.set({ reminders: readReminders() });
  els.baseUrl.value = baseUrl;
  els.status.textContent = "✓ Đã lưu";
  els.status.className = "status ok";
  setTimeout(() => {
    els.status.textContent = "";
    els.status.className = "status";
  }, 2000);
});

load().then(() => { wireGateAutoSave(); showGateStatus(); });
