// ============================================================
// vocab-lifecycle.test.js — TÍCH HỢP: vocab.js thật + cache.js thật + storage
// thật (Map giả lập chrome.storage.local), chạy nguyên vòng đời một từ vựng
// qua nhiều lượt ôn — đúng như một người dùng thật trải qua nhiều ngày.
//
// Đây chính là bài test "khoá lại" hành vi SM-2 đã sửa: nếu sau này ai vô tình
// đổi reviewVocab()/nextSrs() theo hướng làm ease chỉ có đường xuống trở lại,
// bài test này báo đỏ ngay — không cần đợi vài tuần mới phát hiện qua log thật.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

describe("Vòng đời một từ: lưu -> nhiều lượt ôn đúng liên tiếp -> khoảng cách phải GIÃN RA", () => {
  test("10 lần trả lời đúng ngay lần đầu liên tiếp -> ease tăng dần, không đứng yên, không giảm", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "deteriorate", meaning: "xấu đi, suy giảm" });

    const eases = [];
    const intervals = [];
    for (let i = 0; i < 10; i++) {
      // Đúng ngay lần đầu, không dùng gợi ý, không có tiền sử sai -> q=5.
      const list = await ctx.reviewVocab("deteriorate", true, false);
      const v = list.find((x) => x.term === "deteriorate");
      eases.push(v.ease);
      intervals.push(v.interval);
    }

    for (let i = 1; i < eases.length; i++) {
      assert.ok(eases[i] >= eases[i - 1], `ease phải không giảm ở lượt ${i}: ${eases[i - 1]} -> ${eases[i]}`);
    }
    assert.ok(eases[eases.length - 1] > eases[0], "sau 10 lần đúng liên tiếp, ease phải TĂNG so với ban đầu (2.5)");
    // Khoảng cách ôn phải giãn ra theo thời gian — đúng tinh thần SRS, không
    // đứng yên ở một chu kỳ cố định.
    assert.ok(intervals[9] > intervals[2], `khoảng cách ôn phải giãn dần: lượt 3 = ${intervals[2]} ngày, lượt 10 = ${intervals[9]} ngày`);
  });

  test("sai xen kẽ giữa các lần đúng -> ease giảm đúng lúc sai, KHÔNG bị kéo xuống sàn chỉ vì thỉnh thoảng quên", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "cohesion", meaning: "sự gắn kết" });

    const seq = [true, true, false, true, true, true, false, true, true, true];
    let last;
    for (const ok of seq) last = (await ctx.reviewVocab("cohesion", ok, false)).find((x) => x.term === "cohesion");

    assert.ok(last.ease > 1.3, `2 lần sai trong 10 lượt không được kéo ease chạm sàn: hiện tại ${last.ease}`);
    assert.equal(last.lapses, 2);
  });

  test("6 lần sai LIÊN TIẾP mới chạm ngưỡng leech (đổi sang mẹo nhớ), không phải sau vài lần lẻ tẻ", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "ambiguous", meaning: "mơ hồ, không rõ ràng" });

    let v;
    for (let i = 0; i < 5; i++) {
      const list = await ctx.reviewVocab("ambiguous", false, false);
      v = list.find((x) => x.term === "ambiguous");
      assert.equal(ctx.isLeech(v), false, `chưa đủ 6 lần sai (mới ${i + 1}) không được tính là leech`);
    }
    const list = await ctx.reviewVocab("ambiguous", false, false);
    v = list.find((x) => x.term === "ambiguous");
    assert.equal(ctx.isLeech(v), true, "đủ 6 lần sai phải được tính là leech");
  });

  test("renameVocab (nút 'đưa về dạng gốc' / 'sửa chính tả') giữ nguyên tiến độ SM-2 đã tích luỹ", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "knocked back", meaning: "từ chối, khước từ" });
    for (let i = 0; i < 3; i++) await ctx.reviewVocab("knocked back", true, false);
    const before = (await ctx.getVocab()).find((v) => v.term === "knocked back");

    const after = await ctx.renameVocab("knocked back", "knock back");
    const renamed = after.find((v) => v.term === "knock back");
    assert.ok(renamed, "phải tìm thấy mục với tên mới");
    assert.equal(renamed.ease, before.ease, "đổi tên không được reset ease");
    assert.equal(renamed.reps, before.reps, "đổi tên không được reset số lần ôn");
    assert.equal(after.find((v) => v.term === "knocked back"), undefined, "tên cũ không còn tồn tại song song");
  });
});

describe("BUG ĐÃ SỬA — addVocab() chặn trùng lặp gần giống ngay lúc lưu, không chỉ dọn dẹp sau", () => {
  test("lưu 'make decision' rồi lưu 'make a decision' -> gộp vào MỘT mục, không tạo dòng thứ hai", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "make decision", meaning: "đưa ra quyết định" });
    await ctx.addVocab({ term: "make a decision", meaning: "đưa ra quyết định" });
    const list = await ctx.getVocab();
    assert.equal(list.length, 1, "phải gộp thành một mục duy nhất");
    assert.equal(list[0].term, "make decision", "giữ nguyên cách viết đã lưu trước đó, không tự đổi tên");
  });

  test("tiến độ ôn của mục đã có được BẢO TOÀN khi một bản gần giống khác được lưu thêm", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "take exam", meaning: "thi, làm bài kiểm tra" });
    await ctx.reviewVocab("take exam", true, false);
    await ctx.reviewVocab("take exam", true, false);
    const before = (await ctx.getVocab())[0];

    await ctx.addVocab({ term: "take an exam", meaning: "thi, làm bài kiểm tra" });
    const after = await ctx.getVocab();
    assert.equal(after.length, 1);
    assert.equal(after[0].reps, before.reps, "lưu bản gần giống không được reset tiến độ SM-2 đã có");
  });

  test("mergeDuplicateGroup: gộp dữ liệu CŨ (trước khi có bộ lọc), giữ mục nhiều lượt ôn nhất, bù trường còn thiếu", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    // Mô phỏng 2 mục đã tồn tại song song TRƯỚC khi addVocab() biết chặn trùng
    // (nạp thẳng vào storage, bỏ qua addVocab để giữ đúng kịch bản dữ liệu cũ).
    await ctx.chrome.storage.local.set({
      vocab: [
        { term: "play role", meaning: "", reps: 0, ease: 2.5, interval: 0, lapses: 0, createdAt: 1, box: 1, reviewedAt: 0, nextReview: 0 },
        { term: "play the role", meaning: "đóng vai trò", reps: 4, ease: 2.7, interval: 8, lapses: 0, createdAt: 2, box: 1, reviewedAt: Date.now(), nextReview: 0 },
      ],
    });
    const groups = ctx.findNearDuplicateGroups(await ctx.getVocab());
    assert.equal(groups.length, 1);

    const merged = await ctx.mergeDuplicateGroup(groups[0].map((v) => v.term));
    assert.equal(merged.length, 1, "hai mục trùng lặp phải còn lại đúng một");
    assert.equal(merged[0].term, "play the role", "giữ mục có NHIỀU lượt ôn hơn (reps=4), không phải mục tạo trước");
    assert.equal(merged[0].meaning, "đóng vai trò", "giữ nghĩa đã có, không bị mục kia (nghĩa rỗng) ghi đè");
    assert.equal(merged[0].reps, 4, "không mất tiến độ ôn của mục được giữ lại");
  });
});

describe("dueVocab / memoryLevel — chọn đúng từ cần ôn hôm nay, phân loại đúng mức nhớ", () => {
  test("từ mới thêm luôn đến hạn ngay (nextReview = lúc thêm)", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "advocacy", meaning: "sự ủng hộ, vận động" });
    const due = ctx.dueVocab(await ctx.getVocab());
    assert.equal(due.length, 1);
  });

  test("sau khi ôn đúng, từ không còn đến hạn cho tới đúng ngày interval quy định", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "legislation", meaning: "pháp luật, luật pháp" });
    await ctx.reviewVocab("legislation", true, false); // interval >= 1 ngày
    const due = ctx.dueVocab(await ctx.getVocab());
    assert.equal(due.length, 0, "vừa ôn xong hôm nay thì chưa thể đến hạn lại ngay");
  });

  test("memoryLevel tăng dần đúng theo mốc ngày: 0 (chưa học) -> 1 (<3 ngày) -> ... theo interval hiện tại", async () => {
    const ctx = loadFiles(["shared/config.js", "shared/cache.js", "shared/vocab.js"]);
    await ctx.addVocab({ term: "residential", meaning: "thuộc khu dân cư" });
    let v = (await ctx.getVocab())[0];
    assert.equal(ctx.memoryLevel(v), 0, "chưa ôn lần nào -> mức 0");

    for (let i = 0; i < 8; i++) await ctx.reviewVocab("residential", true, false);
    v = (await ctx.getVocab()).find((x) => x.term === "residential");
    assert.ok(ctx.memoryLevel(v) >= 2, `sau 8 lần ôn đúng liên tiếp, mức nhớ phải tăng đáng kể (hiện tại mức ${ctx.memoryLevel(v)}, interval ${v.interval} ngày)`);
  });
});
