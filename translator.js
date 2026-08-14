// ============================================================
// Chunking THEO NGỮ NGHĨA cho paper học thuật.
// Nguyên tắc:
//  - KHÔNG BAO GIỜ cắt giữa một câu.
//  - Ưu tiên cắt tại ranh giới đoạn văn (blank line) và tiêu đề mục.
//  - Một tiêu đề mục (heading) mở đầu một chunk mới và đi kèm nội dung của nó.
//  - Đoạn nào tự nó quá dài mới cắt theo câu (không cắt giữa câu).
//  - Truyền phần cuối của chunk trước làm NGỮ CẢNH (không dịch lại) để giữ
//    thuật ngữ, đại từ và mạch văn nhất quán giữa các chunk.
// ============================================================

const TARGET_CHARS = 5500; // kích thước mong muốn mỗi chunk
const MAX_CHARS = 8500;    // ngưỡng cứng
const MIN_CHUNK = 400;     // không chốt chunk khi nội dung còn quá ít (vd chỉ có tiêu đề)
const CONTEXT_CHARS = 600; // độ dài ngữ cảnh lấy từ chunk trước

// Nhận diện dòng tiêu đề mục của paper.
function isHeading(line) {
  const s = line.trim();
  if (!s || s.length > 90) return false;
  // "1 Introduction", "2.3 Related Work", "3.1.2 ..."
  if (/^\d+(\.\d+)*\.?\s+\S/.test(s) && s.length < 90) return true;
  // Các mục quen thuộc (kể cả không đánh số)
  if (/^(abstract|introduction|related work|background|method(s|ology)?|approach|experiments?|results?|discussion|conclusions?|references|acknowledge?ments?|appendix|preliminaries|evaluation|limitations)\b/i.test(s))
    return true;
  // Dòng ngắn viết HOA phần lớn (kiểu tiêu đề)
  const letters = s.replace(/[^A-Za-z]/g, "");
  if (letters.length >= 3 && letters === letters.toUpperCase() && s.split(/\s+/).length <= 8)
    return true;
  return false;
}

// Tách một đoạn quá dài thành các mảnh <= MAX_CHARS theo ranh giới CÂU.
function splitParagraphBySentence(para) {
  const sentences = para.match(/[^.!?…]+(?:[.!?…]+["')\]]*|\s*$)/g) || [para];
  const out = [];
  let buf = "";
  for (const sRaw of sentences) {
    const s = sRaw;
    if (buf && (buf + s).length > MAX_CHARS) {
      out.push(buf.trim());
      buf = s;
    } else {
      buf += s;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

// Tạo danh sách chunk ngữ nghĩa từ toàn văn tài liệu.
// Trả về: [{ text, heading }]
function buildSemanticChunks(fullText) {
  const paras = fullText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let cur = "";
  let curHeading = "";

  const flush = () => {
    if (cur.trim()) chunks.push({ text: cur.trim(), heading: curHeading });
    cur = "";
    curHeading = "";
  };

  for (let i = 0; i < paras.length; i++) {
    const para = paras[i];
    const heading = isHeading(para);

    // Gặp tiêu đề mục -> bắt đầu chunk mới (nếu chunk hiện tại đã có nội dung).
    if (heading && cur.trim()) flush();
    if (heading && !curHeading) curHeading = para;

    // Đoạn đơn lẻ quá dài -> cắt theo câu.
    if (para.length > MAX_CHARS) {
      if (cur.trim()) flush();
      for (const piece of splitParagraphBySentence(para)) {
        chunks.push({ text: piece, heading: "" });
      }
      continue;
    }

    // Nếu thêm đoạn này vượt TARGET -> chốt chunk hiện tại trước.
    // Nhưng KHÔNG chốt khi chunk hiện tại còn quá ít (vd mới chỉ có tiêu đề mục),
    // để tiêu đề luôn dính với nội dung theo sau.
    if (cur && cur.length > MIN_CHUNK && (cur + "\n\n" + para).length > TARGET_CHARS) {
      flush();
      if (heading) curHeading = para;
    }
    cur += (cur ? "\n\n" : "") + para;
  }
  flush();

  return chunks.length ? chunks : [{ text: fullText.trim(), heading: "" }];
}

// Lấy ~CONTEXT_CHARS ký tự cuối của một text, cắt gọn theo ranh giới câu.
function tailContext(text) {
  if (!text) return "";
  let tail = text.slice(-CONTEXT_CHARS);
  const dot = tail.search(/[.!?…]\s/);
  if (dot > -1 && dot < tail.length - 2) tail = tail.slice(dot + 2);
  return tail.trim();
}

// ============================================================
// Gọi API OpenAI (chat completions) có streaming.
// ============================================================
async function streamChat({ config, messages, signal, onDelta }) {
  const url = `${config.baseUrl}/chat/completions`;
  const body = { model: config.model, stream: true, messages };
  // Các model dòng "o" (o1/o3/o4...) không chấp nhận tham số temperature.
  if (!/^o\d/i.test(config.model)) body.temperature = config.temperature;

  const res = await fetch(url, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error?.message || JSON.stringify(j);
    } catch {
      detail = await res.text().catch(() => "");
    }
    throw new Error(`Lỗi API ${res.status}: ${detail || res.statusText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop();
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const delta = json.choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch {
        /* bỏ qua dòng không parse được */
      }
    }
  }
}

// Gọi chat completion KHÔNG streaming, trả về chuỗi kết quả. Dùng cho các thao
// tác ngắn: dịch đoạn bôi đen, tra nghĩa từ vựng.
async function chatOnce({ config, messages, signal }) {
  const post = (body) =>
    fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(body),
    });

  const body = { model: config.model, messages };
  if (!/^o\d/i.test(config.model)) body.temperature = config.temperature;

  let res = await post(body);
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = j?.error?.message || JSON.stringify(j);
    } catch {
      detail = await res.text().catch(() => "");
    }
    // Một số model (dòng reasoning / GPT-5) không nhận "temperature" -> thử lại không kèm.
    if ("temperature" in body && /temperature/i.test(detail || "")) {
      delete body.temperature;
      res = await post(body);
      if (!res.ok) {
        let d2 = "";
        try { d2 = (await res.json())?.error?.message; } catch {}
        throw new Error(`Lỗi API ${res.status}: ${d2 || res.statusText}`);
      }
    } else {
      throw new Error(`Lỗi API ${res.status}: ${detail || res.statusText}`);
    }
  }
  const json = await res.json();
  return (json.choices?.[0]?.message?.content || "").trim();
}

// Dịch nhanh một đoạn văn bản ngắn (bôi đen) sang tiếng Việt.
async function translatePlain({ config, text, signal }) {
  return chatOnce({
    config,
    signal,
    messages: [
      {
        role: "system",
        content: (config.translatePrompt || DEFAULT_TRANSLATE_PROMPT) + glossaryFor(text, config.glossary),
      },
      { role: "user", content: text },
    ],
  });
}

// Tra nghĩa tiếng Việt ngắn gọn cho một từ/cụm từ, có thể kèm ngữ cảnh.
async function lookupMeaning({ config, term, context, signal }) {
  let content = `Từ/cụm từ: "${term}"`;
  if (context) content += `\nNgữ cảnh trong câu: "${context}"`;
  return chatOnce({
    config,
    signal,
    messages: [
      { role: "system", content: config.lookupPrompt || DEFAULT_LOOKUP_PROMPT },
      { role: "user", content },
    ],
  });
}

// Cụm đi chung + câu ngữ cảnh cho từ TRỪU TƯỢNG (remuneration, cohesion,
// appraisal…). Nhóm này nhớ nghĩa tiếng Việt vẫn dùng sai, vì cái thiếu là biết
// nó ĐỨNG CẠNH TỪ NÀO. Gom nhiều từ vào một lượt gọi cho đỡ tốn.
// items: [{term, meaning}] -> Map(term -> {collocs:[], cloze, clozeVi}).
async function generateCollocations({ config, items, signal }) {
  const out = new Map();
  if (!items.length) return out;
  const text = await chatOnce({
    config,
    signal,
    messages: [
      {
        role: "system",
        content:
          "Bạn là giáo viên IELTS dạy từ vựng học thuật theo CỤM (collocation). Với mỗi từ được đánh số, trả về:\n" +
          '- "c": 3 cụm thông dụng nhất chứa nguyên từ đó, viết đầy đủ (vd với "remuneration": ["employee remuneration", "remuneration package", "competitive remuneration"]).\n' +
          '- "s": MỘT câu tiếng Anh tự nhiên trình độ IELTS 6.5-7.5 dùng từ đó trong ngữ cảnh học thuật/công việc, nhưng thay chính từ đó bằng "___" (giữ nguyên các từ còn lại của cụm).\n' +
          '- "v": bản dịch tiếng Việt của câu đó, chỗ trống cũng để "___".\n' +
          'Trả về DUY NHẤT một mảng JSON [{"i":số thứ tự,"c":["...","...","..."],"s":"...","v":"..."}]. Không thêm chữ nào ngoài JSON.',
      },
      {
        role: "user",
        content: items.map((it, i) => `${i + 1}. "${it.term}"${it.meaning ? ` — ${it.meaning}` : ""}`).join("\n"),
      },
    ],
  });
  for (const row of extractJsonArray(text)) {
    const it = items[Number(row?.i) - 1];
    if (!it) continue;
    const collocs = (Array.isArray(row.c) ? row.c : []).map((x) => String(x).trim()).filter(Boolean).slice(0, 3);
    const cloze = String(row?.s || "").trim();
    if (!collocs.length && !cloze) continue;
    out.set(it.term.toLowerCase(), { collocs, cloze, clozeVi: String(row?.v || "").trim() });
  }
  return out;
}

// Phân biệt hai từ hay bị nhầm với nhau (deteriorate vs diminish). Chỉ nói phần
// KHÁC NHAU — biết nghĩa rồi mà vẫn nhầm thì nhắc lại nghĩa cũng vô ích.
async function compareWords({ config, a, b, signal }) {
  return chatOnce({
    config,
    signal,
    messages: [
      {
        role: "system",
        content:
          "Bạn là giáo viên tiếng Anh. Người học đang nhầm hai từ với nhau. Viết đúng 3 dòng, mỗi dòng một ý, không đánh số:\n" +
          "Dòng 1 — <từ thứ nhất>: nét nghĩa cốt lõi + dùng khi nào (kèm một cụm đi chung điển hình).\n" +
          "Dòng 2 — <từ thứ hai>: tương tự, nêu bật điểm KHÁC với từ trên.\n" +
          "Dòng 3 — Mẹo phân biệt nhanh trong một câu.\n" +
          "Viết bằng tiếng Việt, ngắn gọn, đi thẳng vào khác biệt.",
      },
      { role: "user", content: `Hai từ dễ nhầm: "${a}" và "${b}".` },
    ],
  });
}

// Mẹo nhớ cho từ "cứng đầu" (sai quá nhiều lần): học thuộc kiểu cũ rõ ràng không
// vào, nên cần chỗ bám — gốc từ, liên tưởng âm/hình ảnh, một câu ví dụ.
async function generateMnemonic({ config, term, meaning, definition, signal }) {
  return chatOnce({
    config,
    signal,
    messages: [
      {
        role: "system",
        content:
          "Bạn là giáo viên tiếng Anh giúp người Việt ghi nhớ từ khó. Viết MẸO NHỚ ngắn gọn, đúng 3 dòng, mỗi dòng một ý, không đánh số:\n" +
          "Dòng 1 — Tách gốc từ: tiền tố/gốc/hậu tố và nghĩa của chúng (nếu từ không tách được thì nêu từ cùng họ hoặc từ gần giống dễ lẫn).\n" +
          "Dòng 2 — Liên tưởng: một hình ảnh hoặc âm thanh gợi nhớ, gần gũi với người Việt, càng cụ thể càng dễ nhớ.\n" +
          "Dòng 3 — Ví dụ: một câu tiếng Anh ngắn dùng đúng từ đó, kèm dịch tiếng Việt trong ngoặc.\n" +
          "Viết bằng tiếng Việt, không mở bài, không nhắc lại định nghĩa dài dòng.",
      },
      {
        role: "user",
        content: `Từ: "${term}"\nNghĩa tiếng Việt: ${meaning || "(chưa có)"}${definition ? `\nĐịnh nghĩa tiếng Anh: ${definition}` : ""}`,
      },
    ],
  });
}

// Tra nghĩa NHIỀU từ trong MỘT lượt gọi. Một phiên học có vài chục câu; gọi lẻ
// từng từ vừa tốn tiền vừa chậm, trong khi nội dung cần hỏi thì giống hệt nhau.
// items: [{term, context}] -> Map(term.toLowerCase() -> nghĩa).
async function lookupMeaningBatch({ config, items, signal }) {
  const out = new Map();
  if (!items.length) return out;
  const lines = items.map(
    (it, i) => `${i + 1}. "${it.term}"` + (it.context ? ` — trong câu: "${String(it.context).slice(0, 160)}"` : "")
  );
  const text = await chatOnce({
    config,
    signal,
    messages: [
      {
        role: "system",
        content:
          (config.lookupPrompt || DEFAULT_LOOKUP_PROMPT) +
          ' Người dùng gửi một DANH SÁCH đánh số. Tra TỪNG mục theo đúng yêu cầu trên và trả về DUY NHẤT một mảng JSON ' +
          '[{"i": số thứ tự, "m": "nghĩa tiếng Việt"}] đủ mọi mục, đúng thứ tự. Không thêm chữ nào ngoài JSON.',
      },
      { role: "user", content: lines.join("\n") },
    ],
  });
  for (const row of extractJsonArray(text)) {
    const it = items[Number(row?.i) - 1];
    const m = String(row?.m || "").trim();
    if (it && m) out.set(it.term.toLowerCase(), m);
  }
  return out;
}

// Tra Free Dictionary API (miễn phí, không cần key): phiên âm, audio, loại từ,
// định nghĩa & ví dụ tiếng Anh. Chỉ áp dụng cho MỘT từ tiếng Anh. Trả về null nếu không có.
async function fetchDictionary(word, signal) {
  const w = (word || "").trim().toLowerCase();
  if (!/^[a-z][a-z\-']{1,40}$/.test(w)) return null; // chỉ 1 từ tiếng Anh
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : null;
    if (!entry) return null;
    let phonetic = entry.phonetic || "";
    let audio = "";
    for (const p of entry.phonetics || []) {
      if (!phonetic && p.text) phonetic = p.text;
      if (!audio && p.audio) audio = p.audio;
    }
    if (audio.startsWith("//")) audio = "https:" + audio;
    const meanings = (entry.meanings || [])
      .map((m) => ({
        pos: m.partOfSpeech || "",
        definition: m.definitions?.[0]?.definition || "",
        example: m.definitions?.[0]?.example || "",
        synonyms: (m.synonyms || []).slice(0, 5),
      }))
      .filter((m) => m.definition);
    return { word: entry.word || w, phonetic, audio, meanings };
  } catch {
    return null;
  }
}

// Tạo embedding cho danh sách văn bản (dùng cho RAG). Trả về mảng vector.
async function embedTexts({ config, texts, signal, onProgress }) {
  const model = config.embedModel || "text-embedding-3-small";
  const out = [];
  const BATCH = 16;
  for (let i = 0; i < texts.length; i += BATCH) {
    const batch = texts.slice(i, i + BATCH);
    const res = await fetch(`${config.baseUrl}/embeddings`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({ model, input: batch }),
    });
    if (!res.ok) {
      let detail = "";
      try { detail = (await res.json())?.error?.message; } catch {}
      throw new Error(`Lỗi embedding ${res.status}: ${detail || res.statusText}`);
    }
    const json = await res.json();
    for (const d of json.data) out.push(d.embedding);
    if (onProgress) onProgress(Math.min(i + BATCH, texts.length), texts.length);
  }
  return out;
}

// Sinh danh sách từ vựng IELTS (JSON). Trả về mảng {word, ipa, pos, meaning_vi, definition_en, example}.
function extractJsonArray(s) {
  let t = String(s).trim().replace(/^```[a-z]*\s*/i, "").replace(/```$/,"").trim();
  const a = t.indexOf("[");
  const b = t.lastIndexOf("]");
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return []; }
}

// kind: "word" (mặc định) | "collocation" | "idiom" | "proverb"
async function generateIeltsWords({ config, count, topic, exclude, kind, signal }) {
  const sys = config.ieltsPrompt || DEFAULT_IELTS_PROMPT;
  const K = {
    collocation: {
      what: "COLLOCATION (cụm từ đi với nhau tự nhiên, hay dùng trong Writing/Speaking IELTS, vd 'make a decision', 'heavy rain', 'take into account')",
      wordDesc: "cả cụm collocation tiếng Anh",
    },
    idiom: {
      what: "THÀNH NGỮ (idiom) tiếng Anh thông dụng (vd 'a piece of cake', 'hit the nail on the head')",
      wordDesc: "cả câu/cụm thành ngữ",
    },
    proverb: {
      what: "TỤC NGỮ / câu nói hay gặp (proverb, vd 'Actions speak louder than words')",
      wordDesc: "cả câu tục ngữ",
    },
  }[kind];

  let user;
  if (K) {
    user =
      `Tạo ${count} ${K.what}` +
      (topic && topic !== "Ngẫu nhiên" ? ` liên quan chủ đề "${topic}"` : "") +
      `. Trả về DUY NHẤT một mảng JSON, mỗi phần tử: ` +
      `{"word": ${K.wordDesc}, "ipa": "", "pos": "${kind}", ` +
      `"meaning_vi": nghĩa tiếng Việt ngắn gọn, "definition_en": giải thích/nghĩa bằng tiếng Anh, "example": câu ví dụ tiếng Anh dùng cụm đó}. ` +
      `Không lặp lại. Không thêm chữ nào ngoài JSON.`;
  } else {
    user =
      `Tạo ${count} từ vựng tiếng Anh trình độ IELTS` +
      (topic && topic !== "Ngẫu nhiên" ? ` thuộc chủ đề "${topic}"` : "") +
      `. Trả về DUY NHẤT một mảng JSON, mỗi phần tử gồm: ` +
      `{"word": từ tiếng Anh, "ipa": phiên âm IPA, "pos": loại từ (noun/verb/adj/adv), ` +
      `"meaning_vi": nghĩa tiếng Việt ngắn gọn, "definition_en": định nghĩa tiếng Anh ngắn, "example": câu ví dụ tiếng Anh}. ` +
      `Không lặp lại từ. Không thêm chữ nào ngoài JSON.`;
  }
  if (exclude && exclude.length) user += `\nTránh các mục đã có: ${exclude.slice(0, 200).join(", ")}.`;

  const raw = await chatOnce({
    config,
    signal,
    messages: [
      { role: "system", content: sys },
      { role: "user", content: user },
    ],
  });
  return extractJsonArray(raw);
}

// ---------- Bảng thuật ngữ ----------
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Chỉ chèn những thuật ngữ THỰC SỰ xuất hiện trong đoạn -> tiết kiệm token.
function glossaryFor(text, glossary) {
  if (!Array.isArray(glossary) || !glossary.length) return "";
  const hits = glossary.filter(
    (g) => g && g.en && g.vi && new RegExp(`\\b${escapeRegex(g.en)}\\b`, "i").test(text)
  );
  if (!hits.length) return "";
  return (
    "\n\nBẢNG THUẬT NGỮ BẮT BUỘC (phải dịch đúng như sau, không dùng cách dịch khác):\n" +
    hits.map((g) => `- "${g.en}" → "${g.vi}"`).join("\n")
  );
}

// Chữ ký bảng thuật ngữ để cache biết khi nào cần dịch lại.
function glossarySignature(glossary) {
  if (!Array.isArray(glossary) || !glossary.length) return "";
  return glossary.map((g) => `${g.en}=${g.vi}`).join(";");
}

// Dịch một chunk, có kèm ngữ cảnh phía trước (nếu có) để giữ nhất quán.
async function translateChunk({ config, chunk, prevTail, signal, onDelta }) {
  let userContent = "";
  if (prevTail) {
    userContent +=
      "NGỮ CẢNH PHÍA TRƯỚC (chỉ để tham khảo cho nhất quán thuật ngữ/mạch văn — TUYỆT ĐỐI KHÔNG dịch lại phần này):\n" +
      prevTail +
      "\n\n=== ĐOẠN CẦN DỊCH (chỉ dịch phần dưới đây) ===\n";
  }
  userContent += chunk.text;

  await streamChat({
    config,
    signal,
    onDelta,
    messages: [
      { role: "system", content: config.systemPrompt + glossaryFor(chunk.text, config.glossary) },
      { role: "user", content: userContent },
    ],
  });
}
