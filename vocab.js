// ============================================================
// vocab.js — Lưu trữ & học từ vựng. Dùng chung cho background (importScripts)
// và side panel (thẻ <script>). Áp dụng hệ thống hộp Leitner đơn giản để ôn tập.
// ============================================================

const VOCAB_KEY = "vocab";
const STATS_KEY = "vocabStats";

// ============================================================
// Validator mục từ vựng "sạch" — dùng chung cho auto-lưu (gate) & nút dọn rác.
// GIỮ: từ đơn, phrasal verb, collocation/idiom (vd "clarify the confusion",
//      "make a decision", "take into account", "a piece of cake").
// LOẠI: mảnh MỆNH ĐỀ có chủ ngữ + động từ chia thì (vd "the gallery opened",
//      "crowded was the gallery", "so little space that").
// ============================================================
// Từ báo hiệu MỆNH ĐỀ (trợ động từ, đại từ chủ ngữ, đại từ quan hệ).
const CLAUSE_SIGNAL = new Set([
  "is", "are", "was", "were", "be", "been", "am", "do", "does", "did",
  "have", "has", "had", "will", "would", "shall", "should", "can", "could",
  "may", "might", "must", "that", "which", "who", "whom", "whose",
  "i", "we", "you", "they", "he", "she", "it", "there",
]);

// Mảnh MỆNH ĐỀ (có chủ ngữ / trợ động từ chia thì) — không học được như một mục
// từ vựng, vd "will the university release", "the gallery opened".
function isClauseLike(term) {
  const w = String(term || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (w.length < 2) return false; // từ đơn không thể là mệnh đề
  if (w.some((x) => CLAUSE_SIGNAL.has(x))) return true; // có trợ ĐT/đại từ
  // Mẫu "the/a/an <danh từ> <động từ-ed>" = câu (vd "the gallery opened").
  if (["the", "a", "an"].includes(w[0]) && w.length >= 3 && /(ed|s)$/.test(w[w.length - 1])) return true;
  return false;
}

// Rác rõ ràng: không có nổi một chữ cái tiếng Anh nào ra hồn — số ("11.1"),
// ký hiệu, mảnh công thức. Không học được, cũng không gõ lại được.
function isJunkTerm(term) {
  return !/[A-Za-z]{2,}/.test(String(term || ""));
}

function isCleanLexicalItem(term) {
  const t = String(term || "").trim();
  if (!t || t.length > 40) return false;
  if (!/^[A-Za-z][A-Za-z'’\- ]*$/.test(t)) return false; // chỉ chữ + gạch nối/nháy
  const w = t.toLowerCase().split(/\s+/);
  if (w.length > 4) return false; // cụm quá dài -> nhiều khả năng là câu
  if (w.length === 1) return true; // từ đơn: OK
  return !isClauseLike(t);
}

// ============================================================
// Dạng gốc (từ điển) của một mục — "knocked back" phải lưu thành "knock back",
// nếu không thì học thuộc một dạng chia thì, tra từ điển cũng không ra.
// Chỉ suy luận khi CHẮC CHẮN; mơ hồ ("hoped" -> hop hay hope?) thì trả "".
// ============================================================
const PARTICLES = new Set([
  "up", "down", "out", "in", "on", "off", "over", "back", "away", "through",
  "along", "across", "around", "about", "by", "into", "onto", "upon", "after",
  "for", "with", "forward", "ahead", "apart", "aside", "together", "round",
  "behind", "past", "under", "against", "of", "to", "at", "from",
]);

const IRREGULAR_BASE = {
  went: "go", gone: "go", took: "take", taken: "take", came: "come",
  got: "get", gotten: "get", gave: "give", given: "give", made: "make",
  ran: "run", held: "hold", broke: "break", broken: "break", brought: "bring",
  bought: "buy", caught: "catch", chose: "choose", chosen: "choose",
  drew: "draw", drawn: "draw", drove: "drive", driven: "drive",
  fell: "fall", fallen: "fall", felt: "feel", found: "find", flew: "fly",
  forgot: "forget", forgotten: "forget", grew: "grow", grown: "grow",
  heard: "hear", kept: "keep", knew: "know", known: "know", led: "lead",
  left: "leave", lent: "lend", lost: "lose", met: "meet", paid: "pay",
  rose: "rise", risen: "rise", said: "say", saw: "see", seen: "see",
  sold: "sell", sent: "send", showed: "show", shown: "show", sang: "sing",
  sat: "sit", slept: "sleep", spoke: "speak", spoken: "speak", spent: "spend",
  stood: "stand", stuck: "stick", taught: "teach", told: "tell",
  thought: "think", threw: "throw", thrown: "throw", understood: "understand",
  woke: "wake", woken: "wake", wore: "wear", worn: "wear", won: "win",
  wrote: "write", written: "write",
};

// Bỏ đuôi xong có chắc KHÔNG thiếu "e" câm không? Chắc khi thân từ kết thúc bằng
// 2 phụ âm (work, help, finish), 2 nguyên âm + phụ âm (look, need) hoặc nguyên âm + y
// (play). Còn "hop" thì mơ hồ (hop hay hope?) -> không đoán.
function endsInConsonantCluster(stem) {
  return /[^aeiou][^aeiouy]$/.test(stem) ||
    /(ck|sh|ch|ss|ll|tch)$/.test(stem) ||
    /[aeiou][aeiou][^aeiou]$/.test(stem) ||
    /[aeiou]y$/.test(stem);
}

// Dạng gốc của MỘT từ. Trả "" nếu đã là dạng gốc hoặc không dám chắc.
function baseWord(word) {
  const w = String(word || "").toLowerCase();
  if (!/^[a-z][a-z'’-]*$/.test(w)) return "";
  if (IRREGULAR_BASE[w]) return IRREGULAR_BASE[w];
  if (/ied$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";           // carried -> carry
  if (/([bdfglmnprt])\1ed$/.test(w)) return w.slice(0, -3);                  // stopped -> stop
  if (/eed$/.test(w)) return w.slice(0, -1);                                  // agreed -> agree
  if (/ed$/.test(w)) {
    const stem = w.slice(0, -2);
    return stem.length >= 3 && endsInConsonantCluster(stem) ? stem : "";      // knocked -> knock
  }
  if (/([bdfglmnprt])\1ing$/.test(w)) return w.slice(0, -4);                  // running -> run
  if (/ing$/.test(w)) {
    const stem = w.slice(0, -3);
    return stem.length >= 3 && endsInConsonantCluster(stem) ? stem : "";      // knocking -> knock
  }
  if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";            // carries -> carry
  if (/(ss|us|is)$/.test(w)) return "";                                        // pass, focus: giữ nguyên
  if (/[^s]s$/.test(w)) return w.slice(0, -1);                                 // knocks -> knock
  return "";
}

// Dạng gốc của cả mục — CHỈ áp dụng cho cụm động từ (từ đầu + tiểu từ), vì ở đó
// từ đầu chắc chắn là động từ: "knocked back" ✓, "increased demand" ✗ ("demand"
// không phải tiểu từ). Từ ĐƠN thì bỏ qua: tiếng Anh quá mơ hồ — "building",
// "meeting", "advanced", "left" đều là từ có nghĩa riêng, đổi bừa là hỏng kho.
function baseFormSuggestion(term) {
  const t = String(term || "").trim();
  const w = t.split(/\s+/);
  if (w.length === 1) return "";
  if (!w.slice(1).every((x) => PARTICLES.has(x.toLowerCase()))) return "";
  const b = baseWord(w[0]);
  if (!b || b === w[0].toLowerCase()) return "";
  return [b, ...w.slice(1)].join(" ").toLowerCase();
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function ymd(offsetDays) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function getStats() {
  const r = await chrome.storage.local.get(STATS_KEY);
  return r[STATS_KEY] || { streak: 0, lastStudyDate: "", days: {} };
}

// kind: "new" (từ mới) | "reviewed" (lượt ôn/kiểm tra)
async function bumpStat(kind, n = 1) {
  const s = await getStats();
  const d = todayStr();
  if (!s.days[d]) s.days[d] = { new: 0, reviewed: 0 };
  s.days[d][kind] = (s.days[d][kind] || 0) + n;
  if (s.lastStudyDate !== d) {
    s.streak = s.lastStudyDate === ymd(-1) ? (s.streak || 0) + 1 : 1;
    s.lastStudyDate = d;
  }
  await chrome.storage.local.set({ [STATS_KEY]: s });
  return s;
}

async function getTodayStats() {
  const s = await getStats();
  return { today: s.days[todayStr()] || { new: 0, reviewed: 0 }, streak: s.streak || 0 };
}
// Khoảng cách ôn tập (ngày) theo từng "hộp" Leitner (box 1..5).
const LEITNER_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };
const DAY_MS = 24 * 60 * 60 * 1000;

async function getVocab() {
  const r = await chrome.storage.local.get(VOCAB_KEY);
  return r[VOCAB_KEY] || [];
}

async function saveVocabList(list) {
  await chrome.storage.local.set({ [VOCAB_KEY]: list });
}

// Thêm/cập nhật một mục từ vựng. Trả về danh sách mới.
const VOCAB_EXTRA = ["phonetic", "audio", "pos", "definition", "example", "kind", "mnemonic", "collocs", "cloze", "clozeVi"];

// Từ TRỪU TƯỢNG, học thuật: remuneration, liquidity, advocacy, cohesion,
// engagement, appraisal, initiative, residential… Nhóm này gắn không nổi vào một
// hình ảnh nào, hình thức lại na ná nhau, nên học rời "từ → nghĩa" là quên ngay;
// phải học bằng CỤM ĐI CHUNG và câu ngữ cảnh. Nhận diện qua hậu tố danh/tính từ
// trừu tượng — đúng đặc trưng của lớp từ này.
const ABSTRACT_SUFFIX = /(ation|ution|ition|tion|sion|ity|ance|ence|ancy|ency|acy|ment|ism|ness|ship|hood|ive|ory|al)$/;

// Đuôi -al/-ive/-ory bắt được appraisal, residential, initiative, advisory —
// nhưng cũng quét trúng cả một rổ từ RẤT cụ thể. Chặn riêng nhóm đó.
// (-ure bị bỏ hẳn khỏi danh sách vì picture/future/nature/furniture/structure
// đều là từ cụ thể, hình dung được ngay.)
const CONCRETE_WORDS = new Set([
  "animal", "capital", "hospital", "festival", "material", "digital", "native",
  "local", "total", "final", "metal", "signal", "medal", "manual", "annual",
  "terminal", "central", "normal", "several", "general", "special", "social",
  "personal", "national", "global", "original", "physical", "musical", "hotel",
]);

function isAbstractTerm(term) {
  const t = String(term || "").trim().toLowerCase();
  if (!/^[a-z]{6,}$/.test(t) || CONCRETE_WORDS.has(t)) return false;
  return ABSTRACT_SUFFIX.test(t);
}

async function addVocab(entry) {
  const term = (entry.term || "").trim();
  if (!term) return await getVocab();
  const list = await getVocab();
  const existing = list.find((v) => v.term.toLowerCase() === term.toLowerCase());
  if (existing) {
    if (entry.meaning) existing.meaning = entry.meaning;
    if (entry.context) existing.context = entry.context;
    if (entry.source) existing.source = entry.source;
    for (const k of VOCAB_EXTRA) if (entry[k]) existing[k] = entry[k];
  } else {
    const v = {
      term,
      meaning: entry.meaning || "",
      context: entry.context || "",
      source: entry.source || "",
      createdAt: Date.now(),
      box: 1,
      reviewedAt: 0,
      nextReview: Date.now(),
    };
    for (const k of VOCAB_EXTRA) v[k] = entry[k] || "";
    list.unshift(v);
    await bumpStat("new"); // đếm từ mới cho mục tiêu hằng ngày
  }
  await saveVocabList(list);
  return list;
}

// Sửa chính tả của một từ, GIỮ nguyên tiến độ ôn tập.
// Cần vì từ tách từ PDF đôi khi dính lỗi ngắt dòng ("off-theshelf").
async function renameVocab(oldTerm, newTerm) {
  const next = (newTerm || "").trim();
  if (!next) return await getVocab();
  const list = await getVocab();
  const v = list.find((x) => x.term.toLowerCase() === String(oldTerm).toLowerCase());
  if (!v) return list;
  // Đã có mục khác trùng tên -> gộp: giữ mục cũ (tiến độ dài hơn), bỏ mục kia.
  const dup = list.find((x) => x !== v && x.term.toLowerCase() === next.toLowerCase());
  v.term = next;
  const out = dup ? list.filter((x) => x !== dup) : list;
  await saveVocabList(out);
  return out;
}

async function removeVocab(term) {
  const list = (await getVocab()).filter(
    (v) => v.term.toLowerCase() !== term.toLowerCase()
  );
  await saveVocabList(list);
  return list;
}

// ============================================================
// Lặp lại ngắt quãng SM-2 (thuật toán Anki dùng) — nhớ lâu hơn hệ hộp cũ:
// mỗi từ có "hệ số dễ" (ease) riêng, khoảng cách ôn giãn dần theo mức bạn nhớ.
// ============================================================
const MIN_EASE = 1.3;
const LEECH_THRESHOLD = 6; // sai >= 6 lần -> từ "cứng đầu", cần đổi cách học

// Bổ sung trường SM-2 cho từ cũ (di trú từ hệ hộp Leitner).
function ensureSrs(v) {
  if (typeof v.ease !== "number") {
    v.ease = 2.5;
    v.reps = Math.max(0, (v.box || 1) - 1);
    v.interval = [0, 0, 1, 3, 7, 16][v.box || 1] || 0;
    v.lapses = v.lapses || 0;
    v.due = v.nextReview || Date.now();
  }
  return v;
}

// Phần TÍNH TOÁN thuần của SM-2, tách riêng để bản xem trước trên nút và bản
// ghi thật không bao giờ lệch nhau nữa (trước đây preview nhân 0.6/1.3 cho
// "Khó"/"Dễ" còn bản thật thì không -> nút hiện 18 ngày mà lưu 30 ngày).
// quality: 0–5. Dưới 3 = quên. 3 = khó, 4 = được, 5 = dễ.
function nextSrs(v, quality) {
  const q = Math.max(0, Math.min(5, quality));
  const ease = typeof v.ease === "number" ? v.ease : 2.5;
  if (q < 3) {
    // Quên: học lại sớm, giảm nhẹ hệ số dễ — KHÔNG xóa sạch tiến độ như hộp cũ.
    return { lapses: (v.lapses || 0) + 1, reps: 0, interval: 0, ease: Math.max(MIN_EASE, ease - 0.2) };
  }
  const reps = (v.reps || 0) + 1;
  let interval;
  if (reps === 1) interval = 1;
  else if (reps === 2) interval = 6;
  else interval = Math.max(1, Math.round((v.interval || 1) * ease));
  if (q === 3) interval = Math.max(1, Math.round(interval * 0.6)); // "Khó" -> ngắn hơn
  if (q === 5) interval = Math.round(interval * 1.3); // "Dễ" -> dài hơn
  return {
    lapses: v.lapses || 0,
    reps,
    interval,
    ease: Math.max(MIN_EASE, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))),
  };
}

async function reviewVocabSM2(term, quality) {
  const list = await getVocab();
  const v = list.find((x) => x.term.toLowerCase() === term.toLowerCase());
  if (!v) return list;
  ensureSrs(v);
  const q = Math.max(0, Math.min(5, quality));
  Object.assign(v, nextSrs(v, q));

  v.due = Date.now() + (v.interval > 0 ? v.interval * DAY_MS : 10 * 60 * 1000);
  v.reviewedAt = Date.now();
  v.nextReview = v.due; // giữ tương thích ngược
  v.box = Math.min(5, (v.reps || 0) + 1);
  await saveVocabList(list);
  await bumpStat("reviewed");
  await bumpStat(q >= 3 ? "correct" : "wrong"); // để tính độ chính xác
  return list;
}

// Đúng/sai -> chất lượng SM-2.
// LƯU Ý: q=4 làm hệ số dễ ĐỨNG YÊN (0.1 - 1×0.10 = 0), nên nếu mọi câu đúng đều
// chấm 4 thì ease chỉ có đường đi xuống: sai 6 lần là chạm sàn 1.3 vĩnh viễn và
// từ đó lịch ôn không bao giờ giãn ra được nữa. Đúng ngay lần đầu, không dùng
// gợi ý -> q=5 (ease +0.1). Đúng nhưng có trợ giúp / đã sai trước đó -> q=3.
async function reviewVocab(term, known, helped) {
  if (!known) return reviewVocabSM2(term, 2);
  return reviewVocabSM2(term, helped ? 3 : 5);
}

// Xem trước khoảng cách ôn nếu chọn mức q (để hiện lên nút) — cùng công thức
// với lúc ghi thật, nên con số trên nút luôn đúng.
function srsPreview(v, q) {
  if (q < 3) return "10 phút";
  const interval = nextSrs(v, q).interval;
  return interval >= 30 ? (interval / 30).toFixed(1) + " tháng" : interval + " ngày";
}

function isLeech(v) {
  return (v.lapses || 0) >= LEECH_THRESHOLD;
}

// ---------- 5 mức độ nhớ ----------
const MEMORY_LEVELS = [
  { label: "Chưa học", color: "#9ca3af", desc: "chưa ôn lần nào" },
  { label: "Mới học", color: "#f59e0b", desc: "nhớ dưới 3 ngày" },
  { label: "Đang nhớ", color: "#3b82f6", desc: "3–13 ngày" },
  { label: "Nhớ tốt", color: "#8b5cf6", desc: "14–59 ngày" },
  { label: "Thuộc lòng", color: "#16a34a", desc: "từ 60 ngày trở lên" },
];

// Mức nhớ của một từ, suy ra từ khoảng cách ôn hiện tại (SM-2).
function memoryLevel(v) {
  ensureSrs(v);
  if (!v.reviewedAt) return 0;
  const i = v.interval || 0;
  if (i < 3) return 1;
  if (i < 14) return 2;
  if (i < 60) return 3;
  return 4;
}

function levelDistribution(list) {
  const counts = [0, 0, 0, 0, 0];
  list.forEach((v) => counts[memoryLevel(v)]++);
  return counts;
}

// ---------- Kiểm tra lại định kỳ ----------
const RETEST_KEY = "lastRetestDate";

// Đến hạn kiểm tra lại tổng hợp chưa? (mặc định mỗi 7 ngày)
async function retestDueInDays(everyDays = 7) {
  const r = await chrome.storage.local.get(RETEST_KEY);
  const last = r[RETEST_KEY];
  if (!last) return 0; // chưa từng -> đến hạn ngay
  const diff = Math.floor((Date.now() - new Date(last + "T00:00:00").getTime()) / DAY_MS);
  return Math.max(0, everyDays - diff);
}
async function markRetestDone() {
  await chrome.storage.local.set({ [RETEST_KEY]: todayStr() });
}

// Nhóm từ dùng cho kiểm tra lại: những từ ĐÃ học (bỏ qua lịch đến hạn).
function learnedWords(list) {
  return list.filter((v) => v.meaning && v.reviewedAt);
}

// Các mục đến hạn ôn.
function dueVocab(list) {
  const now = Date.now();
  return list.filter((v) => (v.due ?? v.nextReview ?? 0) <= now);
}
