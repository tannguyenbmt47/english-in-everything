// ============================================================
// ielts-topics.test.js — Ngân hàng từ vựng IELTS theo chủ đề (offline, không
// cần API). Kiểm tra QUAN TRỌNG NHẤT: khoá của IELTS_TOPIC_BANK phải khớp
// NGUYÊN VĂN text các <option> trong #ieltsTopic (sidepanel.html) — sidepanel.js
// tra cứu bằng đúng el.ieltsTopic.value, lệch một ký tự (vd thiếu dấu &) là
// ngân hàng của cả chủ đề đó không bao giờ được dùng tới, âm thầm rơi về gọi
// AI mà không ai biết.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { loadFiles, ROOT } = require("../helpers/sandbox.js");

const ctx = loadFiles(["ielts-topics.js"]);

// Trích text các <option> trong đúng <select id="ieltsTopic">…</select> của
// sidepanel.html — không phải toàn bộ file, tránh khớp nhầm select khác.
function optionsOfIeltsTopicSelect() {
  const html = fs.readFileSync(path.join(ROOT, "sidepanel.html"), "utf8");
  const selectMatch = html.match(/<select id="ieltsTopic"[^>]*>([\s\S]*?)<\/select>/);
  assert.ok(selectMatch, "không tìm thấy <select id=\"ieltsTopic\"> trong sidepanel.html");
  const opts = [...selectMatch[1].matchAll(/<option[^>]*>([^<]*)<\/option>/g)].map((m) =>
    m[1].replace(/&amp;/g, "&").trim()
  );
  assert.ok(opts.length > 1, "select ieltsTopic phải có nhiều hơn 1 option");
  return opts;
}

describe("Khoá IELTS_TOPIC_BANK phải khớp đúng option thật trong sidepanel.html", () => {
  const htmlTopics = optionsOfIeltsTopicSelect();
  const bankTopics = Object.keys(ctx.IELTS_TOPIC_BANK);

  test("mọi khoá trong ngân hàng đều là một option THẬT (không đánh máy sai/lệch dấu &)", () => {
    for (const t of bankTopics) {
      assert.ok(htmlTopics.includes(t), `khoá "${t}" không khớp option nào trong sidepanel.html — kiểm tra lại dấu & hoặc chính tả`);
    }
  });

  test("'Ngẫu nhiên' (option đầu) không có trong ngân hàng — nó luôn phải rơi về AI/đủ đa dạng chủ đề", () => {
    assert.ok(!Object.keys(ctx.IELTS_TOPIC_BANK).includes("Ngẫu nhiên"));
  });

  test("ít nhất 8/11 chủ đề thật trong HTML đã có ngân hàng offline (không phải chỉ 1-2 chủ đề tượng trưng)", () => {
    const realTopics = htmlTopics.filter((t) => t !== "Ngẫu nhiên");
    const covered = realTopics.filter((t) => bankTopics.includes(t));
    assert.ok(covered.length >= 8, `mới phủ ${covered.length}/${realTopics.length} chủ đề`);
  });
});

describe("Dữ liệu từng mục trong ngân hàng phải đủ trường, không rỗng, không trùng trong cùng một chủ đề", () => {
  const REQUIRED = ["word", "pos", "meaning_vi", "definition_en", "example"];
  for (const [topic, list] of Object.entries(ctx.IELTS_TOPIC_BANK)) {
    test(`chủ đề "${topic}": mọi mục đủ ${REQUIRED.length} trường, không mục nào rỗng`, () => {
      for (const w of list) {
        for (const k of REQUIRED) {
          assert.ok(w[k] && String(w[k]).trim(), `"${topic}" — mục "${w.word || "?"}" thiếu trường "${k}"`);
        }
      }
    });
    test(`chủ đề "${topic}": không có từ trùng lặp trong chính chủ đề đó`, () => {
      const words = list.map((w) => w.word.toLowerCase());
      assert.equal(new Set(words).size, words.length);
    });
    test(`chủ đề "${topic}": nghĩa tiếng Việt đủ cụ thể, không phải câu mơ hồ kiểu "liên quan đến..."`, () => {
      for (const w of list) {
        assert.doesNotMatch(w.meaning_vi.toLowerCase(), /^liên quan (đến|tới)/, `"${w.word}" có nghĩa quá chung chung: "${w.meaning_vi}"`);
      }
    });
  }
});

describe("Mô phỏng đúng logic ưu tiên ngân hàng offline của sidepanel.js (bank trước, AI bù phần thiếu)", () => {
  function pickFromBank(topic, kind, existingLower, count) {
    if (kind !== "word" || !ctx.IELTS_TOPIC_BANK[topic]) return [];
    return ctx.IELTS_TOPIC_BANK[topic]
      .filter((w) => !existingLower.has(w.word.trim().toLowerCase()))
      .slice(0, count);
  }

  test("chủ đề có ngân hàng, chưa có từ nào trong kho -> lấy đủ từ ngân hàng, không cần AI", () => {
    const picked = pickFromBank("Environment", "word", new Set(), 10);
    assert.equal(picked.length, 10);
    assert.equal(10 - picked.length, 0, "không còn thiếu, không cần gọi AI");
  });

  test("một số từ trong ngân hàng đã có sẵn trong kho -> bị loại, phần còn thiếu mới cần AI bù", () => {
    // Environment có 15 từ; đánh dấu 10 từ đã có sẵn -> chỉ còn 5 từ MỚI, dù
    // count=10 thì cũng không đủ 10 (đúng lúc này AI phải bù phần thiếu).
    const already = new Set(ctx.IELTS_TOPIC_BANK.Environment.slice(0, 10).map((w) => w.word.toLowerCase()));
    const picked = pickFromBank("Environment", "word", already, 10);
    assert.equal(picked.length, 5, "chỉ còn 5 từ MỚI trong ngân hàng, 10 - 5 = 5 từ phải nhờ AI bù");
  });

  test("chủ đề 'Ngẫu nhiên' hoặc loại khác 'Từ vựng' -> không dùng ngân hàng, toàn bộ giao cho AI", () => {
    assert.equal(pickFromBank("Ngẫu nhiên", "word", new Set(), 10).length, 0);
    assert.equal(pickFromBank("Environment", "collocation", new Set(), 10).length, 0);
  });
});
