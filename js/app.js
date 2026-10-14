/* zitthenk học Oxytocin — lõi: định tuyến hash, âm thanh, khung màn (📝 Cách học · ô ghi chú ①②③ gắn hình · khóa Tiếp), widget dùng chung */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = {
  get(k, d) { try { const v = localStorage.getItem('zt-oxy:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('zt-oxy:' + k, JSON.stringify(v)); } catch {} },
};
window.TRAM = [];

/* ---------- Âm thanh tự tổng hợp (Web Audio) ---------- */
const Sfx = (() => {
  let ctx, on = LS.get('sound', true);
  const ac = () => (ctx ||= new (window.AudioContext || window.webkitAudioContext)());
  function tone(f, t0, dur, type = 'sine', vol = .2, f2) {
    const c = ac(), t = c.currentTime + t0, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .03);
  }
  function noise(dur, from, to) {
    const c = ac(), b = c.createBuffer(1, c.sampleRate * dur, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) * (Math.random() < .3 ? 1 : .4);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = b; f.type = 'bandpass'; f.Q.value = 1.4;
    f.frequency.setValueAtTime(from, c.currentTime); f.frequency.exponentialRampToValueAtTime(to, c.currentTime + dur);
    g.gain.value = .45; s.connect(f).connect(g).connect(c.destination); s.start();
  }
  const S = {
    pop() { tone(520, 0, .13, 'sine', .25, 1150); },
    peel() { noise(.32, 3800, 500); },
    chime() { [880, 1175, 1568].forEach((f, i) => tone(f, i * .09, .55, 'triangle', .16)); },
    buzz() { tone(190, 0, .12, 'square', .07, 150); tone(150, .14, .2, 'square', .07, 110); },
    drip() { tone(1500, 0, .09, 'sine', .14, 650); },
    tada() { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .1, .6, 'triangle', .15)); },
  };
  return {
    play(n) { if (!on) return; try { S[n](); } catch {} },
    toggle() { on = !on; LS.set('sound', on); return on; },
    get on() { return on; },
  };
})();

/* ---------- Tiện ích ---------- */
function shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); }
let toastT;
function toast(msg) { const t = $('#toast'); t.innerHTML = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
const PRAISE = ['Chuẩn rồi! ✨', 'Xịn xò! 🌸', 'Giỏi dữ vậy trời! 💖', 'Ăn điểm nha! ⭐', 'Đỉnh luôn! 🎀'];
const praise = () => toast(PRAISE[Math.random() * PRAISE.length | 0]);
function confetti(n = 46) {
  const cols = ['#ffd3e0', '#ff8fa3', '#fff1b8', '#cdeedd', '#cfe6fb', '#e4dcff', '#ffe0c2'];
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i'); s.className = 'confetti';
    s.style.cssText = `left:${Math.random() * 100}vw;background:${cols[i % cols.length]};animation-delay:${Math.random() * .6}s;animation-duration:${2 + Math.random() * 1.4}s`;
    document.body.append(s); setTimeout(() => s.remove(), 4200);
  }
}
/* Bụi lấp lánh bay ra từ chỗ vừa làm đúng */
function burst(el, list = ['✨', '🌸', '⭐', '💖']) {
  const r = el?.getBoundingClientRect?.(); if (!r) return;
  for (let k = 0; k < 8; k++) {
    const s = document.createElement('i'); s.className = 'sp'; s.textContent = list[k % list.length];
    s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;--dx:${Math.random() * 150 - 75}px;--dy:${-30 - Math.random() * 110}px`;
    document.body.append(s); setTimeout(() => s.remove(), 1000);
  }
}
const fire = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { bubbles: true, detail }));
const roman = n => { let r = ''; for (const [v, s] of [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]) while (n >= v) { r += s; n -= v; } return r || '0'; };
const fmt = (x, d = 1) => (+x.toFixed(d)).toLocaleString('vi-VN');
let timers = [];
const every = (ms, fn) => timers.push(setInterval(fn, ms));
const later = (ms, fn) => timers.push(setTimeout(fn, ms));
const clearTimers = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; };

/* Băng CTG 10 phút: trên = nhịp tim thai, dưới = cơn co. 1px = 1 giây */
function ctg({ freq = 3, dur = 40, base = 140, decel = false, pen = true } = {}) {
  const W = 600, F0 = 6, F1 = 126, T0 = 140, T1 = 214;
  const peaks = Array.from({ length: freq }, (_, k) => (k + .5) * W / freq);
  const sd = dur / 4.2;
  const toco = t => 10 + peaks.reduce((a, p) => a + 62 * Math.exp(-((t - p) ** 2) / (2 * sd * sd)), 0);
  const fhr = t => {
    let v = base + 4 * Math.sin(t * .42) + 3 * Math.sin(t * .17 + 1) + 1.5 * Math.sin(t * 1.1 + 2);
    if (decel) v -= peaks.reduce((a, p) => a + 32 * Math.exp(-((t - p - dur * .55) ** 2) / (2 * (sd + 6) ** 2)), 0);
    return v;
  };
  const yF = b => F0 + (200 - b) / 140 * (F1 - F0), yT = v => T1 - Math.min(v, 100) / 100 * (T1 - T0);
  let pf = '', pt = '';
  for (let t = 0; t <= W; t += 2) { pf += (t ? 'L' : 'M') + t + ' ' + yF(fhr(t)).toFixed(1); pt += (t ? 'L' : 'M') + t + ' ' + yT(toco(t)).toFixed(1); }
  let grid = '';
  for (let m = 0; m <= 10; m++) grid += `<line x1="${m * 60}" y1="${F0}" x2="${m * 60}" y2="${T1}" stroke="#f2b8c8" stroke-width="${m % 5 ? 1 : 2}"/>`;
  for (const b of [80, 100, 120, 140, 160, 180]) grid += `<line x1="0" y1="${yF(b)}" x2="${W}" y2="${yF(b)}" stroke="#f6cbd8" stroke-width="1"/><text x="3" y="${yF(b) - 2}" class="ctg-lbl">${b}</text>`;
  const band = `<rect x="0" y="${yF(160)}" width="${W}" height="${yF(110) - yF(160)}" fill="#cdeedd" opacity=".45"/>`;
  return `<div class="ctg"><svg viewBox="0 0 ${W} ${T1 + 16}" role="img" aria-label="Băng CTG 10 phút: ${freq} cơn co, mỗi cơn ${dur} giây">
    ${band}${grid}
    <rect x="0" y="${T0 - 6}" width="${W}" height="2" fill="#4a3f63" opacity=".25"/>
    <text x="${W - 4}" y="${F0 + 12}" text-anchor="end" class="ctg-lbl">Tim thai (l/ph)</text>
    <text x="${W - 4}" y="${T0 + 8}" text-anchor="end" class="ctg-lbl">Cơn co (mmHg)</text>
    <path d="${pf}" fill="none" stroke="#e0568a" stroke-width="2" stroke-linejoin="round"/>
    <path d="${pt}" fill="none" stroke="#4a3f63" stroke-width="2.5" stroke-linejoin="round"/>
    ${pen ? `<line class="ctg-pen" x1="0" y1="${F0}" x2="0" y2="${T1}" stroke="#e76f95" stroke-width="3" opacity=".7"/>` : ''}
    <text x="${W / 2}" y="${T1 + 13}" text-anchor="middle" class="ctg-lbl">— 10 phút —</text>
  </svg></div>`;
}

/* Tình huống phân nhánh: hình ở vùng .viz, câu hỏi ở khung điều khiển.
   scenes = [{meta, vis, q, opts:[[nhãn, đúng?, giải thích]]}] — giải xong tình huống i ⇒ mở ô ghi chú i */
function scenario(viz, box, scenes) {
  let i = 0, firstTry = 0, missed = false;
  function draw() {
    const s = scenes[i]; missed = false;
    viz.innerHTML = s.vis || '';
    box.innerHTML = `<div class="scn-head"><span class="st-num">Tình huống ${i + 1}/${scenes.length}</span>${s.meta || ''}</div>
      <p class="scn-q">${s.q}</p>
      <div class="opts">${s.opts.map((o, k) => `<button class="opt" type="button" data-k="${k}">${o[0]}</button>`).join('')}</div>
      <p class="fb"></p>`;
    $$('.opt', box).forEach(b => b.onclick = () => {
      const o = s.opts[b.dataset.k], fb = $('.fb', box);
      if (o[1]) {
        if (!missed) firstTry++;
        b.classList.add('right'); Sfx.play('chime'); burst(b); praise();
        $$('.opt', box).forEach(x => x.disabled = true);
        fb.innerHTML = '✅ ' + o[2] + `<br><button class="btn btn-go" type="button">${i < scenes.length - 1 ? 'Tình huống tiếp ▶' : 'Xem kết quả 🎉'}</button>`;
        $('.btn', fb).onclick = () => { i++; i < scenes.length ? draw() : end(); Sfx.play('pop'); };
        fire(box, 'unlock', i);
        fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        missed = true; b.classList.add('wrong'); b.disabled = true; shake(b); Sfx.play('buzz'); fb.innerHTML = '❌ ' + o[2];
      }
    });
  }
  function end() {
    const n = scenes.length;
    viz.innerHTML = `<div class="stars">${'⭐'.repeat(firstTry)}${'☆'.repeat(n - firstTry)}</div>`;
    box.innerHTML = `<p class="scn-q">Đúng ngay lần đầu ${firstTry}/${n}${firstTry === n ? ' — phản xạ chuẩn bác sĩ trực sanh! 🩺' : '.'} Ôn lại các ô ghi nhớ bên dưới nha.</p><button class="btn" type="button">🔁 Chơi lại</button>`;
    $('button', box).onclick = () => { i = 0; firstTry = 0; draw(); };
    Sfx.play('tada'); if (firstTry === n) confetti();
    fire(box, 'done');
  }
  draw();
}

/* ---------- Định tuyến & khung ---------- */
let cur = 0;
const N = () => TRAM.length;
const hashFor = i => `#/tram-${i}-${TRAM[i].slug}`;
const go = i => { if (i >= 0 && i < N()) location.hash = hashFor(i); };
const goMap = () => { location.hash = '#/ban-do'; };
const doneSet = () => new Set(LS.get('done', []));
window.ALL_SCREENS = () => TRAM.map((_, i) => hashFor(i));

function route() {
  $('.coach')?.remove();
  const h = location.hash;
  if (h.startsWith('#/ban-do')) return showMap();
  const m = h.match(/^#\/tram-(\d+)/);
  if (m && +m[1] < N()) return showStep(+m[1]);
  location.replace(LS.get('last', null) == null ? hashFor(0) : '#/ban-do');
}

function showStep(i) {
  clearTimers(); NTA = null; cur = i; document.body.dataset.view = 'step'; LS.set('last', i);
  const t = TRAM[i], p = PARTS[t.part], st = $('#stage'), dn = doneSet().has(i), howOff = LS.get('howOff', false);
  st.innerHTML = `<article class="sheet in${dn ? ' is-done' : ''}" style="--part:${p.c}">
    ${t.cover ? '' : `<header class="st-head"><span class="ico-bub" aria-hidden="true">${t.icon}</span>
      <div class="st-tt"><h1>${t.title}</h1>${t.lead ? `<p class="lead">${t.lead}</p>` : ''}</div>
      <span class="okb">✓ Xong</span>
      <button class="tbtn copy" type="button" title="Sao chép link trạm này" aria-label="Sao chép link trạm này">📋</button></header>`}
    ${t.how ? `<div class="how${howOff ? ' off' : ''}"><b class="how-h">📝 Cách học</b><ol>${t.how.map(s => `<li>${s}</li>`).join('')}</ol><button class="how-x" type="button" aria-label="Ẩn Cách học">✕</button></div>` : ''}
    <div class="st-body">${t.html()}</div></article>`;
  const body = $('.st-body', st);
  $$('input[type=range]', body).forEach(fillRange);
  t.mount && t.mount(body);
  $$('.hot[data-quest]', body).forEach(b => { b._q = { list: JSON.parse(b.dataset.quest), i: 0, got: new Set() }; askQuest(b); });
  if (t.notes) mountNotes(body, t, !!t.gate && !t.open && !dn);
  body.addEventListener('unlock', e => unlockNote(e.detail));
  body.addEventListener('done', () => markDone(i));
  if (t.cover) markDone(i);
  else if (!t.gate && !dn) {
    const f = () => { markDone(i); body.removeEventListener('click', f); body.removeEventListener('input', f); };
    body.addEventListener('click', f); body.addEventListener('input', f);
  }
  if (!dn && t.coach !== false) later(700, () => coach(body, t.coach));
  chrome();
  document.title = `${t.cover ? 'Bìa' : 'Trạm ' + i + ' · ' + t.title} — zitthenk học Oxytocin`;
  window.scrollTo(0, 0);
}

function markDone(i) {
  const d = doneSet(); if (d.has(i)) return;
  d.add(i); LS.set('done', [...d]);
  if (i === cur && document.body.dataset.view === 'step') {
    $('.sheet')?.classList.add('is-done');
    if (TRAM[i].gate) { unlockNote('all'); toast('🎉 Xong màn này! Đã mở hết ô ghi nhớ — bấm Tiếp ▶'); burst($('#next')); }
    burst($('#stars'), ['⭐']);
  }
  chrome();
}

function showMap() {
  clearTimers(); document.body.dataset.view = 'map';
  const d = doneSet(), last = LS.get('last', 0), lt = TRAM[last] || TRAM[0], pct = Math.round(d.size / N() * 100);
  let html = `<div class="map-hero"><div class="ring" style="--p:${pct}"><b>${pct}%</b><small>${d.size}/${N()} ⭐</small></div>
    <div class="map-hi"><h1>🗺️ Bản đồ lộ trình</h1>
    <p class="mut" style="margin:6px 0 12px">Oxytocin là ai → khởi phát → tăng co → biến chứng → băng huyết → oxytocics khác. Mỗi trạm 1 ý, ~2 phút.</p>
    <a class="btn btn-go" href="${hashFor(last)}">▶ ${d.size ? 'Học tiếp' : 'Bắt đầu'}: Trạm ${last} · ${lt.cover ? 'Bìa' : lt.title}</a></div></div>`;
  PARTS.forEach((p, pi) => {
    const items = TRAM.map((t, i) => [t, i]).filter(([t]) => t.part === pi);
    if (!items.length) return;
    const k = items.filter(([, i]) => d.has(i)).length;
    html += `<section class="map-part"><h2 style="--c:${p.c}">${p.name} <small>${k}/${items.length}</small></h2><div class="map-grid">${items.map(([t, i]) => `
      <a class="map-card ${d.has(i) ? 'done' : ''} ${i === last ? 'here' : ''}" href="${hashFor(i)}" style="--c:${p.c}">
        ${i === last ? '<span class="pin">📍 Bà đang ở đây</span>' : ''}
        <span class="mc-top"><span class="mc-num">${i}</span><span class="mc-ico">${t.icon}</span>${t.gate ? '<span class="mc-gate" title="Có thử thách">🎯</span>' : ''}</span>
        <span class="mc-title">${t.cover ? 'Bìa & mục tiêu' : t.title}</span></a>`).join('')}</div></section>`;
  });
  if (window.COVERAGE) html += `<details class="coverage"><summary>✅ Bảng kiểm: 100% bài giảng nằm ở trạm nào?</summary><ol>${COVERAGE.map(([txt, ids]) =>
    `<li>${txt} → ${ids.map(i => `<a href="${hashFor(i)}">Trạm ${i}</a>`).join(', ')}</li>`).join('')}</ol></details>`;
  html += `<p class="mut small" style="text-align:center;margin-top:24px">⌨️ ← → chuyển trạm · 👆 vuốt ngang trên điện thoại · 📋 chép link đúng trạm<br>Nguồn: Bài giảng “Oxytocics trong sản khoa — Tăng co & Phát khởi chuyển dạ bằng oxytocin”, Bộ môn Phụ Sản ĐHYD TP.HCM (Phạm Văn Đức, Âu Nhựt Luân). Nhãn ✨ = kiến thức bổ sung ngoài bài giảng (Williams/WHO).<br>✎ Nguyễn Việt Thanh - Y23C - 17</p>`;
  $('#map').innerHTML = html;
  chrome(); document.title = 'Bản đồ — zitthenk học Oxytocin'; window.scrollTo(0, 0);
}

function chrome() {
  const d = doneSet(), map = document.body.dataset.view === 'map', t = TRAM[cur];
  $('#stars').textContent = `⭐ ${d.size}/${N()}`;
  $('.tube').style.setProperty('--p', d.size / N());
  $('.drop-mark').style.left = (cur / (N() - 1) * 100) + '%';
  $('.ptext').textContent = map ? `Bản đồ · xong ${d.size}/${N()} trạm` : `${PARTS[t.part].name} · Trạm ${cur}/${N() - 1}`;
  const sibs = TRAM.map((x, i) => [x, i]).filter(([x]) => x.part === t.part);
  $('#dots').innerHTML = sibs.map(([x, i]) => `<button class="dot${i === cur ? ' now' : ''}${d.has(i) ? ' ok' : ''}" type="button" data-go="${i}" title="Trạm ${i} · ${x.title}" aria-label="Trạm ${i}"></button>`).join('');
  $('#prev').disabled = cur === 0;
  $('#next').textContent = cur === N() - 1 ? '🏁 Bản đồ' : 'Tiếp ▶';
  $('#next').classList.toggle('lock', !!t.gate && !d.has(cur));
  $('#next').classList.toggle('ready', !!t.gate && d.has(cur));
  $$('.toc-item').forEach(b => { b.classList.toggle('cur', +b.dataset.i === cur && !map); $('.ck', b).textContent = d.has(+b.dataset.i) ? '⭐' : ''; });
}

function buildToc() {
  let h = '';
  PARTS.forEach((p, pi) => {
    const items = TRAM.map((t, i) => [t, i]).filter(([t]) => t.part === pi);
    if (!items.length) return;
    h += `<div class="toc-part" style="--c:${p.c}">${p.name}</div>` + items.map(([t, i]) =>
      `<button class="toc-item" type="button" data-i="${i}"><span class="n">${i}</span><span>${t.icon} ${t.cover ? 'Bìa & mục tiêu' : t.title}</span><span class="ck"></span></button>`).join('');
  });
  $('#tocList').innerHTML = h;
}
function drawer(open) { $('#drawer').classList.toggle('open', open); $('#scrim').hidden = !open; if (open) Sfx.play('peel'); }

async function copyLink() {
  const url = location.href;
  try { await navigator.clipboard.writeText(url); }
  catch { const t = document.createElement('textarea'); t.value = url; document.body.append(t); t.select(); try { document.execCommand('copy'); } catch {} t.remove(); }
  Sfx.play('pop');
  toast(`📋 Đã chép link Trạm ${cur}! Dán qua Zalo/Telegram, mở máy khác là học tiếp liền ✨`);
}

/* ---------- Ô ghi chú ①②③ gắn với vùng trên hình ----------
   t.notes = [[nhãn (số = gắn hình | emoji), chữ ngắn, {more, at:[x,y,r] | [[x,y,r],…], pin:[x,y] (chỗ đặt số), fig, act(body)}]]
   at = toạ độ theo viewBox của hình (mặc định svg đầu tiên trong .viz). Bấm ô → vùng đó sáng, phần khác mờ. */
let NTA = null, SPN = 0;
const circles = at => Array.isArray(at[0]) ? at : [at];
const NS = 'http://www.w3.org/2000/svg';
function spotLayer(svg) {
  if (svg._spl) return svg._spl;
  const vb = svg.viewBox.baseVal, id = 'spm' + (++SPN), g = document.createElementNS(NS, 'g');
  const R = `x="${vb.x}" y="${vb.y}" width="${vb.width}" height="${vb.height}"`;
  g.setAttribute('class', 'spl');
  g.innerHTML = `<defs><mask id="${id}"><rect ${R} fill="#fff"/><g class="holes"></g></mask></defs><rect class="fog" ${R} mask="url(#${id})"/><g class="rings"></g><g class="bdgs"></g>`;
  svg.append(g);
  return (svg._spl = { g, vb, br: Math.max(vb.width, vb.height) / 27 });
}
function mountNotes(body, t, locked) {
  const ctl = $('.ctl', body) || body, box = document.createElement('div');
  box.className = 'notes';
  box.innerHTML = `<div class="nt-top"><b>📌 Ghi nhớ</b><span class="nt-lockmsg">🔒 làm xong để mở</span>${t.notes.length > 1 ? '<button class="nt-auto" type="button">▶ Tự chạy từng ý</button>' : ''}</div>
    <ol class="nt-list">${t.notes.map(([l, txt, o = {}], k) => `<li class="nt${locked ? ' lock' : ''}" data-i="${k}"><button class="nt-h" type="button">
      <span class="nb${typeof l === 'number' ? ' num' : ''}">${l}</span><span class="nt-t">${txt}</span>${o.more ? '<span class="nt-plus" aria-hidden="true">＋</span>' : ''}</button>
      ${o.more ? `<div class="nt-m">${o.more}</div>` : ''}</li>`).join('')}</ol>`;
  ctl.append(box);
  t.notes.forEach(([l, , o = {}], k) => {
    if (!o.at) return;
    const svg = $(o.fig || '.viz svg', body); if (!svg) return;
    const L = spotLayer(svg), [x, y, r] = circles(o.at)[0], br = L.br;
    const [px, py] = o.pin || [x + r * .72, y - r * .72];
    const bx = Math.min(Math.max(px, L.vb.x + br), L.vb.x + L.vb.width - br), by = Math.min(Math.max(py, L.vb.y + br), L.vb.y + L.vb.height - br);
    $('.bdgs', L.g).insertAdjacentHTML('beforeend', `<g class="bdg${locked ? ' lock' : ''}" data-i="${k}" role="button" aria-label="Ý ${l}"><circle cx="${bx}" cy="${by}" r="${br}"/><text x="${bx}" y="${by}" font-size="${br * 1.15}">${l}</text></g>`);
  });
}
function unlockNote(k) {
  const lis = k === 'all' ? $$('.nt.lock') : $$(`.nt.lock[data-i="${k}"]`);
  lis.forEach(li => { li.classList.remove('lock'); li.classList.add('fresh'); });
  (k === 'all' ? $$('.bdg.lock') : $$(`.bdg.lock[data-i="${k}"]`)).forEach(b => b.classList.remove('lock'));
}
function clearNote() {
  $$('.nt.on').forEach(x => x.classList.remove('on'));
  $$('.spl.on').forEach(g => g.classList.remove('on'));
  $$('.bdg.on').forEach(g => g.classList.remove('on'));
}
function pickNote(k, auto) {
  const body = $('.st-body'), li = $(`.nt[data-i="${k}"]`, body), [, , o = {}] = TRAM[cur].notes[k];
  if (li.classList.contains('lock')) { shake(li); Sfx.play('buzz'); toast('🔒 Làm xong phần tương tác để mở ý này nha 👆'); return; }
  if (!auto) stopAuto();
  if (li.classList.contains('on') && !auto) { clearNote(); Sfx.play('pop'); return; }
  clearNote(); li.classList.add('on'); li.classList.remove('fresh'); Sfx.play('pop');
  o.act && o.act(body);
  if (o.at) {
    const svg = $(o.fig || '.viz svg', body);
    if (svg) {
      const pn = svg.closest('[data-pane]');
      if (pn && !pn.classList.contains('on')) $(`[data-show="${pn.dataset.pane}"]`, body)?.click();
      const L = spotLayer(svg), cs = circles(o.at);
      $('.holes', L.g).innerHTML = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('');
      $('.rings', L.g).innerHTML = cs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
      L.g.classList.add('on'); $(`.bdg[data-i="${k}"]`, L.g)?.classList.add('on');
    }
  }
  li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
function autoNotes(btn) {
  if (NTA) return stopAuto();
  const ks = $$('.nt:not(.lock)').map(li => +li.dataset.i);
  if (!ks.length) { shake(btn); toast('🔒 Làm xong phần tương tác trước nha 👆'); return; }
  let j = 0; btn.textContent = '⏸ Dừng'; btn.classList.add('on');
  const step = () => (j < ks.length ? pickNote(ks[j++], true) : stopAuto());
  step(); NTA = setInterval(step, 3800); timers.push(NTA);
}
function stopAuto() {
  clearInterval(NTA); NTA = null;
  const b = $('.nt-auto'); if (b) { b.textContent = '▶ Tự chạy từng ý'; b.classList.remove('on'); }
}

/* Bàn tay 👆 chỉ vào thao tác đầu tiên của màn (biến mất khi chạm/cuộn) */
const COACH = '.seq-next, .sort .bins, .order .pool, .scn-box .opts, .final-quiz .quiz.cur .opts, .ctl input[type=range], .ctl .seg, .ctl .row .btn, .ctl > .btn, .dgrid';
function coach(body, sel) {
  $('.coach')?.remove();
  const el = $(sel || COACH, body), r = el?.getBoundingClientRect();
  if (!r || !r.width || document.body.dataset.view !== 'step') return;
  const c = document.createElement('i'); c.className = 'coach'; c.textContent = '👆'; c.setAttribute('aria-hidden', 'true');
  c.style.left = r.left + Math.min(r.width / 2, 70) + 'px'; c.style.top = r.top + Math.min(r.height, 60) - 6 + 'px';
  document.body.append(c);
}
const unCoach = () => $('.coach')?.remove();

/* ---------- Widget dùng chung (uỷ quyền sự kiện) ---------- */
function fillRange(r) { r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); }

function quizPick(b) {
  const q = b.closest('.quiz'); if (q.classList.contains('done') || b.disabled) return;
  const fb = $('.fb', q);
  if (b.hasAttribute('data-ok')) {
    q.classList.add('done'); b.classList.add('right'); Sfx.play('chime'); burst(b);
    fb.innerHTML = '✅ ' + (b.dataset.fb || q.dataset.ok || 'Chuẩn luôn!');
    q.dispatchEvent(new CustomEvent('solved', { bubbles: true, detail: { first: !q.dataset.miss } }));
  } else {
    q.dataset.miss = 1; b.classList.add('wrong'); b.disabled = true; shake(b); Sfx.play('buzz');
    fb.innerHTML = '❌ ' + (b.dataset.fb || 'Chưa đúng, thử lại nha!');
  }
}
/* Phân loại: mỗi lần 1 thẻ to, bấm hộp đúng; lý do hiện ngay dưới hộp */
function sortDrop(bin) {
  const s = bin.closest('.sort'), c = $('.pool .card', s), msg = $('.sort-msg', s);
  if (!c) return;
  if (c.dataset.bin === bin.dataset.bin) {
    const chip = document.createElement('i'); chip.textContent = c.textContent.trim();
    $('.slot', bin).append(chip); c.remove(); Sfx.play('chime'); burst(bin);
    const left = $$('.pool .card', s).length;
    msg.innerHTML = '✅ ' + (c.dataset.why || 'Đúng hộp!') + (left ? ` <span class="mut">· còn ${left} thẻ</span>` : ' <b>🎉 Xếp xong hết rồi!</b>');
    if (!left) { Sfx.play('tada'); s.classList.add('all-done'); fire(s, 'done'); }
  } else {
    shake(c); Sfx.play('buzz'); msg.innerHTML = '❌ Chưa đúng hộp — ' + (c.dataset.hint || 'nghĩ lại chút nha!');
  }
}
function orderPick(b) {
  const o = b.closest('.order'), done = $('.done', o), next = done.children.length, msg = $('.msg', o);
  if (+b.dataset.i === next) {
    const li = document.createElement('li'); li.innerHTML = b.innerHTML; done.append(li); b.remove(); Sfx.play('pop'); burst(li); msg.textContent = '';
    o.dispatchEvent(new CustomEvent('ordered', { bubbles: true, detail: { step: next } }));
    fire(o, 'unlock', next);
    if (!$('.pool button', o)) { Sfx.play('chime'); msg.innerHTML = o.dataset.win || '🎉 Chuẩn trình tự!'; fire(o, 'done'); }
  } else {
    shake(b); Sfx.play('buzz'); msg.innerHTML = '❌ ' + (b.dataset.fb || 'Chưa tới bước này đâu!');
  }
}
/* Chạm hình. Có nhiệm vụ (.hot[data-quest] = [[khóa, câu đố]]): khóa "a|b" = chạm 1 trong 2, "a+b" = phải chạm ĐỦ cả 2 */
const ask = q => `<span class="quest-n">🎯 Nhiệm vụ ${q.i + 1}/${q.list.length}</span> ${q.list[q.i][1]}`;
function askQuest(box) { $('.hot-out', box).innerHTML = ask(box._q); }
function hotShow(el) {
  const box = el.closest('.hot'), [h, ...rest] = el.dataset.tip.split('|'), out = $('.hot-out', box), q = box._q, k = el.dataset.k;
  const why = rest.length ? '<br>' + rest.join('|') : '';
  const lit = () => { $$('[data-tip].act', box).forEach(x => x.classList.remove('act')); el.classList.add('act', 'seen'); };
  if (q) {
    const need = q.list[q.i][0], keys = need.split(/[+|]/), all = need.includes('+');
    if (!keys.includes(k)) { shake(out); Sfx.play('buzz'); out.innerHTML = `❌ Đó là <b>${h}</b> — tìm lại nha!<br>${ask(q)}`; return; }
    if (!q.got.size) lit(); else el.classList.add('act', 'seen');
    if (all) {
      q.got.add(k);
      if (q.got.size < keys.length) { Sfx.play('pop'); burst(el); out.innerHTML = `✅ <b>${h}</b>${why}<div class="quest-ask">👉 Đúng 1 chỗ — còn <b>${keys.length - q.got.size}</b> chỗ nữa!<br>${ask(q)}</div>`; return; }
    }
    fire(box, 'unlock', q.i); q.i++; q.got = new Set(); Sfx.play('chime'); burst(el); praise();
    const fin = q.i >= q.list.length;
    out.innerHTML = `✅ <b>${h}</b>${why}<div class="quest-ask">${fin ? `🎉 <b>Xong ${q.list.length} nhiệm vụ!</b> Bấm ô ghi nhớ bên dưới để ôn, hoặc chạm hình tự do.` : '📌 Đã mở 1 ô ghi nhớ.<br>' + ask(q)}</div>`;
    if (fin) { box._q = null; fire(box, 'done'); later(500, () => { Sfx.play('tada'); confetti(24); }); }
    return;
  }
  out.innerHTML = `<b>${h}</b>${why}`;
  out.classList.remove('flash'); void out.offsetWidth; out.classList.add('flash');
  lit(); Sfx.play('pop');
}
/* Thẻ tra nhanh (trạm 24): mở bảng ngay trong cột phải, không popup */
function showInfo(b) {
  const sc = b.closest('.scene'), ctl = $('.ctl', sc), tp = $('template', b), was = b.classList.contains('on');
  $('.info', ctl)?.remove(); $$('.stk.on', sc).forEach(x => x.classList.remove('on'));
  if (was) { Sfx.play('pop'); return; }
  const box = document.createElement('div');
  box.className = 'info ' + (b.className.match(/k-\w/) || ['k-y'])[0];
  box.innerHTML = `<div class="info-h"><b>${tp.dataset.title}</b><button class="info-x" type="button" aria-label="Gập lại">✕</button></div><div class="info-b">${tp.innerHTML}</div>`;
  ctl.append(box); b.classList.add('on', 'seen'); box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); Sfx.play('peel');
}
function seqStep(btn) {
  const s = btn.closest('.seq'), all = $$('[data-s]', s), max = Math.max(...all.map(x => +x.dataset.s));
  const k = btn.classList.contains('seq-reset') ? 0 : Math.min(+(s.dataset.k || 0) + 1, max);
  s.dataset.k = k;
  all.forEach(x => { x.classList.toggle('on', +x.dataset.s <= k); x.classList.toggle('now', +x.dataset.s === k); });
  $('.seq-next', s).disabled = k === max;
  Sfx.play(k === max ? 'chime' : 'pop');
  $('.seq-list li.now', s)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  if (k === max) { burst(btn); fire(s, 'done'); }
}

document.addEventListener('click', e => {
  const t = e.target; let x;
  if ((x = t.closest('[data-go]'))) return go(+x.dataset.go);
  if ((x = t.closest('.toc-item'))) { drawer(false); return go(+x.dataset.i); }
  if ((x = t.closest('.copy'))) return copyLink();
  if ((x = t.closest('.how-x'))) { x.closest('.how').classList.add('off'); LS.set('howOff', true); Sfx.play('pop'); return; }
  if ((x = t.closest('.how.off'))) { x.classList.remove('off'); LS.set('howOff', false); Sfx.play('pop'); return; }
  if ((x = t.closest('.nt-auto'))) return autoNotes(x);
  if ((x = t.closest('.nt-h'))) return pickNote(+x.parentNode.dataset.i);
  if ((x = t.closest('.bdg'))) { if (!x.classList.contains('lock')) pickNote(+x.dataset.i); return; }
  if ((x = t.closest('.stk'))) return showInfo(x);
  if ((x = t.closest('.info-x'))) { const sc = x.closest('.scene'); x.closest('.info').remove(); $$('.stk.on', sc).forEach(s => s.classList.remove('on')); Sfx.play('pop'); return; }
  if ((x = t.closest('[data-show]'))) {
    const sc = x.closest('.scene');
    $$('[data-pane]', sc).forEach(p => p.classList.toggle('on', p.dataset.pane === x.dataset.show));
    $$('[data-show]', sc).forEach(b => b.classList.toggle('on', b.dataset.show === x.dataset.show)); Sfx.play('pop'); return;
  }
  if ((x = t.closest('.rv'))) { if (!x.classList.contains('on')) { x.classList.add('on'); Sfx.play('pop'); } return; }
  if ((x = t.closest('.quiz .opt'))) return quizPick(x);
  if ((x = t.closest('.sort .bin'))) return sortDrop(x);
  if ((x = t.closest('.order .pool button'))) return orderPick(x);
  if ((x = t.closest('.hot [data-tip]'))) return hotShow(x);
  if ((x = t.closest('.seq-next, .seq-reset'))) return seqStep(x);
});
document.addEventListener('input', e => { if (e.target.matches('input[type=range]')) fillRange(e.target); });
['pointerdown', 'keydown', 'wheel', 'resize'].forEach(ev => addEventListener(ev, unCoach, { passive: true }));
addEventListener('scroll', unCoach, { capture: true, passive: true });

document.addEventListener('keydown', e => {
  const t = e.target;
  if (e.key === 'Escape') return drawer(false);
  if ((e.key === 'Enter' || e.key === ' ') && t.matches('[role=button], .rv, .bin, .hot [data-tip]')) { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
  if (t.matches('input, textarea, select') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (document.body.dataset.view !== 'step' || $('#drawer.open')) return;
  if (e.key === 'ArrowRight') { e.preventDefault(); $('#next').click(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
  else if (e.key === ' ' && !t.matches('button, a')) { e.preventDefault(); $('#next').click(); }
});

let tx = null, ty = 0;
document.addEventListener('touchstart', e => {
  const t = e.target;
  tx = (document.body.dataset.view === 'step' && t.closest('#stage') && !t.closest('input, svg, .no-swipe')) ? e.touches[0].clientX : null;
  ty = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('touchend', e => {
  if (tx == null) return;
  const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
  if (Math.abs(dx) > 70 && Math.abs(dy) < 60) dx < 0 ? $('#next').click() : go(cur - 1);
});

document.addEventListener('DOMContentLoaded', () => {
  buildToc();
  const snd = $('#btnSound');
  const sndIcon = () => { snd.innerHTML = `<span class="i">${Sfx.on ? '🔔' : '🔕'}</span>`; };
  sndIcon(); snd.onclick = () => { Sfx.toggle(); sndIcon(); Sfx.play('pop'); };
  $('#btnSim').onclick = () => { Sfx.play('pop'); go(9); };
  $('#btnRef').onclick = () => { Sfx.play('pop'); go(24); };
  $('#btnToc').onclick = () => drawer(true);
  $('#drawerClose').onclick = () => drawer(false);
  $('#scrim').onclick = () => drawer(false);
  $('#prev').onclick = () => { Sfx.play('pop'); go(cur - 1); };
  $('#next').onclick = () => {
    const b = $('#next');
    if (b.classList.contains('lock')) { shake(b); Sfx.play('buzz'); toast('Làm xong phần tương tác của màn này đã nha 👆'); return; }
    Sfx.play('pop'); cur === N() - 1 ? goMap() : go(cur + 1);
  };
  addEventListener('hashchange', route);
  route();
});
