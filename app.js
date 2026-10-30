/* ============ 咸鱼之王 图鉴站 交互 ============ */

/* ---------- 工具 ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function fmt(n) {
  if (n === undefined || n === null) return '-';
  if (n >= 10000) {
    const v = n / 10000;
    let str;
    if (v >= 100) str = String(Math.round(v));
    else if (v >= 10) str = (Math.round(v * 10) / 10).toString();
    else str = (Math.round(v * 100) / 100).toString();
    return str + '万';
  }
  return String(n);
}
function hexA(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/* ---------- 水晶宝石 SVG ---------- */
const EMBLEM = {
  '攻击': 'M11 2h2v11h-2zM8 13h8v2H8zM10.4 15h3.2v4h-3.2z',
  '生命': 'M12 21C6.5 17.4 4 13.6 4 9.6A3.9 3.9 0 0 1 12 7.6 3.9 3.9 0 0 1 20 9.6c0 4-2.5 7.8-8 11.4z',
  '精准': 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2.4a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2zM11 1h2v4h-2zM11 19h2v4h-2zM1 11h4v2H1zM19 11h4v2h-4z',
  '破甲': 'M12 2l8 5.6-3.2 2.2L12 6.2 7.2 9.8 4 7.6zM11 12h2v10h-2z',
  '暴击': 'M12 2l2.7 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.4 6 20.1l1.7-6.7L2.4 8.9l6.9-.5z',
  '格挡': 'M12 2l8.5 3v6.2c0 5.2-3.6 8.9-8.5 11.3C7.1 20.1 3.5 16.4 3.5 11.2V5z',
  '技能伤害': 'M12 2l1.9 6.6L20.5 10l-6.6 1.9L12 18.5l-1.9-6.6L3.5 10l6.6-1.4zM18 17l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z',
  '免控': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2.6a6.4 6.4 0 1 1 0 12.8 6.4 6.4 0 0 1 0-12.8z',
  '速度': 'M3.4 5.6L10 12l-6.6 6.4L2 16.9 6.1 12 2 7.1zM12 5.6L18.6 12 12 18.4 10.6 16.9 14.7 12 10.6 7.1z',
  '爆伤': 'M12 2c3.4 5.2 6.4 7.4 6.4 11.4A6.4 6.4 0 0 1 5.6 13.4c0-2.1 1-3.2 2.1-4.2-.1 2 .9 3.1 2 3.1 0-4.2-.2-7.3 2.3-10.3z',
  '减伤': 'M12 2l7 2.6v5.6c0 4.4-3 7.6-7 9.4-4-1.8-7-5-7-9.4V4.6zM12 6.4l-3.2 1.2v3c0 2.2 1.3 4 3.2 5.1 1.9-1.1 3.2-2.9 3.2-5.1v-3z'
};

function gemSVG(c1, c2, attr, size = 52) {
  const id = 'g' + Math.random().toString(36).slice(2, 8);
  return `<svg class="cc-gem" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <radialGradient id="${id}b" cx="50%" cy="46%" r="52%">
        <stop offset="0" stop-color="${c1}" stop-opacity=".55"/><stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="50" cy="52" r="44" fill="url(#${id}b)"/>
    <path d="M50 8 L79 23 L92 50 L50 92 L8 50 L21 23 Z" fill="url(#${id})" stroke="rgba(18,38,70,.28)" stroke-width="1.6"/>
    <path d="M50 8 L8 50 L50 92 Z" fill="#fff" opacity=".13"/>
    <path d="M50 8 L92 50 L50 92 Z" fill="#000" opacity=".13"/>
    <path d="M21 23 L79 23 L64 37 L36 37 Z" fill="#fff" opacity=".22"/>
    <path d="M39 15 L50 10 L55 21 L43 26 Z" fill="#fff" opacity=".55"/>
    <path d="M50 8 L79 23 L92 50 L50 92 L8 50 L21 23 Z" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1"/>
    <g transform="translate(37 43) scale(1)" fill="rgba(0,0,0,.28)">
      <path d="${EMBLEM[attr] || EMBLEM['攻击']}"/>
    </g>
    <g transform="translate(36 42) scale(1)" fill="rgba(255,255,255,.96)">
      <path d="${EMBLEM[attr] || EMBLEM['攻击']}"/>
    </g>
  </svg>`;
}

/* ---------- 品质阶梯 ---------- */
const LADDER = [
  { k: '绿', img: '晶石-绿', atk: '100', hp: '500', pct: '5%' },
  { k: '蓝', img: '晶石-蓝', atk: '200', hp: '1000', pct: '10%' },
  { k: '紫', img: '晶石-紫', atk: '400', hp: '2000', pct: '20%' },
  { k: '橙', img: '晶石-橙', atk: '800', hp: '4000', pct: '40%' },
  { k: '红', img: '晶石-红', atk: '1600', hp: '8000', pct: '80%' },
  { k: '金', img: '晶石-金', atk: '3200', hp: '16000', pct: '160%' }
];
function renderLadder() {
  $('#ladder').innerHTML = LADDER.map(q => `
    <div class="ladder-item ${q.k === '金' ? 'is-gold' : ''}">
      <img src="assets/icons/${q.img}.png" alt="${q.k}色梦魇晶石" loading="lazy" />
      <b>${q.k}色</b>
      <span>攻击 +${q.atk}</span>
      <span>生命 +${q.hp}</span>
      <span>其他 +${q.pct}</span>
    </div>`).join('');
}

/* ---------- 水晶卡 ---------- */
function renderCrystals(filter = 'all') {
  const list = filter === 'all' ? CRYSTALS : CRYSTALS.filter(c => c.tag === filter);
  $('#crystalGrid').innerHTML = list.map(c => `
    <article class="crystal-card" style="--tint:${hexA(c.c1, .18)}">
      <div class="cc-top">
        ${gemSVG(c.c1, c.c2, c.attr, 52)}
        <div>
          <h3 class="cc-name">${c.name}</h3>
          <span class="cc-tag">${c.tag} · ${c.attr}</span>
        </div>
        <span class="cc-q">金色</span>
      </div>
      <div class="cc-rows">
        <div class="cc-row"><span class="k">0 星</span><span class="v">${attrs(c.s0)}</span></div>
        <div class="cc-row max"><span class="k">9 星</span><span class="v">${attrs(c.s9)}</span></div>
      </div>
      <p class="cc-note">${c.comment}</p>
    </article>`).join('');
}
function attrs(arr) {
  // 合并同名属性：攻击 +4800 · +22%
  const merged = [];
  arr.forEach(([k, v]) => {
    const pct = k.endsWith('%');
    const key = pct ? k.slice(0, -1) : k;
    const hit = merged.find(m => m.key === key);
    if (hit) hit.parts.push(pct ? `+${v}%` : `+${fmt(v)}`);
    else merged.push({ key, parts: [pct ? `+${v}%` : `+${fmt(v)}`] });
  });
  return merged.map(m => `${m.key} ${m.parts.join(' · ')}`).join('　');
}

/* ---------- 全品质属性矩阵 ---------- */
// 矩阵行名与 CRYSTALS 名称不完全一致，做一次别名映射
const MATRIX_ALIAS = { '生命暴击水晶': '血暴水晶', '技能伤害水晶': '技伤水晶' };
function crystalOf(matrixName) {
  const key = MATRIX_ALIAS[matrixName] || matrixName;
  return CRYSTALS.find(c => c.name === key) || CRYSTALS.find(c => matrixName.startsWith(c.attr));
}
// "攻击 +4800" → 属性名 / 数值 分开，便于上色
function cellHTML(list) {
  return list.map(t => {
    const sp = t.indexOf(' ');
    const k = sp > 0 ? t.slice(0, sp) : t;
    const v = sp > 0 ? t.slice(sp + 1) : '';
    return `<span class="mv"><em>${k}</em>${v}</span>`;
  }).join('');
}

function renderMatrix() {
  const head = $('#matrixHead');
  const body = $('#matrixBody');
  if (!head || !body) return;

  head.innerHTML =
    `<th class="col-n">水晶</th><th class="col-w">权重</th>` +
    CRYSTAL_MATRIX.cols.map(c => {
      const gold = c.q === '金';
      return `<th class="col-q q-${c.q}${gold ? ' is-gold' : ''}">
        <span class="q">${c.q}</span><span class="lv">${c.lv}</span></th>`;
    }).join('');

  body.innerHTML = CRYSTAL_MATRIX.rows.map(r => {
    const c = crystalOf(r.name);
    const gem = c ? `<span class="t-gem">${gemSVG(c.c1, c.c2, c.attr, 24)}</span>` : '';
    const cells = r.cells.map((cell, i) => {
      const isGold = CRYSTAL_MATRIX.cols[i].q === '金';
      if (!cell || !cell.length) return `<td class="mv-cell is-empty${isGold ? ' col-max' : ''}">—</td>`;
      return `<td class="mv-cell${isGold ? ' col-max' : ''}">${cellHTML(cell)}</td>`;
    }).join('');
    return `<tr>
      <td class="col-n">${gem}<span class="t-name">${r.name.replace('水晶', '')}</span></td>
      <td class="col-w"><span class="w">${r.weight}</span></td>
      ${cells}
    </tr>`;
  }).join('');
}

/* ---------- 灵贝洗练规则 ---------- */
function renderTerms() {
  const wrap = $('#termGroups');
  if (!wrap) return;
  wrap.innerHTML = TERMS.map(g => `
    <div class="term-group">
      <div class="tg-head">
        <h5>${g.title}</h5>
        <span class="tg-hint">${g.hint}</span>
      </div>
      <ul class="term-list">
        ${g.items.map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join('')}
      </ul>
    </div>`).join('');
}

/* ---------- 灵珠卡 ---------- */
function renderBeads() {
  $('#beadGrid').innerHTML = BEADS.map(b => `
    <article class="bead-card">
      <div class="bc-head">
        <img class="bc-icon" src="assets/icons/鱼珠.png" alt="技能鱼珠" loading="lazy" />
        <div>
          <h3 class="bc-name">${b.name}</h3>
          <div class="bc-badges">
            <span class="badge cost">${b.cost} 灵珠</span>
            <span class="badge ${b.tier.toLowerCase()}">${b.tier}</span>
          </div>
        </div>
      </div>
      <p class="bc-effect">${b.effect}</p>
      <p class="bc-fit"><b>适配</b>${b.fit}</p>
    </article>`).join('');
}

/* ---------- 宠物 ---------- */
const QUALITY = {
  '金': { color: '#f7c948', order: 1, max: 250 },
  '红': { color: '#ff6b6b', order: 2, max: 200 },
  '橙': { color: '#ff9f43', order: 3, max: 150 },
  '紫': { color: '#b57bff', order: 4, max: 100 },
  '蓝': { color: '#4aa8ff', order: 5, max: 60 },
  '绿': { color: '#4ade80', order: 6, max: 40 },
  '白': { color: '#cfd8e3', order: 7, max: 20 }
};
const SERIES = {
  '海洋': { color: '#57d6ff' },
  '陆地': { color: '#f0a33c' },
  '天空': { color: '#a78bfa' },
  '幻想': { color: '#ff8fb1' }
};
const QUALS = ['金', '红', '橙', '紫', '蓝', '绿', '白'];
let activeQuality = 'all';

function petCard(p) {
  const q = QUALITY[p.quality] || { color: '#cfd8e3' };
  const s = SERIES[p.series] || { color: '#8b9dbd' };
  const passive = p.skills.find(k => k.kind === '被动') || p.skills[0];
  return `<article class="pet-card" data-name="${p.name}"
      style="--q:${q.color};--q-glow:${hexA(q.color, .22)};--s:${s.color};--s-line:${hexA(s.color, .3)}">
    <div class="pet-portrait">
      <img src="assets/pets/${p.name}.png" alt="咸鱼之王 ${p.name} 立绘" loading="lazy" />
      <span class="pet-q">${p.quality}</span>
    </div>
    <h3 class="pet-name">${p.name}</h3>
    <span class="pet-series">${p.series}系</span>
    <div class="pet-atlas">图鉴 ${p.atlasType} <b>+${fmt(p.atlasValue)}</b></div>
    <div class="pet-skill"><em>${passive ? passive.name : ''}</em></div>
  </article>`;
}

function renderPets() {
  const allTab = `<button class="pet-tab ${activeQuality === 'all' ? 'is-active' : ''}" data-q="all"
      style="--q:#7d8ba6"><span class="dot"></span>全部<span class="num">${PETS.length}</span></button>`;
  const tabs = allTab + QUALS.map(q => {
    const n = PETS.filter(p => p.quality === q).length;
    return `<button class="pet-tab ${q === activeQuality ? 'is-active' : ''}" data-q="${q}"
      style="--q:${QUALITY[q].color}">
      <span class="dot"></span>${q}色<span class="num">${n}</span></button>`;
  }).join('');
  $('#petTabs').innerHTML = tabs;

  const isAll = activeQuality === 'all';
  const list = isAll ? PETS : PETS.filter(p => p.quality === activeQuality);
  $('#petMeta').innerHTML = `
    <span>当前档位 <b>${isAll ? '全部' : activeQuality + '色'}</b></span>
    <span>图鉴数量 <b>${list.length} 只</b></span>
    <span>品质 <b>7 档</b></span>
    <span>系列 <b>4 大系</b></span>`;
  $('#petGrid').innerHTML = list.map(petCard).join('');

  $$('#petTabs .pet-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeQuality = btn.dataset.q;
      renderPets();
    });
  });
  $$('#petGrid .pet-card').forEach(card => {
    card.addEventListener('click', () => openPet(card.dataset.name));
  });
}

/* ---------- 宠物详情弹窗 ---------- */
function openPet(name) {
  const p = PETS.find(x => x.name === name);
  if (!p) return;
  const q = QUALITY[p.quality] || { color: '#cfd8e3' };
  const s = SERIES[p.series] || { color: '#8b9dbd' };
  const skills = p.skills.map(k => {
    const cls = k.kind === '觉醒' ? 'awake' : (k.kind === '主动' ? 'active' : '');
    const max = k.levels[k.levels.length - 1] || '';
    const lvRows = k.levels.length > 1
      ? `<details class="skill-details"><summary>查看逐级数值（${k.levels.length} 级）</summary>
          <ul class="skill-lv">${k.levels.map((t, i) => `<li><b>Lv.${i + 1}</b><span>${t}</span></li>`).join('')}</ul>
        </details>` : '';
    return `<div class="skill-block">
      <div class="skill-head">
        <span class="skill-kind ${cls}">${k.kind}</span>
        <span class="skill-name">${k.name}</span>
      </div>
      <p class="skill-text">${max}</p>
      ${lvRows}
    </div>`;
  }).join('');

  $('#modalBody').innerHTML = `
    <div class="mh" style="--q-glow:${hexA(q.color, .25)}">
      <div class="mh-portrait"><img src="assets/pets/${p.name}.png" alt="${p.name} 立绘" /></div>
      <div>
        <h3>${p.name}</h3>
        <div class="mh-tags">
          <span class="badge" style="background:${q.color};color:#0d0903">${p.quality}色</span>
          <span class="badge" style="background:${hexA(s.color, .15)};color:${s.color};border:1px solid ${hexA(s.color, .3)}">${p.series}系</span>
          <span class="badge t2">满级 ${q.max}</span>
        </div>
        <div class="mh-atlas">图鉴加成 ${p.atlasType} <b>+${fmt(p.atlasValue)}</b></div>
      </div>
    </div>
    <p class="mh-desc">“${p.desc}”</p>
    ${skills}`;

  $('#modal').classList.add('is-open');
  $('#modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/* ---------- 通用交互 ---------- */
function initBubbles() {
  const wrap = $('#bubbles');
  let html = '';
  for (let i = 0; i < 16; i++) {
    const size = 6 + Math.random() * 26;
    html += `<span class="bubble" style="left:${Math.random() * 100}%;width:${size}px;height:${size}px;
      animation-duration:${16 + Math.random() * 22}s;animation-delay:${-Math.random() * 30}s"></span>`;
  }
  wrap.innerHTML = html;
}

function initReveal() {
  // 首屏内的元素直接显示，避免打开页面时上半屏是空的
  const vh = window.innerHeight || 800;
  $$('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < vh * .92) el.classList.add('in');
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
}

function initNav() {
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = $$('.links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('is-active', l.dataset.target === e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['crystal', 'bead', 'pet'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
}

function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.round(target / 24));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur;
      }, 28);
      io.unobserve(el);
    });
  }, { threshold: .5 });
  $$('[data-count]').forEach(el => io.observe(el));
}

function initOverlays() {
  const closeAll = () => {
    $('#modal').classList.remove('is-open');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  $$('[data-close]').forEach(el => el.addEventListener('click', closeAll));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
}

function initCrystalFilter() {
  $$('#crystalChips .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#crystalChips .chip').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderCrystals(btn.dataset.filter);
    });
  });
}

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderLadder();
  renderCrystals();
  renderMatrix();
  renderBeads();
  renderTerms();
  renderPets();
  initBubbles();
  initReveal();
  initNav();
  initCounters();
  initOverlays();
  initCrystalFilter();

  // 深链：#pet-炎鬃狮 直接打开详情
  const hash = decodeURIComponent(location.hash || '');
  if (hash.startsWith('#pet-')) openPet(hash.slice(5));
});
