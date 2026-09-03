// ============================================================
// grammar.js — Nội dung NGỮ PHÁP tiếng Anh + quy tắc IELTS (cố định, không cần API).
// Dữ liệu tĩnh; render ở tab "Ngữ pháp". Diễn giải chi tiết, nhiều ví dụ có dịch nghĩa.
// ============================================================

const GRAMMAR_DATA = [
  {
    group: "📘 Ngữ pháp tiếng Anh",
    topics: [
      {
        title: "Nền tảng: thành phần & trật tự câu",
        html: `
<p>Trước khi đi vào từng chủ điểm, bạn cần nắm "bộ khung" của một câu tiếng Anh — mọi quy tắc khác (thì, bị động, mệnh đề quan hệ…) đều xây trên nền này. Bài này hơi dài vì nó phải tự đứng được một mình: mọi thuật ngữ dùng ở đây (chủ ngữ, tân ngữ, mệnh đề…) sẽ được định nghĩa ngay khi xuất hiện, không giả định bạn đã biết.</p>

<h4>Vì sao trật tự từ quan trọng đến vậy?</h4>
<p>Tiếng Việt là ngôn ngữ <b>không biến hình</b> (từ không đổi dạng theo chức năng) nhưng khá linh hoạt về trật tự nhờ ngữ cảnh và trợ từ: "Cơm tôi ăn rồi" hay "Tôi ăn cơm rồi" người nghe đều hiểu. Tiếng Anh thì khác: gần như không có cách nào khác để biết "ai làm gì cho ai" ngoài <b>vị trí của từ trong câu</b>. Đổi chỗ hai từ có thể biến một câu đúng thành sai, hoặc tệ hơn — vẫn đúng ngữ pháp nhưng đổi hẳn nghĩa.</p>
<p class="gr-ex">The dog bit the man. <i>(Con chó cắn người đàn ông.)</i><br>The man bit the dog. <i>(Người đàn ông cắn con chó.)</i></p>
<p>Hai câu trên dùng đúng những từ giống hệt nhau, chỉ đổi vị trí — nghĩa đảo ngược hoàn toàn. Đây là lý do vì sao học trật tự câu tiếng Anh không phải chuyện "biết rồi", mà là nền tảng bắt buộc phải nắm chắc trước khi học các chủ điểm khác.</p>

<h4>Mệnh đề là gì? (Clause)</h4>
<p><b>Mệnh đề</b> là một nhóm từ CÓ CHỨA đầy đủ chủ ngữ + động từ chia (không phải V-ing/to-V đơn thuần), có thể diễn đạt một ý trọn vẹn hoặc một phần ý. Mỗi câu tiếng Anh có ít nhất một mệnh đề. Khái niệm này sẽ xuất hiện liên tục ở các bài sau (mệnh đề quan hệ, mệnh đề điều kiện…), nên cần hiểu ngay từ đây: mệnh đề khác với <b>cụm từ (phrase)</b> — cụm từ là một nhóm từ không có đủ chủ ngữ + động từ chia.</p>
<p class="gr-ex"><b>Mệnh đề:</b> she reads books <i>(có chủ ngữ "she" + động từ chia "reads")</i><br><b>Cụm từ:</b> reading books / in the library <i>(không có chủ ngữ + động từ chia)</i></p>

<h4>5 thành phần cốt lõi của một câu</h4>
<p>Một câu tiếng Anh được ráp từ tối đa 5 "khối": <b>S – V – O – C – A</b>. Không phải câu nào cũng có đủ cả 5, nhưng hiểu rõ từng khối là chìa khóa để không viết sai cấu trúc.</p>

<h5>1. Chủ ngữ (Subject — S)</h5>
<p>Là người/vật thực hiện hành động hoặc được nói tới, luôn đứng ở vị trí bắt buộc phải có (trừ câu mệnh lệnh). Có thể là:</p>
<ul>
<li>Danh từ / cụm danh từ: <i>My sister works in Hanoi.</i></li>
<li>Đại từ: <i>She works in Hanoi.</i></li>
<li>Danh động từ (V-ing làm chủ ngữ, xem thêm bài "Danh động từ & Động từ nguyên mẫu"): <i>Learning English takes time.</i></li>
<li>Động từ nguyên mẫu có "to": <i>To learn a language well takes years.</i></li>
<li>Cả một mệnh đề (mệnh đề danh từ): <i>What she said surprised everyone.</i></li>
</ul>
<p class="gr-note">Lỗi hay gặp: tiếng Việt cho phép bỏ chủ ngữ khi đã rõ ngữ cảnh ("Đang ăn cơm" = tôi/nó/họ đang ăn cơm), nhưng tiếng Anh <b>luôn luôn phải có chủ ngữ</b>, kể cả khi vô nghĩa như "it" trong <i>It is raining.</i> (không dịch chữ "it" này ra tiếng Việt).</p>

<h5>2. Động từ (Verb — V)</h5>
<p>"Trái tim" của câu — quyết định thì (thời điểm), thể (chủ động/bị động, thường/tiếp diễn/hoàn thành) và sự hòa hợp với chủ ngữ (xem bài "Sự hòa hợp Chủ ngữ – Động từ"). Động từ chia làm hai nhóm quan trọng, quyết định câu có cần Tân ngữ hay không:</p>
<ul>
<li><b>Nội động từ (intransitive verb):</b> diễn tả trọn vẹn ý nghĩa mà KHÔNG cần tân ngữ theo sau. <i>He slept. / The sun rises. / She arrived late.</i> Thêm một danh từ ngay sau các động từ này là sai: <i>~~He slept the bed.~~</i> sai, phải là <i>He slept on the bed.</i> (cần giới từ).</li>
<li><b>Ngoại động từ (transitive verb):</b> BẮT BUỘC phải có tân ngữ theo sau mới trọn nghĩa. <i>She bought a book.</i> Nếu bỏ "a book", câu <i>She bought.</i> nghe cụt và sai — người nghe sẽ hỏi ngay "mua cái gì?".</li>
</ul>
<p>Một số động từ dùng được cả hai cách với nghĩa khác nhau hoặc gần giống nhau: <i>She reads. (nội động từ — cô ấy có thói quen đọc sách) / She reads books. (ngoại động từ — cô ấy đọc sách)</i>.</p>

<h5>3. Tân ngữ (Object — O)</h5>
<p><b>Tân ngữ là người/vật CHỊU TÁC ĐỘNG trực tiếp hoặc gián tiếp của hành động</b>, đứng ngay sau ngoại động từ. Đây là thành phần hay bị bỏ sót giải thích nhất dù rất hay gặp — nắm chắc phần này sẽ tránh được nhiều lỗi viết câu.</p>
<ul>
<li><b>Tân ngữ trực tiếp (direct object):</b> vật/người trực tiếp nhận hành động — trả lời cho câu hỏi "làm gì?" / "ai?". <i>She bought a book.</i> (mua CÁI GÌ? → a book)</li>
<li><b>Tân ngữ gián tiếp (indirect object):</b> người NHẬN LỢI từ hành động đó — trả lời "cho ai?". Chỉ xuất hiện cùng nhóm động từ "hai tân ngữ" như <i>give, tell, show, send, buy, offer, lend</i>. <i>She gave her brother (gián tiếp) a book (trực tiếp).</i> Có thể viết lại bằng giới từ "to/for": <i>She gave a book to her brother.</i></li>
</ul>
<p class="gr-note">Phân biệt nhanh Tân ngữ với Chủ ngữ: đổi câu sang bị động (xem bài "Câu bị động"), TÂN NGỮ của câu chủ động sẽ trở thành CHỦ NGỮ của câu bị động — đây chính là lý do câu bị động luôn cần một ngoại động từ có tân ngữ để "mượn" làm chủ ngữ mới. <i>She bought a book. → A book was bought (by her).</i></p>

<h5>4. Bổ ngữ (Complement — C)</h5>
<p>Bổ ngữ KHÔNG chịu tác động của hành động (khác Tân ngữ) mà dùng để MÔ TẢ/ĐỊNH DANH chủ ngữ hoặc tân ngữ. Có hai loại:</p>
<ul>
<li><b>Bổ ngữ cho chủ ngữ (subject complement):</b> theo sau các "động từ nối/liên kết" (linking verb) như <i>be, become, seem, look, feel, sound, remain, stay</i> — những động từ này không diễn tả hành động mà chỉ "nối" chủ ngữ với một tính chất/danh phận. <i>She is a teacher. / She looks tired. / The soup tastes delicious.</i></li>
<li><b>Bổ ngữ cho tân ngữ (object complement):</b> mô tả chính tân ngữ vừa nêu, thường sau các động từ như <i>make, call, name, consider, find</i>. <i>They made her captain. / I find this book boring.</i> (ở đây "captain" và "boring" không phải tân ngữ thứ hai — chúng mô tả "her" và "this book").</li>
</ul>
<p class="gr-note">Cách phân biệt Bổ ngữ với Tân ngữ nhanh nhất: thử bỏ nó đi hoặc thay bằng đại từ tương ứng. Tân ngữ có thể thay bằng "it/him/her" (<i>She bought a book → She bought it</i>); Bổ ngữ mô tả chủ ngữ/tân ngữ nên không thể thay như vậy mà không phá nghĩa (<i>She is a teacher → ~~She is it~~</i> sai).</p>

<h5>5. Trạng ngữ (Adverbial — A)</h5>
<p>Là thành phần bổ sung thông tin về <b>cách thức – nơi chốn – thời gian – nguyên nhân…</b>, KHÔNG bắt buộc phải có nhưng thêm vào để câu đầy đủ thông tin hơn. Khác với Tân ngữ và Bổ ngữ, bỏ Trạng ngữ đi câu vẫn đúng ngữ pháp và trọn nghĩa.</p>
<p class="gr-ex">She reads books <b>carefully</b> (cách thức) <b>at the library</b> (nơi chốn) <b>every evening</b> (thời gian).<br><i>Cô ấy đọc sách một cách cẩn thận ở thư viện mỗi tối.</i></p>
<p>Thứ tự thông thường của trạng ngữ khi đi cùng nhau là <b>Cách thức → Nơi chốn → Thời gian</b> (nhớ tắt "M-P-T": Manner – Place – Time). Đặt trạng ngữ thời gian lên đầu câu cũng rất phổ biến và tự nhiên: <i>Every evening, she reads books carefully at the library.</i></p>

<h4>Trật tự cơ bản S – V – O và các biến thể</h4>
<p>Ghép 5 thành phần trên lại, câu tiếng Anh thường rơi vào một trong các khuôn mẫu sau — nắm được khuôn nào ứng với động từ nào giúp bạn không viết thiếu/thừa thành phần:</p>
<div class="gr-scroll"><table>
<tr><th>Khuôn mẫu</th><th>Loại động từ</th><th>Ví dụ</th></tr>
<tr><td>S + V</td><td>nội động từ</td><td>Birds fly.</td></tr>
<tr><td>S + V + O</td><td>ngoại động từ (1 tân ngữ)</td><td>She bought a book.</td></tr>
<tr><td>S + V + C</td><td>động từ nối</td><td>She is a teacher.</td></tr>
<tr><td>S + V + O + O</td><td>ngoại động từ (2 tân ngữ)</td><td>She gave him a book.</td></tr>
<tr><td>S + V + O + C</td><td>ngoại động từ + bổ ngữ cho tân ngữ</td><td>They made her captain.</td></tr>
</table></div>
<p>Sau bất kỳ khuôn nào ở trên, Trạng ngữ (A) đều có thể thêm vào cuối câu (hoặc đầu câu) mà không phá cấu trúc.</p>

<h4>Bốn loại câu theo cấu trúc</h4>
<p>Ngoài phân loại theo thành phần, câu còn được phân loại theo SỐ LƯỢNG và QUAN HỆ giữa các mệnh đề bên trong nó — đây là kiến thức trực tiếp phục vụ tiêu chí "đa dạng cấu trúc câu" khi chấm Writing/Speaking.</p>
<ul>
<li><b>Câu đơn (simple sentence):</b> chỉ có MỘT mệnh đề độc lập (mệnh đề tự đứng thành câu hoàn chỉnh được). <i>I like coffee.</i></li>
<li><b>Câu ghép (compound sentence):</b> HAI (hoặc nhiều) mệnh đề độc lập, có vị thế ngang hàng, nối bằng liên từ kết hợp (and, but, so, or, yet, for, nor — viết tắt FANBOYS) hoặc dấu chấm phẩy. <i>I like coffee, but she prefers tea.</i></li>
<li><b>Câu phức (complex sentence):</b> MỘT mệnh đề chính (độc lập) + ÍT NHẤT một mệnh đề phụ thuộc (không tự đứng thành câu được, cần dựa vào mệnh đề chính). Mệnh đề phụ thuộc bắt đầu bằng liên từ phụ thuộc (because, although, when, if, that…) hoặc đại từ quan hệ (who, which, that…). <i>I stayed home because it was raining.</i> ("it was raining" không thể đứng một mình thành câu hoàn chỉnh có nghĩa trong ngữ cảnh này vì nó phụ thuộc vào "because").</li>
<li><b>Câu ghép-phức (compound-complex sentence):</b> kết hợp cả câu ghép lẫn câu phức — ít nhất HAI mệnh đề độc lập VÀ ít nhất MỘT mệnh đề phụ thuộc. <i>I stayed home because it was raining, and I finished reading my book.</i> Đây là loại câu phức tạp nhất, hay gặp ở các bài viết band 7+.</li>
</ul>
<p class="gr-note">Mẹo lên band: một bài Writing Task 2 chỉ toàn câu đơn sẽ bị đánh giá là "cấu trúc hạn chế" (Grammatical Range thấp); ngược lại toàn câu ghép-phức phức tạp mà sai ngữ pháp còn tệ hơn. Mục tiêu là <b>trộn cả 4 loại một cách tự nhiên</b> — đây chính là tiêu chí "range" mà giám khảo tìm kiếm (xem bài "Tiêu chí chấm").</p>

<h4>Lỗi phổ biến do ảnh hưởng từ tiếng Việt</h4>
<ul>
<li><b>Bỏ chủ ngữ giả "it":</b> <i>~~Is raining.~~</i> → phải là <i>It is raining.</i></li>
<li><b>Bỏ động từ nối "be":</b> tiếng Việt không cần từ nối khi nói "Cô ấy đẹp", nhưng tiếng Anh bắt buộc: <i>~~She beautiful.~~</i> → <i>She is beautiful.</i></li>
<li><b>Đặt trạng ngữ thời gian/tần suất sai vị trí:</b> tiếng Việt hay nói "Tôi thường đi học" (trạng từ trước động từ được, được cả trước/sau tuỳ ngữ cảnh), tiếng Anh với trạng từ tần suất (always, usually, often, never) đứng TRƯỚC động từ thường nhưng SAU động từ "be": <i>I usually go to school. / She is usually late.</i></li>
</ul>`,
      },
      {
        title: "Từ loại (Parts of Speech) — nhận diện & vị trí",
        html: `
<p>Cùng một gốc từ, tiếng Anh đổi đuôi để đổi <b>chức năng</b> trong câu: <i>succeed → success → successful → successfully</i>. Chọn sai đuôi là câu sai ngữ pháp dù đúng nghĩa. Điều quan trọng nhất: <b>đừng đoán theo nghĩa, hãy nhìn vị trí của chỗ trống</b>.</p>

<h4>8 từ loại cơ bản</h4>
<div class="gr-scroll"><table>
<tr><th>Từ loại</th><th>Vai trò</th><th>Ví dụ</th></tr>
<tr><td>Danh từ (noun)</td><td>chỉ người/vật/khái niệm; làm chủ ngữ, tân ngữ</td><td>student, decision, information</td></tr>
<tr><td>Động từ (verb)</td><td>hành động/trạng thái; chia thì</td><td>decide, improve, rely</td></tr>
<tr><td>Tính từ (adjective)</td><td>bổ nghĩa cho DANH TỪ</td><td>useful, economic, reliable</td></tr>
<tr><td>Trạng từ (adverb)</td><td>bổ nghĩa cho ĐỘNG TỪ / tính từ / cả câu</td><td>quickly, extremely, however</td></tr>
<tr><td>Đại từ (pronoun)</td><td>thay cho danh từ</td><td>he, they, which, itself</td></tr>
<tr><td>Giới từ (preposition)</td><td>nối danh từ với phần còn lại</td><td>in, on, of, despite</td></tr>
<tr><td>Liên từ (conjunction)</td><td>nối từ/mệnh đề</td><td>and, but, although</td></tr>
<tr><td>Từ hạn định (determiner)</td><td>đứng trước danh từ</td><td>a, the, this, many, his</td></tr>
</table></div>

<h4>Quy tắc VỊ TRÍ — dùng để điền chỗ trống</h4>
<ul>
<li><b>Sau mạo từ / tính từ / sở hữu → DANH TỪ:</b> <span class="gr-ex">a <b>decision</b>, his <b>success</b>, an important <b>discovery</b>.</span></li>
<li><b>Sau chủ ngữ, hoặc sau trợ động từ (do/have/will/modal) → ĐỘNG TỪ:</b> <span class="gr-ex">The company <b>expanded</b>. / They will <b>reduce</b> costs.</span></li>
<li><b>Trước danh từ, hoặc sau be/seem/become/look/remain → TÍNH TỪ:</b> <span class="gr-ex">an <b>effective</b> method / The method is <b>effective</b>.</span></li>
<li><b>Bổ nghĩa cho động từ, hoặc trước tính từ/trạng từ khác → TRẠNG TỪ:</b> <span class="gr-ex">work <b>efficiently</b> / <b>highly</b> effective / <b>Unfortunately</b>, he failed.</span></li>
<li><b>Sau giới từ → DANH TỪ hoặc V-ing</b> (không bao giờ là động từ nguyên mẫu): <span class="gr-ex">interested in <b>learning</b> / responsible for the <b>delay</b>.</span></li>
<li><b>Sau "the … of" → DANH TỪ:</b> <span class="gr-ex">the <b>growth</b> of the economy.</span></li>
</ul>
<p class="gr-note">Quy trình 4 bước cho bài word formation: (1) chỗ trống cần <i>từ loại</i> gì? → (2) đổi đuôi cho đúng từ loại → (3) danh từ thì <i>số ít hay số nhiều</i>, động từ thì <i>chia thì</i> gì? → (4) nghĩa câu là khẳng định hay <i>phủ định</i> (cần thêm un-/in-/dis-)?</p>

<h4>Một gốc — cả họ từ (word family)</h4>
<div class="gr-scroll"><table>
<tr><th>Động từ</th><th>Danh từ (việc)</th><th>Danh từ (người)</th><th>Tính từ</th><th>Trạng từ</th></tr>
<tr><td>analyse</td><td>analysis</td><td>analyst</td><td>analytical</td><td>analytically</td></tr>
<tr><td>compete</td><td>competition</td><td>competitor</td><td>competitive</td><td>competitively</td></tr>
<tr><td>succeed</td><td>success</td><td>—</td><td>successful</td><td>successfully</td></tr>
<tr><td>decide</td><td>decision</td><td>decision-maker</td><td>decisive</td><td>decisively</td></tr>
<tr><td>rely</td><td>reliance</td><td>—</td><td>reliable</td><td>reliably</td></tr>
<tr><td>economise</td><td>economy / economics</td><td>economist</td><td>economic / economical</td><td>economically</td></tr>
<tr><td>vary</td><td>variety / variation</td><td>—</td><td>various / variable</td><td>variously</td></tr>
<tr><td>differ</td><td>difference</td><td>—</td><td>different</td><td>differently</td></tr>
</table></div>

<h4>Những cặp dễ nhầm nhất</h4>
<ul>
<li><b>economic / economical:</b> economic = thuộc về kinh tế (<i>economic growth</i>); economical = tiết kiệm (<i>an economical car</i>).</li>
<li><b>economy / economics:</b> economy = nền kinh tế; economics = môn kinh tế học (chia số ít: <i>Economics is hard</i>).</li>
<li><b>hard / hardly:</b> hard = chăm chỉ; hardly = hầu như không. <span class="gr-ex">He works <b>hard</b>. ≠ He <b>hardly</b> works.</span></li>
<li><b>-ing / -ed (tính từ):</b> -ing tả <i>tính chất của vật</i>, -ed tả <i>cảm xúc của người</i>. <span class="gr-ex">The lesson is <b>boring</b>. / I am <b>bored</b>.</span></li>
<li><b>Danh từ đứng trước danh từ</b> (noun + noun) rất phổ biến — không phải lúc nào cũng dùng tính từ: <i>government policy, traffic congestion, research method</i>.</li>
<li><b>effect / affect:</b> effect thường là danh từ (<i>have an effect on</i>); affect là động từ (<i>Pollution affects health</i>).</li>
</ul>
<p class="gr-note">Mẹo tự kiểm tra: đọc lại câu và hỏi "từ này đang mô tả CÁI GÌ?". Mô tả một danh từ → tính từ. Mô tả cách một việc diễn ra → trạng từ. Là bản thân sự vật/sự việc → danh từ.</p>`,
      },
      {
        title: "Cấu tạo từ (Word Formation): hậu tố & tiền tố",
        html: `
<p>Biết bộ đuôi từ là giải quyết được phần lớn bài word formation, và viết cũng chính xác hơn nhiều. Học theo <b>đuôi</b> chứ đừng học thuộc từng từ rời rạc.</p>

<h4>Hậu tố tạo DANH TỪ</h4>
<div class="gr-scroll"><table>
<tr><th>Đuôi</th><th>Ví dụ</th><th>Ghi chú</th></tr>
<tr><td>-tion / -sion / -ation</td><td>education, decision, information</td><td>phổ biến nhất, từ động từ</td></tr>
<tr><td>-ment</td><td>development, improvement, argument</td><td>từ động từ</td></tr>
<tr><td>-ness</td><td>happiness, awareness, weakness</td><td>từ tính từ</td></tr>
<tr><td>-ity / -ty</td><td>ability, responsibility, safety</td><td>từ tính từ</td></tr>
<tr><td>-ance / -ence</td><td>importance, difference, reliance</td><td>đi cùng -ant / -ent</td></tr>
<tr><td>-ship / -hood</td><td>relationship, childhood</td><td>trạng thái, quan hệ</td></tr>
<tr><td>-ism</td><td>tourism, criticism</td><td>chủ nghĩa, ngành</td></tr>
<tr><td>-er / -or / -ist / -ant</td><td>employer, director, scientist, participant</td><td>người làm việc gì</td></tr>
<tr><td>-al / -age / -ure</td><td>approval, shortage, pressure</td><td>ít gặp hơn nhưng hay ra đề</td></tr>
</table></div>

<h4>Hậu tố tạo TÍNH TỪ</h4>
<div class="gr-scroll"><table>
<tr><th>Đuôi</th><th>Ví dụ</th><th>Nghĩa gợi ý</th></tr>
<tr><td>-able / -ible</td><td>reliable, flexible, accessible</td><td>có thể … được</td></tr>
<tr><td>-ful / -less</td><td>useful / useless, harmful / harmless</td><td>có / không có</td></tr>
<tr><td>-ive</td><td>effective, competitive, productive</td><td>có xu hướng…</td></tr>
<tr><td>-ous</td><td>dangerous, various, ambitious</td><td>mang tính chất…</td></tr>
<tr><td>-al / -ical</td><td>national, environmental, practical</td><td>thuộc về…</td></tr>
<tr><td>-ic</td><td>economic, academic, scientific</td><td>thuộc về…</td></tr>
<tr><td>-ant / -ent</td><td>important, different, dependent</td><td>—</td></tr>
<tr><td>-y</td><td>healthy, noisy, wealthy</td><td>từ danh từ</td></tr>
</table></div>

<h4>Hậu tố tạo ĐỘNG TỪ &amp; TRẠNG TỪ</h4>
<ul>
<li><b>Động từ:</b> -ise/-ize (<i>modernise, prioritise</i>), -ify (<i>simplify, identify</i>), -en (<i>strengthen, widen</i>), -ate (<i>motivate, generate</i>).</li>
<li><b>Trạng từ:</b> gần như luôn là <b>-ly</b> gắn vào tính từ (<i>careful → carefully</i>). Ngoại lệ cần nhớ: <i>fast, hard, late, early, well</i> (từ <i>good</i>) không thêm -ly.</li>
</ul>

<h4>Tiền tố (thường mang nghĩa phủ định hoặc mức độ)</h4>
<div class="gr-scroll"><table>
<tr><th>Tiền tố</th><th>Nghĩa</th><th>Ví dụ</th></tr>
<tr><td>un-</td><td>không</td><td>unable, unemployment, unnecessary</td></tr>
<tr><td>in- / im- / il- / ir-</td><td>không (theo chữ cái đầu)</td><td>inaccurate, impossible, illegal, irregular</td></tr>
<tr><td>dis-</td><td>ngược lại</td><td>disagree, disadvantage, dishonest</td></tr>
<tr><td>mis-</td><td>sai, nhầm</td><td>misunderstand, misuse</td></tr>
<tr><td>over- / under-</td><td>quá mức / thiếu</td><td>overcrowded, underestimate</td></tr>
<tr><td>re-</td><td>lại</td><td>rebuild, renewable</td></tr>
<tr><td>pre- / post-</td><td>trước / sau</td><td>preview, postgraduate</td></tr>
<tr><td>inter- / sub-</td><td>giữa / dưới</td><td>international, subway</td></tr>
<tr><td>non- / anti-</td><td>không / chống</td><td>non-profit, antisocial</td></tr>
</table></div>
<p class="gr-note">Mẹo chọn im-/il-/ir-: <b>im-</b> trước m/p (impossible, immature), <b>il-</b> trước l (illegal), <b>ir-</b> trước r (irrelevant), còn lại dùng <b>in-</b> (inactive).</p>

<h4>Quy tắc chính tả khi thêm đuôi</h4>
<ul>
<li><b>Bỏ "e"</b> khi đuôi bắt đầu bằng nguyên âm: <i>create → creation, use → usable</i>. Nhưng giữ "e" trước phụ âm: <i>use → useful</i>.</li>
<li><b>y → i</b> khi trước "y" là phụ âm: <i>happy → happiness, rely → reliable, easy → easily</i>.</li>
<li><b>Gấp đôi phụ âm cuối</b> khi từ một âm tiết kết thúc bằng nguyên âm + phụ âm: <i>big → bigger, plan → planning</i>.</li>
<li><b>Tính từ đuôi -ic → trạng từ -ically:</b> <i>economic → economically, basic → basically</i>.</li>
<li><b>Tính từ đuôi -le → -ly:</b> <i>possible → possibly, simple → simply</i>.</li>
</ul>
<p class="gr-note">Cách luyện hiệu quả nhất: mỗi lần học từ mới, viết luôn cả họ từ (verb – noun – adjective – adverb) thay vì chỉ một dạng. Đề thi thường hỏi đúng dạng bạn chưa từng viết ra.</p>`,
      },
      {
        title: "12 thì — bảng tổng hợp & cách chọn thì",
        html: `
<p><b>Thì (tense)</b> là hình thức biến đổi của động từ để cho biết hành động xảy ra <b>khi nào</b> (hiện tại/quá khứ/tương lai) VÀ ở <b>trạng thái nào</b> (đơn giản/đang diễn ra/đã hoàn tất/hoàn tất-và-kéo dài) — hai khái niệm này gộp lại thành cái người học hay gọi chung là "thì", nhưng thực ra gồm hai lớp riêng: <b>mốc thời gian (tense)</b> và <b>thể (aspect)</b>. Tiếng Anh có 3 mốc thời gian, mỗi mốc có 4 thể, ghép lại thành đúng 12 thì cần nhớ.</p>

<h4>Vì sao người Việt hay lúng túng với hệ thống này?</h4>
<p>Tiếng Việt diễn tả thời gian bằng CÁC TỪ RIÊNG đặt trước động từ ("đã", "đang", "sẽ", "vừa mới"…) trong khi bản thân động từ KHÔNG đổi dạng: "ăn" luôn là "ăn" dù là "tôi ăn / tôi đã ăn / tôi đang ăn". Tiếng Anh thì ngược lại: chính ĐỘNG TỪ phải đổi dạng (work → worked → working → have worked…), và việc đổi dạng này bắt buộc, không phải tuỳ chọn. Đây là lý do lỗi phổ biến nhất của người Việt học tiếng Anh là <b>quên chia động từ</b> vì thói quen ngôn ngữ mẹ đẻ không đòi hỏi điều đó.</p>

<h4>4 thể (aspect) — trục thứ hai cần nắm song song với mốc thời gian</h4>
<ul>
<li><b>Đơn (simple):</b> nêu sự việc như một sự kiện trọn vẹn, không nhấn mạnh quá trình. <i>I work.</i></li>
<li><b>Tiếp diễn (continuous/progressive):</b> nhấn mạnh hành động ĐANG diễn ra, có tính tạm thời, chưa xong. <i>I am working.</i></li>
<li><b>Hoàn thành (perfect):</b> nhấn mạnh KẾT QUẢ của một việc đã xong, có liên hệ tới một mốc khác. <i>I have worked.</i></li>
<li><b>Hoàn thành tiếp diễn (perfect continuous):</b> kết hợp cả hai — nhấn mạnh QUÁ TRÌNH kéo dài tính đến một mốc, thường trả lời "bao lâu". <i>I have been working.</i></li>
</ul>
<p>Ghi nhớ: <b>V2/V3</b> là ký hiệu quy ước cho cột 2 và cột 3 trong bảng động từ bất quy tắc (vd go — <b>went</b> (V2) — <b>gone</b> (V3)); với động từ có quy tắc, V2 và V3 giống hệt nhau và đều thêm "-ed" (work — worked — worked).</p>

<div class="gr-scroll"><table>
<tr><th>Thì</th><th>Khẳng định</th><th>Dấu hiệu tiêu biểu</th></tr>
<tr><td>Hiện tại đơn</td><td>S + V(s/es)</td><td>always, usually, every day</td></tr>
<tr><td>Hiện tại tiếp diễn</td><td>S + am/is/are + V-ing</td><td>now, at the moment, Look!</td></tr>
<tr><td>Hiện tại hoàn thành</td><td>S + have/has + V3</td><td>just, already, yet, since, for, ever</td></tr>
<tr><td>HT hoàn thành tiếp diễn</td><td>S + have/has been + V-ing</td><td>for, since, all day, how long</td></tr>
<tr><td>Quá khứ đơn</td><td>S + V-ed/V2</td><td>yesterday, ago, last, in 1990</td></tr>
<tr><td>Quá khứ tiếp diễn</td><td>S + was/were + V-ing</td><td>while, at 8pm yesterday</td></tr>
<tr><td>Quá khứ hoàn thành</td><td>S + had + V3</td><td>before, after, by the time</td></tr>
<tr><td>QK hoàn thành tiếp diễn</td><td>S + had been + V-ing</td><td>for/since (trước một mốc QK)</td></tr>
<tr><td>Tương lai đơn</td><td>S + will + V</td><td>tomorrow, soon, I think/promise</td></tr>
<tr><td>Tương lai tiếp diễn</td><td>S + will be + V-ing</td><td>at this time tomorrow</td></tr>
<tr><td>Tương lai hoàn thành</td><td>S + will have + V3</td><td>by + mốc tương lai</td></tr>
<tr><td>TL hoàn thành tiếp diễn</td><td>S + will have been + V-ing</td><td>by + mốc TL, nhấn thời lượng</td></tr>
</table></div>
<h4>Nguyên tắc chọn thì — quy trình 3 bước</h4>
<p>Đừng học vẹt công thức. Hãy tự hỏi đúng thứ tự ba câu sau — trả lời xong là khoanh vùng được đúng 1 trong 12 thì:</p>
<ol>
<li><b>Bước 1 — Mốc thời gian:</b> hành động thuộc về hiện tại, quá khứ hay tương lai? (Nhìn vào dấu hiệu thời gian trong câu: "now" → hiện tại; "yesterday" → quá khứ; "tomorrow" → tương lai.)</li>
<li><b>Bước 2 — Đã xong hay chưa xong:</b> nếu CHƯA XONG / đang diễn ra tại đúng mốc đó → dùng thể tiếp diễn. Nếu ĐÃ XONG hẳn (dù là xong ở hiện tại, quá khứ hay tương lai) và bạn muốn nhấn KẾT QUẢ → dùng thể hoàn thành.</li>
<li><b>Bước 3 — Có cần nhấn độ dài không:</b> nếu câu cần trả lời "bao lâu rồi / đã kéo dài bao lâu" → dùng thể hoàn thành tiếp diễn thay vì hoàn thành đơn thuần.</li>
</ol>
<p class="gr-note">Ví dụ áp dụng: "Tôi đã sống ở đây 10 năm rồi (và vẫn đang sống)." → Bước 1: hiện tại (vẫn đang tiếp diễn tới giờ). Bước 2: đã "xong" một phần, có kết quả tính đến giờ → hoàn thành. Bước 3: câu nhấn ĐỘ DÀI ("10 năm") → chọn hiện tại hoàn thành TIẾP DIỄN: <i>I have been living here for 10 years.</i> Ba bài dưới đây sẽ giải thích cặn kẽ từng thì theo đúng ba mốc thời gian, kèm các cặp thì hay bị nhầm lẫn với nhau.</p>`,
      },
      {
        title: "Nhóm thì HIỆN TẠI (chi tiết 4 thì)",
        html: `
<h4>1. Hiện tại đơn (Present Simple)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + V(s/es)</span> · <b>Phủ định:</b> <span class="gr-formula">S + do/does not + V</span> · <b>Nghi vấn:</b> <span class="gr-formula">Do/Does + S + V?</span></p>
<p>Đây là thì của những điều <b>mang tính ổn định, lặp lại hoặc đúng như một chân lý</b>, không gắn với một khoảnh khắc cụ thể — nó KHÔNG có nghĩa là "đang xảy ra ngay bây giờ" như nhiều người lầm tưởng vì tên gọi "hiện tại".</p>
<ul>
<li><b>Thói quen, việc lặp lại:</b> <span class="gr-ex">I <b>go</b> to the gym three times a week. <i>(Tôi đến phòng gym ba lần mỗi tuần.)</i></span></li>
<li><b>Sự thật hiển nhiên, quy luật khoa học:</b> <span class="gr-ex">Water <b>boils</b> at 100°C. <i>(Nước sôi ở 100 độ C — luôn đúng, không riêng lúc nào.)</i></span></li>
<li><b>Lịch trình cố định</b> (tàu xe, thời khóa biểu, lịch chiếu phim — dù việc đó ở TƯƠNG LAI vẫn dùng hiện tại đơn vì tính chất "cố định, không đổi"): <span class="gr-ex">The train <b>leaves</b> at 7 a.m. tomorrow. <i>(Tàu khởi hành lúc 7 giờ sáng mai — theo đúng lịch trình.)</i></span></li>
<li><b>Cảm xúc, suy nghĩ, sở hữu</b> (nhóm động từ trạng thái — xem ghi chú dưới): <span class="gr-ex">I <b>believe</b> honesty matters most. / She <b>owns</b> two houses.</span></li>
</ul>
<p class="gr-note">Lỗi hay gặp nhất: quên thêm "-s/-es" ở ngôi thứ ba số ít (he/she/it/danh từ số ít). "He <b>work</b> hard" là sai; phải là "He <b>works</b> hard." Ở thể phủ định/nghi vấn, "-s" chuyển sang cho "does": "Does he <b>work</b> hard?" (không phải "Does he works?").</p>

<h4>2. Hiện tại tiếp diễn (Present Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + am/is/are + V-ing</span> · <b>Phủ định:</b> <span class="gr-formula">S + am/is/are + not + V-ing</span> · <b>Nghi vấn:</b> <span class="gr-formula">Am/Is/Are + S + V-ing?</span></p>
<p>Diễn tả hành động <b>đang xảy ra ngay lúc nói</b>, hoặc quanh thời điểm hiện tại nhưng có tính tạm thời (chưa chắc lâu dài):</p>
<ul>
<li><b>Đang diễn ra ngay lúc nói:</b> <span class="gr-ex">Please be quiet — the baby <b>is sleeping</b>. <i>(Em bé đang ngủ.)</i></span></li>
<li><b>Tạm thời, không phải thói quen vĩnh viễn:</b> <span class="gr-ex">I <b>am staying</b> with my aunt this month. <i>(so sánh với "I live with my parents" — thì hiện tại đơn, mang tính lâu dài hơn.)</i></span></li>
<li><b>Kế hoạch tương lai gần đã sắp xếp cụ thể</b> (khác "be going to" — xem bài Nhóm thì Tương lai): <span class="gr-ex">We <b>are meeting</b> the client tomorrow. <i>(Đã hẹn giờ, địa điểm cụ thể rồi.)</i></span></li>
<li><b>Xu hướng đang thay đổi:</b> <span class="gr-ex">The climate <b>is getting</b> warmer every year.</span></li>
<li><b>Phàn nàn về thói quen gây khó chịu</b> (đi kèm "always"): <span class="gr-ex">He <b>is always leaving</b> the door open! <i>(Sắc thái bực mình — khác "He always leaves the door open" chỉ mô tả trung tính.)</i></span></li>
</ul>
<p class="gr-note"><b>Động từ chỉ trạng thái (stative verbs)</b> — như know, like, want, believe, understand, love, hate, own, belong, seem — mô tả một TRẠNG THÁI tồn tại liên tục chứ không phải một HÀNH ĐỘNG đang xảy ra, nên thường <b>không</b> chia tiếp diễn: nói "I <b>know</b> the answer", không nói "~~I am knowing~~". Một số động từ (think, have, taste) có cả hai nghĩa: "I <b>think</b> it's true" (nghĩ = trạng thái, không tiếp diễn) khác "I <b>am thinking</b> about it" (đang suy nghĩ = hành động, được phép tiếp diễn).</p>

<h4>3. Hiện tại hoàn thành (Present Perfect)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + have/has + V3</span> · <b>Phủ định:</b> <span class="gr-formula">S + have/has not + V3</span> · <b>Nghi vấn:</b> <span class="gr-formula">Have/Has + S + V3?</span></p>
<p>Đây là "cầu nối" giữa quá khứ và hiện tại: việc đã xảy ra nhưng <b>vẫn còn liên quan tới hiện tại</b>, hoặc thời điểm xảy ra không quan trọng bằng kết quả/trải nghiệm để lại:</p>
<ul>
<li><b>Trải nghiệm (đã từng, không nói rõ khi nào):</b> <span class="gr-ex">I <b>have visited</b> Japan twice. <i>(Tôi đã từng đến Nhật hai lần — không quan trọng lần nào, năm nào.)</i></span></li>
<li><b>Việc vừa hoàn tất, còn ảnh hưởng/dấu vết tới hiện tại:</b> <span class="gr-ex">She <b>has just finished</b> her essay. <i>(Vừa xong — nên giờ có thể nộp bài được.)</i></span></li>
<li><b>Kéo dài liên tục từ quá khứ đến giờ</b> (với <i>since</i> — mốc bắt đầu, hoặc <i>for</i> — khoảng thời gian): <span class="gr-ex">We <b>have lived</b> here <b>for</b> ten years / <b>since</b> 2015. <i>(Sống ở đây tới tận bây giờ.)</i></span></li>
<li><b>Sự thay đổi tính đến hiện tại:</b> <span class="gr-ex">Prices <b>have increased</b> significantly this year.</span></li>
</ul>
<p class="gr-note">Phân biệt với quá khứ đơn — đây là cặp thì bị nhầm nhiều nhất: dùng hiện tại hoàn thành khi <b>KHÔNG nêu mốc thời gian cụ thể đã kết thúc</b>; ngay khi câu có "yesterday, in 2019, last week, two years ago" (mốc đã chốt, đã xong hẳn trong quá khứ, không còn liên hệ trực tiếp) thì BẮT BUỘC dùng quá khứ đơn. So sánh: <i>I have lost my key</i> (vẫn đang mất, hiện tại chưa tìm ra — hiện tại hoàn thành) ≠ <i>I lost my key yesterday</i> (có thể đã tìm lại được rồi, chỉ đơn thuần kể lại sự việc đã qua — quá khứ đơn).</p>

<h4>4. Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + have/has been + V-ing</span> · <b>Phủ định:</b> <span class="gr-formula">S + have/has not been + V-ing</span> · <b>Nghi vấn:</b> <span class="gr-formula">Have/Has + S + been + V-ing?</span></p>
<p>Giống hiện tại hoàn thành ở việc nối quá khứ với hiện tại, nhưng <b>nhấn mạnh vào QUÁ TRÌNH và sự liên tục</b> hơn là kết quả cuối cùng, thường trả lời câu hỏi "bao lâu rồi":</p>
<ul>
<li><span class="gr-ex">I <b>have been learning</b> English <b>for</b> three years. <i>(Tôi học tiếng Anh liên tục ba năm nay — nhấn mạnh quá trình học, có thể vẫn đang tiếp tục.)</i></span></li>
<li><b>Giải thích một kết quả nhìn thấy được ngay lúc nói bằng NGUYÊN NHÂN vừa mới xảy ra:</b> <span class="gr-ex">Your eyes are red — <b>have</b> you <b>been crying</b>? <i>(Mắt đỏ ⇒ hỏi ngược lại hành động vừa gây ra tình trạng đó.)</i></span></li>
<li><b>Hành động lặp lại, có tính tạm thời, gần đây:</b> <span class="gr-ex">She <b>has been calling</b> me all week about the project.</span></li>
</ul>
<p class="gr-note">Phân biệt với hiện tại hoàn thành đơn: <i>I have read three books this month</i> (hoàn thành đơn — nhấn KẾT QUẢ: đã đọc xong 3 cuốn, đếm được số lượng) ≠ <i>I have been reading this book all afternoon</i> (hoàn thành tiếp diễn — nhấn QUÁ TRÌNH đọc, có thể chưa đọc xong). Không dùng thể này với động từ trạng thái (đã nêu ở mục 2): "~~I have been knowing him for years~~" sai, phải là <i>I have known him for years.</i></p>`,
      },
      {
        title: "Nhóm thì QUÁ KHỨ (chi tiết 4 thì)",
        html: `
<h4>1. Quá khứ đơn (Past Simple)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + V-ed / V2</span> · <b>Phủ định:</b> <span class="gr-formula">S + did not + V (nguyên mẫu)</span> · <b>Nghi vấn:</b> <span class="gr-formula">Did + S + V (nguyên mẫu)?</span></p>
<p>Kể lại một hành động <b>đã bắt đầu và kết thúc hẳn trong quá khứ</b>, thường có mốc thời gian cụ thể hoặc ngầm hiểu rõ ràng. Đây là thì "xương sống" khi kể chuyện, tường thuật sự việc:</p>
<ul>
<li><b>Sự việc đơn lẻ có mốc thời gian rõ:</b> <span class="gr-ex">I <b>graduated</b> from university in 2020. <i>(Tôi tốt nghiệp năm 2020.)</i></span></li>
<li><b>Chuỗi hành động nối tiếp nhau (kể chuyện):</b> <span class="gr-ex">She <b>opened</b> the door, <b>walked</b> in and <b>sat</b> down. <i>(Mở cửa, bước vào rồi ngồi xuống — theo đúng thứ tự xảy ra.)</i></span></li>
<li><b>Thói quen/tình trạng trong quá khứ, nay không còn nữa:</b> <span class="gr-ex">I <b>lived</b> in Hue when I was a child. <i>(so sánh với "used to live" — cùng ý nghĩa, "used to" nhấn mạnh sự đối lập với hiện tại rõ hơn.)</i></span></li>
</ul>
<p class="gr-note">Bắt buộc phải học thuộc <b>động từ bất quy tắc</b> (go→went, buy→bought, see→saw, eat→ate…) vì chúng không theo công thức "+ed". Ở thể phủ định/nghi vấn đã mượn "did" để chia thì rồi, nên động từ chính LUÔN trở về dạng nguyên mẫu (không chia): "Did you <b>go</b>?" đúng, "~~Did you went?~~" sai — lỗi chia thì hai lần rất hay gặp.</p>

<h4>2. Quá khứ tiếp diễn (Past Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + was/were + V-ing</span> · <b>Phủ định:</b> <span class="gr-formula">S + was/were not + V-ing</span> · <b>Nghi vấn:</b> <span class="gr-formula">Was/Were + S + V-ing?</span></p>
<p>Diễn tả hành động <b>đang diễn ra tại một thời điểm cụ thể trong quá khứ</b>, hoặc làm "phông nền kéo dài" cho một hành động ngắn khác chen vào giữa:</p>
<ul>
<li><b>Hành động dài (nền) bị một hành động ngắn (chen vào) cắt ngang</b> — luôn dùng với <i>when</i>, việc dài chia tiếp diễn, việc ngắn chia quá khứ đơn: <span class="gr-ex">I <b>was cooking</b> dinner <b>when</b> the phone <b>rang</b>. <i>(Tôi đang nấu ăn thì điện thoại reo — nấu ăn là nền, chuông reo là việc ngắn xen vào.)</i></span></li>
<li><b>Hai hành động dài diễn ra song song</b> — dùng với <i>while</i>, cả hai vế đều chia tiếp diễn: <span class="gr-ex">While she <b>was reading</b>, he <b>was watching</b> TV.</span></li>
<li><b>Miêu tả khung cảnh, bối cảnh tại một thời điểm trong quá khứ:</b> <span class="gr-ex">The sun <b>was shining</b> and birds <b>were singing</b>. <i>(Thường dùng để mở đầu một câu chuyện.)</i></span></li>
</ul>

<h4>3. Quá khứ hoàn thành (Past Perfect)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + had + V3</span> · <b>Phủ định:</b> <span class="gr-formula">S + had not + V3</span> · <b>Nghi vấn:</b> <span class="gr-formula">Had + S + V3?</span></p>
<p>Dùng khi có <b>hai mốc trong quá khứ</b> và bạn muốn chỉ rõ việc nào <b>xảy ra trước</b> việc còn lại — nó đóng vai trò như một "quá khứ của quá khứ". Việc xảy ra TRƯỚC dùng quá khứ hoàn thành, việc xảy ra SAU (gần hiện tại hơn) dùng quá khứ đơn:</p>
<ul>
<li><span class="gr-ex">By the time we <b>arrived</b>, the film <b>had</b> already <b>started</b>. <i>(Khi chúng tôi đến (việc sau — quá khứ đơn) thì phim đã bắt đầu rồi (việc trước — quá khứ hoàn thành).)</i></span></li>
<li><span class="gr-ex">She <b>had studied</b> French before she <b>moved</b> to Paris. <i>(Học tiếng Pháp trước, rồi mới chuyển tới Paris.)</i></span></li>
<li><b>Diễn tả điều kiện không có thật trong quá khứ</b> (xem thêm bài Câu điều kiện, loại 3): <span class="gr-ex">If I <b>had known</b>, I would have helped.</span></li>
</ul>
<p class="gr-note">Nếu thứ tự hai việc đã RÕ RÀNG nhờ chính liên từ <i>before/after</i> (bản thân từ "before/after" đã nói lên việc nào trước việc nào rồi), người bản ngữ trong văn nói đôi khi vẫn dùng quá khứ đơn cho cả hai vế cho gọn — nhưng trong văn viết học thuật (Writing Task 2), dùng quá khứ hoàn thành cho việc xảy ra trước sẽ chuẩn mực và rõ ràng hơn, được đánh giá cao hơn về Grammatical Range.</p>

<h4>4. Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + had been + V-ing</span> · <b>Phủ định:</b> <span class="gr-formula">S + had not been + V-ing</span> · <b>Nghi vấn:</b> <span class="gr-formula">Had + S + been + V-ing?</span></p>
<p>Giống quá khứ hoàn thành ở việc có hai mốc, nhưng <b>nhấn mạnh QUÁ TRÌNH kéo dài</b> của việc xảy ra trước, tính đến mốc quá khứ thứ hai:</p>
<ul>
<li><span class="gr-ex">He <b>had been working</b> for hours before he finally took a break. <i>(Anh ấy đã làm việc liên tục suốt nhiều giờ TRƯỚC KHI nghỉ — nhấn mạnh độ dài của quá trình làm việc, không chỉ đơn thuần "đã làm việc".)</i></span></li>
<li><b>Nguyên nhân dẫn tới một tình trạng ở mốc quá khứ sau:</b> <span class="gr-ex">She was tired because she <b>had been studying</b> all night. <i>(Cô ấy mệt vì đã học suốt đêm.)</i></span></li>
</ul>
<p class="gr-note">Phân biệt với quá khứ hoàn thành đơn: <i>I had finished the report by noon</i> (nhấn KẾT QUẢ — báo cáo đã xong) ≠ <i>I had been writing the report all morning</i> (nhấn QUÁ TRÌNH viết kéo dài cả buổi sáng, có thể vẫn chưa xong hẳn).</p>`,
      },
      {
        title: "Nhóm thì TƯƠNG LAI (chi tiết 4 thì + các cách nói khác về tương lai)",
        html: `
<p>Tương lai là mốc thời gian DUY NHẤT trong tiếng Anh có nhiều hơn một cách diễn đạt cho cùng một ý — vì bản thân "tương lai" chưa xảy ra, cách bạn CHỌN diễn đạt nó thể hiện quan điểm của bạn về mức độ chắc chắn/dự định. Đây cũng là điểm hay bị hỏi trong đề Reading/Writing vì có nhiều lựa chọn gần nghĩa.</p>

<h4>1. Tương lai đơn (Future Simple) — will</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + will + V (nguyên mẫu)</span> · <b>Phủ định:</b> <span class="gr-formula">S + will not (won't) + V</span> · <b>Nghi vấn:</b> <span class="gr-formula">Will + S + V?</span></p>
<p>Dùng cho những gì thuộc tương lai nhưng mang tính <b>quyết định tức thời (vừa nảy ra lúc nói), dự đoán không có bằng chứng cụ thể, lời hứa hay đề nghị</b> — tức KHÔNG có sự chuẩn bị/kế hoạch từ trước:</p>
<ul>
<li><b>Quyết định ngay lúc nói (chưa hề nghĩ tới trước đó):</b> <span class="gr-ex">It's cold — I <b>will close</b> the window. <i>(Vừa thấy lạnh, quyết định ngay.)</i></span></li>
<li><b>Dự đoán dựa trên ý kiến/suy nghĩ cá nhân, không có bằng chứng rõ ràng:</b> <span class="gr-ex">I think prices <b>will rise</b> next year.</span></li>
<li><b>Lời hứa, đề nghị giúp đỡ, đe doạ:</b> <span class="gr-ex">I <b>will help</b> you with your homework. / I <b>will</b> never <b>forgive</b> him.</span></li>
<li><b>Sự thật sẽ chắc chắn xảy ra (không thể tránh khỏi):</b> <span class="gr-ex">The sun <b>will rise</b> at 6 a.m. tomorrow.</span></li>
</ul>

<h4>2. Tương lai gần "be going to" — cấu trúc phổ biến, không nằm trong 12 thì chuẩn</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + am/is/are + going to + V</span> · <b>Phủ định:</b> <span class="gr-formula">S + am/is/are + not + going to + V</span> · <b>Nghi vấn:</b> <span class="gr-formula">Am/Is/Are + S + going to + V?</span></p>
<p>Khác với <i>will</i>, cấu trúc này dùng cho <b>kế hoạch đã định trước (có suy nghĩ, chuẩn bị)</b> hoặc <b>dự đoán có BẰNG CHỨNG rõ ràng ngay ở hiện tại</b>:</p>
<ul>
<li><b>Dự định đã có kế hoạch từ trước:</b> <span class="gr-ex">We <b>are going to</b> travel to Da Nang this summer. <i>(Đã bàn bạc, lên kế hoạch từ trước, không phải vừa nghĩ ra.)</i></span></li>
<li><b>Dự đoán dựa trên bằng chứng nhìn/thấy được ngay lúc nói:</b> <span class="gr-ex">Look at those clouds — it <b>is going to</b> rain. <i>(Có mây đen làm bằng chứng — khác "I think it will rain" chỉ là ý kiến cá nhân, không có bằng chứng cụ thể.)</i></span></li>
</ul>
<p class="gr-note">So sánh nhanh ba cách nói gần nghĩa: <i>I will call you</i> (vừa nảy ra ý, chưa từng nghĩ trước đó) ≠ <i>I am going to call you</i> (đã định làm việc này từ trước khi nói câu này) ≠ <i>I am calling you at 5pm</i> (hiện tại tiếp diễn diễn tả tương lai — đã CHỐT lịch cụ thể, gần như một cuộc hẹn chắc chắn, xem bài "Nhóm thì HIỆN TẠI" mục 2).</p>

<h4>3. Tương lai tiếp diễn (Future Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + will be + V-ing</span> · <b>Phủ định:</b> <span class="gr-formula">S + will not be + V-ing</span> · <b>Nghi vấn:</b> <span class="gr-formula">Will + S + be + V-ing?</span></p>
<p>Diễn tả hành động <b>sẽ đang diễn ra tại một thời điểm xác định</b> trong tương lai — giống hệt logic của hiện tại tiếp diễn nhưng dịch chuyển toàn bộ mốc sang tương lai:</p>
<ul>
<li><span class="gr-ex">At 8 p.m. tomorrow, I <b>will be flying</b> to London. <i>(Lúc 8 giờ tối mai, tôi sẽ đang trên máy bay tới London — hành động chưa xong tại đúng mốc đó.)</i></span></li>
<li><b>Diễn tả một việc sẽ diễn ra theo lẽ tự nhiên, không cố ý (lịch sự hơn "will"):</b> <span class="gr-ex">I <b>will be seeing</b> him at the meeting anyway, so I can tell him then. <i>(Đằng nào cũng gặp — không phải cố tình sắp xếp riêng.)</i></span></li>
</ul>

<h4>4. Tương lai hoàn thành (Future Perfect)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + will have + V3</span> · <b>Phủ định:</b> <span class="gr-formula">S + will not have + V3</span> · <b>Nghi vấn:</b> <span class="gr-formula">Will + S + have + V3?</span></p>
<p>Diễn tả hành động <b>sẽ hoàn tất trước một mốc tương lai xác định</b>, thường đi với <i>by + thời gian</i> hoặc <i>by the time</i>:</p>
<ul>
<li><span class="gr-ex">By 2030, I <b>will have finished</b> my PhD. <i>(Đến năm 2030 — mốc tương lai — thì việc học tiến sĩ đã xong rồi.)</i></span></li>
<li><span class="gr-ex">By the time you arrive, we <b>will have eaten</b> dinner. <i>(Khi bạn tới — mốc tương lai — thì chúng tôi đã ăn xong.)</i></span></li>
</ul>

<h4>5. Tương lai hoàn thành tiếp diễn (Future Perfect Continuous)</h4>
<p><b>Khẳng định:</b> <span class="gr-formula">S + will have been + V-ing</span></p>
<p>Nhấn mạnh <b>độ dài của một quá trình</b>, tính đến một mốc tương lai xác định — hiếm gặp hơn 4 thì trên nhưng vẫn xuất hiện trong Writing band cao khi cần nhấn mạnh thời lượng:</p>
<ul>
<li><span class="gr-ex">By next month, I <b>will have been working</b> here for five years. <i>(Đến tháng sau, tôi sẽ làm việc ở đây tròn 5 năm — nhấn mạnh khoảng thời gian liên tục.)</i></span></li>
</ul>

<h4>Các cách khác nói về tương lai (không thuộc 4 thì trên)</h4>
<ul>
<li><b>be about to + V:</b> sắp sửa xảy ra ngay lập tức. <i>The movie is about to start — sit down!</i></li>
<li><b>be to + V:</b> mang tính trang trọng, kế hoạch chính thức/lịch trình (báo chí hay dùng). <i>The president is to visit Vietnam next week.</i></li>
<li><b>Hiện tại đơn diễn tả tương lai:</b> dùng cho lịch trình cố định, đã nêu ở bài Nhóm thì HIỆN TẠI mục 1. <i>The flight departs at 6 a.m.</i></li>
</ul>
<p class="gr-note">Mẹo lên band: dùng ĐA DẠNG các cách diễn đạt tương lai (không chỉ mỗi "will") trong Writing Task 2 khi bàn về xu hướng/dự đoán ("is likely to", "is expected to", "is projected to" cũng là những lựa chọn học thuật rất tốt, xem thêm ở bài "Động từ khiếm khuyết").</p>`,
      },
      {
        title: "Sự hòa hợp Chủ ngữ – Động từ",
        html: `
<p><b>"Hòa hợp" (agreement)</b> nghĩa là động từ phải chia theo <b>số</b> (số ít/số nhiều) của chủ ngữ (xem lại khái niệm Chủ ngữ ở bài "Nền tảng"). Nghe thì đơn giản — "she works", "they work" — nhưng có nhiều tình huống dễ đánh lừa mắt vì chủ ngữ THẬT bị che khuất bởi các từ đứng gần động từ hơn.</p>

<h4>Quy tắc cơ bản</h4>
<ul>
<li><b>Chủ ngữ số ít → động từ số ít</b> (thêm -s/-es ở hiện tại đơn, hoặc "is/was"): <span class="gr-ex">She <b>works</b> hard. / The cat <b>is</b> sleeping.</span></li>
<li><b>Chủ ngữ số nhiều → động từ số nhiều</b> (không thêm -s, hoặc "are/were"): <span class="gr-ex">They <b>work</b> hard. / The cats <b>are</b> sleeping.</span></li>
<li><b>Danh từ không đếm được (uncountable noun — vật/khái niệm không đếm được từng cái một, xem thêm bài "Đếm được / không đếm được") luôn là số ít:</b> <span class="gr-ex">Information <b>is</b> useful. / This news <b>is</b> surprising. <i>("news" trông có "s" nhưng luôn là số ít.)</i></span></li>
</ul>

<h4>Các trường hợp dễ nhầm — chủ ngữ thật bị "che" bởi từ đứng gần động từ</h4>
<ul>
<li><b>Đại từ bất định</b> (indefinite pronoun — chỉ một số lượng không xác định: everyone, someone, anybody, each, every, nobody) → LUÔN số ít dù mang nghĩa "mọi người": <span class="gr-ex">Everyone <b>has</b> a role to play. <i>(Không phải "have" dù nghĩa là "mọi người".)</i></span></li>
<li><b>Chủ ngữ + with / as well as / together with / along with</b> (cụm chèn thêm, KHÔNG phải liên từ nối hai chủ ngữ ngang hàng) → động từ chia theo chủ ngữ chính đứng trước cụm chèn, bỏ qua phần chèn thêm: <span class="gr-ex">The manager, as well as the staff, <b>is</b> attending. <i>(Chia theo "the manager" — số ít; nếu muốn số nhiều phải dùng "and": "The manager and the staff are attending".)</i></span></li>
<li><b>A number of</b> + danh từ số nhiều → động từ <b>số nhiều</b> (vì "a number of" ở đây có nghĩa như "several — vài, một số"); <b>The number of</b> → động từ <b>số ít</b> (vì chủ ngữ thật là "the number" — con số, chỉ MỘT con số): <span class="gr-ex">A number of students <b>are</b> absent. <i>(Vài học sinh vắng.)</i> / The number of students <b>is</b> rising. <i>(Con số [học sinh] đang tăng.)</i></span></li>
<li><b>Either…or / Neither…nor</b> → chia theo danh từ <b>gần động từ nhất</b> (không phải danh từ đầu tiên): <span class="gr-ex">Neither the teacher nor the <b>students were</b> late. <i>(Chia theo "students" vì nó đứng ngay trước động từ.)</i></span></li>
<li><b>Cụm giới từ chen giữa chủ ngữ và động từ</b> — đây là cạm bẫy phổ biến nhất: cụm "of + danh từ" đứng sau chủ ngữ KHÔNG phải là chủ ngữ, chỉ bổ nghĩa cho nó. <span class="gr-ex">The <b>box</b> of chocolates <b>is</b> on the table. <i>(Chủ ngữ thật là "the box" — số ít, không phải "chocolates".)</i></span></li>
<li><b>Mệnh đề danh từ / cụm V-ing / to-V làm chủ ngữ</b> → LUÔN số ít, dù bên trong có từ số nhiều: <span class="gr-ex"><b>Learning</b> new languages <b>takes</b> time. / <b>What she said</b> <b>surprises</b> me.</span></li>
</ul>
<p class="gr-note">Cách kiểm tra nhanh nhất khi gặp câu dài: gạch bỏ mọi cụm giới từ và cụm chèn thêm, tìm ra ĐÚNG một danh từ/đại từ làm chủ ngữ chính, rồi mới chia động từ theo nó.</p>

<h4>Hòa hợp với các dạng chủ ngữ đặc biệt khác</h4>
<ul>
<li><b>Danh từ tập thể (collective noun — chỉ một nhóm nhưng là MỘT danh từ số ít)</b> như team, family, government, staff, committee: thường chia SỐ ÍT khi nhấn mạnh cả nhóm hành động NHƯ MỘT THỂ THỐNG NHẤT, nhưng có thể chia SỐ NHIỀU (trong tiếng Anh-Anh) khi nhấn mạnh các thành viên hành động RIÊNG LẺ: <span class="gr-ex">The team <b>is</b> playing well this season. <i>(Cả đội, như một khối.)</i> / The team <b>are</b> arguing among themselves. <i>(Từng thành viên cãi nhau — Anh-Anh chấp nhận số nhiều ở đây.)</i></span></li>
<li><b>Tên môn học/lĩnh vực kết thúc bằng "-ics"</b> (mathematics, physics, economics, statistics) — TRÔNG như số nhiều nhưng LUÔN chia số ít vì chỉ MỘT môn/lĩnh vực: <span class="gr-ex">Mathematics <b>is</b> my favourite subject.</span></li>
<li><b>Đơn vị đo lường, tiền bạc, thời gian, khoảng cách được coi là MỘT tổng thể</b> → chia số ít dù danh từ ở dạng số nhiều: <span class="gr-ex">Ten dollars <b>is</b> not enough. <i>(Coi 10 đô như MỘT số tiền, không phải đếm từng tờ.)</i> / Five years <b>is</b> a long time.</span></li>
<li><b>Tựa đề sách/phim/tổ chức ở dạng số nhiều</b> → vẫn chia số ít vì đó là TÊN của MỘT tác phẩm/tổ chức: <span class="gr-ex">"The Avengers" <b>is</b> a popular movie.</span></li>
</ul>
<p class="gr-note">Bài tập tự kiểm tra: gạch chân chủ ngữ THẬT trong câu "The results of the experiment, which took several years to complete, ___ surprising." — đáp án là "were" (chia theo "the results" số nhiều, bỏ qua toàn bộ cụm "of the experiment" và mệnh đề quan hệ chen giữa).</p>`,
      },
      {
        title: "Câu điều kiện (Conditionals)",
        html: `
<p>Câu điều kiện gồm hai <b>mệnh đề</b> (xem lại khái niệm Mệnh đề ở bài "Nền tảng"): mệnh đề <b>if</b> (nêu điều kiện) và mệnh đề chính (nêu kết quả nếu điều kiện đó xảy ra). Chọn đúng loại nào phụ thuộc vào việc điều kiện đó <b>có khả năng xảy ra hay chỉ là giả định</b>, và <b>thuộc mốc thời gian nào</b>.</p>
<div class="gr-scroll"><table>
<tr><th>Loại</th><th>Cấu trúc</th><th>Ý nghĩa</th></tr>
<tr><td>Loại 0</td><td>If + HT đơn, HT đơn</td><td>chân lý, luôn đúng</td></tr>
<tr><td>Loại 1</td><td>If + HT đơn, will + V</td><td>có thể xảy ra ở tương lai</td></tr>
<tr><td>Loại 2</td><td>If + QK đơn, would + V</td><td>trái với hiện tại (giả định)</td></tr>
<tr><td>Loại 3</td><td>If + QK hoàn thành, would have + V3</td><td>trái với quá khứ (tiếc nuối)</td></tr>
</table></div>

<h4>Diễn giải từng loại kèm lý do chọn thì đó</h4>
<ul>
<li><b>Loại 0 — quy luật hiển nhiên/luôn đúng:</b> cả hai vế đều dùng hiện tại đơn vì đây là sự thật không đổi, không phải dự đoán. <span class="gr-ex">If you <b>heat</b> ice, it <b>melts</b>. <i>(Cứ đun đá là nó tan — lúc nào cũng vậy.)</i></span></li>
<li><b>Loại 1 — điều kiện có thật, khả năng xảy ra cao ở tương lai:</b> vế điều kiện dùng hiện tại đơn (dù nói về tương lai — quy tắc: sau "if" không dùng "will"), vế kết quả dùng "will". <span class="gr-ex">If it <b>rains</b> tomorrow, we <b>will stay</b> home. <i>(Nếu mai trời mưa — hoàn toàn có thể xảy ra — chúng ta sẽ ở nhà.)</i></span></li>
<li><b>Loại 2 — tưởng tượng trái với thực tế ở HIỆN TẠI:</b> vế điều kiện lùi về quá khứ đơn (nhưng KHÔNG mang nghĩa quá khứ — đây là cách tiếng Anh đánh dấu "giả định, không có thật" bằng hình thức quá khứ), vế kết quả dùng "would". <span class="gr-ex">If I <b>were</b> rich, I <b>would travel</b> the world. <i>(Giá mà tôi giàu — thực tế bây giờ tôi không giàu.)</i></span> Lưu ý: trong câu điều kiện loại 2 (và các cấu trúc giả định khác), dùng <b>were</b> cho MỌI ngôi kể cả I/he/she/it (thay vì "was") — đây là "subjunctive mood" (thức giả định), xem thêm bài "Câu ước & giả định".</li>
<li><b>Loại 3 — tiếc nuối về một việc đã KHÔNG xảy ra trong quá khứ, không thể thay đổi được nữa:</b> vế điều kiện dùng quá khứ hoàn thành, vế kết quả dùng "would have + V3". <span class="gr-ex">If she <b>had studied</b> harder, she <b>would have passed</b>. <i>(Giá mà cô ấy đã học chăm hơn — nhưng thực tế đã không học chăm, và kỳ thi đã qua rồi, không sửa được nữa.)</i></span></li>
</ul>

<h4>Điều kiện hỗn hợp (mixed conditionals) & biến thể</h4>
<ul>
<li><b>Hỗn hợp (điều kiện ở quá khứ → kết quả ở hiện tại):</b> khi một hành động/quyết định TRONG QUÁ KHỨ tạo ra hệ quả kéo dài tới HIỆN TẠI. Vế điều kiện dùng quá khứ hoàn thành (như loại 3), vế kết quả dùng "would + V nguyên mẫu" (như loại 2, vì kết quả đang ở hiện tại): <span class="gr-ex">If I <b>had saved</b> money then, I <b>would be</b> rich now. <i>(Nếu ngày đó tôi đã tiết kiệm tiền — quá khứ — thì bây giờ tôi đã giàu — hiện tại.)</i></span></li>
<li><b>Đảo ngữ trang trọng</b> (bỏ "if", đảo trợ động từ lên trước chủ ngữ — xem thêm bài "Đảo ngữ"): dùng trong văn phong trang trọng/học thuật. <i>Were I you, I would accept. (= If I were you…) / Had she known, she would have come. (= If she had known…)</i></li>
<li>Có thể thay <b>if</b> bằng <b>unless</b> (mang nghĩa "nếu KHÔNG" — tương đương "if…not"): <span class="gr-ex">You will fail <b>unless</b> you practise. <i>(= if you don't practise.)</i></span></li>
<li><b>if only</b> — dạng nhấn mạnh cảm xúc tiếc nuối/ước muốn mạnh hơn "wish", theo đúng cấu trúc thì như loại 2/3: <i>If only I had more time!</i></li>
</ul>
<p class="gr-note">Lỗi hay gặp nhất: dùng "will" ngay trong mệnh đề "if" ở loại 1 — "~~If it will rain, we will stay home~~" SAI, mệnh đề "if" không bao giờ chia "will" (trừ khi "will" mang nghĩa "sẵn lòng/đồng ý" chứ không phải thì tương lai: "If you <b>will</b> just wait a moment…" — rất hiếm gặp).</p>`,
      },
      {
        title: "Câu bị động (Passive Voice)",
        html: `
<p>Trong câu <b>chủ động (active voice)</b>, chủ ngữ là người/vật THỰC HIỆN hành động: <i>The committee approved the plan.</i> (Ủy ban [chủ ngữ, người thực hiện] phê duyệt kế hoạch.) Trong câu <b>bị động (passive voice)</b>, chủ ngữ là người/vật CHỊU hành động đó — tức Tân ngữ của câu chủ động (xem lại khái niệm Tân ngữ ở bài "Nền tảng") được đưa lên làm chủ ngữ mới.</p>
<p>Ta dùng bị động khi muốn <b>nhấn mạnh vào đối tượng chịu tác động</b> thay vì người thực hiện, hoặc khi <b>không biết / không quan trọng / không muốn nêu</b> ai làm việc đó. Đây là công cụ rất đắc lực trong văn học thuật và báo chí vì giọng văn khách quan hơn, không cần chỉ đích danh ai chịu trách nhiệm.</p>

<h4>Nguyên tắc chuyển đổi chủ động → bị động</h4>
<p>Ba bước: (1) Tân ngữ của câu chủ động → lên làm CHỦ NGỮ MỚI. (2) Động từ đổi thành <span class="gr-formula">be + V3 (quá khứ phân từ)</span>, trong đó "be" phải chia ĐÚNG THÌ giống hệt câu chủ động ban đầu. (3) Chủ ngữ cũ (nếu vẫn cần nhắc tới) → đưa xuống cuối câu, sau giới từ <b>by</b> (có thể bỏ hẳn nếu không quan trọng — đây chính là lý do bị động hay được dùng để "giấu" chủ thể hành động).</p>
<div class="gr-scroll"><table>
<tr><th>Thì</th><th>Chủ động</th><th>Bị động (be chia đúng thì này)</th></tr>
<tr><td>HT đơn</td><td>writes</td><td>is written</td></tr>
<tr><td>HT tiếp diễn</td><td>is writing</td><td>is being written</td></tr>
<tr><td>QK đơn</td><td>wrote</td><td>was written</td></tr>
<tr><td>QK tiếp diễn</td><td>was writing</td><td>was being written</td></tr>
<tr><td>HT hoàn thành</td><td>has written</td><td>has been written</td></tr>
<tr><td>QK hoàn thành</td><td>had written</td><td>had been written</td></tr>
<tr><td>Tương lai đơn</td><td>will write</td><td>will be written</td></tr>
<tr><td>Động từ khiếm khuyết</td><td>must write</td><td>must be written</td></tr>
</table></div>
<p class="gr-ex">Chủ động: The committee <b>approved</b> the plan. → Bị động: The plan <b>was approved</b> (by the committee). <i>(Kế hoạch đã được thông qua [bởi ủy ban].)</i></p>

<h4>Câu có hai tân ngữ — chuyển được theo hai cách</h4>
<p>Với động từ có cả tân ngữ trực tiếp và gián tiếp (give, tell, show — xem lại bài "Nền tảng"), CẢ HAI tân ngữ đều có thể lên làm chủ ngữ bị động, tạo hai câu bị động khác nhau: <span class="gr-ex">She gave him a book. → <b>He</b> was given a book (by her). <i>(nhấn "anh ấy" — phổ biến hơn)</i> / <b>A book</b> was given to him (by her).</span></p>

<h4>Ứng dụng thực tế trong IELTS</h4>
<p><b>Mô tả quy trình (Writing Task 1 — process diagram)</b> gần như luôn dùng bị động, vì trọng tâm là CÁC BƯỚC diễn ra, không quan trọng ai/cái gì thực hiện: <span class="gr-ex">First, the beans <b>are harvested</b>; then they <b>are dried</b> and <b>roasted</b>. <i>(Đầu tiên hạt cà phê được thu hoạch; sau đó được phơi khô và rang.)</i></span> Trong Writing Task 2, bị động giúp câu văn mang tính khách quan, học thuật hơn khi bàn về vấn đề xã hội: <i>It is widely believed that… / Steps should be taken to…</i></p>

<h4>Khi nào KHÔNG chuyển được sang bị động</h4>
<p class="gr-note">Chỉ <b>ngoại động từ</b> (có tân ngữ — xem bài "Nền tảng") mới chuyển sang bị động được, vì bị động cần "mượn" tân ngữ làm chủ ngữ mới. "He slept" không có dạng bị động vì "sleep" là <b>nội động từ</b>, không có tân ngữ để mượn. Tương tự "happen, occur, exist, seem, appear, belong to" đều không có dạng bị động.</p>`,
      },
      {
        title: "Câu tường thuật (Reported Speech)",
        html: `
<p><b>Lời nói trực tiếp (direct speech)</b> là trích dẫn nguyên văn lời ai đó, đặt trong dấu ngoặc kép: <i>She said, "I am tired."</i> <b>Lời nói gián tiếp / câu tường thuật (reported/indirect speech)</b> là thuật lại Ý của lời nói đó bằng lời của người kể, không trích nguyên văn: <i>She said (that) she was tired.</i> Vì thời điểm nói đã lùi vào quá khứ so với lúc thuật lại, ta thường phải <b>lùi thì một bậc</b> và đổi các đại từ, trạng từ chỉ thời gian/nơi chốn cho phù hợp với góc nhìn mới.</p>

<h4>Quy tắc lùi thì (backshift)</h4>
<div class="gr-scroll"><table>
<tr><th>Lời nói trực tiếp</th><th>Lời tường thuật (lùi 1 bậc)</th></tr>
<tr><td>Hiện tại đơn</td><td>Quá khứ đơn</td></tr>
<tr><td>Hiện tại tiếp diễn</td><td>Quá khứ tiếp diễn</td></tr>
<tr><td>Hiện tại hoàn thành</td><td>Quá khứ hoàn thành</td></tr>
<tr><td>Quá khứ đơn</td><td>Quá khứ hoàn thành</td></tr>
<tr><td>will</td><td>would</td></tr>
<tr><td>can</td><td>could</td></tr>
<tr><td>may</td><td>might</td></tr>
<tr><td>must (nghĩa vụ)</td><td>had to (hoặc giữ nguyên "must")</td></tr>
</table></div>

<h4>Đổi đại từ, trạng từ chỉ thời gian/nơi chốn</h4>
<p>Vì góc nhìn đã chuyển từ "người nói lúc đó" sang "người kể lúc này", các từ chỉ thời gian/nơi chốn tương đối cũng phải đổi: <b>now</b> → then · <b>today</b> → that day · <b>tomorrow</b> → the next day / the following day · <b>yesterday</b> → the day before / the previous day · <b>here</b> → there · <b>this</b> → that · <b>ago</b> → before.</p>
<p class="gr-ex">Trực tiếp: "I <b>am</b> tired <b>now</b>," she said. → Tường thuật: She said (that) she <b>was</b> tired <b>then</b>. <i>(Đại từ "I" cũng đổi thành "she" tùy người kể là ai.)</i></p>

<h4>Câu hỏi & câu mệnh lệnh tường thuật — cấu trúc khác câu tường thuật thông thường</h4>
<ul>
<li><b>Câu hỏi Yes/No</b> (không có từ để hỏi): dùng động từ tường thuật <i>ask/wonder + if/whether</i>, và QUAN TRỌNG — đưa mệnh đề về trật tự KHẲNG ĐỊNH (S trước V), không giữ đảo ngữ như câu hỏi gốc: <span class="gr-ex">He asked, "Are you ready?" → He asked <b>if I was</b> ready. <i>(không phải "if was I ready".)</i></span></li>
<li><b>Câu hỏi Wh-</b> (có từ để hỏi: what, where, when, why, how…): giữ nguyên từ để hỏi ở đầu mệnh đề, cũng đưa về trật tự khẳng định: <span class="gr-ex">"Where do you live?" → She asked <b>where I lived</b>. <i>(không phải "where did I live".)</i></span></li>
<li><b>Câu mệnh lệnh/yêu cầu:</b> dùng <i>told/asked/ordered + tân ngữ + (not) to V (nguyên mẫu có to)</i>, không lùi thì vì mệnh lệnh không có "thì" để lùi: <span class="gr-ex">"Close the door," he said. → He told me <b>to close</b> the door. / "Don't be late," she said. → She told me <b>not to be</b> late.</span></li>
</ul>
<p class="gr-note">KHÔNG lùi thì khi lời nói gốc là một chân lý/sự thật luôn đúng, không phụ thuộc thời gian: <i>The teacher said the Earth is round.</i> (không bắt buộc phải nói "was round" dù về mặt kỹ thuật lùi thì cũng không sai).</p>`,
      },
      {
        title: "Mệnh đề quan hệ (Relative Clauses)",
        html: `
<p><b>Mệnh đề quan hệ</b> là một <b>mệnh đề</b> (xem lại khái niệm này ở bài "Nền tảng" — có đủ chủ ngữ + động từ chia) dùng để <b>bổ nghĩa cho một danh từ</b> đứng ngay trước nó, thay vì phải tách thành một câu riêng biệt. Nhờ đó câu văn gọn hơn và tự nhiên/"cao cấp" hơn về mặt văn phong. Nó luôn bắt đầu bằng một <b>đại từ quan hệ (relative pronoun)</b>.</p>
<p class="gr-ex">Hai câu rời: <i>I have a friend. My friend lives in Paris.</i> → Gộp bằng mệnh đề quan hệ: <i>I have a friend who lives in Paris.</i></p>

<h4>Chọn đúng đại từ quan hệ</h4>
<ul>
<li><b>who</b> — thay cho <b>người</b>, làm chủ ngữ của mệnh đề quan hệ: <span class="gr-ex">The scientist <b>who</b> discovered penicillin was Fleming. <i>("who" thay cho "the scientist", đóng vai trò chủ ngữ của "discovered".)</i></span></li>
<li><b>whom</b> — thay cho <b>người</b>, làm tân ngữ của mệnh đề quan hệ (trang trọng, ít dùng trong văn nói): <span class="gr-ex">The man <b>whom</b> I met yesterday is a doctor.</span></li>
<li><b>which</b> — thay cho <b>vật/sự việc</b> (không dùng cho người): <span class="gr-ex">The book <b>which</b> I bought is fascinating.</span></li>
<li><b>that</b> — thay được cho CẢ người lẫn vật, nhưng CHỈ dùng được trong mệnh đề xác định (xem mục dưới), không dùng trong mệnh đề không xác định.</li>
<li><b>whose</b> — chỉ quan hệ <b>sở hữu</b> (của ai/của cái gì), theo sau luôn là một danh từ: <span class="gr-ex">The student <b>whose</b> project won is here. <i>("dự án CỦA học sinh đó" thắng giải.)</i></span></li>
<li><b>where</b> — thay cho nơi chốn (= in/at which): <span class="gr-ex">This is the city <b>where</b> I was born.</span></li>
<li><b>when</b> — thay cho thời gian (= at/in which): <span class="gr-ex">I remember the day <b>when</b> we first met.</span></li>
<li><b>why</b> — thay cho lý do, chỉ theo sau "the reason": <span class="gr-ex">That's the reason <b>why</b> she left.</span></li>
</ul>

<h4>Hai loại mệnh đề quan hệ — khác biệt cốt lõi về Ý NGHĨA và DẤU CÂU</h4>
<ul>
<li><b>Xác định (defining/restrictive):</b> cung cấp thông tin <b>BẮT BUỘC</b> để xác định chính xác danh từ đang nói tới — bỏ mệnh đề này đi, câu sẽ mất nghĩa hoặc mơ hồ. KHÔNG dùng dấu phẩy. <span class="gr-ex">People <b>who exercise regularly</b> live longer. <i>(Không phải TẤT CẢ mọi người — chỉ những người có tập thể dục đều đặn.)</i></span></li>
<li><b>Không xác định (non-defining/non-restrictive):</b> chỉ là thông tin THÊM VÀO, bỏ đi câu vẫn đủ nghĩa và đúng ngữ pháp. LUÔN có dấu phẩy bao quanh, và KHÔNG được dùng "that". <span class="gr-ex">My father, <b>who is 60</b>, still works. <i>(Tôi chỉ có một người cha — mệnh đề "who is 60" chỉ là thông tin phụ thêm, không dùng để phân biệt ông với người cha nào khác.)</i></span></li>
</ul>
<p class="gr-note">Cách phân biệt nhanh: đọc thử câu mà bỏ hẳn mệnh đề quan hệ đi. Nếu câu còn lại vẫn RÕ NGHĨA, đủ thông tin → đó là loại không xác định (cần dấu phẩy). Nếu câu còn lại bị MẤT nghĩa quan trọng hoặc mơ hồ (không biết đang nói về ai/cái gì) → đó là loại xác định (không dấu phẩy).</p>

<h4>Rút gọn mệnh đề quan hệ (rất hữu ích để đa dạng câu trong IELTS)</h4>
<ul>
<li><b>Mệnh đề chủ động → rút gọn thành cụm V-ing:</b> bỏ đại từ quan hệ + động từ "be" (nếu có), đổi động từ chính thành V-ing: <span class="gr-ex">The man who is waiting outside → the man <b>waiting</b> outside.</span></li>
<li><b>Mệnh đề bị động → rút gọn thành cụm V3 (quá khứ phân từ):</b> <span class="gr-ex">The report which was written by her → the report <b>written</b> by her.</span></li>
</ul>
<p class="gr-note">Chỉ rút gọn được khi đại từ quan hệ đóng vai trò CHỦ NGỮ của mệnh đề quan hệ (who/which/that làm chủ ngữ) — không rút gọn được khi nó là tân ngữ hoặc dùng "whose".</p>`,
      },
      {
        title: "Danh động từ & Động từ nguyên mẫu (Gerund / Infinitive)",
        html: `
<p>Khi một động từ (gọi là "động từ 2") đi ngay sau một động từ khác (động từ chính) trong cùng một mệnh đề, nó KHÔNG được giữ nguyên dạng mà phải chuyển thành một trong hai dạng: <b>V-ing (danh động từ — gerund)</b> hoặc <b>to V (động từ nguyên mẫu có "to" — to-infinitive)</b>. Danh động từ V-ing thực chất hoạt động NHƯ MỘT DANH TỪ trong câu (có thể làm chủ ngữ, tân ngữ — xem lại bài "Nền tảng"), còn to-V mang tính hướng tới một mục đích/ý định chưa xảy ra. Vấn đề là: mỗi động từ chính "kén" một dạng cố định phía sau, không có quy tắc chung — phải học thuộc theo nhóm nghĩa.</p>

<h4>Nhóm động từ theo sau bởi TO + V (to-infinitive)</h4>
<p>Đây thường là các động từ mang ý nghĩa <b>hướng tới tương lai, một dự định/mục tiêu CHƯA xảy ra</b>: want, decide, hope, plan, agree, promise, refuse, offer, expect, learn, manage, afford, fail, intend, wish, choose, tend.</p>
<p class="gr-ex">She <b>decided to move</b> abroad. <i>(Quyết định — việc chuyển đi vẫn chưa xảy ra tại thời điểm quyết định.)</i> / I can't <b>afford to buy</b> a car. <i>(Việc mua xe — dự định, chưa thực hiện.)</i></p>

<h4>Nhóm động từ theo sau bởi V-ing (gerund)</h4>
<p>Thường chỉ việc <b>đang/đã làm, một sở thích/thói quen, hoặc sự tránh né/ngừng lại</b> — tức hành động được nhìn nhận như một "khái niệm" chung chung hơn là một dự định cụ thể: enjoy, avoid, mind, finish, suggest, consider, admit, deny, practise, imagine, keep, risk, miss, dislike, delay, postpone.</p>
<p class="gr-ex">I <b>enjoy reading</b>. <i>(Sở thích — một hoạt động nói chung, không phải một dự định cụ thể.)</i> / He <b>avoided answering</b> the question. <i>(Tránh né — hành động cụ thể đã diễn ra.)</i></p>

<h4>Luôn dùng V-ing sau giới từ</h4>
<p>Đây là quy tắc TUYỆT ĐỐI, không có ngoại lệ: bất kỳ động từ nào đứng ngay sau một giới từ (in, on, at, for, about, of…) đều PHẢI ở dạng V-ing, không bao giờ dùng "to V". Lý do: về mặt ngữ pháp, giới từ luôn cần một danh từ/cụm danh từ theo sau, mà V-ing đóng vai trò danh từ được (xem lại bài "Nền tảng").</p>
<p class="gr-ex">She is good <b>at solving</b> problems. / Thank you <b>for helping</b> me. / I'm interested <b>in learning</b> Japanese.</p>
<p class="gr-note">Lỗi rất hay gặp: sau "to" là giới từ (không phải dấu hiệu của to-infinitive) trong một số cụm cố định — look forward <b>to</b>, be used <b>to</b>, be accustomed <b>to</b> — những cụm này "to" đóng vai trò GIỚI TỪ nên vẫn phải theo sau bởi V-ing: <i>I look forward to seeing you.</i> (không phải "to see").</p>

<h4>Động từ ĐỔI NGHĨA hoàn toàn tùy theo dạng theo sau — nhóm quan trọng nhất cần phân biệt</h4>
<ul>
<li><b>stop to do</b> (dừng việc đang làm LẠI <i>để</i> làm việc khác — "to do" ở đây là mục đích) ≠ <b>stop doing</b> (ngừng hẳn, không làm việc đó nữa): <span class="gr-ex">He stopped <b>to smoke</b>. <i>(Dừng lại để hút thuốc — đang làm việc khác thì dừng lại hút thuốc.)</i> vs. He stopped <b>smoking</b>. <i>(Anh ấy đã bỏ thuốc — không hút nữa.)</i></span></li>
<li><b>remember to do</b> (nhớ ĐỂ làm — việc đó CHƯA xảy ra, còn phải nhớ mà làm) ≠ <b>remember doing</b> (nhớ ĐÃ làm — việc đó đã xảy ra rồi, giờ nhớ lại): <span class="gr-ex">Remember <b>to lock</b> the door before you leave. <i>(Nhắc nhở — chưa khóa, phải nhớ mà khóa.)</i> vs. I remember <b>locking</b> the door. <i>(Nhớ lại — đã khóa rồi, giờ nhớ lại hành động đó.)</i></span></li>
<li><b>try to do</b> (nỗ lực, cố gắng làm một việc khó) ≠ <b>try doing</b> (thử một cách/phương án khác xem có hiệu quả không): <span class="gr-ex">I tried <b>to open</b> the door, but it was locked. <i>(Cố mở nhưng không được.)</i> vs. Try <b>restarting</b> your computer. <i>(Thử khởi động lại xem có được không — một giải pháp để thử.)</i></span></li>
<li><b>forget to do</b> (quên phải làm) ≠ <b>forget doing</b> (quên rằng đã từng làm — thường dùng ở thể phủ định "never forget doing"): <span class="gr-ex">I forgot <b>to call</b> her. <i>(Quên gọi — chưa gọi.)</i> vs. I'll never forget <b>meeting</b> him for the first time.</span></li>
</ul>`,
      },
      {
        title: "Động từ khiếm khuyết (Modal Verbs)",
        html: `
<p><b>Động từ khiếm khuyết (modal verbs)</b> — can, could, may, might, must, should, will, would, shall — là nhóm trợ động từ ĐẶC BIỆT: chúng không tự mang nghĩa hành động, mà thêm một lớp <b>SẮC THÁI</b> vào động từ chính đứng sau: khả năng, sự cho phép, nghĩa vụ, lời khuyên, hoặc mức độ chắc chắn của người nói. Đặc điểm ngữ pháp riêng: sau modal verb LUÔN LÀ động từ nguyên mẫu KHÔNG "to" (bare infinitive), và modal verb không bao giờ thêm "-s" dù chủ ngữ là ngôi thứ ba số ít: <i>She can swim.</i> (không phải "She cans swim" hay "She can to swim").</p>

<h4>Nhóm diễn tả khả năng & xin phép</h4>
<ul>
<li><b>can</b> — khả năng ở hiện tại, hoặc xin phép/cho phép một cách thân mật, thông thường: <span class="gr-ex">She <b>can</b> speak three languages. / <b>Can</b> I sit here?</span></li>
<li><b>could</b> — khả năng trong QUÁ KHỨ, hoặc cách xin phép LỊCH SỰ hơn "can" ở hiện tại: <span class="gr-ex">When I was young, I <b>could</b> run fast. / <b>Could</b> I borrow your pen?</span></li>
<li><b>be able to</b> — dùng thay "can/could" ở những vị trí mà modal verb không chia được (vì modal không có dạng "to V", không có dạng hoàn thành riêng): <span class="gr-ex">I <b>will be able to</b> help tomorrow. <i>(Không nói "will can" — hai modal không đứng liền nhau được.)</i></span></li>
</ul>

<h4>Nhóm suy đoán — thể hiện MỨC ĐỘ CHẮC CHẮN của người nói về một sự việc</h4>
<ul>
<li><b>must</b> — suy luận gần như CHẮC CHẮN đúng, dựa trên bằng chứng logic: <span class="gr-ex">The lights are off — they <b>must be</b> asleep. <i>(Đèn tắt hết → chắc chắn họ đang ngủ, đây là suy luận logic chứ không phải nghĩa vụ.)</i></span></li>
<li><b>may / might / could</b> — CÓ THỂ đúng, nhưng không chắc chắn (might có mức độ chắc chắn thấp hơn may một chút): <span class="gr-ex">It <b>might rain</b> later. <i>(Có thể mưa, nhưng không chắc.)</i></span></li>
<li><b>can't</b> — suy luận CHẮC CHẮN KHÔNG ĐÚNG (phủ định của "must" trong nghĩa suy đoán, KHÔNG dùng "mustn't" cho nghĩa này): <span class="gr-ex">She <b>can't be</b> serious. <i>(Chắc chắn cô ấy không nghiêm túc — dựa trên bằng chứng/logic.)</i></span></li>
</ul>

<h4>Nhóm nghĩa vụ, sự cho phép & lời khuyên</h4>
<ul>
<li><b>must</b> vs <b>have to</b> — cả hai đều mang nghĩa "bắt buộc", nhưng khác nguồn gốc của sự bắt buộc đó: <b>must</b> = do chính NGƯỜI NÓI thấy cần thiết (mang tính cá nhân, chủ quan); <b>have to</b> = do HOÀN CẢNH/QUY ĐỊNH bên ngoài áp đặt (khách quan). <span class="gr-ex">I <b>must</b> finish this today. <i>(Tự tôi thấy cần phải xong.)</i> vs. I <b>have to</b> wear a uniform at work. <i>(Quy định của công ty, không phải ý tôi.)</i></span></li>
<li><b>mustn't</b> (cấm — không được phép làm) ≠ <b>don't have to</b> (không cần — có làm hay không đều được, không bắt buộc): đây là cặp RẤT hay bị nhầm vì cả hai đều có "not" nhưng nghĩa hoàn toàn khác nhau. <span class="gr-ex">You <b>mustn't</b> smoke here. <i>(Cấm — làm là vi phạm.)</i> vs. You <b>don't have to</b> come if you're busy. <i>(Không bắt buộc — tùy bạn.)</i></span></li>
<li><b>should / ought to</b> — lời khuyên, ý kiến về điều NÊN làm (không mang tính bắt buộc như must): <span class="gr-ex">You <b>should</b> see a doctor.</span></li>
<li><b>had better</b> — lời khuyên MẠNH hơn "should", hàm ý có HẬU QUẢ xấu nếu không làm theo: <span class="gr-ex">You <b>had better</b> hurry, or you'll miss the bus.</span></li>
</ul>

<h4>Suy đoán về QUÁ KHỨ — cấu trúc modal + have + V3</h4>
<p>Khi muốn suy đoán về một việc đã xảy ra trong quá khứ (không phải hiện tại), dùng công thức <span class="gr-formula">modal + have + V3</span> — giữ nguyên logic mức độ chắc chắn như nhóm suy đoán ở trên, chỉ đổi mốc thời gian:</p>
<p class="gr-ex">She <b>must have left</b> early. <i>(Chắc chắn cô ấy đã rời đi sớm — suy luận về quá khứ.)</i> / He <b>might have forgotten</b>. <i>(Có thể anh ấy đã quên.)</i> / They <b>can't have known</b>. <i>(Chắc chắn họ đã không biết.)</i> / You <b>should have called</b> me. <i>(Đáng lẽ bạn nên gọi tôi — trách móc nhẹ vì việc đó đã KHÔNG xảy ra.)</i></p>`,
      },
      {
        title: "Mạo từ (a / an / the / zero)",
        html: `
<p><b>Mạo từ (article)</b> là từ nhỏ đứng trước danh từ để báo hiệu người nghe/đọc có XÁC ĐỊNH ĐƯỢC chính xác danh từ đó là gì/cái nào hay không. Đây là điểm ngữ pháp tuy nhỏ nhưng RẤT dễ mất điểm vì tiếng Việt hoàn toàn không có khái niệm tương đương — người Việt học tiếng Anh thường hoặc bỏ sót mạo từ, hoặc dùng sai loại.</p>

<h4>a / an — mạo từ KHÔNG xác định (indefinite article)</h4>
<p>Dùng với danh từ <b>đếm được, số ít</b>, khi nhắc tới nó <b>lần đầu tiên</b> (người nghe chưa biết là cái nào cụ thể) hoặc khi nói chung chung về MỘT trong nhiều cái cùng loại. Chọn <b>a</b> hay <b>an</b> dựa vào <b>ÂM</b> đọc của từ đứng ngay sau, KHÔNG phải chữ cái đầu tiên viết ra: <span class="gr-ex"><b>a</b> university <i>(dù bắt đầu bằng chữ "u" nhưng đọc là âm /j/ giống phụ âm, nên dùng "a")</i>, <b>an</b> hour <i>(chữ "h" không phát âm, âm bắt đầu thực chất là /au/ — nguyên âm, nên dùng "an")</i>, <b>an</b> MBA <i>(đọc là "em-bi-ây", bắt đầu bằng âm nguyên âm /e/)</i>.</span></p>

<h4>the — mạo từ XÁC ĐỊNH (definite article)</h4>
<p>Dùng khi người nghe/đọc CÓ THỂ xác định chính xác đang nói về cái nào — vì đã nhắc tới trước đó, vì chỉ có một, hoặc vì ngữ cảnh làm rõ:</p>
<ul>
<li><b>Danh từ đã được nhắc tới ở câu trước</b> (lần đầu dùng a/an, lần sau dùng the vì giờ đã xác định): <span class="gr-ex">I saw <b>a</b> dog yesterday. <b>The</b> dog was huge. <i>(Lần đầu "a dog" — con chó nào đó; lần sau "the dog" — chính con chó vừa nhắc.)</i></span></li>
<li><b>Vật DUY NHẤT, ai cũng hiểu đang nói về cái nào:</b> <b>the</b> sun, <b>the</b> moon, <b>the</b> sky, <b>the</b> Internet, <b>the</b> world.</li>
<li><b>So sánh nhất & số thứ tự</b> (chỉ có MỘT cái "nhất"/"đầu tiên"): <b>the</b> best, <b>the</b> tallest, <b>the</b> first, <b>the</b> only.</li>
<li><b>Tên các đại dương/biển, sông, dãy núi, và tên quốc gia ở dạng số nhiều/có "of":</b> the Pacific (Ocean), the Nile, the Alps, the United States, the Philippines, the United Kingdom.</li>
<li><b>Rõ nghĩa nhờ ngữ cảnh, dù chưa nhắc tới trước đó:</b> <span class="gr-ex">Can you close <b>the</b> door? <i>(Chỉ có một cửa trong phòng — ai cũng hiểu là cửa nào.)</i></span></li>
</ul>

<h4>Zero article — KHÔNG dùng mạo từ</h4>
<p>Không dùng "a/an" lẫn "the" trong các trường hợp: danh từ số nhiều hoặc không đếm được mang nghĩa CHUNG CHUNG (không chỉ một cái/nhóm cụ thể nào), tên riêng (người, hầu hết địa danh/quốc gia số ít), tên các bữa ăn, tên môn học/ngôn ngữ khi nói chung: <span class="gr-ex"><b>Water</b> is essential for life. <i>(Nước nói chung, không phải một lượng nước cụ thể.)</i> / I love <b>music</b>. / She teaches <b>English</b>. / We had <b>breakfast</b> at 7. / <b>Vietnam</b> is in Southeast Asia.</span></p>
<p class="gr-note">So sánh cặp dễ nhầm: <i>I go to school</i> (nghĩa chung — đi học, với vai trò học sinh) ≠ <i>I go to the school</i> (đến tòa nhà trường học cụ thể đó — có thể chỉ để dự một sự kiện, không phải để học).</p>

<h4>Các cặp danh từ dễ nhầm mạo từ nhất</h4>
<ul>
<li><b>go to bed / go to school / go to hospital / go to prison</b> (không mạo từ) — mang nghĩa TRỪU TƯỢNG, gắn với MỤC ĐÍCH chính của nơi đó (ngủ, học, chữa bệnh, chịu án) ≠ <b>go to the hospital / go to the prison</b> (có "the") — chỉ đơn thuần ĐẾN tòa nhà đó vì lý do khác (thăm ai đó, làm việc ở đó nhưng không phải bệnh nhân/phạm nhân).</li>
<li><b>in future</b> (= từ giờ trở đi, mang tính cảnh báo/nhắc nhở) ≠ <b>in the future</b> (= trong tương lai nói chung, một thời điểm chưa xác định): <span class="gr-ex"><b>In future</b>, please arrive on time. <i>(Từ giờ trở đi, hãy đến đúng giờ.)</i> / Robots will do most jobs <b>in the future</b>.</span></li>
<li><b>Tên bữa ăn KHÔNG mạo từ khi nói chung</b> nhưng CÓ mạo từ khi mô tả một bữa ăn CỤ THỂ: <i>We had breakfast at 7.</i> ≠ <i>The breakfast we had at the hotel was delicious.</i></li>
</ul>
<p class="gr-note">Mẹo lên band: mạo từ là điểm CỰC KỲ nhỏ nhưng bị soi rất kỹ ở Grammatical Range & Accuracy. Cách luyện hiệu quả nhất không phải học quy tắc suông mà là ĐỌC NHIỀU và chú ý xem người bản ngữ dùng "a/an/the/zero" ở đâu trong ngữ cảnh tương tự bài bạn đang viết.</p>`,
      },
      {
        title: "So sánh (Comparison)",
        html: `
<p>Cấu trúc so sánh giúp diễn đạt mức độ HƠN – KÉM – BẰNG NHAU giữa hai hay nhiều đối tượng. Cách chia phụ thuộc vào <b>số âm tiết</b> của tính từ/trạng từ đang so sánh (âm tiết — syllable — là một "nhịp" phát âm trong từ, vd "tall" có 1 âm tiết, "beautiful" có 3 âm tiết: beau-ti-ful).</p>

<h4>So sánh hơn (comparative) — hơn MỘT đối tượng khác</h4>
<ul>
<li>Tính từ/trạng từ <b>NGẮN</b> (1 âm tiết): thêm đuôi <b>-er</b>, theo sau bởi <b>than</b>: <span class="gr-ex">tall → tall<b>er than</b>, fast → fast<b>er than</b>.</span></li>
<li>Tính từ/trạng từ <b>DÀI</b> (từ 2 âm tiết trở lên): thêm <b>more</b> phía TRƯỚC, giữ nguyên tính từ: <span class="gr-ex"><b>more</b> expensive than, <b>more</b> important than.</span></li>
<li><b>Ngoại lệ quan trọng</b> — tính từ đúng <b>2 âm tiết</b> nhưng kết thúc bằng <b>-y, -le, -ow, -er</b> vẫn thêm <b>-er</b> (không dùng "more"), vì đây là nhóm âm cuối dễ biến đổi: <span class="gr-ex">happy → happi<b>er</b> <i>(y đổi thành i trước khi thêm -er)</i>, easy → easi<b>er</b>, busy → busi<b>er</b>, simple → simpl<b>er</b>, narrow → narrow<b>er</b>, clever → clever<b>er</b>. <i>(Viết "more happy" là SAI — đây là nhóm từ cực kỳ thông dụng nên lỗi này rất hay bị bắt gặp.)</i></span></li>
</ul>

<h4>So sánh nhất (superlative) — HƠN TẤT CẢ các đối tượng còn lại trong nhóm</h4>
<p>Luôn có mạo từ <b>the</b> đứng trước (vì chỉ có MỘT cái "nhất" — xem lại bài "Mạo từ"): tính từ ngắn thêm <b>the + adj-est</b>; tính từ dài dùng <b>the most + adj</b>: <span class="gr-ex">the tall<b>est</b> / <b>the most</b> beautiful.</span></p>

<h4>So sánh bằng nhau & các cấu trúc so sánh khác</h4>
<ul>
<li><b>Bằng nhau:</b> <span class="gr-formula">as + adj/adv + as</span>; phủ định dùng <span class="gr-formula">not as/so … as</span> (kém hơn, không bằng): <span class="gr-ex">She is <b>as</b> talented <b>as</b> her sister. / This phone is <b>not as</b> expensive <b>as</b> that one. <i>(Điện thoại này rẻ hơn — không đắt bằng cái kia.)</i></span></li>
<li><b>Các dạng so sánh BẤT QUY TẮC</b> (không theo công thức -er/more): good→better→best; bad→worse→worst; little→less→least; much/many→more→most; far→further/farther→furthest/farthest.</li>
<li><b>Cấu trúc "càng… càng…"</b> — diễn tả hai điều thay đổi cùng chiều với nhau: <span class="gr-formula">The + so sánh hơn (1), the + so sánh hơn (2)</span>: <span class="gr-ex"><b>The more</b> you practise, <b>the better</b> you become. <i>(Càng luyện tập nhiều, càng giỏi lên.)</i></span></li>
<li><b>Tăng cấp dần (progressive comparison)</b> — lặp lại tính từ so sánh hơn nối bằng "and", diễn tả một xu hướng đang tăng/giảm liên tục theo thời gian: <span class="gr-ex">The city is getting <b>bigger and bigger</b>. <i>(Với tính từ dài: "more and more expensive".)</i></span></li>
<li><b>Gấp N lần</b>: <span class="gr-formula">N times + as + adj + as</span> hoặc <span class="gr-formula">N times + so sánh hơn + than</span>: <span class="gr-ex">This building is <b>three times as tall as</b> that one.</span></li>
</ul>

<h4>So sánh trong mô tả biểu đồ (Writing Task 1) — ứng dụng thực tế</h4>
<p>So sánh là công cụ CHÍNH để mô tả sự khác biệt giữa các cột/đường trong biểu đồ, thay vì chỉ liệt kê số liệu rời rạc: <span class="gr-ex">Sales in 2020 were <b>significantly higher than</b> those in 2019. / The number of tourists was <b>almost twice as high as</b> in the previous year. / Country A had <b>the lowest</b> unemployment rate among the four countries.</span></p>
<p>Kết hợp so sánh với trạng từ chỉ MỨC ĐỘ chênh lệch giúp câu văn chính xác và tự nhiên hơn: <b>slightly</b> higher (nhỉnh hơn một chút), <b>considerably/significantly/substantially</b> higher (cao hơn đáng kể), <b>marginally</b> lower (thấp hơn không đáng kể), <b>far</b> more expensive (đắt hơn nhiều).</p>

<h4>Lỗi thường gặp</h4>
<ul>
<li><b>Dùng cả "more" và "-er" cùng lúc:</b> "~~more taller~~" sai — chỉ chọn MỘT trong hai cách.</li>
<li><b>Quên "than" sau so sánh hơn:</b> "~~She is taller me~~" sai, phải có "than": <i>She is taller than me.</i></li>
<li><b>Nhầm đại từ sau "than":</b> văn nói thân mật chấp nhận "than me", nhưng văn viết học thuật/trang trọng chuẩn mực hơn khi dùng "than I am" (so sánh đầy đủ hai mệnh đề).</li>
</ul>`,
      },
      {
        title: "Liên từ & mệnh đề (Conjunctions)",
        html: `
<p><b>Liên từ (conjunction)</b> là từ dùng để NỐI hai ý/hai mệnh đề lại với nhau, thể hiện mối quan hệ logic giữa chúng (nguyên nhân, tương phản, mục đích…). Dùng đúng liên từ giúp bài viết mạch lạc; lỗi phổ biến nhất là NHẦM LẪN giữa (a) liên từ đi với một MỆNH ĐỀ đầy đủ (có chủ ngữ + động từ chia — xem bài "Nền tảng") và (b) giới từ đi với một DANH TỪ/cụm danh từ/V-ing — hai nhóm này không thể dùng thay thế nhau dù đôi khi dịch ra tiếng Việt nghe giống nhau.</p>

<h4>Diễn tả nguyên nhân</h4>
<ul>
<li><b>because / since / as</b> — LIÊN TỪ, theo sau là một MỆNH ĐỀ đầy đủ (S + V): <span class="gr-ex"><b>Because</b> it was raining, we stayed home. <i>("it was raining" là mệnh đề đầy đủ.)</i></span></li>
<li><b>because of / due to / owing to</b> — GIỚI TỪ, theo sau là DANH TỪ hoặc V-ing, KHÔNG phải mệnh đề: <span class="gr-ex">We stayed home <b>because of</b> the rain. <i>("the rain" chỉ là một danh từ, không có động từ chia.)</i></span></li>
</ul>
<p class="gr-note">Lỗi rất hay gặp: viết "~~because of it was raining~~" — sai vì sau giới từ "because of" không thể là một mệnh đề đầy đủ có chủ ngữ + động từ chia.</p>

<h4>Diễn tả sự tương phản</h4>
<ul>
<li><b>although / though / even though</b> — LIÊN TỪ + mệnh đề đầy đủ ("even though" mang sắc thái nhấn mạnh hơn): <span class="gr-ex"><b>Although</b> he was tired, he kept working.</span></li>
<li><b>despite / in spite of</b> — GIỚI TỪ + danh từ / V-ing (KHÔNG phải mệnh đề — lỗi y hệt kiểu như because of): <span class="gr-ex"><b>Despite</b> the rain, they played. / <b>Despite</b> feeling tired, she kept working. <i>(Nếu muốn dùng cả mệnh đề, phải thêm "the fact that": despite the fact that it was raining.)</i></span></li>
<li><b>however, nevertheless, on the other hand</b> — đây là TRẠNG TỪ LIÊN KẾT (conjunctive adverb), không phải liên từ thật sự: đứng ĐẦU CÂU MỚI (sau dấu chấm hoặc chấm phẩy), có dấu phẩy ngay sau nó, KHÔNG được nối trực tiếp hai mệnh đề bằng dấu phẩy đơn thuần: <span class="gr-ex">It was hard. <b>However</b>, she succeeded. <i>(hoặc: It was hard; however, she succeeded.)</i></span></li>
</ul>

<h4>Diễn tả mục đích & kết quả</h4>
<ul>
<li><b>Mục đích</b> (làm gì ĐỂ đạt được điều gì): <span class="gr-formula">so that + mệnh đề</span> hoặc <span class="gr-formula">in order to / so as to + V nguyên mẫu</span>: <span class="gr-ex">He left early <b>so that</b> he could catch the train. / He left early <b>in order to</b> catch the train.</span></li>
<li><b>Kết quả</b> (mức độ dẫn tới hệ quả gì): <span class="gr-formula">so + adj + that</span> hoặc <span class="gr-formula">such + (a/an) + adj + N + that</span> — khác nhau ở chỗ "so" đi thẳng với tính từ, còn "such" cần cụm danh từ đầy đủ: <span class="gr-ex">It was <b>so cold that</b> we stayed in. / It was <b>such a cold day that</b> we stayed in.</span></li>
</ul>

<h4>Bổ sung ý (rất hữu ích khi viết luận — Writing Task 2)</h4>
<p>Các từ nối sau đứng đầu câu mới (giống "however"), dùng để thêm một luận điểm/ý bổ sung cùng chiều với ý trước: <b>moreover, furthermore, in addition, besides, what is more, additionally</b>. Ví dụ: <i>Studying abroad broadens one's worldview. Moreover, it improves language skills significantly.</i></p>`,
      },
      {
        title: "Đảo ngữ (Inversion) — nâng cao",
        html: `
<p><b>Đảo ngữ (inversion)</b> là đưa một <b>trạng từ mang nghĩa phủ định/hạn định</b> (never, rarely, only…) hoặc cả một cụm nhấn mạnh lên ĐẦU câu (thay vì vị trí bình thường của nó), rồi ĐẢO trợ động từ ra TRƯỚC chủ ngữ — cấu trúc lúc này trông giống hệt một câu hỏi dù thực chất vẫn là câu khẳng định. Đây là "vũ khí" ghi điểm ở tiêu chí "đa dạng cấu trúc câu" trong IELTS Writing/Speaking band 7+, nhưng chỉ nên dùng 1-2 lần trong cả bài, dùng quá nhiều sẽ khiến văn phong gượng ép.</p>
<p class="gr-ex">Câu bình thường: I <b>have</b> never <b>seen</b> such dedication. → Đảo ngữ: <b>Never have I seen</b> such dedication. <i>(Đưa "never" lên đầu, đảo "have" ra trước "I".)</i></p>

<h4>Sau trạng từ phủ định/hạn định đứng đầu câu</h4>
<ul>
<li><b>Never / Rarely / Seldom / Hardly ever</b> (hiếm khi): <span class="gr-ex"><b>Never have I seen</b> such dedication. / <b>Rarely does she</b> complain.</span></li>
<li><b>Not only … but also</b> (không chỉ… mà còn…) — đảo ngữ ở PHẦN ĐẦU, phần "but also" giữ nguyên trật tự thường: <span class="gr-ex"><b>Not only did</b> she win, <b>but</b> she also broke the record.</span></li>
<li><b>No sooner … than</b> / <b>Hardly/Scarcely … when</b> — diễn tả việc A vừa xong thì việc B xảy ra ngay sau đó, thường đi với quá khứ hoàn thành ở vế đảo ngữ: <span class="gr-ex"><b>No sooner had</b> I arrived <b>than</b> it started to rain. <i>(Tôi vừa đến thì trời bắt đầu mưa.)</i></span></li>
</ul>

<h4>Sau "Only" + trạng ngữ chỉ thời gian/cách thức</h4>
<p>Khi "only" đi kèm một cụm trạng ngữ (only when, only after, only by, only if…) và cả cụm đó đứng đầu câu, mệnh đề chính theo sau PHẢI đảo ngữ: <span class="gr-ex"><b>Only when</b> we lose something <b>do we</b> realise its value. <i>(Chỉ khi mất đi thứ gì đó ta mới nhận ra giá trị của nó.)</i> / <b>Only by</b> practising <b>can you</b> improve.</span></p>

<h4>Đảo ngữ trong câu điều kiện trang trọng (xem lại bài "Câu điều kiện")</h4>
<p>Bỏ hẳn "if", đảo trợ động từ (were/had/should) ra trước chủ ngữ — cách nói này mang tính trang trọng, hay gặp trong văn viết học thuật: <span class="gr-ex"><b>Were I</b> in your position, I would accept. <i>(= If I were in your position…)</i> / <b>Had she known</b>, she would have come. <i>(= If she had known…)</i> / <b>Should you need</b> help, call me. <i>(= If you should need help…)</i></span></p>
<p class="gr-note">Lưu ý: đảo ngữ CHỈ áp dụng khi từ/cụm nhấn mạnh đứng Ở ĐẦU CÂU. Nếu "never/rarely" nằm ở vị trí bình thường trong câu (không lên đầu) thì KHÔNG đảo ngữ: <i>I have never seen such dedication.</i> (bình thường, không đảo) vẫn hoàn toàn đúng — đảo ngữ chỉ là một lựa chọn văn phong, không bắt buộc.</p>

<h4>Cách xác định TRỢ ĐỘNG TỪ nào cần đảo — quy tắc chung</h4>
<p>Nguyên tắc: đảo đúng trợ động từ đã CÓ SẴN trong câu gốc (be, have, will, can, must…); nếu câu gốc là động từ thường chia ở hiện tại/quá khứ đơn (không có trợ động từ sẵn), phải MƯỢN "do/does/did" giống hệt cách tạo câu hỏi:</p>
<ul>
<li>Câu có "be": <i>She is rarely late.</i> → <b>Rarely is she</b> late.</li>
<li>Câu có trợ động từ khiếm khuyết: <i>I can never understand him.</i> → <b>Never can I</b> understand him.</li>
<li>Câu động từ thường, hiện tại đơn → mượn <b>does/do</b>: <i>She rarely complains.</i> → <b>Rarely does she complain</b>. <i>(Chú ý: "complain" trở về nguyên mẫu vì "does" đã mang chức năng chia thì.)</i></li>
<li>Câu động từ thường, quá khứ đơn → mượn <b>did</b>: <i>She never told anyone.</i> → <b>Never did she tell</b> anyone.</li>
</ul>
<p class="gr-note">Đây chính là lý do ví dụ "Not only <b>did</b> she win" ở trên phải mượn "did" — câu gốc "She won" là quá khứ đơn của động từ thường, không có trợ động từ sẵn để đảo.</p>`,
      },
      {
        title: "Đếm được / không đếm được & Lượng từ",
        html: `
<p>Danh từ tiếng Anh chia thành hai loại quan trọng, quyết định việc chọn lượng từ (many/much…), mạo từ (a/an — xem bài "Mạo từ"), và cả cách chia động từ (xem bài "Sự hòa hợp"):</p>
<ul>
<li><b>Danh từ đếm được (countable noun):</b> chỉ những thứ có thể ĐẾM riêng lẻ từng cái một, có dạng số ít VÀ số nhiều: a book / two book<b>s</b>, a chair / three chair<b>s</b>.</li>
<li><b>Danh từ không đếm được (uncountable/mass noun):</b> chỉ những thứ được nhìn nhận như một KHỐI/CHẤT LIỆU/KHÁI NIỆM chung, không đếm riêng lẻ được, và KHÔNG có dạng số nhiều (không thêm -s): water, information, advice, furniture.</li>
</ul>

<div class="gr-scroll"><table>
<tr><th>Lượng từ</th><th>Dùng với danh từ đếm được (số nhiều)</th><th>Dùng với danh từ không đếm được</th></tr>
<tr><td>Nhiều</td><td>many</td><td>much</td></tr>
<tr><td>Ít (mang nghĩa phủ định)</td><td>few</td><td>little</td></tr>
<tr><td>Một ít (đủ dùng)</td><td>a few</td><td>a little</td></tr>
<tr><td>Dùng được cho CẢ HAI loại</td><td colspan="2">some, any, a lot of, plenty of, most, all, no</td></tr>
</table></div>

<h4>Sắc thái tinh tế dễ nhầm: few/little (phủ định) vs a few/a little (tích cực)</h4>
<p>Đây là cặp lượng từ mà cùng một con số nhưng SẮC THÁI cảm xúc hoàn toàn trái ngược nhau — chỉ khác việc có "a" đứng trước hay không:</p>
<ul>
<li><b>few / little</b> (KHÔNG có "a") mang nghĩa <b>phủ định, tiêu cực</b> — "rất ít, gần như không đủ, đáng thất vọng": <span class="gr-ex">He has <b>few</b> friends. <i>(Rất ít bạn — hàm ý cô đơn, đáng buồn.)</i></span></li>
<li><b>a few / a little</b> (CÓ "a") mang nghĩa <b>trung tính/tích cực</b> — "có một ít, không nhiều nhưng đủ dùng, ổn": <span class="gr-ex">He has <b>a few</b> friends. <i>(Có vài người bạn — bình thường, không đáng lo.)</i></span></li>
</ul>

<h4>Danh từ trông "đếm được" theo trực giác tiếng Việt nhưng KHÔNG đếm được trong tiếng Anh</h4>
<p>Đây là nhóm gây lỗi nhiều nhất vì tiếng Việt có thể đếm ("một lời khuyên", "hai thông tin") trong khi tiếng Anh coi chúng là khối chung: <b>information, advice, furniture, equipment, knowledge, research, news, luggage/baggage, homework, progress.</b> KHÔNG được thêm "-s" ("~~informations~~", "~~advices~~" đều sai) và KHÔNG dùng "a/an" trực tiếp trước chúng ("~~an advice~~" sai).</p>
<p>Muốn đếm những danh từ này, phải dùng cụm <span class="gr-formula">a piece of / an item of + danh từ không đếm được</span> làm "đơn vị đếm": <span class="gr-ex"><b>a piece of</b> advice, <b>a piece of</b> furniture, <b>two pieces of</b> information.</span></p>
<p class="gr-note">Một số danh từ có CẢ HAI dạng với nghĩa khác nhau: <i>experience</i> (không đếm được = kinh nghiệm nói chung: "I have experience in teaching") ≠ <i>an experience</i> (đếm được = một trải nghiệm cụ thể: "It was an unforgettable experience"). Tương tự với <i>time, paper, work, room.</i></p>

<h4>Lượng từ khác đáng chú ý</h4>
<ul>
<li><b>a lot of / lots of</b> — dùng được cho CẢ hai loại danh từ, mang tính TRUNG TÍNH, tự nhiên trong văn nói lẫn văn viết không quá trang trọng: <span class="gr-ex">There are <b>a lot of</b> people here. / There is <b>a lot of</b> traffic today.</span></li>
<li><b>plenty of</b> — nghĩa "đủ, thậm chí dư dả", mang sắc thái tích cực hơn "a lot of": <span class="gr-ex">We have <b>plenty of</b> time.</span></li>
<li><b>several</b> — CHỈ dùng với danh từ đếm được số nhiều, nghĩa "một vài, nhiều hơn 2-3": <span class="gr-ex"><b>Several</b> students failed the test.</span></li>
<li><b>a number of</b> (+ danh từ số nhiều, ý "một số") — xem lại cách hòa hợp với động từ ở bài "Sự hòa hợp Chủ ngữ – Động từ".</li>
<li><b>none of</b> — theo sau là danh từ có "the/these/possessive", chia động từ theo danh từ đó (trong văn viết trang trọng nên chia số ít): <span class="gr-ex"><b>None of</b> the students <b>has</b> finished. <i>(văn viết trang trọng — "have" cũng được chấp nhận trong văn nói.)</i></span></li>
</ul>
<p class="gr-note">Mẹo lên band: trong Writing Task 1 khi mô tả số liệu, dùng "the majority of / a significant proportion of / a small number of" thay vì lặp lại "many/a lot of" nhiều lần — vừa chính xác hơn về mặt học thuật, vừa đa dạng từ vựng.</p>`,
      },
      {
        title: "Câu ước & giả định (Wish / Subjunctive)",
        html: `
<p>Cấu trúc "wish" (ước) và <b>thức giả định (subjunctive mood)</b> dùng để diễn đạt điều <b>TRÁI VỚI THỰC TẾ</b> — một mong muốn, một điều tưởng tượng, hoặc một lời khuyên mang tính giả định. Về bản chất, các cấu trúc này dùng chung LOGIC LÙI THÌ với câu điều kiện loại 2/3 (xem lại bài "Câu điều kiện"): muốn diễn tả điều không có thật, tiếng Anh "lùi" động từ về một thì quá khứ hơn bình thường — đây không phải lỗi chia sai thì, mà là QUY TẮC NGỮ PHÁP của thức giả định.</p>

<h4>Wish theo ba mốc thời gian — dùng đúng thì tương ứng</h4>
<ul>
<li><b>Ước về một điều KHÔNG có thật ở HIỆN TẠI:</b> <span class="gr-formula">wish + S + quá khứ đơn</span> (dùng "were" cho mọi ngôi, giống câu điều kiện loại 2): <span class="gr-ex">I wish I <b>had</b> more free time. <i>(Ước gì tôi có nhiều thời gian rảnh hơn — thực tế bây giờ tôi không có nhiều thời gian.)</i></span></li>
<li><b>Ước/tiếc nuối về một điều đã KHÔNG xảy ra trong QUÁ KHỨ:</b> <span class="gr-formula">wish + S + quá khứ hoàn thành</span> (giống câu điều kiện loại 3): <span class="gr-ex">I wish I <b>had studied</b> harder. <i>(Ước gì mình đã học chăm hơn — nhưng thực tế đã không học chăm, chuyện đã qua rồi.)</i></span></li>
<li><b>Ước muốn một điều gì đó THAY ĐỔI trong tương lai, thường là một sự khó chịu/bực mình về hiện tại (KHÔNG dùng cho ước về bản thân người nói):</b> <span class="gr-formula">wish + S + would + V</span>: <span class="gr-ex">I wish it <b>would stop</b> raining. <i>(Ước gì trời ngừng mưa — thể hiện sự khó chịu.)</i></span></li>
</ul>
<p class="gr-note">Lỗi hay gặp: KHÔNG dùng "wish + would" khi chủ ngữ của "wish" và chủ ngữ của mệnh đề sau là CÙNG MỘT người — "~~I wish I would study harder~~" là sai (nghe như đang ra lệnh cho chính mình), phải dùng quá khứ đơn: <i>I wish I studied harder.</i> "Wish + would" chỉ dùng khi chủ thể là NGƯỜI/VẬT KHÁC hoặc một hiện tượng (thời tiết, tiếng ồn…).</p>

<h4>Các cấu trúc giả định liên quan — cùng "họ" với wish</h4>
<ul>
<li><b>would rather</b> + S + quá khứ đơn (muốn NGƯỜI KHÁC làm/không làm gì — chủ ngữ sau "would rather" khác chủ ngữ chính): <span class="gr-ex">I'd rather you <b>didn't</b> smoke here. <i>(Tôi muốn bạn đừng hút thuốc ở đây.)</i></span> So sánh: nếu cùng một chủ ngữ, dùng nguyên mẫu không "to": <i>I'd rather stay home.</i></li>
<li><b>It's (high) time</b> + S + quá khứ đơn (đã đến lúc PHẢI làm gì, hàm ý hơi muộn): <span class="gr-ex">It's time we <b>left</b>. <i>(Đã đến lúc phải đi rồi.)</i></span></li>
<li><b>as if / as though</b> + quá khứ đơn (như thể — diễn tả điều KHÔNG có thật, một sự so sánh giả định): <span class="gr-ex">He talks <b>as if</b> he <b>knew</b> everything. <i>(Anh ta nói như thể biết hết mọi thứ — thực ra không biết hết.)</i></span></li>
<li><b>suggest / recommend / insist / demand that</b> + S + V nguyên mẫu (thức giả định trang trọng, ĐỘNG TỪ KHÔNG chia theo ngôi, kể cả ngôi thứ ba số ít): <span class="gr-ex">The doctor suggested that he <b>rest</b> for a week. <i>(không phải "rests" — đây là thức giả định trang trọng, hay gặp trong văn phong học thuật/trang trọng.)</i></span></li>
</ul>`,
      },
      {
        title: "Giới từ thường gặp (Prepositions)",
        html: `
<p><b>Giới từ (preposition)</b> là từ đứng trước danh từ/đại từ/V-ing để chỉ mối quan hệ về thời gian, nơi chốn, hoặc cách thức (in, on, at, for, of, with, by…). Đây là phần "khó nhằn" nhất với người học vì cách dùng nhiều khi phụ thuộc THÓI QUEN ngôn ngữ chứ không theo quy tắc logic tuyệt đối, và giới từ tiếng Việt hiếm khi dịch 1-1 sang tiếng Anh.</p>

<h4>Giới từ chỉ thời gian: in / on / at — theo nguyên tắc "từ rộng tới hẹp"</h4>
<ul>
<li><b>at</b> — thời điểm CHÍNH XÁC, cụ thể nhất (giờ, các mốc đặc biệt): at 7 o'clock, at night, at noon, at the weekend (Anh-Anh), at Christmas.</li>
<li><b>on</b> — NGÀY cụ thể (thứ trong tuần, ngày tháng, ngày lễ cụ thể): on Monday, on July 4th, on my birthday, on Christmas Day.</li>
<li><b>in</b> — khoảng thời gian RỘNG hơn (tháng, năm, mùa, thế kỷ, buổi trong ngày): in May, in 2026, in summer, in the 21st century, in the morning.</li>
</ul>
<p class="gr-note">Ngoại lệ: "at night" dùng "at" dù "night" nghe như một khoảng thời gian dài — đây là cách dùng cố định cần nhớ riêng, không theo quy tắc chung.</p>

<h4>Giới từ chỉ nơi chốn: in / on / at — theo nguyên tắc tương tự nhưng về KHÔNG GIAN</h4>
<ul>
<li><b>at</b> — MỘT ĐIỂM cụ thể, không quan tâm kích thước không gian bên trong: at the door, at the bus stop, at the corner, at 55 Main Street (địa chỉ cụ thể).</li>
<li><b>on</b> — TRÊN một BỀ MẶT: on the wall, on the table, on the floor, on the second page.</li>
<li><b>in</b> — BÊN TRONG một không gian có ranh giới (phòng, thành phố, quốc gia): in the room, in Hanoi, in Vietnam, in the box.</li>
</ul>

<h4>Giới từ chỉ chuyển động</h4>
<p><b>to</b> (hướng đến, thường với động từ chuyển động: go to, come to), <b>into</b> (đi vào bên trong: walk into the room), <b>onto</b> (đi lên trên bề mặt: jump onto the table), <b>from</b> (xuất phát từ), <b>through</b> (xuyên qua), <b>across</b> (băng qua bề mặt), <b>along</b> (dọc theo).</p>

<h4>Cụm động từ/tính từ + giới từ cố định (collocation) — bắt buộc học theo CỤM, không tách rời</h4>
<p>Đây là nhóm quan trọng nhất vì SAI giới từ ở đây thường không đến từ logic mà từ thói quen ngôn ngữ — phải học thuộc từng cụm: depend <b>on</b>, interested <b>in</b>, good <b>at</b>, afraid <b>of</b>, responsible <b>for</b>, similar <b>to</b>, different <b>from</b>, consist <b>of</b>, focus <b>on</b>, rely <b>on</b>, apologize <b>for</b>, arrive <b>at/in</b>, believe <b>in</b>, complain <b>about</b>, congratulate <b>on</b>, insist <b>on</b>, participate <b>in</b>, succeed <b>in</b>.</p>
<p class="gr-note">Đừng dịch giới từ theo phản xạ tiếng Việt. "Phụ thuộc <b>vào</b>" nghe như "depend <b>into</b>" nhưng đúng phải là depend <b>on</b>; "khác <b>với</b>" không phải "different <b>with</b>" mà là different <b>from</b>. Cách chắc chắn nhất để nhớ đúng là học cả CỤM ngay từ đầu (không học "depend" và "on" tách rời), và đọc/nghe nhiều để quen phản xạ tự nhiên.</p>

<h4>Giới từ chỉ phương tiện, cách thức</h4>
<p><b>by</b> + phương tiện di chuyển (không mạo từ): by car, by bus, by plane — nhưng <b>on foot</b> (đi bộ, ngoại lệ cố định). <b>with</b> + công cụ/dụng cụ: <i>cut it with a knife.</i> <b>by</b> + V-ing diễn tả CÁCH thức làm gì: <i>You can improve by practising every day.</i></p>

<h4>Giới từ ở cuối câu (preposition stranding)</h4>
<p>Trong câu hỏi Wh- và mệnh đề quan hệ, giới từ thường bị "để lại" ở CUỐI câu thay vì đứng ngay trước từ để hỏi/đại từ quan hệ — đây là cách nói TỰ NHIÊN, phổ biến trong cả văn nói lẫn văn viết không quá trang trọng: <span class="gr-ex">Who did you go <b>with</b>? <i>(thay vì "With whom did you go?" — cách nói rất trang trọng, ít dùng.)</i> / This is the book I told you <b>about</b>.</span></p>

<h4>Lỗi thường gặp do ảnh hưởng tiếng Việt</h4>
<ul>
<li><b>Thêm giới từ thừa sau động từ đã mang nghĩa đủ:</b> "~~discuss about~~" sai — "discuss" đã là ngoại động từ, có tân ngữ trực tiếp ngay sau, không cần "about": <i>We discussed the plan.</i> (không phải "discussed about the plan"). Tương tự: <b>enter</b> (không phải "enter into" khi nghĩa là "bước vào"), <b>marry</b> (không phải "marry with").</li>
<li><b>Thiếu giới từ cần thiết:</b> "~~listen music~~" sai, phải là <i>listen to music</i> vì "listen" là nội động từ, cần giới từ mới nối được tân ngữ.</li>
</ul>`,
      },
    ],
  },
  {
    group: "🎯 IELTS — Quy tắc & Chiến lược (2026)",
    topics: [
      {
        title: "Tổng quan format & thang điểm",
        html: `
<p>IELTS gồm 4 kỹ năng, tổng <b>~2 giờ 45 phút</b>. Có 2 loại: <b>Academic</b> (du học) và <b>General Training</b> (định cư/làm việc) — khác nhau ở Reading & Writing.</p>
<div class="gr-scroll"><table>
<tr><th>Kỹ năng</th><th>Thời lượng</th><th>Nội dung</th></tr>
<tr><td>Listening</td><td>~30 phút + chuyển đáp án*</td><td>4 phần, 40 câu</td></tr>
<tr><td>Reading</td><td>60 phút</td><td>3 bài, 40 câu</td></tr>
<tr><td>Writing</td><td>60 phút</td><td>Task 1 (150 từ) + Task 2 (250 từ)</td></tr>
<tr><td>Speaking</td><td>11–14 phút</td><td>Phỏng vấn 3 phần</td></tr>
</table></div>
<p><b>Band điểm:</b> 0–9, làm tròn 0.5. Điểm tổng = trung bình 4 kỹ năng (làm tròn .25→.5, .75→1.0).</p>
<p class="gr-note">*Bản thi trên máy tính: không có 10 phút chuyển đáp án riêng (điền trực tiếp); bản giấy có 10 phút.</p>`,
      },
      {
        title: "Cập nhật 2026 cần biết",
        html: `
<ul>
<li><b>IELTS on Computer</b> ngày càng phổ biến: có kết quả nhanh (thường 1–5 ngày), giao diện gõ trực tiếp, có bộ đếm từ cho Writing. Nội dung & thang điểm <b>giống hệt</b> bản giấy.</li>
<li><b>One Skill Retake:</b> nếu thi trên máy, có thể thi lại <b>một kỹ năng duy nhất</b> mà không phải thi lại cả 4 (tùy trung tâm hỗ trợ).</li>
<li><b>Speaking</b> có thể thi trực tiếp hoặc qua video call với giám khảo thật (không phải AI).</li>
<li>Cấu trúc, số câu, dạng bài và tiêu chí chấm <b>không đổi</b> — hãy tập trung vào kỹ năng cốt lõi thay vì "mẹo lạ".</li>
</ul>
<p class="gr-note">Lưu ý: định dạng IELTS ổn định nhiều năm; hãy luôn kiểm tra ielts.org / trung tâm để có thông tin mới nhất trước ngày thi.</p>`,
      },
      {
        title: "Listening — chiến lược",
        html: `
<ul>
<li>4 phần tăng dần độ khó: (1) hội thoại đời sống, (2) độc thoại đời sống, (3) hội thoại học thuật, (4) bài giảng.</li>
<li><b>Đọc trước câu hỏi</b> trong lúc chờ; gạch chân từ khóa; <b>dự đoán</b> loại thông tin (số, tên, danh từ).</li>
<li>Nghe theo dòng — <b>không dừng lại</b> ở câu đã lỡ; audio chỉ phát <b>một lần</b>.</li>
<li>Cẩn thận <b>bẫy sửa lời</b> ("Actually…", "Sorry, I mean…").</li>
<li>Tuân thủ giới hạn từ ("NO MORE THAN TWO WORDS"); đúng <b>chính tả</b> và số nhiều mới được điểm.</li>
</ul>`,
      },
      {
        title: "Reading — chiến lược",
        html: `
<ul>
<li>60 phút cho 3 bài, 40 câu — trung bình <b>~20 phút/bài</b>; không sa lầy một câu.</li>
<li><b>Skimming</b> lấy ý chính, <b>scanning</b> tìm từ khóa/số liệu. Đọc câu hỏi trước khi đọc kỹ đoạn liên quan.</li>
<li><b>True/False/Not Given:</b> <i>False</i> = mâu thuẫn với bài; <i>Not Given</i> = bài không đề cập. Đừng suy diễn ngoài văn bản.</li>
<li><b>Matching Headings:</b> nắm ý chính từng đoạn; làm câu dễ trước.</li>
<li>Chú ý <b>paraphrase</b> — đáp án hiếm khi trùng nguyên văn.</li>
<li>Luôn dành 1–2 phút <b>chuyển & kiểm tra đáp án</b>.</li>
</ul>`,
      },
      {
        title: "Writing Task 1 (Academic) — quy tắc",
        html: `
<p><b>Yêu cầu:</b> ≥ <b>150 từ</b>, ~<b>20 phút</b>. Mô tả biểu đồ/bảng/quy trình/bản đồ một cách khách quan. <b>Không nêu ý kiến cá nhân.</b></p>
<p><b>Cấu trúc gợi ý (4 đoạn):</b></p>
<ul>
<li><b>Introduction:</b> paraphrase đề bài (đừng chép nguyên).</li>
<li><b>Overview:</b> 2–3 xu hướng/điểm nổi bật nhất (đoạn quan trọng nhất — bắt buộc có).</li>
<li><b>Body 1 & 2:</b> nhóm số liệu và mô tả chi tiết, có so sánh.</li>
</ul>
<p><b>Ngôn ngữ:</b> đa dạng động từ xu hướng (increase, rise, surge, decline, plummet, remain stable), trạng từ mức độ (sharply, gradually, slightly), và <b>bị động</b> cho quy trình.</p>
<p class="gr-note">Overview không phải một câu "cho có" — thiếu hẳn overview là lý do phổ biến nhất khiến Task Achievement bị chặn ở band 5 dù mô tả số liệu rất chi tiết (band 6 trở lên bắt buộc phải có overview chọn lọc đúng xu hướng).</p>
<p class="gr-note">Tiêu chí chấm: Task Achievement · Coherence & Cohesion · Lexical Resource · Grammatical Range & Accuracy (mỗi phần 25%) — xem bảng band chi tiết ở bài "Tiêu chí chấm".</p>`,
      },
      {
        title: "Writing Task 2 — quy tắc & dạng đề",
        html: `
<p><b>Yêu cầu:</b> ≥ <b>250 từ</b>, ~<b>40 phút</b>, chiếm <b>2/3 điểm Writing</b>. Bài luận trình bày quan điểm.</p>
<p><b>Các dạng đề:</b></p>
<ul>
<li><b>Opinion</b> (agree/disagree) — nêu và bảo vệ 1 quan điểm rõ ràng, nhất quán.</li>
<li><b>Discussion</b> (discuss both views + your opinion).</li>
<li><b>Advantages/Disadvantages.</b></li>
<li><b>Problem/Cause – Solution.</b></li>
<li><b>Two-part question</b> (trả lời đủ 2 câu hỏi).</li>
</ul>
<p><b>Cấu trúc 4 đoạn:</b> Introduction (paraphrase + thesis) → Body 1 → Body 2 → Conclusion (tóm tắt + khẳng định lại). Mỗi body: <b>câu chủ đề → giải thích → ví dụ</b>.</p>
<p><b>Bí quyết band cao:</b> trả lời <b>đúng & đủ</b> yêu cầu, ý mạch lạc, từ nối tự nhiên, đa dạng cấu trúc câu (mệnh đề quan hệ, điều kiện, bị động), ví dụ cụ thể.</p>
<p class="gr-note">Ngay ở band 7, giám khảo vẫn trừ vì <b>khái quát hóa quá mức</b> ("all students...", "everyone knows...") hoặc ý phụ lan man thiếu trọng tâm. Mỗi đoạn thân bài nên xoay quanh đúng MỘT ý chính, có dẫn chứng cụ thể (số liệu, ví dụ thật) thay vì phát biểu chung chung.</p>`,
      },
      {
        title: "Speaking — 3 phần & chiến lược",
        html: `
<ul>
<li><b>Part 1 (4–5 phút):</b> hỏi về bản thân (quê quán, sở thích, công việc). Trả lời 2–3 câu, đừng cụt lủn.</li>
<li><b>Part 2 (3–4 phút):</b> "cue card" — 1 phút chuẩn bị, nói 1–2 phút. Bám 4 gạch đầu dòng, kể có mở–thân–kết.</li>
<li><b>Part 3 (4–5 phút):</b> thảo luận trừu tượng liên quan Part 2 — nêu ý kiến, giải thích, so sánh, đưa ví dụ.</li>
</ul>
<p><b>Mẹo:</b> nói trôi chảy quan trọng hơn "hoàn hảo"; dùng <b>từ nối tự nhiên</b> (well, actually, to be honest, I suppose); paraphrase khi bí; đừng học thuộc lòng máy móc.</p>
<p class="gr-note">Giám khảo phân biệt band chủ yếu qua <b>LÝ DO</b> bạn ngập ngừng, không phải số lần: ngập ngừng để tìm TỪ hoặc NGỮ PHÁP cơ bản kéo bạn về band 5–6; ngập ngừng để tìm Ý TIẾP THEO trong lúc câu trước vẫn trôi chảy là bình thường ngay cả ở band 7–8. Đừng cố nói không ngừng nghỉ — hãy để chỗ ngừng đúng lúc, đúng lý do.</p>`,
      },
      {
        title: "Tiêu chí chấm (Band Descriptors) — theo bảng chính thức IELTS.org",
        html: `
<p>Writing & Speaking đều chấm theo <b>4 tiêu chí bằng nhau (25% mỗi tiêu chí)</b>. Bảng dưới đây tóm tắt bằng tiếng Việt điểm KHÁC NHAU cốt lõi giữa các band 5–8, dựa theo "Band Descriptors (public version)" chính thức của IELTS (British Council · IDP · Cambridge — công bố tại ielts.org).</p>
<p class="gr-note">Nguyên tắc chấm quan trọng nhất mà nhiều người bỏ qua: giám khảo chỉ cho một band khi bài <b>ĐẠT ĐỦ mọi đặc điểm tích cực</b> của band đó ("a candidate must fully fit the positive features of the descriptor"). Thiếu một đặc điểm là bị đẩy xuống band ngay dưới, dù các mặt khác đã tốt hơn.</p>

<h4>Writing — Task Response/Achievement · Coherence & Cohesion · Lexical Resource · Grammar</h4>
<div class="gr-scroll"><table>
<tr><th>Band</th><th>Task Response / Achievement</th><th>Coherence & Cohesion</th><th>Lexical Resource</th><th>Grammatical Range & Accuracy</th></tr>
<tr>
<td><b>5</b></td>
<td>Chỉ đáp ứng một phần yêu cầu; ý còn hạn chế, thiếu triển khai, có thể lạc sang chi tiết vụn</td>
<td>Có tổ chức nhưng thiếu mạch lạc tổng thể; lặp từ do thiếu phép thế/quy chiếu</td>
<td>Vốn từ hạn chế nhưng đủ tối thiểu cho đề bài; lỗi chính tả/cấu tạo từ rõ rệt</td>
<td>Câu đơn kiểm soát khá tốt; câu phức có thử nhưng kém chính xác hơn hẳn câu đơn</td>
</tr>
<tr>
<td><b>6</b></td>
<td>Đáp ứng đủ các phần yêu cầu (có phần còn sơ sài); nêu được quan điểm nhưng phần kết có thể mơ hồ/lặp</td>
<td>Sắp xếp mạch lạc, có tiến triển rõ; liên kết đôi khi máy móc hoặc lệch giữa các câu</td>
<td>Đủ từ cho yêu cầu; thử dùng từ ít thông dụng nhưng còn sai; lỗi chính tả không cản trở việc hiểu</td>
<td>Trộn câu đơn & câu phức; có lỗi ngữ pháp/dấu câu nhưng hiếm khi cản trở giao tiếp</td>
</tr>
<tr>
<td><b>7</b></td>
<td>Đáp ứng đủ mọi phần, quan điểm rõ ràng xuyên suốt bài; ý được mở rộng & có dẫn chứng — nhưng dễ <b>khái quát hóa quá mức</b> hoặc ý phụ thiếu trọng tâm</td>
<td>Tổ chức logic, tiến triển rõ; <b>mỗi đoạn có một ý trung tâm rõ ràng</b></td>
<td>Đủ đa dạng để linh hoạt & chính xác; dùng được từ ít thông dụng, có ý thức về văn phong/collocation</td>
<td>Đa dạng cấu trúc phức; nhiều câu không lỗi; kiểm soát tốt ngữ pháp & dấu câu, còn vài lỗi nhỏ</td>
</tr>
<tr>
<td><b>8</b></td>
<td>Đáp ứng đầy đủ & phát triển tốt mọi phần; ý liên quan, được mở rộng, có dẫn chứng</td>
<td>Sắp xếp thông tin/ý logic; quản lý tốt <b>mọi</b> mặt của liên kết & chia đoạn</td>
<td>Vốn từ rộng, linh hoạt, truyền đạt nghĩa chính xác; dùng khéo từ hiếm dù đôi lúc collocation chưa hoàn hảo</td>
<td>Đa dạng cấu trúc, phần lớn câu không lỗi, chỉ thỉnh thoảng sai sót nhỏ</td>
</tr>
</table></div>

<h4>Speaking — Fluency & Coherence · Lexical Resource · Grammar · Pronunciation</h4>
<div class="gr-scroll"><table>
<tr><th>Band</th><th>Fluency & Coherence</th><th>Lexical Resource</th><th>Grammatical Range & Accuracy</th><th>Pronunciation</th></tr>
<tr>
<td><b>5</b></td>
<td>Vẫn nói được nhưng phải dựa vào lặp/tự sửa hoặc nói chậm; ngập ngừng GIỮA CÂU khi tìm từ/ngữ pháp cơ bản</td>
<td>Đủ bàn chủ đề quen lẫn lạ nhưng thiếu linh hoạt; paraphrase chưa chắc thành công</td>
<td>Câu đơn kiểm soát khá tốt; câu phức cố thử nhưng gần như luôn có lỗi, hay phải nói lại</td>
<td>Có một số đặc điểm ngữ âm ổn nhưng phạm vi hẹp; người nghe hiểu được nhưng phải cố gắng</td>
</tr>
<tr>
<td><b>6</b></td>
<td>Duy trì được lượt nói dài; đôi lúc mất mạch lạc vì ngập ngừng/lặp/tự sửa</td>
<td>Đủ để bàn sâu một chủ đề; dùng từ đôi khi chưa hợp nhưng nghĩa vẫn rõ; paraphrase được</td>
<td>Trộn câu ngắn & câu phức, linh hoạt còn hạn chế; câu phức hay lỗi nhưng không cản giao tiếp</td>
<td>Kiểm soát ngữ điệu/trọng âm không đều; người nghe hiểu xuyên suốt mà không cần cố nhiều</td>
</tr>
<tr>
<td><b>7</b></td>
<td>Nói dài không cần gắng sức rõ rệt; ngập ngừng/tự sửa (nếu có) <b>là để tìm từ giữa câu</b>, KHÔNG làm mất mạch lạc chung</td>
<td>Linh hoạt bàn nhiều chủ đề; dùng được từ ít thông dụng, có ý thức về văn phong/collocation dù đôi lúc chưa khớp</td>
<td>Đa dạng cấu trúc, câu không lỗi khá thường xuyên; vài lỗi cơ bản vẫn còn tồn tại</td>
<td>Có hầu hết ưu điểm của band 6, cộng một phần ưu điểm của band 8</td>
</tr>
<tr>
<td><b>8</b></td>
<td>Trôi chảy, hiếm khi lặp/tự sửa; <b>ngập ngừng (nếu có) là để chuẩn bị Ý tiếp theo</b>, không phải để tìm từ hay ngữ pháp</td>
<td>Vốn từ rộng, dùng linh hoạt cho mọi chủ đề kể cả thành ngữ; hiếm khi sai collocation</td>
<td>Đa dạng cấu trúc, phần lớn câu không lỗi</td>
<td>Dùng linh hoạt ngữ điệu/trọng âm để nhấn nghĩa; người nghe hiểu dễ dàng, giọng gần như không ảnh hưởng</td>
</tr>
</table></div>

<p class="gr-note"><b>Ranh giới 6 → 7 quan trọng nhất, ở cả Writing lẫn Speaking, KHÔNG phải "ít lỗi hơn"</b> mà là: (1) mỗi đoạn/mỗi câu trả lời có đúng MỘT ý trung tâm rõ ràng, không lan man; (2) ngập ngừng/tự sửa — nếu có — xảy ra vì đang tìm Ý tiếp theo để nói, chứ không phải vì bí từ hay bí ngữ pháp cơ bản; (3) bắt đầu dùng được từ/cấu trúc ít thông dụng một cách có ý thức (biết khi nào nên và không nên dùng), chứ không chỉ nhồi từ khó.</p>`,
      },
      {
        title: "Từ nối & cụm hữu ích (Writing/Speaking)",
        html: `
<ul>
<li><b>Nêu ý kiến:</b> In my opinion / I strongly believe / From my perspective.</li>
<li><b>Thêm ý:</b> Moreover, Furthermore, In addition, What is more.</li>
<li><b>Tương phản:</b> However, Nevertheless, On the other hand, Whereas.</li>
<li><b>Nguyên nhân–kết quả:</b> Therefore, Consequently, As a result, Owing to.</li>
<li><b>Ví dụ:</b> For instance, For example, A case in point is…</li>
<li><b>Kết luận:</b> In conclusion, To sum up, All things considered.</li>
<li><b>Cụm band cao:</b> play a crucial role in, have a significant impact on, a growing number of, it is widely acknowledged that.</li>
</ul>`,
      },
    ],
  },
];
