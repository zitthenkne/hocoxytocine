/* zitthenk học Oxytocin — lõi: định tuyến hash, âm thanh, widget dùng chung */
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
function confetti(n = 46) {
  const cols = ['#ffd3e0', '#ff8fa3', '#fff1b8', '#cdeedd', '#cfe6fb', '#e4dcff', '#ffe0c2'];
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i'); s.className = 'confetti';
    s.style.cssText = `left:${Math.random() * 100}vw;background:${cols[i % cols.length]};animation-delay:${Math.random() * .6}s;animation-duration:${2 + Math.random() * 1.4}s`;
    document.body.append(s); setTimeout(() => s.remove(), 4200);
  }
}
const roman = n => { let r = ''; for (const [v, s] of [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]) while (n >= v) { r += s; n -= v; } return r || '0'; };
const fmt = (x, d = 1) => (+x.toFixed(d)).toLocaleString('vi-VN');
let timers = [];
const every = (ms, fn) => timers.push(setInterval(fn, ms));
const later = (ms, fn) => timers.push(setTimeout(fn, ms));
const clearTimers = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; };

/* Băng CTG 10 phút: trên = nhịp tim thai, dưới = cơn co. 1px = 1 giây */
function ctg({ freq = 3, dur = 40, base = 140, decel = false, h = 1, pen = true } = {}) {
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
   scenes = [{meta, vis, q, opts:[[nhãn, đúng?, giải thích]]}] */
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
        b.classList.add('right'); Sfx.play('chime');
        $$('.opt', box).forEach(x => x.disabled = true);
        fb.innerHTML = '✅ ' + o[2] + `<br><button class="btn btn-go" type="button">${i < scenes.length - 1 ? 'Tình huống tiếp ▶' : 'Xem kết quả 🎉'}</button>`;
        $('.btn', fb).onclick = () => { i++; i < scenes.length ? draw() : end(); Sfx.play('pop'); };
        fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        missed = true; b.classList.add('wrong'); shake(b); Sfx.play('buzz'); fb.innerHTML = '❌ ' + o[2];
      }
    });
  }
  function end() {
    const n = scenes.length;
    viz.innerHTML = `<div class="stars">${'⭐'.repeat(firstTry)}${'☆'.repeat(n - firstTry)}</div>`;
    box.innerHTML = `<p class="scn-q">Đúng ngay lần đầu ${firstTry}/${n}${firstTry === n ? ' — phản xạ chuẩn bác sĩ trực sanh! 🩺' : '.'}</p><button class="btn" type="button">🔁 Chơi lại</button>`;
    $('button', box).onclick = () => { i = 0; firstTry = 0; draw(); };
    Sfx.play('tada'); if (firstTry === n) confetti();
  }
  draw();
}

/* ---------- Định tuyến & khung ---------- */
let cur = 0;
const N = () => TRAM.length;
const hashFor = i => `#/tram-${i}-${TRAM[i].slug}`;
const go = i => { if (i >= 0 && i < N()) location.hash = hashFor(i); };
const goMap = () => { location.hash = '#/ban-do'; };

function route() {
  const h = location.hash;
  if (h.startsWith('#/ban-do')) return showMap();
  const m = h.match(/^#\/tram-(\d+)/);
  if (m && +m[1] < N()) return showStep(+m[1]);
  location.replace(LS.get('last', null) == null ? hashFor(0) : '#/ban-do');
}

function visit(i) { const v = new Set(LS.get('visited', [])); v.add(i); LS.set('visited', [...v]); LS.set('last', i); return v; }

function showStep(i) {
  clearTimers(); cur = i; document.body.dataset.view = 'step';
  const t = TRAM[i], p = PARTS[t.part], st = $('#stage');
  st.innerHTML = `<article class="sheet in" style="--part:${p.c}">
    ${t.cover ? '' : `<header class="st-head"><span class="ico-bub" aria-hidden="true">${t.icon}</span>
      <div><h1>${t.title}</h1>${t.lead ? `<p class="lead">${t.lead}</p>` : ''}</div></header>`}
    <div class="st-body">${t.html()}</div></article>`;
  const body = $('.st-body', st);
  $$('input[type=range]', body).forEach(fillRange);
  t.mount && t.mount(body);
  $$('.hot[data-quest]', body).forEach(b => { b._q = { list: JSON.parse(b.dataset.quest), i: 0 }; askQuest(b); });
  visit(i); chrome();
  document.title = `${t.cover ? 'Bìa' : 'Trạm ' + i + ' · ' + t.title} — zitthenk học Oxytocin`;
  window.scrollTo(0, 0);
}

function showMap() {
  clearTimers(); document.body.dataset.view = 'map';
  const v = new Set(LS.get('visited', [])), last = LS.get('last', 0);
  const lt = TRAM[last] || TRAM[0];
  let html = `<div class="map-hero"><div><h1>🗺️ Bản đồ toàn bài</h1>
    <p class="mut" style="margin:6px 0 0">Đã ghé <b>${v.size}/${N()}</b> trạm. Đổi máy chỉ cần mở link là thấy ngay mình đang ở đâu.</p></div>
    <a class="btn btn-go" href="${hashFor(last)}">▶ Học tiếp: Trạm ${last} · ${lt.title}</a></div>`;
  PARTS.forEach((p, pi) => {
    const items = TRAM.map((t, i) => [t, i]).filter(([t]) => t.part === pi);
    if (!items.length) return;
    html += `<section class="map-part"><h2 style="--c:${p.c}">${p.name}</h2><div class="map-grid">${items.map(([t, i]) => `
      <a class="map-card ${v.has(i) ? 'done' : ''} ${i === last ? 'here' : ''}" href="${hashFor(i)}" style="--c:${p.c}">
        ${i === last ? '<span class="pin">📍 Bà đang ở đây</span>' : ''}
        <span class="mc-top"><span class="mc-num">${i}</span><span class="mc-ico">${t.icon}</span></span>
        <span class="mc-title">${t.cover ? 'Bìa & mục tiêu' : t.title}</span></a>`).join('')}</div></section>`;
  });
  if (window.COVERAGE) html += `<details class="coverage"><summary>✅ Bảng kiểm: 100% bài giảng nằm ở trạm nào?</summary><ol>${COVERAGE.map(([txt, ids]) =>
    `<li>${txt} → ${ids.map(i => `<a href="${hashFor(i)}">Trạm ${i}</a>`).join(', ')}</li>`).join('')}</ol></details>`;
  html += `<p class="mut small" style="text-align:center;margin-top:24px">Nguồn: Bài giảng “Oxytocics trong sản khoa — Tăng co & Phát khởi chuyển dạ bằng oxytocin”, Bộ môn Phụ Sản ĐHYD TP.HCM (Phạm Văn Đức, Âu Nhựt Luân). Nhãn <span class="xtra">＋ bổ sung</span> = kiến thức ngoài bài giảng (Williams/WHO).</p>`;
  $('#map').innerHTML = html;
  chrome(); document.title = 'Bản đồ — zitthenk học Oxytocin'; window.scrollTo(0, 0);
}

function chrome() {
  const v = LS.get('visited', []), map = document.body.dataset.view === 'map';
  $('.tube').style.setProperty('--p', v.length / N());
  $('.drop-mark').style.left = (cur / (N() - 1) * 100) + '%';
  $('.ptext').textContent = map ? `Bản đồ · đã ghé ${Math.round(v.length / N() * 100)}%` : `${PARTS[TRAM[cur].part].name} · Trạm ${cur}/${N() - 1}`;
  $('#btnView').innerHTML = map ? '<span class="i">📖</span><span class="t">Học từng bước</span>' : '<span class="i">🗺️</span><span class="t">Bản đồ</span>';
  $('#btnView').title = map ? 'Học từng bước' : 'Bản đồ toàn bài';
  $('#prev').disabled = cur === 0;
  $('#next').textContent = cur === N() - 1 ? '🏁 Về bản đồ' : 'Trạm sau →';
  $$('.toc-item').forEach(b => { b.classList.toggle('cur', +b.dataset.i === cur && !map); $('.ck', b).textContent = v.includes(+b.dataset.i) ? '✓' : ''; });
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
  toast(`📋 Đã chép link ${document.body.dataset.view === 'map' ? 'bản đồ' : 'Trạm ' + cur}! Dán qua Zalo/Telegram, mở máy khác là học tiếp liền ✨`);
}

/* ---------- Widget dùng chung (uỷ quyền sự kiện) ---------- */
function fillRange(r) { r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); }

function quizPick(b) {
  const q = b.closest('.quiz'); if (q.classList.contains('done')) return;
  const fb = $('.fb', q);
  if (b.hasAttribute('data-ok')) {
    q.classList.add('done'); b.classList.add('right'); Sfx.play('chime');
    fb.innerHTML = '✅ ' + (b.dataset.fb || q.dataset.ok || 'Chuẩn luôn!');
    q.dispatchEvent(new CustomEvent('solved', { bubbles: true, detail: { first: !q.dataset.miss } }));
  } else {
    q.dataset.miss = 1; b.classList.add('wrong'); shake(b); Sfx.play('buzz');
    fb.innerHTML = '❌ ' + (b.dataset.fb || 'Chưa đúng, thử lại nha!');
  }
}
function sortSel(c) {
  if (c.closest('.bin')) return;
  const s = c.closest('.sort'); $$('.card.sel', s).forEach(x => x.classList.remove('sel'));
  c.classList.add('sel'); Sfx.play('pop');
  $('.sort-msg', s).textContent = '👉 Giờ bấm vào hộp phù hợp!';
}
function sortDrop(bin) {
  const s = bin.closest('.sort'), c = $('.pool .card.sel', s), msg = $('.sort-msg', s);
  if (!c) { msg.textContent = '👆 Chọn 1 sticker trước rồi bấm vào hộp nha!'; shake(bin); return; }
  if (c.dataset.bin === bin.dataset.bin) {
    const chip = document.createElement('i'); chip.textContent = c.textContent.trim().split(/\s+/)[0]; chip.title = c.textContent.trim();
    $('.slot', bin).append(chip); c.remove(); Sfx.play('pop');
    msg.innerHTML = '✅ ' + (c.dataset.why || 'Đúng hộp!');
    if (!$('.pool .card', s)) { msg.innerHTML += ' <b>🎉 Xếp xong hết rồi!</b>'; Sfx.play('chime'); s.classList.add('all-done'); }
  } else {
    shake(c); Sfx.play('buzz'); msg.innerHTML = '❌ Chưa đúng hộp — ' + (c.dataset.hint || 'nghĩ lại chút nha!');
  }
}
function orderPick(b) {
  const o = b.closest('.order'), done = $('.done', o), next = done.children.length, msg = $('.msg', o);
  if (+b.dataset.i === next) {
    const li = document.createElement('li'); li.innerHTML = b.innerHTML; done.append(li); b.remove(); Sfx.play('pop'); msg.textContent = '';
    o.dispatchEvent(new CustomEvent('ordered', { bubbles: true, detail: { step: next } }));
    if (!$('.pool button', o)) { Sfx.play('chime'); msg.innerHTML = o.dataset.win || '🎉 Chuẩn trình tự!'; }
  } else {
    shake(b); Sfx.play('buzz'); msg.innerHTML = '❌ ' + (b.dataset.fb || 'Chưa tới bước này đâu!');
  }
}
function hotShow(el) {
  const box = el.closest('.hot'), [h, ...rest] = el.dataset.tip.split('|'), out = $('.hot-out', box);
  if (box._q) {
    if (!box._q.list[box._q.i][0].split('|').includes(el.dataset.k)) {
      shake(out); Sfx.play('buzz');
      out.innerHTML = `❌ Đó là <b>${h}</b> — tìm lại nha!<br><span class="quest-n">🎯 Nhiệm vụ ${box._q.i + 1}</span> ${box._q.list[box._q.i][1]}`; return;
    }
    const q = box._q; q.i++; Sfx.play('chime');
    const done = q.i >= q.list.length;
    out.innerHTML = `✅ <b>${h}</b>${rest.length ? '<br>' + rest.join('|') : ''}<div class="quest-ask">${done
      ? `🎉 <b>Xong ${q.list.length} nhiệm vụ!</b> Giờ chạm tự do để ôn.` : `<span class="quest-n">🎯 Nhiệm vụ ${q.i + 1}/${q.list.length}</span> ${q.list[q.i][1]}`}</div>`;
    if (done) { box._q = null; later(500, () => { Sfx.play('tada'); confetti(24); }); }
    $$('[data-tip].act', box).forEach(x => x.classList.remove('act')); el.classList.add('act', 'seen'); return;
  }
  out.innerHTML = `<b>${h}</b>${rest.length ? '<br>' + rest.join('|') : ''}`;
  out.classList.remove('flash'); void out.offsetWidth; out.classList.add('flash');
  $$('[data-tip].act', box).forEach(x => x.classList.remove('act')); el.classList.add('act', 'seen'); Sfx.play('pop');
}
/* Sticker → mở bảng kiến thức NGAY trong khung điều khiển (không popup).
   Chữ in đậm biến thành ô ❓ để tự đoán trước rồi chạm lật. */
function showInfo(b) {
  const sc = b.closest('.scene'), ctl = $('.ctl', sc), tp = $('template', b);
  const close = () => { $('.info', ctl)?.remove(); $$('.stk.on', sc).forEach(x => x.classList.remove('on')); };
  if (b.classList.contains('on')) { close(); Sfx.play('pop'); return; }
  close();
  const box = document.createElement('div'), kind = (b.className.match(/k-\w/) || ['k-y'])[0];
  const cloze = kind !== 'k-g';
  const html = cloze ? tp.innerHTML.replace(/<b>(.*?)<\/b>/g, '<span class="rv" tabindex="0" role="button">$1</span>') : tp.innerHTML;
  const n = cloze ? (html.match(/class="rv"/g) || []).length : 0;
  box.className = 'info ' + kind;
  box.innerHTML = `<div class="info-h"><b>${tp.dataset.title}</b><button class="info-x" type="button" aria-label="Gập lại">✕</button></div>
    ${n ? `<p class="info-tip">🫣 ${n} ô ❓ — đoán trong đầu rồi chạm để lật</p>` : ''}<div class="info-b">${html}</div>
    ${n > 1 ? '<button class="btn info-all" type="button">👀 Lật hết</button>' : ''}`;
  const tr = $('.tray', ctl); tr && tr.parentNode === ctl ? ctl.insertBefore(box, tr) : ctl.append(box);
  b.classList.add('on', 'seen'); box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); Sfx.play('peel');
}

/* Nhiệm vụ trên hình: .hot[data-quest] = [[khóa đúng (a|b), câu đố], ...] */
function askQuest(box) {
  const q = box._q, out = $('.hot-out', box);
  out.innerHTML = `<span class="quest-n">🎯 Nhiệm vụ ${q.i + 1}/${q.list.length}</span> ${q.list[q.i][1]}`;
}
function seqStep(btn) {
  const s = btn.closest('.seq'), all = $$('[data-s]', s), max = Math.max(...all.map(x => +x.dataset.s));
  let k = btn.classList.contains('seq-reset') ? 0 : Math.min(+(s.dataset.k || 0) + 1, max);
  s.dataset.k = k;
  all.forEach(x => { x.classList.toggle('on', +x.dataset.s <= k); x.classList.toggle('now', +x.dataset.s === k); });
  $('.seq-next', s).disabled = k === max;
  Sfx.play(k === max ? 'chime' : 'pop');
  s.dispatchEvent(new CustomEvent('seq', { bubbles: true, detail: { k, max } }));
}

document.addEventListener('click', e => {
  const t = e.target; let x;
  if ((x = t.closest('[data-go]'))) return go(+x.dataset.go);
  if ((x = t.closest('.toc-item'))) { drawer(false); return go(+x.dataset.i); }
  if ((x = t.closest('.stk'))) return showInfo(x);
  if ((x = t.closest('.info-x'))) { const sc = x.closest('.scene'); x.closest('.info').remove(); $$('.stk.on', sc).forEach(s => s.classList.remove('on')); Sfx.play('pop'); return; }
  if ((x = t.closest('.info-all'))) { $$('.rv', x.closest('.info')).forEach(r => r.classList.add('on')); Sfx.play('peel'); return; }
  if ((x = t.closest('[data-show]'))) {
    const sc = x.closest('.scene');
    $$('[data-pane]', sc).forEach(p => p.classList.toggle('on', p.dataset.pane === x.dataset.show));
    $$('[data-show]', sc).forEach(b => b.classList.toggle('on', b === x)); Sfx.play('pop'); return;
  }
  if ((x = t.closest('.rv'))) { if (!x.classList.contains('on')) { x.classList.add('on'); Sfx.play('pop'); } return; }
  if ((x = t.closest('.quiz .opt'))) return quizPick(x);
  if ((x = t.closest('.sort .card'))) return sortSel(x);
  if ((x = t.closest('.sort .bin'))) return sortDrop(x);
  if ((x = t.closest('.order .pool button'))) return orderPick(x);
  if ((x = t.closest('.hot [data-tip]'))) return hotShow(x);
  if ((x = t.closest('.seq-next, .seq-reset'))) return seqStep(x);
});
document.addEventListener('input', e => { if (e.target.matches('input[type=range]')) fillRange(e.target); });

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
  tx = (document.body.dataset.view === 'step' && t.closest('#stage') && !t.closest('input, .no-swipe')) ? e.touches[0].clientX : null;
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
  $('#btnCopy').onclick = copyLink;
  $('#btnView').onclick = () => { Sfx.play('pop'); document.body.dataset.view === 'map' ? go(LS.get('last', 0)) : goMap(); };
  $('#btnToc').onclick = () => drawer(true);
  $('#drawerClose').onclick = () => drawer(false);
  $('#scrim').onclick = () => drawer(false);
  $('#prev').onclick = () => { Sfx.play('pop'); go(cur - 1); };
  $('#next').onclick = () => { Sfx.play('pop'); cur === N() - 1 ? goMap() : go(cur + 1); };
  addEventListener('hashchange', route);
  route();
});
