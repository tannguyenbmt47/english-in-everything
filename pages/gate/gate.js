// ============================================================
// gate.js — Trang "khóa" học thụ động. Người dùng phải hoàn thành phiên học
// (từ vựng + ngữ pháp buổi sáng, hoặc câu hỏi IELTS khi vào mạng xã hội)
// trước khi được đi tiếp. Câu sai bị đẩy lại cuối hàng đợi.
// ============================================================

// Trang này không bao giờ được chạy trong iframe: nếu còn nằm trong
// web_accessible_resources, một trang bất kỳ có thể nhúng nó để tự chạy phiên
// học ngầm (đốt API key của người dùng) hoặc clickjacking nút "Bỏ qua".
if (window.top !== window.self) {
  document.documentElement.remove();
  throw new Error("gate.html không được phép chạy trong iframe");
}

const params = new URLSearchParams(location.search);
const VALID_MODES = ["morning", "social", "todo", "journal", "reminder"];
const MODE = VALID_MODES.includes(params.get("mode")) ? params.get("mode") : "morning";
// Chỉ nhận http(s): tránh biến trang chặn thành bàn đạp chuyển hướng tùy ý.
const NEXT_RAW = params.get("next") || "";
const NEXT = /^https?:\/\//i.test(NEXT_RAW) ? NEXT_RAW : "";

const el = {
  title: document.getElementById("gTitle"),
  sub: document.getElementById("gSub"),
  skip: document.getElementById("gSkip"),
  bar: document.getElementById("gBar"),
  count: document.getElementById("gCount"),
  card: document.getElementById("gCard"),
  startPane: document.getElementById("gStart"),
  startInfo: document.getElementById("gStartInfo"),
  countOpts: document.getElementById("gCountOpts"),
  startBtn: document.getElementById("gStartBtn"),
  lessonPane: document.getElementById("gLesson"),
  lessonTitle: document.getElementById("gLessonTitle"),
  lessonBody: document.getElementById("gLessonBody"),
  lessonDone: document.getElementById("gLessonDone"),
  remPane: document.getElementById("gReminder"),
  remText: document.getElementById("gRemText"),
  remDone: document.getElementById("gRemDone"),
  todoPane: document.getElementById("gTodo"),
  todoInput: document.getElementById("gTodoInput"),
  todoAdd: document.getElementById("gTodoAdd"),
  todoList: document.getElementById("gTodoList"),
  todoHint: document.getElementById("gTodoHint"),
  todoDone: document.getElementById("gTodoDone"),
  jrPane: document.getElementById("gJournal"),
  jrDate: document.getElementById("gJrDate"),
  jrDone: document.getElementById("gJrDone"),
  jrText: document.getElementById("gJrText"),
  jrLeft: document.getElementById("gJrLeft"),
  jrSave: document.getElementById("gJrSave"),
  type: document.getElementById("gType"),
  q: document.getElementById("gQ"),
  options: document.getElementById("gOptions"),
  inputWrap: document.getElementById("gInputWrap"),
  input: document.getElementById("gInput"),
  check: document.getElementById("gCheck"),
  hint: document.getElementById("gHint"),
  feedback: document.getElementById("gFeedback"),
  next: document.getElementById("gNext"),
  done: document.getElementById("gDone"),
  doneTitle: document.getElementById("gDoneTitle"),
  doneSub: document.getElementById("gDoneSub"),
  go: document.getElementById("gGo"),
};

// ---------- Chống bấm dồn ----------
// Nút nào cũng chạy việc bất đồng bộ (ghi storage, chuyển trang). Bấm 2-3 lần là
// chạy 2-3 lượt: cộng tiến độ hai lần, hoặc gọi location.replace liên tiếp khiến
// trang nhảy/tải lại liên tục. Bọc qua onClick(): khóa nút tới khi việc xong,
// việc nào dẫn tới chuyển trang thì handler trả về LOCK để khóa luôn.
const LOCK = Symbol("lock");
function onClick(btn, handler) {
  let busy = false;
  btn.addEventListener("click", async (e) => {
    if (busy || btn.disabled) return;
    busy = true;
    btn.disabled = true;
    let lock = false;
    try {
      lock = (await handler(e)) === LOCK;
    } finally {
      if (!lock) { busy = false; btn.disabled = false; }
    }
  });
}

// ---------- Ghi kho từ vựng an toàn giữa nhiều tab ----------
// BUG THẬT đã sửa: trang này (gate.html) là một TAB RIÊNG, có thể đang mở CÙNG
// LÚC với việc tra từ ở tab khác (background.js) — cả hai đều đọc/sửa/ghi cùng
// một danh sách từ vựng. Trước đây gate.js tự gọi reviewVocab()/renameVocab()
// tại chỗ, ghi thẳng vào chrome.storage.local: nếu lượt ghi ở tab kia xen vào
// giữa lúc gate.js đọc và ghi, một trong hai lượt sẽ bị GHI ĐÈ MẤT (mất tiến độ
// ôn tập hoặc mất từ mới) mà không có lỗi nào báo ra.
// Sửa: gửi thao tác ghi qua background.js — nơi vocab.js xếp mọi lượt ghi vào
// MỘT hàng đợi tuần tự (withVocabLock), dù bắt nguồn từ tab nào. Nếu kênh
// message lỗi (vd: đang chạy test, không có background.js) thì tự ghi tại chỗ
// để không chặn phiên học — nhánh dự phòng, không phải đường chạy chính.
async function syncReviewVocab(term, known, helped) {
  try {
    const r = await chrome.runtime.sendMessage({ type: "reviewVocab", term, known, helped });
    if (r && r.ok) return r.list;
  } catch {}
  return reviewVocab(term, known, helped);
}
async function syncRenameVocab(oldTerm, newTerm) {
  try {
    const r = await chrome.runtime.sendMessage({ type: "renameVocab", oldTerm, newTerm });
    if (r && r.ok) return r.list;
  } catch {}
  return renameVocab(oldTerm, newTerm);
}

const GATE_DEFAULTS = {
  enabled: false,
  recallMode: true, // bắt GÕ đáp án thay vì chọn -> chống đoán bừa
  collocMode: true, // từ trừu tượng hỏi bằng cụm đi chung + câu ngữ cảnh
  todoEnabled: true,
  journalEnabled: true,
  journalHour: 21,
  morningEnabled: true,
  grammarLesson: true, // đầu ngày học 1 bài ngữ pháp chi tiết trước khi kiểm tra
  startHour: 5,
  vocabCount: 30,
  grammarCount: 12,
  socialEnabled: true,
  socialCount: 3,
  socialMaxPerDay: 5,
  socialCooldownMin: 120, // trả bài xong -> rảnh bao nhiêu phút mới khóa lại
  socialAI: true,
  level: "B2-C1", // CEFR: B2 | B2-C1 | C1 | C1-C2
  passMinutes: 0, // 0 = không giới hạn thời gian trong cùng tab/tên miền
  socialSites: ["facebook.com", "instagram.com", "tiktok.com", "x.com", "twitter.com", "threads.net", "reddit.com"],
};

let queue = [];
let total = 0;
let solved = 0;
let socialUsedToday = 0; // số lần đã trả bài MXH trong ngày (sau khi hoàn thành)
let socialCooldownMin = 120; // độ dài cooldown (phút) — cập nhật khi hoàn thành

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Escape ĐỦ cho cả nội dung văn bản lẫn giá trị thuộc tính: thiếu " và ' là
// mở đường chèn thuộc tính khi chuỗi do model/người dùng sinh nằm trong attr.
const ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ESC_MAP[c]);
}
async function getSettings() {
  const r = await chrome.storage.local.get("gateSettings");
  return { ...GATE_DEFAULTS, ...(r.gateSettings || {}) };
}

// ---------- Chủ đề theo ngày & câu hỏi khó do AI tạo ----------
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
// Mỗi ngày một chủ đề, xoay vòng theo danh sách chủ đề IELTS.
function todayTopic() {
  if (typeof IELTS_DAILY !== "undefined" && IELTS_DAILY.length) {
    return IELTS_DAILY[Math.floor(Date.now() / 86400000) % IELTS_DAILY.length].theme;
  }
  return "General";
}

// Lấy n câu từ "bể" câu hỏi AI của hôm nay; hết thì sinh thêm.
// kind: "ielts" (đề trộn nhiều dạng) | "grammar" (thuần ngữ pháp).
async function takeAIQuestions(n, topic, kind) {
  const s = await getSettings();
  const level = s.level || "B2-C1";
  const KEY = kind === "grammar" ? "gateAIPoolGrammar" : "gateAIPool";
  const r = await chrome.storage.local.get(KEY);
  let pool = r[KEY] || { date: "", topic: "", level: "", items: [] };
  // Bể câu hỏi làm mới theo NGÀY + CHỦ ĐỀ + TRÌNH ĐỘ.
  if (pool.date !== todayKey() || pool.topic !== topic || pool.level !== level) {
    pool = { date: todayKey(), topic, level, items: [] };
  }
  if (pool.items.length < n) {
    const gen = await generateHardQuestions(Math.max(10, n), topic, level, kind);
    pool.items = pool.items.concat(gen);
  }
  const take = pool.items.splice(0, n);
  await chrome.storage.local.set({ [KEY]: pool });
  return take;
}

// ---------- Chống lặp: nhật ký câu đã gặp ----------
// Ngân hàng offline chỉ ~45 câu ngữ pháp, bốc ngẫu nhiên mỗi sáng thì ngày nào
// cũng gặp lại câu cũ. Ghi lại lần gặp gần nhất để LUÔN ưu tiên câu lâu chưa gặp.
const SEEN_KEY = "quizSeen";
const SEEN_MAX = 600;

async function getSeen() {
  const r = await chrome.storage.local.get(SEEN_KEY);
  return r[SEEN_KEY] || {};
}
async function markSeen(items) {
  const seen = await getSeen();
  const now = Date.now();
  items.forEach((it) => { if (it && it.q) seen[mistakeId(it.q)] = now; });
  const ids = Object.keys(seen);
  if (ids.length > SEEN_MAX) {
    // Chỉ giữ những lần gặp gần đây nhất cho khỏi phình storage.
    ids.sort((a, b) => seen[b] - seen[a]).slice(SEEN_MAX).forEach((id) => delete seen[id]);
  }
  await chrome.storage.local.set({ [SEEN_KEY]: seen });
}
// n câu LÂU CHƯA GẶP NHẤT (chưa gặp bao giờ được ưu tiên trước), xáo trong nhóm cùng hạng.
function leastRecent(bank, n, seen) {
  return shuffle(bank.slice())
    .map((it) => ({ it, t: seen[mistakeId(it.q)] || 0 }))
    .sort((a, b) => a.t - b.t)
    .slice(0, n)
    .map((x) => x.it);
}

// Sinh câu hỏi GỐC, hiệu chỉnh theo thang CEFR (Cambridge English), dùng các
// DẠNG BÀI quen thuộc của Cambridge — không sao chép đề thi thật.
async function generateHardQuestions(count, topic, level, kind) {
  const cfg = await getConfig();
  if (!cfg.apiKey) return [];
  const levelNote = {
    "B2": "CEFR B2 (tương đương Cambridge B2 First)",
    "B2-C1": "CEFR B2 lên C1 (giữa Cambridge B2 First và C1 Advanced)",
    "C1": "CEFR C1 (tương đương Cambridge C1 Advanced)",
    "C1-C2": "CEFR C1–C2 (Cambridge C1 Advanced lên C2 Proficiency)",
  }[level] || "CEFR B2–C1";

  const raw = await chatOnce({
    config: cfg,
    messages: [
      {
        role: "system",
        content:
          `Bạn là chuyên gia khảo thí tiếng Anh, soạn câu hỏi GỐC (tự viết, không trích từ đề thi có sẵn) hiệu chỉnh đúng thang ${levelNote}. ` +
          "Bám sát mức độ từ vựng/ngữ pháp của thang CEFR đó: B2 dùng từ thông dụng-trung cấp, C1 dùng từ học thuật/ít gặp, collocation tinh tế, sắc thái nghĩa. " +
          "Phương án nhiễu phải hợp lý và cùng trường nghĩa, không lộ liễu. " +
          "QUAN TRỌNG VỀ ĐỘ CHÍNH XÁC: câu và đáp án phải khớp ĐÚNG quy tắc bạn nêu trong lời giải thích — " +
          "vd nếu gọi là 'điều kiện loại 3' thì vế kết quả PHẢI có dạng 'would/could/might HAVE + V3' (không được thiếu 'have'); " +
          "nếu vế kết quả không có 'have' (dạng 'would/could + V nguyên mẫu') thì đó là ĐIỀU KIỆN HỖN HỢP (quá khứ→hiện tại), phải gọi đúng tên đó, không được gọi nhầm là 'loại 3'. " +
          "Tự kiểm tra lại từng câu trước khi trả về: công thức nêu trong \"hint\"/\"e\" phải mô tả ĐÚNG những gì xuất hiện trong chính câu \"q\" đó.",
      },
      {
        role: "user",
        content:
          `Tạo ${count} câu trắc nghiệm 4 lựa chọn (đúng 1 đáp án) về chủ đề "${topic}", trình độ ${levelNote}. ` +
          (kind === "grammar"
            ? "CHỈ tập trung NGỮ PHÁP, mỗi câu một điểm ngữ pháp KHÁC NHAU (thì, mệnh đề quan hệ, câu điều kiện, " +
              "bị động, đảo ngữ, giả định, danh động từ/nguyên mẫu, mạo từ, giới từ, liên từ, câu tường thuật). " +
              "Mỗi câu là một câu điền khuyết ngắn, các lựa chọn là MỘT TỪ hoặc cụm ngắn (tối đa 3 từ). "
            : "Trộn đều các DẠNG BÀI kiểu Cambridge: (1) multiple-choice cloze — chọn từ đúng theo collocation/sắc thái; " +
              "(2) word formation — chọn dạng từ đúng của từ gốc; (3) key word transformation — chọn câu viết lại đúng nghĩa; " +
              "(4) phrasal verb / idiom thông dụng; (5) ngữ pháp nâng cao (mệnh đề, đảo ngữ, giả định). " +
              "QUAN TRỌNG: với dạng (1), (2), (4), (5), các lựa chọn phải là MỘT TỪ hoặc cụm ngắn (tối đa 3 từ); chỉ dạng (3) mới được dùng cả câu. ") +
          "Không dùng ký tự xuống dòng trong chuỗi. " +
          "Với dạng key word transformation, viết đề đúng khuôn: \"Key word transformation: <yêu cầu>. '<câu gốc>' TỪKHÓA -> '<câu đích có ___>'\". " +
          'Mỗi phần tử thêm trường "save": DẠNG TỪ ĐIỂN GỐC (nguyên mẫu, số ít) của TỪ/CỤM cần học nếu đây là câu học từ vựng/collocation/phrasal verb (vd "come off", "mitigate", "take into account"); ' +
          'với câu ngữ pháp thuần / word formation / key word transformation thì để "save": "" (chuỗi rỗng). Tuyệt đối KHÔNG đặt "save" là dạng đã chia thì hay cả câu. ' +
          'Mỗi phần tử CŨNG thêm trường "hint": gợi ý QUY TẮC/CÔNG THỨC ngữ pháp cần dùng để điền đúng (vd "Điều kiện loại 3: if + quá khứ hoàn thành, would/could HAVE + V3"), ' +
          'giúp người học biết cần chia ĐỘNG TỪ GÌ trước khi làm bài — TUYỆT ĐỐI KHÔNG được viết ra đáp án cụ thể hay từ/cụm cần điền trong "hint", chỉ nêu TÊN quy tắc + công thức chung chung. ' +
          'Trường "e" (giải thích, hiện SAU khi người học đã trả lời — được PHÉP nêu đáp án): KHÔNG được chỉ nhắc lại quy tắc của đáp án đúng một cách chung chung. PHẢI chỉ đích danh phương án nhiễu GẦN GIỐNG đáp án đúng nhất (thường khác đúng một điểm: sai thì, sai trợ động từ, thiếu/thừa "have", chia sai dạng từ, đảo ngữ sai trợ động từ…) và nói RÕ vì sao phương án đó sai trong đúng câu này — vd nếu đáp án đúng là "has expanded" mà có phương án nhiễu "did expand" (đảo ngữ quá khứ đơn, một cấu trúc ĐÚNG NGỮ PHÁP trong câu khác), phải giải thích: "did expand" không sai vì đảo ngữ, mà sai vì thì không khớp với vế còn lại của câu ("has also increased") — chứ không phải chỉ nói "dùng đảo ngữ: has expanded" rồi dừng. Mục tiêu: người học đọc xong phải hiểu vì sao lựa chọn (rất có thể) mình vừa chọn cụ thể là sai, không chỉ học lại một công thức đã biết. ' +
          'Trả về DUY NHẤT một mảng JSON: [{"q":"đề bài bằng tiếng Anh","o":["A","B","C","D"],"a":chỉ số đáp án đúng (0-3),"hint":"gợi ý quy tắc, không lộ đáp án","e":"giải thích CHỈ RÕ vì sao phương án nhiễu gần đúng nhất lại sai, không chỉ nhắc lại quy tắc","save":"dạng gốc để lưu hoặc chuỗi rỗng"}]. Không thêm chữ nào ngoài JSON.',
      },
    ],
  });
  const arr = extractJsonArray(raw);
  return arr.filter(
    (x) => x && x.q && Array.isArray(x.o) && x.o.length >= 2 && typeof x.a === "number" && x.a >= 0 && x.a < x.o.length
  );
}

// ---------- Dựng câu hỏi ----------
// Gợi ý: chữ cái đầu + số ô còn lại (đủ khó để phải nhớ, đủ dễ để không bế tắc).
function answerHint(ans) {
  const parts = String(ans).trim().split(/\s+/).map((w) =>
    w.length <= 1 ? w : w[0] + " " + "_ ".repeat(w.length - 1).trim()
  );
  const letters = String(ans).replace(/[^A-Za-zÀ-ỹ]/g, "").length;
  return parts.join("   /   ") + `  ·  ${letters} chữ cái`;
}
function normAns(s) {
  return String(s || "")
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[‐-―−]/g, "-") // – — − … về gạch nối thường
    .replace(/[.,!?;:"'‘’”“]/g, "")
    .replace(/\s+/g, " ");
}
// Sai câu IELTS (khi lướt MXH) -> lưu ĐÁP ÁN (từ/cụm khó) vào từ vựng để học lại.
// Background tự tra nghĩa & phiên âm rồi lưu (không chặn phiên học).
let autoSaveWrong = true; // công tắc: tự lưu từ sai khi lướt MXH
// isCleanLexicalItem() dùng chung từ vocab.js: chỉ nhận từ đơn / phrasal verb.

function saveWrongWord(q) {
  if (!autoSaveWrong) return;
  if (!q || q.kind !== "bank" || q.bankKind !== "ielts") return;

  // Ưu tiên "save" (dạng từ điển AI cung cấp); không có thì chỉ lấy đáp án TỪ ĐƠN.
  let term = String(q.item?.save || "").trim();
  if (!term) {
    const ans = String(q.answer || "").trim();
    if (!ans.includes(" ")) term = ans;
  }
  // Lưới an toàn cuối: dù nguồn nào cũng phải là mục từ vựng sạch mới lưu.
  if (!isCleanLexicalItem(term)) return;
  // AI đôi khi vẫn trả về dạng đã chia ("knocked back") -> đưa về dạng từ điển.
  term = baseFormSuggestion(term) || term;
  try {
    chrome.runtime.sendMessage({
      type: "saveVocab",
      term,
      context: String(q.item?.q || "").replace(/\\n/g, " ").slice(0, 200),
      source: "Sai khi lướt MXH",
    });
  } catch {}
}

// So khớp "rộng lượng": bỏ qua khác biệt gạch nối/khoảng trắng.
// Từ trong kho có thể bị dính lỗi tách dòng của PDF ("off-theshelf"), nên gõ
// đúng chính tả thật ("off-the-shelf") vẫn phải được tính là đúng.
function looseAns(s) {
  return normAns(s).replace(/[-\s]/g, "");
}
function sameAnswer(a, b) {
  return normAns(a) === normAns(b) || looseAns(a) === looseAns(b);
}

// Đáp án đủ ngắn để bắt gõ lại (từ/cụm ≤ 3 chữ, ≤ 24 ký tự).
// Câu dài (key word transformation…) sẽ tự chuyển về dạng trắc nghiệm.
function isTypable(ans) {
  const a = String(ans || "").trim();
  return a.length > 0 && a.length <= 24 && a.split(/\s+/).length <= 3;
}

// Ô trống "___" -> ô kẻ chân riêng, không lẫn vào chữ.
function gapHtml(text) {
  return esc(text).replace(/_{2,}/g, '<span class="g-gap"></span>');
}
function keywordHtml(k) {
  return `<div class="g-keyword"><span class="g-role">Phải dùng</span><b>${esc(k)}</b></div>`;
}

// Làm sạch + TÁCH LỚP đề bài. Model trả về đề dồn hết vào một chuỗi dài
// ("Key word transformation: Rewrite… 'Câu gốc.' KEYWORD -> 'Câu đích ___.'"),
// đọc rất mệt. Tách thành: nhãn dạng bài · yêu cầu · câu gốc · từ khóa · câu đích.
function promptHtml(text) {
  let s = String(text || "").replace(/\\n/g, "\n").trim();
  const parts = [];

  // "Word formation:" / "Key word transformation:" ở đầu -> nhãn dạng bài riêng.
  const label = s.match(/^([A-Za-z][A-Za-z\s/-]{2,34}):\s+/);
  if (label) {
    parts.push(`<div class="g-task">${esc(label[1].trim())}</div>`);
    s = s.slice(label[0].length);
  }

  // Từ khóa bắt buộc: token IN HOA đứng riêng (BEGINNINGS, ACCOUNT…).
  let keyword = "";
  s = s.replace(/(?:^|\s)([A-Z]{3,}(?:\s+[A-Z]{2,})?)(?=\s*(?:->|→|:)?\s*(?:['"“‘]|$))/, (m, k) => {
    keyword = k.trim();
    return " ";
  });

  // Câu trong dấu nháy -> tách thành khối riêng. Nháy đóng phải đứng trước
  // khoảng trắng/hết chuỗi để không cắt nhầm dấu lược trong "doesn't".
  const quotes = [];
  s = s.replace(/['"“‘]([\s\S]{8,}?)['"”’](?=\s|$|\s*(?:->|→))/g, (m, inner) => {
    quotes.push(inner.trim());
    return " ";
  });

  const lead = s.replace(/\s*(->|→)\s*/g, " ").replace(/\s+/g, " ").trim();
  if (lead) parts.push(`<div class="g-lead">${gapHtml(lead)}</div>`);
  if (!quotes.length && keyword) parts.push(keywordHtml(keyword));

  quotes.forEach((qt, i) => {
    const pair = quotes.length > 1;
    const role = pair ? (i === 0 ? "Câu gốc" : "Viết lại") : "";
    // Từ khóa nằm GIỮA câu gốc và câu viết lại — đúng thứ tự cần đọc.
    if (keyword && pair && i === 1) parts.push(keywordHtml(keyword));
    parts.push(
      `<div class="g-sentence${pair && i ? " target" : ""}">` +
        (role ? `<span class="g-role">${role}</span>` : "") +
        `<span class="g-sen-text">${gapHtml(qt)}</span>` +
        `</div>`
    );
  });

  return parts.join("") || gapHtml(text);
}

// ---------- Nghe & gõ lại ----------
// Chỉ những câu điền khuyết ĐƠN GIẢN (1 câu, 1 chỗ trống, đáp án ngắn) mới hợp
// để nghe — dạng "Key word transformation" (2 câu + từ khóa IN HOA) đọc lên rất
// rối, không đoán nổi ranh giới câu. Trả về câu ĐÃ ĐIỀN sẵn đáp án đúng (người
// học nghe trọn câu, rồi phải tự gõ lại đúng từ đã nghe) hoặc null nếu không hợp.
function listenTextFor(item) {
  let s = String(item.q || "").replace(/\\n/g, " ").trim();
  if (/^[A-Za-z][A-Za-z\s/-]{2,34}:\s+/.test(s)) return null; // có nhãn dạng bài riêng
  if ((s.match(/['"“‘]/g) || []).length >= 2) return null; // có câu trích dẫn -> dạng viết lại câu
  if ((s.match(/_{2,}/g) || []).length !== 1) return null; // phải đúng 1 chỗ trống
  const answer = item.o[item.a];
  if (!answer || answer.split(/\s+/).length > 4 || answer.length > 24) return null; // đáp án quá dài, nghe khó bắt
  return s
    .replace(/_{2,}/, answer)
    .replace(/\([^)]*[^\x00-\x7f][^)]*\)/g, "") // bỏ chú thích tiếng Việt trong ngoặc (đọc lẫn giọng rất chối)
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1") // bỏ khoảng trắng thừa để lại trước dấu câu
    .trim();
}

// item: {q,o,a,e}. bankKind: "grammar" | "ielts". fromMistake: câu lấy từ sổ lỗi.
function bankQuestion(item, typeLabel, bankKind, fromMistake) {
  const answer = item.o[item.a];
  const listenText = listenTextFor(item);
  return {
    kind: "bank",
    bankKind: bankKind || "grammar",
    item,
    fromMistake: !!fromMistake,
    mistakeId: fromMistake ? item.id : null,
    typeLabel: fromMistake ? "🩹 Ôn câu từng sai · " + typeLabel : typeLabel,
    prompt: promptHtml(item.q),
    options: shuffle(item.o.map((text, i) => ({ text, correct: i === item.a }))),
    answer,
    // Gợi ý QUY TẮC (không lộ đáp án) — hiện ngay từ đầu, khác với "explain" chỉ
    // hiện SAU khi trả lời. Câu điền khuyết ngữ pháp không giống câu từ vựng: cái
    // thiếu không phải NGHĨA mà là biết cần chia động từ theo quy tắc nào.
    ruleHint: item.hint || "",
    explain: item.e || "",
    // ~1/4 số câu đủ điều kiện chuyển sang "Nghe & gõ lại" để luyện Listening
    // (đang chiếm 0% thời lượng luyện dù chiếm 25% điểm IELTS).
    listenText,
    listenMode: !!listenText && Math.random() < 0.25,
  };
}

// ---------- Hai từ cùng một nghĩa tiếng Việt ----------
// Kho tự lưu nghĩa qua AI ở những thời điểm khác nhau nên rất dễ có hai từ mang
// đúng một dòng nghĩa ("inclusion" và "integration" cùng là "sự hòa nhập").
// Khi đó đề bài "sự hòa nhập -> gõ từ" là câu KHÔNG THỂ trả lời chắc chắn, mà
// người học lại bị chấm sai và bị trừ điểm nhớ. Cả hai chuyện đó đều phải sửa.
function meaningClauses(m) {
  return String(m || "")
    .normalize("NFC").toLowerCase()
    .replace(/^\s*\([^)]*\)\s*/, "")        // bỏ "(danh từ)" ở đầu
    .split(/[;,/|]|\bhoặc\b/)
    .map((x) => x.replace(/[.!?"'’“”()]/g, "").replace(/\s+/g, " ").trim())
    .filter((x) => x.length > 2);
}

function meaningsClash(a, b) {
  const A = meaningClauses(a), B = meaningClauses(b);
  if (!A.length || !B.length) return false;
  // Trùng hẳn một vế, hoặc vế này là phần đầu của vế kia ("hiệu quả" vs
  // "hiệu quả kinh tế") — đủ giống để người học gõ nhầm sang từ kia.
  return A.some((x) => B.some((y) => x === y || x.startsWith(y + " ") || y.startsWith(x + " ")));
}

// Từ khác trong kho mang cùng nghĩa với từ đang hỏi (bỏ qua chính nó).
function twinsOf(word, pool) {
  return (pool || []).filter(
    (v) => v.term.toLowerCase() !== word.term.toLowerCase() && meaningsClash(v.meaning, word.meaning)
  );
}

// Từ vựng ở chế độ NHỚ LẠI: cho nghĩa -> tự gõ lại từ tiếng Anh.
function vocabRecallQuestion(word, pool) {
  const twins = twinsOf(word, pool);
  return {
    kind: "vocab",
    term: word.term,
    answer: word.term,
    meaning: word.meaning,
    typeLabel: "Từ vựng — nhớ & viết lại",
    prompt:
      `<div class="g-mean">${esc(word.meaning)}</div>` +
      (word.pos ? `<div class="g-pos">(${esc(word.pos)})</div>` : "") +
      (word.definition ? `<div class="g-def">${esc(word.definition)}</div>` : "") +
      // Báo trước cho người học biết nghĩa này không đủ để chọn từ — phải đọc
      // định nghĩa tiếng Anh. Không báo thì họ gõ từ kia rồi ăn dấu ✗ oan.
      (twins.length
        ? `<div class="g-ambi">⚠️ Kho đang có ${twins.length + 1} từ cùng nghĩa "${esc(word.meaning)}"` +
          (word.definition ? " — dựa vào định nghĩa tiếng Anh ở trên để chọn đúng từ." : ".") +
          `</div>`
        : ""),
    options: null,
    explain: word.definition || "",
  };
}

// Che chính từ đang hỏi trong cụm: "employee remuneration" -> "employee ___".
function maskTerm(text, term) {
  const t = String(term).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(text).replace(new RegExp(t + "\\w*", "gi"), "___");
}

// Từ TRỪU TƯỢNG (remuneration, cohesion, appraisal…): hỏi "nghĩa → từ" kiểu rời
// rạc thì nhớ được nghĩa vẫn không biết dùng, và rất dễ lẫn với nhau. Hỏi bằng
// NGỮ CẢNH: cụm đi chung + một câu có chỗ trống, vẫn phải tự gõ ra từ.
function vocabContextQuestion(word) {
  const collocs = (word.collocs || []).slice(0, 3);
  const gap = (s) => esc(s).replace(/_{2,}/g, '<span class="g-gap"></span>');
  return {
    kind: "vocab",
    term: word.term,
    answer: word.term,
    meaning: word.meaning,
    typeLabel: "Từ vựng — điền vào cụm",
    prompt:
      `<div class="g-mean">${esc(word.meaning)}</div>` +
      (word.pos ? `<div class="g-pos">(${esc(word.pos)})</div>` : "") +
      (collocs.length
        ? `<div class="g-colloc"><span class="g-role">Cụm hay đi cùng</span>` +
          collocs.map((c) => `<b>${gap(maskTerm(c, word.term))}</b>`).join("") +
          `</div>`
        : "") +
      (word.cloze ? `<div class="g-sentence"><span class="g-sen-text">${gap(maskTerm(word.cloze, word.term))}</span></div>` : "") +
      (word.clozeVi ? `<div class="g-def">${esc(word.clozeVi)}</div>` : ""),
    options: null,
    explain: collocs.length ? `Cụm chuẩn: ${collocs.join(" · ")}` : word.definition || "",
  };
}

function vocabQuestion(word, pool) {
  const others = shuffle(pool.filter((v) => v.term.toLowerCase() !== word.term.toLowerCase())).slice(0, 3);
  // Ngẫu nhiên: cho từ chọn nghĩa, hoặc cho nghĩa chọn từ.
  if (Math.random() < 0.5) {
    return {
      kind: "vocab",
      term: word.term,
      meaning: word.meaning,
      typeLabel: "Từ vựng — chọn nghĩa đúng",
      prompt: `<span class="g-word">${esc(word.term)}</span>` + (word.phonetic ? `<span class="g-ipa">${esc(word.phonetic)}</span>` : ""),
      options: shuffle([{ text: word.meaning, correct: true }].concat(others.map((o) => ({ text: o.meaning, correct: false })))),
      explain: word.definition || "",
    };
  }
  return {
    kind: "vocab",
    term: word.term,
    meaning: word.meaning,
    typeLabel: "Từ vựng — chọn từ đúng",
    prompt: esc(word.meaning),
    options: shuffle([{ text: word.term, correct: true }].concat(others.map((o) => ({ text: o.term, correct: false })))),
    explain: word.definition || "",
  };
}

// ============================================================
// Chế độ VIỆC CẦN LÀM — bắt lập danh sách trước khi làm gì khác.
// ============================================================
async function initTodoGate() {
  el.title.textContent = "Hôm nay bạn định làm gì? ✅";
  el.sub.textContent = "Lập danh sách việc cần làm trước đã — ít nhất 1 việc.";
  el.card.classList.add("hidden");
  el.todoPane.classList.remove("hidden");
  el.bar.style.width = "20%";
  await renderGateTodos();
  el.todoInput.focus();

  onClick(el.todoAdd, addFromInput);
  el.todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addFromInput(); }
  });
  onClick(el.todoDone, async () => {
    const list = await getTodos();
    if (!hasUndoneTodo(list)) {
      el.todoHint.className = "g-feedback no";
      el.todoHint.textContent = "Hãy thêm ít nhất một việc cần làm.";
      el.todoInput.focus();
      return;
    }
    await chrome.storage.local.set({ gateState: { ...(await getState()), todoDoneDate: todayStr() } });
    await markTodoShownToday();
    finishGate("Đã lên kế hoạch!", "Bắt tay vào làm thôi. Danh sách luôn ở tab Sổ tay.");
    return LOCK; // đã xong phiên: đừng cho bấm thêm lượt nữa
  });

  async function addFromInput() {
    const text = el.todoInput.value.trim();
    if (!text) return;
    const { duplicate } = await addTodo(text);
    el.todoInput.value = "";
    el.todoHint.textContent = duplicate ? "Việc này đã có trong danh sách rồi." : "";
    await renderGateTodos();
  }
}

// BUG ĐÃ SỬA: trước đây bắt phải có việc TẠO ĐÚNG HÔM NAY mới cho qua, nên
// việc cũ chưa xong (tạo hôm qua) không được tính — người dùng buộc phải gõ
// lại y hệt việc đó để "mở khoá", tạo ra các dòng trùng lặp. Giờ chỉ cần còn
// ít nhất một việc CHƯA XONG, bất kể tạo từ khi nào.
function hasUndoneTodo(list) {
  return list.some((t) => !t.done);
}

async function renderGateTodos() {
  const list = sortTodos(await getTodos());
  el.todoList.innerHTML = "";
  if (!list.length) {
    el.todoList.innerHTML = '<p class="g-empty">Chưa có việc nào.</p>';
    return;
  }
  list.forEach((t) => {
    const row = document.createElement("div");
    row.className = "g-item" + (t.done ? " done" : "");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!t.done;
    cb.addEventListener("change", async () => { await toggleTodo(t.id); renderGateTodos(); });
    const flag = document.createElement("span");
    flag.className = "g-item-flag";
    flag.textContent = PRIORITY_ICON[todoPriority(t)];
    flag.title = PRIORITY_LABEL[todoPriority(t)];
    const txt = document.createElement("span");
    txt.className = "g-item-text";
    txt.textContent = t.text;
    const tag = document.createElement("span");
    const badge = todoDueBadge(t);
    tag.className = "g-item-tag" + (badge.cls ? " due-" + badge.cls : "");
    tag.textContent = badge.text;
    const del = document.createElement("button");
    del.className = "g-item-del";
    del.textContent = "✕";
    onClick(del, async () => { await deleteTodo(t.id); renderGateTodos(); return LOCK; });
    row.append(cb, flag, txt, tag, del);
    el.todoList.appendChild(row);
  });
}

// ============================================================
// Chế độ NHẬT KÝ — viết cho hôm nay và bù các ngày còn thiếu.
// ============================================================
let jrPending = [];

async function initJournalGate() {
  const s = await getSettings();
  el.card.classList.add("hidden");
  el.jrPane.classList.remove("hidden");
  jrPending = await gateJournalPending(s);
  if (!jrPending.length) return finishGate("Xong rồi!", "Nhật ký đã đầy đủ.");
  el.title.textContent = "Viết nhật ký đã 📔";
  el.sub.textContent = "Tổng kết ngày rồi mới lướt tiếp nhé.";
  await showJournalDay();

  onClick(el.jrSave, async () => {
    const text = el.jrText.value.trim();
    if (text.length < 5) {
      el.jrLeft.className = "g-feedback no";
      el.jrLeft.textContent = "Hãy viết vài câu trước khi lưu.";
      el.jrText.focus();
      return;
    }
    await saveJournalEntry(text, jrPending[0]);
    jrPending.shift();
    if (!jrPending.length) {
      finishGate("Đã ghi nhật ký!", "Hẹn gặp lại vào tối mai.");
      return LOCK; // hết ngày cần bù -> không cho lưu thêm lượt trùng
    }
    await showJournalDay();
  });
}

async function showJournalDay() {
  const d = jrPending[0];
  const isToday = d === todayStr();
  el.jrDate.textContent = isToday ? `Hôm nay · ${d}` : `Bù cho ngày ${d}`;
  el.jrLeft.className = "g-feedback";
  el.jrLeft.textContent = jrPending.length > 1 ? `Còn ${jrPending.length - 1} ngày cần bù sau ngày này.` : "";
  el.bar.style.width = "60%";

  // Kéo sẵn việc đã tick xong hôm đó sang: nhớ lại "hôm nay làm được gì" là phần
  // mệt nhất của việc viết nhật ký, mà dữ liệu thì đã có trong danh sách việc.
  const done = await doneTodosOn(d);
  const block = doneTodoBlock(done);
  el.jrText.value = block ? block + "\n\n" : "";
  renderGateJournalDone(done);
  el.jrText.focus();
  // Con trỏ xuống cuối để viết tiếp, không phải đi qua danh sách vừa chèn.
  el.jrText.setSelectionRange(el.jrText.value.length, el.jrText.value.length);
}

function renderGateJournalDone(done) {
  el.jrDone.classList.toggle("hidden", !done.length);
  el.jrDone.innerHTML = "";
  if (!done.length) return;
  el.jrDone.innerHTML =
    `<div class="g-donelist-head">✅ Việc bạn đã hoàn thành hôm đó (${done.length}) — đã điền sẵn bên dưới</div>` +
    "<ul>" + done.map((t) => `<li>${esc(t.text)}</li>`).join("") + "</ul>";
}

async function gateJournalPending(s) {
  const list = await getJournal();
  const have = new Set(list.map((j) => j.date));
  const r = await chrome.storage.local.get("journalStart");
  let start = r.journalStart;
  if (!start) { start = todayStr(); await chrome.storage.local.set({ journalStart: start }); }
  const ds = (off) => {
    const d = new Date(Date.now() + off * 86400000);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const req = [];
  for (let i = 7; i >= 1; i--) {
    const d = ds(-i);
    if (d >= start && !have.has(d)) req.push(d);
  }
  const t = todayStr();
  if (new Date().getHours() >= (s.journalHour ?? 21) && t >= start && !have.has(t)) req.push(t);
  return req;
}

async function getState() {
  const r = await chrome.storage.local.get("gateState");
  return r.gateState || {};
}

// Kết thúc cho các chế độ không phải quiz.
function finishGate(title, sub) {
  el.card.classList.add("hidden");
  el.todoPane.classList.add("hidden");
  el.jrPane.classList.add("hidden");
  el.done.classList.remove("hidden");
  el.bar.style.width = "100%";
  el.count.textContent = "";
  el.doneTitle.textContent = title;
  el.doneSub.textContent = sub;
}

async function buildSession() {
  if (MODE === "reminder") return initReminder();
  if (MODE === "todo") return initTodoGate();
  if (MODE === "journal") return initJournalGate();
  const s = await getSettings();
  recallOn = s.recallMode !== false; // gõ đáp án thay vì chọn
  autoSaveWrong = s.saveWrongVocab !== false; // tự lưu từ sai khi lướt MXH
  if (MODE === "social") return startQueue(await socialQuestions(s));
  // Đầu ngày: học 1 bài ngữ pháp chi tiết TRƯỚC, rồi mới tới chọn khối lượng + kiểm tra.
  if (s.grammarLesson !== false && typeof GRAMMAR_DATA !== "undefined") return showGrammarLesson(s);
  return askMorningCount(s);
}

// Từ khóa nhận diện chủ điểm ngữ pháp (khớp trong đề + giải thích câu đã sai).
// Từ khóa ĐẶC TRƯNG cho từng chủ điểm — cố ý bỏ token quá phổ biến
// (for/yet/since/had/will…) để không khớp nhầm khiến nhóm thì luôn "thắng".
const GRAMMAR_TOPIC_KEYS = [
  { m: "từ loại", k: ["part of speech", "từ loại", "dạng đúng của từ", "word form"] },
  { m: "cấu tạo từ", k: ["word formation", "hậu tố", "tiền tố", "suffix", "prefix", "-ly", "-tion", "-ness", "-able"] },
  { m: "điều kiện", k: ["conditional", "điều kiện", "if i were", "if + ", "unless"] },
  { m: "bị động", k: ["passive", "bị động", "be + v3", "be done", "was built", "is made"] },
  { m: "tường thuật", k: ["reported speech", "tường thuật", "lùi thì"] },
  { m: "quan hệ", k: ["relative clause", "mệnh đề quan hệ", "defining", "non-defining", "whose"] },
  { m: "gerund", k: ["gerund", "infinitive", "danh động từ", "nguyên mẫu", "v-ing sau", "to-infinitive"] },
  { m: "khiếm khuyết", k: ["modal verb", "khiếm khuyết", "must have", "should have", "might have", "can't have"] },
  { m: "mạo từ", k: ["article", "mạo từ", "a/an/the", "zero article"] },
  { m: "so sánh", k: ["comparative", "superlative", "so sánh hơn", "so sánh nhất", "as...as"] },
  { m: "liên từ", k: ["although", "despite", "in spite of", "liên từ", "so that", "conjunction"] },
  { m: "đảo ngữ", k: ["inversion", "đảo ngữ", "never have", "not only", "no sooner", "only when"] },
  { m: "lượng từ", k: ["countable", "uncountable", "đếm được", "lượng từ", "a few", "a little"] },
  { m: "ước", k: ["wish", "câu ước", "subjunctive", "giả định", "it's time", "would rather", "as if"] },
  { m: "giới từ", k: ["preposition", "giới từ", "depend on", "interested in", "good at", "responsible for"] },
  { m: "hòa hợp", k: ["subject-verb agreement", "hòa hợp", "a number of", "neither...nor"] },
  { m: "hiện tại", k: ["present simple", "present continuous", "present perfect", "hiện tại đơn", "hiện tại tiếp diễn", "hiện tại hoàn thành"] },
  { m: "quá khứ", k: ["past simple", "past continuous", "past perfect", "quá khứ đơn", "quá khứ tiếp diễn", "quá khứ hoàn thành"] },
  { m: "tương lai", k: ["future simple", "future perfect", "future continuous", "tương lai đơn", "tương lai hoàn thành", "be going to"] },
];

// Xếp hạng chủ điểm theo mức độ hay sai. Trả về mảng {idx, score} (score>0), giảm dần.
function rankWeakTopics(topics, mistakes) {
  const scores = new Array(GRAMMAR_TOPIC_KEYS.length).fill(0);
  for (const mk of mistakes) {
    const hay = ((mk.q || "") + " " + (mk.e || "")).toLowerCase();
    GRAMMAR_TOPIC_KEYS.forEach((g, i) => {
      if (g.k.some((kw) => hay.includes(kw))) scores[i] += mk.wrongCount || 1;
    });
  }
  return GRAMMAR_TOPIC_KEYS
    .map((g, i) => ({ score: scores[i], idx: topics.findIndex((t) => t.title.toLowerCase().includes(g.m)) }))
    .filter((x) => x.score > 0 && x.idx >= 0)
    .sort((a, b) => b.score - a.score);
}

// Lịch sử bài đã giảng gần đây (để không lặp lại 3 ngày liên tiếp).
async function getRecentLessons() {
  const r = await chrome.storage.local.get("grammarRecent");
  return r.grammarRecent || [];
}
async function pushRecentLesson(idx) {
  const rec = await getRecentLessons();
  rec.push(idx);
  await chrome.storage.local.set({ grammarRecent: rec.slice(-3) }); // giữ 3 bài gần nhất
}

// Bài giảng ngữ pháp — ưu tiên điểm yếu NHƯNG không lặp bài vừa học; hết thì đi
// theo lộ trình tuần tự, cũng bỏ qua bài mới học gần đây.
async function showGrammarLesson(s) {
  const topics = (GRAMMAR_DATA.find((g) => /ngữ pháp/i.test(g.group)) || GRAMMAR_DATA[0]).topics;
  const mistakes = (await getMistakes()).filter((m) => m.kind === "grammar");
  const recent = await getRecentLessons();

  let idx = -1;
  let weak = false;
  // 1) Điểm yếu chưa học gần đây.
  const ranked = rankWeakTopics(topics, mistakes).filter((x) => !recent.includes(x.idx));
  if (ranked.length) { idx = ranked[0].idx; weak = true; }
  // 2) Không có -> đi lộ trình tuần tự, nhảy qua các bài vừa học.
  if (idx < 0) {
    let step = (recent.length ? recent[recent.length - 1] : -1);
    for (let i = 0; i < topics.length; i++) {
      step = (step + 1) % topics.length;
      if (!recent.includes(step)) { idx = step; break; }
    }
    if (idx < 0) idx = (recent[recent.length - 1] + 1) % topics.length; // hiếm: mọi bài đều mới học
  }
  const t = topics[idx];
  await pushRecentLesson(idx);

  el.title.textContent = weak ? "Điểm bạn hay sai — học lại nào 🎯" : "Chào buổi sáng — học ngữ pháp đã 📐";
  el.sub.textContent = weak
    ? "Hôm nay tập trung một chủ điểm bạn trả lời sai nhiều."
    : `Lộ trình bài ${idx + 1}/${topics.length}. Đọc kỹ rồi làm bài kiểm tra để nhớ.`;
  el.card.classList.add("hidden");
  el.startPane.classList.add("hidden");
  el.lessonTitle.innerHTML = (weak ? '<span class="g-weak-tag">Điểm yếu</span> ' : "") + esc(t.title);
  el.lessonBody.innerHTML = t.html;
  el.lessonPane.classList.remove("hidden");
  el.bar.style.width = "8%";
  window.scrollTo(0, 0);
  onClick(el.lessonDone, () => {
    el.lessonPane.classList.add("hidden");
    askMorningCount(s);
    return LOCK; // đã sang màn chọn khối lượng, nút này không dùng lại
  });
}

// Màn nhắc việc — chặn tới khi bấm xác nhận, rồi xoá cờ và cho đi tiếp.
async function initReminder() {
  const r = await chrome.storage.local.get("reminderPending");
  const rp = r.reminderPending || {};
  el.title.textContent = "⏰ Đến giờ rồi!";
  el.sub.textContent = "Việc cố định hằng ngày của bạn:";
  if (el.skip) el.skip.classList.add("hidden");
  el.card.classList.add("hidden");
  if (el.startPane) el.startPane.classList.add("hidden");
  el.remText.textContent = rp.text || "Đến giờ làm việc đã định!";
  el.remPane.classList.remove("hidden");
  el.bar.style.width = "100%";

  const finishRem = async () => {
    await chrome.storage.local.remove("reminderPending");
    location.replace(NEXT || "about:blank");
  };

  // Có thời lượng "rời máy" -> KHÓA nút, đếm ngược; hết giờ mới cho tiếp tục.
  if (rp.awayUntil && rp.awayUntil > Date.now()) {
    el.sub.textContent = "Rời khỏi máy và làm việc đã — máy sẽ tự mở khi hết giờ.";
    el.remDone.disabled = true;
    // Lối thoát khi nhắc BẮN SAI GIỜ.
    if (!document.getElementById("gRemEscape")) {
      const esc2 = document.createElement("button");
      esc2.id = "gRemEscape";
      esc2.className = "g-skip";
      esc2.style.cssText = "display:block;margin:14px auto 0;";
      esc2.textContent = "Nhắc sai giờ? Bỏ qua";
      onClick(esc2, async () => {
        if (!confirm("Bỏ qua lần nhắc này (do sai giờ)?")) return;
        await chrome.storage.local.remove("reminderPending");
        location.replace(NEXT || "about:blank");
        return LOCK;
      });
      el.remPane.appendChild(esc2);
    }
    const tick = () => {
      const left = rp.awayUntil - Date.now();
      if (left <= 0) {
        el.remDone.disabled = false;
        el.remDone.textContent = "Xong — tiếp tục duyệt";
        el.remText.innerHTML = esc(rp.text) + '<div class="g-rem-done">✅ Hết giờ! Bạn có thể tiếp tục.</div>';
        return;
      }
      const totalSec = Math.floor(left / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      const t = h > 0
        ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
        : `${m}:${String(s).padStart(2, "0")}`;
      el.remDone.textContent = `⏳ Còn ${t}`;
      setTimeout(tick, 1000);
    };
    tick();
  } else {
    el.remDone.textContent = "Bắt đầu làm — tiếp tục duyệt";
  }
  onClick(el.remDone, async () => { await finishRem(); return LOCK; });
}

// Đưa hàng đợi vào chạy. Dùng chung cho mọi chế độ.
function startQueue(qs) {
  queue = shuffle(qs);
  total = queue.length;
  solved = 0;
  if (!total) return finish(); // không có gì để học -> cho qua
  el.startPane.classList.add("hidden");
  el.card.classList.remove("hidden");
  meaningPrefetch = prefetchMeaningHints(queue); // gom cả phiên vào 1 lượt gọi
  render();
}

async function socialQuestions(s) {
  const topic = todayTopic();
  const qs = [];
  el.title.textContent = "Muốn lướt? Trả bài đã 😈";
  let items = [];
  if (s.socialAI !== false) {
    el.sub.textContent = `Chủ đề hôm nay: ${topic} — đang tạo câu hỏi khó bằng AI…`;
    try { items = await takeAIQuestions(s.socialCount, topic); } catch { items = []; }
  }
  if (items.length < s.socialCount) {
    // Không có API key / lỗi -> dùng ngân hàng offline, lấy câu lâu chưa gặp nhất.
    items = items.concat(leastRecent(IELTS_BANK, s.socialCount - items.length, await getSeen()));
  }
  el.sub.textContent = `Chủ đề hôm nay: ${topic} · Trả lời đúng ${s.socialCount} câu IELTS (mức khó) để vào.`;
  // Ưu tiên 1 câu từng sai đã đến hạn (nếu có).
  const owed = shuffle(await dueMistakes("ielts")).slice(0, 1);
  owed.forEach((m) => qs.push(bankQuestion(m, "IELTS", "ielts", true)));
  const picked = items.slice(0, Math.max(1, s.socialCount - owed.length));
  picked.forEach((it) => qs.push(bankQuestion(it, "IELTS khó · " + topic, "ielts")));
  await markSeen(picked);
  return qs;
}

// Buổi sáng: tự chọn khối lượng, nhưng KHÔNG được ít hơn mức đã đặt trong ⚙️
// — nếu không thì màn chặn mất tác dụng.
async function askMorningCount(s) {
  // Bỏ mục rác còn sót trong kho (lưu từ trước khi có bộ lọc): mảnh MỆNH ĐỀ
  // ("will the university release") và mục không phải chữ ("11.1") — hỏi cũng vô nghĩa.
  const list = (await getVocab()).filter(
    (v) => v.term && v.meaning && !isClauseLike(v.term) && !isJunkTerm(v.term)
  );
  const floor = Math.max(1, s.vocabCount || 1);
  const choices = [...new Set([floor, floor * 2, floor * 3, list.length])]
    .filter((n) => n >= floor && n <= Math.max(floor, list.length))
    .sort((a, b) => a - b);

  el.title.textContent = "Học xong rồi hãy lướt 💪";
  el.sub.textContent = "Chọn khối lượng cho phiên hôm nay. Học thêm thì được, học ít hơn mức đã đặt thì không.";
  el.startInfo.textContent = `Kho từ đang có ${list.length} từ · tối thiểu ${floor} từ + ${s.grammarCount} câu ngữ pháp.`;
  el.card.classList.add("hidden");
  el.startPane.classList.remove("hidden");

  el.countOpts.innerHTML = "";
  choices.forEach((n) => {
    const b = document.createElement("button");
    b.className = "g-count-opt" + (n === floor ? " active" : "");
    b.textContent = n === list.length && n !== floor ? `Tất cả (${n})` : String(n);
    b.dataset.n = String(n);
    b.addEventListener("click", () => {
      [...el.countOpts.children].forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    });
    el.countOpts.appendChild(b);
  });

  onClick(el.startBtn, async () => {
    const active = el.countOpts.querySelector(".g-count-opt.active");
    const n = Math.max(floor, parseInt(active?.dataset.n, 10) || floor);
    await buildMorning(s, n, list);
    return LOCK; // phiên đã dựng xong: bấm lại sẽ dựng chồng hàng đợi thứ hai
  });
}

// Chuẩn bị cụm đi chung + câu ngữ cảnh cho các từ trừu tượng của phiên, gom vào
// MỘT lượt gọi. Kết quả lưu thẳng vào mục từ vựng nên mỗi từ chỉ sinh một lần.
async function ensureContextData(pool, s) {
  if (s.collocMode === false) return;
  const need = pool.filter((w) => isAbstractTerm(w.term) && !(w.collocs || []).length);
  if (!need.length) return;

  const prev = el.sub.textContent;
  el.sub.textContent = `Đang chuẩn bị cụm đi chung cho ${need.length} từ trừu tượng…`;
  try {
    const r = await chrome.runtime.sendMessage({ type: "collocations", terms: need.map((w) => w.term) });
    if (r?.ok) {
      for (const w of need) {
        const d = r.items?.[w.term.toLowerCase()];
        if (d) Object.assign(w, d);
      }
    }
  } catch {}
  el.sub.textContent = prev;
}

async function buildMorning(s, vocabCount, list) {
  const qs = [];
  el.sub.textContent = `Hoàn thành ${vocabCount} từ vựng + ${s.grammarCount} câu ngữ pháp. Trước khi xong, mọi trang web sẽ bị chặn (cả ngày, không chỉ buổi sáng).`;
  // Ưu tiên từ đến hạn ôn, sau đó tới các từ còn lại.
  if (list.length >= 4) {
    const due = dueVocab(list);
    const pool = shuffle((due.length >= 4 ? due : list).slice()).slice(0, vocabCount);
    await ensureContextData(pool, s);
    pool.forEach((w) => {
      // Từ trừu tượng đã có cụm đi chung -> hỏi theo ngữ cảnh.
      if (isAbstractTerm(w.term) && (w.collocs || []).length) return qs.push(vocabContextQuestion(w));
      // Còn lại: chế độ nhớ lại, tự gõ lại từ (hiệu quả hơn hẳn chọn A/B/C/D).
      // Cụm quá dài thì vẫn dùng trắc nghiệm cho khả thi.
      qs.push(s.recallMode !== false && isTypable(w.term) ? vocabRecallQuestion(w, list) : vocabQuestion(w, list));
    });
  }
  // Nếu chưa đủ số từ vựng, bù bằng câu ngữ pháp.
  const missing = Math.max(0, vocabCount - qs.length);
  const grammarNeeded = s.grammarCount + missing;

  // Câu từng sai được ưu tiên, NHƯNG không quá nửa số câu ngữ pháp —
  // nếu không thì phiên nào cũng chỉ toàn mấy câu cũ đã gặp đi gặp lại.
  const owedCap = Math.max(1, Math.ceil(grammarNeeded / 2));
  const owed = shuffle(await dueMistakes("grammar")).slice(0, Math.min(grammarNeeded, owedCap));
  owed.forEach((m) => qs.push(bankQuestion(m, "Ngữ pháp", "grammar", true)));

  // Còn thiếu bao nhiêu thì lấy câu LÂU CHƯA GẶP NHẤT, tránh trùng câu trong sổ lỗi.
  const owedIds = new Set(owed.map((m) => m.id));
  const seen = await getSeen();
  const bank = GRAMMAR_BANK.filter((it) => !owedIds.has(mistakeId(it.q)));
  let fresh = leastRecent(bank, Math.max(0, grammarNeeded - owed.length), seen);

  // Ngân hàng offline có hạn: nếu phải lấy lại câu đã gặp, xin AI câu mới thay thế.
  const repeats = fresh.filter((it) => seen[mistakeId(it.q)]).length;
  if (repeats > 0) {
    try {
      el.sub.textContent = "Đang lấy thêm câu ngữ pháp mới…";
      const ai = await takeAIQuestions(repeats, todayTopic(), "grammar");
      if (ai.length) fresh = fresh.slice(0, fresh.length - ai.length).concat(ai);
    } catch {}
    el.sub.textContent = `Hoàn thành ${vocabCount} từ vựng + ${s.grammarCount} câu ngữ pháp. Trước khi xong, mọi trang web sẽ bị chặn (cả ngày, không chỉ buổi sáng).`;
  }
  fresh.forEach((it) => qs.push(bankQuestion(it, "Ngữ pháp", "grammar")));

  await markSeen(fresh);
  startQueue(qs);
}

// ---------- Hiển thị ----------
let recallOn = true;   // đang ở chế độ gõ đáp án?
// Đúng ngay lần đầu, tự nhớ ra, khác hẳn đúng sau khi đã xem lựa chọn hoặc đã
// sai một lần. Cờ này quyết định chấm chất lượng 5 hay 3 cho SM-2.
let usedHelp = false;
let mustCopy = false;  // đang bắt chép lại đáp án đúng sau khi sai?

function render() {
  const q = queue[0];
  mustCopy = false;
  usedHelp = false;
  confuseToken++; // bỏ kết quả tra "nhầm từ" của câu trước nếu về muộn
  hintToken++;    // ... gợi ý nghĩa cũng vậy
  el.type.textContent = q.typeLabel;
  if (q.kind === "bank" && q.listenMode && q.listenText) {
    renderListenIntro(q);
  } else {
    el.q.innerHTML = q.prompt;
  }
  el.feedback.textContent = "";
  el.feedback.className = "g-feedback";
  el.next.classList.add("hidden");
  el.options.innerHTML = "";
  el.options.classList.add("hidden");
  el.inputWrap.classList.add("hidden");

  // Chỉ bắt gõ khi đáp án là TỪ/CỤM NGẮN; câu dài chuyển về trắc nghiệm
  // (nếu câu hỏi không có lựa chọn thì vẫn phải gõ).
  const useInput = recallOn && q.answer && (isTypable(q.answer) || !q.options);
  if (useInput) {
    // NHỚ LẠI: tự gõ đáp án, kèm gợi ý chữ cái đầu + số ô.
    el.q.innerHTML += `<div class="g-hint">${esc(answerHint(q.answer))}</div>`;
    // Gợi ý QUY TẮC ngữ pháp + gợi ý NGHĨA — GIẤU mặc định, chỉ hiện khi bấm
    // nút (người học muốn tự thử trước, không muốn bị mớm sẵn ngay từ đầu).
    // Kiểm tra sẵn có gì để hiện không TRƯỚC khi vẽ nút, để khỏi vẽ một nút
    // "gợi ý" rồi bấm vào chẳng hiện gì.
    const hasRuleHint = q.kind === "bank" && !!q.ruleHint;
    const hasMeaningHint = q.kind === "bank" && worthMeaningHint(q.answer);
    if (hasRuleHint || hasMeaningHint) {
      const revealBtn = document.createElement("button");
      revealBtn.type = "button";
      revealBtn.className = "g-reveal-hint";
      revealBtn.textContent = "💡 Bí quá? Hiện gợi ý";
      revealBtn.addEventListener("click", () => {
        revealBtn.remove();
        if (hasRuleHint) el.q.innerHTML += `<div class="g-mean-hint">📐 <b>${esc(q.ruleHint)}</b></div>`;
        if (hasMeaningHint) showMeaningHint(q);
      });
      el.q.appendChild(revealBtn);
    }
    el.inputWrap.classList.remove("hidden");
    el.input.value = "";
    el.input.disabled = false;
    el.check.classList.remove("hidden");
    el.hint.classList.toggle("hidden", !q.options);
    el.hint.textContent = "Hiện lựa chọn";
    if (q.kind === "vocab") addFixSpelling(q);
    el.input.focus();
  } else {
    el.options.classList.remove("hidden");
    q.options.forEach((o) => {
      const b = document.createElement("button");
      b.className = "g-opt";
      b.textContent = o.text;
      b.addEventListener("click", () => answer(o, b, q));
      el.options.appendChild(b);
    });
  }
  updateCounter();
}

// Thay vì hiện sẵn câu đề bài, phát âm cả câu (đã điền đáp án đúng) và bắt nghe
// rồi gõ lại từ còn thiếu — Nghe đang chiếm 0% luyện tập dù chiếm 25% điểm IELTS.
// Có nút "Hiện đề bài" cho ai thật sự bí, không bắt ép phải đoán mù.
function renderListenIntro(q) {
  el.q.innerHTML = `
    <div class="g-listen">
      <button type="button" class="g-btn g-listen-play">🔊 Nghe câu</button>
      <div class="g-listen-note">Nghe rồi gõ lại ĐÚNG từ còn thiếu bên dưới.</div>
    </div>
    <button type="button" class="g-listen-reveal">👁️ Không nghe rõ? Hiện đề bài</button>
  `;
  const playBtn = el.q.querySelector(".g-listen-play");
  const revealBtn = el.q.querySelector(".g-listen-reveal");
  onClick(playBtn, () => speakEn(q.listenText));
  onClick(revealBtn, () => {
    const box = document.createElement("div");
    box.innerHTML = q.prompt;
    revealBtn.replaceWith(box);
    return LOCK; // đã lộ đề, khỏi cần bấm lại
  });
  speakEn(q.listenText); // tự phát ngay khi câu hỏi hiện ra
}

// Từ tách từ PDF đôi khi sai chính tả ("off-theshelf"), hoặc lưu nhầm dạng đã chia
// ("knocked back"). Cho sửa ngay tại đây thay vì bắt học thuộc một từ sai.
function addFixSpelling(q) {
  const base = baseFormSuggestion(q.term);
  const fix = document.createElement("button");
  fix.type = "button";
  fix.className = "g-fix";
  fix.textContent = base ? `✎ Đưa về dạng gốc: "${base}"?` : "✎ Từ này lưu sai chính tả?";
  onClick(fix, async () => {
    // Có dạng gốc thì điền sẵn để bấm Enter là xong.
    const next = (prompt("Sửa lại từ (giữ nguyên tiến độ ôn):", base || q.term) || "").trim();
    if (!next || next === q.term) return;
    await syncRenameVocab(q.term, next);
    q.term = next;
    q.answer = next;
    render(); // vẽ lại gợi ý chữ cái theo từ mới
  });
  el.q.appendChild(fix);
}

// ---------- Gợi ý NGHĨA của từ cần điền ----------
// "If consumers ___ more carefully" thì chữ cái đầu + số ô vẫn không đủ để nghĩ ra
// từ (spent? saved? budgeted?). Nên đưa luôn nghĩa tiếng Việt của từ cần điền:
// vẫn phải tự viết ra, nhưng không còn phải đoán mò.
const FUNCTION_WORDS = new Set([
  "been", "being", "have", "having", "were", "was", "will", "would", "could",
  "should", "shall", "must", "might", "does", "did", "done", "there", "their",
  "which", "whose", "that", "this", "these", "those", "than", "then",
]);

// Đáp án có đáng tra nghĩa không? Từ đơn, đủ dài, không phải từ chức năng
// (đáp án kiểu "would have been" là chuyện ngữ pháp, tra nghĩa vô ích).
function worthMeaningHint(ans) {
  const a = String(ans || "").trim().toLowerCase();
  return /^[a-z][a-z'’-]{3,}$/.test(a) && !FUNCTION_WORDS.has(a);
}

const meaningHintCache = new Map(); // câu sai bị đẩy xuống cuối hàng đợi -> tra lại 1 lần thôi
let hintToken = 0;
let meaningPrefetch = null; // lượt gom cả phiên; câu đầu tiên chờ nó thay vì tự gọi lẻ

function hintContext(q) {
  return String(q.item?.q || "").replace(/\\n/g, " ").slice(0, 200);
}

// Gom MỌI từ cần gợi ý nghĩa của cả phiên vào MỘT lượt gọi API, và lấy trước từ
// kho đã lưu (miễn phí). Trước đây mỗi câu một lượt -> vài chục lượt mỗi phiên.
async function prefetchMeaningHints(qs) {
  const need = qs.filter((q) => q.kind === "bank" && worthMeaningHint(q.answer));
  if (!need.length) return;

  let saved = [];
  try { saved = await getVocab(); } catch {}
  const mine = new Map(saved.filter((v) => v.meaning).map((v) => [v.term.toLowerCase(), v.meaning]));

  const items = [];
  for (const q of need) {
    const key = q.answer.trim().toLowerCase();
    if (meaningHintCache.has(key)) continue;
    if (mine.has(key)) { meaningHintCache.set(key, mine.get(key)); continue; }
    if (!items.some((x) => x.term.toLowerCase() === key)) items.push({ term: q.answer.trim(), context: hintContext(q) });
  }
  if (!items.length) return;

  try {
    const r = await chrome.runtime.sendMessage({ type: "lookupMany", items });
    if (r?.ok) for (const [k, v] of Object.entries(r.meanings || {})) meaningHintCache.set(k, v);
  } catch {}
}

async function showMeaningHint(q) {
  const ans = String(q.answer || "").trim();
  if (!worthMeaningHint(ans)) return;

  const node = document.createElement("div");
  node.className = "g-mean-hint";
  node.textContent = "Đang lấy gợi ý nghĩa…";
  el.q.appendChild(node);
  const token = ++hintToken;
  const show = (mean) => {
    if (token !== hintToken) return;
    if (mean) node.innerHTML = `Nghĩa của từ cần điền: <b>${esc(mean)}</b>`;
    else node.remove();
  };

  const key = ans.toLowerCase();
  if (meaningHintCache.has(key)) { show(meaningHintCache.get(key)); return; }

  // Chờ lượt gom của cả phiên xong đã — gọi lẻ ngay lúc này là tốn thêm một lượt.
  if (meaningPrefetch) {
    try { await meaningPrefetch; } catch {}
    if (token !== hintToken) return;
    if (meaningHintCache.has(key)) { show(meaningHintCache.get(key)); return; }
  }

  // Từ đã có trong kho thì dùng luôn nghĩa đã lưu, khỏi tốn một lượt gọi API.
  try {
    const saved = (await getVocab()).find((v) => v.term.toLowerCase() === key);
    if (saved?.meaning) { meaningHintCache.set(key, saved.meaning); show(saved.meaning); return; }
  } catch {}

  try {
    const r = await chrome.runtime.sendMessage({
      type: "lookup",
      term: ans,
      context: String(q.item?.q || "").replace(/\\n/g, " ").slice(0, 200),
    });
    const mean = r?.ok ? String(r.meaning || "").trim() : "";
    meaningHintCache.set(key, mean);
    show(mean);
  } catch {
    show("");
  }
}

// ---------- Từ "cứng đầu": sai quá nhiều lần thì đổi cách học ----------
// Chép lại thêm lần nữa cũng không vào. Từ lần sai thứ 6 trở đi thì đưa hẳn MẸO
// NHỚ (gốc từ + liên tưởng + ví dụ). Mẹo sinh một lần rồi lưu vào mục từ vựng,
// lần sau lấy lại từ kho nên không tốn thêm lượt gọi API nào.
async function markVocabWrong(q) {
  const list = await syncReviewVocab(q.term, false);
  const v = list.find((x) => x.term.toLowerCase() === String(q.term).toLowerCase());
  if (!v || !isLeech(v)) return;

  const node = document.createElement("div");
  node.className = "g-tip";
  node.textContent = `💡 Sai ${v.lapses} lần rồi — đang lấy mẹo nhớ…`;
  el.feedback.appendChild(node);
  const token = confuseToken;
  const show = (text) => {
    if (token !== confuseToken) return;
    if (!text) { node.remove(); return; }
    node.innerHTML =
      `<b>💡 Mẹo nhớ "${esc(v.term)}"</b> — bạn đã sai ${v.lapses} lần:` +
      text.split("\n").filter((l) => l.trim()).map((l) => `<span>${esc(l.trim())}</span>`).join("");
  };

  if (v.mnemonic) { show(v.mnemonic); return; }
  try {
    const r = await chrome.runtime.sendMessage({ type: "mnemonic", term: v.term });
    show(r?.ok ? r.mnemonic : "");
  } catch { show(""); }
}

// Thứ vừa gõ có phải một từ khác trong kho mang đúng nghĩa đang hỏi không?
async function ambiguousTwin(q, typed) {
  const t = String(typed || "").trim();
  if (!t || !q.meaning || normAns(t) === normAns(q.answer)) return null;
  try {
    const v = (await getVocab()).find((x) => normAns(x.term) === normAns(t));
    return v && v.meaning && meaningsClash(v.meaning, q.meaning) ? v : null;
  } catch { return null; }
}

// ---------- "Bạn nhầm với từ nào?" ----------
// Gõ sai kiểu ĐỒNG NGHĨA / GẦN ÂM (đáp án "integration" mà gõ "incorporation")
// thì chỉ báo "sai" là chưa đủ: phải tách bạch hai từ thì lần sau mới hết nhầm.
function editDistance(a, b) {
  const m = a.length, n = b.length;
  if (!m || !n) return Math.max(m, n);
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

// Ngưỡng coi là "chỉ sai chính tả" chứ không phải nhầm sang từ khác.
function isTypoOf(typed, answer) {
  const d = editDistance(typed, answer);
  return d > 0 && d <= Math.max(1, Math.floor(answer.length / 5));
}

let confuseToken = 0; // hủy kết quả tra cứu về muộn khi đã sang câu khác

function fmtVocabHint(v, typed) {
  const same = normAns(v.term) === normAns(typed);
  const head = same ? "Bạn đang nhầm với" : `Bạn gõ "${typed}" — gần nhất trong kho là`;
  const mean = v.meaning ? ` — ${v.meaning}` : "";
  return `${head}: "${v.term}"${mean}`;
}

async function showConfusion(q, typed) {
  const t = String(typed || "").trim();
  const ans = String(q.answer || "").trim();
  if (!t || !ans) return;

  const node = document.createElement("span");
  node.className = "g-explain";
  el.feedback.appendChild(node);
  const token = ++confuseToken;
  const show = (text) => { if (token === confuseToken) node.textContent = text; };

  // 1) Chỉ sai chính tả -> trấn an, không đi tra từ khác cho rối.
  if (isTypoOf(normAns(t), normAns(ans))) {
    show(`Bạn nhớ đúng từ rồi, chỉ sai chính tả: "${t}" → "${ans}".`);
    return;
  }
  // Chỉ tra khi thứ vừa gõ trông như một từ/cụm tiếng Anh.
  if (!/^[A-Za-z][A-Za-z'’\- ]{2,}$/.test(t)) return;

  // 2) Tìm trong kho từ đã lưu: khớp đúng, rồi mới tới khớp gần (gõ sai chính tả tên từ kia).
  try {
    const list = await getVocab();
    const exact = list.find((v) => normAns(v.term) === normAns(t));
    if (exact) { show(fmtVocabHint(exact, t)); showCompare(ans, exact.term, token); return; }
    const near = list
      .map((v) => ({ v, d: editDistance(normAns(t), normAns(v.term)) }))
      .filter((x) => x.d <= Math.max(1, Math.floor(t.length / 5)) && normAns(x.v.term) !== normAns(ans))
      .sort((a, b) => a.d - b.d)[0];
    if (near) { show(fmtVocabHint(near.v, t)); showCompare(ans, near.v.term, token); return; }
  } catch {}

  // 3) Chưa có trong kho -> nhờ nền tra nghĩa của đúng từ vừa gõ (cần API key).
  show(`Đang tra "${t}" để xem bạn nhầm với từ nào…`);
  try {
    const r = await chrome.runtime.sendMessage({ type: "lookupWord", term: t });
    if (!r?.ok) { show(""); return; } // thiếu API key / lỗi mạng: im lặng, đừng làm rối phiên học
    const e = r.entry;
    const mean = e?.meaning || e?.definition || "";
    if (!mean) { show(`Không tra được "${t}" — có thể đây không phải một từ có thật.`); return; }
    show(`Từ bạn vừa gõ, "${t}": ${mean}`);
    showCompare(ans, t, token);
  } catch {
    show("");
  }
}

// Biết nghĩa của cả hai từ rồi mà vẫn nhầm (deteriorate vs diminish) thì thứ còn
// thiếu là RANH GIỚI giữa chúng. Kết quả cache theo cặp nên chỉ tốn một lượt gọi.
async function showCompare(answer, typed, token) {
  const a = String(answer || "").trim();
  const b = String(typed || "").trim();
  if (!a || !b || normAns(a) === normAns(b)) return;

  const node = document.createElement("div");
  node.className = "g-tip";
  node.textContent = `⚖️ Đang lấy phần phân biệt "${a}" / "${b}"…`;
  el.feedback.appendChild(node);

  const done = (text) => {
    if (token !== confuseToken) return;
    if (!text) { node.remove(); return; }
    node.innerHTML =
      `<b>⚖️ Phân biệt "${esc(a)}" và "${esc(b)}"</b>` +
      text.split("\n").filter((l) => l.trim()).map((l) => `<span>${esc(l.trim())}</span>`).join("");
  };

  try {
    const r = await chrome.runtime.sendMessage({ type: "compare", a, b });
    done(r?.ok ? r.text : "");
  } catch { done(""); }
}

function updateCounter() {
  el.count.textContent = `Đã xong ${solved}/${total} · còn ${queue.length} câu trong hàng đợi`;
  el.bar.style.width = total ? Math.round((solved / total) * 100) + "%" : "0%";
}

// Bấm "Hiện lựa chọn": bung 4 phương án, nhưng VẪN phải tự gõ ra đáp án.
el.hint.addEventListener("click", () => {
  const q = queue[0];
  if (!q || !q.options) return;
  usedHelp = true; // đã nhìn lựa chọn thì không còn là tự nhớ ra nữa
  el.options.classList.remove("hidden");
  el.options.innerHTML = "";
  q.options.forEach((o) => {
    const b = document.createElement("button");
    b.className = "g-opt ghost";
    b.textContent = o.text;
    b.disabled = true;
    el.options.appendChild(b);
  });
  el.hint.classList.add("hidden");
});

onClick(el.check, submitInput);
el.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); submitInput(); }
});

// Gõ Enter dồn dập cũng phải chặn như bấm nút: một lượt chấm mới được tính một lần.
let submitting = false;
async function submitInput() {
  if (submitting) return;
  submitting = true;
  try { await handleSubmit(); } finally { submitting = false; }
}

async function handleSubmit() {
  const q = queue[0];
  if (!q) return;
  const val = el.input.value;
  if (!val.trim()) { el.input.focus(); return; }

  // Giai đoạn CHÉP LẠI: sau khi sai, phải gõ đúng đáp án mới được đi tiếp.
  if (mustCopy) {
    if (!sameAnswer(val, q.answer)) {
      el.feedback.className = "g-feedback no";
      el.feedback.innerHTML = `Chưa khớp. Hãy gõ đúng: <b>${esc(q.answer)}</b>`;
      el.input.select();
      return;
    }
    mustCopy = false;
    queue.push(queue.shift()); // gặp lại câu này ở cuối phiên
    updateCounter();
    render();
    return;
  }

  if (sameAnswer(val, q.answer)) {
    el.feedback.className = "g-feedback ok";
    el.feedback.innerHTML = "✓ Chính xác!" + (q.explain ? `<span class="g-explain">${esc(q.explain)}</span>` : "");
    el.input.disabled = true;
    el.check.classList.add("hidden");
    el.hint.classList.add("hidden");
    solved++;
    queue.shift();
    if (q.kind === "vocab") { try { await syncReviewVocab(q.term, true, usedHelp || q.failed); } catch {} }
    if (q.fromMistake) { try { await markMistakeResult(q.mistakeId, true); } catch {} }
    updateCounter();
    el.next.classList.remove("hidden");
    el.next.focus();
    return;
  }

  // Gõ trúng một từ KHÁC trong kho nhưng mang đúng nghĩa đang hỏi -> đề bài mơ
  // hồ, không phải người học sai. Không đánh dấu sai, không trừ điểm nhớ.
  const twin = q.kind === "vocab" ? await ambiguousTwin(q, val) : null;
  if (twin) {
    q.failed = true; // vẫn chưa phải là tự nhớ ra đúng từ -> lần đúng sau tính mức "khó"
    mustCopy = true;
    el.feedback.className = "g-feedback";
    el.feedback.innerHTML =
      `Không tính là sai: <b>${esc(twin.term)}</b> trong kho cũng ghi nghĩa "${esc(twin.meaning)}".` +
      `<span class="g-explain">Câu này hỏi <b>${esc(q.answer)}</b>` +
      (q.explain ? ` — ${esc(q.explain)}` : "") + `</span>` +
      `<span class="g-explain">Gõ "${esc(q.answer)}" để đi tiếp.</span>`;
    el.input.value = "";
    el.input.focus();
    el.hint.classList.add("hidden");
    showCompare(q.answer, twin.term, confuseToken); // phần phân biệt vẫn rất đáng đọc
    return;
  }

  // SAI -> hiện đáp án + giải thích, rồi bắt chép lại (khắc sâu qua tự tay viết).
  el.feedback.className = "g-feedback no";
  el.feedback.innerHTML =
    `✗ Đáp án đúng: <b>${esc(q.answer)}</b>` +
    (q.explain ? `<span class="g-explain">${esc(q.explain)}</span>` : "") +
    `<span class="g-explain">Gõ lại đáp án đúng để ghi nhớ rồi bấm Kiểm tra.</span>`;
  q.failed = true; // lần đúng sau đó chỉ tính là "khó", không phải tự nhớ ra
  mustCopy = true;
  el.input.value = "";
  el.input.focus();
  el.hint.classList.add("hidden");
  showConfusion(q, val); // chạy nền: hiện "bạn nhầm với từ nào" khi tra xong

  if (q.kind === "vocab") { try { await markVocabWrong(q); } catch {} }
  if (q.kind === "bank") {
    try {
      if (q.fromMistake) await markMistakeResult(q.mistakeId, false);
      else await addMistake(q.item, q.bankKind);
    } catch {}
    saveWrongWord(q);
  }
}

// Trả lời dạng TRẮC NGHIỆM (dùng khi đáp án dài / tắt chế độ gõ).
async function answer(opt, btn, q) {
  [...el.options.children].forEach((b) => (b.disabled = true));
  const correctText = q.options.find((o) => o.correct)?.text;
  if (opt.correct) {
    btn.classList.add("correct");
    el.feedback.className = "g-feedback ok";
    el.feedback.innerHTML = "✓ Chính xác!" + (q.explain ? `<span class="g-explain">${esc(q.explain)}</span>` : "");
    solved++;
    queue.shift();
    // Chọn A/B/C/D là NHẬN DIỆN, bằng chứng nhớ yếu hơn tự gõ ra -> không thưởng ease.
    if (q.kind === "vocab") { try { await syncReviewVocab(q.term, true, true); } catch {} }
    if (q.fromMistake) { try { await markMistakeResult(q.mistakeId, true); } catch {} }
  } else {
    btn.classList.add("wrong");
    [...el.options.children].forEach((b) => { if (b.textContent === correctText) b.classList.add("correct"); });
    el.feedback.className = "g-feedback no";
    el.feedback.innerHTML =
      `✗ Đáp án đúng: <b>${esc(correctText)}</b>` +
      (q.explain ? `<span class="g-explain">${esc(q.explain)}</span>` : "");
    // Sai -> làm lại ở cuối phiên + lưu vào sổ lỗi để bữa sau kiểm tra.
    queue.push(queue.shift());
    if (q.kind === "vocab") { try { await markVocabWrong(q); } catch {} }
    if (q.kind === "bank") {
      try {
        if (q.fromMistake) await markMistakeResult(q.mistakeId, false);
        else await addMistake(q.item, q.bankKind);
      } catch {}
      saveWrongWord(q);
    }
  }
  updateCounter();
  el.next.classList.remove("hidden");
  el.next.focus();
}

onClick(el.next, async () => {
  if (!queue.length) await finish();
  else render();
});

// ---------- Kết thúc ----------
// Tên miền mạng xã hội khớp với URL đích.
function siteOf(url, sites) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    return (sites || []).find((d) => h === d || h.endsWith("." + d)) || h;
  } catch { return ""; }
}

async function markDone() {
  const s = await getSettings();
  const r = await chrome.storage.local.get("gateState");
  const st = r.gateState || {};
  if (MODE === "social") {
    // Trả bài xong -> RẢNH trong khoảng cooldown (mặc định 2h) trên MỌI trang MXH.
    const cd = (s.socialCooldownMin ?? 120) * 60000;
    st.socialCooldownUntil = Date.now() + cd;
    const today = todayKey();
    st.socialGateCount = (st.socialGateDate === today ? st.socialGateCount || 0 : 0) + 1;
    st.socialGateDate = today;
    socialUsedToday = st.socialGateCount;
    socialCooldownMin = s.socialCooldownMin ?? 120;
  } else {
    st.morningDoneDate = todayKey();
    // Vừa học sáng xong -> KHOAN khóa MXH: cho ân hạn bằng đúng thời gian cooldown.
    st.socialCooldownUntil = Date.now() + (s.socialCooldownMin ?? 120) * 60000;
  }
  await chrome.storage.local.set({ gateState: st });
  return s;
}

async function finish() {
  const s = await markDone();
  el.card.classList.add("hidden");
  el.startPane.classList.add("hidden");
  el.done.classList.remove("hidden");
  el.bar.style.width = "100%";
  el.count.textContent = "";
  el.doneTitle.textContent = MODE === "social" ? "Mở khóa thành công!" : "Xong bài hôm nay!";
  el.doneSub.textContent = MODE === "social"
    ? (() => {
        const used = socialUsedToday;
        const max = s.socialMaxPerDay ?? 5;
        const cd = socialCooldownMin;
        if (used >= max) return `Đã đủ ${max} lần trả bài hôm nay — từ giờ đến hết ngày bạn lướt thoải mái.`;
        const cdText = cd >= 60 ? `${(cd / 60).toFixed(cd % 60 ? 1 : 0)} tiếng` : `${cd} phút`;
        return `Rảnh ${cdText} tới. Lần ${used}/${max} hôm nay — hết ${cdText} mới khóa lại.`;
      })()
    : (() => {
        const cd = s.socialCooldownMin ?? 120;
        const cdText = cd >= 60 ? `${(cd / 60).toFixed(cd % 60 ? 1 : 0)} tiếng` : `${cd} phút`;
        return `Cả ngày không bị chặn học nữa, và mạng xã hội được rảnh ${cdText} tới. Hẹn gặp lại ngày mai!`;
      })();
}

onClick(el.go, () => { location.replace(NEXT || "about:blank"); return LOCK; });

// Bỏ qua (vẫn giữ quyền tự chủ, nhưng có xác nhận).
onClick(el.skip, async () => {
  if (!confirm("Bỏ qua phiên học này?\n\nBạn sẽ không được ghi nhận tiến độ hôm nay.")) return;
  if (MODE === "social") {
    const s = await getSettings();
    const r = await chrome.storage.local.get("gateState");
    const st = r.gateState || {};
    // Bỏ qua -> cho rảnh ngắn (15 phút) rồi khóa lại.
    st.socialCooldownUntil = Date.now() + 15 * 60000;
    await chrome.storage.local.set({ gateState: st });
  } else {
    const r = await chrome.storage.local.get("gateState");
    const st = r.gateState || {};
    st.morningSnoozeUntil = Date.now() + 15 * 60000; // hoãn 15 phút
    await chrome.storage.local.set({ gateState: st });
  }
  location.replace(NEXT || "about:blank");
  return LOCK;
});

buildSession();
