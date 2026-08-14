// ============================================================
// restore-once.js — Nạp lại dữ liệu từ backup/ đúng MỘT lần khi service worker
// khởi động. Dùng sau sự cố 02/08/2026: ổ đĩa đổi mount (/media/tan/F →
// /media/tan/F1) làm extension ID đổi theo, storage cũ thành mồ côi.
// Đã chạy xong thì gỡ file này khỏi importScripts trong background.js.
// ============================================================

const RESTORE_FLAG = "restoreDone:2026-08-02";
const RESTORE_FILE = "backup/storage-backup-2026-08-02.json";

async function restoreOnce() {
  try {
    const flag = await chrome.storage.local.get(RESTORE_FLAG);
    if (flag[RESTORE_FLAG]) return;

    const res = await fetch(chrome.runtime.getURL(RESTORE_FILE));
    if (!res.ok) throw new Error(`không đọc được ${RESTORE_FILE} (HTTP ${res.status})`);
    const data = await res.json();

    // Giữ API key hiện tại nếu đang có (có thể mới hơn key trong backup).
    const cur = await chrome.storage.local.get("apiKey");
    if (cur.apiKey) data.apiKey = cur.apiKey;

    await chrome.storage.local.set({ ...data, [RESTORE_FLAG]: Date.now() });

    const n = (k) => (Array.isArray(data[k]) ? data[k].length : 0);
    console.log(
      `restoreOnce: đã khôi phục ${Object.keys(data).length} khóa — ` +
        `vocab ${n("vocab")}, mistakes ${n("mistakes")}, ` +
        `journal ${n("journal")}, todos ${n("todos")}, notes ${n("notes")}`
    );
  } catch (e) {
    console.error("restoreOnce:", e);
  }
}

restoreOnce();
