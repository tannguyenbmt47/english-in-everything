// ============================================================
// tts.js — Phát âm tiếng Anh dùng chung cho sidepanel VÀ gate (màn chặn học).
// Trước đây các hàm này nằm trong sidepanel.js nên gate.js không gọi được —
// tách ra đây để cổng học cũng dùng được cho câu hỏi "Nghe & gõ lại".
//
// KHÔNG phụ thuộc setStatus() (chỉ có ở sidepanel.js): lỗi báo qua ttsOnError,
// mỗi trang tự gán hook phù hợp với UI của mình (sidepanel gán setStatus, gate
// giữ mặc định console.warn — im lặng để không làm rối phiên học).
// ============================================================

let ttsOnError = (msg) => console.warn("TTS:", msg);

// Ưu tiên audio thật từ từ điển; không có thì giọng trình duyệt; nếu trình duyệt
// chặn (Brave Shields) hoặc máy không có giọng tiếng Anh -> dùng TTS của OpenAI.
async function playAudio(url, fallbackText) {
  if (url) {
    try {
      await new Audio(url).play();
      return;
    } catch { /* rơi xuống TTS */ }
  }
  await speakEn(fallbackText);
}

// Chờ danh sách giọng nạp xong (lần gọi đầu thường rỗng).
function loadVoices() {
  return new Promise((resolve) => {
    const now = speechSynthesis.getVoices();
    if (now && now.length) return resolve(now);
    const timer = setTimeout(() => resolve(speechSynthesis.getVoices() || []), 1200);
    speechSynthesis.addEventListener(
      "voiceschanged",
      () => { clearTimeout(timer); resolve(speechSynthesis.getVoices() || []); },
      { once: true }
    );
  });
}

function speakBrowser(text) {
  return new Promise(async (resolve, reject) => {
    if (!("speechSynthesis" in window)) return reject(new Error("Trình duyệt không hỗ trợ giọng máy."));
    const voices = await loadVoices();
    const en = voices.filter((v) => /^en/i.test(v.lang));
    if (!voices.length) return reject(new Error("Không có giọng đọc nào (có thể bị Brave Shields chặn)."));
    if (!en.length) return reject(new Error("Máy chưa cài giọng tiếng Anh."));

    try { if (speechSynthesis.speaking) speechSynthesis.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(String(text));
    u.voice = en[0];
    u.lang = en[0].lang || "en-US";
    u.rate = 0.9;
    let started = false;
    u.onstart = () => { started = true; };
    u.onend = () => resolve();
    u.onerror = (e) => reject(new Error("Giọng máy lỗi: " + (e.error || "không rõ")));
    speechSynthesis.speak(u);
    // Không phát ra tiếng sau 1.5s -> coi như bị chặn.
    setTimeout(() => { if (!started) reject(new Error("Trình duyệt không phát được giọng máy.")); }, 1500);
  });
}

// TTS qua API (dùng chính API key đã cấu hình).
async function speakOpenAI(text, cfg) {
  const res = await fetch(`${cfg.baseUrl}/audio/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.apiKey}` },
    body: JSON.stringify({
      model: cfg.ttsModel || "tts-1",
      voice: cfg.ttsVoice || "alloy",
      input: String(text).slice(0, 500),
    }),
  });
  if (!res.ok) {
    let d = "";
    try { d = (await res.json())?.error?.message; } catch {}
    throw new Error(`TTS API ${res.status}: ${d || res.statusText}`);
  }
  const blobUrl = URL.createObjectURL(await res.blob());
  const audio = new Audio(blobUrl);
  audio.onended = () => URL.revokeObjectURL(blobUrl);
  await audio.play();
}

async function speakEn(text) {
  if (!text) return;
  const cfg = await getConfig();
  const provider = cfg.ttsProvider || "auto";

  if (provider !== "openai") {
    try {
      await speakBrowser(text);
      return;
    } catch (err) {
      if (provider === "browser") {
        ttsOnError("🔇 " + err.message + " → Thử tắt Brave Shields cho trang này, hoặc đổi TTS sang OpenAI trong ⚙️.");
        return;
      }
      console.warn("TTS trình duyệt lỗi, chuyển sang OpenAI:", err.message);
    }
  }

  if (!cfg.apiKey) {
    ttsOnError("🔇 Không phát âm được: trình duyệt chặn giọng máy và chưa có API key cho TTS (⚙️).");
    return;
  }
  try {
    await speakOpenAI(text, cfg);
  } catch (err) {
    ttsOnError("🔇 Không phát âm được: " + err.message);
  }
}
