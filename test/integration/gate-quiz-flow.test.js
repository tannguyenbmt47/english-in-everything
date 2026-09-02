// ============================================================
// gate-quiz-flow.test.js — TÍCH HỢP: nạp đúng chuỗi file gate.html nạp thật
// (config/translator/vocab/notes/todo/mistakes/grammar/ielts/quizbank/cache/
// gate), dùng storage thật, dựng câu hỏi và chấm bài như một phiên học thật.
//
// Trọng tâm: bug "hai từ cùng nghĩa tiếng Việt bị chấm sai oan" — sửa ở CẢ
// đầu ra đề (cảnh báo trên prompt) LẪN đầu chấm bài (ambiguousTwin) — bài test
// này xác nhận HAI ĐẦU khớp nhau trên cùng một bộ dữ liệu thật, không chỉ từng
// hàm rời rạc như ở unit test.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const FILES = [
  "config.js", "translator.js", "vocab.js", "notes.js", "todo.js",
  "mistakes.js", "grammar.js", "ielts.js", "quizbank.js", "cache.js", "gate.js",
];

describe("Từ trừu tượng: dựng câu hỏi 'điền vào cụm' đúng dữ liệu, che đúng chỗ", () => {
  test("có collocs -> đề bài che đúng từ đang hỏi trong từng cụm, đáp án là chính từ đó", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const word = {
      term: "remuneration",
      meaning: "tiền thù lao, tiền công",
      collocs: ["employee remuneration", "remuneration package", "competitive remuneration"],
      cloze: "The board approved a new remuneration policy for senior staff.",
      clozeVi: "Hội đồng đã phê duyệt chính sách thù lao mới cho nhân sự cấp cao.",
    };
    const q = ctx.vocabContextQuestion(word);
    assert.equal(q.answer, "remuneration");
    assert.equal(q.kind, "vocab");
    // maskTerm() thay từ bằng "___", rồi gap() đổi "___" thành khối <span class="g-gap">
    // — nên đề bài thật không còn chữ "___" mà là khối trống này.
    assert.match(q.prompt, /employee <span class="g-gap"><\/span>/, "cụm đầu phải che đúng từ 'remuneration'");
    assert.match(q.prompt, /<span class="g-gap"><\/span> package/);
    assert.doesNotMatch(q.prompt, /\bremuneration\b/i, "đề bài không được để lộ nguyên văn đáp án ở đâu cả");
  });
});

describe("BUG ĐÃ SỬA — hai từ trong kho cùng một nghĩa tiếng Việt", () => {
  test("kho có inclusion & integration cùng nghĩa 'sự hòa nhập' -> đề bài của TỪ NÀY cảnh báo có TỪ KIA", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    await ctx.addVocab({ term: "inclusion", meaning: "sự hòa nhập" });
    await ctx.addVocab({ term: "integration", meaning: "sự hòa nhập" });
    const pool = await ctx.getVocab();
    const inclusion = pool.find((v) => v.term === "inclusion");

    const q = ctx.vocabRecallQuestion(inclusion, pool);
    assert.match(q.prompt, /2 từ cùng nghĩa/, "đề bài phải cảnh báo trước, không để người học tự đoán nhầm");
  });

  test("không có từ trùng nghĩa -> không hiện cảnh báo (không làm nhiễu đề bài bình thường)", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    await ctx.addVocab({ term: "efficiency", meaning: "hiệu quả" });
    const pool = await ctx.getVocab();
    const q = ctx.vocabRecallQuestion(pool[0], pool);
    assert.doesNotMatch(q.prompt, /cùng nghĩa/);
  });

  test("ambiguousTwin: gõ trúng TỪ KHÁC cùng nghĩa với câu đang hỏi -> nhận diện được, KHÔNG lẫn sang từ không liên quan", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    await ctx.addVocab({ term: "inclusion", meaning: "sự hòa nhập" });
    await ctx.addVocab({ term: "integration", meaning: "sự hòa nhập" });
    await ctx.addVocab({ term: "efficiency", meaning: "hiệu quả" });

    // Câu hỏi thật: nghĩa "sự hòa nhập" -> đáp án đúng là "integration".
    const q = { answer: "integration", meaning: "sự hòa nhập" };

    const twinGoTrung = await ctx.ambiguousTwin(q, "inclusion");
    assert.ok(twinGoTrung, "gõ 'inclusion' (cùng nghĩa với đáp án) phải được nhận diện là song trùng");
    assert.equal(twinGoTrung.term, "inclusion");

    const khongPhaiTwin = await ctx.ambiguousTwin(q, "efficiency");
    assert.equal(khongPhaiTwin, null, "'efficiency' khác nghĩa hoàn toàn, không được tính là song trùng");

    const goDungLuon = await ctx.ambiguousTwin(q, "integration");
    assert.equal(goDungLuon, null, "gõ ĐÚNG đáp án thì không cần xét song trùng nữa");

    const khongCoTrongKho = await ctx.ambiguousTwin(q, "randomword");
    assert.equal(khongCoTrongKho, null, "từ không có trong kho thì không có gì để đối chiếu");
  });
});

describe("Sổ lỗi & vòng lặp ôn lại — mistakes.js thật", () => {
  test("một câu ngữ pháp trả lời sai -> vào sổ lỗi; đúng đủ 3 lần liên tiếp -> tự xoá khỏi sổ", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const item = { q: "She ___ to school every day.", o: ["go", "goes", "going", "gone"], a: 1, e: "Thì hiện tại đơn, ngôi thứ 3 số ít." };

    await ctx.addMistake(item, "grammar");
    let all = await ctx.getMistakes();
    assert.equal(all.length, 1);
    const id = all[0].id;

    await ctx.markMistakeResult(id, true);
    await ctx.markMistakeResult(id, true);
    all = await ctx.getMistakes();
    assert.equal(all.length, 1, "chưa đủ 3 lần đúng liên tiếp thì vẫn còn trong sổ");

    await ctx.markMistakeResult(id, true);
    all = await ctx.getMistakes();
    assert.equal(all.length, 0, "đủ 3 lần đúng liên tiếp phải tự động xoá khỏi sổ lỗi");
  });

  test("đúng 2 lần rồi lỡ sai 1 lần -> chuỗi đúng liên tiếp phải RESET, không cộng dồn xuyên lỗi", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const item = { q: "If I ___ rich, I would travel.", o: ["am", "was", "were", "be"], a: 2, e: "Điều kiện loại 2." };
    await ctx.addMistake(item, "grammar");
    const id = (await ctx.getMistakes())[0].id;

    await ctx.markMistakeResult(id, true);
    await ctx.markMistakeResult(id, true);
    await ctx.markMistakeResult(id, false); // reset chuỗi
    await ctx.markMistakeResult(id, true);
    await ctx.markMistakeResult(id, true);
    let all = await ctx.getMistakes();
    assert.equal(all.length, 1, "mới 2 lần đúng liên tiếp SAU lần sai gần nhất -> chưa đủ để xoá");

    await ctx.markMistakeResult(id, true);
    all = await ctx.getMistakes();
    assert.equal(all.length, 0);
  });
});
