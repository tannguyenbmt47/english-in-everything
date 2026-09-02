// ============================================================
// sandbox.js — Nạp mã nguồn extension (script thuần, không module) vào một
// V8 context giả lập trình duyệt, để test được HÀM THẬT thay vì hàm chép lại.
//
// Các file trong extension chia sẻ scope toàn cục qua nhiều thẻ <script> (xem
// gate.html/sidepanel.html) — loadFiles() mô phỏng đúng cơ chế đó: nạp tuần tự
// nhiều file vào MỘT context, các hàm ở file sau gọi được hàm/biến của file
// trước, y hệt lúc chạy thật trong trình duyệt.
// ============================================================
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..", "..");

// Đối tượng "không bao giờ ném lỗi": mọi thuộc tính đọc ra đều tự sinh thêm
// một deepStub() khác, gọi được như hàm, gán được thuộc tính. Đủ để các file
// executeChương gọi document.getElementById(...).classList.add(...), v.v. ở
// TOP-LEVEL (ngoài mọi hàm — chạy ngay lúc nạp file) mà không vỡ.
function deepStub() {
  const fn = function () { return deepStub(); };
  return new Proxy(fn, {
    get(target, prop) {
      if (prop === "then" || prop === Symbol.toPrimitive || prop === "toJSON" || prop === "constructor") return undefined;
      if (prop === Symbol.iterator) return function* () {};
      if (!(prop in target)) target[prop] = deepStub();
      return target[prop];
    },
    set(target, prop, value) { target[prop] = value; return true; },
    apply() { return deepStub(); },
    construct() { return deepStub(); },
    has() { return true; },
  });
}

// chrome.storage.local THẬT, lưu trong Map — dùng cho test cần hành vi lưu trữ
// thật (cache TTL, vòng đời SM-2 addVocab/reviewVocab...). Các API chrome khác
// (tabs, alarms, notifications, runtime.sendMessage) dùng deepStub vì các bài
// test không đụng tới chúng.
function makeStorage() {
  const store = new Map();
  return {
    async get(keys) {
      if (keys == null) { const out = {}; for (const [k, v] of store) out[k] = structuredClone(v); return out; }
      const list = Array.isArray(keys) ? keys : typeof keys === "string" ? [keys] : Object.keys(keys);
      const out = {};
      for (const k of list) {
        if (store.has(k)) out[k] = structuredClone(store.get(k));
        else if (keys && typeof keys === "object" && !Array.isArray(keys)) out[k] = keys[k];
      }
      return out;
    },
    async set(obj) { for (const k in obj) store.set(k, structuredClone(obj[k])); },
    async remove(keys) { for (const k of Array.isArray(keys) ? keys : [keys]) store.delete(k); },
    _store: store, // để test seed/kiểm tra trực tiếp
  };
}

function makeChrome() {
  const chrome = deepStub();
  const storage = { local: makeStorage(), onChanged: { addListener() {}, removeListener() {} } };
  Object.defineProperty(chrome, "storage", { value: storage, configurable: true });
  Object.defineProperty(chrome, "runtime", {
    value: Object.assign(deepStub(), {
      id: "test-extension-id",
      getURL: (p) => "chrome-extension://test/" + p,
      sendMessage: async () => ({ ok: false }),
      onMessage: { addListener() {} },
    }),
    configurable: true,
  });
  return chrome;
}

// document.getElementById trả về CÙNG MỘT stub cho cùng một id (để code gán
// thuộc tính ở một chỗ, đọc lại ở chỗ khác trong cùng file vẫn thấy giá trị đó).
function makeDocumentStub() {
  const cache = new Map();
  const doc = deepStub();
  const stubEl = () => deepStub();
  Object.defineProperty(doc, "getElementById", {
    value: (id) => { if (!cache.has(id)) cache.set(id, stubEl()); return cache.get(id); },
    configurable: true,
  });
  Object.defineProperty(doc, "createElement", { value: () => stubEl(), configurable: true });
  Object.defineProperty(doc, "createElementNS", { value: () => stubEl(), configurable: true });
  Object.defineProperty(doc, "addEventListener", { value: () => {}, configurable: true });
  Object.defineProperty(doc, "removeEventListener", { value: () => {}, configurable: true });
  Object.defineProperty(doc, "body", { value: stubEl(), configurable: true });
  Object.defineProperty(doc, "documentElement", { value: stubEl(), configurable: true });
  return doc;
}

// Nạp NHIỀU file vào MỘT context dùng chung, đúng thứ tự truyền vào — mô phỏng
// nhiều thẻ <script> trong gate.html/sidepanel.html. Trả về context: mọi hàm
// top-level của các file đã nạp truy cập được như property của nó (vd
// ctx.editDistance, ctx.reviewVocabSM2...).
function loadFiles(files, { chrome, url } = {}) {
  const search = url ? new URL(url).search : "";
  const sandbox = {
    console,
    chrome: chrome || makeChrome(),
    document: makeDocumentStub(),
    location: { search, href: url || "https://example.test/gate.html" },
    navigator: { clipboard: { writeText: async () => {} } },
    URL, URLSearchParams, Promise, Date, Math, JSON, Map, Set, WeakMap, RegExp,
    Array, Object, String, Number, Boolean, Symbol, Error, TypeError,
    setTimeout, clearTimeout, setInterval, clearInterval, structuredClone,
    fetch: async () => { throw new Error("fetch không khả dụng trong sandbox test"); },
    confirm: () => true,
    prompt: () => "",
    alert: () => {},
    importScripts: () => {}, // background.js gọi ở top-level; test tự nạp theo đúng thứ tự nên bỏ qua
  };
  const ctx = vm.createContext(sandbox);
  ctx.window = ctx;
  ctx.self = ctx;
  ctx.globalThis = ctx;
  ctx.top = ctx; // window.top === window.self -> gate.js coi là KHÔNG bị nhúng iframe
  // Vài API window.* được gọi trực tiếp (không qua document) trong gate.js/content.js.
  ctx.scrollTo = () => {};
  ctx.scrollX = 0; ctx.scrollY = 0;
  ctx.innerWidth = 1280; ctx.innerHeight = 800;
  // sidepanel.js đọc pdfjsLib ngay ở dòng đầu tiên (cấu hình worker). Test
  // không cần pdf.js thật (320KB, không liên quan tới các hàm đang kiểm) nên
  // stub thẳng thay vì nạp lib/pdf.min.js mỗi lần chạy test.
  ctx.pdfjsLib = deepStub();
  ctx.getSelection = () => ({
    toString: () => "", rangeCount: 0, anchorNode: null,
    getRangeAt: () => ({ getBoundingClientRect: () => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }) }),
  });
  for (const rel of files) {
    const code = fs.readFileSync(path.join(ROOT, rel), "utf8");
    new vm.Script(code, { filename: rel }).runInContext(ctx);
  }
  return ctx;
}

// LƯU Ý khi viết test: mảng/object được TẠO RA bên trong mã đang chạy trong vm
// context (vd out.push() trong một vòng lặp của hàm đó) mang prototype của
// REALM đó, không phải realm của file test. assert.deepStrictEqual (bao gồm cả
// assert/strict.deepEqual) coi khác prototype là KHÔNG bằng nhau dù dữ liệu
// giống hệt ("same structure but not reference-equal"). Round-trip qua
// JSON.parse(JSON.stringify(x)) trước khi so để đưa cả hai vế về cùng realm.
// (Không cần làm vậy nếu giá trị trả về là PRIMITIVE, hoặc là một mảng được
// .filter()/.map() TRỰC TIẾP từ một mảng do chính file test tạo ra — khi đó kết
// quả kế thừa realm của mảng gốc, không phải realm của hàm đang gọi.)
module.exports = { loadFiles, makeChrome, makeStorage, deepStub, ROOT };
