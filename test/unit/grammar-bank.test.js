// ============================================================
// grammar-bank.test.js — kiểm tra dữ liệu tĩnh GRAMMAR_TOPIC_BANK (lộ trình
// ngữ pháp có luyện tập theo chủ điểm): đủ trường, hint không lộ đáp án
// (đúng khuôn "chỉ chặn đáp án nhiều từ" đã dùng cho GRAMMAR_BANK/IELTS_BANK
// ở gate-quiz-flow.test.js), và mọi khoá trong bank khớp đúng id thật trong
// GRAMMAR_DATA (chống lệch khoá do gõ nhầm khi viết tay).
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const FILES = ["shared/grammar.js", "shared/grammar-bank.js"];

function grammarTopicIds(ctx) {
  const ids = new Set();
  for (const g of ctx.GRAMMAR_DATA) for (const t of g.topics) ids.add(t.id);
  return ids;
}

describe("GRAMMAR_TOPIC_BANK — câu luyện tập viết tay theo từng chủ điểm ngữ pháp", () => {
  test("mọi khoá trong bank đều khớp một id thật trong GRAMMAR_DATA (không lệch chính tả)", () => {
    const ctx = loadFiles(FILES);
    const realIds = grammarTopicIds(ctx);
    for (const topicId of Object.keys(ctx.GRAMMAR_TOPIC_BANK)) {
      assert.ok(realIds.has(topicId), `id "${topicId}" trong grammar-bank.js không khớp GRAMMAR_DATA nào`);
    }
  });

  test("mỗi chủ điểm ngữ pháp (nhóm 📘, không tính nhánh IELTS) có ít nhất vài câu luyện viết tay", () => {
    const ctx = loadFiles(FILES);
    const grammarGroup = ctx.GRAMMAR_DATA.find((g) => g.group.includes("Ngữ pháp"));
    for (const t of grammarGroup.topics) {
      const items = ctx.GRAMMAR_TOPIC_BANK[t.id] || [];
      assert.ok(items.length >= 10, `chủ điểm "${t.title}" (${t.id}) chỉ có ${items.length} câu luyện, cần >= 10`);
    }
  });

  test("mọi câu hỏi đều đủ trường, có đúng 1 chỗ trống, đáp án hợp lệ", () => {
    const ctx = loadFiles(FILES);
    for (const [topicId, items] of Object.entries(ctx.GRAMMAR_TOPIC_BANK)) {
      items.forEach((it, i) => {
        const where = `${topicId}[${i}]: "${it.q}"`;
        assert.ok(typeof it.q === "string" && it.q.includes("___"), `thiếu chỗ trống "___": ${where}`);
        assert.ok(Array.isArray(it.o) && it.o.length === 4, `phải có đúng 4 lựa chọn: ${where}`);
        assert.ok(Number.isInteger(it.a) && it.a >= 0 && it.a < it.o.length, `chỉ số đáp án "a" không hợp lệ: ${where}`);
        assert.ok(it.hint && it.hint.trim().length > 0, `thiếu hint: ${where}`);
        assert.ok(it.e && it.e.trim().length > 0, `thiếu giải thích "e": ${where}`);
      });
    }
  });

  test("hint không lộ nguyên văn đáp án nhiều từ (đúng khuôn quét đã dùng cho GRAMMAR_BANK/IELTS_BANK)", () => {
    const ctx = loadFiles(FILES);
    for (const [topicId, items] of Object.entries(ctx.GRAMMAR_TOPIC_BANK)) {
      for (const it of items) {
        const answer = it.o[it.a];
        // Đáp án MỘT TỪ được phép xuất hiện trong hint (hint tất yếu phải dùng
        // từ chức năng như "on", "the", "that"...) — chỉ chặn đáp án NHIỀU TỪ.
        if (answer.split(" ").length > 1) {
          assert.doesNotMatch(
            it.hint.toLowerCase(),
            new RegExp(answer.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
            `hint lộ đáp án "${answer}" ở chủ điểm ${topicId}: "${it.q}"`
          );
        }
      }
    }
  });
});
