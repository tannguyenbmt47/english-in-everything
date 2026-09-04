// ============================================================
// grammar.test.js — markupGrammarExamples(): chuyển quy ước viết tay ~~sai~~
// (câu ví dụ SAI trong grammar.js) thành <del> thật trước khi innerHTML.
//
// BUG ĐÃ SỬA: gate.js (màn chặn buổi sáng) và sidepanel.js (tab Ngữ pháp) đều
// từng gán thẳng t.html vào innerHTML mà không xử lý ~~...~~ — người học thấy
// nguyên hai dấu ngã quanh câu sai (vd "~~She is it~~") thay vì chữ gạch
// ngang, trông như lỗi hiển thị dù phần dấu tiếng Việt vẫn đúng.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const FILES = ["shared/grammar.js"];

describe("markupGrammarExamples — chuyển ~~sai~~ thành <del>sai</del>", () => {
  test("một cặp ~~...~~ trong câu -> <del>...</del>, phần còn lại giữ nguyên", () => {
    const ctx = loadFiles(FILES);
    const out = ctx.markupGrammarExamples('(She is a teacher → ~~She is it~~ sai).');
    assert.equal(out, '(She is a teacher → <del>She is it</del> sai).');
  });

  test("nhiều cặp ~~...~~ trong cùng một chuỗi đều được chuyển", () => {
    const ctx = loadFiles(FILES);
    const out = ctx.markupGrammarExamples('~~He slept the bed.~~ sai, phải là He slept on the bed. ~~Is raining.~~ cũng sai.');
    assert.equal(out, '<del>He slept the bed.</del> sai, phải là He slept on the bed. <del>Is raining.</del> cũng sai.');
  });

  test("không có ~~ nào -> trả về nguyên văn", () => {
    const ctx = loadFiles(FILES);
    const html = "<p>She is a teacher.</p>";
    assert.equal(ctx.markupGrammarExamples(html), html);
  });

  test("rỗng/undefined -> trả về chuỗi rỗng, không ném lỗi", () => {
    const ctx = loadFiles(FILES);
    assert.equal(ctx.markupGrammarExamples(""), "");
    assert.equal(ctx.markupGrammarExamples(undefined), "");
  });

  test("mọi chủ điểm trong GRAMMAR_DATA sau khi xử lý không còn dấu ~~ nào sót lại", () => {
    const ctx = loadFiles(FILES);
    for (const g of ctx.GRAMMAR_DATA) {
      for (const t of g.topics) {
        const processed = ctx.markupGrammarExamples(t.html);
        assert.doesNotMatch(processed, /~~/, `còn sót ~~ chưa xử lý ở chủ điểm "${t.title}"`);
      }
    }
  });
});
