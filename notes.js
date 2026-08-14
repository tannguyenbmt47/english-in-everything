// ============================================================
// notes.js — Lưu trữ GHI CHÚ và NHẬT KÝ (chrome.storage.local).
// (todayStr() dùng chung từ vocab.js — các script chia sẻ scope toàn cục.)
// ============================================================

const NOTES_KEY = "notes";
const JOURNAL_KEY = "journal";

// ---------- Ghi chú ----------
async function getNotes() {
  const r = await chrome.storage.local.get(NOTES_KEY);
  return r[NOTES_KEY] || [];
}
async function saveNotesList(list) {
  await chrome.storage.local.set({ [NOTES_KEY]: list });
}
async function addNote(text, title) {
  const list = await getNotes();
  list.unshift({
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    title: String(title || "").trim(),
    text,
    updatedAt: Date.now(),
  });
  await saveNotesList(list);
  return list;
}
async function updateNote(id, text, title) {
  const list = await getNotes();
  const n = list.find((x) => x.id === id);
  if (n) {
    n.text = text;
    if (title !== undefined) n.title = String(title).trim();
    n.updatedAt = Date.now();
  }
  await saveNotesList(list);
  return list;
}

// Tiêu đề để hiển thị. Ghi chú cũ (và ghi chú dán vội) không có tiêu đề -> lấy
// tạm dòng đầu, để danh sách vẫn lướt mắt tìm được thay vì toàn khối chữ giống nhau.
function noteTitle(n) {
  if (n.title) return { text: n.title, derived: false };
  const first = String(n.text || "").split("\n").find((l) => l.trim()) || "";
  const t = first.trim();
  return { text: t.length > 60 ? t.slice(0, 60).trimEnd() + "…" : t, derived: true };
}

// Nội dung đem đi dán chỗ khác: có tiêu đề thì kèm theo cho đủ ngữ cảnh.
function noteForCopy(n) {
  return n.title ? `${n.title}\n\n${n.text}` : String(n.text || "");
}
async function deleteNote(id) {
  const list = (await getNotes()).filter((x) => x.id !== id);
  await saveNotesList(list);
  return list;
}

// ---------- Nhật ký (theo ngày) ----------
async function getJournal() {
  const r = await chrome.storage.local.get(JOURNAL_KEY);
  return r[JOURNAL_KEY] || [];
}
async function saveJournalList(list) {
  await chrome.storage.local.set({ [JOURNAL_KEY]: list });
}
// Lưu/ghi đè mục nhật ký của MỘT ngày (mặc định hôm nay).
async function saveJournalEntry(text, date) {
  const d = date || todayStr();
  const list = await getJournal();
  const existing = list.find((x) => x.date === d);
  if (existing) existing.text = text;
  else list.unshift({ date: d, text, createdAt: Date.now() });
  list.sort((a, b) => (a.date < b.date ? 1 : -1)); // mới nhất trước
  await saveJournalList(list);
  return list;
}
async function getJournalEntry(date) {
  const d = date || todayStr();
  return (await getJournal()).find((x) => x.date === d) || null;
}
async function deleteJournalEntry(date) {
  const list = (await getJournal()).filter((x) => x.date !== date);
  await saveJournalList(list);
  return list;
}
