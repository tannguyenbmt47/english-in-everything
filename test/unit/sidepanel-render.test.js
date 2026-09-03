// ============================================================
// sidepanel-render.test.js — escapeHtml/renderMarkdown là RANH GIỚI AN TOÀN
// DUY NHẤT giữa nội dung do MODEL sinh (chấm bài, lộ trình học, đề reading,
// hỏi đáp) và innerHTML của trang. Sai ở đây là XSS thật, không phải lý thuyết.
// Cũng test normAnswer/sameAnswerSp phải khớp HÀNH VI với gate.js (đã có test
// riêng ở gate-helpers.test.js) — ở đây chỉ xác nhận không tự ý lệch lại.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const ctx = loadFiles([
  "shared/config.js", "shared/cache.js", "shared/vocab.js", "shared/notes.js", "shared/todo.js", "shared/mistakes.js",
  "shared/grammar.js", "shared/ielts.js", "pages/sidepanel/rag.js", "pages/sidepanel/layout.js", "shared/translator.js", "pages/sidepanel/sidepanel.js",
], { url: "https://example.test/sidepanel.html" });

describe("escapeHtml — chặn injection qua NỘI DUNG VĂN BẢN lẫn THUỘC TÍNH", () => {
  test("escape đủ 5 ký tự nguy hiểm, kể cả dấu nháy (SỬA LỖI: từng thiếu \" và ')", () => {
    assert.equal(ctx.escapeHtml(`<script>alert("x")</script>`), "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    assert.equal(ctx.escapeHtml(`it's <b>bold</b>`), "it&#39;s &lt;b&gt;bold&lt;/b&gt;");
  });
  test("chuỗi thường không bị đổi", () => {
    assert.equal(ctx.escapeHtml("bình thường 123"), "bình thường 123");
  });
});

describe("renderMarkdown — nội dung model sinh không được chèn thẻ hay thuộc tính lạ", () => {
  test("thẻ <script> trong text bị escape, không lọt vào DOM dưới dạng thẻ thật", () => {
    const html = ctx.renderMarkdown('Trước <script>alert(1)</script> sau');
    assert.doesNotMatch(html, /<script>/);
    assert.match(html, /&lt;script&gt;/);
  });

  test("link http(s) hợp lệ được dựng thành thẻ <a> đúng href", () => {
    const html = ctx.renderMarkdown("Xem [tài liệu](https://example.com/doc)");
    assert.match(html, /<a href="https:\/\/example\.com\/doc" target="_blank" rel="noopener">tài liệu<\/a>/);
  });

  test("SỬA LỖI: URL chứa dấu ngoặc kép không hình thành thẻ <a> — lỗi gốc là escapeHtml() chạy TRƯỚC khi trích link, biến \" thành chuỗi &quot;, khiến regex href (vốn chỉ chặn dấu \" thô) không còn gì để chặn; &quot; lọt vào href rồi bị TRÌNH DUYỆT giải mã lại thành \" ngay trong giá trị thuộc tính, tái tạo đúng lỗi thoát ra ngoài href. Nay link được trích từ văn bản GỐC (trước escape) nên dấu ) đóng không còn đứng ngay sau URL -> không khớp được nữa.", () => {
    const html = ctx.renderMarkdown('[click](https://evil.test"onmouseover="alert(1))');
    assert.doesNotMatch(html, /<a\b/, "không được hình thành thẻ <a> nào từ URL chứa dấu ngoặc kép");
    assert.match(html, /&quot;/, "dấu ngoặc kép trong chuỗi vẫn phải được escape khi rơi về text thường");
  });

  test("URL hợp lệ có query string nối bằng & vẫn tạo link đúng, & được escape chuẩn thành &amp;", () => {
    const html = ctx.renderMarkdown("[tìm kiếm](https://example.com/search?a=1&b=2)");
    assert.match(html, /href="https:\/\/example\.com\/search\?a=1&amp;b=2"/);
  });

  test("javascript: không được nhận diện là link (chỉ nhận http/https)", () => {
    const html = ctx.renderMarkdown("[bấm vào đây](javascript:alert(1))");
    assert.doesNotMatch(html, /<a /);
  });

  test("bảng Markdown dựng đúng <table>, nội dung ô vẫn được escape", () => {
    const md = "| Ngày | Việc |\n|---|---|\n| 1 | Học **60** từ<script>x</script> |";
    const html = ctx.renderMarkdown(md);
    assert.match(html, /<table>/);
    assert.match(html, /<th>Ngày<\/th>/);
    assert.match(html, /<strong>60<\/strong>/);
    assert.doesNotMatch(html, /<script>x<\/script>/);
  });

  test("in đậm/nghiêng/code hoạt động bình thường", () => {
    const html = ctx.renderMarkdown("**đậm** *nghiêng* `code`");
    assert.match(html, /<strong>đậm<\/strong>/);
    assert.match(html, /<em>nghiêng<\/em>/);
    assert.match(html, /<code>code<\/code>/);
  });
});

describe("normAnswer / sameAnswerSp — nhất quán với bộ so khớp của cổng học", () => {
  test("khác biệt gạch nối/khoảng trắng vẫn tính là đúng", () => {
    assert.equal(ctx.sameAnswerSp("off the shelf", "off-the-shelf"), true);
  });
  test("dấu nháy cong cả hai chiều đều được chuẩn hoá (SỬA LỖI: từng thiếu U+2018)", () => {
    assert.equal(ctx.sameAnswerSp("‘quote’", "'quote'"), true);
  });
});
