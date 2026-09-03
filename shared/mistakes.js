// ============================================================
// mistakes.js — SỔ LỖI SAI: câu ngữ pháp/IELTS trả lời sai được lưu lại
// và đưa ra kiểm tra lại vào những ngày sau cho tới khi thuộc.
// (todayStr() dùng chung từ vocab.js)
// ============================================================

const MISTAKES_KEY = "mistakes";
// Đúng liên tiếp bao nhiêu lần thì coi như đã thuộc và bỏ khỏi sổ lỗi.
const MISTAKE_MASTER_STREAK = 3;
// Khoảng cách ôn lại theo số lần đúng liên tiếp (ngày).
const MISTAKE_GAPS = [1, 3, 7];

function mistakeId(q) {
  let h = 0x811c9dc5;
  const s = String(q);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
function dayOffsetStr(days) {
  const d = new Date(Date.now() + days * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function getMistakes() {
  const r = await chrome.storage.local.get(MISTAKES_KEY);
  return r[MISTAKES_KEY] || [];
}
async function saveMistakes(list) {
  await chrome.storage.local.set({ [MISTAKES_KEY]: list });
}

// Lưu một câu vừa trả lời sai. item = { q, o, a, e }, kind = "grammar" | "ielts".
async function addMistake(item, kind) {
  if (!item || !item.q || !Array.isArray(item.o)) return;
  const list = await getMistakes();
  const id = mistakeId(item.q);
  const existing = list.find((m) => m.id === id);
  if (existing) {
    // Sai lại -> về đầu, mai kiểm tra tiếp.
    existing.streak = 0;
    existing.wrongCount = (existing.wrongCount || 1) + 1;
    existing.due = dayOffsetStr(1);
    existing.lastWrongAt = Date.now();
  } else {
    list.unshift({
      id,
      q: item.q,
      o: item.o,
      a: item.a,
      e: item.e || "",
      hint: item.hint || "", // gợi ý quy tắc ngữ pháp — giữ lại để ôn lại vẫn thấy
      kind: kind || "grammar",
      streak: 0,
      wrongCount: 1,
      due: dayOffsetStr(1), // BỮA SAU kiểm tra lại
      addedAt: Date.now(),
      lastWrongAt: Date.now(),
    });
  }
  await saveMistakes(list);
}

// Ghi nhận kết quả khi ôn lại một câu trong sổ lỗi.
async function markMistakeResult(id, correct) {
  const list = await getMistakes();
  const m = list.find((x) => x.id === id);
  if (!m) return list;
  if (correct) {
    m.streak = (m.streak || 0) + 1;
    if (m.streak >= MISTAKE_MASTER_STREAK) {
      // Đã thuộc -> bỏ khỏi sổ lỗi.
      await saveMistakes(list.filter((x) => x.id !== id));
      return;
    }
    m.due = dayOffsetStr(MISTAKE_GAPS[Math.min(m.streak, MISTAKE_GAPS.length - 1)]);
  } else {
    m.streak = 0;
    m.wrongCount = (m.wrongCount || 1) + 1;
    m.due = dayOffsetStr(1);
    m.lastWrongAt = Date.now();
  }
  await saveMistakes(list);
}

// Các câu đến hạn ôn lại (due <= hôm nay).
async function dueMistakes(kind) {
  const today = todayStr();
  return (await getMistakes()).filter(
    (m) => (m.due || "") <= today && (!kind || m.kind === kind)
  );
}

async function removeMistake(id) {
  await saveMistakes((await getMistakes()).filter((m) => m.id !== id));
}
