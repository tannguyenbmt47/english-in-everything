// ============================================================
// cache.js — Cache bản dịch để tránh gọi API dịch lại. Tự hết hạn sau 3 tuần.
// Lưu trong chrome.storage.local với khóa tiền tố "trc:". Dùng chung cho
// sidepanel (thẻ <script>) và background (importScripts).
// ============================================================

const TR_CACHE_PREFIX = "trc:";
const TR_CACHE_TTL = 21 * 24 * 60 * 60 * 1000; // 21 ngày (mặc định: bản dịch)

// Nghĩa của một từ và phần phân biệt hai từ thì không đổi theo thời gian, nên giữ
// lâu hơn nhiều — mỗi lần hết hạn là một lần trả tiền API cho đúng câu trả lời cũ.
const TR_CACHE_TTL_BY_NS = { mean: 365, cmp: 365 };
function trTtl(ns) {
  return (TR_CACHE_TTL_BY_NS[ns] || 0) * 24 * 60 * 60 * 1000 || TR_CACHE_TTL;
}
function trNsOf(key) {
  return key.slice(TR_CACHE_PREFIX.length).split(":")[0];
}

// Hai hàm băm khác seed để khóa gần như không đụng độ (không cần lưu cả nguồn).
function trHash(str, seed) {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
function trKey(ns, model, prompt, text, extra) {
  const material = [model || "", prompt || "", extra || "", text || ""].join("␟");
  return `${TR_CACHE_PREFIX}${ns}:${text.length}-${trHash(material, 0x811c9dc5)}-${trHash(material, 0x27d4eb2f)}`;
}

async function trCacheGet(ns, model, prompt, text, extra) {
  if (!text) return null;
  const key = trKey(ns, model, prompt, text, extra);
  const r = await chrome.storage.local.get(key);
  const v = r[key];
  if (!v) return null;
  if (Date.now() - v.ts > trTtl(ns)) { chrome.storage.local.remove(key); return null; }
  return v.t;
}

async function trCacheSet(ns, model, prompt, text, extra, translated) {
  if (!text || !translated) return;
  const key = trKey(ns, model, prompt, text, extra);
  await chrome.storage.local.set({ [key]: { t: translated, ts: Date.now() } });
}

// Xóa các mục cache đã quá hạn (gọi khi khởi động).
async function trCachePurge() {
  try {
    const all = await chrome.storage.local.get(null);
    const now = Date.now();
    const stale = [];
    for (const k in all) {
      if (k.startsWith(TR_CACHE_PREFIX) && all[k] && now - all[k].ts > trTtl(trNsOf(k))) stale.push(k);
    }
    if (stale.length) await chrome.storage.local.remove(stale);
  } catch (e) {
    console.error("trCachePurge:", e);
  }
}
