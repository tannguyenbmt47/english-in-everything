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
  "shared/config.js", "shared/tts.js", "shared/translator.js", "shared/vocab.js", "shared/notes.js", "shared/todo.js",
  "shared/mistakes.js", "shared/grammar.js", "shared/ielts.js", "pages/gate/quizbank.js", "shared/cache.js", "pages/gate/gate.js",
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

describe("BUG ĐÃ SỬA — câu ngữ pháp điền khuyết thiếu gợi ý QUY TẮC (không biết điền sao)", () => {
  test("bankQuestion() mang ruleHint từ item.hint sang, hiện được trước khi trả lời", () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const item = { q: "If it ___ tomorrow, we will cancel the trip.", o: ["rain", "rains", "will rain", "rained"], a: 1,
      hint: "Điều kiện loại 1: if + hiện tại đơn, will + V.", e: "Điều kiện loại 1: If + hiện tại đơn, will + V." };
    const q = ctx.bankQuestion(item, "Ngữ pháp", "grammar");
    assert.equal(q.ruleHint, item.hint);
    assert.ok(q.ruleHint.length > 0);
  });

  test("mistakes.js giữ lại hint khi lưu câu sai, không mất gợi ý lúc ôn lại", async () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const item = { q: "Test question ___.", o: ["a", "b", "c", "d"], a: 1, hint: "Gợi ý quy tắc XYZ.", e: "Giải thích đầy đủ." };
    await ctx.addMistake(item, "grammar");
    const saved = (await ctx.getMistakes())[0];
    assert.equal(saved.hint, "Gợi ý quy tắc XYZ.");
  });

  test("câu điều kiện hỗn hợp (quá khứ→hiện tại) trong ngân hàng offline gọi ĐÚNG tên, không nhầm 'loại 3'", () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const mixed = ctx.GRAMMAR_BANK.find((it) => it.q.includes("negative effects of globalisation"));
    assert.ok(mixed, "phải có câu điều kiện hỗn hợp trong ngân hàng");
    const answer = mixed.o[mixed.a];
    assert.doesNotMatch(answer, /have/i, "vế kết quả của điều kiện HỖN HỢP (quá khứ→hiện tại) không có 'have'");
    assert.doesNotMatch(mixed.hint.toLowerCase(), /loại 3(?!\s*thu)/, "không được gọi nhầm là 'loại 3' khi đáp án thiếu 'have'");
    assert.match(mixed.hint, /hỗn hợp/i, "phải gọi đúng tên là điều kiện hỗn hợp");
  });

  test("mọi câu trong GRAMMAR_BANK/IELTS_BANK đều có hint không rỗng và không lộ nguyên văn đáp án", () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    for (const it of [...ctx.GRAMMAR_BANK, ...ctx.IELTS_BANK]) {
      assert.ok(it.hint && it.hint.trim().length > 0, `thiếu hint: "${it.q}"`);
      const answer = it.o[it.a];
      // Hint không được chứa NGUYÊN VĂN đáp án (cho phép chứa từng chữ riêng lẻ
      // trong công thức, nhưng không được lặp lại cả cụm đáp án).
      if (answer.split(" ").length > 1) {
        assert.doesNotMatch(it.hint.toLowerCase(), new RegExp(answer.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `hint lộ đáp án "${answer}": "${it.q}"`);
      }
    }
  });

  test("BUG ĐÃ SỬA — 'Từ loại' và 'Cấu tạo từ' có bài học nhưng từng KHÔNG có câu luyện tập nào, nên không bao giờ được chọn làm chủ điểm yếu để ôn lại", () => {
    const ctx = loadFiles(FILES, { url: "https://example.test/gate.html?mode=morning" });
    const posSpeechItems = ctx.GRAMMAR_BANK.filter((it) => /từ loại/i.test(it.q + " " + it.e));
    const wordFormItems = ctx.GRAMMAR_BANK.filter((it) => /hậu tố|tiền tố|-ly|-tion|-ness|-able/i.test(it.q + " " + it.e));
    assert.ok(posSpeechItems.length >= 3, "phải có ít nhất vài câu luyện 'Từ loại' trong GRAMMAR_BANK");
    assert.ok(wordFormItems.length >= 3, "phải có ít nhất vài câu luyện 'Cấu tạo từ' trong GRAMMAR_BANK");

    const topics = [
      { title: "Từ loại (Parts of Speech) — nhận diện & vị trí" },
      { title: "Cấu tạo từ (Word Formation): hậu tố & tiền tố" },
      { title: "Điều kiện (Conditionals)" },
    ];
    const mistakes = [
      { q: posSpeechItems[0].q, e: posSpeechItems[0].e, wrongCount: 3, kind: "grammar" },
      { q: wordFormItems[0].q, e: wordFormItems[0].e, wrongCount: 2, kind: "grammar" },
    ];
    const ranked = ctx.rankWeakTopics(topics, mistakes);
    const titles = ranked.map((r) => topics[r.idx].title);
    assert.ok(titles.some((t) => t.includes("Từ loại")), "sai câu 'Từ loại' phải khiến bài đó được xếp là chủ điểm yếu");
    assert.ok(titles.some((t) => t.includes("Cấu tạo từ")), "sai câu 'Cấu tạo từ' phải khiến bài đó được xếp là chủ điểm yếu");
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
