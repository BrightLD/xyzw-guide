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
    ${skills}`;

  $('#modal').classList.add('is-open');
  $('#modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/* ---------- 玩具图鉴（只展示满级） ---------- */
const TOY_TYPES = {
  '控制': '#4C7DF0',
  '持续': '#E2673C',
  '回复': '#2FA36B',
  '增益': '#8B5CF6'
};
let activeToyType = 'all';

/* 玩具面板量级：攻击统一按万、血量统一按亿，方便表格内对齐 */
function fmtAtk(n) { return Math.round(n / 1e4) + '万'; }
function fmtHp(n) { return (n / 1e8).toFixed(2) + '亿'; }

function toyCard(t) {
  const c = TOY_TYPES[t.type] || '#7d8ba6';
  const extra = t.max.extra.map(([k, v]) => `<span>${k} <b>${v}</b></span>`).join('');
  return `<article class="toy-card" data-name="${t.name}"
      style="--t:${c};--t-soft:${hexA(c, .1)};--t-line:${hexA(c, .3)}">
    <div class="toy-card-top">
      <span class="toy-type">${t.type}</span>
      <span class="toy-max">满级 150 · 5★</span>
    </div>
    <div class="toy-hero">
      <div class="toy-art">
        <img src="assets/toys/${t.name}.png" alt="咸鱼之王 玩具 ${t.name} 图标" loading="lazy" width="80" height="80" />
      </div>
      <div class="toy-id">
        <h3 class="toy-name">${t.name}</h3>
        <div class="toy-panel">
          <div><i>攻击</i><b>${fmtAtk(t.max.atk)}</b></div>
          <div><i>血量</i><b>${fmtHp(t.max.hp)}</b></div>
        </div>
      </div>
    </div>
    <p class="toy-quote">“${t.quote}”</p>
    <div class="toy-extra">${extra}</div>
    <div class="toy-active"><em>${t.active.name}</em><span>主动 Lv.30</span></div>
  </article>`;
}

function renderToys() {
  const chips = $('#toyChips');
  if (!chips) return;
  const types = ['all', ...Object.keys(TOY_TYPES)];
  chips.innerHTML = types.map(t => {
    const n = t === 'all' ? TOYS.length : TOYS.filter(x => x.type === t).length;
    const c = t === 'all' ? '#7d8ba6' : TOY_TYPES[t];
    return `<button class="pet-tab ${activeToyType === t ? 'is-active' : ''}" data-t="${t}" style="--q:${c}">
      <span class="dot"></span>${t === 'all' ? '全部' : t + '型'}<span class="num">${n}</span></button>`;
  }).join('');

  const isAll = activeToyType === 'all';
  const list = isAll ? TOYS : TOYS.filter(t => t.type === activeToyType);
  $('#toyMeta').innerHTML = `
    <span>当前类型 <b>${isAll ? '全部' : activeToyType + '型'}</b></span>
    <span>收录 <b>${list.length} 款</b></span>
    <span>展示口径 <b>满级</b></span>
    <span>被动 <b>4 个 / 款</b></span>`;
  $('#toyGrid').innerHTML = list.map(toyCard).join('');

  $$('#toyChips .pet-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeToyType = btn.dataset.t;
      renderToys();
    });
  });
  $$('#toyGrid .toy-card').forEach(card => {
    card.addEventListener('click', () => openToy(card.dataset.name));
  });
}

/* ---------- 玩具详情弹窗 ---------- */
function openToy(name) {
  const t = TOYS.find(x => x.name === name);
  if (!t) return;
  const c = TOY_TYPES[t.type] || '#7d8ba6';
  const rows = t.passives.map(p => `<tr>
      <td class="tp-name">${p.name}</td>
      <td class="tp-need">${p.need}</td>
      <td>${fmtAtk(p.atk)}</td>
      <td>${fmtHp(p.hp)}</td>
      <td>${p.extra ? p.extra[0] + ' +' + p.extra[1] : '—'}</td>
    </tr>`).join('');

  $('#modalBody').innerHTML = `
    <div class="mh">
      <div class="toy-emblem" style="--t:${c};--t-soft:${hexA(c, .12)};--t-line:${hexA(c, .3)}">
        <img src="assets/toys/${t.name}.png" alt="咸鱼之王 玩具 ${t.name} 图标" />
      </div>
      <div>
        <h3>${t.name}</h3>
        <div class="mh-tags">
          <span class="badge" style="background:${c};color:#fff">${t.type}型</span>
          <span class="badge" style="background:${hexA(c, .12)};color:${c};border:1px solid ${hexA(c, .3)}">${t.mark}</span>
          <span class="badge t2">满级 Lv.150 · 5★</span>
        </div>
        <div class="mh-atlas">满级面板 攻击 <b>${fmtAtk(t.max.atk)}</b> · 血量 <b>${fmtHp(t.max.hp)}</b></div>
      </div>
    </div>
    <p class="mh-desc">“${t.quote}”</p>
    <div class="skill-block">
      <div class="skill-head">
        <span class="skill-kind active">主动</span>
        <span class="skill-name">${t.active.name}</span>
        <span class="toy-lvtag">Lv.30 满级</span>
      </div>
      <p class="skill-text">${t.active.text}</p>
    </div>
    <h4 class="toy-sub">被动加成 · 4 项全满级</h4>
    <table class="toy-table">
      <thead><tr><th>被动</th><th>解锁</th><th>攻击</th><th>血量</th><th>附加属性</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="toy-fit"><b>怎么选</b>${t.fit}</p>`;

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
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
          <li${m.pending ? ' class="is-pending"' : ''} data-saint="${s.key}" data-member="${m.name}" tabindex="0" role="button" aria-label="查看 ${s.key}·${m.name} 四圣详情">
            <span class="sm-av">
              <img src="assets/saints/${s.key}-${m.name}.png" alt="咸鱼之王 ${s.key}·${m.name} 皮肤立绘" loading="lazy" width="185" height="190" />
            </span>
            <span class="sm-name">${m.name}</span>
            <span class="sm-tags">${m.tags.map(t => `<i class="${m.pending ? 'is-pending' : ''}">${t}</i>`).join('')}</span>
            <span class="sm-go" aria-hidden="true">›</span>
          </li>`).join('')}
      </ul>
    </article>`).join('');

  $$('#saintGrid .saint-members li').forEach(li => {
    const go = () => openSaint(li.dataset.saint, li.dataset.member);
    li.addEventListener('click', go);
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
}

/* 四圣详情：大图 + 每阶节点 + 红玉消耗 */
function openSaint(key, name) {
  const s = SAINTS.find(x => x.key === key);
  const m = s && s.members.find(x => x.name === name);
  if (!s || !m) return;
  const c = s.color;

  const nodes = SAINT_TIERS.filter(t => t.unlock && t.unlock !== '—').map(t => `
    <span class="sc-node"><b>${t.node}</b>${t.unlock}</span>`).join('');

  const rows = SAINT_TIERS.map(t => `<tr>
      <td class="st-range">${t.from}–${t.to} 阶</td>
      <td class="st-red"><b>${t.red}</b> 颗</td>
      <td class="st-total">${t.total} 颗</td>
      <td class="st-tip">${t.tip}</td>
    </tr>`).join('');

  $('#modalBody').innerHTML = `
    <div class="sc-hero" style="--sc:${c};--sc-soft:${hexA(c, .1)};--sc-line:${hexA(c, .3)}">
      <div class="sc-art">
        <img src="assets/saints/${s.key}-${m.name}.png" alt="咸鱼之王 ${s.key}·${m.name} 四圣皮肤立绘" width="185" height="190" />
      </div>
      <div class="sc-id">
        <span class="sc-saint"><i>${s.key[0]}</i>${s.key} · ${s.en}</span>
        <h3>${m.name}</h3>
        <div class="mh-tags">
          ${m.tags.map(t => `<span class="badge" style="background:${hexA(c, .12)};color:${c};border:1px solid ${hexA(c, .3)}">${t}</span>`).join('')}
          <span class="badge t2">四圣 ${s.role}</span>
        </div>
        <p class="sc-line">${s.desc}</p>
      </div>
    </div>

    <h4 class="toy-sub">阶级节点 · 升级解锁</h4>
    <div class="sc-nodes">${nodes}</div>

    <h4 class="toy-sub">升阶消耗 · 四圣红玉</h4>
    <table class="st-table">
      <thead><tr><th>阶级</th><th>每阶红玉</th><th>本档累计</th><th>说明</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="sc-sum">
      <div><i>满 50 阶红玉</i><b>1500 颗</b></div>
      <div><i>同期蓝玉（期望）</i><b>约 10.3 万</b></div>
      <div><i>每阶属性</i><b>攻/血 +0.2% · 速度 +40</b></div>
    </div>

    <p class="toy-fit"><b>怎么升</b>共鸣洗练顶到当前阶上限后，才能用红玉突破下一阶，突破同时抬高共鸣上限，属性再涨一截。红玉主要来自四圣活动掉落：白嫖全程不漏体力约 25–30 颗/月，微氪加每日礼包能多 40–50 颗。所以正常节奏是——主 C 先推 10 阶拿击杀播报，15 阶左右看手感，20 阶以后只喂一个位置。</p>`;

  $('#modal').classList.add('is-open');
  $('#modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
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
   分区视图（导航只显示对应一块）
   ============================================================ */
const VIEW_IDS = ['crystal', 'bead', 'pet', 'toy', 'saint', 'calendar'];
let currentView = 'crystal';

function markNavActive(id) {
  $$('.links a[data-target], #tabbar a[data-target], .nav-cal[data-target]').forEach(l => {
    l.classList.toggle('is-active', l.dataset.target === id);
  });
}

function revealSection(id) {
  const sec = document.getElementById(id);
  if (!sec) return;
  sec.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

function setView(id, opts = {}) {
  const { updateHash = true, scrollTop = true } = opts;
  if (!VIEW_IDS.includes(id)) id = 'crystal';
  currentView = id;
  const main = document.querySelector('main');
  if (main) main.setAttribute('data-view', id);
  markNavActive(id);
  revealSection(id);
  if (updateHash) {
    const want = '#' + id;
    if ((location.hash || '') !== want) {
      try { history.replaceState(null, '', want); } catch (e) {}
    }
  }
  if (scrollTop) {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    catch (e) { window.scrollTo(0, 0); }
  }
}

function scrollToSection(id) {
  setView(id);
}

function applyHashView(isInit) {
  const raw = decodeURIComponent(location.hash || '');
  if (raw.startsWith('#pet-')) {
    setView('pet', { updateHash: false, scrollTop: !!isInit });
    openPet(raw.slice(5));
    return;
  }
  if (raw.startsWith('#toy-')) {
    setView('toy', { updateHash: false, scrollTop: !!isInit });
    openToy(raw.slice(5));
    return;
  }
  if (raw.startsWith('#saint-')) {
    // 形如 #saint-青龙-诸葛亮
    const rest = raw.slice(7);
    const i = rest.indexOf('-');
    const key = i > 0 ? rest.slice(0, i) : '';
    const name = i > 0 ? rest.slice(i + 1) : '';
    setView('saint', { updateHash: false, scrollTop: !!isInit });
    if (key && name) openSaint(key, name);
    return;
  }
  const id = raw.replace(/^#/, '');
  if (VIEW_IDS.includes(id)) {
    setView(id, { updateHash: false, scrollTop: false });
    if (isInit) window.scrollTo(0, 0);
  } else {
    // #top / 空 / 未知 → 默认水晶 + hero
    setView('crystal', { updateHash: false, scrollTop: false });
  }
}

function initViewMode() {
  const onNavClick = e => {
    const a = e.target.closest('a[data-target]');
    if (!a) return;
    const id = a.dataset.target;
    if (!VIEW_IDS.includes(id)) return;
    e.preventDefault();
    setView(id);
  };
  const desktop = document.querySelector('.links');
  if (desktop) desktop.addEventListener('click', onNavClick);
  const bar = $('#tabbar');
  if (bar) bar.addEventListener('click', onNavClick);

  // brand / hero CTA 等其它 hash 链接
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    if (a.closest('.links') || a.closest('#tabbar')) return;
    const href = a.getAttribute('href') || '';
    if (href.length < 2) return;
    const id = decodeURIComponent(href.slice(1));
    if (id === 'top') {
      e.preventDefault();
      setView('crystal');
      return;
    }
    if (VIEW_IDS.includes(id)) {
      e.preventDefault();
      setView(id);
    }
  });

  window.addEventListener('hashchange', () => applyHashView(false));
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
    () => { closeSearch(); setView('pet', { updateHash: false, scrollTop: false }); openPet(p.name); }));
  TOYS.forEach(t => push('玩具', t.name, `${t.type}型 · ${t.mark}`,
    `${t.name} 玩具 ${t.type} ${t.mark} ${t.active.name} ${t.active.text} ${t.fit} ${t.max.extra.map(x => x[0]).join(' ')}`,
    () => { closeSearch(); setView('toy', { updateHash: false, scrollTop: false }); openToy(t.name); }));
  SAINTS.forEach(s => s.members.forEach(m => push('四圣', m.name, `${s.key} · ${m.tags.join(' / ')}`,
    `${s.key} ${s.en} ${m.name} ${m.tags.join(' ')} ${s.desc} 红玉 升阶`,
    () => { closeSearch(); setView('saint', { updateHash: false, scrollTop: false }); openSaint(s.key, m.name); })));
  TERMS.forEach(g => g.items.forEach(([k, v]) => push('词条', k, g.title, `${k} ${v} ${g.title}`,
    () => scrollToSection('bead'))));
  if (typeof PEACH !== 'undefined') {
    const toPeach = () => {
      closeSearch();
      setView('calendar', { updateHash: false, scrollTop: false });
      setTimeout(() => { const p = $('#peachPanel'); if (p) p.scrollIntoView({ block: 'start' }); }, 60);
    };
    push('日历', PEACH.name, '每月前 3 个周日 · 俱乐部 1v1',
      `蟠桃园 天官赐福 蟠桃大会 瑶池仙踪 入梦铃 蟠桃船 军团币 曜晶徽记 白玉 彩玉 报名 20:00`, toPeach);
    push('日历', PEACH.meet.title, '打 · 报名 8:00–18:00 · 开赛 20:00–20:30',
      `蟠桃大会 俱乐部 1v1 拉力赛 蟠桃船 七仙女 积分 军团币 曜晶徽记 大乔 皮肤 头像框 背景墙 赐福道具`, toPeach);
    push('日历', PEACH.pool.title, '拿 · 每月 1 日刷新任务',
      `瑶池仙踪 俱乐部任务 个人任务 白玉 彩玉 金砖 招募令 蟠桃礼盒 复活丹 珍珠 积分档位`, toPeach);
  }
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
  const order = ['水晶', '灵珠', '宠物', '玩具', '四圣', '词条', '日历'];
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
  // 点击与高亮由 initViewMode / setView 统一处理
}

/* ============================================================
   活动日历
   ============================================================ */
const WD = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const DAY_MS = 86400000;
let calCursor = new Date();
let calSel = new Date();

/* 日期 -> 天序号（用 UTC 归一，避免时区/夏令时误差） */
const dayNum = d => Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
const numToDate = n => {
  const t = new Date(n * DAY_MS);
  return new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate());
};
const parseYMD = str => { const [y, m, d] = str.split('-').map(Number); return new Date(y, m - 1, d); };

/* 周期事件与 [from,to] 相交的所有区间 -> [[startDay, endDay], ...] */
function cycleRanges(ev, from, to) {
  const a = dayNum(parseYMD(ev.anchor));
  const c = ev.cycle, dur = ev.dur || 1;
  const k = Math.floor((from - a) / c);
  const out = [];
  for (let i = k - 1; i <= k + Math.ceil((to - from) / c) + 2; i++) {
    const st = a + i * c, en = st + dur - 1;
    if (en >= from && st <= to) out.push([st, en]);
  }
  return out;
}

/* 「每月第 n 个周日」：枚举覆盖到的月份，取第 1/2/3 个周日 */
function monthlySundayRanges(ev, from, to) {
  const base = numToDate(from);
  const out = [];
  for (let k = -1; k <= 2; k++) {
    const first = new Date(base.getFullYear(), base.getMonth() + k, 1);
    const firstSun = 1 + (7 - first.getDay()) % 7;   // 1 号之后第一个周日是几号
    (ev.nth || [1, 2, 3]).forEach(n => {
      const num = dayNum(new Date(first.getFullYear(), first.getMonth(), firstSun + (n - 1) * 7));
      if (num >= from && num <= to) out.push([num, num]);
    });
  }
  return out.sort((a, b) => a[0] - b[0]);
}

/* 统一入口：周活动按 anchor+cycle 推算，蟠桃园按「每月第 n 个周日」推算 */
function eventRanges(ev, from, to) {
  return ev.kind === 'monthly-sunday' ? monthlySundayRanges(ev, from, to) : cycleRanges(ev, from, to);
}

/* 某天生效的周活动 -> [{ ev, left }]（left = 含当天在内的剩余天数） */
function eventsOn(date) {
  const n = dayNum(date);
  const out = [];
  CAL_EVENTS.forEach(ev => {
    const r = eventRanges(ev, n, n)[0];
    if (r) out.push({ ev, left: r[1] - n + 1 });
  });
  return out;
}

/* 渲染一周：日期数字行 + 跨天事件条 */
function weekHTML(wStart, y, m, todayN) {
  const ws = dayNum(wStart), we = ws + 6;

  let nums = '';
  for (let i = 0; i < 7; i++) {
    const dt = numToDate(ws + i);
    const inMonth = dt.getMonth() === m && dt.getFullYear() === y;
    const cls = ['cw-num'];
    if (!inMonth) cls.push('is-out');
    if (ws + i === todayN) cls.push('is-today');
    if (calSel && dayNum(calSel) === ws + i) cls.push('is-sel');
    nums += `<button class="${cls.join(' ')}" data-date="${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}"><b>${dt.getDate()}</b></button>`;
  }

  // 只画落在本月范围内的部分（上月/下月的格子留空，与游戏内日历一致）
  const ms = dayNum(new Date(y, m, 1)), me = dayNum(new Date(y, m + 1, 0));
  const bars = [];
  CAL_EVENTS.forEach((ev, evIdx) => {
    eventRanges(ev, ws, we).forEach(([st, en]) => {
      const si = Math.max(st, ws, ms), ei = Math.min(en, we, me);
      if (ei < si) return;
      const seg = {
        left: (si - ws) / 7 * 100,
        width: (ei - si + 1) / 7 * 100,
        cutL: st < si,
        cutR: en > ei,
        start: si,
        evIdx,
        days: ei - si + 1,
        color: ev.color
      };
      bars.push({ ...seg, label: ev.name, task: false });
      if (ev.task) bars.push({ ...seg, label: ev.task, task: true });
    });
  });
  /* 先按起始日，再按事件顺序，最后让对应达标紧跟在自己的周活动下面 */
  bars.sort((a, b) => a.start - b.start || a.evIdx - b.evIdx || (a.task ? 1 : 0) - (b.task ? 1 : 0));

  const barsHTML = bars.map(b => {
    const cls = ['cw-bar'];
    if (b.task) cls.push('is-task');
    if (b.cutL) cls.push('cut-l');
    if (b.cutR) cls.push('cut-r');
    return `<div class="${cls.join(' ')}" style="margin-left:${b.left.toFixed(3)}%;width:${b.width.toFixed(3)}%;--c:${b.color}" title="${b.label}">${b.label}</div>`;
  }).join('');

  return `<div class="cal-week">
    <div class="cw-nums">${nums}</div>
    <div class="cw-bars">${barsHTML}</div>
  </div>`;
}

function renderCalendar() {
  const y = calCursor.getFullYear(), m = calCursor.getMonth();
  $('#calMonth').textContent = `${y} 年 ${m + 1} 月`;
  const now = new Date();
  const isThisMonth = now.getFullYear() === y && now.getMonth() === m;
  $('#calSub').textContent = isThisMonth ? '本月 · 周期活动一览' : '周期活动一览';

  const first = new Date(y, m, 1);
  const startDow = first.getDay();                      // 周日起始
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const rows = Math.ceil((startDow + daysInMonth) / 7);
  const gridStart = new Date(y, m, 1 - startDow);
  const todayN = dayNum(now);

  let html = '';
  for (let r = 0; r < rows; r++) {
    const wStart = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + r * 7);
    html += weekHTML(wStart, y, m, todayN);
  }
  $('#calGrid').innerHTML = html;

  $('#calLegend').innerHTML = CAL_EVENTS.map(e =>
    `<span><i style="background:${e.color}"></i>${e.name}</span>`).join('');

  renderCalDay(calSel);
}

function renderCalDay(date) {
  const list = eventsOn(date);
  const rows = [];
  list.forEach(({ ev, left }) => {
    const tag = ev.tag || (left === 1 ? '今天最后一天' : `剩 ${left} 天`);
    rows.push({ name: ev.name, color: ev.color, desc: ev.desc, tag, urgent: !ev.tag && left === 1, task: false });
    if (!ev.task) return;
    rows.push({
      name: ev.task, color: ev.color, task: true, urgent: left === 1, tag,
      desc: `${ev.name}的对应达标，与周活动同期开启、同期结束。`
    });
  });

  $('#calDay').innerHTML = `
    <div class="cal-day-head">
      <b>${date.getMonth() + 1} 月 ${date.getDate()} 日</b>
      <span>${WD[date.getDay()]} · ${rows.length} 项进行中</span>
    </div>
    <ul class="cal-day-list">
      ${rows.map(e => `<li${e.task ? ' class="is-task"' : ''}><i style="background:${e.color}"></i>
        <div><b>${e.name}</b><span>${e.desc}</span></div>
        <em${e.urgent ? ' class="is-urgent"' : ''}>${e.tag}</em></li>`).join('')}
    </ul>`;
}

function renderCalRhythm() {
  const period = CAL_EVENTS.filter(e => e.kind !== 'monthly-sunday');
  $('#calRhythm').innerHTML = `
    <h3 class="sub-title">三周轮换 · 周活动与对应达标</h3>
    <div class="rhythm-grid">
      ${period.map(e => `
        <div class="rhythm-card">
          <h4><i style="background:${e.color}"></i>${e.name}</h4>
          <p class="rc-task">对应达标 · <b>${e.task}</b></p>
          <p class="rc-desc">${e.desc}</p>
        </div>`).join('')}
    </div>
    <p class="compare-note">三个周活动每 7 天轮换一次、每周五开启，各自的达标任务与周活动同期开启；具体档位与开放时间以游戏内公告为准。</p>`;
}

/* ---------- 蟠桃园（天官赐福） ---------- */
function renderPeach() {
  const el = $('#peachPanel');
  if (!el || typeof PEACH === 'undefined') return;
  const p = PEACH;
  const chips = arr => arr.map(t => `<i>${t}</i>`).join('');

  el.innerHTML = `
    <h3 class="sub-title">蟠桃园 · 每月前 3 个周日</h3>
    <p class="peach-intro">${p.intro}</p>

    <div class="peach-facts">
      ${p.facts.map(f => `
        <div class="pf">
          <i>${f.k}</i><b>${f.v}</b><span>${f.n}</span>
        </div>`).join('')}
    </div>

    <div class="peach-grid">
      <article class="peach-card" style="--c:${p.color}">
        <header>
          <span class="peach-tag">${p.meet.tag}</span>
          <h4>${p.meet.title}</h4>
        </header>
        <ol class="peach-flow">
          ${p.meet.flow.map(([k, v], i) => `
            <li><i>${i + 1}</i><div><b>${k}</b><span>${v}</span></div></li>`).join('')}
        </ol>
        <div class="peach-loot"><em>结算</em>${chips(p.meet.loot)}</div>
        <p class="peach-sub">${p.meet.note}</p>
      </article>

      <article class="peach-card" style="--c:${p.color}">
        <header>
          <span class="peach-tag">${p.pool.tag}</span>
          <h4>${p.pool.title}</h4>
        </header>
        <p class="peach-cycle">${p.pool.cycle}</p>
        <div class="peach-tiers">
          ${p.pool.tiers.map(([s, v]) => `<div><i>${s}</i><span>${v}</span></div>`).join('')}
        </div>
        <div class="peach-loot"><em>俱乐部</em>${chips(p.pool.club.loot)}</div>
        <div class="peach-loot"><em>个人</em>${chips(p.pool.personal.loot)}</div>
      </article>
    </div>

    <div class="peach-tasks">
      ${[p.pool.club, p.pool.personal].map(g => `
        <div class="pt-col">
          <h5>${g.name}</h5>
          <ul>${g.tasks.map(([n, d]) => `<li><b>${n}</b><span>${d}</span></li>`).join('')}</ul>
        </div>`).join('')}
    </div>

    <div class="peach-tips">
      <h5>怎么打</h5>
      <ul>${p.tips.map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul>
    </div>

    <p class="compare-note">入梦铃门槛随赛季提高，任务与奖励数值以游戏内公告为准；本页按「每月第 1–3 个周日」推算，实际开放以官方排期为准。</p>`;
}


function initCalendar() {
  if (!$('#calGrid')) return;
  calSel = new Date();
  renderCalendar();
  renderCalRhythm();
  renderPeach();

  $('#calGrid').addEventListener('click', ev => {
    const btn = ev.target.closest('.cw-num');
    if (!btn) return;
    const [y, m, d] = btn.dataset.date.split('-').map(Number);
    calSel = new Date(y, m - 1, d);
    if (y !== calCursor.getFullYear() || m - 1 !== calCursor.getMonth()) {
      calCursor = new Date(y, m - 1, 1);
    }
    renderCalendar();
  });

  $('#calPrev').addEventListener('click', () => {
    calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() - 1, 1);
    renderCalendar();
  });
  $('#calNext').addEventListener('click', () => {
    calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() + 1, 1);
    renderCalendar();
  });
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
  renderToys();
  renderSaints();
  initCalendar();
  initBubbles();
  initReveal();
  initNav();
  initTabbar();
  initViewMode();
  initCounters();
  initOverlays();
  initCrystalFilter();
  initSearch();

  // 深链 / 默认分区：#pet-名称 开详情；#crystal 等切视图
  applyHashView(true);
});
