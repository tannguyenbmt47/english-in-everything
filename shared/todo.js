// ============================================================
// todo.js — Danh sách việc cần làm. Hiện tự động mỗi ngày một lần.
// (todayStr() dùng chung từ vocab.js)
// ============================================================

const TODO_KEY = "todos";
const TODO_SHOWN_KEY = "todoShownDate";

async function getTodos() {
  const r = await chrome.storage.local.get(TODO_KEY);
  return r[TODO_KEY] || [];
}
async function saveTodos(list) {
  await chrome.storage.local.set({ [TODO_KEY]: list });
}

// ============================================================
// Khoá ghi TUẦN TỰ — cùng loại bug (và cùng cách sửa) đã áp dụng cho kho từ
// vựng ở vocab.js (xem chú thích ở đó): mọi hàm dưới đây đều đọc TOÀN BỘ danh
// sách, sửa trong bộ nhớ rồi ghi đè lại. Xếp qua MỘT hàng đợi để hai lượt ghi
// xen kẽ (vd tick xong một việc trong lúc đang gõ thêm việc khác) không còn
// ghi đè mất nhau.
// ============================================================
let todoWriteQueue = Promise.resolve();
function withTodoLock(fn) {
  const run = todoWriteQueue.then(fn, fn);
  todoWriteQueue = run.then(() => {}, () => {});
  return run;
}

// Chuẩn hoá để SO TRÙNG: bỏ khoảng trắng thừa, hạ chữ thường, bỏ dấu câu cuối
// câu. "Sửa bài phần eDA" và "sửa bài phần eDA." phải được coi là MỘT việc.
function normTodoText(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.!?…]+$/, "");
}

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
const PRIORITY_ICON = { high: "🔴", medium: "🟡", low: "⚪" };
const PRIORITY_LABEL = { high: "Ưu tiên cao", medium: "Ưu tiên vừa", low: "Ưu tiên thấp" };

function todoPriority(t) {
  return PRIORITY_ORDER.hasOwnProperty(t?.priority) ? t.priority : "medium";
}
function todoStatus(t) {
  return t?.status === "doing" ? "doing" : "todo";
}

// Thêm việc mới — BUG ĐÃ SỬA: trước đây luôn tạo dòng mới, nên một việc CHƯA
// XONG bị gõ lại (vd để "mở khoá" màn chặn buổi sáng — xem hasUndoneTodo trong
// gate.js) sinh ra một dòng TRÙNG thay vì được nhận diện là việc cũ. Giờ tìm
// việc chưa xong có cùng normTodoText trước, có thì không tạo thêm.
function addTodo(text, priority) {
  return withTodoLock(() => addTodoLocked(text, priority));
}
async function addTodoLocked(text, priority) {
  const list = await getTodos();
  const key = normTodoText(text);
  const existing = key && list.find((t) => !t.done && normTodoText(t.text) === key);
  if (existing) return { list, duplicate: true, id: existing.id };

  const item = {
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    text,
    done: false,
    createdAt: Date.now(),
    date: todayStr(),
    priority: PRIORITY_ORDER.hasOwnProperty(priority) ? priority : "medium",
    status: "todo",
    due: "",
    label: "",
    desc: "",
  };
  list.unshift(item);
  await saveTodos(list);
  return { list, duplicate: false, id: item.id };
}

function toggleTodo(id) {
  return withTodoLock(() => toggleTodoLocked(id));
}
async function toggleTodoLocked(id) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) {
    t.done = !t.done;
    t.doneAt = t.done ? Date.now() : 0;
  }
  await saveTodos(list);
  return list;
}

function deleteTodo(id) {
  return withTodoLock(() => deleteTodoLocked(id));
}
async function deleteTodoLocked(id) {
  const list = (await getTodos()).filter((x) => x.id !== id);
  await saveTodos(list);
  return list;
}

function clearDoneTodos() {
  return withTodoLock(() => clearDoneTodosLocked());
}
async function clearDoneTodosLocked() {
  const list = (await getTodos()).filter((x) => !x.done);
  await saveTodos(list);
  return list;
}

function setTodoPriority(id, priority) {
  return withTodoLock(() => setTodoPriorityLocked(id, priority));
}
async function setTodoPriorityLocked(id, priority) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t && PRIORITY_ORDER.hasOwnProperty(priority)) t.priority = priority;
  await saveTodos(list);
  return list;
}

function setTodoDue(id, due) {
  return withTodoLock(() => setTodoDueLocked(id, due));
}
async function setTodoDueLocked(id, due) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) t.due = /^\d{4}-\d{2}-\d{2}$/.test(due || "") ? due : "";
  await saveTodos(list);
  return list;
}

function setTodoStatus(id, status) {
  return withTodoLock(() => setTodoStatusLocked(id, status));
}
async function setTodoStatusLocked(id, status) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) t.status = status === "doing" ? "doing" : "todo";
  await saveTodos(list);
  return list;
}

// Đổi cả text lẫn tiêu đề trong một lượt ghi (dùng cho popup chi tiết).
function setTodoText(id, text) {
  return withTodoLock(() => setTodoTextLocked(id, text));
}
async function setTodoTextLocked(id, text) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  const next = String(text || "").trim();
  if (t && next) t.text = next;
  await saveTodos(list);
  return list;
}

function setTodoDesc(id, desc) {
  return withTodoLock(() => setTodoDescLocked(id, desc));
}
async function setTodoDescLocked(id, desc) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) t.desc = String(desc || "").slice(0, 4000);
  await saveTodos(list);
  return list;
}

function setTodoLabel(id, label) {
  return withTodoLock(() => setTodoLabelLocked(id, label));
}
async function setTodoLabelLocked(id, label) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) t.label = String(label || "").trim().slice(0, 30);
  await saveTodos(list);
  return list;
}

// Màu nhãn SUY RA từ chính chữ cái của nhãn (không cần lưu riêng màu) — cùng
// một nhãn ("eDA") luôn ra cùng một màu, kể cả gõ ở nhiều việc khác nhau.
const LABEL_COLORS = ["#2563eb", "#dc2626", "#059669", "#d97706", "#7c3aed", "#db2777", "#0891b2", "#65a30d"];
function todoLabelColor(label) {
  const s = String(label || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return LABEL_COLORS[h % LABEL_COLORS.length];
}

// Mọi nhãn đã dùng qua (để gợi ý tự động hoàn thành trong ô nhập nhãn).
function allTodoLabels(list) {
  return [...new Set(list.map((t) => t.label).filter(Boolean))].sort();
}

// Sắp theo: ưu tiên (cao trước) -> hạn chót (sớm trước, không có hạn xếp cuối)
// -> ngày tạo (cũ trước, để việc tồn lâu nhất luôn nổi lên đầu nhóm).
function sortTodos(list) {
  return [...list].sort((a, b) => {
    const p = PRIORITY_ORDER[todoPriority(a)] - PRIORITY_ORDER[todoPriority(b)];
    if (p) return p;
    const da = a.due || "9999-99-99", db = b.due || "9999-99-99";
    if (da !== db) return da < db ? -1 : 1;
    return (a.createdAt || 0) - (b.createdAt || 0);
  });
}

// Nhóm theo trạng thái — "kanban mini": Đang làm / Cần làm / Đã xong. Mỗi
// nhóm đã sắp sẵn; riêng "done" sắp theo lúc hoàn thành gần nhất lên đầu.
function groupTodosByStatus(list) {
  const undone = list.filter((t) => !t.done);
  const done = list.filter((t) => t.done).sort((a, b) => (b.doneAt || 0) - (a.doneAt || 0));
  return {
    doing: sortTodos(undone.filter((t) => todoStatus(t) === "doing")),
    todo: sortTodos(undone.filter((t) => todoStatus(t) === "todo")),
    done,
  };
}

// Nhãn hạn chót/tuổi hiển thị kèm mỗi việc. Có đặt hạn (due) thì ưu tiên hiện
// hạn (đỏ nếu trễ, cam nếu đúng hôm nay); chưa đặt hạn thì hiện tạm tuổi việc
// (đã tồn từ ngày nào) như hành vi cũ, để vẫn thấy việc nào đang bị bỏ quên.
function todoDueBadge(t, today) {
  const now = today || todayStr();
  if (t.due) {
    const text = "Hạn: " + t.due;
    if (t.done) return { text, cls: "done" };
    if (t.due < now) return { text, cls: "overdue" };
    if (t.due === now) return { text, cls: "today" };
    return { text, cls: "future" };
  }
  if (t.date && t.date !== now) return { text: "từ " + t.date, cls: "age" };
  return { text: "", cls: "" };
}

// ---------- Nối sang nhật ký ----------
// Ngày HOÀN THÀNH của một việc: tính theo lúc tick xong, không phải lúc tạo —
// việc tạo hôm qua mà nay mới xong thì phải nằm ở nhật ký hôm nay.
function todoDoneDate(t) {
  if (!t || !t.done) return "";
  if (!t.doneAt) return t.date || "";
  const d = new Date(t.doneAt);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function doneTodosOn(date) {
  const d = date || todayStr();
  return (await getTodos()).filter((t) => todoDoneDate(t) === d);
}

// Khối chữ để chèn thẳng vào nhật ký.
function doneTodoBlock(items) {
  if (!items.length) return "";
  return "Đã hoàn thành:\n" + items.map((t) => `- ${t.text}`).join("\n");
}

// Mỗi ngày chỉ tự bật một lần.
async function shouldShowTodoToday() {
  const r = await chrome.storage.local.get(TODO_SHOWN_KEY);
  return r[TODO_SHOWN_KEY] !== todayStr();
}
async function markTodoShownToday() {
  await chrome.storage.local.set({ [TODO_SHOWN_KEY]: todayStr() });
}
