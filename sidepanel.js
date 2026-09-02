pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("lib/pdf.worker.min.js");

const el = {
  openBtn: document.getElementById("openBtn"),
  webBtn: document.getElementById("webBtn"),
  pdfUrlBtn: document.getElementById("pdfUrlBtn"),
  pasteBtn: document.getElementById("pasteBtn"),
  pasteBtn2: document.getElementById("pasteBtn2"),
  pasteModal: document.getElementById("pasteModal"),
  pasteText: document.getElementById("pasteText"),
  pasteAuto: document.getElementById("pasteAuto"),
  pasteClose: document.getElementById("pasteClose"),
  pasteLoad: document.getElementById("pasteLoad"),
  pomoBtn: document.getElementById("pomoBtn"),
  pomoModal: document.getElementById("pomoModal"),
  pomoClose: document.getElementById("pomoClose"),
  pomoTask: document.getElementById("pomoTask"),
  pomoPhase: document.getElementById("pomoPhase"),
  pomoTime: document.getElementById("pomoTime"),
  pomoRound: document.getElementById("pomoRound"),
  pomoToggle: document.getElementById("pomoToggle"),
  pomoSkip: document.getElementById("pomoSkip"),
  pomoReset: document.getElementById("pomoReset"),
  pomoWork: document.getElementById("pomoWork"),
  pomoBreak: document.getElementById("pomoBreak"),
  helpBtn: document.getElementById("helpBtn"),
  helpModal: document.getElementById("helpModal"),
  helpClose: document.getElementById("helpClose"),
  settingsBtn: document.getElementById("settingsBtn"),
  fileInput: document.getElementById("fileInput"),
  tabTranslate: document.getElementById("tabTranslate"),
  tabQA: document.getElementById("tabQA"),
  tabVocab: document.getElementById("tabVocab"),
  tabGrammar: document.getElementById("tabGrammar"),
  vocabCount: document.getElementById("vocabCount"),
  viewTranslate: document.getElementById("viewTranslate"),
  viewQA: document.getElementById("viewQA"),
  viewVocab: document.getElementById("viewVocab"),
  viewGrammar: document.getElementById("viewGrammar"),
  grammarSearch: document.getElementById("grammarSearch"),
  grammarBody: document.getElementById("grammarBody"),
  tabNotes: document.getElementById("tabNotes"),
  viewNotes: document.getElementById("viewNotes"),
  noteInput: document.getElementById("noteInput"),
  noteTitleInput: document.getElementById("noteTitleInput"),
  noteAdd: document.getElementById("noteAdd"),
  notesList: document.getElementById("notesList"),
  openJournal: document.getElementById("openJournal"),
  openTodo: document.getElementById("openTodo"),
  // Nhật ký (popup + lịch)
  journalModal: document.getElementById("journalModal"),
  jrDone: document.getElementById("jrDone"),
  jrClose: document.getElementById("jrClose"),
  jrRequired: document.getElementById("jrRequired"),
  jrPrev: document.getElementById("jrPrev"),
  jrNext: document.getElementById("jrNext"),
  jrMonth: document.getElementById("jrMonth"),
  jrGrid: document.getElementById("jrGrid"),
  jrDateLabel: document.getElementById("jrDateLabel"),
  journalInput: document.getElementById("journalInput"),
  journalSave: document.getElementById("journalSave"),
  journalFix: document.getElementById("journalFix"),
  journalDel: document.getElementById("journalDel"),
  journalFixResult: document.getElementById("journalFixResult"),
  // Việc cần làm
  todoModal: document.getElementById("todoModal"),
  tdClose: document.getElementById("tdClose"),
  todoInput: document.getElementById("todoInput"),
  todoAdd: document.getElementById("todoAdd"),
  todoList: document.getElementById("todoList"),
  todoClearDone: document.getElementById("todoClearDone"),
  todoDone: document.getElementById("todoDone"),
  qaEmpty: document.getElementById("qaEmpty"),
  qaChat: document.getElementById("qaChat"),
  qaMessages: document.getElementById("qaMessages"),
  qaSuggest: document.getElementById("qaSuggest"),
  qaText: document.getElementById("qaText"),
  qaSend: document.getElementById("qaSend"),
  qaScope: document.getElementById("qaScope"),
  kbBtn: document.getElementById("kbBtn"),
  kbCount: document.getElementById("kbCount"),
  qaClearBtn: document.getElementById("qaClearBtn"),
  kbModal: document.getElementById("kbModal"),
  kbClose: document.getElementById("kbClose"),
  kbAddCurrent: document.getElementById("kbAddCurrent"),
  kbAddPaste: document.getElementById("kbAddPaste"),
  kbAddUrl: document.getElementById("kbAddUrl"),
  kbStatus: document.getElementById("kbStatus"),
  kbSources: document.getElementById("kbSources"),
  kbClear: document.getElementById("kbClear"),
  kbDone: document.getElementById("kbDone"),
  dropzone: document.getElementById("dropzone"),
  warn: document.getElementById("warn"),
  warnSettings: document.getElementById("warnSettings"),
  toolbar: document.getElementById("toolbar"),
  docName: document.getElementById("docName"),
  viewMode: document.getElementById("viewMode"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  translateAllBtn: document.getElementById("translateAllBtn"),
  stopBtn: document.getElementById("stopBtn"),
  layoutInfo: document.getElementById("layoutInfo"),
  progress: document.getElementById("progress"),
  progressBar: document.getElementById("progressBar"),
  pages: document.getElementById("pages"),
  status: document.getElementById("status"),
  // study dashboard
  sdToday: document.getElementById("sdToday"),
  sdGoal: document.getElementById("sdGoal"),
  sdStreak: document.getElementById("sdStreak"),
  sdDue: document.getElementById("sdDue"),
  sdTotal: document.getElementById("sdTotal"),
  sdBar: document.getElementById("sdBar"),
  ieltsTopic: document.getElementById("ieltsTopic"),
  ieltsKind: document.getElementById("ieltsKind"),
  ieltsBtn: document.getElementById("ieltsBtn"),
  quizBtn: document.getElementById("quizBtn"),
  dailyBtn: document.getElementById("dailyBtn"),
  statsBtn: document.getElementById("statsBtn"),
  statsModal: document.getElementById("statsModal"),
  stClose: document.getElementById("stClose"),
  stStreak: document.getElementById("stStreak"),
  stTotal: document.getElementById("stTotal"),
  stDue: document.getElementById("stDue"),
  stAcc: document.getElementById("stAcc"),
  stBar: document.getElementById("stBar"),
  stLevels: document.getElementById("stLevels"),
  stChart: document.getElementById("stChart"),
  stRoadInfo: document.getElementById("stRoadInfo"),
  stRoadBtn: document.getElementById("stRoadBtn"),
  stRoadResult: document.getElementById("stRoadResult"),
  stCleanInfo: document.getElementById("stCleanInfo"),
  stCleanBtn: document.getElementById("stCleanBtn"),
  stBaseInfo: document.getElementById("stBaseInfo"),
  stBaseBtn: document.getElementById("stBaseBtn"),
  stDupInfo: document.getElementById("stDupInfo"),
  stDupBtn: document.getElementById("stDupBtn"),
  stMistakeInfo: document.getElementById("stMistakeInfo"),
  stMistakeBtn: document.getElementById("stMistakeBtn"),
  stRetestInfo: document.getElementById("stRetestInfo"),
  stRetestBtn: document.getElementById("stRetestBtn"),
  ieltsStatus: document.getElementById("ieltsStatus"),
  // đề IELTS hôm nay
  ieltsDaily: document.getElementById("ieltsDaily"),
  idClose: document.getElementById("idClose"),
  idDate: document.getElementById("idDate"),
  idFresh: document.getElementById("idFresh"),
  idFromUrl: document.getElementById("idFromUrl"),
  idSrcNote: document.getElementById("idSrcNote"),
  idWriting: document.getElementById("idWriting"),
  idEssay: document.getElementById("idEssay"),
  idScore: document.getElementById("idScore"),
  idScoreResult: document.getElementById("idScoreResult"),
  idSpeaking: document.getElementById("idSpeaking"),
  idGenReading: document.getElementById("idGenReading"),
  idReading: document.getElementById("idReading"),
  // quiz
  quiz: document.getElementById("quiz"),
  quizClose: document.getElementById("quizClose"),
  quizProgress: document.getElementById("quizProgress"),
  quizType: document.getElementById("quizType"),
  quizQ: document.getElementById("quizQ"),
  quizOptions: document.getElementById("quizOptions"),
  quizInput: document.getElementById("quizInput"),
  quizFeedback: document.getElementById("quizFeedback"),
  quizSubmit: document.getElementById("quizSubmit"),
  quizNext: document.getElementById("quizNext"),
  quizResult: document.getElementById("quizResult"),
  quizPanel: document.getElementById("quizPanel"),
  quizSetup: document.getElementById("quizSetup"),
  quizSetupInfo: document.getElementById("quizSetupInfo"),
  quizCountOpts: document.getElementById("quizCountOpts"),
  quizStart: document.getElementById("quizStart"),
  // vocab
  lookupInput: document.getElementById("lookupInput"),
  lookupBtn: document.getElementById("lookupBtn"),
  lookupResult: document.getElementById("lookupResult"),
  maTerm: document.getElementById("maTerm"),
  maMeaning: document.getElementById("maMeaning"),
  maKind: document.getElementById("maKind"),
  maAdd: document.getElementById("maAdd"),
  maStatus: document.getElementById("maStatus"),
  vocabSearch: document.getElementById("vocabSearch"),
  reviewBtn: document.getElementById("reviewBtn"),
  exportBtn: document.getElementById("exportBtn"),
  vocabList: document.getElementById("vocabList"),
  // flashcard
  flashcard: document.getElementById("flashcard"),
  fcClose: document.getElementById("fcClose"),
  fcProgress: document.getElementById("fcProgress"),
  fcTerm: document.getElementById("fcTerm"),
  fcMeaning: document.getElementById("fcMeaning"),
  fcContext: document.getElementById("fcContext"),
  fcReveal: document.getElementById("fcReveal"),
  fcGrade: document.getElementById("fcGrade"),
  fcSetup: document.getElementById("fcSetup"),
  fcSetupInfo: document.getElementById("fcSetupInfo"),
  fcCountOpts: document.getElementById("fcCountOpts"),
  fcStart: document.getElementById("fcStart"),
  fcReview: document.getElementById("fcReview"),
  fcAgain: document.getElementById("fcAgain"),
  fcHard: document.getElementById("fcHard"),
  fcGood: document.getElementById("fcGood"),
  fcEasy: document.getElementById("fcEasy"),
};

let segments = [];
let abortController = null;
let translatingAll = false;
let viewModeVal = "both"; // both | vi | src
let pasteTarget = "doc"; // doc | kb — đích của modal dán văn bản
let qaScopeVal = "doc"; // doc | kb — phạm vi hỏi đáp

// ---------- Cấu hình / cảnh báo API key ----------
el.settingsBtn.addEventListener("click", () => chrome.runtime.openOptionsPage());
// ---------- Pomodoro ----------
let pomoTimer = null;
let pomoState = null;

function pomoSend(action, extra) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ pomo: action, ...extra }, (res) => resolve(res?.state));
  });
}
async function pomoRefresh() {
  pomoState = await pomoSend("state");
  renderPomo();
}
function renderPomo() {
  const p = pomoState;
  if (!p) return;
  if (el.pomoWork.value === "" || document.activeElement !== el.pomoWork) el.pomoWork.value = p.workMin;
  if (el.pomoBreak.value === "" || document.activeElement !== el.pomoBreak) el.pomoBreak.value = p.breakMin;
  if (document.activeElement !== el.pomoTask) el.pomoTask.value = p.task || "";
  el.pomoPhase.textContent = p.phase === "break"
    ? "☕ Nghỉ ngơi"
    : (p.task ? "🎯 " + p.task : "🎯 Tập trung làm việc");
  el.pomoPhase.className = "pomo-phase " + (p.phase === "break" ? "brk" : "wrk");
  el.pomoRound.textContent = p.round ? `Đã hoàn thành ${p.round} phiên hôm nay` : "";
  el.pomoToggle.textContent = p.running ? "Tạm dừng" : (p.pausedLeft > 0 ? "Tiếp tục" : "Bắt đầu");
  let leftMs;
  if (p.running) leftMs = Math.max(0, p.endsAt - Date.now());
  else leftMs = p.pausedLeft > 0 ? p.pausedLeft : (p.phase === "break" ? p.breakMin : p.workMin) * 60000;
  const mm = Math.floor(leftMs / 60000);
  const ss = Math.floor((leftMs % 60000) / 1000);
  el.pomoTime.textContent = `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
el.pomoBtn.addEventListener("click", async () => {
  el.pomoModal.classList.remove("hidden");
  await pomoRefresh();
  if (pomoTimer) clearInterval(pomoTimer);
  pomoTimer = setInterval(async () => {
    if (pomoState?.running) { renderPomo(); if (pomoState.endsAt - Date.now() <= 0) await pomoRefresh(); }
  }, 1000);
});
function closePomo() { el.pomoModal.classList.add("hidden"); if (pomoTimer) { clearInterval(pomoTimer); pomoTimer = null; } }
el.pomoClose.addEventListener("click", closePomo);
el.pomoModal.addEventListener("click", (e) => { if (e.target === el.pomoModal) closePomo(); });
el.pomoToggle.addEventListener("click", async () => {
  pomoState = await pomoSend(pomoState?.running ? "pause" : "start", {
    workMin: parseInt(el.pomoWork.value, 10) || 25,
    breakMin: parseInt(el.pomoBreak.value, 10) || 5,
    task: el.pomoTask.value.trim(),
  });
  renderPomo();
});
el.pomoTask.addEventListener("change", async () => {
  pomoState = await pomoSend("state", { task: el.pomoTask.value.trim() });
});
el.pomoSkip.addEventListener("click", async () => { pomoState = await pomoSend("skip"); renderPomo(); });
el.pomoReset.addEventListener("click", async () => { pomoState = await pomoSend("reset"); renderPomo(); });
[el.pomoWork, el.pomoBreak].forEach((inp) =>
  inp.addEventListener("change", async () => {
    pomoState = await pomoSend("state", { workMin: parseInt(el.pomoWork.value, 10) || 25, breakMin: parseInt(el.pomoBreak.value, 10) || 5 });
    renderPomo();
  })
);

el.helpBtn.addEventListener("click", () => el.helpModal.classList.remove("hidden"));
el.helpClose.addEventListener("click", () => el.helpModal.classList.add("hidden"));
el.helpModal.addEventListener("click", (e) => { if (e.target === el.helpModal) el.helpModal.classList.add("hidden"); });
el.warnSettings.addEventListener("click", (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

async function checkApiKey() {
  const cfg = await getConfig();
  el.warn.classList.toggle("hidden", !!cfg.apiKey);
}
chrome.storage.onChanged.addListener((changes) => {
  checkApiKey();
  refreshVocabCount();
  // Nếu từ vựng thay đổi (lưu qua chuột phải / bôi đen) và tab Từ vựng đang mở -> vẽ lại.
  if (changes[VOCAB_KEY] && !el.viewVocab.classList.contains("hidden")) renderVocab();
});

// ---------- Tabs ----------
el.tabTranslate.addEventListener("click", () => switchTab("translate"));
el.tabQA.addEventListener("click", () => switchTab("qa"));
el.tabVocab.addEventListener("click", () => switchTab("vocab"));
el.tabGrammar.addEventListener("click", () => switchTab("grammar"));
el.tabNotes.addEventListener("click", () => switchTab("notes"));
function switchTab(which) {
  el.tabTranslate.classList.toggle("active", which === "translate");
  el.tabQA.classList.toggle("active", which === "qa");
  el.tabVocab.classList.toggle("active", which === "vocab");
  el.tabGrammar.classList.toggle("active", which === "grammar");
  el.tabNotes.classList.toggle("active", which === "notes");
  el.viewTranslate.classList.toggle("hidden", which !== "translate");
  el.viewQA.classList.toggle("hidden", which !== "qa");
  el.viewVocab.classList.toggle("hidden", which !== "vocab");
  el.viewGrammar.classList.toggle("hidden", which !== "grammar");
  el.viewNotes.classList.toggle("hidden", which !== "notes");
  if (which === "vocab") { renderVocab(); refreshDashboard(); }
  if (which === "qa") refreshQA();
  if (which === "grammar") renderGrammar();
  if (which === "notes") openNotes();
}

// ============================================================
// PHA 1 — Nạp PDF hoặc trang web -> thứ tự đọc -> chunk ngữ nghĩa.
// ============================================================
el.openBtn.addEventListener("click", () => el.fileInput.click());
el.fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) loadPdf(file);
});

["dragover", "dragenter"].forEach((ev) =>
  el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.add("drag"); })
);
["dragleave", "drop"].forEach((ev) =>
  el.dropzone.addEventListener(ev, (e) => { e.preventDefault(); el.dropzone.classList.remove("drag"); })
);
el.dropzone.addEventListener("drop", (e) => {
  const file = e.dataTransfer.files[0];
  if (file && file.type === "application/pdf") loadPdf(file);
  else setStatus("Vui lòng thả một file PDF.", true);
});

// Chế độ xem: song ngữ / chỉ tiếng Việt / chỉ bản gốc.
el.viewMode.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-mode]");
  if (!b) return;
  viewModeVal = b.dataset.mode;
  applyViewMode();
});
function applyViewMode() {
  el.pages.classList.remove("mode-both", "mode-vi", "mode-src");
  el.pages.classList.add("mode-" + viewModeVal);
  el.viewMode.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("active", b.dataset.mode === viewModeVal)
  );
}

// Sao chép toàn bộ bản dịch.
el.copyAllBtn.addEventListener("click", async () => {
  const text = segments
    .map((s, i) => {
      if (!s.els?.card.classList.contains("translated")) return "";
      const t = (s.els.trans.textContent || "").trim();
      if (!t) return "";
      const head = s.heading ? s.heading : `[Đoạn ${i + 1}]`;
      return head + "\n" + t;
    })
    .filter(Boolean)
    .join("\n\n");
  if (!text) { setStatus("Chưa có bản dịch để sao chép.", true); return; }
  try {
    await navigator.clipboard.writeText(text);
    setStatus("✓ Đã sao chép bản dịch vào clipboard.");
  } catch {
    setStatus("Không sao chép được (trình duyệt chặn clipboard).", true);
  }
});

async function loadPdf(file) {
  reset();
  el.dropzone.classList.add("hidden");
  el.toolbar.classList.remove("hidden");
  try {
    const buf = await file.arrayBuffer();
    await loadPdfFromBuffer(buf, file.name);
  } catch (err) {
    console.error(err);
    setStatus("Lỗi đọc PDF: " + err.message, true);
  }
}

// Nạp PDF từ ArrayBuffer (dùng chung cho file cục bộ và tải từ URL).
async function loadPdfFromBuffer(buf, name) {
  setStatus("Đang phân tích bố cục & xác định thứ tự đọc…");
  el.docName.textContent = name;
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const { fullText, stats } = await extractReadingOrder(pdf, (n, total) =>
    setStatus(`Xác định thứ tự đọc: trang ${n}/${total}…`)
  );
  if (!fullText.trim()) {
    setStatus("Không trích xuất được văn bản. PDF có thể là ảnh scan (cần OCR).", true);
    return;
  }
  buildAndRender(fullText);
  const colLabel = stats.dominantColumns === 2 ? "2 cột" : stats.dominantColumns === 1 ? "1 cột" : "hỗn hợp";
  showInfo(`Bố cục: ${stats.pages} trang · chủ yếu ${colLabel} · ${segments.length} đoạn theo thứ tự đọc`);
  setStatus(`✓ Đã xác định thứ tự đọc: ${stats.pages} trang, ${segments.length} đoạn. Bấm "Dịch toàn bộ".`);
}

// Tải PDF từ URL rồi xử lý (extension có host_permissions <all_urls>).
async function loadPdfFromUrl(url) {
  reset();
  el.dropzone.classList.add("hidden");
  el.toolbar.classList.remove("hidden");
  setStatus("Đang tải PDF từ URL…");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = await res.arrayBuffer();
    let name = "PDF";
    try { name = decodeURIComponent(new URL(url).pathname.split("/").pop()) || "PDF"; } catch {}
    await loadPdfFromBuffer(buf, name);
  } catch (err) {
    console.error(err);
    setStatus(`Không tải được PDF (${err.message}). Hãy tải file về máy rồi dùng "Mở PDF".`, true);
  }
}

el.pdfUrlBtn.addEventListener("click", () => {
  const u = prompt("Dán link PDF (vd https://arxiv.org/pdf/2312.06647):", "");
  if (u && u.trim()) loadPdfFromUrl(u.trim());
});

// ---------- Dán văn bản để dịch ----------
function openPaste() {
  el.pasteModal.classList.remove("hidden");
  el.pasteText.focus();
}
el.pasteBtn.addEventListener("click", () => { pasteTarget = "doc"; openPaste(); });
el.pasteBtn2.addEventListener("click", () => { pasteTarget = "doc"; openPaste(); });
el.pasteClose.addEventListener("click", () => el.pasteModal.classList.add("hidden"));
el.pasteModal.addEventListener("click", (e) => {
  if (e.target === el.pasteModal) el.pasteModal.classList.add("hidden");
});
el.pasteLoad.addEventListener("click", () => {
  const text = el.pasteText.value.trim();
  if (!text) { el.pasteText.focus(); return; }
  el.pasteModal.classList.add("hidden");
  el.pasteText.value = "";

  // Nạp vào Kho tri thức (RAG) thay vì tài liệu dịch.
  if (pasteTarget === "kb") {
    pasteTarget = "doc";
    const name = "Văn bản " + new Date().toLocaleString("vi-VN");
    ingestToKB(name, buildSemanticChunks(text).map((c) => (c.heading ? c.heading + "\n" : "") + c.text));
    return;
  }

  const chunks = buildSemanticChunks(text).map((c) => ({ ...c }));
  // Nếu đang có nội dung -> NỐI THÊM vào cuối (không xóa bản dịch cũ).
  const appending = segments.length > 0 && !el.toolbar.classList.contains("hidden");
  if (!appending) {
    reset();
    el.dropzone.classList.add("hidden");
    el.toolbar.classList.remove("hidden");
    el.docName.textContent = "Văn bản dán";
  }
  const startIdx = segments.length;
  chunks.forEach((c) => { const i = segments.length; segments.push(c); createCard(c, i); });

  showInfo(`Văn bản dán · ${segments.length} đoạn`);
  setStatus(appending ? `✓ Đã nối thêm ${chunks.length} đoạn.` : `✓ Đã nạp ${chunks.length} đoạn.`);
  segments[startIdx]?.els.card.scrollIntoView({ behavior: "smooth", block: "start" });
  if (el.pasteAuto.checked) translateAll(startIdx);
});

function isPdfUrl(u) {
  return (
    /\.pdf(\?|#|$)/i.test(u) ||
    /\/\/([^/]*\.)?arxiv\.org\/pdf\//i.test(u) ||
    /\/pdf\/\d{4}\.\d{4,5}(v\d+)?/i.test(u)
  );
}

// Dịch trang đang mở. Tự nhận biết PDF (tab PDF viewer / link .pdf / arxiv) và
// chuyển sang tải PDF; nếu là trang HTML thì trích nội dung chính.
el.webBtn.addEventListener("click", async () => {
  let tab = null;
  let url = "";
  try {
    [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    url = tab?.url || "";
  } catch {}

  if (isPdfUrl(url)) { loadPdfFromUrl(url); return; }

  reset();
  el.dropzone.classList.add("hidden");
  el.toolbar.classList.remove("hidden");
  setStatus("Đang lấy nội dung trang web…");

  let result = null;
  try {
    if (tab?.id) {
      const r = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractArticleInPage,
      });
      result = r?.[0]?.result;
    }
  } catch {
    // Trang không cho chèn script (vd trình xem PDF của Chrome) -> thử tải như PDF.
  }

  if (result && result.text && result.text.trim().length >= 40) {
    el.docName.textContent = result.title || "Trang web";
    buildAndRender(result.text);
    showInfo(`Trang web · ${segments.length} đoạn`);
    setStatus(`✓ Đã lấy nội dung: ${segments.length} đoạn. Bấm "Dịch toàn bộ".`);
    return;
  }

  // Không lấy được nội dung HTML -> có thể tab là PDF, thử tải về xử lý.
  if (url) await loadPdfFromUrl(url);
  else setStatus("Không lấy được nội dung từ trang này.", true);
});

// Hàm chạy TRONG trang web để trích nội dung chính (không dùng biến ngoài).
function extractArticleInPage() {
  const root =
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.querySelector('[role="main"]') ||
    document.body;
  const parts = [];
  root.querySelectorAll("h1,h2,h3,h4,p,li,blockquote,pre").forEach((n) => {
    const t = (n.innerText || "").trim();
    if (t.length > 1) parts.push(t);
  });
  let text = parts.join("\n\n");
  if (text.length < 200) text = (root.innerText || "").trim();
  return { title: document.title, text };
}

function buildAndRender(fullText) {
  segments = buildSemanticChunks(fullText).map((c) => ({ ...c }));
  renderSegments();
}

function showInfo(msg) {
  el.layoutInfo.textContent = msg;
  el.layoutInfo.classList.remove("hidden");
}

function renderSegments() {
  el.pages.innerHTML = "";
  applyViewMode();
  segments.forEach((seg, i) => createCard(seg, i));
}

// Tạo & chèn 1 thẻ đoạn (dùng cho cả dựng mới lẫn nối thêm khi dán văn bản).
function createCard(seg, i) {
  const card = document.createElement("article");
  card.className = "card";

  const head = document.createElement("div");
  head.className = "card-head";
  const num = document.createElement("span");
  num.className = "seg-num";
  num.textContent = i + 1;
  const title = document.createElement("span");
  title.className = "seg-title";
  title.textContent = seg.heading || "Đoạn";

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const btn = document.createElement("button");
  btn.className = "icon-btn tr-btn";
  btn.textContent = "Dịch";
  btn.title = "Dịch đoạn này";
  const askBtn = document.createElement("button");
  askBtn.className = "icon-btn";
  askBtn.textContent = "💬";
  askBtn.title = "Hỏi về đoạn này";
  const copyBtn = document.createElement("button");
  copyBtn.className = "icon-btn copy-btn hidden";
  copyBtn.textContent = "⧉";
  copyBtn.title = "Sao chép bản dịch đoạn này";
  actions.append(btn, askBtn, copyBtn);
  head.append(num, title, actions);

  const trans = document.createElement("div");
  trans.className = "trans";
  const ph = document.createElement("span");
  ph.className = "placeholder";
  ph.textContent = "Chưa dịch";
  trans.appendChild(ph);

  const origText = document.createElement("div");
  origText.className = "orig-text";
  origText.textContent = seg.text;

  card.append(head, trans, origText);
  el.pages.appendChild(card);

  seg.els = { card, btn, copyBtn, trans };
  btn.addEventListener("click", () => translateSegment(i, seg.els.card.classList.contains("translated")));
  askBtn.addEventListener("click", () => {
    switchTab("qa");
    sendQA(`Giải thích đoạn ${i + 1} sau đây bằng tiếng Việt, dễ hiểu:\n\n"${seg.text.slice(0, 1200)}"`);
  });
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(seg.els.trans.textContent.trim());
      copyBtn.textContent = "✓";
      setTimeout(() => (copyBtn.textContent = "⧉"), 1200);
    } catch {}
  });
}

// ============================================================
// PHA 2 — Dịch.
// ============================================================
async function translateSegment(idx, force = false) {
  const cfg = await getConfig();
  const seg = segments[idx];
  if (!seg || !seg.text.trim()) return;
  const prevTail = idx > 0 ? tailContext(segments[idx - 1].text) : "";

  // Bảng thuật ngữ nằm trong khóa cache -> sửa thuật ngữ là bản dịch cũ tự hết hiệu lực.
  const promptKey = cfg.systemPrompt + "|" + glossarySignature(cfg.glossary);

  // Cache: nếu đã có bản dịch (< 3 tuần) và không ép dịch lại -> dùng lại, không gọi API.
  if (!force) {
    const cached = await trCacheGet("seg", cfg.model, promptKey, seg.text, prevTail);
    if (cached) {
      seg.els.trans.textContent = cached;
      seg.els.trans.classList.remove("loading", "error");
      seg.els.trans.classList.add("done");
      seg.els.card.classList.add("translated");
      seg.els.copyBtn.classList.remove("hidden");
      seg.els.btn.textContent = "↻";
      seg.els.btn.title = "Dịch lại đoạn này";
      return;
    }
  }

  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); setStatus("Chưa có API key. Mở ⚙️.", true); return; }

  if (!translatingAll) abortController = new AbortController();
  const signal = abortController.signal;

  seg.els.btn.disabled = true;
  seg.els.btn.textContent = "…";
  seg.els.trans.textContent = "";
  seg.els.trans.classList.remove("done", "error");
  seg.els.trans.classList.add("loading");
  seg.els.card.classList.add("translating");
  if (!translatingAll) el.stopBtn.classList.remove("hidden");

  try {
    await translateChunk({
      config: cfg,
      chunk: seg,
      prevTail,
      signal,
      onDelta: (frag) => { seg.els.trans.classList.remove("loading"); seg.els.trans.textContent += frag; },
    });
    seg.els.trans.classList.add("done");
    seg.els.card.classList.add("translated");
    seg.els.copyBtn.classList.remove("hidden");
    seg.els.btn.textContent = "↻";
    seg.els.btn.title = "Dịch lại đoạn này";
    trCacheSet("seg", cfg.model, promptKey, seg.text, prevTail, seg.els.trans.textContent.trim());
  } catch (err) {
    seg.els.btn.textContent = "Dịch";
    if (err.name === "AbortError") seg.els.trans.textContent += "\n[Đã dừng]";
    else { console.error(err); seg.els.trans.textContent = "⚠️ " + err.message; seg.els.trans.classList.add("error"); setStatus(err.message, true); }
    throw err;
  } finally {
    seg.els.trans.classList.remove("loading");
    seg.els.card.classList.remove("translating");
    seg.els.btn.disabled = false;
    if (!translatingAll) el.stopBtn.classList.add("hidden");
  }
}

el.translateAllBtn.addEventListener("click", () => translateAll(0));

async function translateAll(startIndex = 0) {
  if (typeof startIndex !== "number" || startIndex < 0) startIndex = 0;
  if (!segments.length) { setStatus("Chưa có nội dung. Hãy mở PDF, dán văn bản, hoặc bấm 'Dịch web' trước.", true); return; }
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); setStatus("Chưa có API key. Mở ⚙️.", true); return; }

  // Chỉ dịch các đoạn CHƯA dịch (từ startIndex trở đi).
  const todo = [];
  for (let i = startIndex; i < segments.length; i++) {
    if (!segments[i].els.card.classList.contains("translated")) todo.push(i);
  }
  if (!todo.length) { setStatus("Các đoạn đã được dịch.", false); return; }

  translatingAll = true;
  abortController = new AbortController();
  el.translateAllBtn.disabled = true;
  el.stopBtn.classList.remove("hidden");
  el.progress.classList.remove("hidden");
  // Dịch SONG SONG nhiều đoạn (nhanh hơn nhiều với paper dài). Thứ tự hiển thị
  // không đổi vì mỗi đoạn ghi vào thẻ riêng của nó.
  const conc = Math.max(1, Math.min(6, cfg.concurrency || 3));
  let done = 0;
  let cursor = 0;
  let failed = 0;

  const worker = async () => {
    while (translatingAll) {
      const k = cursor++;
      if (k >= todo.length) break;
      try {
        await translateSegment(todo[k]);
      } catch (err) {
        if (err.name === "AbortError") break;
        failed++;
      }
      done++;
      setStatus(`Đang dịch… ${done}/${todo.length} đoạn (${conc} luồng)`);
      el.progressBar.style.width = `${(done / todo.length) * 100}%`;
    }
  };

  try {
    await Promise.all(Array.from({ length: Math.min(conc, todo.length) }, worker));
    if (translatingAll) {
      el.progressBar.style.width = "100%";
      setStatus(failed ? `Xong, nhưng ${failed} đoạn lỗi — bấm ↻ để dịch lại.` : "✓ Đã dịch xong.", failed > 0);
    }
  } catch (err) {
    if (err.name !== "AbortError") setStatus("Dừng do lỗi: " + err.message, true);
  } finally {
    translatingAll = false;
    el.translateAllBtn.disabled = false;
    el.stopBtn.classList.add("hidden");
  }
}

el.stopBtn.addEventListener("click", () => {
  translatingAll = false;
  if (abortController) abortController.abort();
  el.stopBtn.classList.add("hidden");
  el.translateAllBtn.disabled = false;
  setStatus("Đã dừng.");
});

// ============================================================
// Bôi đen trong panel -> lưu từ vựng / dịch nhanh.
// ============================================================
let selBar = null;
function removeSelBar() { if (selBar) { selBar.remove(); selBar = null; } }
el.pages.addEventListener("mouseup", () => {
  setTimeout(() => {
    const sel = window.getSelection();
    const text = sel.toString().trim();
    if (!text || text.length > 800) { removeSelBar(); return; }
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    showSelBar(text, rect, contextOf(sel));
  }, 10);
});
document.addEventListener("mousedown", (e) => {
  if (selBar && !selBar.contains(e.target)) removeSelBar();
  if (panelPop && !panelPop.contains(e.target)) removePanelPop();
});

function contextOf(sel) {
  const node = sel.anchorNode;
  const block = node && node.nodeType === 3 ? node.parentElement : node;
  const t = (block?.textContent || "").replace(/\s+/g, " ").trim();
  return t.slice(0, 300);
}

function showSelBar(text, rect, context) {
  removeSelBar();
  selBar = document.createElement("div");
  selBar.className = "sel-bar";
  selBar.innerHTML = '<button data-a="tr">🇻🇳 Dịch</button><button data-a="vocab">＋ Từ vựng</button>';
  document.body.appendChild(selBar);
  selBar.style.top = Math.max(4, rect.top - 38) + "px";
  selBar.style.left = rect.left + "px";
  selBar.querySelector('[data-a="tr"]').addEventListener("click", () => panelTranslate(text, rect));
  selBar.querySelector('[data-a="vocab"]').addEventListener("click", () => {
    setStatus(`Đang lưu "${text}"…`);
    chrome.runtime.sendMessage({ type: "saveVocab", term: text, context, source: el.docName.textContent }, (res) => {
      removeSelBar();
      if (chrome.runtime.lastError || !res?.ok) { setStatus("Lỗi lưu từ: " + (res?.error || chrome.runtime.lastError?.message), true); return; }
      setStatus(res.meaning ? `✓ Đã lưu: ${text} — ${res.meaning}` : `✓ Đã lưu: ${text} (đang tra nghĩa ở nền…)`);
      refreshVocabCount();
    });
  });
}

// Popup dịch nhanh trong panel (khi bôi đen chữ lúc đọc).
let panelPop = null;
function removePanelPop() { if (panelPop) { panelPop.remove(); panelPop = null; } }
function panelTranslate(text, rect) {
  removeSelBar();
  removePanelPop();
  panelPop = document.createElement("div");
  panelPop.className = "panel-pop";
  panelPop.innerHTML =
    '<div class="pp-head"><span>Bản dịch</span><button class="pp-close">✕</button></div>' +
    '<div class="pp-body">Đang dịch…</div>';
  document.body.appendChild(panelPop);
  const top = Math.min(window.innerHeight - 120, rect.bottom + 6);
  panelPop.style.top = Math.max(6, top) + "px";
  panelPop.style.left = Math.max(6, Math.min(rect.left, window.innerWidth - 300)) + "px";
  panelPop.querySelector(".pp-close").addEventListener("click", removePanelPop);
  const body = panelPop.querySelector(".pp-body");
  chrome.runtime.sendMessage({ type: "translate", text }, (res) => {
    if (!panelPop) return;
    if (chrome.runtime.lastError || !res) { body.textContent = "Lỗi kết nối."; return; }
    body.textContent = res.ok ? res.text : "⚠️ " + res.error;
  });
}

// ============================================================
// TỪ VỰNG — danh sách, tìm kiếm, xuất, ôn tập flashcard.
// ============================================================
async function refreshVocabCount() {
  const list = await getVocab();
  el.vocabCount.textContent = list.length;
}

// ---------- Công cụ Tra cứu ----------
// ---------- Phát âm ----------
// Ưu tiên audio thật từ từ điển; không có thì giọng trình duyệt; nếu trình duyệt
// chặn (Brave Shields) hoặc máy không có giọng tiếng Anh -> dùng TTS của OpenAI.
async function playAudio(url, fallbackText) {
  if (url) {
    try {
      await new Audio(url).play();
      return;
    } catch { /* rơi xuống TTS */ }
  }
  await speakEn(fallbackText);
}

// Chờ danh sách giọng nạp xong (lần gọi đầu thường rỗng).
function loadVoices() {
  return new Promise((resolve) => {
    const now = speechSynthesis.getVoices();
    if (now && now.length) return resolve(now);
    const timer = setTimeout(() => resolve(speechSynthesis.getVoices() || []), 1200);
    speechSynthesis.addEventListener(
      "voiceschanged",
      () => { clearTimeout(timer); resolve(speechSynthesis.getVoices() || []); },
      { once: true }
    );
  });
}

function speakBrowser(text) {
  return new Promise(async (resolve, reject) => {
    if (!("speechSynthesis" in window)) return reject(new Error("Trình duyệt không hỗ trợ giọng máy."));
    const voices = await loadVoices();
    const en = voices.filter((v) => /^en/i.test(v.lang));
    if (!voices.length) return reject(new Error("Không có giọng đọc nào (có thể bị Brave Shields chặn)."));
    if (!en.length) return reject(new Error("Máy chưa cài giọng tiếng Anh."));

    try { if (speechSynthesis.speaking) speechSynthesis.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(String(text));
    u.voice = en[0];
    u.lang = en[0].lang || "en-US";
    u.rate = 0.9;
    let started = false;
    u.onstart = () => { started = true; };
    u.onend = () => resolve();
    u.onerror = (e) => reject(new Error("Giọng máy lỗi: " + (e.error || "không rõ")));
    speechSynthesis.speak(u);
    // Không phát ra tiếng sau 1.5s -> coi như bị chặn.
    setTimeout(() => { if (!started) reject(new Error("Trình duyệt không phát được giọng máy.")); }, 1500);
  });
}

// TTS qua API (dùng chính API key đã cấu hình).
async function speakOpenAI(text, cfg) {
  const res = await fetch(`${cfg.baseUrl}/audio/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model: cfg.ttsModel || "tts-1",
      voice: cfg.ttsVoice || "alloy",
      input: String(text).slice(0, 500),
    }),
  });
  if (!res.ok) {
    let d = "";
    try { d = (await res.json())?.error?.message; } catch {}
    throw new Error(`TTS API ${res.status}: ${d || res.statusText}`);
  }
  const blobUrl = URL.createObjectURL(await res.blob());
  const audio = new Audio(blobUrl);
  audio.onended = () => URL.revokeObjectURL(blobUrl);
  await audio.play();
}

async function speakEn(text) {
  if (!text) return;
  const cfg = await getConfig();
  const provider = cfg.ttsProvider || "auto";

  if (provider !== "openai") {
    try {
      await speakBrowser(text);
      return;
    } catch (err) {
      if (provider === "browser") {
        setStatus("🔇 " + err.message + " → Thử tắt Brave Shields cho trang này, hoặc đổi TTS sang OpenAI trong ⚙️.", true);
        return;
      }
      console.warn("TTS trình duyệt lỗi, chuyển sang OpenAI:", err.message);
    }
  }

  if (!cfg.apiKey) {
    setStatus("🔇 Không phát âm được: trình duyệt chặn giọng máy và chưa có API key cho TTS (⚙️).", true);
    return;
  }
  try {
    await speakOpenAI(text, cfg);
  } catch (err) {
    setStatus("🔇 Không phát âm được: " + err.message, true);
  }
}

// Thêm thủ công một mục (từ/collocation/idiom/tục ngữ). Nghĩa để trống -> AI tự tra.
el.maAdd.addEventListener("click", async () => {
  const term = el.maTerm.value.trim();
  if (!term) { el.maTerm.focus(); return; }
  const kind = el.maKind.value || "word";
  const meaning = el.maMeaning.value.trim();
  el.maAdd.disabled = true;

  const done = async (entry) => {
    await addVocab({ term, kind, source: "Thêm thủ công", ...entry });
    el.maTerm.value = "";
    el.maMeaning.value = "";
    el.maStatus.textContent = `✓ Đã thêm "${term}".`;
    refreshVocabCount();
    renderVocab();
    el.maAdd.disabled = false;
    setTimeout(() => (el.maStatus.textContent = ""), 2500);
  };

  if (meaning) { await done({ meaning }); return; }

  // Nghĩa trống -> nhờ background tra (nghĩa + phiên âm + định nghĩa).
  el.maStatus.textContent = "Đang tra nghĩa…";
  chrome.runtime.sendMessage({ type: "lookupWord", term }, async (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      await done({}); // vẫn lưu, để trống nghĩa
    } else {
      await done(res.entry || {});
    }
  });
});
el.maMeaning.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); el.maAdd.click(); } });

el.lookupBtn.addEventListener("click", () => doLookup(el.lookupInput.value));
el.lookupInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); doLookup(el.lookupInput.value); }
});

function doLookup(word) {
  word = (word || "").trim();
  if (!word) return;
  el.lookupResult.classList.remove("hidden");
  el.lookupResult.innerHTML = '<span class="placeholder">Đang tra cứu…</span>';
  chrome.runtime.sendMessage({ type: "lookupWord", term: word }, (res) => {
    if (chrome.runtime.lastError || !res) {
      el.lookupResult.innerHTML = '<span class="lr-err">' + escapeHtml(chrome.runtime.lastError?.message || "Không phản hồi.") + "</span>";
      return;
    }
    if (!res.ok) { el.lookupResult.innerHTML = '<span class="lr-err">' + escapeHtml(res.error) + "</span>"; return; }
    renderLookupResult(word, res.entry);
  });
}

function renderLookupResult(word, e) {
  el.lookupResult.innerHTML = "";
  const head = document.createElement("div");
  head.className = "lr-head";
  head.innerHTML =
    `<span class="lr-word">${escapeHtml(word)}</span>` +
    (e.phonetic ? `<span class="lr-ipa">${escapeHtml(e.phonetic)}</span>` : "") +
    (e.pos ? `<span class="lr-pos">${escapeHtml(e.pos)}</span>` : "");
  const play = document.createElement("button");
  play.className = "lr-audio";
  play.textContent = "🔊";
  play.title = e.audio ? "Nghe phát âm" : "Nghe (giọng máy)";
  play.addEventListener("click", () => playAudio(e.audio, word));
  head.appendChild(play);

  const body = document.createElement("div");
  body.className = "lr-body";
  body.innerHTML =
    (e.meaning ? `<div class="lr-vi">🇻🇳 ${escapeHtml(e.meaning)}</div>` : "") +
    (e.definition ? `<div class="lr-def">EN: ${escapeHtml(e.definition)}</div>` : "") +
    (e.example ? `<div class="lr-ex">“${escapeHtml(e.example)}”</div>` : "");

  const save = document.createElement("button");
  save.className = "btn small";
  save.textContent = "＋ Lưu vào từ vựng";
  save.addEventListener("click", async () => {
    await addVocab({ term: word, ...e });
    save.textContent = "✓ Đã lưu";
    save.disabled = true;
    refreshVocabCount();
    renderVocab();
  });

  el.lookupResult.append(head, body, save);
}

// Nhãn lịch ôn cho một từ (theo SM-2).
function srsLabel(v) {
  ensureSrs(v);
  const left = (v.due || 0) - Date.now();
  if (left <= 0) return "đến hạn ôn";
  const days = Math.ceil(left / 86400000);
  if (days <= 1) return "ôn trong hôm nay";
  if (days >= 30) return `ôn sau ${(days / 30).toFixed(1)} tháng`;
  return `ôn sau ${days} ngày`;
}

async function renderVocab() {
  const q = el.vocabSearch.value.trim().toLowerCase();
  const list = await getVocab();
  const filtered = q
    ? list.filter((v) => v.term.toLowerCase().includes(q) || (v.meaning || "").toLowerCase().includes(q))
    : list;

  el.vocabList.innerHTML = "";
  if (!filtered.length) {
    el.vocabList.innerHTML = '<p class="empty">Chưa có từ nào. Bôi đen chữ khi đọc để lưu từ vựng.</p>';
    return;
  }
  filtered.forEach((v) => {
    const row = document.createElement("div");
    row.className = "vocab-item";
    const main = document.createElement("div");
    main.className = "vi-main";
    main.innerHTML =
      `<div class="vi-term">${escapeHtml(v.term)}` +
        (v.phonetic ? ` <span class="vi-ipa">${escapeHtml(v.phonetic)}</span>` : "") +
        (v.kind && v.kind !== "word" ? ` <span class="vi-kind">${{ collocation: "collocation", idiom: "idiom", proverb: "tục ngữ" }[v.kind] || v.kind}</span>` : "") +
        (v.pos && (!v.kind || v.kind === "word") ? ` <span class="vi-pos">${escapeHtml(v.pos)}</span>` : "") +
        ` <span class="vi-box">${srsLabel(v)}</span>` +
        (isLeech(v) ? ` <span class="vi-leech" title="Sai ${v.lapses} lần — nên đổi cách học từ này">🔥 khó nhớ</span>` : "") +
        `</div>` +
      `<div class="vi-meaning">${escapeHtml(v.meaning || "(chưa có nghĩa)")}</div>` +
      (v.definition ? `<div class="vi-def">${escapeHtml(v.definition)}</div>` : "") +
      (v.context ? `<div class="vi-context">“${escapeHtml(v.context)}”</div>` : "");
    const play = document.createElement("button");
    play.className = "vi-audio";
    play.textContent = "🔊";
    play.title = v.audio ? "Nghe phát âm" : "Nghe (giọng máy)";
    play.addEventListener("click", () => playAudio(v.audio, v.term));
    main.querySelector(".vi-term").appendChild(play);
    const edit = document.createElement("button");
    edit.className = "vi-edit";
    edit.textContent = "✎";
    edit.title = "Sửa chính tả (giữ nguyên tiến độ ôn)";
    edit.addEventListener("click", async () => {
      const next = prompt("Sửa lại từ:", v.term);
      if (next === null || !next.trim() || next.trim() === v.term) return;
      await renameVocab(v.term, next);
      renderVocab();
    });
    const del = document.createElement("button");
    del.className = "vi-del";
    del.textContent = "✕";
    del.title = "Xóa";
    del.addEventListener("click", async () => { await removeVocab(v.term); renderVocab(); refreshVocabCount(); });
    row.append(main, edit, del);
    el.vocabList.appendChild(row);
  });
}
el.vocabSearch.addEventListener("input", renderVocab);

el.exportBtn.addEventListener("click", async () => {
  const list = await getVocab();
  if (!list.length) { setStatus("Chưa có từ vựng để xuất.", true); return; }
  const rows = [["term", "meaning", "context", "source", "box"]].concat(
    list.map((v) => [v.term, v.meaning, v.context, v.source, v.box].map(csvCell))
  );
  const csv = "﻿" + rows.map((r) => r.join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "tu-vung.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
function csvCell(s) { return `"${String(s ?? "").replace(/"/g, '""')}"`; }

// ============================================================
// HỌC KIỂU IELTS — mục tiêu ngày, nạp bộ từ, kiểm tra.
// ============================================================
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function setIeltsStatus(msg, isErr = false) {
  el.ieltsStatus.textContent = msg;
  el.ieltsStatus.className = "sd-status" + (isErr ? " error" : "");
}

async function refreshDashboard() {
  const cfg = await getConfig();
  const goal = cfg.dailyGoal || 50;
  const { today, streak } = await getTodayStats();
  const list = await getVocab();
  const due = dueVocab(list).length;
  el.sdGoal.textContent = goal;
  el.sdToday.textContent = today.new || 0;
  el.sdStreak.textContent = streak;
  el.sdDue.textContent = due;
  el.sdTotal.textContent = list.length;
  el.sdBar.style.width = Math.min(100, Math.round(((today.new || 0) / goal) * 100)) + "%";
}

// Nạp bộ từ IELTS: sinh bằng LLM + lấy phát âm từ Free Dictionary.
el.ieltsBtn.addEventListener("click", async () => {
  const cfg = await getConfig();
  const goal = cfg.dailyGoal || 50;
  const { today } = await getTodayStats();
  const count = Math.min(50, Math.max(5, goal - (today.new || 0) || goal));
  const topic = el.ieltsTopic.value;
  const kind = el.ieltsKind.value || "word";
  const kindLabel = { word: "từ", collocation: "collocation", idiom: "thành ngữ", proverb: "tục ngữ" }[kind];
  el.ieltsBtn.disabled = true;
  setIeltsStatus(`Đang chuẩn bị ${count} ${kindLabel} (${topic})…`);
  try {
    const existing = new Set((await getVocab()).map((v) => v.term.trim().toLowerCase()));

    // Ưu tiên NGÂN HÀNG OFFLINE biên soạn thủ công theo chủ đề (ielts-topics.js)
    // — miễn phí, chất lượng ổn định, không cần API key. Chỉ gọi AI để bù phần
    // còn thiếu (chủ đề "Ngẫu nhiên", loại khác "Từ vựng", hoặc ngân hàng của
    // chủ đề đó đã được lưu hết vào kho).
    let words = [];
    if (kind === "word" && IELTS_TOPIC_BANK[topic]) {
      words = IELTS_TOPIC_BANK[topic]
        .filter((w) => !existing.has(w.word.trim().toLowerCase()))
        .slice(0, count);
    }
    const fromBank = words.length;
    const missing = count - fromBank;

    if (missing > 0) {
      if (!cfg.apiKey) {
        if (!fromBank) {
          el.warn.classList.remove("hidden");
          setIeltsStatus("Chưa có API key (mở ⚙️) — hoặc chọn một chủ đề đã có ngân hàng offline (Education, Environment, Technology…).", true);
          return;
        }
        // Có sẵn từ ngân hàng thì vẫn dùng, chỉ là không bù đủ tới mục tiêu hôm nay.
      } else {
        setIeltsStatus(`Ngân hàng offline có ${fromBank}/${count} từ (${topic}) — đang nhờ AI tạo thêm ${missing}…`);
        const bankKeys = new Set(words.map((w) => w.word.toLowerCase()));
        try {
          const ai = await generateIeltsWords({ config: cfg, count: missing, topic, kind, exclude: [...existing, ...bankKeys] });
          words = words.concat(ai);
        } catch (err) {
          if (!fromBank) throw err; // không có gì từ bank -> lỗi AI thì báo luôn
          console.error(err); // có sẵn từ bank -> vẫn dùng phần đó, chỉ log lỗi AI
        }
      }
    }
    if (!words.length) throw new Error("Không tạo được từ, hãy thử lại.");

    // Lọc trùng: bỏ từ đã có trong kho VÀ từ lặp trong chính đợt này.
    const seen = new Set();
    const fresh = [];
    let dup = 0;
    for (const w of words) {
      const t = String(w?.word || "").trim();
      if (!t) continue;
      const key = t.toLowerCase();
      if (existing.has(key) || seen.has(key)) { dup++; continue; }
      seen.add(key);
      fresh.push(w);
    }
    if (!fresh.length) {
      setIeltsStatus(`Tất cả ${words.length} từ đều đã có trong kho — thử chủ đề khác hoặc bấm lại để lấy từ mới.`, true);
      return;
    }

    let dicts = [];
    if (cfg.useDictionary !== false) {
      setIeltsStatus(`Đang lấy phát âm cho ${fresh.length} từ mới…`);
      dicts = await Promise.all(fresh.map((w) => fetchDictionary(w.word).catch(() => null)));
    }
    let added = 0, fromBankAdded = 0;
    for (let i = 0; i < fresh.length; i++) {
      const w = fresh[i];
      const d = dicts[i];
      const isBank = i < fromBank;
      await addVocab({
        term: String(w.word).trim(),
        meaning: w.meaning_vi || "",
        phonetic: w.ipa || d?.phonetic || "",
        audio: d?.audio || "",
        pos: w.pos || d?.meanings?.[0]?.pos || "",
        definition: w.definition_en || d?.meanings?.[0]?.definition || "",
        example: w.example || "",
        kind,
        source: isBank ? `IELTS thực chiến · ${topic}` : `IELTS · ${topic}`,
      });
      added++;
      if (isBank) fromBankAdded++;
    }
    const bankNote = fromBankAdded ? `${fromBankAdded} từ ngân hàng offline${added > fromBankAdded ? ` + ${added - fromBankAdded} từ AI` : ""}` : "";
    setIeltsStatus(`✓ Đã thêm ${added} ${kindLabel} mới${bankNote ? ` (${bankNote})` : ""}${dup ? ` · bỏ qua ${dup} trùng` : ""}. Bấm 📝 để kiểm tra.`);
    renderVocab();
    refreshVocabCount();
    refreshDashboard();
  } catch (err) {
    console.error(err);
    setIeltsStatus("Lỗi: " + err.message, true);
  } finally {
    el.ieltsBtn.disabled = false;
  }
});

// ============================================================
// THỐNG KÊ — mức độ nhớ, chuỗi ngày, 7 ngày gần đây, kiểm tra lại định kỳ.
// ============================================================
const RETEST_EVERY_DAYS = 7;

el.statsBtn.addEventListener("click", openStats);
el.stClose.addEventListener("click", () => el.statsModal.classList.add("hidden"));
el.statsModal.addEventListener("click", (e) => { if (e.target === el.statsModal) el.statsModal.classList.add("hidden"); });

async function openStats() {
  el.statsModal.classList.remove("hidden");
  await renderStats();
}

async function renderStats() {
  const list = await getVocab();
  const stats = await getStats();
  const { streak } = await getTodayStats();

  // KPI
  el.stStreak.textContent = streak;
  el.stTotal.textContent = list.length;
  el.stDue.textContent = dueVocab(list).length;

  let correct = 0, wrong = 0;
  Object.values(stats.days || {}).forEach((d) => { correct += d.correct || 0; wrong += d.wrong || 0; });
  el.stAcc.textContent = correct + wrong ? Math.round((correct / (correct + wrong)) * 100) + "%" : "–";

  // Phân bố 5 mức độ nhớ
  const dist = levelDistribution(list);
  const total = list.length || 1;
  el.stBar.innerHTML = "";
  dist.forEach((n, i) => {
    if (!n) return;
    const seg = document.createElement("div");
    seg.className = "st-seg";
    seg.style.width = (n / total) * 100 + "%";
    seg.style.background = MEMORY_LEVELS[i].color;
    seg.title = `${MEMORY_LEVELS[i].label}: ${n}`;
    el.stBar.appendChild(seg);
  });
  el.stLevels.innerHTML = MEMORY_LEVELS.map(
    (lv, i) =>
      `<div class="st-lv"><i style="background:${lv.color}"></i>` +
      `<span class="st-lv-name">${lv.label}</span>` +
      `<span class="st-lv-desc">${lv.desc}</span>` +
      `<b>${dist[i]}</b></div>`
  ).join("");

  const leeches = list.filter(isLeech).length;
  if (leeches) {
    el.stLevels.innerHTML += `<div class="st-lv leech"><i style="background:#d97706"></i><span class="st-lv-name">🔥 Khó nhớ</span><span class="st-lv-desc">sai nhiều lần, nên đổi cách học</span><b>${leeches}</b></div>`;
  }

  // Biểu đồ 7 ngày
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ key, label: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()], ...(stats.days?.[key] || {}) });
  }
  const max = Math.max(1, ...days.map((d) => Math.max(d.new || 0, d.reviewed || 0)));
  el.stChart.innerHTML = days
    .map(
      (d) =>
        `<div class="st-col"><div class="st-bars">` +
        `<div class="st-b" style="height:${((d.new || 0) / max) * 100}%;background:#3b82f6" title="${d.new || 0} từ mới"></div>` +
        `<div class="st-b" style="height:${((d.reviewed || 0) / max) * 100}%;background:#16a34a" title="${d.reviewed || 0} lượt ôn"></div>` +
        `</div><span>${d.label}</span></div>`
    )
    .join("");

  await renderRoadmapInfo();

  // Dọn từ đáng ngờ: mảnh mệnh đề (nguồn nào cũng tính) + mục tự lưu khi lướt MXH không sạch.
  const suspects = (await getVocab()).filter(isSuspectAutoVocab);
  el.stCleanBtn.disabled = suspects.length === 0;
  el.stCleanInfo.textContent = suspects.length
    ? `Phát hiện ${suspects.length} mục nghi là rác (mảnh mệnh đề / cụm dài, không phải từ hay collocation): ${suspects.slice(0, 5).map((v) => `"${v.term}"`).join(", ")}${suspects.length > 5 ? "…" : ""}`
    : "Không có mục nào đáng ngờ. Từ tự lưu đã được lọc trước khi vào kho.";

  // Mục đang lưu ở dạng đã chia thì -> gợi ý đưa về dạng từ điển, giữ nguyên tiến độ ôn.
  const inflected = await inflectedVocab();
  el.stBaseBtn.disabled = inflected.length === 0;
  el.stBaseInfo.textContent = inflected.length
    ? `${inflected.length} mục đang ở dạng chia thì: ${inflected.slice(0, 5).map((x) => `"${x.v.term}" → "${x.base}"`).join(", ")}${inflected.length > 5 ? "…" : ""}`
    : "Mọi mục đều đang ở dạng gốc.";

  // Trùng lặp gần giống ("make decision" ↔ "make a decision") — chỉ dữ liệu CŨ
  // trước khi addVocab() chặn ở đầu vào; từ nay các lượt lưu mới tự gộp luôn.
  const dupGroups = findNearDuplicateGroups(list);
  el.stDupBtn.disabled = dupGroups.length === 0;
  el.stDupInfo.textContent = dupGroups.length
    ? `Phát hiện ${dupGroups.length} nhóm trùng lặp: ${dupGroups.slice(0, 3).map((g) => g.map((v) => `"${v.term}"`).join(" ↔ ")).join(" · ")}${dupGroups.length > 3 ? "…" : ""}`
    : "Không có nhóm nào trùng lặp gần giống.";

  // Sổ lỗi sai
  const allMistakes = await getMistakes();
  const dueM = await dueMistakes();
  el.stMistakeBtn.disabled = dueM.length === 0;
  el.stMistakeInfo.className = "st-retest" + (dueM.length ? " due" : "");
  el.stMistakeInfo.textContent = allMistakes.length
    ? `Đang lưu ${allMistakes.length} câu từng sai · ${dueM.length} câu đến hạn ôn hôm nay. ` +
      `Đúng 3 lần liên tiếp thì câu đó được xoá khỏi sổ.`
    : "Chưa có câu nào sai được lưu. Câu ngữ pháp/IELTS trả lời sai sẽ tự vào đây và được kiểm tra lại vào hôm sau.";

  // Kiểm tra lại định kỳ
  const left = await retestDueInDays(RETEST_EVERY_DAYS);
  const pool = learnedWords(list);
  if (pool.length < 4) {
    el.stRetestInfo.textContent = "Cần ít nhất 4 từ đã học để kiểm tra lại.";
    el.stRetestBtn.disabled = true;
  } else {
    el.stRetestBtn.disabled = false;
    el.stRetestInfo.textContent = left === 0
      ? `⏰ Đã đến hạn! Kiểm tra ngẫu nhiên trong ${pool.length} từ đã học để xem còn nhớ không.`
      : `Lần kiểm tra tới sau ${left} ngày. Bạn vẫn có thể làm sớm.`;
    el.stRetestInfo.className = "st-retest" + (left === 0 ? " due" : "");
  }
}

// ============================================================
// LỘ TRÌNH — tổng hợp dữ liệu học rồi nhờ AI phân tích & gợi ý bước tiếp theo.
// ============================================================
const ROADMAP_EVERY_DAYS = 7;

// Gom dữ liệu học thành bản tóm tắt gọn (chỉ số liệu, không gửi cả kho từ).
async function buildLearningSummary() {
  const list = await getVocab();
  const stats = await getStats();
  const { streak } = await getTodayStats();
  const dist = levelDistribution(list);
  const mistakes = await getMistakes();
  const gcfg = await chrome.storage.local.get("gateSettings");
  const level = gcfg.gateSettings?.level || "B2-C1";
  const cfg = await getConfig();

  let correct = 0, wrong = 0, activeDays = 0;
  Object.values(stats.days || {}).forEach((d) => {
    correct += d.correct || 0;
    wrong += d.wrong || 0;
    if ((d.new || 0) + (d.reviewed || 0) > 0) activeDays++;
  });

  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const v = stats.days?.[k];
    last14.push(`${k.slice(5)}:${(v?.new || 0)}m/${(v?.reviewed || 0)}ô`);
  }

  const leeches = list.filter(isLeech).slice(0, 12).map((v) => `${v.term} (sai ${v.lapses})`);
  const weakest = list
    .filter((v) => v.reviewedAt && (v.lapses || 0) > 0)
    .sort((a, b) => (b.lapses || 0) - (a.lapses || 0))
    .slice(0, 15)
    .map((v) => v.term);
  const topMistakes = mistakes
    .sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0))
    .slice(0, 8)
    .map((m) => `[${m.kind}] ${String(m.q).slice(0, 110)} → đáp án: ${m.o?.[m.a]} (sai ${m.wrongCount} lần)`);

  return [
    `Mục tiêu trình độ: CEFR ${level}. Mục tiêu từ mới mỗi ngày: ${cfg.dailyGoal || 50}.`,
    `Chuỗi ngày học liên tiếp: ${streak}. Số ngày có hoạt động: ${activeDays}.`,
    `Tổng số từ đã lưu: ${list.length}.`,
    `Phân bố mức nhớ — Chưa học: ${dist[0]}, Mới học: ${dist[1]}, Đang nhớ: ${dist[2]}, Nhớ tốt: ${dist[3]}, Thuộc lòng: ${dist[4]}.`,
    `Số từ đến hạn ôn: ${dueVocab(list).length}. Từ "khó nhớ" (sai ≥6 lần): ${list.filter(isLeech).length}.`,
    `Độ chính xác tổng: ${correct + wrong ? Math.round((correct / (correct + wrong)) * 100) + "%" : "chưa có"} (${correct} đúng / ${wrong} sai).`,
    `Hoạt động 14 ngày (m = từ mới, ô = lượt ôn): ${last14.join(", ")}`,
    leeches.length ? `Từ khó nhớ nhất: ${leeches.join(", ")}` : "",
    weakest.length ? `Từ hay sai: ${weakest.join(", ")}` : "",
    topMistakes.length ? `Câu ngữ pháp/IELTS hay sai:\n- ${topMistakes.join("\n- ")}` : "",
  ].filter(Boolean).join("\n");
}

async function renderRoadmapInfo() {
  const r = await chrome.storage.local.get("roadmap");
  const rm = r.roadmap;
  if (rm?.md) {
    el.stRoadResult.innerHTML = renderMarkdown(rm.md);
    const days = Math.floor((Date.now() - new Date(rm.date + "T00:00:00").getTime()) / 86400000);
    const due = days >= ROADMAP_EVERY_DAYS;
    el.stRoadInfo.className = "st-retest" + (due ? " due" : "");
    el.stRoadInfo.textContent = due
      ? `⏰ Lộ trình đã lập ${days} ngày trước — nên phân tích lại để cập nhật theo tiến độ mới.`
      : `Lộ trình lập ngày ${rm.date}. Sẽ gợi ý cập nhật sau ${ROADMAP_EVERY_DAYS - days} ngày.`;
    el.stRoadBtn.textContent = "Phân tích lại";
  } else {
    el.stRoadResult.innerHTML = "";
    el.stRoadInfo.className = "st-retest";
    el.stRoadInfo.textContent =
      "AI sẽ đọc số liệu học của bạn (mức nhớ, độ chính xác, từ hay sai, đều đặn) rồi chỉ ra điểm yếu và lộ trình cho giai đoạn tới.";
    el.stRoadBtn.textContent = "Phân tích & lập lộ trình";
  }
}

el.stRoadBtn.addEventListener("click", async () => {
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.stRoadInfo.textContent = "Cần API key (⚙️) để phân tích."; return; }
  const list = await getVocab();
  if (list.length < 10) { el.stRoadInfo.textContent = "Cần ít nhất 10 từ đã lưu để phân tích có ý nghĩa."; return; }

  el.stRoadBtn.disabled = true;
  el.stRoadResult.innerHTML = '<span class="placeholder">Đang phân tích dữ liệu học của bạn…</span>';
  try {
    const summary = await buildLearningSummary();
    const md = await chatOnce({
      config: gradingConfig(cfg),
      messages: [
        {
          role: "system",
          content:
            "Bạn là gia sư tiếng Anh/IELTS. Dựa trên SỐ LIỆU HỌC TẬP thật của học viên, hãy viết một bản tổng kết + lộ trình bằng tiếng Việt, dùng markdown, súc tích và cụ thể. Bố cục: " +
            "(1) **Tổng kết giai đoạn** — 3-4 gạch đầu dòng về tiến độ thật sự, khen đúng chỗ; " +
            "(2) **Điểm yếu cần xử lý** — chỉ ra từ/chủ điểm ngữ pháp hay sai và LÝ DO có thể; " +
            "(3) **Lộ trình 2 tuần tới** — chia theo tuần, nêu rõ mỗi ngày làm gì, số lượng cụ thể, dựa trên nhịp học thực tế của họ (đừng đề xuất phi thực tế); " +
            "(4) **3 việc làm ngay hôm nay**. Nói thẳng nếu dữ liệu cho thấy học không đều hoặc học vẹt.",
        },
        { role: "user", content: "SỐ LIỆU HỌC TẬP:\n" + summary },
      ],
    });
    if (!md || !md.trim()) throw new Error("Model không trả về nội dung.");
    const today = todayStr();
    await chrome.storage.local.set({ roadmap: { date: today, md } });
    await renderRoadmapInfo();
  } catch (err) {
    console.error("roadmap:", err);
    el.stRoadResult.innerHTML = '<span class="lr-err">⚠️ ' + aiErrorHint(err, cfg) + "</span>";
  } finally {
    el.stRoadBtn.disabled = false;
  }
});

// Kiểm tra lại: lấy mẫu ngẫu nhiên trong các từ ĐÃ học, bỏ qua lịch đến hạn.
el.stRetestBtn.addEventListener("click", async () => {
  const list = await getVocab();
  const pool = learnedWords(list);
  if (pool.length < 4) return;
  el.statsModal.classList.add("hidden");
  await markRetestDone();
  // Không cắt sẵn số câu ở đây — để màn "Chọn số câu" quyết định.
  startQuiz({ pool: shuffle(pool.slice()), title: "Kiểm tra lại" });
});

// ---------- Kiểm tra (Quiz) ----------
let quiz = null;
const QUIZ_TYPE_LABEL = { w2m: "Chọn nghĩa đúng", m2w: "Chọn từ đúng", listen: "Nghe & chọn từ", type: "Nhớ & viết lại từ", cloze: "Điền từ vào câu" };

// Gợi ý cho câu "viết lại từ": chữ cái đầu + số ô còn lại của mỗi từ.
function wordHint(term) {
  const parts = term.trim().split(/\s+/).map((w) =>
    w.length <= 1 ? w : w[0] + " " + "_ ".repeat(w.length - 1).trim()
  );
  const letters = term.replace(/[^A-Za-zÀ-ỹ]/g, "").length;
  return parts.join("   /   ") + `  ·  ${letters} chữ cái`;
}
// So khớp đáp án phải GIỐNG HỆT cổng học, nếu không cùng một câu trả lời sẽ
// được chấm đúng ở màn này và sai ở màn kia — kéo theo trừ oan điểm SM-2.
// Bỏ qua khác biệt dấu nháy cong, gạch nối, khoảng trắng thừa.
function normAnswer(s) {
  return String(s || "").normalize("NFC").trim().toLowerCase()
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/[.,!?;:"'\u2018\u2019\u201d\u201c]/g, "")
    .replace(/\s+/g, " ");
}
function looseAnswer(s) {
  return normAnswer(s).replace(/[-\s]/g, "");
}
function sameAnswerSp(a, b) {
  return normAnswer(a) === normAnswer(b) || looseAnswer(a) === looseAnswer(b);
}

el.quizBtn.addEventListener("click", startQuiz);
el.quizClose.addEventListener("click", () => { el.quiz.classList.add("hidden"); refreshDashboard(); renderVocab(); });

// Ôn lại các câu ngữ pháp/IELTS từng trả lời sai (đến hạn).
// Mục tự lưu khi lướt MXH mà KHÔNG phải từ/cụm sạch (từ đơn / phrasal verb) -> rác.
// Dùng chung isCleanLexicalItem() từ vocab.js nên "come off" được giữ, "the gallery opened" bị loại.
function isSuspectAutoVocab(v) {
  const term = v.term || "";
  // Mảnh mệnh đề / mục không phải chữ ("11.1") thì nguồn nào cũng là rác.
  if (isClauseLike(term) || isJunkTerm(term)) return true;
  return /Sai khi lướt MXH/i.test(v.source || "") && !isCleanLexicalItem(term);
}

el.stCleanBtn.addEventListener("click", async () => {
  const suspects = (await getVocab()).filter(isSuspectAutoVocab);
  if (!suspects.length) return;
  if (!confirm(`Xoá ${suspects.length} mục nghi là rác?\n\n${suspects.map((v) => "• " + v.term).join("\n")}`)) return;
  for (const v of suspects) await removeVocab(v.term);
  await renderStats();
  refreshVocabCount();
  renderVocab();
  setStatus(`✓ Đã dọn ${suspects.length} mục.`);
});

// Mục lưu nhầm dạng đã chia ("knocked back") -> đổi tên về dạng từ điển.
// renameVocab() giữ nguyên tiến độ SM-2 nên không mất công học lại từ đầu.
async function inflectedVocab() {
  const list = await getVocab();
  const terms = new Set(list.map((v) => v.term.toLowerCase()));
  return list
    .map((v) => ({ v, base: baseFormSuggestion(v.term) }))
    .filter((x) => x.base && !terms.has(x.base)); // đã có sẵn mục dạng gốc thì để người dùng tự gộp
}

el.stBaseBtn.addEventListener("click", async () => {
  const items = await inflectedVocab();
  if (!items.length) return;
  if (!confirm(`Đưa ${items.length} mục về dạng gốc (giữ nguyên tiến độ ôn)?\n\n${items.map((x) => `• ${x.v.term} → ${x.base}`).join("\n")}`)) return;
  for (const x of items) await renameVocab(x.v.term, x.base);
  await renderStats();
  renderVocab();
  setStatus(`✓ Đã chuẩn hoá ${items.length} mục về dạng gốc.`);
});

el.stDupBtn.addEventListener("click", async () => {
  const groups = findNearDuplicateGroups(await getVocab());
  if (!groups.length) return;
  const preview = groups
    .map((g) => "• " + g.map((v) => v.term).join("  ↔  "))
    .join("\n");
  if (!confirm(`Gộp ${groups.length} nhóm trùng lặp gần giống (giữ mục có nhiều lượt ôn nhất)?\n\n${preview}`)) return;
  for (const g of groups) await mergeDuplicateGroup(g.map((v) => v.term));
  await renderStats();
  refreshVocabCount();
  renderVocab();
  setStatus(`✓ Đã gộp ${groups.length} nhóm trùng lặp.`);
});

el.stMistakeBtn.addEventListener("click", async () => {
  const due = await dueMistakes();
  if (!due.length) return;
  el.statsModal.classList.add("hidden");
  const pool = shuffle(due.slice());
  openQuizSetup({
    title: "Ôn câu sai",
    max: pool.length,
    build: (n) => pool.slice(0, n).map((m) => ({ type: "bank", bank: m })),
  });
});

async function startQuiz(opts) {
  // opts có thể là Event (khi gọi từ nút) -> chỉ nhận khi đúng dạng { pool }.
  const custom = opts && Array.isArray(opts.pool) ? opts : null;
  const list = (await getVocab()).filter((v) => v.meaning && v.term);
  if (list.length < 4) { setIeltsStatus("Cần ít nhất 4 từ (có nghĩa) để kiểm tra.", true); switchTab("vocab"); return; }

  let pool;
  if (custom) {
    pool = custom.pool.slice();
  } else {
    const due = dueVocab(list);
    pool = shuffle((due.length >= 4 ? due : list).slice());
  }
  openQuizSetup({
    title: custom?.title || "",
    max: pool.length,
    build: (n) => pool.slice(0, n).map((w) => makeQuestion(w, list)),
  });
}

// ---------- Chọn số câu trước khi làm ----------
// Mọi lối vào quiz (📝 Kiểm tra, đề hôm nay, ôn câu sai) đều đi qua đây để
// số câu là do người dùng chọn, không cố định trong code.
const QUIZ_COUNT_CHOICES = [5, 10, 15, 20, 30];
let quizPending = null; // { title, max, build(n) }

async function openQuizSetup(spec) {
  quizPending = spec;
  const cfg = await getConfig();
  const preferred = Math.min(quizDefaultCount(cfg), spec.max);
  // Các mốc nhỏ hơn kho câu + luôn có lựa chọn "tất cả".
  const choices = [...new Set(QUIZ_COUNT_CHOICES.concat(preferred))]
    .filter((n) => n > 0 && n < spec.max)
    .sort((a, b) => a - b)
    .concat(spec.max);

  el.quiz.classList.remove("hidden");
  el.quizResult.classList.add("hidden");
  el.quizPanel.classList.add("hidden");
  el.quizSetup.classList.remove("hidden");
  el.quizProgress.textContent = spec.title || "Kiểm tra từ vựng";
  el.quizSetupInfo.textContent = `Có ${spec.max} câu khả dụng. Chọn số câu muốn làm:`;

  el.quizCountOpts.innerHTML = "";
  choices.forEach((n) => {
    const b = document.createElement("button");
    b.className = "quiz-count" + (n === preferred ? " active" : "");
    b.textContent = n === spec.max ? `Tất cả (${n})` : String(n);
    b.dataset.n = String(n);
    b.addEventListener("click", () => {
      [...el.quizCountOpts.children].forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    });
    el.quizCountOpts.appendChild(b);
  });
}

function quizDefaultCount(cfg) {
  return Math.max(1, parseInt(cfg.quizCount, 10) || DEFAULT_CONFIG.quizCount);
}

el.quizStart.addEventListener("click", () => {
  if (!quizPending) return;
  const active = el.quizCountOpts.querySelector(".quiz-count.active");
  const n = Math.max(1, Math.min(parseInt(active?.dataset.n, 10) || 1, quizPending.max));
  quiz = { questions: quizPending.build(n), idx: 0, correct: 0, wrong: [], title: quizPending.title };
  el.quizSetup.classList.add("hidden");
  el.quizPanel.classList.remove("hidden");
  showQuizQuestion();
});

function makeQuestion(word, list) {
  const types = ["w2m", "m2w", "type", "listen"]; // "listen" dùng được cho mọi từ nhờ TTS
  // "cloze" chỉ khi câu ví dụ có chứa từ (điền vào chỗ trống trong ngữ cảnh thật)
  if (word.example && word.example.toLowerCase().includes(word.term.toLowerCase())) types.push("cloze");
  const type = types[Math.floor(Math.random() * types.length)];
  const others = list.filter((v) => v.term.toLowerCase() !== word.term.toLowerCase());
  shuffle(others);
  return { type, word, distractors: others.slice(0, 3) };
}

function showQuizQuestion() {
  const q = quiz.questions[quiz.idx];

  // Câu từ SỔ LỖI (ngữ pháp/IELTS) — không gắn với từ vựng.
  if (q.type === "bank") {
    el.quizProgress.textContent = `Câu ${quiz.idx + 1}/${quiz.questions.length} · Đúng ${quiz.correct}`;
    el.quizType.textContent = "🩹 Câu từng sai · " + (q.bank.kind === "ielts" ? "IELTS" : "Ngữ pháp");
    el.quizQ.textContent = q.bank.q;
    el.quizFeedback.textContent = "";
    el.quizFeedback.className = "quiz-feedback";
    el.quizNext.classList.add("hidden");
    el.quizSubmit.classList.add("hidden");
    el.quizInput.classList.add("hidden");
    el.quizOptions.innerHTML = "";
    shuffle(q.bank.o.map((t, i) => ({ text: t, correct: i === q.bank.a }))).forEach((o) => {
      const b = document.createElement("button");
      b.className = "quiz-opt";
      b.textContent = o.text;
      b.addEventListener("click", () => answerMC(o, b));
      el.quizOptions.appendChild(b);
    });
    return;
  }

  const w = q.word;
  el.quizProgress.textContent = `Câu ${quiz.idx + 1}/${quiz.questions.length} · Đúng ${quiz.correct}`;
  el.quizType.textContent = QUIZ_TYPE_LABEL[q.type];
  el.quizFeedback.textContent = "";
  el.quizFeedback.className = "quiz-feedback";
  el.quizNext.classList.add("hidden");
  el.quizSubmit.classList.add("hidden");
  el.quizOptions.innerHTML = "";
  el.quizInput.classList.add("hidden");
  el.quizInput.value = "";
  el.quizInput.disabled = false;

  if (q.type === "type") {
    // Nhớ & viết lại từ: cho nghĩa VN (+ loại từ, định nghĩa, audio) rồi gõ lại từ tiếng Anh.
    el.quizQ.innerHTML =
      `<div class="qq-mean">${escapeHtml(w.meaning)}</div>` +
      (w.pos ? `<div class="qq-ipa">(${escapeHtml(w.pos)})</div>` : "") +
      (w.definition ? `<div class="qq-def">${escapeHtml(w.definition)}</div>` : "") +
      `<div class="qq-hint">${wordHint(w.term)}</div>`;
    if (w.audio) {
      const play = document.createElement("button");
      play.className = "btn small";
      play.textContent = "🔊 Nghe gợi ý";
      play.style.marginTop = "8px";
      play.addEventListener("click", () => playAudio(w.audio, w.term));
      el.quizQ.appendChild(play);
    }
    el.quizInput.classList.remove("hidden");
    el.quizSubmit.classList.remove("hidden");
    el.quizInput.focus();
    return;
  }

  if (q.type === "cloze") {
    const re = new RegExp(w.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    el.quizQ.innerHTML =
      `<div class="qq-cloze">${escapeHtml(w.example).replace(re, '<span class="cloze-gap">_____</span>')}</div>` +
      `<div class="qq-hint">${wordHint(w.term)}</div>`;
    el.quizInput.classList.remove("hidden");
    el.quizSubmit.classList.remove("hidden");
    el.quizInput.focus();
    return;
  }

  if (q.type === "listen") {
    el.quizQ.innerHTML = "";
    const play = document.createElement("button");
    play.className = "btn";
    play.textContent = "🔊 Nghe lại";
    play.addEventListener("click", () => playAudio(w.audio, w.term));
    el.quizQ.appendChild(play);
    playAudio(w.audio, w.term);
  } else if (q.type === "w2m") {
    el.quizQ.innerHTML = `<div class="qq-word">${escapeHtml(w.term)}</div>` + (w.phonetic ? `<div class="qq-ipa">${escapeHtml(w.phonetic)}</div>` : "");
  } else {
    el.quizQ.innerHTML = `<div class="qq-mean">${escapeHtml(w.meaning)}</div>`;
  }

  const correctText = q.type === "w2m" ? w.meaning : w.term;
  const opts = [{ text: correctText, correct: true }].concat(
    q.distractors.map((d) => ({ text: q.type === "w2m" ? d.meaning : d.term, correct: false }))
  );
  shuffle(opts);
  opts.forEach((o) => {
    const b = document.createElement("button");
    b.className = "quiz-opt";
    b.textContent = o.text;
    b.addEventListener("click", () => answerMC(o, b));
    el.quizOptions.appendChild(b);
  });
}

async function answerMC(opt, btn) {
  const q = quiz.questions[quiz.idx];
  [...el.quizOptions.children].forEach((b) => (b.disabled = true));

  // Câu từ sổ lỗi: đúng -> giãn lịch (đủ 3 lần thì xoá), sai -> mai kiểm tra lại.
  if (q.type === "bank") {
    const correctText = q.bank.o[q.bank.a];
    if (opt.correct) {
      btn.classList.add("correct");
      quiz.correct++;
      el.quizFeedback.className = "quiz-feedback ok";
      el.quizFeedback.innerHTML = "✓ Chính xác!" + (q.bank.e ? `<br><small>${escapeHtml(q.bank.e)}</small>` : "");
    } else {
      btn.classList.add("wrong");
      [...el.quizOptions.children].forEach((b) => { if (b.textContent === correctText) b.classList.add("correct"); });
      el.quizFeedback.className = "quiz-feedback no";
      el.quizFeedback.innerHTML = `✗ Đáp án: <b>${escapeHtml(correctText)}</b>` + (q.bank.e ? `<br><small>${escapeHtml(q.bank.e)}</small>` : "");
      quiz.wrong.push({ term: q.bank.q, meaning: correctText });
    }
    await markMistakeResult(q.bank.id, opt.correct);
    el.quizNext.classList.remove("hidden");
    return;
  }

  const w = q.word;
  const correctText = q.type === "w2m" ? w.meaning : w.term;
  if (opt.correct) {
    btn.classList.add("correct");
    quiz.correct++;
    feedbackOK();
    await reviewVocab(w.term, true, true); // trắc nghiệm = nhận diện
  } else {
    btn.classList.add("wrong");
    [...el.quizOptions.children].forEach((b) => { if (b.textContent === correctText) b.classList.add("correct"); });
    feedbackNo(w);
    quiz.wrong.push(w);
    await reviewVocab(w.term, false);
  }
  el.quizNext.classList.remove("hidden");
}

el.quizSubmit.addEventListener("click", async () => {
  const q = quiz.questions[quiz.idx];
  const w = q.word;
  const ans = normAnswer(el.quizInput.value);
  el.quizInput.disabled = true;
  el.quizSubmit.classList.add("hidden");
  if (ans && sameAnswerSp(el.quizInput.value, w.term)) { quiz.correct++; feedbackOK(); await reviewVocab(w.term, true); }
  else { feedbackNo(w); quiz.wrong.push(w); await reviewVocab(w.term, false); }
  el.quizNext.classList.remove("hidden");
});
el.quizInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !el.quizSubmit.classList.contains("hidden")) { e.preventDefault(); el.quizSubmit.click(); }
});

function feedbackOK() { el.quizFeedback.textContent = "✓ Chính xác!"; el.quizFeedback.className = "quiz-feedback ok"; }
function feedbackNo(w) {
  el.quizFeedback.innerHTML = `✗ Đáp án: <b>${escapeHtml(w.term)}</b> — ${escapeHtml(w.meaning || "")}`;
  el.quizFeedback.className = "quiz-feedback no";
}

el.quizNext.addEventListener("click", () => {
  quiz.idx++;
  if (quiz.idx >= quiz.questions.length) finishQuiz();
  else showQuizQuestion();
});

async function finishQuiz() {
  el.quizPanel.classList.add("hidden");
  const total = quiz.questions.length;
  const pct = Math.round((quiz.correct / total) * 100);
  let html = `<div class="qr-score">${quiz.correct}/${total} <span>(${pct}%)</span></div>`;
  if (quiz.wrong.length) {
    html += '<div class="qr-title">Cần ôn lại:</div><ul class="qr-list">' +
      quiz.wrong.map((w) => `<li><b>${escapeHtml(w.term)}</b> — ${escapeHtml(w.meaning || "")}</li>`).join("") + "</ul>";
  } else {
    html += '<div class="qr-perfect">Tuyệt vời! 🎉</div>';
  }
  el.quizResult.innerHTML = html;
  const again = document.createElement("button");
  again.className = "btn primary";
  again.textContent = "Làm lại";
  // Quay về màn chọn số câu của đúng bộ đề vừa làm (trước đây luôn nhảy về
  // quiz từ vựng, kể cả khi đang ôn câu sai).
  again.addEventListener("click", () => { if (quizPending) openQuizSetup(quizPending); });
  el.quizResult.appendChild(again);
  el.quizResult.classList.remove("hidden");
  refreshDashboard();

  const done = await creditMorningSession(total);
  if (done) {
    const note = document.createElement("div");
    note.className = "qr-gate";
    note.textContent = "✅ Đã tính là bài đầu ngày — hôm nay không bị chặn web nữa.";
    el.quizResult.insertBefore(note, again);
  }
}

// Làm đủ số câu ở sidebar thì tính luôn là đã trả bài đầu ngày, để không phải
// học lại lần nữa qua gate.html. Ngưỡng = số câu mặc định trong ⚙️.
async function creditMorningSession(answered) {
  try {
    const cfg = await getConfig();
    if (answered < quizDefaultCount(cfg)) return false;
    const r = await chrome.storage.local.get("gateState");
    const st = r.gateState || {};
    if (st.morningDoneDate === todayStr()) return false;
    st.morningDoneDate = todayStr();
    await chrome.storage.local.set({ gateState: st });
    return true;
  } catch (e) {
    console.error("creditMorningSession:", e);
    return false;
  }
}

// Cấu hình dùng riêng khi CHẤM BÀI: thay model bằng gradeModel (nếu có đặt).
function gradingConfig(cfg) {
  return cfg.gradeModel ? { ...cfg, model: cfg.gradeModel } : cfg;
}

// Gợi ý khắc phục khi gọi AI lỗi (hay gặp: model không có trên endpoint đang dùng).
function aiErrorHint(err, cfg) {
  const msg = err?.message || String(err);
  const model = cfg.gradeModel || cfg.model;
  if (/404|not found|does not exist|unknown model|invalid model/i.test(msg)) {
    return `${msg}<br><br>👉 Model <b>${escapeHtml(model)}</b> không có trên endpoint <b>${escapeHtml(cfg.baseUrl)}</b>.
      Vào ⚙️ đổi <b>Base URL</b> cho đúng nhà cung cấp, hoặc đổi <b>Model dùng khi chấm bài</b> sang model mà endpoint đó có.`;
  }
  if (/401|invalid api key|unauthorized/i.test(msg)) {
    return `${msg}<br><br>👉 API key sai hoặc không dùng được với endpoint này (⚙️).`;
  }
  return msg;
}

// ---------- Đề IELTS hôm nay ----------
let dailyItem = null;
el.dailyBtn.addEventListener("click", openDaily);
el.idClose.addEventListener("click", () => el.ieltsDaily.classList.add("hidden"));
el.ieltsDaily.addEventListener("click", (e) => { if (e.target === el.ieltsDaily) el.ieltsDaily.classList.add("hidden"); });

function normalizeDaily(o) {
  return {
    theme: o.theme || "IELTS",
    writing: o.writing || "",
    cue: o.cue || "",
    bullets: Array.isArray(o.bullets) ? o.bullets : [],
    part3: Array.isArray(o.part3) ? o.part3 : [],
    source: o.source || "",
  };
}
function renderDailyItem(item, note) {
  dailyItem = item;
  el.idDate.textContent = `${new Date().toLocaleDateString("vi-VN")} · Chủ đề: ${item.theme}`;
  el.idSrcNote.textContent = note || "";
  el.idWriting.textContent = item.writing;
  el.idSpeaking.innerHTML =
    (item.cue ? `<b>Part 2 — Cue card:</b><br>${escapeHtml(item.cue)}<ul>` +
      item.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("") + "</ul>" : "") +
    (item.part3.length ? `<b>Part 3 — Thảo luận:</b><ul>` +
      item.part3.map((q) => `<li>${escapeHtml(q)}</li>`).join("") + "</ul>" : "");
  el.idEssay.value = "";
  el.idScoreResult.innerHTML = "";
  el.idReading.innerHTML = "";
}
function openDaily() {
  if (typeof IELTS_DAILY === "undefined" || !IELTS_DAILY.length) return;
  renderDailyItem(IELTS_DAILY[Math.floor(Date.now() / 86400000) % IELTS_DAILY.length]);
  el.ieltsDaily.classList.remove("hidden");
}

// Bóc tách 1 object JSON từ chuỗi (dùng cho "Đề mới AI").
function parseJsonObject(s) {
  let t = String(s).trim().replace(/^```[a-z]*\s*/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}
function htmlToText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

// ✨ Sinh một đề mới theo xu hướng gần đây (không crawl).
el.idFresh.addEventListener("click", async () => {
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.idSrcNote.textContent = "Cần API key (⚙️) để sinh đề."; return; }
  el.idFresh.disabled = true;
  el.idSrcNote.textContent = "Đang tạo đề mới…";
  try {
    const raw = await chatOnce({
      config: cfg,
      messages: [
        { role: "system", content: "Bạn là chuyên gia luyện thi IELTS, nắm rõ các chủ đề Writing/Speaking thường gặp gần đây." },
        { role: "user", content: 'Tạo MỘT bộ đề IELTS mới theo xu hướng gần đây. Trả về DUY NHẤT một JSON object: {"theme": chủ đề, "writing": một đề Writing Task 2 hoàn chỉnh, "cue": đề cue card Speaking Part 2, "bullets": [4 gạch đầu dòng], "part3": [3 câu hỏi Part 3]}. Không thêm chữ nào ngoài JSON.' },
      ],
    });
    const obj = parseJsonObject(raw);
    if (!obj || !obj.writing) throw new Error("Không đọc được đề, thử lại.");
    renderDailyItem(normalizeDaily(obj), "✨ Đề do AI tạo theo xu hướng gần đây");
  } catch (err) {
    el.idSrcNote.textContent = "Lỗi: " + err.message;
  } finally {
    el.idFresh.disabled = false;
  }
});

// 🌐 Lấy đề từ một trang công khai: fetch -> LLM bóc tách.
el.idFromUrl.addEventListener("click", async () => {
  const url = prompt("Dán URL trang liệt kê CHỦ ĐỀ IELTS gần đây (Writing/Speaking).\nLưu ý: chỉ dùng trang liệt kê đề công khai, không lấy đề thi có bản quyền.", "");
  if (!url || !url.trim()) return;
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.idSrcNote.textContent = "Cần API key (⚙️) để bóc tách."; return; }
  el.idFromUrl.disabled = true;
  el.idSrcNote.textContent = "Đang tải trang…";
  try {
    const res = await fetch(url.trim());
    if (!res.ok) throw new Error("HTTP " + res.status);
    let text = htmlToText(await res.text());
    if (text.length < 60) throw new Error("Trang không có nội dung text để bóc tách.");
    if (text.length > 12000) text = text.slice(0, 12000);
    el.idSrcNote.textContent = "Đang bóc tách đề bằng AI…";
    const raw = await chatOnce({
      config: cfg,
      messages: [
        { role: "system", content: "Bạn trích xuất đề IELTS từ văn bản trang web. Chỉ lấy ĐỀ BÀI Writing Task 2 và chủ đề Speaking; bỏ qua nội dung khác." },
        { role: "user", content: `Từ nội dung sau, trích các bộ đề IELTS. Trả về DUY NHẤT một mảng JSON, mỗi phần tử: {"theme","writing","cue","bullets":[...],"part3":[...]}. Nếu thiếu phần nào để trống. Tối đa 8 phần tử.\n\n=== NỘI DUNG ===\n${text}` },
      ],
    });
    const arr = extractJsonArray(raw).filter((o) => o && (o.writing || o.cue));
    if (!arr.length) throw new Error("Không tìm thấy đề trong trang này.");
    renderDailyItem(normalizeDaily(arr[0]), `🌐 Lấy từ web (${arr.length} đề tìm thấy · hiển thị đề 1)`);
  } catch (err) {
    el.idSrcNote.textContent = "Không lấy được: " + err.message + " — hãy tải file/copy đề rồi dùng cách khác.";
  } finally {
    el.idFromUrl.disabled = false;
  }
});

el.idScore.addEventListener("click", async () => {
  const essay = el.idEssay.value.trim();
  if (essay.length < 40) { el.idScoreResult.innerHTML = '<span class="lr-err">Hãy viết bài dài hơn để chấm.</span>'; return; }
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.idScoreResult.innerHTML = '<span class="lr-err">Cần API key (mở ⚙️) để chấm.</span>'; return; }
  el.idScore.disabled = true;
  el.idScoreResult.innerHTML = '<span class="placeholder">Đang chấm bài…</span>';
  try {
    const out = await chatOnce({
      config: gradingConfig(cfg),
      messages: [
        { role: "system", content: "Bạn là giám khảo IELTS Writing giàu kinh nghiệm. Chấm bài Task 2 theo 4 tiêu chí: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy — mỗi tiêu chí cho band ước lượng (0–9, bước 0.5) kèm nhận xét ngắn. Đưa BAND TỔNG ước lượng, liệt kê 3 lỗi chính (kèm cách sửa) và 3 gợi ý cải thiện. Trả lời bằng tiếng Việt, dùng markdown, súc tích và mang tính động viên." },
        { role: "user", content: `ĐỀ BÀI:\n${dailyItem.writing}\n\nBÀI LÀM:\n${essay}` },
      ],
    });
    if (!out || !out.trim()) throw new Error("Model không trả về nội dung nào.");
    el.idScoreResult.innerHTML = renderMarkdown(out);
  } catch (err) {
    console.error("idScore:", err);
    el.idScoreResult.innerHTML = '<span class="lr-err">⚠️ ' + aiErrorHint(err, cfg) + "</span>";
  } finally {
    el.idScore.disabled = false;
    el.idScoreResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

el.idGenReading.addEventListener("click", async () => {
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.idReading.innerHTML = '<span class="lr-err">Cần API key (mở ⚙️).</span>'; return; }
  el.idGenReading.disabled = true;
  el.idReading.innerHTML = '<span class="placeholder">Đang tạo đề đọc…</span>';
  try {
    const out = await chatOnce({
      config: cfg,
      messages: [
        { role: "system", content: "Bạn là người soạn đề IELTS Academic Reading." },
        { role: "user", content: `Tạo một đoạn đọc học thuật (~200 từ, tiếng Anh) về chủ đề "${dailyItem.theme}", tiếp theo là 5 câu hỏi (kết hợp True/False/Not Given và multiple choice), và cuối cùng phần "ĐÁP ÁN" kèm giải thích ngắn. Dùng markdown; passage và câu hỏi bằng tiếng Anh, giải thích đáp án bằng tiếng Việt.` },
      ],
    });
    el.idReading.innerHTML = renderMarkdown(out);
  } catch (err) {
    el.idReading.innerHTML = '<span class="lr-err">Lỗi: ' + escapeHtml(err.message) + "</span>";
  } finally {
    el.idGenReading.disabled = false;
  }
});

// ---------- Flashcard ----------
let fcQueue = [];
let fcIndex = 0;

let fcPool = [];
el.reviewBtn.addEventListener("click", async () => {
  const list = (await getVocab()).filter((v) => v.term);
  if (!list.length) { setStatus("Chưa có từ để ôn tập.", true); return; }
  const due = dueVocab(list);
  // Ưu tiên từ đến hạn; nếu không có thì ôn toàn bộ.
  fcPool = shuffle((due.length ? due : list).slice());

  el.fcSetupInfo.textContent = due.length
    ? `${due.length} từ đến hạn ôn hôm nay · tổng ${list.length} từ.`
    : `Không có từ đến hạn — ôn lại trong tổng ${list.length} từ.`;

  // Các mốc số lượng gợi ý, không vượt quá số từ có.
  const max = fcPool.length;
  const opts = [...new Set([10, 20, 30, 50, max])].filter((n) => n > 0 && n <= max).sort((a, b) => a - b);
  el.fcCountOpts.innerHTML = "";
  opts.forEach((n, i) => {
    const b = document.createElement("button");
    b.className = "g-count" + (i === 0 ? " active" : "");
    b.textContent = n === max ? `Tất cả (${n})` : String(n);
    b.dataset.n = String(n);
    b.addEventListener("click", () => {
      [...el.fcCountOpts.children].forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
    });
    el.fcCountOpts.appendChild(b);
  });

  el.fcSetup.classList.remove("hidden");
  el.fcReview.classList.add("hidden");
  el.flashcard.classList.remove("hidden");
});

el.fcStart.addEventListener("click", () => {
  const active = el.fcCountOpts.querySelector(".g-count.active");
  const n = parseInt(active?.dataset.n, 10) || fcPool.length;
  fcQueue = fcPool.slice(0, n);
  if (!fcQueue.length) { setStatus("Chưa có từ để ôn tập.", true); return; }
  fcIndex = 0;
  el.fcSetup.classList.add("hidden");
  el.fcReview.classList.remove("hidden");
  showCard();
});
el.fcClose.addEventListener("click", () => { el.flashcard.classList.add("hidden"); renderVocab(); });
el.fcReveal.addEventListener("click", () => {
  el.fcMeaning.classList.remove("hidden");
  el.fcReveal.classList.add("hidden");
  el.fcGrade.classList.remove("hidden");
});
el.fcAgain.addEventListener("click", () => grade(1)); // Quên
el.fcHard.addEventListener("click", () => grade(3));  // Khó
el.fcGood.addEventListener("click", () => grade(4));  // Được
el.fcEasy.addEventListener("click", () => grade(5));  // Dễ

function showCard() {
  const v = fcQueue[fcIndex];
  el.fcProgress.textContent = `${fcIndex + 1} / ${fcQueue.length}`;
  el.fcTerm.innerHTML = escapeHtml(v.term) + (v.phonetic ? ` <span class="fc-ipa">${escapeHtml(v.phonetic)}</span>` : "");
  const fcPlay = document.createElement("button");
  fcPlay.className = "fc-audio";
  fcPlay.textContent = "🔊";
  fcPlay.title = v.audio ? "Nghe phát âm" : "Nghe (giọng máy)";
  fcPlay.addEventListener("click", () => playAudio(v.audio, v.term));
  el.fcTerm.appendChild(fcPlay);
  el.fcMeaning.innerHTML =
    escapeHtml(v.meaning || "(chưa có nghĩa)") +
    (v.definition ? `<div class="fc-def">${escapeHtml(v.definition)}</div>` : "");
  el.fcContext.textContent = v.context ? `“${v.context}”` : "";
  el.fcMeaning.classList.add("hidden");
  el.fcGrade.classList.add("hidden");
  el.fcReveal.classList.remove("hidden");

  // Hiện trước khoảng cách ôn của từng mức để chọn cho đúng.
  ensureSrs(v);
  el.fcAgain.querySelector("small").textContent = srsPreview(v, 1);
  el.fcHard.querySelector("small").textContent = srsPreview(v, 3);
  el.fcGood.querySelector("small").textContent = srsPreview(v, 4);
  el.fcEasy.querySelector("small").textContent = srsPreview(v, 5);
}
async function grade(quality) {
  const v = fcQueue[fcIndex];
  await reviewVocabSM2(v.term, quality);
  // Quên -> đưa lại cuối hàng đợi để gặp lại ngay trong phiên này.
  if (quality < 3) fcQueue.push(v);
  fcIndex++;
  if (fcIndex >= fcQueue.length) {
    el.flashcard.classList.add("hidden");
    setStatus("✓ Đã ôn xong.");
    renderVocab();
    refreshVocabCount();
  } else showCard();
}

// ============================================================
// HỎI ĐÁP — chat với nội dung tài liệu đang mở.
// ============================================================
const QA_SUGGESTIONS = [
  "Tóm tắt bài báo trong 5 ý chính",
  "Đóng góp chính (contribution) là gì?",
  "Giải thích phương pháp/mô hình đề xuất",
  "Kết quả nổi bật và hạn chế?",
];
const QA_SUGGESTIONS_FREE = [
  "Giải thích cơ chế attention trong Transformer",
  "Sự khác nhau giữa CNN và RNN?",
  "Gợi ý hướng nghiên cứu về multimodal",
  "Viết một đoạn mở đầu (abstract) mẫu",
];
let qaHistory = []; // {role, content} cho API
let qaBusy = false;

async function refreshQA() {
  await refreshKB();
  const kbTotal = Number(el.kbCount.textContent) || 0;
  const hasDoc = segments.length > 0;
  // Chat luôn dùng được nhờ chế độ "Tự do".
  el.qaEmpty.classList.add("hidden");
  el.qaChat.classList.remove("hidden");

  const docBtn = el.qaScope.querySelector('[data-scope="doc"]');
  const kbBtn = el.qaScope.querySelector('[data-scope="kb"]');
  if (docBtn) docBtn.disabled = !hasDoc;
  if (kbBtn) kbBtn.disabled = kbTotal === 0;

  // Nếu phạm vi hiện tại không khả dụng, chuyển sang phạm vi hợp lý.
  if (qaScopeVal === "doc" && !hasDoc) qaScopeVal = kbTotal > 0 ? "kb" : "free";
  if (qaScopeVal === "kb" && kbTotal === 0) qaScopeVal = hasDoc ? "doc" : "free";
  applyQaScope();
  if (!el.qaMessages.children.length) renderSuggestions();
}

// Chọn phạm vi hỏi đáp: tài liệu / kho tri thức / tự do.
el.qaScope.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-scope]");
  if (!b || b.disabled) return;
  qaScopeVal = b.dataset.scope;
  applyQaScope();
  if (!el.qaMessages.children.length) renderSuggestions();
});
function applyQaScope() {
  el.qaScope.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("active", b.dataset.scope === qaScopeVal)
  );
  el.qaText.placeholder =
    qaScopeVal === "free" ? "Hỏi bất cứ điều gì… (Enter để gửi)" : "Hỏi về tài liệu… (Enter để gửi)";
}

function renderSuggestions() {
  el.qaSuggest.innerHTML = "";
  if (qaHistory.length) return;
  const list = qaScopeVal === "free" ? QA_SUGGESTIONS_FREE : QA_SUGGESTIONS;
  list.forEach((q) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = q;
    chip.addEventListener("click", () => sendQA(q));
    el.qaSuggest.appendChild(chip);
  });
}

function addBubble(role, text) {
  const b = document.createElement("div");
  b.className = "bubble " + role;
  b.textContent = text;
  el.qaMessages.appendChild(b);
  el.qaMessages.scrollTop = el.qaMessages.scrollHeight;
  return b;
}

function docContext() {
  let t = segments.map((s) => s.text).join("\n\n");
  const CAP = 48000;
  if (t.length > CAP) t = t.slice(0, CAP) + "\n\n[...nội dung đã được lược bớt do quá dài...]";
  return t;
}

async function sendQA(question) {
  question = (question || "").trim();
  if (!question || qaBusy) return;
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); setStatus("Chưa có API key. Mở ⚙️.", true); switchTab("qa"); return; }

  const scope = qaScopeVal; // doc | kb | free
  if (scope === "doc" && !segments.length) { setStatus("Chưa mở tài liệu — chọn chế độ 'Tự do' để hỏi tự do.", true); return; }
  if (scope === "kb" && (await ragCount()) === 0) { setStatus("Kho tri thức trống — hãy nạp dữ liệu (📚).", true); return; }

  el.qaSuggest.innerHTML = "";
  addBubble("user", question);
  el.qaText.value = "";
  autoGrowQA();
  const answer = addBubble("bot", "");
  answer.classList.add("loading");
  qaBusy = true;
  el.qaSend.disabled = true;
  abortController = new AbortController();

  try {
    let systemContent;
    let retrieved = null;
    if (scope === "kb") {
      // RAG: nhúng câu hỏi -> truy hồi các đoạn liên quan nhất trong kho.
      const embs = await embedTexts({ config: cfg, texts: [question], signal: abortController.signal });
      retrieved = await ragSearch(embs[0], 6);
      const ctx = retrieved
        .map((r, i) => `[${i + 1}] (Nguồn: ${r.source})\n${r.text}`)
        .join("\n\n---\n\n");
      systemContent = (cfg.ragPrompt || "") + "\n\n=== CÁC TRÍCH ĐOẠN LIÊN QUAN ===\n" + ctx;
    } else if (scope === "doc") {
      systemContent = (cfg.qaPrompt || "") + "\n\n=== NỘI DUNG TÀI LIỆU ===\n" + docContext();
    } else {
      // Tự do — chat như trợ lý thông thường, không kèm ngữ cảnh tài liệu.
      systemContent = cfg.chatPrompt || "Bạn là trợ lý AI hữu ích, trả lời bằng tiếng Việt.";
    }

    const messages = [
      { role: "system", content: systemContent },
      ...qaHistory.slice(-6),
      { role: "user", content: question },
    ];
    let acc = "";
    await streamChat({
      config: cfg,
      messages,
      signal: abortController.signal,
      onDelta: (frag) => {
        answer.classList.remove("loading");
        acc += frag;
        answer.innerHTML = renderMarkdown(acc);
        el.qaMessages.scrollTop = el.qaMessages.scrollHeight;
      },
    });
    qaHistory.push({ role: "user", content: question });
    qaHistory.push({ role: "assistant", content: acc });
    if (retrieved && retrieved.length) addCitations(retrieved);
  } catch (err) {
    answer.classList.remove("loading");
    answer.classList.add("error");
    answer.textContent = "⚠️ " + err.message;
  } finally {
    qaBusy = false;
    el.qaSend.disabled = false;
  }
}

function addCitations(retrieved) {
  const uniq = [...new Set(retrieved.map((r) => r.source))];
  const c = document.createElement("div");
  c.className = "citations";
  c.textContent = "📎 Nguồn: " + uniq.join(" · ");
  el.qaMessages.appendChild(c);
  el.qaMessages.scrollTop = el.qaMessages.scrollHeight;
}

function autoGrowQA() {
  el.qaText.style.height = "auto";
  el.qaText.style.height = Math.min(el.qaText.scrollHeight, 120) + "px";
}
el.qaText.addEventListener("input", autoGrowQA);
el.qaText.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendQA(el.qaText.value); }
});
el.qaSend.addEventListener("click", () => sendQA(el.qaText.value));

el.qaClearBtn.addEventListener("click", () => {
  if (qaBusy) { if (abortController) abortController.abort(); }
  if (el.qaMessages.children.length && !confirm("Xóa toàn bộ lịch sử trò chuyện?")) return;
  resetQA();
  renderSuggestions();
});

function resetQA() {
  qaHistory = [];
  qaBusy = false;
  el.qaMessages.innerHTML = "";
  el.qaSuggest.innerHTML = "";
}

// ============================================================
// KHO TRI THỨC (RAG) — nạp dữ liệu, embedding, quản lý nguồn.
// ============================================================
el.kbBtn.addEventListener("click", openKB);
el.kbClose.addEventListener("click", () => el.kbModal.classList.add("hidden"));
el.kbDone.addEventListener("click", () => el.kbModal.classList.add("hidden"));
el.kbModal.addEventListener("click", (e) => { if (e.target === el.kbModal) el.kbModal.classList.add("hidden"); });

function openKB() {
  el.kbModal.classList.remove("hidden");
  setKbStatus("");
  refreshKB();
}

async function refreshKB() {
  const sources = await getRagSources();
  const total = sources.reduce((s, m) => s + m.count, 0);
  el.kbCount.textContent = total;
  const kbScopeBtn = el.qaScope.querySelector('[data-scope="kb"]');
  if (kbScopeBtn) kbScopeBtn.disabled = total === 0;

  el.kbSources.innerHTML = "";
  if (!sources.length) {
    el.kbSources.innerHTML = '<p class="empty">Kho trống. Hãy nạp tài liệu ở trên.</p>';
    return;
  }
  sources.forEach((m) => {
    const row = document.createElement("div");
    row.className = "kb-src";
    const info = document.createElement("div");
    info.className = "kb-src-main";
    info.innerHTML = `<div class="kb-src-name">${escapeHtml(m.name)}</div><div class="kb-src-meta">${m.count} đoạn</div>`;
    const del = document.createElement("button");
    del.className = "vi-del";
    del.textContent = "✕";
    del.title = "Xóa nguồn này";
    del.addEventListener("click", async () => { await ragRemoveSource(m.name); await refreshKB(); });
    row.append(info, del);
    el.kbSources.appendChild(row);
  });
}

function setKbStatus(msg, isError = false) {
  el.kbStatus.textContent = msg;
  el.kbStatus.className = "kb-status" + (isError ? " error" : "");
}
function setKbBusy(b) {
  [el.kbAddCurrent, el.kbAddPaste, el.kbAddUrl, el.kbClear].forEach((x) => (x.disabled = b));
}

// Nạp một danh sách đoạn văn bản vào kho (tạo embedding rồi lưu).
async function ingestToKB(source, texts) {
  texts = (texts || []).filter((t) => t && t.trim().length > 0);
  if (!texts.length) { setKbStatus("Không có nội dung để nạp.", true); return; }
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); setKbStatus("Chưa có API key (mở ⚙️).", true); return; }
  el.kbModal.classList.remove("hidden"); // hiện modal để theo dõi tiến trình

  setKbBusy(true);
  setKbStatus(`Đang tạo embedding cho ${texts.length} đoạn…`);
  try {
    const embeddings = await embedTexts({
      config: cfg,
      texts,
      onProgress: (d, t) => setKbStatus(`Đang tạo embedding ${d}/${t}…`),
    });
    await ragAddChunks(source, texts, embeddings);
    setKbStatus(`✓ Đã nạp "${source}" (${texts.length} đoạn) vào kho.`);
    await refreshKB();
    qaScopeVal = "kb";
    applyQaScope();
  } catch (err) {
    console.error(err);
    setKbStatus("Lỗi nạp: " + err.message, true);
  } finally {
    setKbBusy(false);
  }
}

el.kbAddCurrent.addEventListener("click", () => {
  if (!segments.length) { setKbStatus("Chưa có tài liệu đang mở ở tab Dịch.", true); return; }
  const source = el.docName.textContent || "Tài liệu";
  ingestToKB(source, segments.map((s) => (s.heading ? s.heading + "\n" : "") + s.text));
});
el.kbAddPaste.addEventListener("click", () => {
  pasteTarget = "kb";
  el.kbModal.classList.add("hidden");
  openPaste();
});
el.kbAddUrl.addEventListener("click", async () => {
  const u = prompt("Dán link PDF để nạp vào kho (vd https://arxiv.org/pdf/2312.06647):", "");
  if (!u || !u.trim()) return;
  await ingestPdfUrlToKB(u.trim());
});
el.kbClear.addEventListener("click", async () => {
  if (!confirm("Xóa toàn bộ kho tri thức?")) return;
  await ragClear();
  await refreshKB();
  setKbStatus("Đã xóa toàn bộ kho.");
});

async function ingestPdfUrlToKB(url) {
  setKbBusy(true);
  setKbStatus("Đang tải PDF…");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = await res.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    const { fullText } = await extractReadingOrder(pdf, (n, t) => setKbStatus(`Trích xuất trang ${n}/${t}…`));
    if (!fullText.trim()) throw new Error("Không trích xuất được văn bản (PDF ảnh scan?).");
    let name = "PDF";
    try { name = decodeURIComponent(new URL(url).pathname.split("/").pop()) || "PDF"; } catch {}
    const texts = buildSemanticChunks(fullText).map((c) => (c.heading ? c.heading + "\n" : "") + c.text);
    await ingestToKB(name, texts);
  } catch (err) {
    console.error(err);
    setKbStatus("Lỗi nạp PDF: " + err.message, true);
    setKbBusy(false);
  }
}

// ============================================================
// NGỮ PHÁP — nội dung tĩnh (grammar.js), dựng 1 lần + tìm kiếm.
// ============================================================
let grammarBuilt = false;
function renderGrammar() {
  if (grammarBuilt || typeof GRAMMAR_DATA === "undefined") return;
  grammarBuilt = true;
  el.grammarBody.innerHTML = "";
  GRAMMAR_DATA.forEach((g) => {
    const gh = document.createElement("div");
    gh.className = "gr-group";
    gh.textContent = g.group;
    el.grammarBody.appendChild(gh);
    g.topics.forEach((t) => {
      const d = document.createElement("details");
      d.className = "gr-topic";
      const s = document.createElement("summary");
      s.textContent = t.title;
      const c = document.createElement("div");
      c.className = "gr-content";
      c.innerHTML = t.html;
      d.append(s, c);
      d.dataset.search = (t.title + " " + c.textContent).toLowerCase();
      el.grammarBody.appendChild(d);
    });
  });
}
el.grammarSearch.addEventListener("input", () => {
  const q = el.grammarSearch.value.trim().toLowerCase();
  el.grammarBody.querySelectorAll(".gr-group").forEach((gh) => (gh.style.display = q ? "none" : ""));
  el.grammarBody.querySelectorAll(".gr-topic").forEach((d) => {
    const match = !q || d.dataset.search.includes(q);
    d.style.display = match ? "" : "none";
    d.open = !!q && match;
  });
});

// ============================================================
// SỔ TAY — Ghi chú, Nhật ký (popup + lịch), Việc cần làm.
// ============================================================
function openNotes() { renderNotes(); }
function fmtTime(ts) {
  try { return new Date(ts).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }); }
  catch { return ""; }
}

// ---------- Ghi chú ----------
el.noteAdd.addEventListener("click", async () => {
  const text = el.noteInput.value.trim();
  if (!text) { el.noteInput.focus(); return; }
  await addNote(text, el.noteTitleInput.value);
  el.noteInput.value = "";
  el.noteTitleInput.value = "";
  renderNotes();
});

// Chép vào clipboard. Side panel là secure context nên navigator.clipboard chạy
// được; vẫn giữ đường lui execCommand cho chắc.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch { return false; }
  }
}

async function renderNotes() {
  const list = await getNotes();
  el.notesList.innerHTML = "";
  if (!list.length) { el.notesList.innerHTML = '<p class="empty">Chưa có ghi chú nào.</p>'; return; }
  list.forEach((n) => {
    const card = document.createElement("div");
    card.className = "note-card";

    // Tiêu đề: chưa đặt thì hiện tạm dòng đầu (mờ đi) — sửa là thành tiêu đề thật.
    const t = noteTitle(n);
    const title = document.createElement("div");
    title.className = "note-title" + (t.derived ? " derived" : "");
    title.textContent = t.text;

    const body = document.createElement("div");
    body.className = "note-text";
    body.textContent = n.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";
    meta.innerHTML = `<span>${fmtTime(n.updatedAt)}</span>`;
    const copy = document.createElement("button"); copy.className = "note-act"; copy.textContent = "⧉"; copy.title = "Chép nội dung";
    const edit = document.createElement("button"); edit.className = "note-act"; edit.textContent = "✎"; edit.title = "Sửa";
    const del = document.createElement("button"); del.className = "note-act"; del.textContent = "✕"; del.title = "Xóa";
    meta.append(copy, edit, del);

    copy.addEventListener("click", async () => {
      const ok = await copyText(noteForCopy(n));
      copy.textContent = ok ? "✓" : "✕";
      copy.classList.toggle("done", ok);
      setStatus(ok ? "✓ Đã chép ghi chú." : "Không chép được — thử bôi đen rồi Ctrl+C.");
      setTimeout(() => { copy.textContent = "⧉"; copy.classList.remove("done"); }, 1200);
    });

    edit.addEventListener("click", () => {
      const editing = edit.textContent === "💾";
      if (!editing) {
        // Vào chế độ sửa: mở luôn cả tiêu đề, bỏ phần chữ mờ để gõ tiêu đề thật.
        if (t.derived) title.textContent = "";
        title.dataset.placeholder = "Tiêu đề…";
        [title, body].forEach((n2) => { n2.contentEditable = "true"; n2.classList.add("editing"); });
        title.classList.remove("derived");
        title.focus();
        edit.textContent = "💾";
        return;
      }
      [title, body].forEach((n2) => { n2.contentEditable = "false"; n2.classList.remove("editing"); });
      edit.textContent = "✎";
      updateNote(n.id, body.textContent.trim(), title.textContent.trim()).then(renderNotes);
    });

    del.addEventListener("click", async () => { await deleteNote(n.id); renderNotes(); });
    card.append(title, body, meta);
    el.notesList.appendChild(card);
  });
}

// ============================================================
// NHẬT KÝ — popup có lịch tháng. Bắt buộc viết từ 9h; thiếu ngày trước phải bù.
// ============================================================
const JOURNAL_HOUR = 9;      // giờ bắt đầu bắt buộc
const JOURNAL_BACKFILL = 7;  // chỉ bắt bù tối đa 7 ngày gần nhất
let jrMonthCursor = new Date();
let jrSelected = todayStr();
let jrRequiredDates = [];

function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Các ngày còn thiếu nhật ký mà người dùng buộc phải bù.
async function computeRequiredDates() {
  const list = await getJournal();
  const have = new Set(list.map((j) => j.date));
  // Mốc bắt đầu: lần đầu dùng tính năng -> không bắt bù ngược quá khứ.
  const r = await chrome.storage.local.get("journalStart");
  let start = r.journalStart;
  if (!start) { start = todayStr(); await chrome.storage.local.set({ journalStart: start }); }

  const req = [];
  for (let i = JOURNAL_BACKFILL; i >= 1; i--) {
    const d = dateStr(new Date(Date.now() - i * 86400000));
    if (d >= start && !have.has(d)) req.push(d);
  }
  // Hôm nay chỉ bắt buộc sau 9h.
  const t = todayStr();
  if (new Date().getHours() >= JOURNAL_HOUR && t >= start && !have.has(t)) req.push(t);
  return req;
}

async function openJournalModal(forceDate) {
  jrRequiredDates = await computeRequiredDates();
  jrSelected = forceDate || jrRequiredDates[0] || todayStr();
  jrMonthCursor = new Date(jrSelected + "T00:00:00");
  el.journalModal.classList.remove("hidden");
  await renderJournalCalendar();
  await loadJournalDay(jrSelected);
  updateJournalRequiredUI();
}

// Ở sidebar chỉ NHẮC, không khóa. Việc bắt buộc do trang chặn (gate) đảm nhiệm.
function updateJournalRequiredUI() {
  const missing = jrRequiredDates.length > 0;
  el.jrRequired.classList.toggle("hidden", !missing);
  if (missing) {
    el.jrRequired.textContent =
      `📌 Còn thiếu nhật ký: ${jrRequiredDates.join(", ")}. ` +
      `Bạn có thể viết ngay tại đây; nếu chưa, khi lướt web sau ${JOURNAL_HOUR}h sẽ bị nhắc bắt buộc.`;
  }
  el.jrClose.classList.remove("hidden"); // luôn cho đóng ở sidebar
}

async function renderJournalCalendar() {
  const list = await getJournal();
  const have = new Set(list.map((j) => j.date));
  const y = jrMonthCursor.getFullYear();
  const m = jrMonthCursor.getMonth();
  el.jrMonth.textContent = `Tháng ${m + 1}/${y}`;

  const first = new Date(y, m, 1);
  const startIdx = (first.getDay() + 6) % 7; // đưa về T2 = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = todayStr();
  const r = await chrome.storage.local.get("journalStart");
  const start = r.journalStart || today;

  el.jrGrid.innerHTML = "";
  for (let i = 0; i < startIdx; i++) {
    const blank = document.createElement("div");
    blank.className = "jr-day blank";
    el.jrGrid.appendChild(blank);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const ds = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const cell = document.createElement("button");
    cell.className = "jr-day";
    cell.textContent = day;
    if (ds === today) cell.classList.add("today");
    if (ds === jrSelected) cell.classList.add("selected");
    if (have.has(ds)) cell.classList.add("has");
    else if (ds < today && ds >= start) cell.classList.add("miss");
    if (ds > today) cell.disabled = true; // không viết cho tương lai
    cell.addEventListener("click", async () => {
      jrSelected = ds;
      await renderJournalCalendar();
      await loadJournalDay(ds);
    });
    el.jrGrid.appendChild(cell);
  }
}

async function loadJournalDay(ds) {
  const entry = await getJournalEntry(ds);
  const done = await doneTodosOn(ds);
  // Chưa viết gì mà hôm đó có việc đã xong -> điền sẵn danh sách, khỏi phải nhớ lại.
  const block = doneTodoBlock(done);
  el.journalInput.value = entry ? entry.text : block ? block + "\n\n" : "";
  el.journalFixResult.innerHTML = "";
  const isToday = ds === todayStr();
  el.jrDateLabel.textContent = (isToday ? "Hôm nay · " : "") + ds + (jrRequiredDates.includes(ds) ? " (bắt buộc)" : "");
  renderJournalDone(done);
}

// Việc đã hoàn thành hôm đó, lấy tự động từ danh sách việc cần làm.
function renderJournalDone(done) {
  el.jrDone.classList.toggle("hidden", !done.length);
  el.jrDone.innerHTML = "";
  if (!done.length) return;

  const head = document.createElement("div");
  head.className = "jr-done-head";
  head.textContent = `✅ Đã hoàn thành hôm đó (${done.length})`;
  const list = document.createElement("ul");
  done.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    list.appendChild(li);
  });

  const ins = document.createElement("button");
  ins.className = "btn ghost";
  ins.textContent = "＋ Chèn vào nhật ký";
  ins.addEventListener("click", () => {
    // Chỉ chèn những việc chưa được nhắc tới, tránh lặp khi bấm nhiều lần.
    const cur = el.journalInput.value;
    const missing = done.filter((t) => !cur.includes(t.text));
    if (!missing.length) { setStatus("Các việc này đã có trong nhật ký rồi."); return; }
    el.journalInput.value = (cur.trim() ? cur.trimEnd() + "\n\n" : "") + doneTodoBlock(missing) + "\n";
    el.journalInput.focus();
  });

  el.jrDone.append(head, list, ins);
}

el.openJournal.addEventListener("click", () => openJournalModal());
function closeJournalModal() { el.journalModal.classList.add("hidden"); }
el.jrClose.addEventListener("click", closeJournalModal);
// Bấm ra vùng tối hoặc Esc cũng đóng được.
el.journalModal.addEventListener("click", (e) => { if (e.target === el.journalModal) closeJournalModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!el.journalModal.classList.contains("hidden")) closeJournalModal();
  else if (!el.todoModal.classList.contains("hidden")) el.todoModal.classList.add("hidden");
  else if (!el.statsModal.classList.contains("hidden")) el.statsModal.classList.add("hidden");
});
el.jrPrev.addEventListener("click", async () => {
  jrMonthCursor = new Date(jrMonthCursor.getFullYear(), jrMonthCursor.getMonth() - 1, 1);
  await renderJournalCalendar();
});
el.jrNext.addEventListener("click", async () => {
  jrMonthCursor = new Date(jrMonthCursor.getFullYear(), jrMonthCursor.getMonth() + 1, 1);
  await renderJournalCalendar();
});

el.journalSave.addEventListener("click", async () => {
  const text = el.journalInput.value.trim();
  if (!text) { el.journalInput.focus(); return; }
  await saveJournalEntry(text, jrSelected);
  jrRequiredDates = await computeRequiredDates();
  await renderJournalCalendar();
  await loadJournalDay(jrSelected); // giữ nguyên ngày đang xem
  updateJournalRequiredUI();
  setStatus(
    jrRequiredDates.length
      ? `✓ Đã lưu ${jrSelected}. Còn thiếu ${jrRequiredDates.length} ngày — bấm vào ngày có chấm đỏ để viết bù.`
      : "✓ Đã lưu nhật ký."
  );
});

el.journalDel.addEventListener("click", async () => {
  if (!confirm(`Xóa nhật ký ngày ${jrSelected}?`)) return;
  await deleteJournalEntry(jrSelected);
  jrRequiredDates = await computeRequiredDates();
  await renderJournalCalendar();
  await loadJournalDay(jrSelected);
  updateJournalRequiredUI();
});

el.journalFix.addEventListener("click", async () => {
  const text = el.journalInput.value.trim();
  if (text.length < 5) { el.journalFixResult.innerHTML = '<span class="lr-err">Hãy viết vài câu tiếng Anh trước.</span>'; return; }
  const cfg = await getConfig();
  if (!cfg.apiKey) { el.warn.classList.remove("hidden"); el.journalFixResult.innerHTML = '<span class="lr-err">Cần API key (⚙️).</span>'; return; }
  const gcfg = gradingConfig(cfg);
  el.journalFix.disabled = true;
  el.journalFixResult.innerHTML =
    `<span class="placeholder">Đang sửa bằng <b>${escapeHtml(gcfg.model)}</b>…</span>`;
  el.journalFixResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  try {
    const out = await chatOnce({
      config: gcfg,
      messages: [
        { role: "system", content: "Bạn là giáo viên tiếng Anh. Sửa lỗi ngữ pháp/từ vựng/diễn đạt cho đoạn nhật ký của học viên. Trả về markdown gồm: (1) **Bản đã sửa** (tiếng Anh tự nhiên hơn), (2) **Các lỗi chính** giải thích ngắn bằng tiếng Việt. Giữ nguyên ý người viết, giọng động viên." },
        { role: "user", content: text },
      ],
    });
    if (!out || !out.trim()) throw new Error("Model không trả về nội dung nào.");
    el.journalFixResult.innerHTML = renderMarkdown(out);
  } catch (err) {
    console.error("journalFix:", err);
    el.journalFixResult.innerHTML = '<span class="lr-err">⚠️ ' + aiErrorHint(err, cfg) + "</span>";
  } finally {
    el.journalFix.disabled = false;
    el.journalFixResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// ============================================================
// VIỆC CẦN LÀM — tự hiện mỗi ngày một lần.
// ============================================================
el.openTodo.addEventListener("click", () => openTodoModal());
el.tdClose.addEventListener("click", () => el.todoModal.classList.add("hidden"));
el.todoDone.addEventListener("click", () => el.todoModal.classList.add("hidden"));
el.todoModal.addEventListener("click", (e) => { if (e.target === el.todoModal) el.todoModal.classList.add("hidden"); });

async function openTodoModal() {
  el.todoModal.classList.remove("hidden");
  await renderTodos();
  await markTodoShownToday();
  el.todoInput.focus();
}

el.todoAdd.addEventListener("click", addTodoFromInput);
el.todoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addTodoFromInput(); } });
async function addTodoFromInput() {
  const text = el.todoInput.value.trim();
  if (!text) return;
  await addTodo(text);
  el.todoInput.value = "";
  renderTodos();
}
el.todoClearDone.addEventListener("click", async () => { await clearDoneTodos(); renderTodos(); });

async function renderTodos() {
  const list = await getTodos();
  el.todoList.innerHTML = "";
  if (!list.length) { el.todoList.innerHTML = '<p class="empty">Chưa có việc nào. Thêm việc cho hôm nay nhé!</p>'; return; }
  const today = todayStr();
  list.forEach((t) => {
    const row = document.createElement("div");
    row.className = "td-item" + (t.done ? " done" : "");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!t.done;
    cb.addEventListener("change", async () => { await toggleTodo(t.id); renderTodos(); });
    const txt = document.createElement("span");
    txt.className = "td-text";
    txt.textContent = t.text;
    const tag = document.createElement("span");
    tag.className = "td-tag";
    if (t.date && t.date !== today) tag.textContent = "từ " + t.date; // việc tồn từ hôm trước
    const del = document.createElement("button");
    del.className = "note-act";
    del.textContent = "✕";
    del.addEventListener("click", async () => { await deleteTodo(t.id); renderTodos(); });
    row.append(cb, txt, tag, del);
    el.todoList.appendChild(row);
  });
}

// Khi mở panel: bắt buộc nhật ký (nếu tới giờ / còn nợ), rồi tới việc cần làm.
async function dailyRoutine() {
  const req = await computeRequiredDates();
  if (req.length) { await openJournalModal(); return; }
  if (await shouldShowTodoToday()) await openTodoModal();
}

// ---------- Tiện ích ----------
// Escape cả " và ' — nội dung do model sinh có đi vào giá trị thuộc tính (href).
const ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ESC_MAP[c]);
}

// Render Markdown -> HTML tối giản, an toàn (escape trước, chỉ hỗ trợ các phần
// tử thường gặp: tiêu đề, đậm/nghiêng, code, danh sách, liên kết).
function renderMarkdown(md) {
  const blocks = [];
  md = String(md).replace(/```([\s\S]*?)```/g, (m, c) => {
    blocks.push(c.replace(/^\n/, ""));
    return " CB" + (blocks.length - 1) + " ";
  });
  const inline = (t) => {
    // Trích link RA TRƯỚC khi escapeHtml, không phải sau: escapeHtml đổi " thành
    // chuỗi "&quot;", và ngay sau đó regex link (chỉ chặn ký tự " THÔ) không còn
    // gì để chặn nữa — "&quot;" lọt nguyên vào href="...", rồi trình duyệt GIẢI
    // MÃ HTML entity ngay trong giá trị thuộc tính, tái tạo lại đúng chuỗi thoát
    // ra ngoài href ban đầu. Phải tách link ra placeholder, escape phần TEXT của
    // link riêng, escape phần còn lại của đoạn riêng, rồi mới ráp lại.
    const links = [];
    t = String(t).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)"\'<>]+)\)/g, (m, txt, href) => {
      links.push(`<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(txt)}</a>`);
      return "\u0000L" + (links.length - 1) + "\u0000";
    });
    t = escapeHtml(t); // placeholder chỉ gồm NUL + "L" + số, escapeHtml không đụng tới
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
    t = t.replace(/\u0000L(\d+)\u0000/g, (m, i) => links[+i]);
    return t;
  };
  let html = "";
  let inUl = false, inOl = false;
  const closeLists = () => {
    if (inUl) { html += "</ul>"; inUl = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
  };
  const lines = md.split("\n");
  const cellsOf = (row) =>
    row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => inline(c.trim()));

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/, "");
    const t = line.trim();
    let m;

    // Bảng Markdown: dòng "| a | b |" + dòng ngăn "|---|---|". Model hay trả lộ
    // trình học dưới dạng bảng; không dựng bảng thì hiện ra toàn dấu gạch đứng.
    const sep = (lines[i + 1] || "").trim();
    if (/^\|.*\|$/.test(t) && /^\|[\s:|-]*-[\s:|-]*\|$/.test(sep)) {
      closeLists();
      const head = cellsOf(t);
      let body = "";
      i += 2;
      for (; i < lines.length && /^\|.*\|$/.test(lines[i].trim()); i++) {
        body += "<tr>" + cellsOf(lines[i]).map((c) => `<td>${c}</td>`).join("") + "</tr>";
      }
      i--; // vòng lặp ngoài sẽ tăng lại
      html +=
        '<div class="md-table"><table><thead><tr>' +
        head.map((c) => `<th>${c}</th>`).join("") +
        `</tr></thead><tbody>${body}</tbody></table></div>`;
      continue;
    }
    if (/^ CB\d+ $/.test(t)) {
      closeLists();
      html += "<pre><code>" + escapeHtml(blocks[+t.match(/\d+/)[0]]) + "</code></pre>";
    } else if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      closeLists();
      const lvl = Math.min(m[1].length, 6);
      html += `<h${lvl}>${inline(m[2])}</h${lvl}>`;
    } else if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) {
      if (inOl) { html += "</ol>"; inOl = false; }
      if (!inUl) { html += "<ul>"; inUl = true; }
      html += "<li>" + inline(m[1]) + "</li>";
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      if (inUl) { html += "</ul>"; inUl = false; }
      if (!inOl) { html += "<ol>"; inOl = true; }
      html += "<li>" + inline(m[1]) + "</li>";
    } else if (t === "") {
      closeLists();
    } else {
      closeLists();
      html += "<p>" + inline(line) + "</p>";
    }
  }
  closeLists();
  return html;
}
function reset() {
  translatingAll = false;
  if (abortController) abortController.abort();
  segments = [];
  resetQA();
  el.pages.innerHTML = "";
  el.layoutInfo.classList.add("hidden");
  el.progress.classList.add("hidden");
  el.progressBar.style.width = "0%";
  el.stopBtn.classList.add("hidden");
  el.translateAllBtn.disabled = false;
}
function setStatus(msg, isError = false) {
  el.status.textContent = msg;
  el.status.className = "statusbar" + (isError ? " error" : "");
}

checkApiKey();
refreshVocabCount();
refreshKB();
// (Việc dọn cache do service worker chạy 1 lần/ngày — không gọi lại ở đây,
// mỗi lượt gọi là một lần đọc toàn bộ chrome.storage.)
// Lưu ý: việc BẮT BUỘC (to-do, học, nhật ký) được cưỡng chế ở TRANG WEB
// qua gate.html, không popup trong sidebar nữa.
