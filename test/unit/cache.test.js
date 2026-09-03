// ============================================================
// cache.test.js — cache.js: khóa cache theo namespace và TTL riêng từng loại.
// Đụng độ khóa = trả về BẢN DỊCH CỦA MỘT ĐOẠN KHÁC, im lặng, người dùng tưởng
// model dịch sai. TTL sai = hoặc dịch lại tốn tiền, hoặc trả nghĩa đã lỗi thời.
// ============================================================
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");
const { loadFiles } = require("../helpers/sandbox.js");

const ctx = loadFiles(["shared/cache.js"]);

describe("trKey — khóa cache", () => {
  test("cùng input -> cùng khóa (ổn định)", () => {
    const k1 = ctx.trKey("mean", "gpt-4o-mini", "prompt", "deteriorate", "ctx");
    const k2 = ctx.trKey("mean", "gpt-4o-mini", "prompt", "deteriorate", "ctx");
    assert.equal(k1, k2);
  });
  test("đổi model/prompt/text/extra/namespace -> khóa khác đi", () => {
    const base = ctx.trKey("mean", "gpt-4o-mini", "prompt", "deteriorate", "ctx");
    assert.notEqual(ctx.trKey("mean", "gpt-4o", "prompt", "deteriorate", "ctx"), base);
    assert.notEqual(ctx.trKey("mean", "gpt-4o-mini", "prompt v2", "deteriorate", "ctx"), base);
    assert.notEqual(ctx.trKey("mean", "gpt-4o-mini", "prompt", "diminish", "ctx"), base);
    assert.notEqual(ctx.trKey("mean", "gpt-4o-mini", "prompt", "deteriorate", "ctx khác"), base);
    assert.notEqual(ctx.trKey("cmp", "gpt-4o-mini", "prompt", "deteriorate", "ctx"), base);
  });
  test("không đụng độ trên 20.000 chuỗi khác nhau", () => {
    const seen = new Set();
    for (let i = 0; i < 20000; i++) {
      const k = ctx.trKey("mean", "m", "p", "từ số " + i, "");
      assert.ok(!seen.has(k), `đụng độ tại i=${i}: ${k}`);
      seen.add(k);
    }
  });
  test("trNsOf lấy lại đúng namespace từ khóa", () => {
    const k = ctx.trKey("cmp", "m", "p", "a|b", "");
    assert.equal(ctx.trNsOf(k), "cmp");
  });
});

describe("trTtl — TTL riêng theo namespace (SỬA LỖI: nghĩa từ từng bị hết hạn theo TTL bản dịch 21 ngày)", () => {
  test("nghĩa từ (mean) và phân biệt cặp từ (cmp) giữ 365 ngày", () => {
    assert.equal(ctx.trTtl("mean"), 365 * 24 * 60 * 60 * 1000);
    assert.equal(ctx.trTtl("cmp"), 365 * 24 * 60 * 60 * 1000);
  });
  test("bản dịch đoạn văn (plain/seg) vẫn giữ TTL mặc định 21 ngày", () => {
    assert.equal(ctx.trTtl("plain"), 21 * 24 * 60 * 60 * 1000);
    assert.equal(ctx.trTtl("seg"), 21 * 24 * 60 * 60 * 1000);
  });
});

describe("trCacheGet/trCacheSet — vòng đời cache thật (chrome.storage giả lập bằng Map)", () => {
  test("set rồi get trong hạn -> lấy lại đúng giá trị đã lưu", async () => {
    await ctx.trCacheSet("mean", "gpt-4o-mini", "p", "deteriorate", "ctx", "xấu đi");
    const got = await ctx.trCacheGet("mean", "gpt-4o-mini", "p", "deteriorate", "ctx");
    assert.equal(got, "xấu đi");
  });

  test("get với text/context KHÁC -> cache miss (trả về null), không lẫn sang bản dịch của đoạn khác", async () => {
    await ctx.trCacheSet("mean", "gpt-4o-mini", "p", "sink", "ngữ cảnh A", "chìm");
    const missByText = await ctx.trCacheGet("mean", "gpt-4o-mini", "p", "swim", "ngữ cảnh A");
    const missByContext = await ctx.trCacheGet("mean", "gpt-4o-mini", "p", "sink", "ngữ cảnh B");
    assert.equal(missByText, null);
    assert.equal(missByContext, null);
  });

  test("mục đã hết hạn (TTL) -> trCacheGet trả về null dù dữ liệu còn trong storage", async () => {
    const key = ctx.trKey("plain", "m", "p", "expired text", "");
    await ctx.chrome.storage.local.set({
      [key]: { t: "bản dịch cũ", ts: Date.now() - 22 * 24 * 60 * 60 * 1000 }, // 22 ngày trước, TTL plain=21 ngày
    });
    const got = await ctx.trCacheGet("plain", "m", "p", "expired text", "");
    assert.equal(got, null);
  });
});
