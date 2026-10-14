/* zitthenk học Oxytocin — Trạm 0 → 12 */
'use strict';
window.PARTS = [
  { name: 'Mở đầu', c: 'var(--butter)' },
  { name: 'Phần 1 · Oxytocin là ai?', c: 'var(--pink)' },
  { name: 'Phần 2 · Chỉ định & chống chỉ định', c: 'var(--peach)' },
  { name: 'Phần 3 · Khởi phát chuyển dạ', c: 'var(--sky)' },
  { name: 'Phần 4 · Tăng co', c: 'var(--mint)' },
  { name: 'Phần 5 · Khi oxytocin “quá tay”', c: 'var(--rose)' },
  { name: 'Phần 6 · Băng huyết sau sanh', c: 'var(--orchid)' },
  { name: 'Phần 7 · Các oxytocics khác', c: 'var(--lav)' },
  { name: 'Về đích', c: 'var(--aqua)' },
];

/* ---- Mảnh ghép dùng chung cho các trạm ---- */
const esc = s => String(s).replace(/"/g, '&quot;');
const quiz = (q, opts) => `<div class="quiz"><div class="q">${q}</div><div class="opts">${opts.map(([t, ok, fb]) => `<button class="opt" type="button"${ok ? ' data-ok' : ''}${fb ? ` data-fb="${esc(fb)}"` : ''}>${t}</button>`).join('')}</div><p class="fb"></p></div>`;
const tip = (t, k = '') => `data-tip="${esc(t)}" data-k="${k}" tabindex="0" role="button"`;
const ping = (cx, cy, r = 12) => `<circle class="ping" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e76f95" stroke-width="3"/>`;
const clk = t => `<span class="clock-badge">⏱ ${t}</span>`;
const dz = t => `<span class="dose-badge">💧 ${t}</span>`;
const INK = '#4a3f63';
const UT = 'M40 46 C40 14 160 14 160 46 C168 96 136 132 118 146 L118 176 C118 186 82 186 82 176 L82 146 C64 132 32 96 40 46Z';
/* Khuôn mỗi trạm: vùng hình + cột điều khiển/ghi chú, luôn cùng nằm trong 1 màn hình.
   Ô ghi chú ①②③ khai ở t.notes — app.js tự gắn số lên hình (toạ độ theo viewBox). */
const scene = (viz, ctl, mod = '', quest) => `<div class="scene ${mod}"${quest ? ` data-quest="${esc(JSON.stringify(quest))}"` : ''}><div class="viz">${viz}</div><div class="ctl">${ctl}</div></div>`;
/* Thẻ đổi hình phía trên hình: [[pane, nhãn], …] — pane đầu tiên đang mở */
const vtabs = (...t) => `<div class="vtabs">${t.map(([k, l], i) => `<button class="btn${i ? '' : ' on'}" type="button" data-show="${k}">${l}</button>`).join('')}</div>`;
const photo = (src, cap, pane = 'photo') => `<div class="fig pane photo" data-pane="${pane}"><img src="${src}" alt="${esc(cap)}" loading="lazy"><p class="cap">📷 ${cap}</p></div>`;
const X = '<span class="xtra">✨ bổ sung</span>';

/* Chai dịch truyền: dùng ở trạm 8, 9 */
const bottle = (o = {}) => `<svg class="bottle ${o.cls || ''}" viewBox="0 0 220 300" role="img" aria-label="Chai dịch truyền nhỏ giọt">
  <g class="b-all">
  <path d="M110 4 v16" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <rect x="62" y="20" width="96" height="150" rx="16" fill="#fff" stroke="${INK}" stroke-width="4"/>
  <rect class="liq" x="66" y="60" width="88" height="106" rx="10" fill="#e3f2fd"/>
  <rect x="74" y="78" width="72" height="44" rx="6" fill="#fff" stroke="${INK}" stroke-width="2"/>
  <text id="bL1" x="110" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="${INK}">${o.l1 || 'G5%'}</text>
  <text id="bL2" x="110" y="113" text-anchor="middle" font-size="11" font-weight="700" fill="#6f6684">${o.l2 || '500 mL'}</text>
  <text class="lab-ot" x="110" y="150" text-anchor="middle" font-size="13" font-weight="800" fill="#e0568a">+ 5 IU oxytocin</text>
  <rect x="98" y="170" width="24" height="14" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <rect x="94" y="184" width="32" height="52" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/>
  <rect class="liq ch-liq" x="97" y="221" width="26" height="12" rx="3" fill="#e3f2fd"/>
  <circle class="drip-drop" cx="110" cy="190" r="4.5" fill="#8ecae6" stroke="${INK}" stroke-width="1.5"/>
  <path d="M110 236 V300" stroke="${INK}" stroke-width="3"/>
  <rect x="99" y="252" width="22" height="12" rx="3" fill="#ffd166" stroke="${INK}" stroke-width="2"/>
  <text class="gtt-txt" id="gttTxt" x="134" y="214" font-size="13" font-weight="800" fill="#e0568a">${o.gtt || 'VII giọt/ph'}</text>
  </g>
  ${o.kit ? `<g class="syr"><rect x="150" y="34" width="54" height="16" rx="3" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="153" y="37" width="30" height="10" fill="#ff8fa3"/><path d="M204 42 h10 M214 34 v16" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M150 42 h-16" stroke="${INK}" stroke-width="2.5"/><text x="178" y="28" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">5 IU</text></g>
  <g class="clock"><circle cx="184" cy="250" r="22" fill="#fff1b8" stroke="${INK}" stroke-width="3"/><path d="M184 250 v-12" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path class="hand" d="M184 250 h12" stroke="#e0568a" stroke-width="3" stroke-linecap="round"/><text x="184" y="290" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">kiên nhẫn</text></g>` : ''}
</svg>`;

/* Đường cong độ nhạy tử cung theo tuần thai (trạm 4) */
const gaS = w => w < 20 ? 0 : w < 30 ? (w - 20) / 10 * .3 : w < 34 ? .3 + (w - 30) / 4 * .55 : .85 + Math.min(w - 34, 6) / 6 * .05;
const gaX = w => 50 + (w - 10) * 13.75, gaY = s => 210 - s * 170;
const setGA = (b, w) => { const r = $('#ga', b); r.value = w; fire(r, 'input'); };

TRAM.push(
/* ================= 0. BÌA ================= */
{
  slug: 'bia', part: 0, icon: '💧', title: 'zitthenk học Oxytocin', cover: true,
  how: ['Bấm <b>▶ Bắt đầu học</b>', 'Mỗi trạm làm theo dòng 📝 → bấm ô ①②③ ôn', 'Trạm 🎯 làm xong mới qua'],
  html: () => scene(`<div class="fig" style="background:var(--pink)">
      <svg class="mascot" viewBox="0 0 320 290" role="img" aria-label="Bé Oxy – giọt oxytocin dễ thương cạnh chai dịch truyền">
        <line x1="252" y1="18" x2="252" y2="282" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M232 26 h40" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <rect x="228" y="36" width="48" height="76" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/>
        <rect x="232" y="58" width="40" height="50" rx="6" fill="#ffb3c6"/>
        <text x="252" y="88" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">5 IU</text>
        <path d="M252 112 v14" stroke="${INK}" stroke-width="4"/>
        <rect x="244" y="126" width="16" height="26" rx="4" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <circle cx="252" cy="132" r="3.5" fill="#e76f95"><animate attributeName="cy" values="131;148" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.1s" repeatCount="indefinite"/></circle>
        <path d="M252 152 C252 200 214 206 196 228" fill="none" stroke="${INK}" stroke-width="3"/>
        <g class="bob">
          <path d="M120 40 C120 40 50 130 50 180 a70 70 0 0 0 140 0 C190 130 120 40 120 40Z" fill="#ffb3c6" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
          <path d="M80 168 q4 -32 28 -58" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".75"/>
          <g class="eyes"><circle cx="98" cy="182" r="8" fill="${INK}"/><circle cx="142" cy="182" r="8" fill="${INK}"/><circle cx="101" cy="179" r="2.6" fill="#fff"/><circle cx="145" cy="179" r="2.6" fill="#fff"/></g>
          <path d="M110 202 q10 11 20 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="82" cy="200" rx="11" ry="6" fill="#ff8fa3"/><ellipse cx="158" cy="200" rx="11" ry="6" fill="#ff8fa3"/>
          <path d="M53 196 q-24 -8 -30 -32" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M187 196 q20 -2 30 -20" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
        <ellipse cx="120" cy="274" rx="58" ry="8" fill="${INK}" opacity=".1"/>
        <path class="bob" d="M44 64 c-6 -11 -22 -5 -15 9 l15 13 l15 -13 c7 -14 -9 -20 -15 -9z" fill="#e76f95" stroke="${INK}" stroke-width="3"/>
        <path class="bob" style="animation-delay:.6s" d="M196 40 c-4 -7 -14 -3 -10 6 l10 8 l10 -8 c4 -9 -6 -13 -10 -6z" fill="#fff1b8" stroke="${INK}" stroke-width="2.5"/>
      </svg></div>`,
    `<h1>zitthenk học <span>Oxytocin</span></h1>
      <p class="lead">Tăng co & khởi phát chuyển dạ — 25 trạm, mỗi màn hình đúng 1 ý.</p>
      <div class="goals"><b class="hand">🎯 Học xong bà sẽ:</b>
        <div class="goal"><i>1</i>Nêu chỉ định & chống chỉ định của oxytocin</div>
        <div class="goal"><i>2</i>Dùng oxytocin khởi phát chuyển dạ</div>
        <div class="goal"><i>3</i>Dùng oxytocin tăng co (thúc đẩy chuyển dạ)</div>
        <div class="goal"><i>4</i>Dùng các oxytocics khác: PG, ergometrine</div></div>
      <div class="row"><button class="btn btn-go" type="button" data-go="1">▶ Bắt đầu học</button><a class="btn" href="#/ban-do">🗺️ Bản đồ lộ trình</a></div>
      <p class="mut small" style="margin:0">📚 Bài giảng “Oxytocics trong sản khoa”, BM Phụ Sản ĐHYD TP.HCM (Phạm Văn Đức, Âu Nhựt Luân). ✨ = bổ sung từ Williams / WHO.</p>`, 'cover'),
},

/* ================= 1. NHÀ MÁY HẠ ĐỒI ================= */
{
  slug: 'nha-may-ha-doi', part: 1, icon: '🧠', title: 'Nhà máy hạ đồi',
  lead: 'Sinh ra ở đâu? Cất ở đâu? Đi đường nào tới tử cung?',
  html: () => scene(`<div class="fig"><svg viewBox="0 0 440 300" role="img" aria-label="Sơ đồ hạ đồi – tuyến yên sau tiết oxytocin vào máu">
        <path d="M70 160 C45 100 95 34 180 34 C250 22 345 46 372 108 C392 156 360 196 310 196 L240 196 C228 196 220 200 214 206 L170 206 C120 206 82 196 70 160Z" fill="#ffd3e0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M110 92 q22 -24 44 0 q22 24 44 0 q22 -24 44 0 M120 140 q20 -18 40 0 q20 18 40 0 M270 70 q24 10 30 34 q6 24 34 30" fill="none" stroke="#e76f95" stroke-width="3" opacity=".45" stroke-linecap="round"/>
        <g ${tip('Hạ đồi (hypothalamus)|Trung tâm chỉ huy: chứa 2 nhân sản xuất oxytocin. Oxytocin là hormone peptide của hạ đồi.', 'hd')}><ellipse cx="205" cy="190" rx="46" ry="22" fill="#ffe0c2" stroke="${INK}" stroke-width="3"/></g>
        <path d="M206 206 L214 242" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M206 206 L214 242" stroke="#ffe0c2" stroke-width="10" stroke-linecap="round"/>
        <g ${tip('Thùy trước tuyến yên|KHÔNG liên quan oxytocin – đừng nhầm! (thùy trước tiết GH, ACTH, TSH, FSH/LH, PRL...)', 'truoc')}><ellipse cx="198" cy="258" rx="19" ry="16" fill="#eeeeee" stroke="${INK}" stroke-width="3"/></g>
        <g ${tip('Thùy sau tuyến yên|Chỉ là KHO + CỬA XUẤT: oxytocin được tiết từ các đầu cùng thần kinh ở thùy sau vào máu. Không tổng hợp ở đây!', 'sau')}><ellipse cx="232" cy="258" rx="19" ry="16" fill="#e4dcff" stroke="${INK}" stroke-width="3"/>${ping(232, 258, 14)}</g>
        <path d="M186 198 C196 222 218 236 228 252" fill="none" stroke="#e76f95" stroke-width="3" stroke-dasharray="4 5"/>
        <path d="M214 180 C224 208 232 232 232 252" fill="none" stroke="#e76f95" stroke-width="3" stroke-dasharray="4 5"/>
        <g ${tip('Sợi trục thần kinh (bó hạ đồi – tuyến yên)|Oxytocin đi kèm “vệ sĩ” oxytocin-neurophysin, chạy dọc sợi trục từ hạ đồi xuống thùy sau.', 'axon')}><path d="M186 198 C196 222 218 236 228 252" fill="none" stroke="transparent" stroke-width="14"/></g>
        <circle r="4.5" fill="#ff5d8f" stroke="${INK}" stroke-width="1.5"><animateMotion dur="2.4s" repeatCount="indefinite" path="M186 198 C196 222 218 236 228 252"/></circle>
        <circle r="4.5" fill="#ff5d8f" stroke="${INK}" stroke-width="1.5"><animateMotion dur="2.4s" begin="-1.2s" repeatCount="indefinite" path="M214 180 C224 208 232 232 232 252"/></circle>
        <g ${tip('Nhân trên thị (supraoptic nucleus)|“Xưởng” số 1 tổng hợp oxytocin.', 'son')}><circle cx="186" cy="198" r="16" fill="transparent"/><circle cx="186" cy="198" r="10" fill="#e76f95" stroke="${INK}" stroke-width="3"/>${ping(186, 198)}</g>
        <g ${tip('Nhân cạnh não thất (paraventricular nucleus)|“Xưởng” số 2 tổng hợp oxytocin.', 'pvn')}><circle cx="214" cy="180" r="16" fill="transparent"/><circle cx="214" cy="180" r="10" fill="#b197fc" stroke="${INK}" stroke-width="3"/>${ping(214, 180)}</g>
        <g ${tip('Vào tuần hoàn → tới tử cung|Oxytocin BẮT BUỘC đi qua ngả hệ tuần hoàn rồi mới tác dụng trên cơ tử cung ⇒ tác dụng NHANH và NGẮN. (Cũng tới tuyến vú → phản xạ tiết sữa.)', 'mau')}>
          <path d="M250 262 C300 272 330 240 372 248 C392 252 404 258 414 266" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/>
          <path d="M250 262 C300 272 330 240 372 248 C392 252 404 258 414 266" fill="none" stroke="#ff8fa3" stroke-width="13" stroke-linecap="round"/>
        </g>
        <circle r="4" fill="#fff" stroke="${INK}" stroke-width="1.5"><animateMotion dur="2s" repeatCount="indefinite" path="M250 262 C300 272 330 240 372 248 C392 252 404 258 414 266"/></circle>
        <circle r="4" fill="#fff" stroke="${INK}" stroke-width="1.5"><animateMotion dur="2s" begin="-1s" repeatCount="indefinite" path="M250 262 C300 272 330 240 372 248 C392 252 404 258 414 266"/></circle>
        <g transform="translate(372 180) scale(.3)"><path d="${UT}" fill="#ffd3e0" stroke="${INK}" stroke-width="10"/></g>
        <text x="402" y="176" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">Tử cung</text>
        <path d="M178 206 L132 236" stroke="${INK}" stroke-width="1.5"/><text x="128" y="250" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">Nhân trên thị</text>
        <path d="M222 174 L262 152" stroke="${INK}" stroke-width="1.5"/><text x="300" y="148" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">Nhân cạnh não thất</text>
        <text x="186" y="292" text-anchor="end" font-size="11" font-weight="700" fill="#6f6684">Thùy trước</text>
        <text x="232" y="292" text-anchor="start" font-size="11" font-weight="800" fill="#e0568a">Thùy sau</text>
      </svg></div>`,
    `<div class="hot-out"></div>`, 'hot',
    [['son+pvn', '🏭 Oxytocin được <b>SẢN XUẤT</b> ở đâu? Có <b>2 nhân</b> — chạm <b>đủ cả 2</b>.'], ['axon', '🚚 Nó đi đường nào xuống tuyến yên?'], ['sau', '📦 Được <b>TIẾT</b> vào máu ở thùy nào?'], ['mau', '🩸 Rồi đi đường nào để tới tử cung?'], ['truoc', '⚠️ Bẫy: thùy nào <b>KHÔNG</b> dính tới oxytocin?']]),
  gate: true,
  how: ['Đọc 🎯 nhiệm vụ → chạm đúng chỗ trên hình', 'Đúng → mở 1 ô ghi nhớ', 'Xong 5 nhiệm vụ → bấm ô ①–④ ôn lại'],
  notes: [
    [1, '<b>Nhân trên thị</b> + <b>nhân cạnh não thất</b> (hạ đồi) = nơi <b>SẢN XUẤT</b>', { at: [200, 189, 30], pin: [158, 178], more: 'Oxytocin là <b>hormone peptide</b> của hạ đồi — có 2 “xưởng”, đề hay hỏi đủ cả 2.' }],
    [2, 'Đi dọc <b>sợi trục</b> cùng “vệ sĩ” <b>oxytocin-neurophysin</b>', { at: [208, 225, 24], pin: [254, 222] }],
    [3, '<b>Thùy sau</b> tuyến yên chỉ là <b>kho + cửa xuất</b> vào máu', { at: [232, 258, 24], pin: [209, 290], more: `${X} <b>Phản xạ Ferguson</b>: ngôi ép CTC/âm đạo → hạ đồi → ↑ tiết oxytocin → co mạnh hơn → ép mạnh hơn = vòng xoắn dương tính ⇒ đỉnh ở giai đoạn sổ thai (Trạm 4).` }],
    [4, 'Qua <b>máu</b> → thụ thể <b>cơ trơn tử cung</b> ⇒ ↑ <b>tần số · cường độ · thời gian</b> cơn co', { at: [[330, 256, 52], [402, 196, 30]], more: 'Bắt buộc đi đường tuần hoàn ⇒ tác dụng <b>NHANH & NGẮN</b> (Trạm 3, 5). Cũng tới tuyến vú → phản xạ tiết sữa.' }],
    ['⚠️', 'Bẫy: “tổng hợp ở thùy sau” = <b>SAI</b> · <b>thùy trước</b> không liên quan', { at: [198, 258, 22], pin: [182, 234] }],
  ],
},

/* ================= 2. CHÂN DUNG 9 VIÊN BI ================= */
{
  slug: 'chan-dung-phan-tu', part: 1, icon: '🔮', title: 'Chân dung 9 viên bi',
  lead: 'Nonapeptide — anh em sinh đôi của ADH. Bấm biến hình!',
  html: () => {
    const B = [['Cys', 70, 180, '#fff1b8'], ['Tyr', 52, 108, '#cfe6fb'], ['Ile', 100, 50, '#cdeedd'], ['Gln', 180, 40, '#ffd3e0'], ['Asn', 232, 98, '#e4dcff'], ['Cys', 200, 170, '#fff1b8'], ['Pro', 276, 214, '#ffe0c2'], ['Leu', 352, 214, '#cdeedd'], ['Gly', 424, 170, '#cfe6fb']];
    const bonds = B.map(b => b[1] + ' ' + b[2]).join(' L');
    return scene(`${vtabs(['pep', '🎨 Hình vẽ'], ['photo', '📷 Hình thầy'])}<div class="fig pane on" data-pane="pep" id="pep"><svg viewBox="0 0 470 260" role="img" aria-label="Cấu trúc 9 acid amin của oxytocin">
        <text id="pepName" x="330" y="50" text-anchor="middle" font-family="Baloo 2, cursive" font-size="24" font-weight="800" fill="#e0568a">Oxytocin</text>
        <path d="M${bonds}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
        <path d="M70 180 L200 170" stroke="#f2b705" stroke-width="7" stroke-dasharray="7 6" stroke-linecap="round"/>
        <text x="135" y="200" text-anchor="middle" font-size="13" font-weight="800" fill="#b8860b">S–S</text>
        <g class="eyes"><circle cx="128" cy="112" r="5" fill="${INK}"/><circle cx="160" cy="112" r="5" fill="${INK}"/></g>
        <path d="M134 128 q10 9 20 0" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        ${B.map(([n, x, y, c], i) => `<g class="bead${i === 2 || i === 7 ? ' mut' : ''}" id="bd${i + 1}"><circle cx="${x}" cy="${y}" r="27" fill="${c}"/><text x="${x}" y="${y}">${n}</text></g><text x="${x + 22}" y="${y - 22}" font-size="12" font-weight="800" fill="#6f6684">${i + 1}</text>`).join('')}
        <text x="452" y="132" text-anchor="middle" font-size="14" font-weight="800" fill="${INK}">–NH₂</text>
      </svg></div>${photo('assets/hinh1-co-che-oxytocin.png', 'Hình 1 bài giảng — cơ chế & chuỗi acid amin')}`,
    `<button class="btn btn-lav" type="button" id="morph" aria-pressed="false">🔁 Biến hình thành Vasopressin (ADH)</button>
      <p class="hot-out" id="morphCap">Vòng 6 acid amin khóa bằng <b>cầu S–S</b>, thêm đuôi 3 acid amin.</p>`);
  },
  how: ['Bấm <b>🔁 Biến hình</b> → 2 viên đổi màu = chỗ khác ADH', 'Bấm ô ①②③ → hình sáng đúng chỗ', '<b>📷 Hình thầy</b> để so'],
  notes: [
    [1, '<b>Vòng 6 acid amin</b> khóa bằng <b>cầu S–S</b> (Cys¹–Cys⁶)', { at: [140, 112, 100], pin: [135, 222] }],
    [2, '<b>Đuôi 3 acid amin</b> Pro–Leu–Gly, đầu C amid hóa (<b>–NH₂</b>)', { at: [360, 196, 82] }],
    [3, 'Chỉ khác ADH <b>2/9 viên</b>: <b>3 (Ile↔Phe)</b> & <b>8 (Leu↔Arg)</b> ⇒ liều cao <b>giữ nước</b>', { at: [[100, 50, 34], [352, 214, 34]], act: b => { if (!$('#pep', b).classList.contains('vaso')) $('#morph', b).click(); },
      more: `${X} Liều cao “gõ nhầm cửa” thụ thể V2 ở thận. Williams: <b>≥ 20 mIU/ph</b> + nhiều <b>dịch không điện giải</b> (G5%) ⇒ <b>ngộ độc nước</b>: hạ Na, co giật, hôn mê. Bơm tiêm điện giúp <b>giảm thể tích dịch</b>.` }],
    ['💊', 'Là <b>peptide</b> ⇒ <b>uống bị pepsin phá</b> → chỉ <b>TB / TTM chậm</b> · gắn thụ thể màng ⇒ <b>nhanh & ngắn</b>'],
    ['🔍', 'Hình bài giảng ghi viên 5 là “Asp” — chuẩn là <b>Asn</b> (Cys-Tyr-Ile-Gln-<b>Asn</b>-Cys-Pro-Leu-Gly-NH₂)', { at: [232, 98, 32] }],
  ],
  mount(root) {
    const b = $('#morph', root), fig = $('#pep', root), cap = $('#morphCap', root);
    const t3 = $('#bd3 text', root), t8 = $('#bd8 text', root), nm = $('#pepName', root);
    const capOx = cap.innerHTML;
    b.onclick = () => {
      const v = fig.classList.toggle('vaso'); b.setAttribute('aria-pressed', v);
      t3.textContent = v ? 'Phe' : 'Ile'; t8.textContent = v ? 'Arg' : 'Leu';
      nm.textContent = v ? 'Vasopressin (ADH)' : 'Oxytocin';
      b.textContent = v ? '🔁 Trở lại Oxytocin' : '🔁 Biến hình thành Vasopressin (ADH)';
      cap.innerHTML = v ? 'Chỉ đổi viên <b>3 (Ile→Phe)</b> và <b>8 (Leu→Arg)</b> ⇒ liều cao <b>giữ nước</b> giống ADH.' : capOx;
      Sfx.play(v ? 'peel' : 'pop');
    };
  },
},

/* ================= 3. CHÌA KHÓA & Ổ KHÓA ================= */
{
  slug: 'thu-the-gpcr', part: 1, icon: '🔑', title: 'Chìa khóa vào ổ khóa',
  lead: 'Bấm từng mắt xích: oxytocin → calcium → sợi cơ co.',
  html: () => {
    let heads = '';
    for (let x = 6; x < 520; x += 14) heads += `<circle cx="${x}" cy="73" r="6" fill="#ffe0ec" stroke="#f5a6c4" stroke-width="1.5"/><circle cx="${x}" cy="101" r="6" fill="#ffe0ec" stroke="#f5a6c4" stroke-width="1.5"/>`;
    let helix = '';
    for (let k = 0; k < 7; k++) helix += `<rect x="${62 + k * 11}" y="58" width="9" height="56" rx="4" fill="#cdeedd" stroke="${INK}" stroke-width="2"/>`;
    const ar = (d, s) => `<path data-s="${s}" d="${d}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" marker-end="url(#ah)"/>`;
    return scene(`${vtabs(['co-che', '🎨 Hình vẽ'], ['photo', '📷 Hình thầy'])}<div class="fig pane on" data-pane="co-che"><svg viewBox="0 0 520 330" role="img" aria-label="Chuỗi tín hiệu oxytocin trong tế bào cơ trơn tử cung">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${INK}"/></marker></defs>
      <rect x="0" y="0" width="520" height="70" fill="#eaf4fd"/><rect x="0" y="104" width="520" height="226" fill="#fff4e8"/>
      <rect x="0" y="70" width="520" height="34" fill="#ffe0c2"/>${heads}
      <text x="510" y="20" text-anchor="end" font-size="12" font-weight="800" fill="#6f6684">Ngoài tế bào (máu tới)</text>
      <text x="510" y="324" text-anchor="end" font-size="12" font-weight="800" fill="#6f6684">Bào tương cơ trơn tử cung</text>
      <g data-s="1">${helix}<text x="100" y="132" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">Thụ thể OXTR</text>
        <g class="bob"><ellipse cx="100" cy="40" rx="24" ry="13" fill="#ff8fa3" stroke="${INK}" stroke-width="3"/><text x="100" y="45" text-anchor="middle" font-size="13" font-weight="900" fill="${INK}">OT</text></g></g>
      <g data-s="2"><circle cx="160" cy="126" r="17" fill="#ffd166" stroke="${INK}" stroke-width="3"/><text x="160" y="131" text-anchor="middle" font-size="13" font-weight="900">αq</text>
        <circle cx="186" cy="132" r="11" fill="#ffe0c2" stroke="${INK}" stroke-width="2.5"/><text x="186" y="136" text-anchor="middle" font-size="11" font-weight="800">β</text>
        <circle cx="202" cy="120" r="9" fill="#e4dcff" stroke="${INK}" stroke-width="2.5"/><text x="202" y="124" text-anchor="middle" font-size="10" font-weight="800">γ</text>
        <text x="172" y="166" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">GDP → GTP</text></g>
      ${ar('M210 132 C222 132 226 126 236 122', 3)}
      <g data-s="3"><rect x="238" y="102" width="64" height="34" rx="14" fill="#b2f2bb" stroke="${INK}" stroke-width="3"/><text x="270" y="124" text-anchor="middle" font-size="14" font-weight="900">PLC</text>
        <text x="312" y="118" font-size="13" font-weight="800" fill="${INK}">PIP₂ ✂ → IP₃ + DAG</text></g>
      ${ar('M330 132 C320 190 260 226 214 238', 4)}
      <g data-s="4"><ellipse cx="120" cy="252" rx="78" ry="36" fill="#e6e1ee" stroke="${INK}" stroke-width="3"/><text x="120" y="250" text-anchor="middle" font-size="13" font-weight="900">Kho Ca²⁺</text><text x="120" y="266" text-anchor="middle" font-size="11" font-weight="700" fill="#6f6684">(lưới nội cơ tương)</text>
        <g class="bob"><circle cx="212" cy="262" r="7" fill="#74c0fc" stroke="${INK}" stroke-width="1.5"/><circle cx="226" cy="246" r="7" fill="#74c0fc" stroke="${INK}" stroke-width="1.5"/><circle cx="230" cy="276" r="7" fill="#74c0fc" stroke="${INK}" stroke-width="1.5"/></g>
        <text x="226" y="300" text-anchor="middle" font-size="12" font-weight="900" fill="#1c7ed6">Ca²⁺ ↑</text></g>
      ${ar('M420 126 C440 140 444 156 440 168', 5)}
      <g data-s="5"><ellipse cx="440" cy="190" rx="66" ry="20" fill="#fff1b8" stroke="${INK}" stroke-width="3"/><text x="440" y="195" text-anchor="middle" font-size="13" font-weight="800">Protein kinase C</text></g>
      ${ar('M244 262 L262 272', 6)}
      <g data-s="6"><rect x="264" y="256" width="130" height="38" rx="12" fill="#e4dcff" stroke="${INK}" stroke-width="3"/><text x="329" y="272" text-anchor="middle" font-size="12" font-weight="900">Ca²⁺–Calmodulin</text><text x="329" y="287" text-anchor="middle" font-size="12" font-weight="800">→ MLCK</text></g>
      ${ar('M396 275 L410 275', 7)}
      <g data-s="7"><g class="fiber"><line x1="414" y1="246" x2="414" y2="304" stroke="${INK}" stroke-width="4"/><line x1="508" y1="246" x2="508" y2="304" stroke="${INK}" stroke-width="4"/>
        <path d="M414 258 H452 M414 292 H452 M470 258 H508 M470 292 H508" stroke="#e76f95" stroke-width="4" stroke-linecap="round"/>
        <rect x="434" y="268" width="54" height="14" rx="7" fill="#ff8fa3" stroke="${INK}" stroke-width="2.5"/></g>
        <text x="461" y="240" text-anchor="middle" font-size="13" font-weight="900" fill="#e0568a">CO SỢI CƠ 💪</text></g>
    </svg></div>${photo('assets/hinh1-co-che-oxytocin.png', 'Hình 1 bài giảng — cơ chế tác động của oxytocin')}`,
    `<div class="row"><button class="btn btn-go seq-next" type="button">▶ Mắt xích tiếp</button><button class="btn seq-reset" type="button">↺</button></div>
    <ol class="seq-list">
      <li class="mut">👆 Mỗi lần bấm sáng 1 mắt xích (7 mắt xích).</li>
      <li data-s="1"><b class="n">1</b> OT gắn <b>thụ thể OXTR</b> (GPCR) trên cơ trơn tử cung</li>
      <li data-s="2"><b class="n">2</b> Hoạt hóa protein <b>G<sub>q</sub></b>: GDP → GTP</li>
      <li data-s="3"><b class="n">3</b> <b>Phospholipase C</b> cắt PIP₂ → <b>IP₃ + DAG</b></li>
      <li data-s="4"><b class="n">4</b> IP₃ mở <b>kho Ca²⁺</b> → Ca²⁺ tràn ra bào tương</li>
      <li data-s="5"><b class="n">5</b> DAG hoạt hóa <b>protein kinase C</b></li>
      <li data-s="6"><b class="n">6</b> Ca²⁺–<b>calmodulin</b> → MLCK → phosphoryl hóa myosin</li>
      <li data-s="7"><b class="n">7</b> <b>Co sợi cơ</b> ⇒ ↑ tần số · ↑ cường độ · ↑ thời gian cơn co</li>
    </ol>`, 'seq');
  },
  gate: true, open: true,
  how: ['Bấm <b>▶ Mắt xích tiếp</b> 7 lần — mỗi lần sáng 1 khâu', 'Đọc câu vàng: khâu đó làm gì', '<b>📷 Hình thầy</b> để so'],
  notes: [
    ['⚡', 'Phải đi qua <b>máu</b> rồi gắn <b>thụ thể màng</b> ⇒ tác dụng <b>NHANH & NGẮN</b>', { at: [100, 70, 48] }],
    ['✨', 'Truyền <b>quá lâu</b> → thụ thể <b>giải mẫn cảm</b> ⇒ dễ <b>đờ tử cung</b> sau sanh', { more: `${X} Kích thích kéo dài ⇒ thụ thể giảm điều hòa, cơ tử cung “lì” với oxytocin ⇒ ↑ nguy cơ <b>băng huyết sau sanh do đờ tử cung</b>. Thêm lý do dùng <b>liều thấp nhất có hiệu quả</b>.` }],
  ],
},

/* ================= 4. TỬ CUNG THỨC GIẤC ================= */
{
  slug: 'nhay-cam-theo-tuan-thai', part: 1, icon: '📅', title: 'Tử cung “thức giấc” theo tuần thai',
  lead: 'Kéo tuần thai — tử cung nhạy với oxytocin tới đâu?',
  html: () => {
    let d = '';
    for (let w = 10; w <= 42.001; w += .25) d += (w === 10 ? 'M' : 'L') + gaX(w).toFixed(1) + ' ' + gaY(gaS(w)).toFixed(1);
    const band = (a, b, c, t) => `<rect x="${gaX(a)}" y="30" width="${gaX(b) - gaX(a)}" height="180" fill="${c}" opacity=".55"/><text x="${(gaX(a) + gaX(b)) / 2}" y="46" text-anchor="middle" font-size="11" font-weight="800" fill="#6f6684">${t}</text>`;
    return scene(`<div class="fig"><svg viewBox="0 0 520 250" role="img" aria-label="Độ nhạy cơ tử cung với oxytocin theo tuổi thai">
        ${band(20, 30, '#fff1b8', 'tăng chậm')}${band(30, 34, '#ffe0c2', '')}${band(34, 40, '#cdeedd', 'ổn định')}
        <line x1="50" y1="210" x2="496" y2="210" stroke="${INK}" stroke-width="3"/><line x1="50" y1="26" x2="50" y2="210" stroke="${INK}" stroke-width="3"/>
        ${[10, 20, 30, 34, 40].map(w => `<line x1="${gaX(w)}" y1="210" x2="${gaX(w)}" y2="217" stroke="${INK}" stroke-width="3"/><text x="${gaX(w)}" y="232" text-anchor="middle" font-size="13" font-weight="800">${w}</text>`).join('')}
        <text x="490" y="246" text-anchor="end" font-size="12" font-weight="800" fill="#6f6684">tuần thai</text>
        <text x="58" y="24" font-size="12" font-weight="800" fill="#6f6684">độ nhạy với oxytocin</text>
        <path d="${d}" fill="none" stroke="#e76f95" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <line id="gaLine" x1="0" y1="30" x2="0" y2="210" stroke="${INK}" stroke-width="2" stroke-dasharray="5 5"/>
        <circle id="gaDot" r="10" fill="#fff1b8" stroke="${INK}" stroke-width="3"/>
      </svg></div>`,
    `<div><div class="slider-lbl"><span>10</span><span id="gaW" class="hand" style="font-size:20px;color:var(--ink)">28 tuần</span><span>42</span></div>
      <input type="range" id="ga" min="10" max="42" step="1" value="28" aria-label="Tuần thai" style="margin:10px 0 0"></div>
      <div class="row" style="flex-wrap:nowrap;align-items:center">
        <svg viewBox="0 0 200 200" width="76" height="76" style="flex:none" aria-hidden="true"><g id="gaUt" class="ut-pulse"><path d="${UT}" fill="#ffd3e0" stroke="${INK}" stroke-width="6"/><circle cx="84" cy="70" r="6" fill="${INK}"/><circle cx="116" cy="70" r="6" fill="${INK}"/><path id="gaMouth" d="M88 92 q12 8 24 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g></svg>
        <div class="hot-out" id="gaOut" style="flex:1"></div>
      </div>`);
  },
  how: ['Kéo thanh <b>tuần thai</b>', 'Xem chấm trên đường cong + tử cung nhỏ co dần', 'Bấm ô ①②③ nhảy tới mốc'],
  coach: '#ga',
  notes: [
    [1, '<b>Trước tuần 20</b>: gần như “điếc” với oxytocin', { at: [118, 140, 66], act: b => setGA(b, 16) }],
    [2, '<b>20 → 30 tuần</b>: nhạy tăng <b>chậm</b>', { at: [256, 150, 66], act: b => setGA(b, 26) }],
    [3, '<b>Từ tuần 34</b>: <b>ổn định</b> tới gần ngày dự sanh', { at: [421, 64, 50], act: b => setGA(b, 38) }],
    ['⏰', 'Vào chuyển dạ nồng độ <b>×2–3</b> · <b>tối đa ở sổ thai</b> · giữ cao tới khi <b>co hồi tử cung</b>'],
    ['🔍', 'Prostaglandin thì đáp ứng <b>không đổi</b> suốt thai kỳ ⇒ thai nhỏ (TCN II) dùng PG', { more: `${X} Cuối thai kỳ ↑ mật độ <b>thụ thể oxytocin</b> + ↑ <b>gap junction (connexin 43)</b> ⇒ tế bào cơ co đồng bộ.` }],
  ],
  mount(root) {
    const r = $('#ga', root), dot = $('#gaDot', root), ln = $('#gaLine', root), out = $('#gaOut', root), ut = $('#gaUt', root), mo = $('#gaMouth', root), wl = $('#gaW', root);
    const upd = () => {
      const w = +r.value, s = gaS(w);
      dot.setAttribute('cx', gaX(w)); dot.setAttribute('cy', gaY(s)); ln.setAttribute('x1', gaX(w)); ln.setAttribute('x2', gaX(w));
      wl.textContent = w + ' tuần';
      ut.style.setProperty('--dur', s ? (2.8 - s * 1.5) + 's' : '0s'); ut.style.setProperty('--sq', 1 - s * .14);
      mo.setAttribute('d', s ? 'M88 92 q12 8 24 0' : 'M90 94 h20');
      out.innerHTML = w < 20 ? '😴 Còn “ngủ say” — chưa nhạy.' : w < 30 ? '🌱 Bắt đầu nhạy, tăng <b>chậm</b>.' : w < 34 ? '📈 Tiếp tục tăng.' : '🎯 <b>Ổn định</b> tới gần ngày dự sanh.';
    };
    r.oninput = upd; upd();
  },
},

/* ================= 5. NHANH & NGẮN ================= */
{
  slug: 'duoc-dong-hoc', part: 1, icon: '⚡', title: 'Nhanh & ngắn: dược động học',
  lead: 'Chọn đường dùng — rồi xem nồng độ lên xuống.',
  html: () => {
    const PX = t => 40 + t * 7.5, PY = c => 160 - c * 118;
    let d = '';
    const c45 = 1 - Math.exp(-45 / 9);
    for (let t = 0; t <= 60.01; t += .5) { const c = t <= 45 ? 1 - Math.exp(-t / 9) : c45 * .5 ** ((t - 45) / 5); d += (t ? 'L' : 'M') + PX(t).toFixed(1) + ' ' + PY(c).toFixed(1); }
    const vl = (t, n, col = INK) => `<line x1="${PX(t)}" y1="46" x2="${PX(t)}" y2="160" stroke="${col}" stroke-width="2" stroke-dasharray="4 4"/><circle cx="${PX(t)}" cy="36" r="10" fill="#fff" stroke="${col}" stroke-width="2.5"/><text x="${PX(t)}" y="41" text-anchor="middle" font-size="13" font-weight="900" fill="${col}">${n}</text>`;
    return scene(`${vtabs(['r', '💊 Đường dùng'], ['c', '📈 Nồng độ'])}<div class="fig pane on" data-pane="r" id="routeFig"><svg viewBox="0 0 520 230" role="img" aria-label="Các đường dùng oxytocin">
        <path class="route-path" id="rp-uong" d="M76 46 L136 46"/>
        <path d="M184 46 C220 46 236 100 262 116" fill="none" stroke="#eee" stroke-width="9" stroke-linecap="round" stroke-dasharray="3 9"/>
        <path class="route-path" id="rp-bap" d="M76 118 L262 118"/>
        <path class="route-path" id="rp-tm" d="M76 190 C170 190 220 130 262 120"/>
        <path class="route-path" id="rp-mau" d="M262 118 L432 118"/>
        <text x="347" y="106" text-anchor="middle" font-size="12" font-weight="800" fill="#6f6684">Máu tuần hoàn</text>
        ${[['💊', 46], ['💉', 118], ['🩸', 190]].map(([e, y]) => `<circle cx="46" cy="${y}" r="26" fill="#fff" stroke="${INK}" stroke-width="3"/><text x="46" y="${y + 8}" text-anchor="middle" font-size="24">${e}</text>`).join('')}
        <path d="M136 26 C176 14 204 40 196 62 C188 82 146 78 136 62Z" fill="#ffd3e0" stroke="${INK}" stroke-width="3"/>
        <text x="168" y="92" text-anchor="middle" font-size="11" font-weight="800" fill="#6f6684">dạ dày</text>
        <g class="pepsin" transform="translate(170 48) scale(-.62 .62)"><path d="M0 0 L22 -14 A26 26 0 1 0 22 14 Z" fill="#ffd166" stroke="${INK}" stroke-width="4"/><circle cx="-4" cy="-13" r="4" fill="${INK}"/></g>
        <g class="res-no"><text x="232" y="74" font-size="15" font-weight="900" fill="#e0568a">✖ Pepsin phân hủy!</text></g>
        <g transform="translate(424 46) scale(.42)"><path d="${UT}" fill="#ffd3e0" stroke="${INK}" stroke-width="7"/></g>
        <g class="res-ok"><circle cx="490" cy="60" r="18" fill="#cdeedd" stroke="${INK}" stroke-width="3"/><text x="490" y="67" text-anchor="middle" font-size="20" font-weight="900" fill="#2b8a5e">✔</text></g>
        <text x="466" y="150" text-anchor="middle" font-size="12" font-weight="800">Cơ tử cung</text>
      </svg></div>
      <div class="fig pane" data-pane="c"><svg viewBox="0 0 520 214" role="img" aria-label="Nồng độ oxytocin huyết tương theo thời gian khi truyền rồi ngưng">
        <line x1="40" y1="160" x2="500" y2="160" stroke="${INK}" stroke-width="3"/><line x1="40" y1="30" x2="40" y2="160" stroke="${INK}" stroke-width="3"/>
        ${[0, 10, 20, 30, 40, 50, 60].map(t => `<text x="${PX(t)}" y="178" text-anchor="middle" font-size="12" font-weight="700">${t}</text>`).join('')}
        <text x="500" y="178" text-anchor="end" dx="14" font-size="11" font-weight="800" fill="#6f6684">ph</text>
        <text x="46" y="22" font-size="11" font-weight="800" fill="#6f6684">nồng độ huyết tương</text>
        <rect x="${PX(0)}" y="148" width="${PX(45) - PX(0)}" height="8" rx="4" fill="#ff8fa3" opacity=".6"/>
        <text x="${PX(22)}" y="152" font-size="10" font-weight="800" text-anchor="middle">đang truyền TM</text>
        <path d="${d}" fill="none" stroke="#e76f95" stroke-width="5" stroke-linecap="round"/>
        ${vl(3.5, 1, '#2b8a5e')}${vl(40, 2)}${vl(45, 3, '#e0568a')}${vl(50, 4, '#e0568a')}
        <text x="270" y="204" text-anchor="middle" font-size="12.5" font-weight="800" fill="#6f6684">① có tác dụng · ② ổn định · ③ ngưng truyền · ④ còn ½</text>
      </svg></div>`,
    `<div class="seg" id="routes">
        <button class="btn" type="button" data-r="uong">💊 Uống</button>
        <button class="btn" type="button" data-r="bap">💉 Tiêm bắp</button>
        <button class="btn" type="button" data-r="tm">🩸 TM chậm</button>
      </div>
      <p class="hot-out" id="routeOut">👆 Chọn 1 đường dùng — xem thuốc có tới được tử cung không.</p>`);
  },
  how: ['Bấm <b>Uống / Tiêm bắp / TM chậm</b> → thuốc có tới tử cung?', 'Bấm ô ①②③ → biểu đồ nồng độ sáng đúng mốc'],
  coach: '#routes',
  notes: [
    [1, '<b>3–4 phút</b> sau truyền TM đã có tác dụng', { fig: '[data-pane=c] svg', at: [66, 100, 28] }],
    [2, '<b>~40 phút</b> nồng độ mới <b>ổn định</b> ⇒ chỉnh tăng liều cách <b>≥ 30 phút</b>', { fig: '[data-pane=c] svg', at: [340, 100, 30], more: 'Tăng sớm = “cộng dồn” khi chưa kịp thấy hiệu quả ⇒ cơn co <b>cường tính</b> (Trạm 10).' }],
    [3, 'Ngưng truyền → <b>t½ 5 phút</b> ⇒ rối loạn cơn co: <b>cắt hẳn & chờ</b> vài phút', { fig: '[data-pane=c] svg', at: [[377, 100, 24], [415, 100, 24]], more: `Nếu do oxytocin, cường tính hết sau vài phút (Trạm 16). ${X} Nhau tiết <b>oxytocinase</b> phân hủy oxytocin ⇒ t½ rất ngắn.` }],
    ['🚮', 'Thải trừ ở <b>gan · thận · tuyến vú</b>'],
  ],
  mount(root) {
    const fig = $('#routeFig', root), out = $('#routeOut', root);
    const T = {
      uong: ['uong', '❌ <b>Uống:</b> bị <b>pepsin</b> dạ dày phân hủy.'],
      bap: ['bap mau', '✅ <b>Tiêm bắp</b> (cả cơ tử cung): dùng cho <b>băng huyết sau sanh</b>, không dùng tăng co.'],
      tm: ['tm mau', '✅ <b>Truyền TM chậm:</b> đường <b>DUY NHẤT</b> để khởi phát & tăng co.'],
    };
    $$('#routes .btn', root).forEach(b => b.onclick = () => {
      const [paths, txt] = T[b.dataset.r];
      $$('#routes .btn', root).forEach(x => x.classList.toggle('on', x === b));
      $$('[data-pane]', root).forEach(p => p.classList.toggle('on', p.dataset.pane === 'r'));
      $$('[data-show]', root).forEach(x => x.classList.toggle('on', x.dataset.show === 'r'));
      fig.dataset.route = b.dataset.r;
      $$('.route-path', fig).forEach(p => p.classList.toggle('act', paths.split(' ').some(k => p.id === 'rp-' + k)));
      out.innerHTML = txt; Sfx.play(b.dataset.r === 'uong' ? 'buzz' : 'chime');
    });
  },
},

/* ================= 6. CHỈ ĐỊNH & CHỐNG CHỈ ĐỊNH ================= */
{
  slug: 'chi-dinh-chong-chi-dinh', part: 2, icon: '🚦', title: 'Gọi hay không gọi Oxytocin?',
  lead: 'Mỗi lần 1 thẻ — bấm vào hộp đúng.',
  html: () => scene(`<div class="sort">
      <div class="pool no-swipe">
        <button class="card" type="button" data-bin="ccd" data-why="Suy thai cấp = CCĐ tuyệt đối." data-hint="thai đang thiếu oxy mà còn ép co?">💔 Suy thai cấp</button>
        <button class="card" type="button" data-bin="tt" data-why="Vết mổ cũ: tăng nguy cơ NỨT VẾT MỔ." data-hint="không cấm tuyệt đối, nhưng có nguy cơ nứt vết mổ.">✂️ Vết mổ sanh cũ</button>
        <button class="card" type="button" data-bin="cd" data-why="Băng huyết do đờ tử cung = chỉ định." data-hint="tử cung đã trống, cần co lại để cầm máu.">🩸 Đờ tử cung sau sổ nhau</button>
        <button class="card" type="button" data-bin="ccd" data-why="Bất xứng đầu chậu tuyệt đối = CCĐ tuyệt đối." data-hint="đầu không thể lọt dù co mạnh cỡ nào.">🚪 Bất xứng đầu chậu tuyệt đối</button>
        <button class="card" type="button" data-bin="tt" data-why="Đa sản: tăng nguy cơ VỠ TỬ CUNG." data-hint="tử cung đã giãn mỏng qua nhiều lần sanh...">👶 Đa sản (con thứ 5)</button>
        <button class="card" type="button" data-bin="cd" data-why="Cơn co yếu, không bất xứng = chỉ định tăng co." data-hint="cơn co yếu, không có cản trở cơ học.">🐢 Cơn co yếu, không bất xứng</button>
        <button class="card" type="button" data-bin="tt" data-why="Khởi phát ngôi ngược: tăng nguy cơ sơ sinh so với mổ chủ động." data-hint="so với mổ chủ động thì sơ sinh chịu rủi ro hơn.">🍑 Ngôi mông, muốn khởi phát</button>
        <button class="card" type="button" data-bin="cd" data-why="Cần chấm dứt thai kỳ, chưa chuyển dạ = chỉ định khởi phát." data-hint="chưa chuyển dạ mà cần cho sanh.">📆 Thai 41 tuần cần chấm dứt</button>
      </div>
      <div class="bins">
        <div class="bin" role="button" tabindex="0" data-bin="cd" style="--c:var(--mint)"><h4>✅ Chỉ định</h4><div class="slot"></div></div>
        <div class="bin" role="button" tabindex="0" data-bin="tt" style="--c:var(--butter)"><h4>⚠️ Thận trọng</h4><div class="slot"></div></div>
        <div class="bin" role="button" tabindex="0" data-bin="ccd" style="--c:var(--pink)"><h4>⛔ CCĐ</h4><div class="slot"></div></div>
      </div>
      <p class="sort-msg">👆 Thẻ này thuộc hộp nào? Bấm vào hộp.</p>
    </div>`, '', 'game'),
  gate: true,
  how: ['Đọc thẻ to ở trên', 'Bấm hộp đúng: <b>✅ Chỉ định · ⚠️ Thận trọng · ⛔ CCĐ</b>', 'Xếp đủ 8 thẻ → mở 4 ô ghi nhớ'],
  notes: [
    ['✅', '3 chỉ định (cần ↑ co tử cung): <b>khởi phát</b> · <b>tăng co</b> · <b>BHSS do đờ TC</b> (sau sanh / sau mổ sanh)'],
    ['⛔', 'CCĐ tuyệt đối: <b>suy thai cấp</b> · <b>bất xứng đầu chậu tuyệt đối</b>', { more: 'Mẹo: “<b>Con đang ngộp</b>” & “<b>Cửa quá hẹp</b>” — càng ép co càng hại: thai thiếu oxy thêm, tử cung vỡ.' }],
    ['⚠️', 'Thận trọng: <b>sẹo mổ cũ</b> (nứt) · <b>đa sản</b> (vỡ TC) · <b>ngôi ngược</b> khi khởi phát (hại sơ sinh)', { more: 'Đa sản & sẹo mổ: <b>tuyệt đối không</b> dùng dung dịch nồng độ cao (Trạm 17).' }],
    ['☠', 'Nguy hiểm nhất khi <b>thai còn trong buồng tử cung</b>'],
  ],
},

/* ================= 7. LIỀU THẤP HAY LIỀU CAO ================= */
{
  slug: 'lieu-thap-lieu-cao', part: 3, icon: '🐢', title: '3 nguyên tắc vàng & liều thấp',
  lead: 'Khởi phát chuyển dạ — Việt Nam chọn “rùa”.',
  html: () => {
    const SX = t => 50 + t * 2.5, SY = d => 200 - d * 4.2;
    const stairs = pts => pts.map(([t, dd], i) => i ? `H${SX(t)} V${SY(dd)}` : `M${SX(t)} ${SY(dd)}`).join(' ');
    const low = stairs([[0, 3], [30, 5], [60, 7], [90, 9], [120, 11], [150, 13], [180, 15]]) + ` H${SX(185)}`;
    const high = stairs([[0, 6], [15, 12], [30, 18], [45, 24], [60, 30], [75, 36], [90, 40]]) + ` H${SX(185)}`;
    return scene(`<div class="fig"><svg viewBox="0 0 520 236" role="img" aria-label="So sánh bậc thang liều oxytocin liều thấp và liều cao">
        <line x1="50" y1="200" x2="510" y2="200" stroke="${INK}" stroke-width="3"/><line x1="50" y1="24" x2="50" y2="200" stroke="${INK}" stroke-width="3"/>
        ${[0, 30, 60, 90, 120, 150, 180].map(t => `<text x="${SX(t)}" y="218" text-anchor="middle" font-size="12" font-weight="700">${t}</text>`).join('')}
        ${[10, 20, 30, 40].map(dd => `<text x="44" y="${SY(dd) + 4}" text-anchor="end" font-size="12" font-weight="700">${dd}</text>`).join('')}
        <text x="510" y="234" text-anchor="end" font-size="11" font-weight="800" fill="#6f6684">phút</text><text x="56" y="20" font-size="11" font-weight="800" fill="#6f6684">mIU/phút</text>
        <g class="dose-low"><line x1="50" y1="${SY(20)}" x2="510" y2="${SY(20)}" stroke="#2b8a5e" stroke-width="2" stroke-dasharray="6 5"/><text x="505" y="${SY(20) - 6}" text-anchor="end" font-size="12" font-weight="800" fill="#2b8a5e">trần thấp</text>
          <path d="${low}" fill="none" stroke="#2b8a5e" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><text x="${SX(4)}" y="${SY(3) + 18}" font-size="16">🐢</text></g>
        <g class="dose-high"><line x1="50" y1="${SY(40)}" x2="510" y2="${SY(40)}" stroke="#e76f95" stroke-width="2" stroke-dasharray="6 5"/><text x="505" y="${SY(40) - 6}" text-anchor="end" font-size="12" font-weight="800" fill="#e76f95">trần cao</text>
          <path d="${high}" fill="none" stroke="#e76f95" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><text x="${SX(2)}" y="${SY(6) - 8}" font-size="16">🐇</text></g>
      </svg></div>`,
    `<div class="seg"><button class="btn on" type="button" data-m="low">🐢 Liều thấp</button><button class="btn" type="button" data-m="high">🐇 Liều cao</button></div>
      <p class="hot-out ev-low">🐢 Khởi đầu thấp · tăng chậm · tối đa thấp ⇒ <b>không tăng can thiệp</b> ⇒ <b>Việt Nam dùng</b></p>
      <p class="hot-out ev-high" style="background:var(--pink);border-color:var(--pink-d);box-shadow:0 5px 0 var(--pink-d)">🐇 Khởi đầu cao · tăng nhanh · tối đa cao ⇒ ↑ <b>chuyển dạ cực nhanh</b></p>`);
  },
  how: ['Bấm <b>🐢 Thấp / 🐇 Cao</b> → bậc thang liều đổi', 'So: bậc đầu · độ dốc · trần', 'Bấm ô ①②③ → sáng đúng đường'],
  notes: [
    ['🏅', '3 nguyên tắc vàng khởi phát: <b>① TM thật chậm</b> · <b>② liều thấp nhất có hiệu quả</b> · <b>③ theo dõi chặt</b>'],
    [1, 'Phác đồ khác nhau ở <b>liều khởi đầu · nhịp & biên độ tăng · liều tối đa</b>', { at: [[70, 180, 30], [275, 120, 70]], more: 'Bậc thang trên hình chỉ minh họa <b>hình dạng</b> 2 nhóm, không phải liều thật.' }],
    [2, '🐢 <b>Liều thấp</b>: không tăng can thiệp trên cuộc sanh ⇒ <b>VN dùng phổ biến</b>', { at: [300, 160, 60], act: b => $('[data-m=low]', b).click() }],
    [3, '🐇 <b>Liều cao</b>: ↑ tần suất <b>chuyển dạ cực nhanh</b>', { at: [170, 100, 72], act: b => $('[data-m=high]', b).click() }],
    ['⏱', 'Chỉnh tăng liều <b>&gt; 1 lần / 30 phút</b> ⇒ cơn co <b>cường tính</b>'],
  ],
  mount(root) {
    const sc = $('.scene', root); sc.dataset.mode = 'low';
    $$('[data-m]', sc).forEach(b => b.onclick = () => { sc.dataset.mode = b.dataset.m; $$('[data-m]', sc).forEach(x => x.classList.toggle('on', x === b)); Sfx.play('pop'); });
  },
},

/* ================= 8. TRÌNH TỰ PHA CHAI ================= */
{
  slug: 'trinh-tu-pha-chai', part: 3, icon: '🧪', title: 'Trình tự khởi đầu',
  lead: 'Bấm 4 bước đúng thứ tự để chai dịch “sống dậy”.',
  html: () => scene(`<div class="fig">${bottle({ kit: true, cls: 'b8' })}</div>`,
    `<div class="order" data-win="🎉 Chuẩn! VII giọt ≈ <b>3 mIU/phút</b> — giờ kiên nhẫn chờ.">
        <ol class="done"></ol>
        <div class="pool">
          <button type="button" data-i="2" data-fb="Khoan! Lập đường truyền và chỉnh giọt xong đã.">💉 Hòa 5 IU oxytocin vào chai</button>
          <button type="button" data-i="0">🧴 Chai G5% 500 mL — <u>chưa có thuốc</u></button>
          <button type="button" data-i="3" data-fb="Chưa! Chai còn chưa có thuốc mà.">⏳ Kiên nhẫn chờ</button>
          <button type="button" data-i="1" data-fb="Chưa có đường truyền thì chỉnh giọt gì nè?">🎚️ Chỉnh giọt thấp nhất (VII giọt/ph)</button>
        </div>
        <p class="msg"></p>
      </div>`),
  gate: true,
  how: ['Bấm 4 thẻ theo <b>đúng thứ tự</b>', 'Đúng: chai dịch đổi + mở 1 ô ghi nhớ', 'Sai: đọc lý do, chọn lại'],
  notes: [
    [1, 'Lập đường truyền bằng <b>chai G5% 500 mL “trắng”</b> — <b>chưa có thuốc</b>', { at: [110, 95, 62] }],
    [2, '<b>Chỉnh giọt thấp nhất: VII giọt/ph</b> trước', { at: [110, 214, 34], more: 'Lúc mở khóa, dịch chảy nhanh vài chục giây — nếu chai đã có thuốc ⇒ như <b>tiêm bolus</b> ⇒ cường tính / tụt HA.' }],
    [3, 'Rồi mới <b>hòa 5 IU oxytocin</b> vào chai ⇒ VII giọt ≈ <b>3 mIU/ph</b>', { at: [178, 42, 34] }],
    [4, '<b>Kiên nhẫn</b>: không vội tăng liều — cả <b>thời gian</b> lẫn <b>tốc độ</b>', { at: [184, 252, 30], more: 'Bài giảng: <b>tôn trọng tuyệt đối đúng trình tự</b>.' }],
    ['🔌', 'Bơm tiêm điện: khởi đầu <b>2 – 2,5 mIU/ph</b> (5 IU/50 mL ⇒ <b>1,2 – 1,5 mL/h</b>)', { more: 'Thử ở Trạm 9 (🎛️ Mô phỏng).' }],
  ],
  mount(root) {
    const svg = $('.bottle', root);
    root.addEventListener('ordered', e => {
      const s = e.detail.step + 1; svg.classList.add('s' + s);
      if (s === 2) { svg.classList.add('drip'); svg.style.setProperty('--dt', (60 / 7).toFixed(2) + 's'); }
      if (s === 3) Sfx.play('drip');
    });
  },
},

/* ================= 9. BỘ ĐẾM GIỌT ================= */
{
  slug: 'bo-dem-giot', part: 3, icon: '🎚️', title: 'Bộ đếm giọt',
  lead: 'Kéo tốc độ — xem ngay bao nhiêu mIU/phút vào sản phụ.',
  html: () => scene(`<div class="fig" id="figDrip">${bottle({ cls: 's1 s2 drip', l1: '5 IU', l2: '/500 mL G5%' })}</div>
      <div class="fig" id="figPump" hidden><svg viewBox="0 0 260 150" role="img" aria-label="Bơm tiêm điện">
        <rect x="10" y="50" width="240" height="88" rx="16" fill="#cfe6fb" stroke="${INK}" stroke-width="4"/>
        <rect x="24" y="66" width="108" height="40" rx="8" fill="${INK}"/><text id="pumpTxt" x="78" y="93" text-anchor="middle" font-size="19" font-weight="800" fill="#b2f2bb">2,4 mL/h</text>
        <circle cx="168" cy="86" r="14" fill="#ff8fa3" stroke="${INK}" stroke-width="3"/><circle cx="210" cy="86" r="14" fill="#cdeedd" stroke="${INK}" stroke-width="3"/>
        <rect x="34" y="16" width="160" height="26" rx="6" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="38" y="20" width="120" height="18" rx="3" fill="#ffc2d4"/>
        <rect x="194" y="22" width="40" height="14" rx="3" fill="#fff" stroke="${INK}" stroke-width="3"/><rect x="232" y="12" width="8" height="34" rx="3" fill="${INK}"/>
        <path id="pumpFlow" class="flow" d="M34 29 H4" stroke="#e76f95" stroke-width="5" stroke-linecap="round"/>
        <text x="130" y="130" text-anchor="middle" font-size="12" font-weight="800" fill="${INK}">5 IU + 49 mL G5% = 100 mIU/mL</text>
      </svg></div>
      <div class="ruler" aria-hidden="true">
        <span class="mk" style="left:7.5%"><span>3–4</span></span>
        <span class="mk lo" style="left:30%"><span>12 thường đủ</span></span>
        <span class="mk" style="left:50%"><span>20 rất cao</span></span>
        <span class="mk lo" style="left:80%"><span>32 thất bại</span></span>
        <span class="needle" id="needle"></span>
      </div>
      <div class="readout">
        <div class="box c-pink"><div class="lbl">Liều</div><div class="big-num" id="oDose">3,5</div><div class="lbl">mIU/phút</div></div>
        <div class="box c-butter"><div class="lbl">Tốc độ</div><div class="big-num" id="oRate">VII</div><div class="lbl" id="oRate2">giọt/phút</div></div>
        <div class="box c-sky"><div class="lbl">Hết sau</div><div class="big-num" id="oTime">24 h</div><div class="lbl" id="oVol">500 mL</div></div>
      </div>`,
    `<div class="seg" id="dripMode">
        <button class="btn on" type="button" data-m="gio5">5 IU/500</button>
        <button class="btn" type="button" data-m="gio10">10 IU/500 ⚠️</button>
        <button class="btn" type="button" data-m="bom">Bơm tiêm</button>
      </div>
      <div><div class="slider-lbl"><span id="rMin">0</span><span id="rUnit" class="hand" style="color:var(--ink);font-size:17px">giọt/phút</span><span id="rMax">80</span></div>
      <input type="range" id="dr" min="0" max="80" step="1" value="7" aria-label="Tốc độ truyền" style="margin:10px 0 0"></div>
      <p class="hot-out" id="oMsg"></p>
      <div class="warn warn-hi">CẤM ở <b>đa sản</b> & <b>sẹo mổ cũ</b>.</div>`),
  how: ['Kéo thanh <b>tốc độ</b> → liều mIU/ph đổi ngay', 'Bấm ô ①–④ nhảy tới mốc liều', 'Đổi <b>10 IU/500</b> · <b>Bơm tiêm</b> để so'],
  coach: '#dr',
  notes: [
    [1, '<b>VII giọt ≈ 3 mIU/ph</b> = khởi đầu <b>khởi phát</b>', { act: b => b.preset('gio5', 7), more: '5 IU/500 mL = 10 mIU/mL, <b>1 mL = 20 giọt</b> ⇒ <b>1 giọt/ph = 0,5 mIU/ph</b>. 🔍 Đúng ra VII giọt = 3,5 — bài giảng làm tròn “≈ 3”. Thi nhớ cặp: <b>VII ≈ 3</b> · <b>VIII = 4</b>.' }],
    [2, '<b>VIII giọt = 4 mIU/ph</b> = khởi đầu <b>tăng co</b>', { act: b => b.preset('gio5', 8) }],
    [3, '<b>XXIV = 12</b> thường đã đủ · <b>XL = 20</b> rất cao (max tăng co) · <b>LXIV = 32</b> khởi phát thất bại', { act: b => b.preset('gio5', 24), more: 'Công thức: <b>mIU/ph = giọt/ph ÷ 20 × nồng độ</b> (mIU/mL) — hoặc mL/giờ ÷ 60 × nồng độ.' }],
    [4, 'Bơm tiêm 5 IU + 49 mL = <b>100 mIU/mL</b>: <b>2,4 mL/h = 4</b> (tăng co) · 1,2–1,5 mL/h = 2–2,5 (khởi phát)', { act: b => b.preset('bom', 2.4) }],
    ['⚠️', '<b>10 IU/500 mL</b> (1 giọt = 1 mIU): <b>CẤM</b> ở đa sản & sẹo mổ cũ', { act: b => b.preset('gio10', 20) }],
  ],
  mount(root) {
    const box = $('.scene', root), r = $('#dr', root), svg = $('#figDrip .bottle', root);
    const M = {
      gio5: { conc: 10, max: 80, step: 1, vol: 500, def: 7, l1: '5 IU', l2: '/500 mL G5%', liq: '#ffc2d4' },
      gio10: { conc: 20, max: 40, step: 1, vol: 500, def: 4, l1: '10 IU', l2: '/500 mL G5%', liq: '#ff8fa3' },
      bom: { conc: 100, max: 20, step: .1, vol: 50, def: 2.4 },
    };
    let m = 'gio5';
    const isPump = () => m === 'bom';
    function msg(d) {
      if (d === 0) return '💤 Chưa chảy giọt nào.';
      if (d < 2) return '🔹 Dưới liều khởi đầu.';
      if (d <= 2.6) return isPump() ? '🟢 Khởi đầu <b>khởi phát</b> bằng bơm tiêm.' : '🔹 Gần liều khởi đầu.';
      if (d < 3.8) return '🟢 Khởi đầu <b>khởi phát</b> (≈ 3 mIU/ph).';
      if (d <= 4.2) return '🟢 Khởi đầu <b>tăng co</b>: 4 mIU/ph.';
      if (d < 12) return '🟡 Vùng leo thang liều.';
      if (d < 20) return '🟡 ~12 mIU/ph thường <b>đã đủ</b> cơn co.';
      if (d < 32) return '🟠 <b>≥ 20 = RẤT CAO</b> · max tăng co.';
      return '🔴 <b>32</b>: không đáp ứng ⇒ <b>khởi phát thất bại</b>.';
    }
    function upd() {
      const c = M[m], v = +r.value;
      const mlh = isPump() ? v : v * 3, d = isPump() ? v / 60 * c.conc : v / 20 * c.conc;
      $('#oDose', root).textContent = fmt(d);
      $('#oRate', root).textContent = isPump() ? fmt(v) : roman(v);
      $('#oRate2', root).textContent = isPump() ? 'mL/giờ' : `giọt/ph · ${fmt(mlh)} mL/h`;
      $('#oTime', root).textContent = mlh ? fmt(c.vol / mlh) + ' h' : '∞';
      $('#oVol', root).textContent = isPump() ? 'xi-lanh 50 mL' : 'chai 500 mL';
      $('#needle', root).style.left = Math.min(d, 40) / 40 * 100 + '%';
      $('#oMsg', root).innerHTML = msg(d);
      if (isPump()) { $('#pumpTxt', root).textContent = fmt(v) + ' mL/h'; $('#pumpFlow', root).style.animationDuration = v ? Math.max(.25, 4 / v) + 's' : '0s'; }
      else { $('#gttTxt', root).textContent = roman(v) + ' giọt/ph'; svg.style.setProperty('--dt', v ? (60 / v).toFixed(2) + 's' : '0s'); svg.classList.toggle('drip', v > 0); }
    }
    function setMode(k, val) {
      m = k; const c = M[k]; box.dataset.mode = k;
      $$('#dripMode .btn', root).forEach(x => x.classList.toggle('on', x.dataset.m === k));
      $('#figDrip', root).hidden = isPump(); $('#figPump', root).hidden = !isPump();
      r.max = c.max; r.step = c.step; r.value = val ?? c.def;
      $('#rMax', root).textContent = c.max; $('#rUnit', root).textContent = isPump() ? 'mL/giờ' : 'giọt/phút';
      if (!isPump()) { $('#bL1', root).textContent = c.l1; $('#bL2', root).textContent = c.l2; $$('.liq', svg).forEach(x => x.style.fill = c.liq); }
      fillRange(r); upd();
    }
    $$('#dripMode .btn', root).forEach(b => b.onclick = () => { setMode(b.dataset.m); Sfx.play(b.dataset.m === 'gio10' ? 'buzz' : 'pop'); });
    r.oninput = upd;
    root.preset = (k, v) => { setMode(k, v); Sfx.play('drip'); };
    setMode('gio5');
  },
},

/* ================= 10. LEO THANG MỖI 30 PHÚT ================= */
{
  slug: 'leo-thang-moi-30-phut', part: 3, icon: '⏱️', title: 'Leo thang liều: mỗi 30 phút',
  lead: 'Bà trực sanh. Chị Lan, con so, 41 tuần, đang khởi phát bằng oxytocin.',
  html: () => scene('', `<div class="scn-box" id="scn10"></div>`),
  gate: true,
  how: ['Đọc băng CTG + tình huống', 'Chọn cách xử trí — sai thì đọc lý do', 'Đúng → mở 1 ô · <b>Tình huống tiếp ▶</b> (4 câu)'],
  notes: [
    ['⏱', 'Tăng liều cách nhau <b>≥ 30 phút</b> — không bao giờ dày hơn'],
    ['➕', 'Chưa đạt mục tiêu ⇒ mỗi lần tăng <b>1,5 – 2,5 mIU/ph</b>'],
    ['🎯', 'Mục tiêu <b>3 cơn/10′, mỗi cơn 40″</b> ⇒ <b>duy trì tới khi sanh</b>; không quá <b>3–4 cơn/10′</b>', { more: '🔍 Vì sao 3 × 40″? Đủ để CTC xóa mở mà vẫn chừa <b>thời gian nghỉ</b> cho máu tưới hồ huyết nhau ⇒ thai không thiếu oxy.' }],
    ['⛔', 'Cường tính ⇒ <b>cắt hẳn oxytocin</b> (không giảm nửa vời), tìm <b>nguyên nhân thực thể</b>'],
    ['☠', 'Phần lớn ca <b>~12 mIU/ph</b> đã hiệu quả — liều cao rất nguy hiểm'],
  ],
  mount(root) {
    scenario($('.viz', root), $('#scn10', root), [
      { meta: clk('15 phút') + dz('3 mIU/ph · VII giọt'), vis: ctg({ freq: 1, dur: 22 }),
        q: 'Mới 15 phút, cơn co còn thưa. Điều dưỡng hỏi: “Tăng giọt luôn hả?”',
        opts: [['⏩ Tăng ngay lên XII giọt', false, 'Chưa đủ 30 phút! Tăng nhiều hơn 1 lần/30 phút ⇒ cơn co cường tính.'],
          ['⏳ Chờ đủ 30 phút rồi đánh giá', true, 'Đúng: không vội tăng liều, cả về thời gian lẫn tốc độ.']] },
      { meta: clk('30 phút') + dz('3 mIU/ph'), vis: ctg({ freq: 1, dur: 26 }),
        q: 'Vẫn 1 cơn/10 phút, mỗi cơn ~25 giây. Làm gì?',
        opts: [['✖2 Tăng gấp đôi liều', false, 'Biên độ mỗi lần chỉ 1,5 – 2,5 mIU.'],
          ['➡️ Giữ nguyên', false, 'Chưa đạt 3 cơn/10′, mỗi cơn 40″ ⇒ cần tăng.'],
          ['➕ Tăng 1,5 – 2,5 mIU/ph', true, 'Chuẩn! VD 3 → 5 mIU/ph (X giọt).']] },
      { meta: clk('2 giờ') + dz('9 mIU/ph · XVIII giọt'), vis: ctg({ freq: 3, dur: 40 }),
        q: '3 cơn/10 phút, mỗi cơn 40 giây, tim thai bình thường.',
        opts: [['⬆️ Tăng tiếp cho nhanh', false, 'Không vượt quá 3 – 4 cơn/10 phút. Đạt rồi thì giữ!'],
          ['➡️ Duy trì tới khi sanh', true, 'Đạt mục tiêu ⇒ giữ ổn định tới khi sanh.'],
          ['⛔ Ngưng vì đã chuyển dạ', false, 'Bài giảng: duy trì tốc độ này tới khi sanh.']] },
      { meta: clk('3 giờ') + dz('9 mIU/ph'), vis: ctg({ freq: 5, dur: 70, decel: true, base: 128 }),
        q: 'Đột ngột: 5 cơn/10 phút, mỗi cơn ~70 giây, tim thai tụt dưới 100.',
        opts: [['½ Giảm một nửa số giọt', false, 'Nửa vời! Phải CẮT HẲN oxytocin.'],
          ['💊 Salbutamol ngay', false, 'Giảm co chỉ khi đã ngưng oxytocin mà vẫn cường tính và đã loại nguyên nhân thực thể.'],
          ['⛔ Cắt hẳn oxytocin, tìm nguyên nhân thực thể', true, 't½ 5 phút ⇒ nếu do oxytocin sẽ hết sau vài phút (Trạm 16).']] },
    ]);
  },
},

/* ================= 11. HAI VẠCH DỪNG ================= */
{
  slug: 'khoi-phat-that-bai', part: 3, icon: '🛑', title: 'Hai vạch dừng',
  lead: 'Biết lúc nào dừng cũng là kỹ năng.',
  html: () => {
    const P = v => { const a = v / 32 * Math.PI; return [(150 - 110 * Math.cos(a)).toFixed(1), (150 - 110 * Math.sin(a)).toFixed(1)]; };
    const arc = (a, b, c) => { const [x1, y1] = P(a), [x2, y2] = P(b); return `<path d="M${x1} ${y1} A110 110 0 0 1 ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="22"/>`; };
    const tk = v => { const a = v / 32 * Math.PI; return `<text x="${(150 - 140 * Math.cos(a)).toFixed(1)}" y="${(156 - 140 * Math.sin(a)).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="900">${v}</text>`; };
    return scene(`<div class="fig"><svg viewBox="0 0 440 200" role="img" aria-label="Chai oxytocin 5 IU và đồng hồ tốc độ truyền">
        <g transform="translate(0 10)"><rect x="20" y="10" width="80" height="160" rx="16" fill="#fff" stroke="${INK}" stroke-width="4"/>
          <rect id="bLvl" x="25" y="30" width="70" height="135" rx="10" fill="#ffc2d4" style="transition:all 1.4s ease"/>
          <text x="60" y="90" text-anchor="middle" font-size="16" font-weight="900" fill="${INK}">5 IU</text><text x="60" y="108" text-anchor="middle" font-size="11" font-weight="800" fill="${INK}">= 5.000 mIU</text>
          <path d="M60 -6 v16" stroke="${INK}" stroke-width="4"/></g>
        <g transform="translate(130 20)">
          ${arc(0, 12, '#cdeedd')}${arc(12, 20, '#fff1b8')}${arc(20, 32, '#ffd3e0')}
          <path d="M40 150 A110 110 0 0 1 260 150" fill="none" stroke="${INK}" stroke-width="3"/>
          ${tk(0)}${tk(12)}${tk(20)}${tk(32)}
          <g class="gauge-needle" id="gNeedle" style="transform:rotate(${12 / 32 * 180}deg)"><line x1="150" y1="150" x2="62" y2="150" stroke="#e0568a" stroke-width="6" stroke-linecap="round"/></g>
          <circle cx="150" cy="150" r="12" fill="#fff1b8" stroke="${INK}" stroke-width="3"/>
          <text x="150" y="128" text-anchor="middle" font-size="12" font-weight="800" fill="#6f6684">mIU/phút</text>
        </g>
      </svg></div>`,
    `<div class="seg">
        <button class="btn btn-sky" type="button" id="stopA">🍶 Hết chai 5 IU, chưa có cơn co</button>
        <button class="btn btn-pink" type="button" id="stopB">🏁 Chạm 32 mIU/ph, vẫn không chuyển dạ</button>
      </div>
      <p class="hot-out" id="stopOut">👆 Thử từng tình huống.</p>`);
  },
  how: ['Bấm <b>🍶 hết chai</b> / <b>🏁 chạm 32</b>', 'Xem chai cạn hoặc kim vọt vạch đỏ', 'Bấm ô ①②③ ôn lại'],
  notes: [
    [1, 'Truyền hết <b>5 IU (5.000 mIU)</b> chưa có cơn co ⇒ <b>tạm ngưng, làm lại hôm sau</b>', { at: [60, 100, 58], act: b => $('#stopA', b).click() }],
    [2, '<b>20 mIU/ph</b> đã rất cao ⇒ cân nhắc kỹ, có thể <b>tăng nồng độ</b> (giảm dịch, dễ chỉnh)', { at: [322, 68, 28], more: 'Nồng độ cao <b>cấm</b> ở đa sản & sẹo mổ cũ (Trạm 17).' }],
    [3, 'Tới <b>32 mIU/ph</b> vẫn không chuyển dạ ⇒ <b>khởi phát thất bại</b>', { at: [390, 160, 30], act: b => $('#stopB', b).click(), more: 'Vài phác đồ thử cao hơn nhưng <b>không có bằng chứng</b> tăng thêm giúp thành công.' }],
  ],
  mount(root) {
    const out = $('#stopOut', root), lvl = $('#bLvl', root), nd = $('#gNeedle', root);
    $('#stopA', root).onclick = () => { lvl.setAttribute('y', 162); lvl.setAttribute('height', 3); nd.style.transform = `rotate(${12 / 32 * 180}deg)`; out.innerHTML = '🍶 Hết 5.000 mIU ⇒ <b>tạm ngưng, mai làm lại</b>.'; Sfx.play('drip'); };
    $('#stopB', root).onclick = () => { lvl.setAttribute('y', 30); lvl.setAttribute('height', 135); nd.style.transform = 'rotate(180deg)'; out.innerHTML = '🏁 32 mIU/ph ⇒ <b>khởi phát thất bại</b> — không tăng thêm.'; Sfx.play('buzz'); };
  },
},

/* ================= 12. CANH CHỪNG ================= */
{
  slug: 'theo-doi-san-phu', part: 3, icon: '👀', title: 'Canh chừng sản phụ',
  lead: 'Chạm từng điểm trên giường sanh.',
  html: () => scene(`<div class="fig"><svg viewBox="0 0 520 290" role="img" aria-label="Sản phụ nằm nghiêng trái đang truyền oxytocin, có monitor sản khoa">
        <line x1="48" y1="18" x2="48" y2="262" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M30 24 h36" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <rect x="32" y="32" width="32" height="48" rx="8" fill="#ffc2d4" stroke="${INK}" stroke-width="3"/>
        <path d="M48 80 C48 140 120 150 168 182" fill="none" stroke="${INK}" stroke-width="2.5"/>
        <rect x="80" y="214" width="380" height="30" rx="10" fill="#cfe6fb" stroke="${INK}" stroke-width="4"/>
        <path d="M100 244 v30 M440 244 v30" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="128" cy="204" rx="44" ry="14" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <g ${tip('Tư thế: nằm nghiêng TRÁI|Đảm bảo sản phụ nằm nghiêng trái — giải phóng tĩnh mạch chủ dưới khỏi sức đè của tử cung, cải thiện tưới máu nhau.', 'tu')}>
          <path d="M156 178 C200 150 236 120 292 128 C344 136 366 168 358 210 L162 212 Z" fill="#ffd3e0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
          <path d="M350 176 C390 172 424 180 446 198 L446 212 L352 212 Z" fill="#ffd3e0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
          <circle cx="132" cy="176" r="26" fill="#ffe0c2" stroke="${INK}" stroke-width="4"/>
          <path d="M108 168 C110 146 150 140 158 164 C146 156 126 156 108 168Z" fill="${INK}"/>
          <path d="M122 180 q5 4 10 0 M138 180 q5 4 10 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          ${ping(300, 150, 14)}
        </g>
        <text x="300" y="236" text-anchor="middle" font-size="13" font-weight="900" fill="${INK}">↺ nghiêng TRÁI</text>
        <g ${tip('Mạch & huyết áp|Theo dõi mạch, huyết áp trong suốt quá trình khởi phát chuyển dạ.', 'ha')}><rect x="164" y="168" width="42" height="32" fill="transparent"/><rect x="172" y="176" width="26" height="16" rx="4" fill="#b2f2bb" stroke="${INK}" stroke-width="3"/>${ping(185, 184)}</g>
        <g ${tip('Monitor sản khoa (EFM/CTG)|Cơn gò tử cung và tim thai phải được theo dõi chặt chẽ, bằng monitor sản khoa nếu được.', 'ctg')}>
          <path d="M250 136 C270 128 300 128 318 136" stroke="#74c0fc" stroke-width="7" fill="none" stroke-linecap="round"/>
          <rect x="372" y="20" width="136" height="96" rx="12" fill="${INK}" stroke="${INK}" stroke-width="3"/>
          <path class="flow" d="M382 50 h20 l6 -10 l6 18 l6 -8 h20 l6 -10 l6 18 l6 -8 h30" stroke="#ff8fa3" stroke-width="3" fill="none"/>
          <path d="M382 98 q20 0 30 -22 q10 22 30 22 q20 0 30 -22 q10 22 26 22" stroke="#b2f2bb" stroke-width="3" fill="none"/>
          <text x="498" y="40" text-anchor="end" font-size="16" font-weight="900" fill="#fff1b8">140</text>
          <path d="M318 136 C350 120 360 90 372 80" stroke="${INK}" stroke-width="2" fill="none"/>
          ${ping(440, 68, 16)}
        </g>
        <g ${tip('Sản đồ — mỗi 30 phút|Khám & ghi: thời gian, tần số cơn co tử cung trong 10 phút; nhịp tim thai NGAY SAU cơn gò.', 'sd')}>
          <rect x="226" y="18" width="84" height="94" rx="8" fill="#fff1b8" stroke="${INK}" stroke-width="3"/><rect x="250" y="12" width="36" height="14" rx="4" fill="#e6e1ee" stroke="${INK}" stroke-width="2.5"/>
          <path d="M238 44 h60 M238 60 h60 M238 76 h44" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
          <text x="268" y="102" text-anchor="middle" font-size="12" font-weight="900">⏱ 30′</text>${ping(268, 60, 16)}
        </g>
        <g ${tip('Người theo dõi|Tuyệt đối KHÔNG được để sản phụ đang dùng oxytocin ở một mình mà không theo dõi.', 'ng')}><text x="478" y="200" text-anchor="middle" font-size="46">🧑‍⚕️</text>${ping(478, 186, 18)}</g>
        <g ${tip('Đường truyền oxytocin|Chỉ truyền tĩnh mạch thật chậm, bằng bơm tiêm điện hay nhỏ giọt; liều thấp nhất có hiệu quả.', 'iv')}><rect x="32" y="32" width="32" height="48" rx="8" fill="transparent"/>${ping(48, 56)}</g>
      </svg></div>`,
    `<div class="hot-out"></div>`, 'hot',
    [['tu', '🛏️ Sản phụ phải nằm tư thế nào? Chạm vào chị ấy.'], ['ctg', '📈 Theo dõi cơn gò & tim thai bằng máy nào?'], ['sd', '📝 Mỗi 30 phút ghi chép vào đâu?'], ['ha', '🩺 Dấu hiệu sinh tồn nào phải theo dõi? (chạm vòng bít HA)'], ['iv', '💧 Oxytocin vào người bằng đường nào?'], ['ng', '🙅 Điều TUYỆT ĐỐI không được làm là gì?']]),
  gate: true,
  how: ['Đọc 🎯 nhiệm vụ → chạm đúng chỗ trên giường sanh', 'Đúng → mở 1 ô', 'Xong 6 nhiệm vụ → <b>▶ Tự chạy</b> ôn'],
  notes: [
    [1, 'Sản phụ nằm <b>nghiêng TRÁI</b> — giải phóng tĩnh mạch chủ dưới', { at: [250, 175, 72] }],
    [2, '<b>Monitor sản khoa</b>: cơn gò + tim thai, theo dõi chặt', { at: [440, 68, 62], more: '🚨 <b>Giảm/ngưng ngay</b> nếu rối loạn cơn co ± tim thai bất thường (<b>&lt; 100 l/ph</b> hoặc nhịp giảm đe dọa trên EFM). Ngưng không hết ⇒ tìm <b>thực thể</b>; không thực thể ⇒ <b>giảm co</b>. 🔍 Đề cho <b>cường tính</b> ⇒ chọn <b>cắt hẳn</b> (Trạm 16).' }],
    [3, '<b>Sản đồ mỗi 30′</b>: số cơn co/10′ + tim thai <b>ngay sau cơn gò</b>', { at: [268, 62, 48], more: '🎯 Mục tiêu <b>3 cơn/10′ × 40″</b>, không quá <b>3–4 cơn/10′</b>.' }],
    [4, 'Theo dõi <b>mạch, huyết áp</b> suốt quá trình', { at: [185, 184, 22] }],
    [5, 'Oxytocin: <b>TTM thật chậm</b>, liều <b>thấp nhất</b> có hiệu quả', { at: [48, 56, 32] }],
    [6, '☠ <b>Không bao giờ</b> để sản phụ đang truyền oxytocin <b>ở một mình</b>', { at: [478, 186, 30] }],
  ],
},
);
