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

/* 官方梦魇晶石图标 + 属性徽记角标 */
function gemNode(c, size = 52) {
  const g = EMBLEM[c.attr] || EMBLEM['攻击'];
  return `<span class="cc-gem" style="width:${size}px;height:${size}px">
    <img src="assets/icons/梦魇晶石-金.png" alt="${c.attr}水晶" loading="lazy" />
    <svg class="cc-emblem" viewBox="0 0 24 24" style="--ec1:${c.c1};--ec2:${c.c2}" aria-hidden="true"><path d="${g}"/></svg>
  </span>`;
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
        ${gemNode(c, 52)}
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
      <button class="cc-share" data-share-crystal="${c.name}" aria-label="生成分享卡片">分享卡片</button>
    </article>`).join('');
  $$('#crystalGrid .cc-share').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    shareCrystal(b.dataset.shareCrystal);
  }));
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
        <img class="qh-icon" src="assets/icons/晶石-${c.q}.png" alt="${c.q}色晶石" loading="lazy" />
        <span class="q">${c.q}</span><span class="lv">${c.lv}</span></th>`;
    }).join('');

  body.innerHTML = CRYSTAL_MATRIX.rows.map(r => {
    const c = crystalOf(r.name);
    const gem = c ? `<span class="t-gem">${gemNode(c, 24)}</span>` : '';
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
    <button class="share-btn" data-share-pet="${p.name}">生成分享卡片</button>
    ${skills}`;

  $('#modal').classList.add('is-open');
  $('#modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const sb = $('[data-share-pet]');
  if (sb) sb.addEventListener('click', () => sharePet(sb.dataset.sharePet));
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
  ['crystal', 'bead', 'pet', 'saint'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
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

/* ---------- 四圣图鉴 ---------- */
function renderSaints() {
  const wrap = $('#saintGrid');
  if (!wrap) return;
  wrap.innerHTML = SAINTS.map(s => `
    <article class="saint-card" style="--sc:${s.color};--sc-soft:${hexA(s.color, .1)};--sc-line:${hexA(s.color, .3)}">
      <div class="saint-head">
        <span class="saint-emblem">${s.key[0]}</span>
        <div class="saint-title">
          <h3 class="saint-name">${s.key}</h3>
          <span class="saint-en">${s.en}</span>
        </div>
        <span class="saint-role">${s.role}</span>
      </div>
      <p class="saint-desc">${s.desc}</p>
      <div class="saint-base">
        <span class="sb-k">基础加成</span>
        <b class="sb-v">攻击 · 血量 · 速度</b>
        <em class="sb-skin">皮肤 +8%</em>
      </div>
      <ul class="saint-members">
        ${s.members.map(m => `
          <li>
            <span class="sm-name">${m.name}</span>
            <span class="sm-tags">${m.tags.map(t => `<i class="${m.pending ? 'is-pending' : ''}">${t}</i>`).join('')}</span>
          </li>`).join('')}
      </ul>
    </article>`).join('');
}

/* ============================================================
   深色模式
   ============================================================ */
const THEME_KEY = 'xyzw-theme';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const btn = $('#themeBtn');
  if (btn) btn.setAttribute('aria-pressed', String(t === 'dark'));
}
function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  const sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (sysDark ? 'dark' : 'light'));
  const btn = $('#themeBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });
}

/* ============================================================
   滚动定位
   ============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   全站搜索
   ============================================================ */
let SEARCH_INDEX = [];
let SEARCH_HITS = [];

function buildSearchIndex() {
  const idx = [];
  const push = (type, name, sub, text, action) => idx.push({ type, name, sub, text: text.toLowerCase(), action });
  CRYSTALS.forEach(c => push('水晶', c.name, `${c.tag} · ${c.attr}`,
    `${c.name} ${c.tag} ${c.attr} ${c.comment} ${(c.s9 || []).map(x => x[0]).join(' ')}`,
    () => { scrollToSection('crystal'); flashCrystal(c.name); }));
  BEADS.forEach(b => push('鱼珠', b.name, `${b.cost} 灵珠 · ${b.tier}`,
    `${b.name} 灵珠 鱼珠 ${b.tier} ${b.effect} ${b.fit}`, () => scrollToSection('bead')));
  PETS.forEach(p => push('宠物', p.name, `${p.quality}色 · ${p.series}系`,
    `${p.name} ${p.quality} ${p.series} ${p.desc} ${p.skills.map(s => s.name + ' ' + s.kind).join(' ')}`,
    () => { closeSearch(); openPet(p.name); }));
  SAINTS.forEach(s => s.members.forEach(m => push('四圣', m.name, `${s.key} · ${m.tags.join(' / ')}`,
    `${s.key} ${s.en} ${m.name} ${m.tags.join(' ')} ${s.desc}`, () => scrollToSection('saint'))));
  TERMS.forEach(g => g.items.forEach(([k, v]) => push('词条', k, g.title, `${k} ${v} ${g.title}`,
    () => scrollToSection('bead'))));
  SEARCH_INDEX = idx;
}

function flashCrystal(name) {
  const card = $$('#crystalGrid .crystal-card').find(el => {
    const n = el.querySelector('.cc-name');
    return n && n.textContent === name;
  });
  if (!card) return;
  card.classList.add('is-flash');
  setTimeout(() => card.classList.remove('is-flash'), 1600);
}

function openSearch() {
  const s = $('#search');
  s.classList.add('is-open');
  s.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderSearch('');
  setTimeout(() => { const i = $('#searchInput'); if (i) i.focus(); }, 40);
}
function closeSearch() {
  const s = $('#search');
  if (!s || !s.classList.contains('is-open')) return;
  s.classList.remove('is-open');
  s.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  const i = $('#searchInput'); if (i) i.value = '';
}

function renderSearch(q) {
  q = (q || '').trim().toLowerCase();
  const hint = $('#searchHint');
  const res = $('#searchResults');
  if (!q) { hint.style.display = ''; res.innerHTML = ''; SEARCH_HITS = []; return; }
  hint.style.display = 'none';

  const hits = SEARCH_INDEX.map(it => {
    const name = it.name.toLowerCase();
    let score = 0;
    if (name === q) score = 100;
    else if (name.includes(q)) score = 80;
    else if (it.sub.toLowerCase().includes(q)) score = 45;
    else if (it.text.includes(q)) score = 25;
    return { it, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 40);

  SEARCH_HITS = hits.map(h => h.it);
  if (!hits.length) {
    res.innerHTML = `<p class="sr-empty">没有找到「${q}」相关条目</p>`;
    return;
  }
  const order = ['水晶', '灵珠', '宠物', '四圣', '词条'];
  const groups = {};
  hits.forEach(h => { (groups[h.it.type] = groups[h.it.type] || []).push(h.it); });
  let i = 0;
  res.innerHTML = order.filter(t => groups[t]).map(t => `
    <div class="sr-group">
      <div class="sr-type">${t}<span>${groups[t].length}</span></div>
      ${groups[t].map(it => {
        const n = i++;
        return `<button class="sr-item" data-i="${n}"><b>${it.name}</b><span>${it.sub}</span></button>`;
      }).join('')}
    </div>`).join('');
  $$('#searchResults .sr-item').forEach(btn => btn.addEventListener('click', () => {
    const it = SEARCH_HITS[+btn.dataset.i];
    closeSearch();
    if (it) setTimeout(it.action, 60);
  }));
}

function initSearch() {
  buildSearchIndex();
  const btn = $('#searchBtn');
  if (btn) btn.addEventListener('click', openSearch);
  $$('[data-sclose]').forEach(el => el.addEventListener('click', closeSearch));
  const input = $('#searchInput');
  if (input) input.addEventListener('input', e => renderSearch(e.target.value));
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    else if (e.key === 'Escape') closeSearch();
  });
}

/* ============================================================
   移动端底部导航
   ============================================================ */
function initTabbar() {
  const bar = $('#tabbar');
  if (!bar) return;
  const links = $$('#tabbar a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('is-active', l.dataset.target === e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['crystal', 'bead', 'pet', 'saint', 'calendar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

/* ============================================================
   活动日历
   ============================================================ */
const WD = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let calCursor = new Date();

function eventsOn(date) {
  const d = date.getDate();
  return CAL_EVENTS.filter(e => {
    if (e.rule === 'daily') return true;
    if (e.rule === 'weekly') return e.weekday === date.getDay();
    if (e.rule === 'monthly') return d === 1;
    return false;
  });
}

function renderCalendar() {
  const y = calCursor.getFullYear();
  const m = calCursor.getMonth();
  $('#calMonth').textContent = `${y} 年 ${m + 1} 月`;
  const now = new Date();
  const isThisMonth = now.getFullYear() === y && now.getMonth() === m;
  $('#calSub').textContent = isThisMonth ? '本月 · 周期活动参考' : '周期活动参考';

  const first = new Date(y, m, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < startDow; i++) html += '<span class="cal-cell is-blank"></span>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    const evs = eventsOn(date);
    const isToday = isThisMonth && now.getDate() === d;
    const dots = evs.slice(0, 5).map(e => `<i style="background:${e.color}"></i>`).join('');
    html += `<button class="cal-cell${isToday ? ' is-today' : ''}" data-day="${d}">
      <b>${d}</b><span class="cal-dots">${dots}</span></button>`;
  }
  $('#calGrid').innerHTML = html;

  $('#calLegend').innerHTML = CAL_EVENTS.map(e =>
    `<span><i style="background:${e.color}"></i>${e.name}</span>`).join('');

  $$('#calGrid .cal-cell[data-day]').forEach(btn => btn.addEventListener('click', () => {
    $$('#calGrid .cal-cell').forEach(c => c.classList.remove('is-sel'));
    btn.classList.add('is-sel');
    renderCalDay(+btn.dataset.day);
  }));

  const sel = isThisMonth ? now.getDate() : 1;
  const selBtn = $(`#calGrid .cal-cell[data-day="${sel}"]`);
  if (selBtn) { selBtn.classList.add('is-sel'); }
  renderCalDay(sel);
}

function renderCalDay(d) {
  const y = calCursor.getFullYear();
  const m = calCursor.getMonth();
  const date = new Date(y, m, d);
  const evs = eventsOn(date);
  const label = { daily: '每日', weekly: '每周', monthly: '每月' };
  $('#calDay').innerHTML = `
    <div class="cal-day-head">
      <b>${m + 1} 月 ${d} 日</b>
      <span>${WD[date.getDay()]} · ${evs.length} 项</span>
    </div>
    <ul class="cal-day-list">
      ${evs.map(e => `<li><i style="background:${e.color}"></i>
        <div><b>${e.name}</b><span>${e.desc}</span></div>
        <em>${label[e.rule]}</em></li>`).join('')}
    </ul>`;
}

function renderCalRhythm() {
  const groups = [['daily', '每日'], ['weekly', '每周'], ['monthly', '每月']];
  $('#calRhythm').innerHTML = `
    <h3 class="sub-title">周期节奏</h3>
    <div class="rhythm-grid">
      ${groups.map(([rule, lb]) => `
        <div class="rhythm-card">
          <h4>${lb}</h4>
          <ul>${CAL_EVENTS.filter(e => e.rule === rule).map(e => `
            <li><i style="background:${e.color}"></i><b>${e.name}</b><span>${e.desc}</span></li>`).join('')}
          </ul>
        </div>`).join('')}
    </div>
    <p class="compare-note">以上为常规节奏参考，具体开放时间与次数以游戏内公告为准。</p>`;
}

function initCalendar() {
  if (!$('#calGrid')) return;
  renderCalendar();
  renderCalRhythm();
  $('#calPrev').addEventListener('click', () => {
    calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() - 1, 1);
    renderCalendar();
  });
  $('#calNext').addEventListener('click', () => {
    calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() + 1, 1);
    renderCalendar();
  });
}

/* ============================================================
   分享卡片
   ============================================================ */
let shareDataUrl = null;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function attrsPlain(arr) {
  return arr.map(([k, v]) => `${k.replace(/%$/, '')}+${v}${k.endsWith('%') ? '%' : ''}`).join(' ');
}

function drawShare(opt) {
  return new Promise(resolve => {
    const W = 720, H = 980;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    const paint = img => {
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#fdfaf1'); bg.addColorStop(1, '#edf3fd');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = opt.color; ctx.fillRect(0, 0, W, 12);

      ctx.globalAlpha = .07; ctx.fillStyle = opt.color;
      ctx.beginPath(); ctx.arc(W - 30, 80, 190, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;

      ctx.textAlign = 'left';
      ctx.fillStyle = '#16233c';
      ctx.font = '700 46px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(opt.title, 56, 104);
      ctx.fillStyle = opt.color;
      ctx.font = '600 22px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(opt.subtitle, 58, 142);

      if (img) {
        const bx = 56, by = 178, bw = 300, bh = 300;
        ctx.save();
        roundRect(ctx, bx, by, bw, bh, 26); ctx.clip();
        ctx.fillStyle = '#fff'; ctx.fillRect(bx, by, bw, bh);
        const r = Math.min(bw / img.width, bh / img.height);
        const dw = img.width * r, dh = img.height * r;
        ctx.drawImage(img, bx + (bw - dw) / 2, by + (bh - dh) / 2, dw, dh);
        ctx.restore();
        roundRect(ctx, bx, by, bw, bh, 26);
        ctx.strokeStyle = opt.color; ctx.lineWidth = 4; ctx.stroke();
      }

      let ry = 206;
      const rows = opt.rows.slice(0, 4);
      rows.forEach(([k, v]) => {
        ctx.fillStyle = '#7d8ba6';
        ctx.font = '500 18px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(k, 392, ry);
        ctx.fillStyle = '#16233c';
        ctx.font = '700 24px "PingFang SC","Microsoft YaHei",sans-serif';
        let vv = String(v);
        if (ctx.measureText(vv).width > 264) vv = vv.slice(0, 13) + '…';
        ctx.fillText(vv, 392, ry + 30);
        ry += 64;
      });

      ctx.strokeStyle = 'rgba(18,38,70,.12)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(56, 540); ctx.lineTo(664, 540); ctx.stroke();

      ctx.fillStyle = '#48597a';
      ctx.font = '400 21px "PingFang SC","Microsoft YaHei",sans-serif';
      const chars = [...(opt.desc || '')];
      let line = '', yy = 580;
      for (const ch of chars) {
        if (ctx.measureText(line + ch).width > 600) { ctx.fillText(line, 56, yy); line = ch; yy += 34; }
        else line += ch;
        if (yy > 850) break;
      }
      if (line) ctx.fillText(line, 56, yy);

      ctx.strokeStyle = 'rgba(18,38,70,.1)';
      ctx.beginPath(); ctx.moveTo(56, 898); ctx.lineTo(664, 898); ctx.stroke();
      ctx.fillStyle = '#a9741a';
      ctx.font = '700 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('咸鱼之王 · 图鉴站', 56, 936);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#7d8ba6';
      ctx.font = '400 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('brightld.github.io/xyzw-guide', 664, 936);
      ctx.textAlign = 'left';
    };

    const finish = img => {
      paint(img);
      let url = null;
      try { url = cv.toDataURL('image/png'); }
      catch (e) { paint(null); try { url = cv.toDataURL('image/png'); } catch (e2) { url = null; } }
      resolve({ url });
    };

    if (opt.image) {
      const im = new Image();
      im.onload = () => finish(im);
      im.onerror = () => finish(null);
      im.src = opt.image;
    } else finish(null);
  });
}

function openShare(opt) {
  const s = $('#share');
  s.classList.add('is-open');
  s.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#sharePreview').innerHTML = '<div class="share-loading">生成中…</div>';
  $('#shareDownload').disabled = true;
  drawShare(opt).then(({ url }) => {
    shareDataUrl = url;
    if (url) {
      $('#sharePreview').innerHTML = `<img src="${url}" alt="${opt.title} 分享卡片" />`;
      $('#shareDownload').disabled = false;
      $('#shareTip').textContent = '长按图片或右键也可保存';
    } else {
      $('#sharePreview').innerHTML = '<div class="share-fail">当前环境无法直接导出图片<br>请使用在线版或直接截图保存</div>';
      $('#shareTip').textContent = '在线版（GitHub Pages）可直接下载';
    }
  });
}

function closeShare() {
  const s = $('#share');
  if (!s || !s.classList.contains('is-open')) return;
  s.classList.remove('is-open');
  s.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function sharePet(name) {
  const p = PETS.find(x => x.name === name);
  if (!p) return;
  const q = QUALITY[p.quality] || { color: '#cfd8e3' };
  const rows = [['图鉴加成', `${p.atlasType} +${fmt(p.atlasValue)}`]]
    .concat(p.skills.slice(0, 3).map(k => [k.kind, k.name]));
  openShare({
    title: p.name,
    subtitle: `${p.quality}色 · ${p.series}系`,
    color: q.color,
    image: `assets/pets/${p.name}.png`,
    rows,
    desc: p.desc
  });
}

function shareCrystal(name) {
  const c = CRYSTALS.find(x => x.name === name);
  if (!c) return;
  openShare({
    title: c.name,
    subtitle: `${c.tag} · 金色品质`,
    color: c.c2,
    image: 'assets/icons/梦魇晶石-金.png',
    rows: [['0 星', attrsPlain(c.s0)], ['9 星', attrsPlain(c.s9)], ['定位', c.tag]],
    desc: c.comment
  });
}

function initShare() {
  $$('[data-shclose]').forEach(el => el.addEventListener('click', closeShare));
  const dl = $('#shareDownload');
  if (dl) dl.addEventListener('click', () => {
    if (!shareDataUrl) return;
    const a = document.createElement('a');
    a.href = shareDataUrl;
    a.download = '咸鱼之王-图鉴.png';
    document.body.appendChild(a); a.click(); a.remove();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeShare(); });
}

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderLadder();
  renderCrystals();
  renderMatrix();
  renderBeads();
  renderTerms();
  renderPets();
  renderSaints();
  initCalendar();
  initBubbles();
  initReveal();
  initNav();
  initTabbar();
  initCounters();
  initOverlays();
  initCrystalFilter();
  initSearch();
  initShare();

  // 深链：#pet-炎鬃狮 直接打开详情
  const hash = decodeURIComponent(location.hash || '');
  if (hash.startsWith('#pet-')) openPet(hash.slice(5));
});
