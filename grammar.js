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
<p>Trước khi đi vào từng chủ điểm, bạn cần nắm "bộ khung" của một câu tiếng Anh. Khác với tiếng Việt vốn khá linh hoạt, tiếng Anh rất coi trọng <b>trật tự từ</b>: thay đổi vị trí thường làm đổi nghĩa hoặc khiến câu sai.</p>
<h4>Trật tự cơ bản: S – V – O</h4>
<p>Hầu hết câu trần thuật đi theo thứ tự <b>Chủ ngữ (Subject) → Động từ (Verb) → Tân ngữ (Object)</b>, sau đó mới đến các thành phần bổ nghĩa về <i>cách thức – nơi chốn – thời gian</i>.</p>
<p class="gr-ex">She (S) <b>reads</b> (V) English books (O) carefully (cách thức) at the library (nơi chốn) every evening (thời gian).<br><i>Cô ấy đọc sách tiếng Anh một cách cẩn thận ở thư viện mỗi tối.</i></p>
<h4>Các thành phần thường gặp</h4>
<ul>
<li><b>Chủ ngữ:</b> danh từ, đại từ, danh động từ (V-ing) hoặc một mệnh đề. <i>Learning English takes time.</i></li>
<li><b>Động từ:</b> "trái tim" của câu — quyết định thì, thể và sự hòa hợp. Có <b>nội động từ</b> (không cần tân ngữ: <i>He slept.</i>) và <b>ngoại động từ</b> (cần tân ngữ: <i>She bought a book.</i>).</li>
<li><b>Bổ ngữ (complement):</b> theo sau động từ nối (be, become, seem, look…) để mô tả chủ ngữ: <i>She is <b>a teacher</b> / <b>happy</b>.</i></li>
</ul>
<h4>Ba loại câu theo cấu trúc</h4>
<ul>
<li><b>Câu đơn:</b> một mệnh đề độc lập. <i>I like coffee.</i></li>
<li><b>Câu ghép:</b> hai mệnh đề độc lập nối bằng <i>and, but, so, or…</i> <i>I like coffee, <b>but</b> she prefers tea.</i></li>
<li><b>Câu phức:</b> một mệnh đề chính + mệnh đề phụ thuộc (bắt đầu bằng <i>because, although, when, that…</i>). <i>I stayed home <b>because</b> it was raining.</i></li>
</ul>
<p class="gr-note">Mẹo lên band: biết phối hợp cả ba loại câu giúp bài viết vừa mạch lạc vừa "đa dạng cấu trúc" — một tiêu chí chấm quan trọng.</p>`,
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
<li><b>economy / economics:</b> economy = nền kinh tế; economics = môn kinh tế học (chia số ít: <i>Economics <b>is</b> hard</i>).</li>
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
<p>Thì (tense) cho biết hành động xảy ra <b>khi nào</b> và ở <b>trạng thái nào</b> (đã xong, đang diễn ra, kéo dài…). Tiếng Anh có 3 mốc thời gian (hiện tại – quá khứ – tương lai), mỗi mốc có 4 thể (đơn – tiếp diễn – hoàn thành – hoàn thành tiếp diễn), tạo thành 12 thì.</p>
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
<h4>Nguyên tắc chọn thì</h4>
<p>Đừng học vẹt công thức. Hãy tự hỏi ba câu: (1) Hành động thuộc mốc thời gian nào? (2) Nó <b>đang diễn ra</b> hay đã <b>hoàn tất</b>? (3) Có <b>nhấn mạnh sự kéo dài</b> không? Trả lời xong là bạn khoanh vùng được thì cần dùng. Ba nhóm chi tiết ngay bên dưới sẽ giải thích cặn kẽ từng thì.</p>`,
      },
      {
        title: "Nhóm thì HIỆN TẠI (chi tiết 4 thì)",
        html: `
<h4>1. Hiện tại đơn (Present Simple)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + V(s/es)</span> — phủ định <i>do/does not + V</i>, nghi vấn <i>Do/Does + S + V?</i></p>
<p>Đây là thì của những điều <b>mang tính ổn định, lặp lại hoặc đúng như một chân lý</b>, không gắn với một khoảnh khắc cụ thể:</p>
<ul>
<li><b>Thói quen, việc lặp lại:</b> <span class="gr-ex">I <b>go</b> to the gym three times a week. <i>(Tôi đến phòng gym ba lần mỗi tuần.)</i></span></li>
<li><b>Sự thật hiển nhiên, quy luật:</b> <span class="gr-ex">Water <b>boils</b> at 100°C. <i>(Nước sôi ở 100 độ C.)</i></span></li>
<li><b>Lịch trình cố định</b> (tàu xe, thời khóa biểu): <span class="gr-ex">The train <b>leaves</b> at 7 a.m. tomorrow.</span></li>
</ul>
<p class="gr-note">Lỗi hay gặp: quên thêm "-s" ở ngôi thứ ba số ít (he/she/it). "He <b>work</b>" là sai; phải là "He <b>works</b>".</p>

<h4>2. Hiện tại tiếp diễn (Present Continuous)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + am/is/are + V-ing</span></p>
<p>Diễn tả hành động <b>đang xảy ra ngay lúc nói</b>, hoặc quanh thời điểm hiện tại nhưng có tính tạm thời:</p>
<ul>
<li><b>Đang diễn ra:</b> <span class="gr-ex">Please be quiet — the baby <b>is sleeping</b>. <i>(Em bé đang ngủ.)</i></span></li>
<li><b>Tạm thời (không phải mãi mãi):</b> <span class="gr-ex">I <b>am staying</b> with my aunt this month.</span></li>
<li><b>Kế hoạch tương lai gần đã sắp xếp:</b> <span class="gr-ex">We <b>are meeting</b> the client tomorrow.</span></li>
</ul>
<p class="gr-note">Động từ chỉ trạng thái (know, like, want, believe, understand…) thường <b>không</b> chia tiếp diễn: nói "I <b>know</b>", không nói "I am knowing".</p>

<h4>3. Hiện tại hoàn thành (Present Perfect)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + have/has + V3</span></p>
<p>Đây là "cầu nối" giữa quá khứ và hiện tại: việc đã xảy ra nhưng <b>vẫn còn liên quan tới hiện tại</b>, hoặc thời điểm không quan trọng bằng kết quả:</p>
<ul>
<li><b>Trải nghiệm (đã từng):</b> <span class="gr-ex">I <b>have visited</b> Japan twice. <i>(Tôi đã từng đến Nhật hai lần.)</i></span></li>
<li><b>Việc vừa hoàn tất, còn dấu vết:</b> <span class="gr-ex">She <b>has just finished</b> her essay.</span></li>
<li><b>Kéo dài từ quá khứ đến giờ</b> (với <i>since/for</i>): <span class="gr-ex">We <b>have lived</b> here <b>for</b> ten years / <b>since</b> 2015.</span></li>
</ul>
<p class="gr-note">Phân biệt với quá khứ đơn: dùng hiện tại hoàn thành khi <b>không nêu mốc thời gian rõ</b>; khi đã nói "yesterday, in 2019, last week" thì bắt buộc dùng quá khứ đơn.</p>

<h4>4. Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + have/has been + V-ing</span></p>
<p>Giống hiện tại hoàn thành nhưng <b>nhấn mạnh vào quá trình và sự liên tục</b>, thường trả lời câu hỏi "bao lâu":</p>
<ul>
<li><span class="gr-ex">I <b>have been learning</b> English <b>for</b> three years. <i>(Tôi học tiếng Anh liên tục ba năm nay.)</i></span></li>
<li><b>Giải thích kết quả nhìn thấy được:</b> <span class="gr-ex">Your eyes are red — <b>have</b> you <b>been crying</b>?</span></li>
</ul>`,
      },
      {
        title: "Nhóm thì QUÁ KHỨ (chi tiết 4 thì)",
        html: `
<h4>1. Quá khứ đơn (Past Simple)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + V-ed / V2</span> — phủ định <i>did not + V</i>, nghi vấn <i>Did + S + V?</i></p>
<p>Kể lại một hành động <b>đã bắt đầu và kết thúc hẳn trong quá khứ</b>, thường có mốc thời gian cụ thể. Đây là thì "xương sống" khi kể chuyện.</p>
<ul>
<li><span class="gr-ex">I <b>graduated</b> from university in 2020. <i>(Tôi tốt nghiệp năm 2020.)</i></span></li>
<li><b>Chuỗi hành động nối tiếp:</b> <span class="gr-ex">She <b>opened</b> the door, <b>walked</b> in and <b>sat</b> down.</span></li>
</ul>
<p class="gr-note">Nhớ học động từ bất quy tắc (go→went, buy→bought, see→saw…). Ở thể phủ định/nghi vấn đã có "did" nên động từ chính trở về nguyên mẫu: "Did you <b>go</b>?", không phải "Did you went?".</p>

<h4>2. Quá khứ tiếp diễn (Past Continuous)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + was/were + V-ing</span></p>
<p>Diễn tả hành động <b>đang diễn ra tại một thời điểm trong quá khứ</b>, hoặc làm nền cho một hành động khác chen vào:</p>
<ul>
<li><b>Hành động dài bị hành động ngắn xen vào</b> (dùng với <i>when</i>): <span class="gr-ex">I <b>was cooking</b> dinner <b>when</b> the phone <b>rang</b>. <i>(Tôi đang nấu ăn thì điện thoại reo.)</i></span></li>
<li><b>Hai hành động song song</b> (dùng với <i>while</i>): <span class="gr-ex">While she <b>was reading</b>, he <b>was watching</b> TV.</span></li>
</ul>

<h4>3. Quá khứ hoàn thành (Past Perfect)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + had + V3</span></p>
<p>Dùng khi có <b>hai mốc quá khứ</b> và bạn muốn chỉ rõ việc nào <b>xảy ra trước</b>. Việc xảy ra trước dùng quá khứ hoàn thành, việc sau dùng quá khứ đơn:</p>
<ul>
<li><span class="gr-ex">By the time we <b>arrived</b>, the film <b>had</b> already <b>started</b>. <i>(Khi chúng tôi đến thì phim đã bắt đầu rồi.)</i></span></li>
<li><span class="gr-ex">She <b>had studied</b> French before she <b>moved</b> to Paris.</span></li>
</ul>
<p class="gr-note">Nếu hai việc xảy ra rõ ràng theo thứ tự nhờ <i>before/after</i>, người bản ngữ đôi khi vẫn dùng quá khứ đơn cho cả hai — nhưng trong văn viết học thuật, dùng quá khứ hoàn thành sẽ chuẩn và rõ ràng hơn.</p>

<h4>4. Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + had been + V-ing</span></p>
<p>Nhấn mạnh <b>quá trình kéo dài</b> trước một mốc quá khứ khác:</p>
<ul>
<li><span class="gr-ex">He <b>had been working</b> for hours before he finally took a break. <i>(Anh ấy đã làm việc suốt nhiều giờ trước khi nghỉ.)</i></span></li>
</ul>`,
      },
      {
        title: "Nhóm thì TƯƠNG LAI (chi tiết 4 thì)",
        html: `
<h4>1. Tương lai đơn (Future Simple) — will</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + will + V</span></p>
<p>Dùng cho những gì thuộc tương lai nhưng mang tính <b>quyết định tức thời, dự đoán, lời hứa hay đề nghị</b> — tức chưa có sự chuẩn bị từ trước:</p>
<ul>
<li><b>Quyết định ngay lúc nói:</b> <span class="gr-ex">It's cold — I <b>will close</b> the window.</span></li>
<li><b>Dự đoán, quan điểm:</b> <span class="gr-ex">I think prices <b>will rise</b> next year.</span></li>
<li><b>Lời hứa/đề nghị:</b> <span class="gr-ex">I <b>will help</b> you with your homework.</span></li>
</ul>

<h4>2. Tương lai gần (be going to) — cấu trúc, không nằm trong 12 thì</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + am/is/are + going to + V</span></p>
<p>Khác với <i>will</i>, cấu trúc này dùng cho <b>kế hoạch đã định trước</b> hoặc <b>dự đoán có bằng chứng ở hiện tại</b>:</p>
<ul>
<li><b>Dự định:</b> <span class="gr-ex">We <b>are going to</b> travel to Da Nang this summer. <i>(Kế hoạch đã có sẵn.)</i></span></li>
<li><b>Dự đoán có căn cứ:</b> <span class="gr-ex">Look at those clouds — it <b>is going to</b> rain.</span></li>
</ul>
<p class="gr-note">So sánh nhanh: "I <b>will</b> call you" (vừa nảy ra ý) ≠ "I <b>am going to</b> call you" (đã dự định từ trước).</p>

<h4>3. Tương lai tiếp diễn (Future Continuous)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + will be + V-ing</span></p>
<p>Diễn tả hành động <b>sẽ đang diễn ra tại một thời điểm xác định</b> trong tương lai:</p>
<ul>
<li><span class="gr-ex">At 8 p.m. tomorrow, I <b>will be flying</b> to London. <i>(Lúc 8 giờ tối mai tôi đang bay đến London.)</i></span></li>
</ul>

<h4>4. Tương lai hoàn thành (Future Perfect)</h4>
<p><b>Cấu trúc:</b> <span class="gr-formula">S + will have + V3</span></p>
<p>Diễn tả hành động <b>sẽ hoàn tất trước một mốc tương lai</b>, thường đi với <i>by + thời gian</i>:</p>
<ul>
<li><span class="gr-ex">By 2030, I <b>will have finished</b> my PhD. <i>(Đến năm 2030, tôi sẽ hoàn thành tiến sĩ.)</i></span></li>
</ul>`,
      },
      {
        title: "Sự hòa hợp Chủ ngữ – Động từ",
        html: `
<p>"Hòa hợp" nghĩa là động từ phải chia theo <b>số</b> (ít/nhiều) của chủ ngữ. Nghe thì đơn giản, nhưng có nhiều tình huống dễ đánh lừa mắt.</p>
<ul>
<li><b>Chủ ngữ số ít → động từ số ít:</b> <span class="gr-ex">She <b>works</b> hard.</span></li>
<li><b>Danh từ không đếm được luôn là số ít:</b> <span class="gr-ex">Information <b>is</b> useful. / This news <b>is</b> surprising.</span></li>
<li><b>Đại từ bất định</b> (everyone, someone, each, every, nobody) → số ít: <span class="gr-ex">Everyone <b>has</b> a role to play.</span></li>
<li><b>Chủ ngữ + with / as well as / together with / along with</b> → chia theo chủ ngữ chính (phần trước cụm chèn thêm): <span class="gr-ex">The manager, as well as the staff, <b>is</b> attending. <i>(Chia theo "the manager".)</i></span></li>
<li><b>A number of</b> + N số nhiều → động từ <b>số nhiều</b>; <b>The number of</b> → động từ <b>số ít</b>: <span class="gr-ex">A number of students <b>are</b> absent. / The number of students <b>is</b> rising.</span></li>
<li><b>Either…or / Neither…nor</b> → chia theo danh từ <b>gần động từ nhất</b>: <span class="gr-ex">Neither the teacher nor the <b>students were</b> late.</span></li>
</ul>
<p class="gr-note">Cạm bẫy phổ biến: cụm giới từ chen giữa chủ ngữ và động từ. Trong "The <b>box</b> of chocolates <b>is</b> on the table", chủ ngữ thật là "the box" (số ít), không phải "chocolates".</p>`,
      },
      {
        title: "Câu điều kiện (Conditionals)",
        html: `
<p>Câu điều kiện gồm hai phần: mệnh đề <b>if</b> (điều kiện) và mệnh đề chính (kết quả). Chọn loại nào tùy vào việc điều kiện đó <b>có thật hay không</b> và thuộc <b>thời điểm nào</b>.</p>
<div class="gr-scroll"><table>
<tr><th>Loại</th><th>Cấu trúc</th><th>Ý nghĩa</th></tr>
<tr><td>Loại 0</td><td>If + HT đơn, HT đơn</td><td>chân lý, luôn đúng</td></tr>
<tr><td>Loại 1</td><td>If + HT đơn, will + V</td><td>có thể xảy ra ở tương lai</td></tr>
<tr><td>Loại 2</td><td>If + QK đơn, would + V</td><td>trái với hiện tại (giả định)</td></tr>
<tr><td>Loại 3</td><td>If + QK hoàn thành, would have + V3</td><td>trái với quá khứ (tiếc nuối)</td></tr>
</table></div>
<h4>Diễn giải từng loại</h4>
<ul>
<li><b>Loại 0</b> — quy luật hiển nhiên: <span class="gr-ex">If you <b>heat</b> ice, it <b>melts</b>. <i>(Cứ đun đá là nó tan.)</i></span></li>
<li><b>Loại 1</b> — điều kiện có thật, khả năng cao: <span class="gr-ex">If it <b>rains</b> tomorrow, we <b>will stay</b> home. <i>(Nếu mai trời mưa, chúng ta sẽ ở nhà.)</i></span></li>
<li><b>Loại 2</b> — tưởng tượng trái với thực tế hiện tại: <span class="gr-ex">If I <b>were</b> rich, I <b>would travel</b> the world. <i>(Giá mà tôi giàu — thực tế là không.)</i></span> Lưu ý dùng <b>were</b> cho mọi ngôi.</li>
<li><b>Loại 3</b> — tiếc nuối về quá khứ không thể thay đổi: <span class="gr-ex">If she <b>had studied</b> harder, she <b>would have passed</b>. <i>(Giá mà cô ấy học chăm hơn — nhưng đã không.)</i></span></li>
</ul>
<h4>Điều kiện hỗn hợp & biến thể</h4>
<ul>
<li><b>Hỗn hợp (quá khứ → hiện tại):</b> <span class="gr-ex">If I <b>had saved</b> money, I <b>would be</b> rich now.</span></li>
<li><b>Đảo ngữ trang trọng</b> (bỏ if): <i>Were I you… / Had she known…</i></li>
<li>Có thể thay <b>if</b> bằng <b>unless</b> (= if not): <span class="gr-ex">You will fail <b>unless</b> you practise.</span></li>
</ul>`,
      },
      {
        title: "Câu bị động (Passive Voice)",
        html: `
<p>Ta dùng bị động khi muốn <b>nhấn mạnh vào đối tượng chịu tác động</b>, hoặc khi <b>không biết / không cần nêu</b> ai thực hiện hành động. Đây là công cụ đắc lực trong văn học thuật vì giọng văn khách quan hơn.</p>
<p><b>Nguyên tắc chuyển:</b> tân ngữ của câu chủ động lên làm chủ ngữ, động từ đổi thành <span class="gr-formula">be + V3</span> (chia <i>be</i> đúng thì), chủ ngữ cũ (nếu cần) đưa xuống sau <i>by</i>.</p>
<div class="gr-scroll"><table>
<tr><th>Thì</th><th>Chủ động</th><th>Bị động</th></tr>
<tr><td>HT đơn</td><td>writes</td><td>is written</td></tr>
<tr><td>HT tiếp diễn</td><td>is writing</td><td>is being written</td></tr>
<tr><td>QK đơn</td><td>wrote</td><td>was written</td></tr>
<tr><td>HT hoàn thành</td><td>has written</td><td>has been written</td></tr>
<tr><td>Tương lai</td><td>will write</td><td>will be written</td></tr>
<tr><td>Động từ khiếm khuyết</td><td>must write</td><td>must be written</td></tr>
</table></div>
<p class="gr-ex">Chủ động: The committee <b>approved</b> the plan. → Bị động: The plan <b>was approved</b> (by the committee). <i>(Kế hoạch đã được thông qua.)</i></p>
<p><b>Ứng dụng IELTS:</b> mô tả quy trình (Writing Task 1) gần như luôn dùng bị động: <span class="gr-ex">First, the beans <b>are harvested</b>; then they <b>are dried</b> and <b>roasted</b>.</span></p>
<p class="gr-note">Chỉ ngoại động từ (có tân ngữ) mới chuyển sang bị động được. "He slept" không có bị động vì "sleep" không có tân ngữ.</p>`,
      },
      {
        title: "Câu tường thuật (Reported Speech)",
        html: `
<p>Khi thuật lại lời người khác mà không trích nguyên văn, ta thường phải <b>lùi thì một bậc</b> (vì thời điểm nói đã thành quá khứ) và đổi các đại từ, trạng từ chỉ thời gian – nơi chốn cho hợp lý.</p>
<h4>Quy tắc lùi thì</h4>
<div class="gr-scroll"><table>
<tr><th>Lời nói trực tiếp</th><th>Lời tường thuật</th></tr>
<tr><td>HT đơn (do)</td><td>QK đơn (did)</td></tr>
<tr><td>HT tiếp diễn (am doing)</td><td>QK tiếp diễn (was doing)</td></tr>
<tr><td>QK đơn (did)</td><td>QK hoàn thành (had done)</td></tr>
<tr><td>will</td><td>would</td></tr>
<tr><td>can / may / must</td><td>could / might / had to</td></tr>
</table></div>
<h4>Đổi trạng từ</h4>
<p>now → then · today → that day · tomorrow → the next day · yesterday → the day before · here → there · this → that.</p>
<p class="gr-ex">Trực tiếp: "I <b>am</b> tired," she said. → Tường thuật: She said (that) she <b>was</b> tired.</p>
<h4>Câu hỏi & mệnh lệnh</h4>
<ul>
<li><b>Câu hỏi Yes/No:</b> dùng <i>asked + if/whether</i>, đưa về trật tự khẳng định (không đảo ngữ): <span class="gr-ex">He asked, "Are you ready?" → He asked <b>if I was</b> ready.</span></li>
<li><b>Câu hỏi Wh-:</b> giữ từ để hỏi, cũng về trật tự khẳng định: <span class="gr-ex">"Where do you live?" → She asked <b>where I lived</b>.</span></li>
<li><b>Mệnh lệnh:</b> dùng <i>told/asked + tân ngữ + (not) to V</i>: <span class="gr-ex">"Close the door." → He told me <b>to close</b> the door.</span></li>
</ul>
<p class="gr-note">Không lùi thì khi lời nói là chân lý luôn đúng: <i>The teacher said the Earth <b>is</b> round.</i></p>`,
      },
      {
        title: "Mệnh đề quan hệ (Relative Clauses)",
        html: `
<p>Mệnh đề quan hệ giúp <b>bổ nghĩa cho một danh từ</b> mà không phải tách thành câu riêng — nhờ đó câu văn gọn và "cao cấp" hơn. Nó bắt đầu bằng đại từ quan hệ.</p>
<h4>Chọn đại từ quan hệ</h4>
<ul>
<li><b>who</b> – thay cho <b>người</b> (làm chủ ngữ): <span class="gr-ex">The scientist <b>who</b> discovered penicillin was Fleming.</span></li>
<li><b>which</b> – thay cho <b>vật/sự việc</b>: <span class="gr-ex">The book <b>which</b> I bought is fascinating.</span></li>
<li><b>that</b> – thay cho cả người lẫn vật (chỉ trong mệnh đề xác định).</li>
<li><b>whose</b> – chỉ <b>sở hữu</b>: <span class="gr-ex">The student <b>whose</b> project won is here.</span></li>
<li><b>where / when / why</b> – nơi chốn / thời gian / lý do: <span class="gr-ex">This is the city <b>where</b> I was born.</span></li>
</ul>
<h4>Hai loại mệnh đề — khác biệt cốt lõi</h4>
<ul>
<li><b>Xác định (defining):</b> cung cấp thông tin <b>bắt buộc</b> để hiểu danh từ; <b>không</b> dùng dấu phẩy. <span class="gr-ex">People <b>who</b> exercise regularly live longer.</span></li>
<li><b>Không xác định (non-defining):</b> chỉ là thông tin <b>thêm</b>, bỏ đi câu vẫn đủ nghĩa; có <b>dấu phẩy</b> và <b>không dùng that</b>. <span class="gr-ex">My father, <b>who</b> is 60, still works.</span></li>
</ul>
<h4>Rút gọn mệnh đề quan hệ (rất hữu ích cho IELTS)</h4>
<ul>
<li><b>Chủ động → V-ing:</b> <span class="gr-ex">The man who is waiting → the man <b>waiting</b> outside.</span></li>
<li><b>Bị động → V3:</b> <span class="gr-ex">The report which was written by her → the report <b>written</b> by her.</span></li>
</ul>`,
      },
      {
        title: "Danh động từ & Động từ nguyên mẫu (Gerund / Infinitive)",
        html: `
<p>Khi một động từ đi sau một động từ khác, nó phải chuyển thành <b>V-ing (danh động từ)</b> hoặc <b>to V (nguyên mẫu có to)</b>. Vấn đề là mỗi động từ "kén" một dạng khác nhau — cần ghi nhớ theo nhóm.</p>
<h4>Động từ theo sau bởi TO + V</h4>
<p>Thường là động từ hướng tới <b>tương lai/ý định</b>: want, decide, hope, plan, agree, promise, refuse, offer, expect, learn, manage, afford, fail.</p>
<p class="gr-ex">She <b>decided to move</b> abroad. / I can't <b>afford to buy</b> a car.</p>
<h4>Động từ theo sau bởi V-ing</h4>
<p>Thường chỉ việc <b>đang/đã làm, sở thích, tránh né</b>: enjoy, avoid, mind, finish, suggest, consider, admit, deny, practise, imagine, keep, risk, miss.</p>
<p class="gr-ex">I <b>enjoy reading</b>. / He <b>avoided answering</b> the question.</p>
<h4>Luôn dùng V-ing sau giới từ</h4>
<p class="gr-ex">She is good <b>at solving</b> problems. / Thank you <b>for helping</b> me.</p>
<h4>Động từ đổi nghĩa theo dạng</h4>
<ul>
<li><b>stop to do</b> (dừng lại <i>để</i> làm việc khác) ≠ <b>stop doing</b> (ngừng hẳn việc đó): <span class="gr-ex">He stopped <b>to smoke</b> vs. He stopped <b>smoking</b>.</span></li>
<li><b>remember to do</b> (nhớ để làm — chưa làm) ≠ <b>remember doing</b> (nhớ đã làm): <span class="gr-ex">Remember <b>to lock</b> the door vs. I remember <b>locking</b> it.</span></li>
<li><b>try to do</b> (nỗ lực) ≠ <b>try doing</b> (thử nghiệm cách khác).</li>
</ul>`,
      },
      {
        title: "Động từ khiếm khuyết (Modal Verbs)",
        html: `
<p>Modal verbs (can, could, may, might, must, should, will, would…) không diễn tả hành động mà thêm <b>sắc thái</b>: khả năng, sự cho phép, nghĩa vụ, lời khuyên, mức độ chắc chắn. Sau modal luôn là <b>động từ nguyên mẫu không "to"</b>.</p>
<h4>Nhóm khả năng & xin phép</h4>
<ul>
<li><b>can</b> – khả năng hiện tại, xin phép thân mật; <b>could</b> – khả năng quá khứ hoặc lịch sự hơn.</li>
<li><b>be able to</b> – thay "can" ở những thì mà can không dùng được: <span class="gr-ex">I <b>will be able to</b> help tomorrow.</span></li>
</ul>
<h4>Nhóm suy đoán (mức độ chắc chắn)</h4>
<ul>
<li><b>must</b> – gần như chắc chắn (suy luận): <span class="gr-ex">The lights are off — they <b>must be</b> asleep.</span></li>
<li><b>may / might / could</b> – có thể (không chắc): <span class="gr-ex">It <b>might rain</b> later.</span></li>
<li><b>can't</b> – chắc chắn không: <span class="gr-ex">She <b>can't be</b> serious.</span></li>
</ul>
<h4>Nhóm nghĩa vụ & lời khuyên</h4>
<ul>
<li><b>must / have to</b> – bắt buộc (must: do người nói; have to: do hoàn cảnh, quy định).</li>
<li><b>mustn't</b> (cấm) ≠ <b>don't have to</b> (không cần): <span class="gr-ex">You <b>mustn't</b> smoke here vs. You <b>don't have to</b> come.</span></li>
<li><b>should / ought to</b> – lời khuyên; <b>had better</b> – khuyên mạnh, hàm ý hậu quả.</li>
</ul>
<h4>Suy đoán về quá khứ</h4>
<p class="gr-ex">She <b>must have left</b> early. / He <b>might have forgotten</b>. / They <b>can't have known</b>.</p>`,
      },
      {
        title: "Mạo từ (a / an / the / zero)",
        html: `
<p>Mạo từ tuy nhỏ nhưng sai rất dễ bị trừ điểm ngữ pháp. Nguyên tắc gốc: người nghe đã <b>xác định được</b> danh từ đang nói tới hay chưa.</p>
<h4>a / an — mạo từ không xác định</h4>
<p>Dùng với danh từ <b>đếm được, số ít</b>, khi nhắc <b>lần đầu</b> hoặc nói chung chung. Chọn <i>a</i>/<i>an</i> theo <b>âm</b> đứng sau, không phải chữ cái: <span class="gr-ex"><b>a</b> university (âm /j/), <b>an</b> hour (âm /au/, "h" câm).</span></p>
<h4>the — mạo từ xác định</h4>
<ul>
<li>Danh từ đã được nhắc trước đó: <span class="gr-ex">I saw <b>a</b> dog. <b>The</b> dog was huge.</span></li>
<li>Vật duy nhất: <b>the</b> sun, <b>the</b> moon, <b>the</b> Internet.</li>
<li>So sánh nhất & thứ tự: <b>the</b> best, <b>the</b> first.</li>
<li>Tên biển, sông, dãy núi, quốc gia số nhiều: the Pacific, the Alps, the USA.</li>
</ul>
<h4>Zero article — không mạo từ</h4>
<p>Danh từ số nhiều hoặc không đếm được mang nghĩa <b>chung chung</b>, tên riêng, bữa ăn, môn học, ngôn ngữ: <span class="gr-ex"><b>Water</b> is essential. / I love <b>music</b>. / She teaches <b>English</b>.</span></p>`,
      },
      {
        title: "So sánh (Comparison)",
        html: `
<p>So sánh giúp diễn đạt mức độ hơn – kém – bằng nhau giữa các đối tượng. Cách chia tùy vào <b>độ dài của tính từ/trạng từ</b>.</p>
<h4>So sánh hơn (comparative)</h4>
<ul>
<li>Tính từ <b>ngắn</b> (1 âm tiết): thêm <b>-er + than</b>: <span class="gr-ex">taller than, faster than.</span></li>
<li>Tính từ <b>dài</b> (≥2 âm tiết): <b>more + adj + than</b>: <span class="gr-ex">more expensive than, more important than.</span></li>
<li><b>Ngoại lệ quan trọng</b> — tính từ <b>2 âm tiết</b> kết thúc bằng <b>-y, -le, -ow, -er</b> vẫn thêm <b>-er</b> (không dùng <i>more</i>): <span class="gr-ex">happy → happi<b>er</b>, easy → easi<b>er</b>, busy → busi<b>er</b>, simple → simpl<b>er</b>, narrow → narrow<b>er</b>, clever → clever<b>er</b>. <i>(Viết "more happy" là sai — đây là nhóm cực kỳ thông dụng.)</i></span></li>
</ul>
<h4>So sánh nhất (superlative)</h4>
<ul>
<li>Ngắn: <b>the + adj-est</b>; Dài: <b>the most + adj</b>: <span class="gr-ex">the tallest / the most beautiful.</span></li>
</ul>
<h4>So sánh bằng & các dạng khác</h4>
<ul>
<li><b>Bằng nhau:</b> as + adj + as; phủ định not as/so … as: <span class="gr-ex">She is <b>as</b> talented <b>as</b> her sister.</span></li>
<li><b>Bất quy tắc:</b> good→better→best; bad→worse→worst; little→less→least; much/many→more→most; far→further/farther.</li>
<li><b>Càng… càng…:</b> <span class="gr-ex"><b>The more</b> you practise, <b>the better</b> you become.</span></li>
<li><b>Tăng cấp dần:</b> <span class="gr-ex">The city is getting <b>bigger and bigger</b>.</span></li>
</ul>`,
      },
      {
        title: "Liên từ & mệnh đề (Conjunctions)",
        html: `
<p>Liên từ nối các ý lại với nhau — dùng đúng sẽ khiến bài viết mạch lạc, dùng sai (đặc biệt lẫn lộn giữa liên từ + mệnh đề và giới từ + danh từ) là lỗi rất phổ biến.</p>
<h4>Nguyên nhân</h4>
<ul>
<li><b>because / since / as</b> + mệnh đề (S+V): <span class="gr-ex"><b>Because</b> it was raining, we stayed home.</span></li>
<li><b>because of / due to</b> + danh từ / V-ing: <span class="gr-ex">We stayed home <b>because of</b> the rain.</span></li>
</ul>
<h4>Tương phản</h4>
<ul>
<li><b>although / though / even though</b> + mệnh đề: <span class="gr-ex"><b>Although</b> he was tired, he kept working.</span></li>
<li><b>despite / in spite of</b> + danh từ / V-ing: <span class="gr-ex"><b>Despite</b> the rain, they played.</span></li>
<li><b>however, nevertheless</b> đứng đầu câu, có dấu chấm phẩy hoặc chấm trước: <span class="gr-ex">It was hard. <b>However</b>, she succeeded.</span></li>
</ul>
<h4>Mục đích & kết quả</h4>
<ul>
<li><b>Mục đích:</b> so that + mệnh đề; in order to / so as to + V: <span class="gr-ex">He left early <b>so that</b> he could catch the train.</span></li>
<li><b>Kết quả:</b> so + adj + that; such + (a/an) + adj + N + that: <span class="gr-ex">It was <b>so cold that</b> we stayed in. / It was <b>such a cold day that</b> we stayed in.</span></li>
</ul>
<h4>Bổ sung ý (rất hợp Writing)</h4>
<p>moreover, furthermore, in addition, besides, what is more — dùng để thêm luận điểm.</p>`,
      },
      {
        title: "Đảo ngữ (Inversion) — nâng cao",
        html: `
<p>Đảo ngữ là đưa <b>trạng từ phủ định hoặc cụm nhấn mạnh lên đầu câu</b>, rồi đảo trợ động từ ra trước chủ ngữ (giống cấu trúc câu hỏi). Đây là "vũ khí" ghi điểm ở tiêu chí "đa dạng cấu trúc" trong IELTS Writing/Speaking, nhưng cần dùng đúng chỗ, đừng lạm dụng.</p>
<h4>Sau trạng từ phủ định/hạn định</h4>
<ul>
<li><b>Never / Rarely / Seldom / Hardly ever:</b> <span class="gr-ex"><b>Never have I seen</b> such dedication.</span></li>
<li><b>Not only … but also:</b> <span class="gr-ex"><b>Not only did</b> she win, <b>but</b> she also broke the record.</span></li>
<li><b>No sooner … than / Hardly … when</b> (diễn tả việc vừa xong thì việc khác xảy ra): <span class="gr-ex"><b>No sooner had</b> I arrived <b>than</b> it started to rain.</span></li>
</ul>
<h4>Sau "Only"</h4>
<p class="gr-ex"><b>Only when</b> we lose something <b>do we</b> realise its value. / <b>Only by</b> practising <b>can you</b> improve.</p>
<h4>Đảo ngữ trong câu điều kiện</h4>
<p class="gr-ex"><b>Were I</b> in your position, I would accept. (= If I were…) / <b>Had she known</b>, she would have come. (= If she had known…)</p>`,
      },
      {
        title: "Đếm được / không đếm được & Lượng từ",
        html: `
<p>Phân biệt danh từ đếm được (a book, two books) và không đếm được (water, information, advice) là gốc để chọn đúng lượng từ.</p>
<div class="gr-scroll"><table>
<tr><th>Dùng với</th><th>Đếm được (số nhiều)</th><th>Không đếm được</th></tr>
<tr><td>Nhiều</td><td>many</td><td>much</td></tr>
<tr><td>Ít (phủ định)</td><td>few</td><td>little</td></tr>
<tr><td>Một ít (đủ dùng)</td><td>a few</td><td>a little</td></tr>
<tr><td>Cả hai</td><td colspan="2">some, any, a lot of, plenty of, most, all</td></tr>
</table></div>
<h4>Sắc thái tinh tế: few vs a few</h4>
<ul>
<li><b>few / little</b> mang nghĩa <b>phủ định</b> — "rất ít, gần như không đủ": <span class="gr-ex">He has <b>few</b> friends. <i>(Ít bạn — hàm ý cô đơn.)</i></span></li>
<li><b>a few / a little</b> mang nghĩa <b>tích cực</b> — "một ít nhưng đủ": <span class="gr-ex">He has <b>a few</b> friends. <i>(Có vài người bạn — vẫn ổn.)</i></span></li>
</ul>
<p class="gr-note">Một số danh từ trông "đếm được" nhưng thực ra không đếm được trong tiếng Anh: information, advice, furniture, equipment, knowledge, research. Không nói "informations" hay "an advice"; muốn đếm phải dùng "a piece of advice".</p>`,
      },
      {
        title: "Câu ước & giả định (Wish / Subjunctive)",
        html: `
<p>Cấu trúc "wish" và các dạng giả định thể hiện điều <b>trái với thực tế</b> hoặc mong muốn — về bản chất giống câu điều kiện loại 2/3.</p>
<h4>Wish theo ba mốc thời gian</h4>
<ul>
<li><b>Ước ở hiện tại</b> (điều không có thật bây giờ): wish + <b>QK đơn</b>: <span class="gr-ex">I wish I <b>had</b> more free time. <i>(Ước gì tôi có nhiều thời gian rảnh hơn.)</i></span></li>
<li><b>Ước ở quá khứ</b> (tiếc nuối): wish + <b>QK hoàn thành</b>: <span class="gr-ex">I wish I <b>had studied</b> harder. <i>(Ước gì mình đã học chăm hơn.)</i></span></li>
<li><b>Ước ở tương lai</b> (mong điều gì đó thay đổi/khó chịu về hiện tại): wish + <b>would</b>: <span class="gr-ex">I wish it <b>would stop</b> raining.</span></li>
</ul>
<h4>Các cấu trúc giả định liên quan</h4>
<ul>
<li><b>would rather</b> + QK đơn (muốn ai đó làm gì): <span class="gr-ex">I'd rather you <b>didn't</b> smoke here.</span></li>
<li><b>It's (high) time</b> + QK đơn (đã đến lúc): <span class="gr-ex">It's time we <b>left</b>.</span></li>
<li><b>as if / as though</b> + QK đơn (như thể — trái thực tế): <span class="gr-ex">He talks <b>as if</b> he <b>knew</b> everything.</span></li>
</ul>`,
      },
      {
        title: "Giới từ thường gặp (Prepositions)",
        html: `
<p>Giới từ (in, on, at, for, of…) là phần "khó nhằn" vì nhiều khi phụ thuộc thói quen dùng chứ không theo quy tắc tuyệt đối. Dưới đây là những mảng dễ nhớ nhất.</p>
<h4>Giới từ chỉ thời gian: in / on / at</h4>
<ul>
<li><b>at</b> + giờ, thời điểm cụ thể: at 7 o'clock, at night, at the weekend.</li>
<li><b>on</b> + ngày, thứ, ngày lễ cụ thể: on Monday, on July 4th, on my birthday.</li>
<li><b>in</b> + tháng, năm, mùa, buổi: in May, in 2026, in summer, in the morning.</li>
</ul>
<h4>Giới từ chỉ nơi chốn: in / on / at</h4>
<ul>
<li><b>at</b> – một điểm: at the door, at the bus stop.</li>
<li><b>on</b> – trên bề mặt: on the wall, on the table.</li>
<li><b>in</b> – bên trong không gian: in the room, in Hanoi.</li>
</ul>
<h4>Cụm động từ + giới từ cố định (collocations)</h4>
<p>Nên học theo cụm: depend <b>on</b>, interested <b>in</b>, good <b>at</b>, afraid <b>of</b>, responsible <b>for</b>, similar <b>to</b>, different <b>from</b>, consist <b>of</b>, focus <b>on</b>, rely <b>on</b>.</p>
<p class="gr-note">Đừng dịch giới từ theo tiếng Việt. "Phụ thuộc vào" là depend <b>on</b> (không phải "depend in"). Cách chắc nhất là học cả cụm và đọc nhiều để quen tai.</p>`,
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
<p class="gr-note">Tiêu chí chấm: Task Achievement · Coherence & Cohesion · Lexical Resource · Grammatical Range & Accuracy (mỗi phần 25%).</p>`,
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
<p><b>Bí quyết band cao:</b> trả lời <b>đúng & đủ</b> yêu cầu, ý mạch lạc, từ nối tự nhiên, đa dạng cấu trúc câu (mệnh đề quan hệ, điều kiện, bị động), ví dụ cụ thể.</p>`,
      },
      {
        title: "Speaking — 3 phần & chiến lược",
        html: `
<ul>
<li><b>Part 1 (4–5 phút):</b> hỏi về bản thân (quê quán, sở thích, công việc). Trả lời 2–3 câu, đừng cụt lủn.</li>
<li><b>Part 2 (3–4 phút):</b> "cue card" — 1 phút chuẩn bị, nói 1–2 phút. Bám 4 gạch đầu dòng, kể có mở–thân–kết.</li>
<li><b>Part 3 (4–5 phút):</b> thảo luận trừu tượng liên quan Part 2 — nêu ý kiến, giải thích, so sánh, đưa ví dụ.</li>
</ul>
<p><b>Mẹo:</b> nói trôi chảy quan trọng hơn "hoàn hảo"; dùng <b>từ nối tự nhiên</b> (well, actually, to be honest, I suppose); paraphrase khi bí; đừng học thuộc lòng máy móc.</p>`,
      },
      {
        title: "Tiêu chí chấm (Band Descriptors)",
        html: `
<p><b>Writing & Speaking</b> chấm theo 4 tiêu chí bằng nhau:</p>
<div class="gr-scroll"><table>
<tr><th>Tiêu chí</th><th>Ý nghĩa</th></tr>
<tr><td>Task Response / Achievement</td><td>trả lời đúng & đủ yêu cầu, phát triển ý</td></tr>
<tr><td>Coherence & Cohesion</td><td>bố cục, mạch lạc, từ nối, chia đoạn</td></tr>
<tr><td>Lexical Resource</td><td>vốn từ đa dạng, chính xác, collocation</td></tr>
<tr><td>Grammatical Range & Accuracy</td><td>đa dạng & chính xác cấu trúc câu</td></tr>
</table></div>
<p><b>Speaking</b> cũng có <b>4</b> tiêu chí, nhưng khác Writing: <b>Fluency & Coherence</b> (thay cho cả Task Response lẫn Coherence & Cohesion), <b>Lexical Resource</b>, <b>Grammatical Range & Accuracy</b>, và <b>Pronunciation</b>.</p>
<p class="gr-note">Muốn lên band: giảm lỗi lặp cấu trúc, tăng câu phức đúng ngữ pháp, dùng từ vựng học thuật đúng ngữ cảnh.</p>`,
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
