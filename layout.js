// ============================================================
// layout.js — XÁC ĐỊNH THỨ TỰ ĐỌC (reading order) của PDF trước khi dịch.
// Paper thường trình bày nhiều cột; nếu chỉ gom text theo tọa độ y thô
// thì hai cột sẽ bị trộn thành câu vô nghĩa. Module này:
//   1) Gom các mảnh text thành DÒNG theo tọa độ.
//   2) Loại bỏ header/footer (số trang, tên hội nghị lặp lại).
//   3) Phát hiện số CỘT (1 hay 2) qua khe trắng giữa trang.
//   4) Sắp xếp: cột trái trên→dưới, rồi cột phải trên→dưới.
//   5) Gom dòng thành ĐOẠN VĂN (nối từ bị gạch nối cuối dòng, ngắt đoạn
//      theo khoảng cách dọc / thụt đầu dòng).
// Kết quả là văn bản ĐÚNG THỨ TỰ ĐỌC, sẵn sàng để chunk & dịch.
// ============================================================

function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Chuyển các item thô của pdf.js thành đối tượng tọa độ chuẩn hóa.
function makeObjs(items, medH) {
  return items
    .map((it) => ({
      str: it.str,
      x: it.transform[4],
      y: it.transform[5],
      w: it.width || 0,
      h: it.height || Math.abs(it.transform[3]) || medH,
    }))
    .filter((o) => o.str && o.str.length);
}

// Gom các item (ĐÃ tách theo cột) thành các DÒNG theo tọa độ y.
// Lưu ý: phải tách cột TRƯỚC khi gọi hàm này, nếu không hai cột cùng độ cao
// sẽ bị gom nhầm vào một dòng.
function objsToLines(objs, medH) {
  objs.sort((a, b) => b.y - a.y || a.x - b.x);
  const yTol = medH * 0.6;
  const lines = [];

  for (const o of objs) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - o.y) <= yTol) {
      last.items.push(o);
      last.y = (last.y * last.n + o.y) / (last.n + 1);
      last.n++;
    } else {
      lines.push({ y: o.y, n: 1, items: [o] });
    }
  }

  for (const L of lines) {
    L.items.sort((a, b) => a.x - b.x);
    let t = "";
    let prevEnd = null;
    for (const o of L.items) {
      if (prevEnd !== null && o.x - prevEnd > medH * 0.25) t += " ";
      t += o.str;
      prevEnd = o.x + o.w;
    }
    L.text = t.replace(/\s+/g, " ").trim();
    L.x0 = Math.min(...L.items.map((o) => o.x));
    L.x1 = Math.max(...L.items.map((o) => o.x + o.w));
  }
  return lines.filter((L) => L.text.length);
}

// Loại bỏ dòng header/footer: dòng ngắn nằm sát mép trên/dưới trang.
function filterRunning(lines, pageH) {
  return lines.filter((L) => {
    const nearTop = L.y > pageH * 0.955;
    const nearBottom = L.y < pageH * 0.045;
    const looksLikeRunning =
      L.text.length < 60 || /^\d+$/.test(L.text) || /^page\s+\d+/i.test(L.text);
    return !((nearTop || nearBottom) && looksLikeRunning);
  });
}

// Gạch nối cuối dòng: do NGẮT DÒNG (intro-\nduction -> introduction) hay là
// gạch nối THẬT của từ ghép (off-the-\nshelf -> off-the-shelf)? Bỏ nhầm sẽ tạo
// ra từ sai kiểu "off-theshelf" rồi lưu luôn vào kho từ vựng.
// Dấu hiệu của gạch nối thật: từ đang dở đã có gạch nối bên trong VÀ phần ngay
// trước gạch nối cuối là một hư từ trọn vẹn (off-the-, state-of-the-, up-to-).
const COMPOUND_JOINERS = new Set(
  ["a", "an", "the", "of", "to", "and", "or", "in", "on", "at", "by", "for", "it", "up", "out", "off"]
);
function keepHyphen(out, prevEndedEarly) {
  if (/­$/.test(out)) return false; // gạch nối MỀM luôn là do ngắt dòng
  const tail = out.replace(/[-­]$/, "").split(/\s/).pop() || "";
  if (prevEndedEarly) return true; // dòng kết thúc sớm -> không phải ngắt dòng
  const last = tail.split("-").pop().toLowerCase();
  return tail.includes("-") && COMPOUND_JOINERS.has(last);
}

// Nối các dòng của MỘT cột (đã theo thứ tự trên→dưới) thành đoạn văn.
function columnToParagraphs(colLines, medH) {
  colLines.sort((a, b) => b.y - a.y);
  if (!colLines.length) return "";
  const colMaxX = Math.max(...colLines.map((L) => L.x1));

  const gaps = [];
  for (let i = 1; i < colLines.length; i++) {
    const g = colLines[i - 1].y - colLines[i].y;
    if (g > 0) gaps.push(g);
  }
  const lineGap = median(gaps) || medH * 1.2;

  let out = "";
  for (let i = 0; i < colLines.length; i++) {
    const L = colLines[i];
    if (i === 0) {
      out = L.text;
      continue;
    }
    const prev = colLines[i - 1];
    const gap = prev.y - L.y;
    const bigGap = gap > lineGap * 1.55;
    const indent = L.x0 - prev.x0 > medH * 1.2; // thụt đầu dòng => đoạn mới
    const prevEndedEarly = prev.x1 < colMaxX - medH * 3;

    if (bigGap || indent) {
      out += "\n\n" + L.text;
    } else {
      // Cùng đoạn: nối lại, xử lý từ bị gạch nối cuối dòng.
      if (/[-­]$/.test(out) && /^[a-zà-ỹ]/.test(L.text)) {
        out = keepHyphen(out, prevEndedEarly) ? out + L.text : out.replace(/[-­]$/, "") + L.text;
      } else {
        out += " " + L.text;
      }
    }
  }
  return out;
}

// Sắp xếp thứ tự đọc cho 1 trang. Trả về { text, columns }.
function orderPage(items, pageW, pageH) {
  const heights = items.map((it) => it.height || Math.abs(it.transform[3]) || 0).filter(Boolean);
  const medH = median(heights) || 10;

  const objs = makeObjs(items, medH);
  if (!objs.length) return { text: "", columns: 0 };

  // Phát hiện 2 cột dựa trên ITEM (trước khi dựng dòng): rất ít item "băng qua"
  // khe giữa trang, và cả hai bên đều có đủ nội dung.
  const midX = pageW / 2;
  const band = pageW * 0.02;
  let crossing = 0;
  let leftN = 0;
  let rightN = 0;
  for (const o of objs) {
    const x1 = o.x + o.w;
    const c = (o.x + x1) / 2;
    if (o.x < midX - band && x1 > midX + band) crossing++;
    if (c < midX) leftN++;
    else rightN++;
  }
  const twoCol =
    objs.length >= 12 && crossing / objs.length < 0.1 && leftN > 3 && rightN > 3;

  if (twoCol) {
    const inLeft = (o) => (o.x + (o.x + o.w)) / 2 < midX;
    const left = filterRunning(objsToLines(objs.filter(inLeft), medH), pageH);
    const right = filterRunning(objsToLines(objs.filter((o) => !inLeft(o)), medH), pageH);
    const leftText = columnToParagraphs(left, medH);
    const rightText = columnToParagraphs(right, medH);
    return { text: [leftText, rightText].filter(Boolean).join("\n\n"), columns: 2 };
  }

  const lines = filterRunning(objsToLines(objs, medH), pageH);
  return { text: columnToParagraphs(lines, medH), columns: 1 };
}

// Trích xuất toàn bộ tài liệu theo thứ tự đọc.
// onProgress(pageNum, total) để cập nhật tiến trình.
async function extractReadingOrder(pdf, onProgress) {
  const pageTexts = [];
  const columnsPerPage = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const viewport = page.getViewport({ scale: 1 });
    const tc = await page.getTextContent();
    const { text, columns } = orderPage(tc.items, viewport.width, viewport.height);
    if (text) pageTexts.push(text);
    columnsPerPage.push(columns);
    if (onProgress) onProgress(n, pdf.numPages);
  }
  const fullText = pageTexts.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();

  // Cột phổ biến nhất (bỏ qua trang không có text).
  const counts = {};
  for (const c of columnsPerPage) if (c) counts[c] = (counts[c] || 0) + 1;
  const dominantColumns = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || 1;

  return {
    fullText,
    stats: { pages: pdf.numPages, columnsPerPage, dominantColumns: Number(dominantColumns) },
  };
}
