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

const ctx = loadFiles(["vocab.js"]);

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
