// ============================================================
// todo.test.js — todo.js: gộp việc trùng lặp, ưu tiên/hạn chót, sắp xếp/gom
// nhóm theo trạng thái ("kanban mini"), và khoá ghi tuần tự.
//
// BUG THẬT đã sửa: addTodo() từng luôn tạo dòng mới, kết hợp với gate.js bắt
// buộc phải có việc TẠO ĐÚNG HÔM NAY mới cho qua màn chặn buổi sáng, khiến
// người dùng buộc phải gõ lại y hệt việc cũ CHƯA XONG mỗi sáng — sinh ra các
// dòng trùng lặp thấy trong ảnh chụp màn hình thực tế. Các test dưới đây xác
// nhận việc gộp trùng, và test hasUndoneTodo() ở gate-helpers.test.js xác nhận
// nửa còn lại của bug (điều kiện chặn sai) đã được sửa.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const FILES = ["shared/vocab.js", "shared/todo.js"];

describe("normTodoText — chuẩn hoá để so trùng", () => {
  test("khác hoa/thường, khoảng trắng thừa, dấu câu cuối câu -> vẫn cùng khoá", () => {
    const ctx = loadFiles(FILES);
    assert.equal(ctx.normTodoText("Sửa bài phần eDA"), ctx.normTodoText("sửa bài  phần eDA."));
    assert.equal(ctx.normTodoText("  Test web  "), ctx.normTodoText("test web"));
  });
  test("nội dung khác nhau thật sự -> khoá khác nhau", () => {
    const ctx = loadFiles(FILES);
    assert.notEqual(ctx.normTodoText("sửa bài phần eDA"), ctx.normTodoText("sửa bài phần backend"));
  });
});

describe("addTodo — BUG ĐÃ SỬA: việc CHƯA XONG bị gõ lại không còn tạo dòng trùng", () => {
  test("thêm việc trùng (khác hoa/thường) khi việc cũ CHƯA xong -> không tạo dòng mới, trả về duplicate:true", async () => {
    const ctx = loadFiles(FILES);
    const first = await ctx.addTodo("sửa bài phần eDA");
    assert.equal(first.duplicate, false);
    const second = await ctx.addTodo("Sửa bài phần eDA");
    assert.equal(second.duplicate, true);
    assert.equal(second.id, first.id);
    const list = await ctx.getTodos();
    assert.equal(list.filter((t) => t.id === first.id).length, 1);
    assert.equal(list.length, 1, "không được có dòng trùng thứ hai trong kho");
  });

  test("việc CŨ đã xong -> gõ lại tạo việc MỚI bình thường (không coi là trùng)", async () => {
    const ctx = loadFiles(FILES);
    const first = await ctx.addTodo("việc lặp lại hằng tuần");
    await ctx.toggleTodo(first.id); // đánh dấu xong
    const second = await ctx.addTodo("việc lặp lại hằng tuần");
    assert.equal(second.duplicate, false);
    assert.notEqual(second.id, first.id);
    const list = await ctx.getTodos();
    assert.equal(list.length, 2);
  });

  test("addTodo nhận priority truyền vào, mặc định 'medium' khi không truyền/không hợp lệ", async () => {
    const ctx = loadFiles(FILES);
    const a = await ctx.addTodo("việc gấp", "high");
    const b = await ctx.addTodo("việc khác");
    const c = await ctx.addTodo("việc nữa", "not-a-real-priority");
    const list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === a.id).priority, "high");
    assert.equal(list.find((t) => t.id === b.id).priority, "medium");
    assert.equal(list.find((t) => t.id === c.id).priority, "medium");
  });
});

describe("setTodoPriority / setTodoDue / setTodoStatus", () => {
  test("setTodoPriority chỉ nhận giá trị hợp lệ, bỏ qua giá trị rác", async () => {
    const ctx = loadFiles(FILES);
    const { id } = await ctx.addTodo("việc test");
    await ctx.setTodoPriority(id, "low");
    let list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).priority, "low");
    await ctx.setTodoPriority(id, "urgent-ish"); // không hợp lệ -> giữ nguyên
    list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).priority, "low");
  });

  test("setTodoDue chỉ nhận đúng định dạng YYYY-MM-DD, chuỗi rỗng để xoá hạn", async () => {
    const ctx = loadFiles(FILES);
    const { id } = await ctx.addTodo("việc có hạn");
    await ctx.setTodoDue(id, "2026-09-10");
    let list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).due, "2026-09-10");
    await ctx.setTodoDue(id, "không phải ngày");
    list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).due, "", "giá trị rác phải bị bỏ, không lưu lại ngày cũ hỏng dạng");
    await ctx.setTodoDue(id, "2026-09-10");
    await ctx.setTodoDue(id, "");
    list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).due, "", "chuỗi rỗng phải xoá được hạn đã đặt");
  });

  test("setTodoStatus chỉ có 'todo'/'doing', giá trị khác coi như 'todo'", async () => {
    const ctx = loadFiles(FILES);
    const { id } = await ctx.addTodo("việc test");
    await ctx.setTodoStatus(id, "doing");
    let list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).status, "doing");
    await ctx.setTodoStatus(id, "blocked");
    list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).status, "todo");
  });
});

describe("setTodoText / setTodoDesc / setTodoLabel — popup chi tiết (mở thẻ)", () => {
  test("setTodoText đổi tên việc, bỏ qua chuỗi rỗng (không được xoá trắng tên việc)", async () => {
    const ctx = loadFiles(FILES);
    const { id } = await ctx.addTodo("tên cũ");
    await ctx.setTodoText(id, "  tên mới  ");
    let list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).text, "tên mới");
    await ctx.setTodoText(id, "   ");
    list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === id).text, "tên mới", "chuỗi rỗng/toàn khoảng trắng không được xoá tên việc");
  });

  test("setTodoDesc lưu mô tả dài, setTodoLabel lưu nhãn đã trim", async () => {
    const ctx = loadFiles(FILES);
    const { id } = await ctx.addTodo("việc test");
    await ctx.setTodoDesc(id, "Ghi chú chi tiết\ndòng 2");
    await ctx.setTodoLabel(id, "  eDA  ");
    const list = await ctx.getTodos();
    const t = list.find((x) => x.id === id);
    assert.equal(t.desc, "Ghi chú chi tiết\ndòng 2");
    assert.equal(t.label, "eDA");
  });
});

describe("todoLabelColor / allTodoLabels", () => {
  test("cùng một nhãn luôn ra cùng một màu", () => {
    const ctx = loadFiles(FILES);
    assert.equal(ctx.todoLabelColor("eDA"), ctx.todoLabelColor("eDA"));
  });
  test("nhãn khác nhau CÓ THỂ ra màu khác nhau (không phải luôn cùng 1 màu)", () => {
    const ctx = loadFiles(FILES);
    const colors = new Set(["eDA", "Robot", "Conquer", "Backend", "Marketing"].map((l) => ctx.todoLabelColor(l)));
    assert.ok(colors.size > 1, "các nhãn khác nhau lại ra đúng 1 màu duy nhất — hàm băm có vấn đề");
  });
  test("allTodoLabels gom đúng các nhãn đã dùng, bỏ trùng và bỏ rỗng", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { label: "eDA" }, { label: "Robot" }, { label: "eDA" }, { label: "" }, { label: undefined },
    ];
    assert.deepEqual(Array.from(ctx.allTodoLabels(list)), ["Robot", "eDA"]);
  });
});

describe("sortTodos — ưu tiên -> hạn chót (sớm trước, không hạn xếp cuối) -> ngày tạo (cũ trước)", () => {
  test("sắp đúng theo mức ưu tiên trước tiên", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { id: "a", priority: "low", createdAt: 1 },
      { id: "b", priority: "high", createdAt: 2 },
      { id: "c", priority: "medium", createdAt: 3 },
    ];
    const sorted = Array.from(ctx.sortTodos(list), (t) => t.id);
    assert.deepEqual(sorted, ["b", "c", "a"]);
  });
  test("cùng ưu tiên -> hạn chót sớm hơn lên trước, không có hạn xếp cuối cùng", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { id: "no-due", priority: "medium", createdAt: 1, due: "" },
      { id: "later", priority: "medium", createdAt: 2, due: "2026-09-20" },
      { id: "sooner", priority: "medium", createdAt: 3, due: "2026-09-10" },
    ];
    const sorted = Array.from(ctx.sortTodos(list), (t) => t.id);
    assert.deepEqual(sorted, ["sooner", "later", "no-due"]);
  });
  test("cùng ưu tiên & cùng không có hạn -> việc tạo lâu hơn (cũ hơn) lên trước", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { id: "newer", priority: "medium", createdAt: 200 },
      { id: "older", priority: "medium", createdAt: 100 },
    ];
    assert.deepEqual(Array.from(ctx.sortTodos(list), (t) => t.id), ["older", "newer"]);
  });
});

describe("groupTodosByStatus — nhóm 'kanban mini': Đang làm / Cần làm / Đã xong", () => {
  test("việc đã xong không rơi vào 'doing' hay 'todo' dù status là gì", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { id: "a", done: true, status: "doing", doneAt: 100 },
      { id: "b", done: false, status: "doing" },
      { id: "c", done: false, status: "todo" },
      { id: "d", done: false }, // thiếu status -> mặc định "todo"
    ];
    const g = ctx.groupTodosByStatus(list);
    assert.deepEqual(Array.from(g.doing, (t) => t.id), ["b"]);
    assert.deepEqual(Array.from(g.todo, (t) => t.id).sort(), ["c", "d"]);
    assert.deepEqual(Array.from(g.done, (t) => t.id), ["a"]);
  });
  test("nhóm 'done' sắp theo lúc hoàn thành gần nhất lên đầu", () => {
    const ctx = loadFiles(FILES);
    const list = [
      { id: "old", done: true, doneAt: 100 },
      { id: "recent", done: true, doneAt: 900 },
    ];
    assert.deepEqual(Array.from(ctx.groupTodosByStatus(list).done, (t) => t.id), ["recent", "old"]);
  });
});

describe("todoDueBadge — nhãn hạn chót/tuổi hiển thị", () => {
  test("có hạn và đã QUA hạn (chưa xong) -> cls 'overdue'", () => {
    const ctx = loadFiles(FILES);
    const b = ctx.todoDueBadge({ due: ctx.ymd(-2), done: false }, ctx.todayStr());
    assert.equal(b.cls, "overdue");
  });
  test("có hạn đúng HÔM NAY -> cls 'today'", () => {
    const ctx = loadFiles(FILES);
    const b = ctx.todoDueBadge({ due: ctx.todayStr(), done: false }, ctx.todayStr());
    assert.equal(b.cls, "today");
  });
  test("có hạn trong TƯƠNG LAI -> cls 'future'", () => {
    const ctx = loadFiles(FILES);
    const b = ctx.todoDueBadge({ due: ctx.ymd(5), done: false }, ctx.todayStr());
    assert.equal(b.cls, "future");
  });
  test("không đặt hạn nhưng tạo từ hôm trước -> lùi về hiện tuổi việc ('từ ...') như hành vi cũ", () => {
    const ctx = loadFiles(FILES);
    const b = ctx.todoDueBadge({ due: "", date: ctx.ymd(-3), done: false }, ctx.todayStr());
    assert.equal(b.cls, "age");
    assert.match(b.text, /^từ /);
  });
  test("không đặt hạn và tạo NGAY hôm nay -> không hiện gì", () => {
    const ctx = loadFiles(FILES);
    const b = ctx.todoDueBadge({ due: "", date: ctx.todayStr(), done: false }, ctx.todayStr());
    assert.equal(b.text, "");
  });
});

describe("withTodoLock — hai lượt ghi kho việc cần làm xen kẽ không còn GHI ĐÈ mất nhau", () => {
  // Cùng loại bug (và cùng cách kiểm chứng) đã áp dụng cho vocab.js: gọi nhiều
  // lượt ghi mà KHÔNG await lần lượt (Promise.all) để mô phỏng đúng tình huống
  // xen kẽ thật.
  test("nhiều addTodo() chạy ĐỒNG THỜI trên các việc khác nhau -> không mất việc nào", async () => {
    const ctx = loadFiles(FILES);
    await Promise.all([
      ctx.addTodo("việc song song A"),
      ctx.addTodo("việc song song B"),
      ctx.addTodo("việc song song C"),
    ]);
    const list = await ctx.getTodos();
    for (const text of ["việc song song A", "việc song song B", "việc song song C"]) {
      assert.ok(list.some((t) => t.text === text), `mất việc "${text}" do ghi đè xen kẽ`);
    }
  });

  test("toggleTodo + setTodoPriority chạy ĐỒNG THỜI trên hai việc khác nhau -> cả hai thay đổi đều được lưu", async () => {
    const ctx = loadFiles(FILES);
    const a = await ctx.addTodo("việc A");
    const b = await ctx.addTodo("việc B");
    await Promise.all([
      ctx.toggleTodo(a.id),
      ctx.setTodoPriority(b.id, "high"),
    ]);
    const list = await ctx.getTodos();
    assert.equal(list.find((t) => t.id === a.id).done, true, "mất thao tác tick xong do ghi đè xen kẽ");
    assert.equal(list.find((t) => t.id === b.id).priority, "high", "mất thao tác đổi ưu tiên do ghi đè xen kẽ");
  });
});
