// content.js — Chạy trên mọi trang web. Khi bôi đen văn bản, hiện thanh nổi
// để Dịch nhanh sang tiếng Việt hoặc Lưu vào từ vựng.
(function () {
  if (window.__pvtLoaded) return;
  window.__pvtLoaded = true;

  let bar = null;
  let pop = null;
  let lastVocab = null; // { term, rect } để cập nhật nghĩa khi tra xong

  function removeBar() {
    if (bar) { bar.remove(); bar = null; }
  }
  function removePop() {
    if (pop) { pop.remove(); pop = null; }
  }

  // Lấy câu chứa vùng chọn để làm ngữ cảnh tra nghĩa.
  function selectionContext(sel) {
    try {
      const node = sel.anchorNode;
      const block = node && node.nodeType === 3 ? node.parentElement : node;
      const t = (block?.innerText || "").replace(/\s+/g, " ").trim();
      return t.length > 300 ? t.slice(0, 300) : t;
    } catch { return ""; }
  }

  document.addEventListener("mouseup", (e) => {
    if (bar && bar.contains(e.target)) return;
    if (pop && pop.contains(e.target)) return;
    setTimeout(() => {
      const sel = window.getSelection();
      const text = sel.toString().trim();
      if (!text || text.length > 1200) { removeBar(); return; }
      showBar(sel, text);
    }, 10);
  });

  document.addEventListener("mousedown", (e) => {
    if (bar && !bar.contains(e.target)) removeBar();
    if (pop && !pop.contains(e.target)) removePop();
  });

  function showBar(sel, text) {
    removeBar();
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    const context = selectionContext(sel);
    bar = document.createElement("div");
    bar.className = "pvt-bar";
    bar.innerHTML =
      '<button class="pvt-btn" data-a="tr">🇻🇳 Dịch</button>' +
      '<button class="pvt-btn" data-a="vocab">＋ Từ vựng</button>';
    document.body.appendChild(bar);
    const top = window.scrollY + rect.top - 42;
    bar.style.top = Math.max(window.scrollY + 4, top) + "px";
    bar.style.left = window.scrollX + rect.left + "px";

    bar.querySelector('[data-a="tr"]').addEventListener("click", () => {
      doTranslate(text, rect);
    });
    bar.querySelector('[data-a="vocab"]').addEventListener("click", () => {
      doSaveVocab(text, context, rect);
    });
  }

  function showPopup(rect, html) {
    // Giữ lại vị trí/kích thước người dùng đã đặt khi cập nhật nội dung.
    const prev = pop
      ? { left: pop.style.left, top: pop.style.top, width: pop.style.width, height: pop.style.height }
      : null;
    removePop();
    pop = document.createElement("div");
    pop.className = "pvt-pop";
    pop.innerHTML = html;
    document.body.appendChild(pop);
    if (prev && prev.left) {
      pop.style.left = prev.left;
      pop.style.top = prev.top;
      if (prev.width) pop.style.width = prev.width;
      if (prev.height) pop.style.height = prev.height;
    } else {
      pop.style.top = window.scrollY + rect.bottom + 8 + "px";
      pop.style.left = window.scrollX + rect.left + "px";
    }
    const close = pop.querySelector(".pvt-close");
    if (close) close.addEventListener("click", removePop);
    makeDraggable(pop);
    return pop;
  }

  // Cho phép kéo cửa sổ bằng thanh tiêu đề.
  function makeDraggable(elm) {
    const head = elm.querySelector(".pvt-head");
    if (!head) return;
    head.addEventListener("mousedown", (e) => {
      if (e.target.closest("button")) return; // bấm nút (đóng) thì không kéo
      e.preventDefault();
      const rect = elm.getBoundingClientRect();
      const offX = e.clientX - rect.left;
      const offY = e.clientY - rect.top;
      const move = (ev) => {
        elm.style.left = ev.pageX - offX + "px";
        elm.style.top = Math.max(0, ev.pageY - offY) + "px";
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });
  }

  function esc(s) {
    return (s || "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function doTranslate(text, rect) {
    removeBar();
    showPopup(rect, '<div class="pvt-head"><span>Đang dịch…</span><button class="pvt-close">✕</button></div>');
    const to = setTimeout(() => renderError(rect, "Không nhận được phản hồi. Kiểm tra API key / kết nối."), 40000);
    chrome.runtime.sendMessage({ type: "translate", text }, (res) => {
      clearTimeout(to);
      if (chrome.runtime.lastError || !res) { renderError(rect, chrome.runtime.lastError?.message); return; }
      if (!res.ok) { renderError(rect, res.error); return; }
      showPopup(rect,
        '<div class="pvt-head"><strong>Bản dịch</strong><button class="pvt-close">✕</button></div>' +
        '<div class="pvt-body">' + esc(res.text) + '</div>' +
        '<div class="pvt-actions"><button class="pvt-mini" data-a="save">＋ Lưu từ vựng</button></div>'
      );
      pop.querySelector('[data-a="save"]').addEventListener("click", () => {
        chrome.runtime.sendMessage(
          { type: "saveVocab", term: text, meaning: res.text, source: location.href },
          () => toast("✓ Đã lưu vào từ vựng")
        );
      });
    });
  }

  function doSaveVocab(text, context, rect) {
    removeBar();
    lastVocab = { term: text, rect };
    showPopup(rect, '<div class="pvt-head"><span>Đang lưu…</span><button class="pvt-close">✕</button></div>');
    const to = setTimeout(() => renderError(rect, "Không nhận được phản hồi. Kiểm tra API key / kết nối."), 40000);
    chrome.runtime.sendMessage(
      { type: "saveVocab", term: text, context, source: location.href },
      (res) => {
        clearTimeout(to);
        if (chrome.runtime.lastError || !res) { renderError(rect, chrome.runtime.lastError?.message); return; }
        if (!res.ok) { renderError(rect, res.error); return; }
        const meaningHtml = res.meaning
          ? esc(res.meaning)
          : '<span class="pvt-dim">Đang tra nghĩa…</span>';
        showPopup(rect,
          '<div class="pvt-head"><strong>✓ Đã lưu từ vựng</strong><button class="pvt-close">✕</button></div>' +
          '<div class="pvt-body"><b>' + esc(text) + '</b><br>' + meaningHtml + '</div>'
        );
      }
    );
  }

  function renderError(rect, msg) {
    showPopup(rect,
      '<div class="pvt-head"><strong>Lỗi</strong><button class="pvt-close">✕</button></div>' +
      '<div class="pvt-body pvt-err">' + esc(msg || "Không kết nối được extension.") + '</div>'
    );
  }

  // Toast ngắn.
  function toast(text) {
    const t = document.createElement("div");
    t.className = "pvt-toast";
    t.textContent = text;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2600);
  }

  // Nhận kết quả từ context menu (qua background).
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "pvt-translate-selection") {
      // Phím tắt: dịch ngay đoạn đang bôi đen.
      const sel = window.getSelection();
      const text = sel ? sel.toString().trim() : "";
      if (!text) { toast("Hãy bôi đen đoạn văn bản trước."); return; }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      doTranslate(text, rect);
    } else if (msg.type === "pvt-toast") toast(msg.text);
    else if (msg.type === "pvt-vocab-updated") {
      if (pop && lastVocab && msg.term === lastVocab.term) {
        let html =
          '<div class="pvt-head"><strong>✓ Đã lưu từ vựng</strong><button class="pvt-close">✕</button></div>' +
          '<div class="pvt-body"><b>' + esc(msg.term) + "</b>" +
          (msg.phonetic ? ' <span class="pvt-dim">' + esc(msg.phonetic) + "</span>" : "") +
          "<br>" + esc(msg.meaning || "") +
          (msg.definition ? '<br><span class="pvt-dim">' + esc(msg.definition) + "</span>" : "") +
          "</div>";
        if (msg.audio) html += '<div class="pvt-actions"><button class="pvt-mini" data-a="audio">🔊 Nghe</button></div>';
        const p = showPopup(lastVocab.rect, html);
        const ab = p.querySelector('[data-a="audio"]');
        if (ab) ab.addEventListener("click", () => { try { new Audio(msg.audio).play(); } catch {} });
      }
    } else if (msg.type === "pvt-show-result") {
      const sel = window.getSelection();
      let rect = { top: 60, bottom: 80, left: 40 };
      if (sel && sel.rangeCount) rect = sel.getRangeAt(0).getBoundingClientRect();
      showPopup(rect,
        '<div class="pvt-head"><strong>' + esc(msg.title) + '</strong><button class="pvt-close">✕</button></div>' +
        '<div class="pvt-body">' + esc(msg.text) + '</div>'
      );
    }
  });
})();
