// ============================================================
// todo-board.js — trang riêng cho "Việc cần làm" (kanban mini: Cần làm/Đang
// làm/Đã xong). Trước đây là một modal trong side panel nhưng panel quá hẹp
// để hiện 3 cột thoải mái; giờ là một tab đầy đủ, rộng bao nhiêu tuỳ cửa sổ.
// (todayStr()/ymd() dùng chung từ vocab.js — nạp trước file này.)
// ============================================================

const el = {
  todoPriorityPick: document.getElementById("todoPriorityPick"),
  todoInput: document.getElementById("todoInput"),
  todoAdd: document.getElementById("todoAdd"),
  todoList: document.getElementById("todoList"),
  todoClearDone: document.getElementById("todoClearDone"),
  todoDetailModal: document.getElementById("todoDetailModal"),
  tdDetailClose: document.getElementById("tdDetailClose"),
  tdDetailText: document.getElementById("tdDetailText"),
  tdDetailLabel: document.getElementById("tdDetailLabel"),
  tdLabelList: document.getElementById("tdLabelList"),
  tdDetailPriority: document.getElementById("tdDetailPriority"),
  tdDetailStatus: document.getElementById("tdDetailStatus"),
  tdDetailDue: document.getElementById("tdDetailDue"),
  tdDetailDueClear: document.getElementById("tdDetailDueClear"),
  tdDetailDesc: document.getElementById("tdDetailDesc"),
  tdDetailMeta: document.getElementById("tdDetailMeta"),
  tdDetailDelete: document.getElementById("tdDetailDelete"),
  tdDetailDoneBtn: document.getElementById("tdDetailDoneBtn"),
};

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function fmtTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// ---------- Thêm việc ----------
let composePriority = "medium";
el.todoPriorityPick.querySelectorAll(".td-pri-opt").forEach((btn) => {
  btn.addEventListener("click", () => {
    composePriority = btn.dataset.pri;
    el.todoPriorityPick.querySelectorAll(".td-pri-opt").forEach((b) => b.classList.toggle("active", b === btn));
  });
});

el.todoAdd.addEventListener("click", addTodoFromInput);
el.todoInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addTodoFromInput(); } });
async function addTodoFromInput() {
  const text = el.todoInput.value.trim();
  if (!text) return;
  const { duplicate, id } = await addTodo(text, composePriority);
  el.todoInput.value = "";
  await renderTodos();
  if (duplicate) flashTodoCard(id);
  el.todoInput.focus();
}
el.todoClearDone.addEventListener("click", async () => { await clearDoneTodos(); renderTodos(); });

function flashTodoCard(id) {
  const card = el.todoList.querySelector(`[data-id="${id}"]`);
  if (!card) return;
  card.scrollIntoView({ block: "nearest", inline: "nearest" });
  card.classList.add("td-flash");
  setTimeout(() => card.classList.remove("td-flash"), 900);
}

// ---------- Bảng kanban ----------
const TODO_COLUMNS = [
  { key: "todo", title: "📋 Cần làm" },
  { key: "doing", title: "🔥 Đang làm" },
  { key: "done", title: "✅ Đã xong" },
];

async function moveTodoToColumn(id, colKey, wasDone) {
  if (colKey === "done") {
    if (!wasDone) await toggleTodo(id);
  } else {
    if (wasDone) await toggleTodo(id);
    await setTodoStatus(id, colKey);
  }
  renderTodos();
}

function buildTodoCard(t) {
  const card = document.createElement("div");
  card.className = "td-task" + (t.done ? " done" : "") + " pri-" + todoPriority(t);
  card.dataset.id = t.id;
  card.draggable = true;
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", t.id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => card.classList.add("dragging"), 0);
  });
  card.addEventListener("dragend", () => card.classList.remove("dragging"));
  card.addEventListener("click", (e) => {
    if (e.target.closest("input, button")) return;
    openTodoDetail(t.id);
  });

  const top = document.createElement("div");
  top.className = "td-task-top";
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = !!t.done;
  cb.addEventListener("change", async () => { await toggleTodo(t.id); renderTodos(); });
  const flag = document.createElement("button");
  flag.type = "button";
  flag.className = "td-flag";
  flag.title = PRIORITY_LABEL[todoPriority(t)] + " — bấm để đổi";
  flag.textContent = PRIORITY_ICON[todoPriority(t)];
  flag.addEventListener("click", async (e) => {
    e.stopPropagation();
    const order = ["high", "medium", "low"];
    const next = order[(order.indexOf(todoPriority(t)) + 1) % order.length];
    await setTodoPriority(t.id, next);
    renderTodos();
  });
  const del = document.createElement("button");
  del.className = "td-task-del";
  del.textContent = "✕";
  del.addEventListener("click", async (e) => { e.stopPropagation(); await deleteTodo(t.id); renderTodos(); });
  top.append(cb, flag, del);

  if (t.label) {
    const lbl = document.createElement("span");
    lbl.className = "td-label-pill";
    lbl.textContent = t.label;
    lbl.style.setProperty("--pill-color", todoLabelColor(t.label));
    card.append(top, lbl);
  } else {
    card.append(top);
  }

  const txt = document.createElement("div");
  txt.className = "td-text";
  txt.textContent = t.text;

  const due = document.createElement("button");
  due.type = "button";
  due.className = "td-due";
  const badge = todoDueBadge(t);
  due.textContent = badge.text || "+ hạn";
  if (!badge.text) due.classList.add("empty");
  if (badge.cls) due.classList.add("due-" + badge.cls);
  due.title = "Đặt/đổi hạn chót";
  due.addEventListener("click", (e) => { e.stopPropagation(); openDuePicker(due, t); });

  card.append(txt, due);
  return card;
}

function openDuePicker(anchor, t) {
  const input = document.createElement("input");
  input.type = "date";
  input.className = "td-due-input";
  input.value = t.due || "";
  let saved = false;
  const close = async (save) => {
    if (save && !saved) { saved = true; await setTodoDue(t.id, input.value); }
    renderTodos();
  };
  input.addEventListener("change", () => close(true));
  input.addEventListener("blur", () => close(true));
  input.addEventListener("keydown", (e) => { if (e.key === "Escape") close(false); });
  anchor.replaceWith(input);
  input.focus();
  input.showPicker?.();
}

function buildTodoColumn(col, items) {
  const wrap = document.createElement("div");
  wrap.className = "td-col";
  wrap.dataset.col = col.key;

  const head = document.createElement("div");
  head.className = "td-col-head";
  head.textContent = `${col.title} (${items.length})`;
  wrap.append(head);

  const body = document.createElement("div");
  body.className = "td-col-body";
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "td-col-empty";
    empty.textContent = "— thả việc vào đây —";
    body.append(empty);
  } else {
    items.forEach((t) => body.append(buildTodoCard(t)));
  }
  wrap.append(body);

  wrap.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; wrap.classList.add("drag-over"); });
  wrap.addEventListener("dragleave", (e) => { if (!wrap.contains(e.relatedTarget)) wrap.classList.remove("drag-over"); });
  wrap.addEventListener("drop", async (e) => {
    e.preventDefault();
    wrap.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    const list = await getTodos();
    const t = list.find((x) => x.id === id);
    if (!t) return;
    const currentCol = t.done ? "done" : todoStatus(t);
    if (currentCol === col.key) return;
    await moveTodoToColumn(id, col.key, t.done);
  });

  return wrap;
}

async function renderTodos() {
  const list = await getTodos();
  el.todoList.innerHTML = "";
  if (!list.length) { el.todoList.innerHTML = '<p class="empty">Chưa có việc nào. Thêm việc cho hôm nay nhé!</p>'; return; }
  const { doing, todo, done } = groupTodosByStatus(list);
  const byKey = { todo, doing, done };
  const board = document.createElement("div");
  board.className = "td-board";
  TODO_COLUMNS.forEach((col) => board.append(buildTodoColumn(col, byKey[col.key])));
  el.todoList.append(board);
}

// ---------- Popup chi tiết một việc ----------
let detailTodoId = null;

async function openTodoDetail(id) {
  const list = await getTodos();
  const t = list.find((x) => x.id === id);
  if (!t) return;
  detailTodoId = id;

  el.tdDetailText.value = t.text;
  el.tdDetailLabel.value = t.label || "";
  el.tdLabelList.innerHTML = allTodoLabels(list).map((l) => `<option value="${escapeHtml(l)}">`).join("");
  el.tdDetailPriority.querySelectorAll(".td-pri-opt").forEach((b) => b.classList.toggle("active", b.dataset.pri === todoPriority(t)));
  const col = t.done ? "done" : todoStatus(t);
  el.tdDetailStatus.querySelectorAll(".td-status-opt").forEach((b) => b.classList.toggle("active", b.dataset.status === col));
  el.tdDetailDue.value = t.due || "";
  el.tdDetailDesc.value = t.desc || "";

  const meta = [`Tạo lúc: ${fmtTime(t.createdAt)}`];
  if (t.done && t.doneAt) meta.push(`Hoàn thành lúc: ${fmtTime(t.doneAt)}`);
  el.tdDetailMeta.textContent = meta.join(" · ");

  el.todoDetailModal.classList.remove("hidden");
}

function closeTodoDetail() {
  el.todoDetailModal.classList.add("hidden");
  detailTodoId = null;
  renderTodos();
}

el.tdDetailClose.addEventListener("click", closeTodoDetail);
el.tdDetailDoneBtn.addEventListener("click", closeTodoDetail);
el.todoDetailModal.addEventListener("click", (e) => { if (e.target === el.todoDetailModal) closeTodoDetail(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !el.todoDetailModal.classList.contains("hidden")) closeTodoDetail();
});

el.tdDetailText.addEventListener("blur", async () => {
  if (!detailTodoId || !el.tdDetailText.value.trim()) return;
  await setTodoText(detailTodoId, el.tdDetailText.value.trim());
});
el.tdDetailLabel.addEventListener("blur", async () => {
  if (!detailTodoId) return;
  await setTodoLabel(detailTodoId, el.tdDetailLabel.value);
});
el.tdDetailDesc.addEventListener("blur", async () => {
  if (!detailTodoId) return;
  await setTodoDesc(detailTodoId, el.tdDetailDesc.value);
});
el.tdDetailDue.addEventListener("change", async () => {
  if (!detailTodoId) return;
  await setTodoDue(detailTodoId, el.tdDetailDue.value);
});
el.tdDetailDueClear.addEventListener("click", async () => {
  if (!detailTodoId) return;
  el.tdDetailDue.value = "";
  await setTodoDue(detailTodoId, "");
});
el.tdDetailPriority.querySelectorAll(".td-pri-opt").forEach((btn) => {
  btn.addEventListener("click", async () => {
    if (!detailTodoId) return;
    await setTodoPriority(detailTodoId, btn.dataset.pri);
    el.tdDetailPriority.querySelectorAll(".td-pri-opt").forEach((b) => b.classList.toggle("active", b === btn));
  });
});
el.tdDetailStatus.querySelectorAll(".td-status-opt").forEach((btn) => {
  btn.addEventListener("click", async () => {
    if (!detailTodoId) return;
    const list = await getTodos();
    const t = list.find((x) => x.id === detailTodoId);
    if (!t) return;
    await moveTodoToColumn(detailTodoId, btn.dataset.status, t.done);
    el.tdDetailStatus.querySelectorAll(".td-status-opt").forEach((b) => b.classList.toggle("active", b === btn));
  });
});
el.tdDetailDelete.addEventListener("click", async () => {
  if (!detailTodoId) return;
  await deleteTodo(detailTodoId);
  detailTodoId = null;
  el.todoDetailModal.classList.add("hidden");
  renderTodos();
});

renderTodos();
markTodoShownToday();
