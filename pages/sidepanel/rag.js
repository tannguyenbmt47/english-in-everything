// ============================================================
// rag.js — Kho tri thức (vector store) cho Hỏi đáp kiểu RAG.
// Vector (embedding) lưu trong IndexedDB; metadata nguồn lưu ở chrome.storage.
// Truy hồi bằng độ tương đồng cosine.
// ============================================================

const RAG_DB = "pvt-rag";
const RAG_STORE = "chunks";
const RAG_META_KEY = "ragSources";

function ragDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(RAG_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(RAG_STORE)) {
        const os = db.createObjectStore(RAG_STORE, { keyPath: "id", autoIncrement: true });
        os.createIndex("source", "source", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// Thêm nhiều đoạn: items = [{ source, text, embedding }]
async function ragAddChunks(source, texts, embeddings) {
  const db = await ragDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(RAG_STORE, "readwrite");
    const os = tx.objectStore(RAG_STORE);
    texts.forEach((text, i) => os.add({ source, text, embedding: embeddings[i] }));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  // Cập nhật metadata nguồn.
  const meta = await getRagSources();
  const existing = meta.find((m) => m.name === source);
  if (existing) existing.count += texts.length;
  else meta.unshift({ name: source, count: texts.length, addedAt: Date.now() });
  await chrome.storage.local.set({ [RAG_META_KEY]: meta });
}

async function getRagSources() {
  const r = await chrome.storage.local.get(RAG_META_KEY);
  return r[RAG_META_KEY] || [];
}

async function ragCount() {
  const sources = await getRagSources();
  return sources.reduce((s, m) => s + m.count, 0);
}

async function ragAllChunks() {
  const db = await ragDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RAG_STORE, "readonly");
    const rq = tx.objectStore(RAG_STORE).getAll();
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
}

async function ragRemoveSource(source) {
  const db = await ragDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(RAG_STORE, "readwrite");
    const idx = tx.objectStore(RAG_STORE).index("source");
    const rq = idx.openCursor(IDBKeyRange.only(source));
    rq.onsuccess = () => {
      const cur = rq.result;
      if (cur) { cur.delete(); cur.continue(); }
    };
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  const meta = (await getRagSources()).filter((m) => m.name !== source);
  await chrome.storage.local.set({ [RAG_META_KEY]: meta });
}

async function ragClear() {
  const db = await ragDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(RAG_STORE, "readwrite");
    tx.objectStore(RAG_STORE).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  await chrome.storage.local.set({ [RAG_META_KEY]: [] });
}

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

// Truy hồi top-k đoạn gần nhất với vector câu hỏi.
async function ragSearch(queryEmbedding, k = 6) {
  const all = await ragAllChunks();
  const scored = all.map((c) => ({
    source: c.source,
    text: c.text,
    score: cosineSim(queryEmbedding, c.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k);
}
