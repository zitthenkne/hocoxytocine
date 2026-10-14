/* zitthenk học Oxytocin — Trạm 13 → 25 */
'use strict';

/* Tử cung có vòng Bandl (trạm 15, 16) */
const bandlSVG = () => `<svg viewBox="0 0 280 300" role="img" aria-label="Hội chứng vượt trở ngại: vòng Bandl và dây chằng tròn căng">
  <g ${tip('Dây chằng tròn căng (dấu Frommel)|Hai dây chằng tròn căng cứng như dây đàn, sờ được — dấu hiệu của hội chứng vượt trở ngại (dọa vỡ tử cung).')}>
    <path d="M70 70 L14 150" stroke="#e76f95" stroke-width="6" stroke-linecap="round"/><path d="M210 70 L266 150" stroke="#e76f95" stroke-width="6" stroke-linecap="round"/>${ping(30, 128)}</g>
  <g ${tip('Thân tử cung co cứng|Phần thân dày lên, co liên tục để “đẩy” thai qua chỗ cản trở.')}>
    <path d="M60 80 C56 24 224 24 220 80 C222 110 214 128 204 140 L76 140 C66 128 58 110 60 80Z" fill="#ff8fa3" stroke="${INK}" stroke-width="4"/></g>
  <g ${tip('Vòng Bandl|Vòng thắt giữa thân và đoạn dưới, bị kéo lên cao (có khi ngang rốn) — hình “quả bầu nậm”. Dấu hiệu dọa vỡ tử cung!')}>
    <path d="M76 140 C110 160 170 160 204 140" fill="none" stroke="#e0568a" stroke-width="7" stroke-linecap="round"/>${ping(140, 152)}</g>
  <g ${tip('Đoạn dưới giãn mỏng|Đoạn dưới bị kéo dài, mỏng dần, ấn đau — chỗ sắp vỡ.')}>
    <path d="M76 140 C52 180 62 236 104 258 L176 258 C218 236 228 180 204 140 C170 160 110 160 76 140Z" fill="#ffd3e0" stroke="${INK}" stroke-width="2.5" stroke-dasharray="6 5"/></g>
  <g ${tip('Đầu thai kẹt (bất xứng đầu chậu)|Cản trở cơ học: đầu không lọt được dù cơn co mạnh — nguyên nhân thực thể thường gặp nhất của cơn co cường tính.')}>
    <circle cx="140" cy="214" r="36" fill="#ffe0c2" stroke="${INK}" stroke-width="4"/><path d="M124 210 q4 4 8 0 M148 210 q4 4 8 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M132 228 q8 -6 16 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <path d="M96 262 C110 290 170 290 184 262" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <text x="140" y="60" text-anchor="middle" font-size="13" font-weight="900" fill="${INK}">thân TC</text>
  <text x="232" y="190" font-size="12" font-weight="900" fill="#e0568a">vòng</text><text x="232" y="204" font-size="12" font-weight="900" fill="#e0568a">Bandl</text>
</svg>`;

/* Lâm sàng minh họa: liều → cơn co (1 sản phụ giả định) */
const tachy = d => d <= 2 ? [1, 25] : d <= 6 ? [2, 30] : d <= 14 ? [3, 40] : d <= 18 ? [4, 50] : d <= 24 ? [5, 65] : [6, 80];

/* Bảng so sánh khởi phát vs tăng co (trạm 14) */
const DUEL = [
  ['🎯 Mục đích', 'Tạo chuyển dạ khi <b>chưa có</b>', 'Chỉnh cơn co <b>tự nhiên</b> đã có'],
  ['🧴 Khởi đầu nhỏ giọt', '<b>VII giọt ≈ 3 mIU/ph</b>', '<b>VIII giọt = 4 mIU/ph</b>'],
  ['🔌 Khởi đầu bơm tiêm', '<b>2 – 2,5 mIU/ph</b>', '<b>5 IU + 49 mL · 2,4 mL/h</b>'],
  ['➕ Mỗi lần tăng', '<b>+1,5 – 2,5 mIU</b>', '<b>+4 mIU/ph</b>'],
  ['⏱ Nhịp chỉnh / đánh giá', 'Tăng cách nhau <b>≥ 30 phút</b>', 'Đánh giá <b>mỗi 15 – 20 phút</b>'],
  ['🚧 Mốc trần', '20 rất cao · <b>32 = thất bại</b>', '<b>20 mIU/ph = tối đa</b>'],
  ['📝 Sản đồ', 'Cơn co + tim thai <b>mỗi 30′</b>', 'Cơn co, CTC, ngôi <b>mỗi 1–2 giờ</b>'],
  ['🛑 Khi bí', 'Hết 5 IU ⇒ <b>mai làm lại</b>', 'Vượt max ⇒ <b>tăng nồng độ, chỉnh lại từ đầu</b>'],
];

TRAM.push(
/* ================= 13. TĂNG CO ================= */
{
  slug: 'tang-co', part: 4, icon: '🚀', title: 'Tăng co: leo từng bậc +4',
  lead: 'Chỉ oxytocin · chỉ truyền TM chậm · tối đa 20 mIU/ph.',
  html: () => {
    const Y = { 4: 250, 8: 200, 12: 150, 16: 100, 20: 50 };
    return scene(`<div class="fig"><svg viewBox="0 0 260 300" role="img" aria-label="Thang liều tăng co: mỗi bậc thêm 4 mIU/phút, tối đa 20">
        <path d="M86 20 V292 M174 20 V292" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        ${Object.entries(Y).map(([d, y]) => `<path d="M86 ${y} H174" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><text x="72" y="${y + 6}" text-anchor="end" font-size="17" font-weight="900" fill="${INK}">${d}</text><text x="186" y="${y + 5}" font-size="12" font-weight="800" fill="#6f6684">${roman(d * 2)} giọt</text>`).join('')}
        <g transform="translate(130 22)"><polygon points="-14,-14 -6,-20 6,-20 14,-14 14,-2 6,4 -6,4 -14,-2" fill="#ff8fb8" stroke="${INK}" stroke-width="3" transform="scale(1.2)"/><text y="-4" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">MAX</text></g>
        <g id="climber" style="transition:transform .7s cubic-bezier(.34,1.56,.64,1)"><g transform="translate(130 222)"><path d="M0 -26 C0 -26 -18 -2 -18 10 a18 18 0 0 0 36 0 C18 -2 0 -26 0 -26Z" fill="#ffb3c6" stroke="${INK}" stroke-width="3.5"/><circle cx="-6" cy="8" r="3" fill="${INK}"/><circle cx="6" cy="8" r="3" fill="${INK}"/><path d="M-4 16 q4 4 8 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></g>
        <text x="20" y="292" font-size="11" font-weight="800" fill="#6f6684">mIU/ph</text>
      </svg></div>`,
    `<div class="seg">
        <button class="btn btn-pink" type="button" id="up">⬆️ Chưa hiệu quả → +1 bậc</button>
        <button class="btn btn-mint" type="button" id="keep">✅ Đã hiệu quả</button>
        <button class="btn" type="button" id="rst" style="flex:0 0 auto">↺</button>
      </div>
      <p class="hot-out" id="ladOut">Bắt đầu ở <b>4 mIU/phút</b>. Chỉ tăng <b>khi và chỉ khi</b> cơn co chưa hiệu quả.</p>`);
  },
  how: ['Bấm <b>⬆️ +1 bậc</b> — giọt nước leo thang', 'Tới MAX thử bấm thêm', '<b>✅ Đã hiệu quả</b> thì làm gì?'],
  notes: [
    [1, 'Khởi đầu <b>4 mIU/ph</b> = <b>VIII giọt</b> (5 IU/500 mL G5%) · bơm tiêm <b>5 IU + 49 mL, 2,4 mL/h</b>', { at: [130, 250, 42], more: 'Chỉnh giọt <i>trước khi</i> pha oxytocin vào chai. Bơm tiêm ưu điểm: <b>giảm thể tích dịch</b> + <b>kiểm soát tốc độ</b> tốt.' }],
    [2, 'Mỗi <b>15–20′</b> đánh giá; chưa hiệu quả mới <b>+4 mIU/ph</b>', { at: [130, 175, 52], more: 'Hiệu quả = đặc tính cơn co + <b>xóa mở CTC</b> + <b>diễn tiến ngôi</b>. Ghi sản đồ <b>mỗi 1–2 giờ</b>. Đạt rồi ⇒ giữ <b>mức thấp nhất</b> vừa đủ.' }],
    [3, '<b>Tối đa 20 mIU/ph</b> · vượt ⇒ <b>tăng nồng độ</b> trong chai, <b>chỉnh lại tốc độ từ đầu</b>', { at: [130, 36, 36] }],
    ['☠', 'Tăng co: <b>chỉ oxytocin</b> (không oxytocics khác) · <b>chỉ TTM chậm</b> (không đường khác)', { more: '<b>Tăng co</b> = điều chỉnh cơn co <b>tự nhiên</b> đã có cho đạt cường độ, biên độ, tần số hợp với giai đoạn chuyển dạ.' }],
  ],
  mount(root) {
    const Y = { 4: 250, 8: 200, 12: 150, 16: 100, 20: 50 }; let d = 4;
    const cl = $('#climber', root), out = $('#ladOut', root);
    const put = () => { cl.style.transform = `translateY(${Y[d] - 250}px)`; };
    $('#up', root).onclick = () => {
      if (d >= 20) { shake(cl.closest('.fig')); Sfx.play('buzz'); out.innerHTML = '⛔ <b>Max 20 mIU/ph.</b> Muốn hơn: cân nhắc kỹ → tăng nồng độ, chỉnh lại từ đầu.'; return; }
      d += 4; put(); Sfx.play('pop');
      out.innerHTML = `⬆️ <b>${d} mIU/ph</b> (${roman(d * 2)} giọt). Đánh giá lại sau <b>15 – 20 phút</b>.${d === 20 ? ' <b>Chạm trần!</b>' : ''}`;
    };
    $('#keep', root).onclick = () => { Sfx.play('chime'); out.innerHTML = `✅ Giữ <b>${d} mIU/ph</b> — mức <b>thấp nhất</b> vừa đủ.`; };
    $('#rst', root).onclick = () => { d = 4; put(); Sfx.play('pop'); out.innerHTML = 'Bắt đầu ở <b>4 mIU/phút</b>.'; };
    put();
  },
},

/* ================= 14. KHỞI PHÁT vs TĂNG CO ================= */
{
  slug: 'khoi-phat-vs-tang-co', part: 4, icon: '👯', title: 'Khởi phát vs tăng co',
  lead: 'Giống nhau 80% — đề thi nằm ở 20% còn lại. Chạm ô ❓ để lật.',
  html: () => scene(`${vtabs(['duel', '👯 Từng cặp'], ['bang', '📋 Cả bảng'])}<div class="duel pane on" data-pane="duel">
      <div class="duel-h" id="duelH"></div>
      <div class="duel-row">
        <div class="duel-card c-butter"><h4>🧨 Khởi phát</h4><span class="rv" id="duelA" tabindex="0" role="button"></span></div>
        <div class="duel-card c-mint"><h4>🚀 Tăng co</h4><span class="rv" id="duelB" tabindex="0" role="button"></span></div>
      </div>
      <div class="dots" id="duelDots">${DUEL.map(() => '<i></i>').join('')}</div>
    </div>
    <div class="pane tbl" data-pane="bang"><table><tr><th></th><th>🧨 Khởi phát</th><th>🚀 Tăng co</th></tr>${DUEL.map(([h, a, b]) => `<tr><th>${h}</th><td>${a}</td><td>${b}</td></tr>`).join('')}</table></div>`,
    `<div class="seg"><button class="btn btn-lav" type="button" id="dPrev">◀ Cặp trước</button><button class="btn btn-go" type="button" id="dNext">Cặp sau ▶</button></div>
    <button class="btn" type="button" id="dFlip">👀 Lật cả 2 ô</button>`),
  how: ['Đoán trong đầu 2 ô ❓', 'Chạm ô ❓ để lật', '<b>Cặp sau ▶</b> đủ 8 cặp · <b>📋 Cả bảng</b> ôn'],
  coach: '.duel-row',
  notes: [
    ['🧠', 'Mã số: 🧨 <b>Khởi phát = 3 · 2 · 30 · 32</b> · 🚀 <b>Tăng co = 4 · 4 · 20</b>', { more: 'Khởi phát: khởi 3 mIU, mỗi lần +~2, cách 30 phút, 32 là vạch thất bại. Tăng co: khởi 4 mIU, mỗi lần +4, trần 20.' }],
    ['🔑', 'Điểm chung: <b>TM chậm</b> · chai <b>5 IU/500 mL G5%</b> · <b>liều thấp nhất</b> · rối loạn ⇒ <b>cắt hẳn</b>'],
  ],
  mount(root) {
    let i = 0;
    const A = $('#duelA', root), B = $('#duelB', root), dots = $$('#duelDots i', root);
    const show = () => {
      const [h, a, b] = DUEL[i];
      $('#duelH', root).innerHTML = `${h} <span class="mut small">(${i + 1}/${DUEL.length})</span>`;
      A.innerHTML = a; B.innerHTML = b; A.classList.remove('on'); B.classList.remove('on');
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    };
    $('#dPrev', root).onclick = () => { i = (i + DUEL.length - 1) % DUEL.length; show(); Sfx.play('pop'); };
    $('#dNext', root).onclick = () => { i = (i + 1) % DUEL.length; show(); Sfx.play('pop'); };
    $('#dFlip', root).onclick = () => { A.classList.add('on'); B.classList.add('on'); Sfx.play('peel'); };
    show();
  },
},

/* ================= 15. CƠN CO CƯỜNG TÍNH ================= */
{
  slug: 'con-co-cuong-tinh', part: 5, icon: '🚨', title: 'Còi báo động: cơn co cường tính',
  lead: 'Kéo liều lên — xem băng CTG “nổi giận”.',
  html: () => scene(`${vtabs(['ctg', '📈 Băng CTG'], ['bandl', '🔎 Vòng Bandl'])}<div class="pane on" data-pane="ctg" id="tdCtg" style="flex-direction:column;justify-content:center"></div>
    <div class="fig pane hot hot-pane" data-pane="bandl">${bandlSVG()}<p class="hot-out">👆 Chạm từng phần của tử cung.</p></div>`,
    `<div class="row" style="justify-content:space-between;flex-wrap:nowrap">
        <span class="hand" style="font-size:22px">💧 <b id="tdDose">12</b> mIU/phút</span>
        <svg viewBox="0 0 60 60" width="50" height="50" aria-label="Đèn báo"><circle class="alarm" id="lamp" cx="30" cy="30" r="22" fill="#cdeedd" stroke="${INK}" stroke-width="3"/><text x="30" y="37" text-anchor="middle" font-size="20">🚨</text></svg>
      </div>
      <input type="range" id="td" min="0" max="32" step="1" value="12" aria-label="Liều oxytocin minh họa" style="margin:4px 0 0">
      <p class="hot-out" id="tdOut"></p>`),
  how: ['Kéo thanh liều <b>0 → 32 mIU/ph</b>', 'CTG: cơn co dày, tim thai tụt → đèn 🚨', '<b>🔎 Vòng Bandl</b>: chạm từng phần'],
  coach: '#td',
  notes: [
    ['🚨', 'Cường tính = cơn <b>&gt; 60″</b> hoặc <b>&gt; 4 cơn/10′</b>', { more: `${X} ACOG: tachysystole = <b>&gt; 5 cơn/10′</b> trung bình trong 30′. Thi trường mình dùng ngưỡng bài giảng.` }],
    ['☠', 'Biến chứng nặng: <b>suy thai · cường tính · vỡ tử cung</b>'],
    [1, 'Trước hết tìm <b>thực thể</b>: <b>bất xứng đầu chậu</b>, <b>vượt trở ngại</b> ⇒ có ⇒ <b>chấm dứt chuyển dạ ngay</b>', { fig: '[data-pane=bandl] svg', at: [140, 214, 42] }],
    [2, 'Dọa vỡ TC: <b>vòng Bandl</b> lên cao (bầu nậm) + <b>dây chằng tròn căng</b> (Frommel)', { fig: '[data-pane=bandl] svg', at: [[140, 150, 44], [42, 110, 24], [238, 110, 24]] }],
    ['⚖️', 'Chỉ quy cho oxytocin <b>sau khi đã loại</b> nguyên nhân thực thể'],
  ],
  mount(root) {
    const r = $('#td', root), box = $('#tdCtg', root), out = $('#tdOut', root), lamp = $('#lamp', root);
    let lastBad = false;
    const upd = () => {
      const d = +r.value, [f, s] = tachy(d), bad = f > 4 || s > 60;
      $('#tdDose', root).textContent = d;
      box.innerHTML = ctg({ freq: f, dur: s, decel: f >= 5, base: f >= 5 ? 132 : 140 });
      lamp.classList.toggle('on', bad);
      out.innerHTML = `<b>${f} cơn/10′</b>, mỗi cơn ~<b>${s}″</b> — ` + (bad ? '🚨 <b>CƯỜNG TÍNH</b>, tim thai giảm muộn!' : f === 3 ? '🎯 đúng mục tiêu.' : f === 4 ? '⚠️ chạm ngưỡng 3–4 cơn.' : '🐢 còn thưa.');
      if (bad && !lastBad) Sfx.play('buzz'); lastBad = bad;
    };
    r.oninput = upd; upd();
  },
},

/* ================= 16. XỬ TRÍ 4 BƯỚC ================= */
{
  slug: 'xu-tri-roi-loan-con-co', part: 5, icon: '🧯', title: 'Xử trí rối loạn cơn co',
  lead: 'Chọn đúng từng bước — không nửa vời.',
  html: () => scene('', `<div class="scn-box" id="scn16"></div>`),
  gate: true,
  how: ['Đọc hình + tình huống', 'Chọn bước xử trí — sai thì đọc lý do', '5 tình huống = 5 bước lưu đồ (mở dần ①–⑤)'],
  notes: [
    [1, 'Cường tính + EFM đe dọa ⇒ <b>bắt buộc loại bất xứng đầu chậu / vượt trở ngại</b>'],
    [2, 'Có nguyên nhân thực thể ⇒ <b>chấm dứt chuyển dạ ngay</b>'],
    [3, 'Không thực thể ⇒ <b>cắt hẳn oxytocin</b>, chờ vài phút — <b>không giảm nửa vời</b>'],
    [4, 'Ngưng vẫn cường tính ⇒ giảm co: <b>Salbutamol 10 mg/1000 mL</b> NaCl 0,9% / Lactated Ringer’s, <b>X giọt/ph</b>', { more: '🔍 10 mg/1000 mL = 10 µg/mL; X giọt/ph = 0,5 mL/ph ⇒ <b>≈ 5 µg/ph</b>. Đồng vận β₂ ⇒ giãn cơ tử cung (chú ý mạch nhanh mẹ).' }],
    [5, 'Hồi phục ⇒ tăng co lại <b>bắt đầu TỪ ĐẦU</b> + monitoring nghiêm ngặt'],
  ],
  mount(root) {
    scenario($('.viz', root), $('#scn16', root), [
      { meta: dz('16 mIU/ph · đang tăng co'), vis: ctg({ freq: 5, dur: 65, decel: true, base: 132 }),
        q: '5 cơn/10′, mỗi cơn 65″, nhịp giảm đe dọa. Nghĩ tới gì ĐẦU TIÊN?',
        opts: [['🧪 Kết luận ngay do oxytocin', false, 'Chỉ kết luận do oxytocin SAU KHI đã loại nguyên nhân thực thể.'],
          ['🔍 Loại trừ bất xứng đầu chậu / vượt trở ngại', true, 'Đúng! Tăng co + cường tính + EFM đe dọa ⇒ BẮT BUỘC nghĩ tới bất xứng.'],
          ['⬆️ Tăng thêm cho sanh nhanh', false, 'Thảm họa! Nguy cơ vỡ tử cung, suy thai.']] },
      { meta: '<span class="tag">🩺 Khám</span>', vis: `<div class="fig" style="max-height:100%">${bandlSVG()}</div>`,
        q: 'Vòng Bandl lên cao, dây chằng tròn căng, đoạn dưới ấn đau. Xử trí?',
        opts: [['⏸️ Ngưng oxytocin, chờ sanh thường', false, 'Cản trở cơ học vẫn còn — chờ là vỡ tử cung.'],
          ['💊 Giảm co rồi tăng co lại', false, 'Có nguyên nhân thực thể thì không “chữa cháy” kiểu này.'],
          ['⛔ Chấm dứt ngay chuyển dạ (mổ)', true, 'Có nguyên nhân thực thể ⇒ buộc chấm dứt chuyển dạ ngay.']] },
      { meta: '<span class="tag">👩 Ca khác</span>', vis: ctg({ freq: 6, dur: 75, decel: true, base: 134 }),
        q: 'Cường tính, KHÔNG bất xứng, KHÔNG vượt trở ngại. Với oxytocin?',
        opts: [['½ Giảm còn một nửa', false, 'Không xử trí nửa vời!'],
          ['⛔ Cắt hẳn và chờ đáp ứng', true, 'Nếu do oxytocin, cường tính hết sau vài phút (t½ ~5 phút).']] },
      { meta: clk('ngưng 15 phút'), vis: ctg({ freq: 5, dur: 70, decel: true, base: 134 }),
        q: 'Đã ngưng mà vẫn cường tính; đã loại nguyên nhân thực thể.',
        opts: [['⏳ Chờ thêm 2 giờ', false, 'Thai đang thiếu oxy — không chờ suông.'],
          ['💉 Tiêm ergometrine', false, 'Ergometrine gây co cứng kéo dài — ngược mục tiêu, cấm khi còn thai!'],
          ['💧 Salbutamol 10 mg/1000 mL, X giọt/ph', true, 'Chuẩn liều bài giảng (NaCl 0,9% hoặc Lactated Ringer’s).']] },
      { meta: clk('sau giảm co'), vis: ctg({ freq: 2, dur: 35 }),
        q: 'Cơn co hồi phục nhanh, cần tăng co lại.',
        opts: [['▶️ Truyền lại tốc độ cũ', false, 'Tăng co lại phải bắt đầu lại từ đầu.'],
          ['🔁 Bắt đầu lại TỪ ĐẦU + monitoring', true, 'Đúng: làm lại từ liều khởi đầu, theo dõi nghiêm ngặt.']] },
    ]);
  },
},

/* ================= 17. SẸO MỔ & ĐA SẢN ================= */
{
  slug: 'vo-tu-cung', part: 5, icon: '🩹', title: 'Vết sẹo & tử cung đa sản',
  lead: 'Chọn sản phụ → chọn chai. Xem chuyện gì xảy ra!',
  html: () => scene(`<div class="fig" id="utFig"><svg viewBox="0 0 220 210" role="img" aria-label="Tử cung có sẹo mổ hoặc thành mỏng">
        <g class="ut-body"><path d="${UT}" transform="translate(10 6)" fill="#ffd3e0" stroke="${INK}" stroke-width="5"/>
          <path id="thin" d="${UT}" transform="translate(10 6) translate(100 100) scale(.86) translate(-100 -100)" fill="#fff4f7" stroke="#e76f95" stroke-width="2" opacity="0"/>
          <g id="scar" opacity="0"><path d="M64 140 Q110 154 156 140" fill="none" stroke="#e0568a" stroke-width="4"/>${[72, 88, 104, 120, 136, 150].map(x => `<path d="M${x} 138 v10" stroke="#e0568a" stroke-width="2.5"/>`).join('')}</g>
          <path class="crack" d="M110 146 L100 160 L116 168 L104 182 L118 194" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
        <text id="utLbl" x="110" y="80" text-anchor="middle" font-size="14" font-weight="900" fill="${INK}">tử cung lành</text>
      </svg></div>`,
    `<div class="seg" id="pt">
        <button class="btn on" type="button" data-p="cs">🌸 Con so</button>
        <button class="btn" type="button" data-p="ds">👶 Đa sản</button>
        <button class="btn" type="button" data-p="seo">✂️ Sẹo mổ</button>
      </div>
      <div class="seg" id="conc">
        <button class="btn btn-sky" type="button" data-c="5">🧴 5 IU/500 mL</button>
        <button class="btn btn-pink" type="button" data-c="10">⚠️ 10 IU/500 mL</button>
      </div>
      <p class="hot-out" id="concOut">👆 Chọn sản phụ rồi chọn cách pha.</p>`),
  how: ['Chọn sản phụ: <b>Con so / Đa sản / Sẹo mổ</b>', 'Chọn chai <b>5 IU</b> hay <b>10 IU</b>', 'Xem tử cung ra sao'],
  notes: [
    [1, '<b>Đa sản</b>: thành tử cung giãn mỏng ⇒ dễ <b>vỡ tử cung</b>', { at: [110, 100, 70], act: b => $('[data-p=ds]', b).click() }],
    [2, '<b>Sẹo mổ cũ</b> lấy thai ⇒ <b>nứt vết mổ</b> / vỡ', { at: [110, 146, 50], act: b => $('[data-p=seo]', b).click() }],
    ['⛔', 'Đa sản / sẹo mổ: <b>CẤM</b> pha <b>10 IU/500 mL</b> (20 mIU/mL)'],
    ['🔗', 'Sẹo mổ cũ còn là <b>CCĐ tuyệt đối của prostaglandin</b> (Trạm 21)'],
    ['✨', '2 biến chứng thầm lặng: <b>ngộ độc nước</b> · <b>tụt HA</b> khi tiêm TM nhanh', { more: `${X} Ngộ độc nước: liều cao (≥ 20 mIU/ph) + nhiều dịch không điện giải ⇒ hạ Na, co giật (Trạm 2). Tụt HA khi bolus do giãn mạch ⇒ WHO ghi CCĐ <b>tiêm TM trực tiếp</b> (Trạm 18).` }],
  ],
  mount(root) {
    let p = 'cs';
    const fig = $('#utFig', root), out = $('#concOut', root);
    const LBL = { cs: 'tử cung lành', ds: 'thành giãn mỏng', seo: 'sẹo mổ cũ' };
    $$('#pt .btn', root).forEach(b => b.onclick = () => {
      p = b.dataset.p; $$('#pt .btn', root).forEach(x => x.classList.toggle('on', x === b));
      fig.classList.remove('cracked'); $('#scar', root).setAttribute('opacity', p === 'seo' ? 1 : 0); $('#thin', root).setAttribute('opacity', p === 'ds' ? 1 : 0);
      $('#utLbl', root).textContent = LBL[p]; out.innerHTML = '👉 Giờ chọn cách pha.'; Sfx.play('pop');
    });
    $$('#conc .btn', root).forEach(b => b.onclick = () => {
      const hi = b.dataset.c === '10', risky = p !== 'cs';
      fig.classList.toggle('cracked', hi && risky);
      if (hi && risky) { Sfx.play('buzz'); out.innerHTML = `⛔ <b>TUYỆT ĐỐI CẤM!</b> ${p === 'seo' ? 'Sẹo mổ' : 'Đa sản'} + nồng độ cao ⇒ <b>vỡ tử cung</b>.`; }
      else if (hi) { Sfx.play('pop'); out.innerHTML = '⚠️ Con so: chỉ cân nhắc khi đã ~20 mIU/ph mà chưa đạt — để <b>giảm thể tích dịch</b>.'; }
      else if (risky) { Sfx.play('pop'); out.innerHTML = `⚠️ Được, nhưng <b>hết sức thận trọng</b>: ${p === 'seo' ? 'nứt vết mổ' : 'vỡ tử cung'}.`; }
      else { Sfx.play('chime'); out.innerHTML = '✅ Chuẩn: 5 IU/500 mL, liều thấp.'; }
    });
  },
},

/* ================= 18. BĂNG HUYẾT SAU SANH ================= */
{
  slug: 'bang-huyet-sau-sanh', part: 6, icon: '🩸', title: '3 “lính cứu hỏa” băng huyết',
  lead: 'Tử cung đã trống ⇒ liều cao hơn, nhiều đường hơn. Bấm 1 thuốc!',
  html: () => {
    const T = [
      ['ox', '💧 Oxytocin', 'c-pink', '<dl class="cheat-dl"><dt>Liều đầu</dt><dd>TTM <b>20 IU/1000 mL</b>, <b>60 giọt/ph</b> · hoặc <b>TB 10 IU</b></dd><dt>Tiếp theo</dt><dd>TTM 20 IU/1000 mL, <b>40 giọt/ph</b></dd><dt>Tối đa</dt><dd>≤ <b>3000 mL</b> dịch có oxytocin</dd><dt>CCĐ</dt><dd><b>Tiêm TM trực tiếp</b></dd></dl>'],
      ['er', '🪨 Ergometrine', 'c-butter', '<dl class="cheat-dl"><dt>Liều đầu</dt><dd>TB hay TM chậm <b>0,2 mg</b></dd><dt>Tiếp theo</dt><dd><b>0,2 mg TB sau 15′</b>; cần thì 0,2 mg <b>mỗi 4 giờ</b></dd><dt>Tối đa</dt><dd><b>5 liều</b> (1,0 mg)</dd><dt>CCĐ</dt><dd><b>TSG, THA, bệnh tim mạch</b></dd></dl>'],
      ['pg', '🧪 15-methyl PGF2α', 'c-peach', '<dl class="cheat-dl"><dt>Liều đầu</dt><dd><b>TB 0,25 mg</b></dd><dt>Tiếp theo</dt><dd>0,25 mg <b>mỗi 15 phút</b></dd><dt>Tối đa</dt><dd><b>8 liều</b> (2 mg)</dd><dt>CCĐ</dt><dd><b>Hen phế quản</b></dd></dl>'],
    ];
    return scene(`${vtabs(['ut', '🩸 Tử cung'], ['game', '🎮 Dán CCĐ'], ['photo', '📷 Bảng thầy'])}<div class="fig pane on bleed" data-pane="ut" id="pphFig"><svg viewBox="0 0 220 230" role="img" aria-label="Tử cung đờ đang chảy máu">
        <g class="ut-shrink"><path id="pphUt" d="${UT}" transform="translate(10 0)" fill="#ffd3e0" stroke="${INK}" stroke-width="5" style="transition:fill .6s"/>
          <circle cx="94" cy="70" r="6" fill="${INK}"/><circle cx="126" cy="70" r="6" fill="${INK}"/><path id="pphMouth" d="M98 96 q12 -8 24 0" stroke="${INK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
        <circle class="bdrop" cx="104" cy="194" r="7" fill="#f06a7a" stroke="${INK}" stroke-width="2"/><circle class="bdrop" cx="116" cy="194" r="6" fill="#f06a7a" stroke="${INK}" stroke-width="2"/><circle class="bdrop" cx="110" cy="196" r="5" fill="#f06a7a" stroke="${INK}" stroke-width="2"/>
        <text id="pphTxt" x="110" y="226" text-anchor="middle" font-size="14" font-weight="900" fill="#e0568a">Đờ tử cung — chảy máu!</text>
      </svg></div>
      <div class="pane" data-pane="game" style="flex-direction:column;justify-content:center"><div class="sort"><div class="pool no-swipe">
          <button class="card" type="button" data-bin="pg" data-why="PGF2α gây co thắt phế quản ⇒ CCĐ hen." data-hint="thuốc nào làm co thắt phế quản?">🫁 Hen phế quản</button>
          <button class="card" type="button" data-bin="er" data-why="Ergometrine co mạch ⇒ CCĐ tiền sản giật." data-hint="thuốc nào co mạch gây tăng huyết áp?">🤰 Tiền sản giật</button>
          <button class="card" type="button" data-bin="ox" data-why="WHO: oxytocin CCĐ tiêm TM trực tiếp (bolus) — tụt huyết áp." data-hint="chống chỉ định về đường dùng.">⚡ Tiêm TM trực tiếp</button>
          <button class="card" type="button" data-bin="er" data-why="Ergometrine: CCĐ bệnh tim mạch." data-hint="co mạch nặng gánh cho tim...">🫀 Bệnh tim mạch</button>
          <button class="card" type="button" data-bin="er" data-why="Ergometrine: CCĐ tăng huyết áp." data-hint="ai gây co mạch?">📈 Tăng huyết áp</button></div>
          <div class="bins"><div class="bin" role="button" tabindex="0" data-bin="ox" style="--c:var(--pink)"><h4>💧 Oxytocin</h4><div class="slot"></div></div>
          <div class="bin" role="button" tabindex="0" data-bin="er" style="--c:var(--butter)"><h4>🪨 Ergo</h4><div class="slot"></div></div>
          <div class="bin" role="button" tabindex="0" data-bin="pg" style="--c:var(--peach)"><h4>🧪 PGF2α</h4><div class="slot"></div></div></div>
          <p class="sort-msg">👆 Chống chỉ định này của thuốc nào? Bấm hộp.</p></div></div>
      ${photo('assets/bang1-who-bang-huyet.png', 'Bảng 1 bài giảng — khuyến cáo WHO điều trị băng huyết sau sanh')}`,
    `<div class="seg" id="pphTabs">${T.map(([k, n]) => `<button class="btn" type="button" data-t="${k}">${n}</button>`).join('')}</div>
      ${T.map(([k, n, c, body]) => `<div class="tabpanel box ${c}" data-p="${k}">${body}</div>`).join('')}
      <p class="hot-out" id="pphHint">👆 Chọn 1 “lính cứu hỏa” — xem liều đầu · tiếp theo · tối đa · CCĐ.</p>`);
  },
  how: ['Bấm 1 thuốc → tử cung co hồi + bảng liều', '<b>🎮 Dán CCĐ</b>: CCĐ của thuốc nào?', '<b>📷 Bảng thầy</b>: bảng WHO gốc'],
  notes: [
    ['🧮', 'Oxytocin 20 IU/1000 mL × <b>60 giọt/ph = 60 mIU/ph</b> — gấp 3 “trần” tăng co, được vì <b>buồng TC đã trống</b>', { more: '20 IU/1000 mL = 20 mIU/mL; 60 giọt = 3 mL/ph. Duy trì 40 giọt/ph = 40 mIU/ph.' }],
    ['☠', '15-methyl PGF2α co rất mạnh ⇒ chỉ <b>điều trị sau sanh</b>, <b>không dùng trước sanh</b>'],
    ['✨', '<b>Carbetocin 100 µg</b> TB/TM 1 liều — <b>dự phòng</b> BHSS, dạng bền nhiệt', { more: `${X} Đồng vận thụ thể oxytocin tác dụng kéo dài; WHO 2018 khuyến cáo dự phòng, nhất là nơi khó bảo quản lạnh. Không dùng khởi phát/tăng co.` }],
  ],
  mount(root) {
    const fig = $('#pphFig', root), ut = $('#pphUt', root), txt = $('#pphTxt', root), mo = $('#pphMouth', root);
    const NAME = { ox: 'Oxytocin', er: 'Ergometrine', pg: '15-methyl PGF2α' };
    $$('#pphTabs .btn', root).forEach(b => b.onclick = () => {
      const k = b.dataset.t;
      $$('#pphTabs .btn', root).forEach(x => x.classList.toggle('on', x === b));
      $$('.tabpanel', root).forEach(x => x.classList.toggle('on', x.dataset.p === k));
      fig.classList.remove('bleed'); fig.classList.add('firmed'); ut.style.fill = '#ff9fb8'; mo.setAttribute('d', 'M98 92 q12 10 24 0');
      txt.textContent = `${NAME[k]} ⇒ co hồi chắc ✔`; txt.setAttribute('fill', '#2b8a5e');
      $('#pphHint', root).hidden = true; Sfx.play('chime');
      if (!fig.classList.contains('on')) $('[data-show=ut]', root).click();
    });
  },
},

/* ================= 19. PROSTAGLANDINS ================= */
{
  slug: 'prostaglandins', part: 7, icon: '🏘️', title: 'Prostaglandins: hormone “hàng xóm”',
  lead: 'Không đi đường máu — tác động ngay tại chỗ. Chạm từng lớp!',
  html: () => scene(`<div class="fig"><svg viewBox="0 0 300 300" role="img" aria-label="Thiết đồ tử cung có thai: nguồn gốc các prostaglandin">
        <g ${tip('Cơ tử cung (myometrium)|Sản xuất chủ yếu là PROSTACYCLIN.', 'myo')}><ellipse cx="150" cy="128" rx="128" ry="116" fill="#ffe0c2" stroke="${INK}" stroke-width="4"/>${ping(40, 96)}</g>
        <g ${tip('Màng rụng mẹ (decidua)|NGUỒN GỐC CHÍNH của PGF2α. In-vivo, PGF2α từ màng rụng chủ yếu THÚC ĐẨY CƠN CO tử cung.', 'dec')}><ellipse cx="150" cy="128" rx="104" ry="94" fill="#ffd3e0" stroke="${INK}" stroke-width="3"/>${ping(70, 70)}</g>
        <g ${tip('Màng thai (nhất là màng ối)|Sản xuất PGE2. PGE2 có vẻ quan trọng cho sự CHÍN MUỒI CỔ TỬ CUNG.', 'mem')}><ellipse cx="150" cy="128" rx="88" ry="78" fill="#e3f2fd" stroke="#74c0fc" stroke-width="7"/>${ping(150, 52)}</g>
        <g ${tip('Thai (trưởng thành lẫn non tháng)|Gia tăng sinh tổng hợp PG nhóm E và F trong tử cung là một yếu tố chắc chắn của giai đoạn báo chuyển dạ.', 'fetus')}>
          <circle cx="150" cy="166" r="26" fill="#ffe0c2" stroke="${INK}" stroke-width="3"/><path d="M130 140 C120 110 160 90 186 112 C200 126 190 150 176 156" fill="#ffe0c2" stroke="${INK}" stroke-width="3"/>
          <path d="M142 164 q4 3 8 0 M156 164 q4 3 8 0" stroke="${INK}" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
        <g ${tip('Cổ tử cung|“Đích” của PGE2: làm mềm, xóa, chín muồi. Chế phẩm PGE2 ngoại sinh thúc chín muồi CTC mạnh hơn PGF2α nội sinh.', 'ctc')}><path d="M126 236 L174 236 L170 290 L130 290 Z" fill="#ffe0c2" stroke="${INK}" stroke-width="4"/><path d="M150 238 V288" stroke="#e0568a" stroke-width="4" stroke-dasharray="5 4"/>${ping(150, 262)}</g>
        <text x="250" y="26" text-anchor="middle" font-size="12" font-weight="900" fill="${INK}">cơ TC</text>
        <text x="150" y="232" text-anchor="middle" font-size="11" font-weight="800" fill="#6f6684">CTC</text>
      </svg></div>`,
    `<div class="hot-out"></div>`, 'hot',
    [['dec', '💪 Lớp nào là nguồn <b>chính</b> của PGF2α (thúc cơn co)?'], ['mem', '🌸 Lớp nào sản xuất <b>PGE2</b>?'], ['myo', '🧱 Lớp nào sản xuất chủ yếu <b>prostacyclin</b>?'], ['ctc', '🎯 PGE2 làm <b>chín muồi</b> ở đâu?'], ['fetus', '👶 ↑ PG nhóm E & F báo hiệu giai đoạn gì? Chạm vào bé.']]),
  gate: true,
  how: ['Đọc 🎯 nhiệm vụ → chạm đúng lớp', 'Đúng → mở 1 ô ghi nhớ', 'Xong 5 → mở thêm 2 ô tổng kết'],
  notes: [
    [1, '<b>Màng rụng mẹ</b> → <b>PGF2α</b> (nguồn chính) ⇒ thúc <b>cơn co</b>', { at: [70, 70, 28], more: 'In-vitro: F2α & E2 đều gây co. <b>In-vivo</b>: F2α ⇒ co · E2 ⇒ chín muồi.' }],
    [2, '<b>Màng thai</b> (nhất là màng ối) → <b>PGE2</b>', { at: [150, 52, 26] }],
    [3, '<b>Cơ tử cung</b> → chủ yếu <b>prostacyclin</b>', { at: [40, 96, 26] }],
    [4, 'PGE2 ⇒ <b>chín muồi cổ tử cung</b> (PGE2 ngoại sinh mạnh hơn PGF2α nội sinh)', { at: [150, 262, 32] }],
    [5, '↑ tổng hợp PG nhóm <b>E & F</b> = dấu chắc chắn của <b>giai đoạn báo chuyển dạ</b>', { at: [155, 150, 42] }],
    ['🏘️', '<b>Paracrine/autocrine</b>: tác động tại chỗ · tiền chất <b>acid arachidonic</b>', { more: `Sản khoa hay nhắc: PGE1, PGE2, PGF2α, prostacyclin. ${X} Phospholipid —(phospholipase A₂)→ acid arachidonic —(<b>COX</b>)→ PG ⇒ NSAID (indomethacin) giảm co.` }],
    ['📈', 'Đáp ứng với PG <b>không đổi</b> suốt thai kỳ ⇒ dùng <b>TCN II–III</b>', { more: '4 chỉ định: <b>chấm dứt thai kỳ</b> mọi tuổi thai · <b>khởi phát</b> · <b>dự phòng</b> & <b>điều trị BHSS</b>. Luôn chọn PG thích hợp. ☠ PGF2α <b>không dùng trước sanh</b>.' }],
  ],
},

/* ================= 20. PGE2 ================= */
{
  slug: 'pge2-dinoprostone-cervidil', part: 7, icon: '🧴', title: 'PGE2: Dinoprostone & Cervidil',
  lead: 'Chủ yếu để làm CHÍN MUỒI cổ tử cung. Thử 3 cách đặt.',
  html: () => scene(`<div class="fig" id="gelFig"><svg viewBox="0 0 300 300" role="img" aria-label="Vị trí đặt PGE2: túi cùng sau, kênh cổ tử cung">
        <rect x="104" y="160" width="92" height="140" rx="22" fill="#ffe0c2" stroke="${INK}" stroke-width="4"/>
        <path d="${UT}" transform="translate(50 -6)" fill="#ffd3e0" stroke="${INK}" stroke-width="5"/>
        <path d="M150 146 V178" stroke="#e0568a" stroke-width="4" stroke-dasharray="5 4"/>
        <text x="236" y="198" font-size="12" font-weight="900" fill="${INK}">túi cùng</text><text x="236" y="212" font-size="12" font-weight="900" fill="${INK}">sau</text>
        <path d="M232 200 L192 176" stroke="${INK}" stroke-width="1.5"/>
        <text x="30" y="160" font-size="12" font-weight="900" fill="${INK}">kênh CTC</text><path d="M86 156 L146 160" stroke="${INK}" stroke-width="1.5"/>
        <ellipse id="gelTC" class="gel" cx="182" cy="172" rx="10" ry="8" fill="#b2f2bb" stroke="${INK}" stroke-width="2.5"/>
        <ellipse id="gelK" class="gel" cx="150" cy="162" rx="5" ry="14" fill="#b2f2bb" stroke="${INK}" stroke-width="2.5" opacity="0"/>
        <g id="cervI" class="insert" opacity="0"><rect x="171" y="164" width="24" height="12" rx="5" fill="#cfe6fb" stroke="${INK}" stroke-width="2.5"/><path d="M183 176 C190 220 170 260 182 298" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 3"/></g>
        <text x="150" y="292" text-anchor="middle" font-size="12" font-weight="800" fill="#6f6684">âm đạo</text>
      </svg></div><div id="gelCtg"></div>`,
    `<div class="seg" id="gelSeg">
        <button class="btn on" type="button" data-g="tc">Gel túi cùng sau</button>
        <button class="btn" type="button" data-g="kenh">Gel kênh CTC</button>
        <button class="btn" type="button" data-g="cerv">Cervidil 10 mg</button>
      </div>
      <div><div class="slider-lbl"><span>Độ chín muồi CTC</span><span id="ripeTxt">vừa</span></div><div class="mbar"><i id="ripe" style="--w:50%"></i></div></div>
      <p class="hot-out" id="gelOut"></p>
      <button class="btn btn-pink" type="button" id="pull">🧵 Lấy thuốc ra ngay!</button>`),
  how: ['Bấm 3 cách đặt → xem vị trí + độ chín muồi', '<b>Cervidil</b> → CTG xấu → <b>🧵 Lấy ra</b>', 'Thử 🧵 với gel'],
  coach: '#gelSeg',
  notes: [
    ['📌', 'PGE2 chủ yếu để <b>làm chín muồi CTC</b> hơn là khởi phát'],
    [1, 'Gel <b>trong kênh CTC</b>: chín muồi <b>rõ hơn</b> túi cùng sau · <b>lặp lại mỗi 6 giờ</b>', { at: [150, 162, 22], act: b => $('[data-g=kenh]', b).click() }],
    [2, 'Gel <b>túi cùng sau</b> (dinoprostone — ngả âm đạo phổ biến nhất)', { at: [182, 172, 20], act: b => $('[data-g=tc]', b).click() }],
    [3, '<b>Cervidil 10 mg</b>: <b>rút ra dễ</b> khi nhịp nhanh / TC tăng trương lực', { at: [183, 210, 44], act: b => $('[data-g=cerv]', b).click() }],
  ],
  mount(root) {
    let g = 'tc';
    const fig = $('#gelFig', root), out = $('#gelOut', root), cg = $('#gelCtg', root);
    const S = {
      tc: [50, 'vừa', '🧴 Gel túi cùng sau: chín muồi <b>kém rõ</b> hơn kênh CTC.'],
      kenh: [85, 'rõ rệt', '🎯 Gel kênh CTC: chín muồi <b>rõ hơn</b>. Lặp lại mỗi 6 giờ nếu cần.'],
      cerv: [70, 'tốt', '🧵 Cervidil — 2 giờ sau: <b>tử cung tăng trương lực, cơn co dày</b>…'],
    };
    const set = k => {
      g = k; const [w, t, msg] = S[k];
      $$('#gelSeg .btn', root).forEach(x => x.classList.toggle('on', x.dataset.g === k));
      $('#gelTC', root).setAttribute('opacity', k === 'tc' ? 1 : 0); $('#gelK', root).setAttribute('opacity', k === 'kenh' ? 1 : 0);
      $('#cervI', root).setAttribute('opacity', k === 'cerv' ? 1 : 0); fig.classList.remove('pulled');
      $('#ripe', root).style.setProperty('--w', w + '%'); $('#ripeTxt', root).textContent = t; out.innerHTML = msg;
      cg.innerHTML = k === 'cerv' ? ctg({ freq: 6, dur: 70, decel: true, base: 165 }) : '';
    };
    $$('#gelSeg .btn', root).forEach(b => b.onclick = () => { set(b.dataset.g); Sfx.play('pop'); });
    $('#pull', root).onclick = () => {
      if (g === 'cerv') { fig.classList.add('pulled'); cg.innerHTML = ctg({ freq: 3, dur: 40 }); out.innerHTML = '✅ Kéo dây — Cervidil ra ngoài. <b>Ưu điểm so với gel!</b>'; Sfx.play('peel'); }
      else { Sfx.play('buzz'); out.innerHTML = '❌ Gel <b>không lấy ra dễ</b> được — Cervidil mới rút được.'; }
    };
    set('tc');
  },
},

/* ================= 21. ĐỔI CA PG → OXYTOCIN ================= */
{
  slug: 'doi-ca-pg-sang-oxytocin', part: 7, icon: '🔄', title: 'Đổi ca: prostaglandin → oxytocin',
  lead: 'Kéo kim đồng hồ: liều PG cuối lúc 14:00.',
  html: () => {
    const ticks = Array.from({ length: 12 }, (_, h) => { const a = h * 30 * Math.PI / 180; return `<line x1="${120 + 88 * Math.sin(a)}" y1="${120 - 88 * Math.cos(a)}" x2="${120 + 98 * Math.sin(a)}" y2="${120 - 98 * Math.cos(a)}" stroke="${INK}" stroke-width="${h % 3 ? 2 : 4}"/>`; }).join('');
    return scene(`<div class="fig"><svg viewBox="0 0 240 250" role="img" aria-label="Đồng hồ: phải chờ 6 giờ sau liều prostaglandin cuối">
        <path d="M120 120 L120 20 A100 100 0 0 1 120 220 Z" fill="#ffe0ec"/>
        <path d="M120 120 L120 220 A100 100 0 0 1 120 20 Z" fill="#d6f4e6"/>
        <circle cx="120" cy="120" r="100" fill="none" stroke="${INK}" stroke-width="4"/>${ticks}
        <text x="178" y="112" text-anchor="middle" font-size="13" font-weight="900" fill="#e0568a">⛔ chờ</text>
        <text x="62" y="112" text-anchor="middle" font-size="13" font-weight="900" fill="#2b8a5e">✅ được</text>
        <text x="120" y="14" text-anchor="middle" font-size="11" font-weight="800" fill="#6f6684">14:00 liều cuối</text>
        <text x="120" y="244" text-anchor="middle" font-size="11" font-weight="800" fill="#6f6684">20:00 (+6 giờ)</text>
        <g class="clock-hand" id="cHand"><line x1="120" y1="120" x2="120" y2="36" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>
        <circle cx="120" cy="120" r="30" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <text id="nowT" x="120" y="127" text-anchor="middle" font-family="Baloo 2, cursive" font-size="19" font-weight="800" fill="${INK}">15:00</text>
      </svg></div>`,
    `<div><div class="slider-lbl"><span>0 giờ</span><span id="hrsT" style="color:var(--ink)">+1 giờ</span><span>12 giờ</span></div>
      <input type="range" id="hrs" min="0" max="12" step="0.5" value="1" aria-label="Số giờ kể từ liều prostaglandin cuối" style="margin:10px 0 0"></div>
      <button class="btn lock-btn" type="button" id="startOx" disabled>🔒 Bắt đầu oxytocin</button>
      <p class="hot-out" id="oxOut"></p>
      <p class="small mut" style="font-weight:800">⏹️ Ngưng PG → oxytocin khi (chỉ cần 1):</p>
      <div class="seg" id="crit">
        <button class="btn" type="button" aria-pressed="false">💦 Ối vỡ</button>
        <button class="btn" type="button" aria-pressed="false">🌸 CTC thuận lợi</button>
        <button class="btn" type="button" aria-pressed="false">⏰ Chuyển dạ thật</button>
        <button class="btn" type="button" aria-pressed="false">🕛 Sau 12 giờ</button>
      </div>
`);
  },
  how: ['Kéo thanh <b>giờ</b> từ 14:00', 'Nút <b>🔒 Bắt đầu oxytocin</b> mở khi đủ 6 giờ', 'Bật các tiêu chí ngưng PG'],
  notes: [
    [1, 'Oxytocin chỉ bắt đầu <b>≥ 6 giờ</b> sau liều PG cuối — bất kể loại PG', { at: [120, 212, 32], act: b => { const r = $('#hrs', b); r.value = 6; fire(r, 'input'); }, more: '🔍 PG tác dụng kéo dài; thêm oxytocin lúc PG chưa “hạ nhiệt” ⇒ 2 lực co <b>cộng hưởng</b> ⇒ cường tính, suy thai, vỡ TC.' }],
    ['☠', 'PG <b>CCĐ tuyệt đối</b> khi tử cung có <b>sẹo mổ cũ</b> — không kiểm soát được, t½ dài'],
  ],
  mount(root) {
    const bs = $$('#crit .btn', root), r = $('#hrs', root), btn = $('#startOx', root), out = $('#oxOut', root);
    bs.forEach(b => b.onclick = () => {
      const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); Sfx.play('pop');
      out.innerHTML = bs.some(x => x.getAttribute('aria-pressed') === 'true') ? '✅ Có tiêu chí ⇒ <b>ngưng PG, chuyển oxytocin</b> (đủ 6 giờ).' : '';
    });
    let was = false;
    const upd = () => {
      const h = +r.value, mins = 14 * 60 + h * 60, ok = h >= 6;
      $('#nowT', root).textContent = `${String(Math.floor(mins / 60) % 24).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
      $('#hrsT', root).textContent = `+${fmt(h)} giờ`;
      $('#cHand', root).style.transform = `rotate(${h * 30}deg)`;
      btn.disabled = !ok; btn.innerHTML = ok ? '🔓 Bắt đầu oxytocin' : '🔒 Bắt đầu oxytocin';
      btn.classList.toggle('btn-mint', ok);
      out.innerHTML = ok ? 'Đã đủ 6 giờ.' : `Còn ${fmt(6 - h)} giờ — sớm nhất <b>20:00</b>.`;
      if (ok && !was) Sfx.play('pop'); was = ok;
    };
    r.oninput = upd; upd();
    btn.onclick = () => { Sfx.play('chime'); out.innerHTML = '✅ Bắt đầu <b>đúng trình tự</b>: chai trắng → VII giọt → hòa 5 IU (Trạm 8).'; };
  },
},

/* ================= 22. MISOPROSTOL ================= */
{
  slug: 'misoprostol-pge1', part: 7, icon: '💊', title: 'PGE1 Misoprostol: rẻ mà “dữ”',
  lead: 'Xếp lịch đặt thuốc 24 giờ (âm đạo) cho đúng luật.',
  html: () => scene(`<div class="board">
      <div id="misoSlots" class="board"></div>
      <div><div class="slider-lbl"><span>Tổng trong ngày</span><span id="misoSum" style="color:var(--ink)">0 / 200 mcg</span></div><div class="mbar"><i id="misoBar"></i></div></div>
      <p class="hot-out" id="misoOut">👆 Chọn liều cho ô 0h.</p>
      <button class="btn" type="button" id="misoRst">↺ Xếp lại</button>
    </div>`,
    '', 'tall'),
  gate: true, open: true,
  how: ['Chọn liều ô <b>0h</b> (25/50/100 mcg)', 'Rồi 6h → 12h → 18h — sai luật thì rung + lý do', 'Luật ở ô ①②③'],
  coach: '#misoSlots',
  notes: [
    [1, 'Khởi đầu <b>25 mcg</b> đặt <b>túi cùng sau</b> âm đạo, lặp lại nếu cần (mỗi 6 giờ)', { more: '🔍 PDF in “lặp lại mỗi giờ”; nguồn gốc phác đồ (WHO – <i>Managing Complications</i>) ghi <b>sau 6 giờ</b> — nhiều khả năng PDF sót số “6”.' }],
    [2, 'Không đáp ứng <b>2 liều 25</b> ⇒ tăng <b>50 mcg mỗi 6 giờ</b>'],
    [3, '<b>≤ 50 mcg/lần</b> · <b>≤ 200 mcg/ngày</b>'],
    ['⛔', 'BYT <b>cấm</b> khởi phát thai <b>đủ tháng</b> · chỉ <b>TCN II / thai chết lưu</b>, đường âm đạo'],
    ['⚖️', '≈ PGE2 & <b>rẻ</b> — nhưng <b>cường tính rất thường gặp</b> → vỡ TC', { more: 'PGE1 làm chín muồi CTC <b>và</b> tạo cơn co. Nhiều đường: âm đạo, uống, ngậm cạnh má, trực tràng; liều đổi theo tuổi thai & chỉ định.' }],
  ],
  mount(root) {
    const box = $('#misoSlots', root), out = $('#misoOut', root); let doses = [];
    const draw = () => {
      box.innerHTML = [0, 6, 12, 18].map((h, i) => `<div class="row" style="flex-wrap:nowrap"><span class="clock-badge" style="min-width:56px;text-align:center">${h}h</span>${doses[i] != null
        ? `<span class="pill c-mint">💊 ${doses[i]} mcg</span>`
        : i === doses.length ? [25, 50, 100].map(d => `<button class="btn" type="button" data-d="${d}" style="min-height:46px;padding:4px 10px;font-size:15px;flex:1">${d}</button>`).join('') : '<span class="mut small">…</span>'}</div>`).join('');
      const sum = doses.reduce((a, b) => a + b, 0);
      $('#misoSum', root).textContent = `${sum} / 200 mcg`; $('#misoBar', root).style.setProperty('--w', sum / 200 * 100 + '%');
      $$('[data-d]', box).forEach(b => b.onclick = () => pick(+b.dataset.d, b));
      if (doses.length === 4) { out.innerHTML = `🎉 Hợp lệ: ${doses.join(' → ')} = <b>${sum} mcg/24 giờ</b>.`; Sfx.play('chime'); burst(out); fire(out, 'done'); }
    };
    const pick = (d, b) => {
      const n25 = doses.filter(x => x === 25).length, sum = doses.reduce((a, c) => a + c, 0);
      const err = d > 50 ? '⛔ Không quá <b>50 mcg/lần</b>.' : d === 50 && n25 < 2 ? '⛔ Chỉ lên 50 khi <b>2 liều 25 không đáp ứng</b>.' : sum + d > 200 ? '⛔ Không quá <b>200 mcg/ngày</b>.' : '';
      if (err) { shake(b); Sfx.play('buzz'); out.innerHTML = err; return; }
      doses.push(d); out.innerHTML = '✅ Hợp lệ.'; Sfx.play('pop'); draw();
    };
    $('#misoRst', root).onclick = () => { doses = []; out.innerHTML = '👆 Chọn liều cho ô 0h.'; draw(); Sfx.play('pop'); };
    draw();
  },
},

/* ================= 23. ERGOMETRINE ================= */
{
  slug: 'ergometrine', part: 7, icon: '🪨', title: 'Ergometrine: co cứng một lèo',
  lead: 'Oxytocin: co – nghỉ. Ergometrine: co cứng + tăng huyết áp.',
  html: () => {
    let ox = '', er = '';
    for (let t = 0; t <= 300; t += 2) {
      const x = 20 + t, yo = 160 - 100 * Math.max(0, Math.sin(t / 300 * Math.PI * 6)) ** 2;
      const ye = 160 - 105 * (1 - Math.exp(-t / 22)) + 4 * Math.sin(t / 7);
      ox += (t ? 'L' : 'M') + x + ' ' + yo.toFixed(1); er += (t ? 'L' : 'M') + x + ' ' + ye.toFixed(1);
    }
    return scene(`<div class="fig"><svg viewBox="0 0 520 230" role="img" aria-label="So sánh kiểu co tử cung và tác dụng mạch máu">
        <line x1="20" y1="160" x2="324" y2="160" stroke="${INK}" stroke-width="3"/><line x1="20" y1="30" x2="20" y2="160" stroke="${INK}" stroke-width="3"/>
        <text x="24" y="24" font-size="12" font-weight="800" fill="#6f6684">áp lực buồng tử cung</text><text x="320" y="178" text-anchor="end" font-size="12" font-weight="800" fill="#6f6684">thời gian →</text>
        <path class="wave-ox" d="${ox}" fill="none" stroke="#e76f95" stroke-width="5" stroke-linecap="round"/>
        <path class="wave-er" d="${er}" fill="none" stroke="#c9971c" stroke-width="5" stroke-linecap="round"/>
        <text class="wave-ox" x="170" y="200" text-anchor="middle" font-size="13" font-weight="900" fill="#e76f95">co – nghỉ – co – nghỉ</text>
        <text class="wave-er" x="170" y="200" text-anchor="middle" font-size="13" font-weight="900" fill="#c9971c">co cứng kéo dài, không nghỉ</text>
        <rect x="350" y="40" width="160" height="60" fill="#ff9fb8"/>
        <rect class="vessel-wall vessel-top" x="350" y="28" width="160" height="14" rx="6" fill="#ffe0c2" stroke="${INK}" stroke-width="3"/>
        <rect class="vessel-wall vessel-bot" x="350" y="98" width="160" height="14" rx="6" fill="#ffe0c2" stroke="${INK}" stroke-width="3"/>
        <text x="430" y="132" text-anchor="middle" font-size="12" font-weight="800" fill="#6f6684">mạch máu</text>
        <path d="M385 200 A45 45 0 0 1 475 200" fill="none" stroke="${INK}" stroke-width="4"/>
        <path d="M455 168 A45 45 0 0 1 475 200" fill="none" stroke="#ff8fb8" stroke-width="8"/>
        <g class="bp-needle"><line x1="430" y1="200" x2="394" y2="200" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>
        <circle cx="430" cy="200" r="7" fill="#fff1b8" stroke="${INK}" stroke-width="3"/>
        <text x="430" y="226" text-anchor="middle" font-size="12" font-weight="900" fill="${INK}">huyết áp</text>
      </svg></div>`,
    `<div class="seg"><button class="btn on" type="button" data-d="ox">💧 Oxytocin</button><button class="btn" type="button" data-d="er">🪨 Ergometrine</button></div>
      <p class="hot-out" id="ergOut"></p>`);
  },
  how: ['Bấm <b>💧 Oxytocin</b> ↔ <b>🪨 Ergometrine</b>', 'So sóng co + mạch máu + kim HA', 'Bấm ô ①② chuyển nhanh'],
  notes: [
    [1, 'Oxytocin: co <b>nhịp nhàng, có nghỉ</b> · HA không tăng', { at: [[95, 100, 78], [245, 100, 78]], act: b => $('[data-d=ox]', b).click() }],
    [2, 'Ergometrine: co <b>cứng kéo dài</b> + <b>co mạch ⇒ ↑ huyết áp</b>', { at: [[430, 70, 54], [430, 196, 38]], act: b => $('[data-d=er]', b).click(), more: 'Đáp ứng với ergot <b>tăng dần</b> trong thai kỳ.' }],
    ['⏱', 'TB tác dụng sau <b>20′</b> · tiêm cơ TC <b>5′</b> · đỉnh <b>2 h</b> · <b>t½ ≈ 2 h</b>'],
    ['⛔', 'Chỉ dùng <b>sau sanh</b> (buồng TC trống) cho BHSS/đờ TC · CCĐ <b>THA, TSG, tim mạch</b>', { more: '🔍 Còn thai mà dùng: co cứng không nghỉ ⇒ hồ huyết không được tưới ⇒ <b>thai ngạt</b>, kẹt thai/nhau; t½ dài, không “tắt” nhanh như oxytocin.' }],
  ],
  mount(root) {
    const sc = $('.scene', root), out = $('#ergOut', root);
    const T = { ox: '💧 Co nhịp nhàng, có nghỉ · HA không tăng.', er: '🪨 Co <b>kéo dài</b>, trương lực tăng · <b>co mạch ⇒ tăng HA</b>.' };
    const set = d => { sc.dataset.drug = d; $$('[data-d]', sc).forEach(x => x.classList.toggle('on', x.dataset.d === d)); out.innerHTML = T[d]; };
    $$('[data-d]', sc).forEach(b => b.onclick = () => { set(b.dataset.d); Sfx.play(b.dataset.d === 'er' ? 'buzz' : 'pop'); });
    set('ox');
  },
},

/* ================= 24. BẢNG TRA NHANH ================= */
{
  slug: 'bang-tra-nhanh', part: 8, icon: '📋', title: 'Bảng tra nhanh 5 oxytocics',
  lead: 'Bấm từng thuốc để mở thẻ ôn.',
  html: () => {
    const C = [
      ['💧', 'Oxytocin', 'w', '✅ khởi phát · tăng co', 'Khởi phát · tăng co · BHSS', 'Chỉ TM chậm khi còn thai. KP 3 mIU/ph +1,5–2,5/30′; TC 4 mIU/ph +4, max 20. BHSS: 20 IU/1000 mL 60 giọt/ph hoặc TB 10 IU', 'Suy thai cấp, BXĐC tuyệt đối. Cấm 10 IU/500 mL ở đa sản/sẹo mổ. BHSS: không tiêm TM trực tiếp', 't½ 5′ — rối loạn cơn co ⇒ cắt hẳn, không giảm'],
      ['🧴', 'PGE2', 'n', '✅ chín muồi CTC', 'Làm chín muồi CTC > khởi phát', 'Gel trong kênh CTC > túi cùng sau, lặp mỗi 6 giờ; Cervidil 10 mg rút ra được', 'Sẹo mổ cũ (tuyệt đối)', 'Oxytocin ≥ 6 giờ sau liều PG cuối'],
      ['💊', 'Misoprostol', 'x', '⚠️ TCN II / thai chết lưu', 'Chín muồi CTC + khởi phát', '25 mcg túi cùng sau; không đáp ứng 2 liều ⇒ 50 mcg mỗi 6 giờ; ≤ 50 mcg/lần, ≤ 200 mcg/ngày', 'BYT cấm khởi phát thai đủ tháng; sẹo mổ cũ', 'Cường tính rất thường gặp; rẻ'],
      ['🧪', 'PGF2α', 'o', '❌ trước sanh', 'Điều trị BHSS', 'TB 0,25 mg, mỗi 15 phút, tối đa 8 liều (2 mg)', 'Hen phế quản', 'Co tử cung rất mạnh'],
      ['🪨', 'Ergometrine', 'y', '❌ trong thai kỳ', 'BHSS do đờ TC (buồng TC trống)', 'TB/TM chậm 0,2 mg; lặp 15′; rồi mỗi 4 giờ; tối đa 5 liều (1 mg)', 'THA, TSG chưa kiểm soát, bệnh tim mạch', 'Co cứng kéo dài; t½ ~2 giờ; TB tác dụng sau 20′'],
    ];
    const card = ([e, n, k, pre, role, dose, ccd, trap]) => `<button class="stk dcard k-${k}" type="button"><span class="stk-i">${e}</span>${n}<small>${pre}</small><template data-title="${esc(e + ' ' + n)}"><dl class="cheat-dl"><dt>Vai trò</dt><dd>${role}</dd><dt>Liều</dt><dd>${dose}</dd><dt>CCĐ</dt><dd>${ccd}</dd><dt>Bẫy</dt><dd>${trap}</dd></dl></template></button>`;
    return scene(`<div class="dgrid">${C.map(card).join('')}
        <button class="stk dcard k-a" type="button"><span class="stk-i">🔢</span>Con số vàng<small>ôn 1 phút</small><template data-title="🔢 Con số vàng"><dl class="cheat-dl">
          <dt>Nhạy</dt><dd>từ tuần 20 · ↑ chậm 20–30 · ổn định từ 34</dd>
          <dt>Dược ĐH</dt><dd>3–4′ tác dụng · t½ 5′ · ổn định 40′</dd>
          <dt>Mục tiêu</dt><dd>3 cơn/10′ × 40″ · ≤ 3–4 cơn/10′</dd>
          <dt>Cường tính</dt><dd>&gt; 60″/cơn hoặc &gt; 4 cơn/10′</dd>
          <dt>Thất bại</dt><dd>hết 5 IU ⇒ mai làm lại · 32 mIU/ph</dd>
          <dt>Giảm co</dt><dd>Salbutamol 10 mg/1000 mL, X giọt/ph</dd></dl></template></button></div>`,
      `<p class="hot-out">👆 Bấm 1 thẻ thuốc — <b>vai trò · liều · CCĐ · bẫy</b> hiện ngay dưới đây.</p>`, 'tall');
  },
  how: ['Bấm 1 thẻ thuốc', 'Đọc bảng tra hiện ngay cột phải', 'Mở đủ 6 thẻ rồi qua trạm cuối làm thử thách'],
},

/* ================= 25. THỬ THÁCH ================= */
{
  slug: 'thu-thach-phan-xa', part: 8, icon: '🏆', title: 'Thử thách phản xạ trực sanh',
  lead: '10 tình huống nhanh. Đúng ngay lần đầu = ⭐.',
  html: () => {
    const Q = [
      ['Chai 5 IU/500 mL G5% chảy XXIV giọt/phút. Sản phụ nhận bao nhiêu oxytocin?', [['6 mIU/ph', false, '24 ÷ 2 chứ không phải ÷ 4.'], ['12 mIU/ph', true, '24 giọt × 0,5 = 12 mIU/ph — mức thường đã đủ hiệu quả.'], ['24 mIU/ph', false, 'Đó là nếu pha 10 IU/500 mL (1 giọt = 1 mIU).']]],
      ['Khởi phát: vừa chỉnh tăng liều được 15 phút, cơn co còn thưa.', [['Tăng tiếp ngay', false, 'Không chỉnh tăng nhiều hơn 1 lần mỗi 30 phút.'], ['Chờ đủ 30 phút rồi mới đánh giá & chỉnh', true, 'Đúng nhịp phác đồ liều thấp.'], ['Ngưng, làm lại ngày mai', false, 'Chưa tới tiêu chí dừng.']]],
      ['Tăng co bằng bơm tiêm điện (5 IU + 49 mL G5%): tốc độ khởi đầu?', [['0,24 mL/giờ', false, 'Quá thấp: chỉ 0,4 mIU/ph.'], ['2,4 mL/giờ', true, '= 4 mIU/ph.'], ['24 mL/giờ', false, '= 40 mIU/ph — gấp đôi liều tối đa tăng co!']]],
      ['Đang tăng co 10 mIU/ph: 6 cơn/10′, nhịp giảm muộn; đã loại bất xứng & vượt trở ngại. Bước đầu?', [['Giảm còn 5 mIU/ph', false, 'Xử trí nửa vời!'], ['Cắt hẳn oxytocin và chờ đáp ứng', true, 'Nếu do oxytocin sẽ hết sau vài phút.'], ['Salbutamol ngay', false, 'Giảm co chỉ khi đã ngưng oxytocin mà vẫn cường tính.']]],
      ['Liều dinoprostone cuối lúc 14:00. Sớm nhất được bắt đầu oxytocin lúc?', [['15:00', false, 'Phải cách ít nhất 6 giờ.'], ['20:00', true, '14:00 + 6 giờ.'], ['02:00 hôm sau', false, 'Tối thiểu 6 giờ chứ không phải 12.']]],
      ['Thai 39 tuần, sẹo mổ lấy thai 1 lần, CTC chưa thuận lợi. Đặt dinoprostone làm mềm CTC?', [['Được, dùng liều thấp', false, 'Không có “liều an toàn” ở đây.'], ['Không — PG CCĐ tuyệt đối khi tử cung có sẹo mổ cũ', true, 'Không kiểm soát được, t½ dài.']]],
      ['Băng huyết do đờ TC ở sản phụ vừa hen phế quản vừa tiền sản giật nặng. Chọn?', [['Ergometrine 0,2 mg TB', false, 'CCĐ tiền sản giật.'], ['15-methyl PGF2α 0,25 mg TB', false, 'CCĐ hen phế quản.'], ['Oxytocin 20 IU/1000 mL TTM 60 giọt/ph', true, 'An toàn nhất cho ca này.']]],
      ['Đã truyền hết chai 5 IU/500 mL mà chưa có cơn co cần thiết.', [['Pha 10 IU/500 mL chạy tiếp', false, 'Không phải hướng xử trí của bài.'], ['Tạm ngưng, khởi phát lại vào hôm sau', true, 'Vạch dừng số 1.'], ['Kết luận thất bại, mổ ngay', false, '“Thất bại” là khi đã tới 32 mIU/ph vẫn không chuyển dạ.']]],
      ['Thai 40 tuần, muốn khởi phát bằng misoprostol vì rẻ & hiệu quả?', [['Được, 25 mcg âm đạo', false, 'Sai quy định.'], ['Không — Bộ Y tế cấm misoprostol khởi phát thai đủ tháng', true, 'Nguy cơ cường tính không kiểm soát, vỡ tử cung.']]],
      ['Liều tối đa của oxytocin khi tăng co?', [['12 mIU/ph', false, 'Đó là mức thường đã đủ hiệu quả.'], ['20 mIU/ph', true, 'Vượt phải cân nhắc kỹ, tăng nồng độ & chỉnh lại từ đầu.'], ['32 mIU/ph', false, 'Đó là vạch “khởi phát thất bại”.']]],
    ];
    return scene(`<div class="final-quiz">${Q.map(([q, o], i) => quiz(`<span class="st-num">Câu ${i + 1}/${Q.length}</span> ${q}`, o)).join('')}</div><div id="qEnd" hidden></div>`,
      `<div class="qprog">${Q.map((_, i) => `<i>${i + 1}</i>`).join('')}</div>
      <p class="hot-out">⭐ Đúng ngay lần đầu = 1 sao · 🟢 đúng ngay · 🟡 đúng sau khi sai</p>`, 'game');
  },
  gate: true,
  how: ['Đọc câu, chọn 1 đáp án', 'Sai thì đọc lý do rồi chọn lại', 'Đủ 10 câu → xem điểm ⭐'],
  mount(root) {
    const qs = $$('.final-quiz .quiz', root), dots = $$('.qprog i', root), end = $('#qEnd', root); let i = 0, score = 0;
    const show = () => { qs.forEach((q, k) => q.classList.toggle('cur', k === i)); dots.forEach((d, k) => d.classList.toggle('now', k === i)); };
    root.addEventListener('solved', e => {
      if (!e.target.closest('.final-quiz')) return;
      if (e.detail.first) score++;
      dots[i].classList.add(e.detail.first ? 'ok' : 'half');
      const fb = $('.fb', qs[i]), b = document.createElement('button');
      b.className = 'btn btn-go'; b.type = 'button'; b.style.marginTop = '10px';
      b.textContent = i < qs.length - 1 ? 'Câu tiếp ▶' : 'Xem kết quả 🎉';
      b.onclick = () => { i++; Sfx.play('pop'); i < qs.length ? show() : finish(); };
      fb.append(document.createElement('br'), b);
    });
    function finish() {
      qs.forEach(q => q.classList.remove('cur')); dots.forEach(d => d.classList.remove('now'));
      const best = Math.max(score, LS.get('best', 0)); LS.set('best', best);
      end.hidden = false;
      end.innerHTML = `<div class="box c-butter" style="text-align:center">
        <div class="stars">${'⭐'.repeat(score)}${'☆'.repeat(qs.length - score)}</div>
        <h2 class="hand" style="margin:6px 0">${score}/${qs.length} đúng ngay lần đầu</h2>
        <p>${score >= 9 ? 'Xuất sắc! Đủ trình trực sanh đêm nay 🩺✨' : score >= 7 ? 'Khá lắm! Ôn lại vài trạm là ngon lành 💪' : 'Không sao — mở bản đồ, ôn lại các trạm còn lấn cấn nha 🌱'}</p>
        <p class="small mut">Kỷ lục của bà: ${best}/${qs.length}</p>
        <div class="row" style="justify-content:center"><button class="btn" type="button" id="again">🔁 Làm lại</button><a class="btn btn-go" href="#/ban-do">🗺️ Về bản đồ</a></div></div>`;
      $('#again', root).onclick = () => location.reload();
      Sfx.play('tada'); confetti(score >= 8 ? 90 : 36); fire(end, 'done');
    }
    show();
  },
},
);

/* Bảng kiểm 100% nội dung bài giảng → trạm */
window.COVERAGE = [
  ['Nguồn gốc: peptide hạ đồi (nhân trên thị, cạnh não thất), oxytocin-neurophysin, tiết ở thùy sau tuyến yên', [1]],
  ['Cấu trúc peptide (Hình 1), so với ADH', [2]],
  ['Cơ chế: thụ thể GPCR – protein kinase C – Ca²⁺; ↑ tần số, cường độ, thời gian cơn co; qua tuần hoàn ⇒ nhanh & ngắn', [3]],
  ['Độ nhạy cơ tử cung theo tuần thai (20 / 20–30 / 34); nồng độ ×2–3 khi chuyển dạ, tối đa ở sổ thai đến co hồi', [4]],
  ['Hấp thu ngoài ruột, pepsin phân hủy, TB (kể cả cơ TC) & TTM chậm; tác dụng 3–4′, t½ 5′, ổn định 40′; thải trừ gan – thận – tuyến vú', [5]],
  ['3 chỉ định; CCĐ tuyệt đối (suy thai cấp, bất xứng đầu chậu tuyệt đối); thận trọng (sẹo mổ, đa sản, ngôi ngược)', [6]],
  ['3 nguyên tắc khởi phát; phác đồ liều thấp vs cao, 3 bằng chứng, VN dùng liều thấp', [7]],
  ['Trình tự khởi đầu: chai G5% trắng → VII giọt → hòa 5 IU (~3 mIU/ph); bơm tiêm 2–2,5 mIU/ph', [8, 9]],
  ['Tăng liều: cách 30′, +1,5–2,5 mIU, duy trì tới khi sanh; 12 mIU/ph thường đủ; 20 mIU/ph rất cao → tăng nồng độ', [9, 10]],
  ['Mục tiêu 3 cơn/10′ × 40″; không quá 3–4 cơn/10′', [10, 12]],
  ['Khởi phát thất bại: hết 5.000 mIU → hôm sau; 32 mIU/ph → thất bại; không bằng chứng tăng thêm', [11]],
  ['Chăm sóc: nghiêng trái, mạch – HA, CTG, sản đồ mỗi 30′; giảm/ngưng khi bất thường; không để một mình', [12]],
  ['Tăng co: định nghĩa; chỉ oxytocin, chỉ TTM chậm; nhỏ giọt 4 mIU (VIII giọt), 1 giọt = 0,5 mIU; bơm tiêm 5 IU + 49 mL, 2,4 mL/h', [13, 9]],
  ['Theo dõi tăng co 15–20′; +4 mIU/ph; max 20; vượt → tăng nồng độ, chỉnh lại từ đầu; sản đồ 1–2 giờ; duy trì mức thấp nhất', [13, 14]],
  ['Rối loạn: suy thai, cường tính, vỡ TC; định nghĩa > 60″ hoặc > 4 cơn/10′; bất xứng đầu chậu, hội chứng vượt trở ngại', [15]],
  ['Xử trí: chấm dứt chuyển dạ nếu thực thể; cắt hẳn oxytocin; salbutamol 10 mg/1000 mL X giọt/ph; tăng co lại từ đầu', [16]],
  ['Vỡ TC ở đa sản & sẹo mổ; cấm nồng độ 10 IU/500 mL (20 mIU/mL)', [17]],
  ['Bảng 1 WHO: oxytocin, ergometrine, 15-methyl PGF2α trong băng huyết sau sanh', [18]],
  ['Prostaglandins: paracrine/autocrine, acid arachidonic, nguồn gốc PGF2α/PGE2/prostacyclin, in-vitro/in-vivo, đáp ứng không đổi, 4 chỉ định', [19]],
  ['PGE2: dinoprostone gel (kênh CTC > túi cùng sau, mỗi 6 giờ), Cervidil 10 mg', [20]],
  ['Ngưng PG → oxytocin (ối vỡ, CTC thuận lợi, chuyển dạ thật, sau 12 giờ); oxytocin ≥ 6 giờ sau PG; PG CCĐ tuyệt đối sẹo mổ', [21]],
  ['15-methyl PGF2α: điều trị sau sanh, không dùng trước sanh', [18, 19]],
  ['PGE1 misoprostol: đường dùng, cường tính, rẻ; BYT cấm khởi phát đủ tháng; cho phép TCN II/thai chết lưu; liều 25–50 mcg', [22]],
  ['Ergometrine: đáp ứng tăng theo thai kỳ, co kéo dài, THA; chỉ sau sanh; khởi phát 20′/5′; đỉnh 2 giờ, t½ ~2 giờ; CCĐ', [23]],
  ['Ôn tập & tự kiểm tra', [24, 25]],
];
