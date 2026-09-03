// ============================================================
// vocab.test.js — Hàm THUẦN của vocab.js: bộ lọc từ vựng, hình thái tiếng Anh
// (đưa cụm động từ về dạng gốc), và phần tính toán của SM-2.
//
// Đây là những hàm quyết định trực tiếp: xóa nhầm mục từ vựng thật (renameVocab
// gộp trùng thì XÓA mục cũ), hay khoảng cách ôn tập bị lệch. Sai một luật ở đây
// là hỏng âm thầm, không ai phát hiện trong nhiều tuần.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const ctx = loadFiles(["shared/vocab.js"]);

describe("isCleanLexicalItem / isClauseLike / isJunkTerm — cổng vào/ra của kho từ vựng", () => {
  // Đây là cổng cho saveWrongWord() (gate.js) quyết định lưu gì, và cổng cho
  // nút "Quét & xoá từ rác" (sidepanel.js) quyết định xoá gì. False positive ở
  // "loại" là mất từ thật; false negative là rác lọt vào kho.
  const GIU = ["come off", "make a decision", "take into account", "a piece of cake", "off-the-shelf", "mitigate"];
  const LOAI = ["the gallery opened", "will the university release", "crowded was the gallery",
                "so little space that", "11.1", "11,1", "1", ""];

  for (const t of GIU) {
    test(`giữ lại: "${t}"`, () => assert.equal(ctx.isCleanLexicalItem(t), true));
  }
  for (const t of LOAI) {
    test(`loại bỏ: "${t || "(rỗng)"}"`, () => assert.equal(ctx.isCleanLexicalItem(t), false));
  }

  test("isJunkTerm: không có 2 chữ cái liền nhau -> rác", () => {
    assert.equal(ctx.isJunkTerm("11.1"), true);
    assert.equal(ctx.isJunkTerm("a"), true); // 1 chữ cái, không đủ "AB"
    assert.equal(ctx.isJunkTerm("ab"), false);
    assert.equal(ctx.isJunkTerm("knock back"), false);
  });

  test("isClauseLike: mảnh mệnh đề có trợ động từ/đại từ chủ ngữ", () => {
    assert.equal(ctx.isClauseLike("will the university release"), true);
    assert.equal(ctx.isClauseLike("the gallery opened"), true); // the + N + V-ed
    assert.equal(ctx.isClauseLike("take into account"), false);
    assert.equal(ctx.isClauseLike("knock"), false); // từ đơn không thể là mệnh đề
  });
});

describe("baseFormSuggestion — đưa cụm động từ về dạng từ điển", () => {
  // CHỈ áp dụng cho cụm (từ đầu + tiểu từ) — từ đơn luôn trả "" vì tiếng Anh
  // quá mơ hồ (building/meeting/advanced đều là từ có nghĩa riêng).
  const CUM = [
    ["knocked back", "knock back"], ["knocking back", "knock back"], ["knocks back", "knock back"],
    ["carried out", "carry out"], ["worked out", "work out"], ["brought up", "bring up"],
    ["took over", "take over"], ["looked after", "look after"], ["running out", "run out"],
    ["played down", "play down"], ["went through", "go through"], ["paid off", "pay off"],
  ];
  for (const [input, want] of CUM) {
    test(`"${input}" -> "${want}"`, () => assert.equal(ctx.baseFormSuggestion(input), want));
  }

  const KHONG_DOAN = ["knock back", "take into account", "make a decision", "heavy rain",
                       "increased demand", "hoped for", "building", "meeting", "interesting",
                       "knocked", "went", "advanced", "left", "series"];
  for (const t of KHONG_DOAN) {
    test(`không đoán (trả về rỗng): "${t}"`, () => assert.equal(ctx.baseFormSuggestion(t), ""));
  }
});

describe("isAbstractTerm — từ trừu tượng cần học theo cụm, không bắt nhầm từ cụ thể", () => {
  const TRUU_TUONG = ["remuneration", "liquidity", "advisory", "appraisal", "advocacy",
                       "legislation", "initiative", "segregation", "residential", "cohesion", "engagement"];
  for (const t of TRUU_TUONG) {
    test(`nhận diện: "${t}"`, () => assert.equal(ctx.isAbstractTerm(t), true));
  }
  const CU_THE = ["picture", "future", "nature", "furniture", "structure", "animal",
                  "capital", "hospital", "festival", "material", "digital", "native"];
  for (const t of CU_THE) {
    test(`KHÔNG bắt nhầm: "${t}"`, () => assert.equal(ctx.isAbstractTerm(t), false));
  }
});

describe("nextSrs — phần tính toán thuần của SM-2 (SỬA LỖI: ease từng chỉ có đường xuống)", () => {
  test("q=5 (đúng ngay lần đầu) làm ease TĂNG", () => {
    const v = { ease: 2.5, reps: 0, interval: 0, lapses: 0 };
    const n = ctx.nextSrs(v, 5);
    assert.ok(n.ease > 2.5, `ease phải tăng, hiện tại ${n.ease}`);
  });

  test("q=4 (mức 'được' cũ) làm ease ĐỨNG YÊN — đây chính là lỗi đã sửa: gate.js không còn dùng q=4 cho lần đúng đầu tiên nữa", () => {
    const v = { ease: 2.5, reps: 0, interval: 0, lapses: 0 };
    const n = ctx.nextSrs(v, 4);
    assert.equal(n.ease, 2.5, "q=4 phải làm ease đứng yên (0.1 - 1*0.10 = 0) — đúng như tài liệu SM-2 gốc");
  });

  test("q<3 (sai) làm ease giảm và reset interval/reps về 0", () => {
    const v = { ease: 2.5, reps: 3, interval: 10, lapses: 1 };
    const n = ctx.nextSrs(v, 2);
    assert.equal(n.reps, 0);
    assert.equal(n.interval, 0);
    assert.equal(n.lapses, 2);
    assert.ok(n.ease < 2.5);
  });

  test("ease không bao giờ xuống dưới sàn MIN_EASE dù sai liên tục", () => {
    let v = { ease: 1.3, reps: 0, interval: 0, lapses: 6 };
    for (let i = 0; i < 5; i++) v = { ...v, ...ctx.nextSrs(v, 2) };
    assert.equal(v.ease, 1.3);
  });

  test("bước lặp SM-2 chuẩn (q=4, không có hệ số Khó/Dễ xen vào): reps 1 -> 1 ngày, reps 2 -> 6 ngày, reps 3+ -> interval * ease", () => {
    let v = { ease: 2.5, reps: 0, interval: 0, lapses: 0 };
    v = { ...v, ...ctx.nextSrs(v, 4) }; assert.equal(v.interval, 1);
    const easeAfter1 = v.ease;
    v = { ...v, ...ctx.nextSrs(v, 4) }; assert.equal(v.interval, 6);
    assert.equal(v.ease, easeAfter1, "q=4 không đổi ease (mức 'được' trung tính)");
    v = { ...v, ...ctx.nextSrs(v, 4) }; assert.equal(v.interval, Math.round(6 * easeAfter1));
  });

  test("q=3 ('Khó') và q=5 ('Dễ') nhân thêm hệ số 0.6x / 1.3x lên interval vừa tính", () => {
    const v = { ease: 2.5, reps: 2, interval: 6, lapses: 0 }; // sắp sang reps=3, base = round(6*2.5)=15
    const base = Math.round(6 * 2.5);
    assert.equal(ctx.nextSrs(v, 3).interval, Math.max(1, Math.round(base * 0.6)));
    assert.equal(ctx.nextSrs(v, 5).interval, Math.round(base * 1.3));
  });

  test("srsPreview dùng CHUNG công thức với nextSrs (SỬA LỖI: từng lệch 0.6x/1.3x giữa nút xem trước và lịch thật)", () => {
    const v = { ease: 2.5, reps: 3, interval: 10, lapses: 0 };
    for (const q of [3, 4, 5]) {
      const real = ctx.nextSrs(v, q).interval;
      const shown = ctx.srsPreview(v, q);
      const shownDays = shown.endsWith("ngày") ? parseInt(shown) : Math.round(parseFloat(shown) * 30);
      assert.equal(shownDays, real, `q=${q}: nút hiện "${shown}" nhưng lịch thật là ${real} ngày`);
    }
  });
});

describe("dedupKey / findNearDuplicateGroups — trùng lặp gần giống (SỬA LỖI: 'make decision' và 'make a decision' từng bị coi là hai mục khác nhau)", () => {
  test("chỉ khác mạo từ a/an/the -> cùng khoá", () => {
    assert.equal(ctx.dedupKey("make decision"), ctx.dedupKey("make a decision"));
    assert.equal(ctx.dedupKey("take exam"), ctx.dedupKey("take an exam"));
    assert.equal(ctx.dedupKey("play role"), ctx.dedupKey("play the role"));
  });
  test("khác từ THỰC SỰ (không chỉ mạo từ) -> khoá khác nhau, không bị gộp nhầm", () => {
    assert.notEqual(ctx.dedupKey("a piece of cake"), ctx.dedupKey("a piece of paper"));
    assert.notEqual(ctx.dedupKey("make decision"), ctx.dedupKey("take decision"));
  });
  test("khác hoa/thường, dấu câu, gạch nối -> vẫn cùng khoá", () => {
    assert.equal(ctx.dedupKey("Off-the-shelf"), ctx.dedupKey("off the shelf"));
  });

  test("findNearDuplicateGroups gom đúng nhóm, bỏ qua mục không trùng ai", () => {
    const list = [
      { term: "make decision" }, { term: "make a decision" },
      { term: "efficiency" },
      { term: "take exam" }, { term: "take an exam" }, { term: "take the exam" },
    ];
    const groups = JSON.parse(JSON.stringify(ctx.findNearDuplicateGroups(list))).map((g) => g.map((v) => v.term).sort());
    assert.equal(groups.length, 2);
    assert.deepEqual(groups.find((g) => g.includes("make decision")), ["make a decision", "make decision"]);
    assert.deepEqual(groups.find((g) => g.includes("take exam")), ["take an exam", "take exam", "take the exam"].sort());
  });
});

describe("isLeech — ngưỡng đổi sang mẹo nhớ", () => {
  test("chưa đủ 6 lần sai thì chưa phải leech", () => {
    assert.equal(ctx.isLeech({ lapses: 5 }), false);
  });
  test("đủ 6 lần sai thì là leech", () => {
    assert.equal(ctx.isLeech({ lapses: 6 }), true);
  });
});

describe("withVocabLock — BUG ĐÃ SỬA: hai lượt ghi kho từ vựng xen kẽ từng GHI ĐÈ và XOÁ MẤT lẫn nhau (lost update)", () => {
  // Trước khi có khoá: addVocab/reviewVocabSM2 đều đọc TOÀN BỘ danh sách, sửa
  // trong bộ nhớ rồi ghi đè lại. Gọi hai lượt mà KHÔNG await lần lượt (Promise.all)
  // mô phỏng đúng tình huống thật: gate.js (một tab) và background.js (tra từ ở
  // tab khác) cùng ghi gần như đồng thời. Không có khoá -> lượt ghi sau cùng xoá
  // mất thay đổi của lượt kia.
  test("hai addVocab() chạy ĐỒNG THỜI trên hai từ khác nhau -> cả hai đều được lưu", async () => {
    const local = loadFiles(["shared/vocab.js"]);
    await Promise.all([
      local.addVocab({ term: "concurrentAlpha", meaning: "a" }),
      local.addVocab({ term: "concurrentBeta", meaning: "b" }),
    ]);
    const list = await local.getVocab();
    assert.ok(list.some((v) => v.term === "concurrentAlpha"), "mất từ 'concurrentAlpha' do hai lượt ghi xen kẽ đè lên nhau");
    assert.ok(list.some((v) => v.term === "concurrentBeta"), "mất từ 'concurrentBeta' do hai lượt ghi xen kẽ đè lên nhau");
  });

  test("nhiều reviewVocabSM2() chạy ĐỒNG THỜI trên các từ khác nhau -> không mất tiến độ ôn tập của từ nào", async () => {
    const local = loadFiles(["shared/vocab.js"]);
    await Promise.all([
      local.addVocab({ term: "raceOne" }),
      local.addVocab({ term: "raceTwo" }),
      local.addVocab({ term: "raceThree" }),
    ]);
    await Promise.all([
      local.reviewVocabSM2("raceOne", 5),
      local.reviewVocabSM2("raceTwo", 5),
      local.reviewVocabSM2("raceThree", 5),
    ]);
    const list = await local.getVocab();
    for (const term of ["raceOne", "raceTwo", "raceThree"]) {
      const v = list.find((x) => x.term === term);
      assert.ok(v, `mất mục từ vựng "${term}" — bị xoá khỏi danh sách do ghi đè xen kẽ`);
      assert.equal(v.reps, 1, `tiến độ ôn tập (reps) của "${term}" bị mất do một lượt ghi song song khác đè lên`);
    }
    // Số liệu thống kê (STATS_KEY) cũng đọc/sửa/ghi kiểu tương tự -> phải cộng đủ 3, không bị mất lượt nào.
    const stats = await local.getTodayStats();
    assert.equal(stats.today.reviewed, 3, "bộ đếm 'đã ôn hôm nay' bị mất lượt do ghi đè xen kẽ (đua trên STATS_KEY)");
  });
});

describe("isMissingMeaning — kiểu phát hiện MỚI cho nút 'Dọn từ đáng ngờ' (từ chưa có nghĩa)", () => {
  test("chưa có trường meaning, hoặc chỉ toàn khoảng trắng -> thiếu nghĩa", () => {
    assert.equal(ctx.isMissingMeaning({ term: "a" }), true);
    assert.equal(ctx.isMissingMeaning({ term: "a", meaning: "" }), true);
    assert.equal(ctx.isMissingMeaning({ term: "a", meaning: "   " }), true);
  });
  test("có nghĩa thật -> không thiếu", () => {
    assert.equal(ctx.isMissingMeaning({ term: "a", meaning: "một" }), false);
  });
});

describe("restoreVocabList — BUG ĐÃ SỬA: nút Hoàn tác sau khi dọn dẹp phải ghi qua khoá tuần tự như mọi hàm ghi khác", () => {
  test("ghi đè đúng snapshot cũ, getVocab() trả lại đúng danh sách đã khôi phục", async () => {
    const local = loadFiles(["shared/vocab.js"]);
    await local.addVocab({ term: "before" });
    const snapshot = await local.getVocab();
    await local.addVocab({ term: "after" }); // mô phỏng một lượt dọn dẹp làm đổi kho
    let list = await local.getVocab();
    assert.equal(list.length, 2);

    await local.restoreVocabList(snapshot);
    list = await local.getVocab();
    assert.equal(list.length, 1);
    assert.equal(list[0].term, "before");
  });

  test("restoreVocabList cũng đi qua withVocabLock — chạy đồng thời với addVocab không làm mất dữ liệu của nhau", async () => {
    const local = loadFiles(["shared/vocab.js"]);
    await local.addVocab({ term: "keep-a" });
    await local.addVocab({ term: "keep-b" });
    const snapshot = await local.getVocab();
    await Promise.all([
      local.restoreVocabList(snapshot),
      local.addVocab({ term: "concurrent-new" }),
    ]);
    // Kết quả phụ thuộc thứ tự hàng đợi, nhưng QUAN TRỌNG là không được văng lỗi
    // và danh sách cuối cùng phải là MỘT trong hai trạng thái hợp lệ, không rác/hỏng.
    const list = await local.getVocab();
    assert.ok(list.length === 2 || list.length === 3, `danh sách sau khi ghi đồng thời bị hỏng, length=${list.length}`);
  });
});
