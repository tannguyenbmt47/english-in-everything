# 🚪 English in Everything

Chrome extension **khóa trình duyệt lại cho tới khi bạn học xong**. Mở Facebook, YouTube hay bất kỳ trang nào trước khi trả bài, bạn gặp một màn chặn: làm hết từ vựng + ngữ pháp mới được đi tiếp. Kèm theo là bộ công cụ đọc — dịch paper PDF và trang web sang tiếng Việt, bôi đen là lưu được từ mới vào đúng kho đang ôn.

Ý tưởng gốc: thứ khiến người ta không học được tiếng Anh không phải thiếu tài liệu, mà là cái tab mạng xã hội mở ngay bên cạnh. Vậy thì đặt bài học **chắn ngay trước** nó.

## Cơ chế chặn

| Chế độ | Khi nào bật | Phải làm gì để qua |
|---|---|---|
| **Buổi sáng** | Lần mở trình duyệt đầu tiên trong ngày | Một bài giảng ngữ pháp + số từ vựng bạn tự chọn (không được ít hơn mức đã đặt) |
| **Mạng xã hội** | Vào facebook/youtube/… khi hết thời gian rảnh | Vài câu IELTS khó theo chủ đề trong ngày; xong thì rảnh 2 tiếng (tùy chỉnh) |
| **Việc cần làm** | Đầu ngày | Lên danh sách việc hôm nay |
| **Nhật ký** | Cuối ngày | Viết vài dòng tổng kết (có chấm bài bằng AI) |
| **Nhắc việc** | Khi tới giờ đã hẹn | Xác nhận, hoặc đếm ngược "rời khỏi máy" cho tới hết giờ |

Mọi màn chặn đều có nút **Bỏ qua** — chặn để tạo ma sát, không phải để giam người dùng.

## Học từ vựng

- **Lặp ngắt quãng SM-2** (thuật toán Anki): mỗi từ có hệ số dễ riêng, khoảng cách ôn giãn dần theo mức bạn nhớ; 5 mức nhớ từ "Chưa học" tới "Thuộc lòng".
- **Chế độ nhớ lại**: cho nghĩa, bạn **tự gõ lại từ** (khó hơn hẳn chọn A/B/C/D), có gợi ý chữ cái đầu + số ô. Sai thì phải chép lại đáp án đúng mới đi tiếp.
- **Bạn nhầm với từ nào?**: gõ sai một từ có thật, extension chỉ ra chính xác từ bạn vừa gõ nghĩa là gì — và nếu hai từ hay lẫn nhau (`deteriorate` / `diminish`) thì đưa luôn phần **phân biệt 3 dòng**.
- **Mẹo nhớ cho từ cứng đầu**: sai quá 5 lần thì đổi cách học — tách gốc từ, liên tưởng hình ảnh, câu ví dụ. Sinh một lần rồi lưu lại.
- **Sổ lỗi sai**: câu ngữ pháp/IELTS trả lời sai tự vào sổ, hôm sau kiểm tra lại; đúng 3 lần liên tiếp mới được xoá.
- **Dọn kho**: tự lọc mảnh mệnh đề ("will the university release"), mục không phải chữ ("11.1"), và đưa cụm động từ về dạng gốc (`knocked back` → `knock back`) mà vẫn giữ nguyên tiến độ ôn.

## Ngữ pháp & IELTS

- **21 chủ điểm ngữ pháp** viết sẵn, không cần API: từ loại & cấu tạo từ, 12 thì, điều kiện, bị động, mệnh đề quan hệ, đảo ngữ, giả định…
- **Bài giảng theo điểm yếu**: extension đọc sổ lỗi của bạn, sáng hôm sau mở đúng chủ điểm bạn hay sai nhất thay vì chạy tuần tự.
- **Ngân hàng câu hỏi IELTS** offline + sinh thêm bằng AI theo chủ đề mỗi ngày, có nhớ câu đã gặp để không lặp.
- **Chiến lược & tiêu chí chấm IELTS** (Listening/Reading/Writing/Speaking) ngay trong tab Ngữ pháp.

## Đọc & dịch

- **Thứ tự đọc PDF**: nhận diện 1/2 cột, gom dòng thành đoạn, nối từ bị gạch nối, bỏ header/footer → đọc đúng luồng cột trái sang cột phải trước khi dịch.
- **Chunk theo ngữ nghĩa**: cắt ở ranh giới đoạn, không bao giờ cắt giữa câu; truyền ngữ cảnh đoạn trước để giữ thuật ngữ nhất quán. Dịch **streaming**, hiện dần song song bản gốc.
- **Dịch trang web** và **bôi đen dịch nhanh / lưu từ vựng** trên mọi trang.
- **Hỏi đáp & RAG**: chat với tài liệu đang mở, hoặc nạp nhiều tài liệu vào Kho tri thức và hỏi có trích nguồn (embedding + cosine, lưu trong IndexedDB).
- **Tra cứu**: Free Dictionary API (IPA, audio, định nghĩa tiếng Anh — miễn phí) kết hợp nghĩa tiếng Việt từ model.

## Tiết kiệm chi phí API

Extension được thiết kế để gọi API càng ít càng tốt mà không giảm chất lượng:

- Nghĩa từ **gom cả phiên vào một lượt gọi** thay vì mỗi câu một lượt.
- Cache theo (model + prompt + từ + ngữ cảnh), giữ **365 ngày** cho nghĩa từ và phần phân biệt — đổi model hoặc sửa prompt thì tự tra lại.
- Ưu tiên lấy nghĩa từ kho từ vựng của chính bạn, rồi tới từ điển miễn phí, cuối cùng mới gọi model.
- Mẹo nhớ lưu thẳng vào mục từ vựng, sinh đúng một lần.

## Cài đặt

1. Mở Chrome → `chrome://extensions` → bật **Developer mode**.
2. **Load unpacked** → chọn thư mục repo này.
3. Bấm icon trên thanh công cụ để mở **Side Panel**, rồi ⚙️ để nhập **API key**.

Cấu hình: API Key, Base URL (endpoint tương thích OpenAI), model chính, model chấm bài, embedding model, temperature, và **prompt riêng cho từng cơ chế** (dịch tài liệu · dịch nhanh · tra từ · hỏi đáp · RAG · chat · sinh từ IELTS). Bật/tắt và chỉnh khối lượng từng màn chặn trong ⚙️.

> Base URL mặc định `https://api.openai.com/v1`. Đổi sang endpoint khác (Azure/OpenRouter/proxy) thì thêm host tương ứng vào `host_permissions` trong `manifest.json`.

## Riêng tư

- API key và toàn bộ dữ liệu học nằm trong `chrome.storage.local`, chỉ gửi tới endpoint bạn tự cấu hình.
- PDF được pdf.js xử lý ngay trong trình duyệt, không upload đi đâu.
- Content script chạy trên mọi trang (để bôi đen dịch và để chặn) nên Chrome sẽ báo quyền "đọc dữ liệu trên các trang web".

## Cấu trúc

| File | Vai trò |
|------|---------|
| `gate.*` | Màn chặn: dựng phiên học, chấm bài, bài giảng ngữ pháp, nhắc việc |
| `vocab.js` | Kho từ vựng: SM-2, mức nhớ, lọc mục rác, đưa về dạng gốc |
| `quizbank.js`, `grammar.js`, `ielts.js` | Ngân hàng câu hỏi & nội dung ngữ pháp/IELTS viết sẵn |
| `mistakes.js` | Sổ lỗi sai + lịch kiểm tra lại |
| `layout.js` | Xác định thứ tự đọc PDF (cột, dòng → đoạn, header/footer) |
| `translator.js` | Chunk ngữ nghĩa + mọi lời gọi model (dịch, tra từ, mẹo nhớ, phân biệt) |
| `cache.js` | Cache phản hồi model theo namespace, TTL riêng từng loại |
| `background.js` | Service worker: điều phối chặn, tra cứu, lưu từ, hẹn giờ |
| `content.js`, `content.css` | Bôi đen dịch/lưu từ trên mọi trang |
| `rag.js` | Kho tri thức: vector store (IndexedDB) + truy hồi cosine |
| `sidepanel.*` | Giao diện chính: dịch, từ vựng, ngữ pháp, thống kê, sổ tay |
| `options.*`, `config.js` | Cấu hình API/model/prompt và các màn chặn |
