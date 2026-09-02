// ============================================================
// gate-helpers.test.js — Hàm THUẦN của gate.js: chấm đúng/sai, phát hiện lỗi
// chính tả vs nhầm từ, và phát hiện hai từ trong kho cùng một nghĩa tiếng Việt.
//
// Đây là hàm quyết định người học được tính ĐÚNG hay SAI. Sai một nhánh ở đây
// là trừ oan điểm nhớ (ease -0.2, +1 lapse) cho một câu trả lời thực ra đúng.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

// gate.js cần vocab.js/translator.js/cache.js nạp trước (dùng chung scope y hệt gate.html).
const ctx = loadFiles([
  "config.js", "translator.js", "vocab.js", "notes.js", "todo.js",
  "mistakes.js", "grammar.js", "ielts.js", "quizbank.js", "cache.js", "gate.js",
], { url: "https://example.test/gate.html?mode=morning" });

describe("editDistance / isTypoOf — phân biệt lỗi CHÍNH TẢ với nhầm sang TỪ KHÁC", () => {
  test("editDistance: các ca cơ bản", () => {
    assert.equal(ctx.editDistance("kitten", "sitting"), 3);
    assert.equal(ctx.editDistance("", ""), 0);
    assert.equal(ctx.editDistance("abc", "abc"), 0);
    assert.equal(ctx.editDistance("abc", ""), 3);
  });

  test("chỉ sai chính tả -> isTypoOf true", () => {
    assert.equal(ctx.isTypoOf("integraton", "integration"), true);
    assert.equal(ctx.isTypoOf("efficency", "efficiency"), true);
    assert.equal(ctx.isTypoOf("budgetted", "budgeted"), true);
    assert.equal(ctx.isTypoOf("knocked bakc", "knocked back"), true);
  });

  test("nhầm sang một từ hẳn khác -> isTypoOf false", () => {
    assert.equal(ctx.isTypoOf("incoporation", "integration"), false); // deteriorate/diminish-style mixup thật
    assert.equal(ctx.isTypoOf("spent", "budgeted"), false);
    assert.equal(ctx.isTypoOf("diminished", "deteriorate"), false);
  });
});

describe("normAns / looseAns / sameAnswer — so khớp đáp án", () => {
  test("khác biệt gạch nối/khoảng trắng vẫn tính là đúng (lỗi tách dòng PDF)", () => {
    assert.equal(ctx.sameAnswer("off the shelf", "off-the-shelf"), true);
    assert.equal(ctx.sameAnswer("knock back", "knock-back"), true);
  });
  test("khác biệt dấu câu/hoa-thường không ảnh hưởng", () => {
    assert.equal(ctx.sameAnswer("Integration.", "integration"), true);
    assert.equal(ctx.sameAnswer("‘quote’", "'quote'"), true); // dấu nháy cong vs thẳng
  });
  test("khác nghĩa thì không khớp", () => {
    assert.equal(ctx.sameAnswer("diminish", "deteriorate"), false);
  });
});

describe("meaningsClash / twinsOf — hai từ trong kho cùng một nghĩa tiếng Việt (SỬA LỖI: từng bị chấm sai oan)", () => {
  test("cùng y hệt một nghĩa -> trùng", () => {
    assert.equal(ctx.meaningsClash("sự hòa nhập", "sự hòa nhập"), true);
  });
  test("khác nhau mỗi nhãn từ loại '(danh từ)' -> vẫn tính là trùng", () => {
    assert.equal(ctx.meaningsClash("(danh từ) sự hòa nhập", "sự hòa nhập"), true);
  });
  test("trùng một vế trong danh sách nghĩa cách nhau bởi ; hoặc /", () => {
    assert.equal(ctx.meaningsClash("sự hòa nhập; sự bao gồm", "sự hòa nhập/sự hợp nhất"), true);
  });
  test("một bên có chú thích thêm phía sau -> vẫn tính là trùng", () => {
    assert.equal(ctx.meaningsClash("hiệu quả", "hiệu quả kinh tế"), true);
  });
  test("nghĩa khác hẳn -> không trùng", () => {
    assert.equal(ctx.meaningsClash("sự hòa nhập", "sự suy giảm"), false);
  });
  test("khác chữ hoàn toàn (không phải tiền tố của nhau) -> không trùng", () => {
    assert.equal(ctx.meaningsClash("sự cạnh tranh", "cạnh tranh"), false);
  });

  test("twinsOf tìm đúng các mục khác trong kho cùng nghĩa, bỏ qua chính nó", () => {
    const pool = [
      { term: "inclusion", meaning: "sự hòa nhập" },
      { term: "integration", meaning: "sự hòa nhập" },
      { term: "efficiency", meaning: "hiệu quả" },
    ];
    const twins = ctx.twinsOf(pool[0], pool);
    assert.deepEqual(twins.map((t) => t.term), ["integration"]);
    assert.equal(ctx.twinsOf(pool[2], pool).length, 0);
  });
});

describe("maskTerm — che đúng từ đang hỏi trong cụm, không che nhầm phần còn lại", () => {
  test("che từ đầu của cụm động từ", () => {
    assert.equal(ctx.maskTerm("employee remuneration", "remuneration"), "employee ___");
    assert.equal(ctx.maskTerm("remuneration package", "remuneration"), "___ package");
  });
  test("che cả biến thể chia thì của từ trong câu ngữ cảnh", () => {
    assert.equal(ctx.maskTerm("Firms with liquidity problems often fail.", "liquidity"), "Firms with ___ problems often fail.");
  });
});

describe("worthMeaningHint — chỉ tra nghĩa cho đáp án đáng tra", () => {
  test("từ đơn đủ dài, không phải từ chức năng -> đáng tra", () => {
    assert.equal(ctx.worthMeaningHint("budgeted"), true);
    assert.equal(ctx.worthMeaningHint("integration"), true);
  });
  test("từ chức năng / quá ngắn / cụm nhiều từ -> không đáng tra (tra nghĩa vô ích)", () => {
    assert.equal(ctx.worthMeaningHint("been"), false);
    assert.equal(ctx.worthMeaningHint("would"), false);
    assert.equal(ctx.worthMeaningHint("the"), false);
    assert.equal(ctx.worthMeaningHint("would have been"), false);
    assert.equal(ctx.worthMeaningHint("run"), false); // < 4 chữ
  });
});

describe("answerHint — gợi ý chữ cái đầu + số ô, không lộ hơn mức cần", () => {
  test("một từ", () => {
    const h = ctx.answerHint("budgeted");
    assert.match(h, /^b( _){7}/);
    assert.match(h, /8 chữ cái/);
  });
  test("cụm nhiều từ: mỗi từ hiện chữ đầu riêng", () => {
    const h = ctx.answerHint("knock back");
    assert.match(h, /^k( _){4}/);
    assert.match(h, /b( _){3}/);
  });
});
