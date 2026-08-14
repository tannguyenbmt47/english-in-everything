// Cấu hình dùng chung cho options.js và sidepanel.js
const DEFAULT_SYSTEM_PROMPT = `Bạn là một dịch giả học thuật chuyên nghiệp, chuyên dịch các bài báo khoa học (paper) từ tiếng Anh sang tiếng Việt.

Yêu cầu:
- Dịch chính xác, tự nhiên, đúng văn phong học thuật tiếng Việt.
- Giữ nguyên các thuật ngữ chuyên ngành phổ biến; với thuật ngữ khó, dịch nghĩa và để thuật ngữ gốc trong ngoặc đơn ở lần xuất hiện đầu tiên, ví dụ: "học sâu (deep learning)".
- Giữ nguyên công thức toán, ký hiệu, tên riêng, tên tác giả, số liệu và trích dẫn.
- Không thêm bình luận, không tóm tắt, không bỏ sót nội dung. Chỉ trả về phần dịch.
- Giữ cấu trúc đoạn văn của bản gốc.`;

// Prompt riêng cho từng cơ chế.
const DEFAULT_TRANSLATE_PROMPT =
  "Bạn là dịch giả Anh-Việt. Dịch chính xác, tự nhiên đoạn văn người dùng gửi sang tiếng Việt. Giữ thuật ngữ chuyên ngành và ký hiệu. Chỉ trả về bản dịch, không giải thích.";

const DEFAULT_LOOKUP_PROMPT =
  "Bạn là từ điển Anh-Việt học thuật. Cho NGHĨA TIẾNG VIỆT ngắn gọn của từ/cụm từ người dùng đưa ra (nếu có ngữ cảnh thì chọn nghĩa phù hợp ngữ cảnh). Định dạng: '(loại từ nếu có) nghĩa'. Tối đa 1-2 dòng, không giải thích dài dòng.";

const DEFAULT_QA_PROMPT =
  "Bạn là trợ lý học thuật. Dựa trên NỘI DUNG TÀI LIỆU được cung cấp, trả lời câu hỏi bằng tiếng Việt: chính xác, rõ ràng, có cấu trúc (gạch đầu dòng khi hợp lý). Nếu tài liệu không đề cập, hãy nói rõ.";

const DEFAULT_RAG_PROMPT =
  "Bạn là trợ lý học thuật. Trả lời câu hỏi bằng tiếng Việt, CHỈ dựa trên các trích đoạn được cung cấp. Nếu các trích đoạn không đủ thông tin, hãy nói rõ. Khi dùng thông tin từ trích đoạn nào, chú thích chỉ số như [1], [2].";

const DEFAULT_CHAT_PROMPT =
  "Bạn là trợ lý AI hữu ích. Trả lời bằng tiếng Việt, rõ ràng, chính xác; giải thích dễ hiểu và ngắn gọn khi có thể.";

const DEFAULT_IELTS_PROMPT =
  "Bạn là giáo viên luyện thi IELTS. Tạo danh sách từ vựng học thuật trình độ IELTS 6.5–8.0 (Academic Word List, collocations hay gặp trong Writing/Speaking). Ưu tiên từ hữu ích, không quá hiếm. Trả về DUY NHẤT một mảng JSON hợp lệ.";

const DEFAULT_CONFIG = {
  apiKey: "",
  baseUrl: "https://api.openai.com/v1",
  model: "gpt-4o-mini",
  gradeModel: "gpt-5.6-luna", // model dùng riêng khi CHẤM BÀI (Writing/nhật ký)
  embedModel: "text-embedding-3-small",
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  translatePrompt: DEFAULT_TRANSLATE_PROMPT,
  lookupPrompt: DEFAULT_LOOKUP_PROMPT,
  qaPrompt: DEFAULT_QA_PROMPT,
  ragPrompt: DEFAULT_RAG_PROMPT,
  chatPrompt: DEFAULT_CHAT_PROMPT,
  ieltsPrompt: DEFAULT_IELTS_PROMPT,
  dailyGoal: 50,
  quizCount: 10, // số câu mặc định mỗi lượt kiểm tra ở sidebar (đổi được lúc bắt đầu)
  useDictionary: true,
  glossary: [], // [{en, vi}] — ép dịch thuật ngữ nhất quán trong cả tài liệu
  ttsProvider: "auto", // auto = thử giọng trình duyệt trước, lỗi thì dùng OpenAI
  ttsModel: "tts-1",
  ttsVoice: "alloy",
  concurrency: 3, // số đoạn dịch song song
  temperature: 0.2,
};

async function getConfig() {
  const stored = await chrome.storage.local.get(Object.keys(DEFAULT_CONFIG));
  return { ...DEFAULT_CONFIG, ...stored };
}

async function saveConfig(partial) {
  await chrome.storage.local.set(partial);
}
