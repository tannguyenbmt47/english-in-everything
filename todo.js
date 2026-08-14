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
async function addTodo(text) {
  const list = await getTodos();
  list.unshift({
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    text,
    done: false,
    createdAt: Date.now(),
    date: todayStr(),
  });
  await saveTodos(list);
  return list;
}
async function toggleTodo(id) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (t) {
    t.done = !t.done;
    t.doneAt = t.done ? Date.now() : 0;
  }
  await saveTodos(list);
  return list;
}
async function deleteTodo(id) {
  const list = (await getTodos()).filter((x) => x.id !== id);
  await saveTodos(list);
  return list;
}
async function clearDoneTodos() {
  const list = (await getTodos()).filter((x) => !x.done);
  await saveTodos(list);
  return list;
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
