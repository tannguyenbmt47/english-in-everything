// ============================================================
// translator.test.js — Chunking THUẦN của translator.js: quyết định trực tiếp
// chi phí API (chunk càng hợp lý càng ít lượt gọi thừa) và chất lượng dịch
// (không bao giờ được cắt giữa câu). Cũng test extractJsonArray/glossaryFor vì
// chúng là ranh giới phân tích output của model — sai là mất cả lô câu hỏi/từ.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const ctx = loadFiles(["config.js", "translator.js"]);

// Giá trị trả về từ vm context là object/array của MỘT REALM KHÁC — prototype
// không cùng định danh với Array.prototype ở đây, nên assert.deepEqual (strict)
// báo "same structure but not reference-equal" dù dữ liệu giống hệt. Round-trip
// qua JSON để đưa cả hai vế về plain object của realm hiện tại trước khi so.
function sameJSON(actual, expected) {
  assert.deepEqual(JSON.parse(JSON.stringify(actual)), JSON.parse(JSON.stringify(expected)));
}

function joinChunks(chunks) {
  return chunks.map((c) => c.text).join("\n\n");
}

describe("buildSemanticChunks — bất biến cốt lõi: không mất chữ, không cắt giữa câu", () => {
  test("nối lại các chunk phải khôi phục đúng nội dung gốc (không rơi rớt đoạn nào)", () => {
    const text = "Introduction\n\nThis is the first paragraph. It has two sentences.\n\n" +
      "Method\n\nWe propose a new approach. It works well in practice.";
    const chunks = ctx.buildSemanticChunks(text);
    // Chuẩn hoá khoảng trắng thừa trước khi so — chunker được phép gộp/tách
    // ranh giới đoạn nhưng không được phép mất hay bịa thêm CHỮ.
    const flatten = (s) => s.replace(/\s+/g, " ").trim();
    assert.equal(flatten(joinChunks(chunks)), flatten(text));
  });

  test("văn bản rỗng vẫn trả về mảng hợp lệ, không throw", () => {
    sameJSON(ctx.buildSemanticChunks(""), [{ text: "", heading: "" }]);
  });

  test("mọi chunk đều nằm trong ngưỡng MAX_CHARS (8500), kể cả khi một đoạn gốc dài hơn ngưỡng", () => {
    const longPara = "Word. ".repeat(3000); // ~18000 ký tự, một đoạn liền không xuống dòng
    const chunks = ctx.buildSemanticChunks(longPara);
    for (const c of chunks) assert.ok(c.text.length <= 8500, `chunk dài ${c.text.length} ký tự > 8500`);
  });

  test("tiêu đề mục luôn dính liền với nội dung theo sau, không đứng chunk riêng một mình", () => {
    const text = "3.1 Related Work\n\nPrior studies have examined this problem extensively.";
    const chunks = ctx.buildSemanticChunks(text);
    assert.equal(chunks.length, 1);
    assert.match(chunks[0].text, /Related Work/);
    assert.match(chunks[0].text, /Prior studies/);
  });

  test("không có dòng trống nào trong văn bản -> vẫn trả về đúng nội dung, không throw", () => {
    const text = "Một đoạn văn bản dài không hề có ký tự xuống dòng kép nào ở giữa cả.";
    const chunks = ctx.buildSemanticChunks(text);
    assert.equal(joinChunks(chunks).trim(), text);
  });
});

describe("splitParagraphBySentence — cắt đoạn quá dài, không cắt giữa câu", () => {
  test("không mảnh nào vượt MAX_CHARS, và nối lại đúng nội dung", () => {
    const para = "This is sentence number one. This is sentence number two! Is this sentence three? " .repeat(150);
    const pieces = ctx.splitParagraphBySentence(para);
    for (const p of pieces) assert.ok(p.length <= 8500);
    assert.equal(pieces.join(" ").replace(/\s+/g, " ").trim(), para.replace(/\s+/g, " ").trim());
  });

  test("một câu đơn ngắn -> trả về nguyên vẹn trong một mảnh", () => {
    sameJSON(ctx.splitParagraphBySentence("Short sentence."), ["Short sentence."]);
  });
});

describe("isHeading — nhận diện tiêu đề mục paper", () => {
  const CO = ["1 Introduction", "2.3 Related Work", "Abstract", "CONCLUSION", "References"];
  const KHONG = ["This is a normal sentence that describes something in detail.",
                 "a".repeat(95)]; // quá dài (>90 ký tự) không thể là heading
  for (const s of CO) test(`là tiêu đề: "${s}"`, () => assert.equal(ctx.isHeading(s), true));
  for (const s of KHONG) test(`không phải tiêu đề: "${s.slice(0, 30)}…"`, () => assert.equal(ctx.isHeading(s), false));
});

describe("extractJsonArray — bóc mảng JSON ra khỏi output của model", () => {
  test("JSON thuần", () => {
    sameJSON(ctx.extractJsonArray('[{"a":1}]'), [{ a: 1 }]);
  });
  test("bọc trong code fence ```json ... ```", () => {
    sameJSON(ctx.extractJsonArray('```json\n[{"a":1},{"b":2}]\n```'), [{ a: 1 }, { b: 2 }]);
  });
  test("model chèn thêm chữ thừa trước/sau mảng", () => {
    sameJSON(ctx.extractJsonArray('Đây là kết quả:\n[{"a":1}]\nHết.'), [{ a: 1 }]);
  });
  test("JSON hỏng -> trả về mảng rỗng, không throw", () => {
    sameJSON(ctx.extractJsonArray("không phải JSON gì cả"), []);
    sameJSON(ctx.extractJsonArray("[{broken"), []);
  });
});

describe("glossaryFor / glossarySignature — chỉ chèn thuật ngữ THỰC SỰ xuất hiện", () => {
  const glossary = [{ en: "attention", vi: "cơ chế chú ý" }, { en: "embedding", vi: "vector nhúng" }];
  test("chèn đúng thuật ngữ xuất hiện trong đoạn, bỏ qua thuật ngữ không xuất hiện", () => {
    const out = ctx.glossaryFor("The attention mechanism is central to this model.", glossary);
    assert.match(out, /attention.*cơ chế chú ý/);
    assert.doesNotMatch(out, /embedding/);
  });
  test("không thuật ngữ nào khớp -> chuỗi rỗng (không tốn thêm token)", () => {
    assert.equal(ctx.glossaryFor("Unrelated text here.", glossary), "");
  });
  test("khớp theo ranh giới từ, không khớp một phần của từ khác", () => {
    // "attention" không được khớp bên trong "attentional" (khác từ)
    const out = ctx.glossaryFor("This is an attentional bias study.", glossary);
    assert.equal(out, "");
  });
  test("chữ ký thay đổi khi bảng thuật ngữ thay đổi -> cache biết cần dịch lại", () => {
    const sigA = ctx.glossarySignature(glossary);
    const sigB = ctx.glossarySignature([...glossary, { en: "token", vi: "token" }]);
    assert.notEqual(sigA, sigB);
    assert.equal(ctx.glossarySignature(glossary), sigA); // ổn định, cùng input ra cùng chữ ký
  });
});
