/* ============================================================
   RIVA STORE — shop.js  (Shop Page)
   ============================================================ */
import { products } from './products.js';

/* ────────── STATE ────────── */
let filtered = [...products];
let currentModal = null;
let modalSize    = '';
let modalColor   = '';
let favs = JSON.parse(localStorage.getItem('riva_favs') || '[]');
let cardSizes  = {};
let cardColors = {};

/* ────────── REFS ────────── */
const grid         = document.getElementById('productsGrid');
const noResults    = document.getElementById('noResults');
const resultsLabel = document.getElementById('resultsLabel');
const searchInput  = document.getElementById('searchInput');
const searchClear  = document.getElementById('searchClear');
const catFilter    = document.getElementById('catFilter');
const sizeFilter   = document.getElementById('sizeFilter');
const colorFilter  = document.getElementById('colorFilter');
const sortFilter   = document.getElementById('sortFilter');
const resetBtn     = document.getElementById('resetBtn');
const activeTagsEl = document.getElementById('activeTags');
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const navFavBtn    = document.getElementById('navFavBtn');
const favBadge     = document.getElementById('favBadge');
const overlay      = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

/* ────────── NAVBAR ────────── */
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks?.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!navbar?.contains(e.target)) {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');
  }
});

/* ────────── STARS ────────── */
function buildStars(rating) {
  return [1,2,3,4,5].map(i => {
    const c = i <= Math.floor(rating) ? '#F59E0B' : i - .5 <= rating ? 'url(#hg)' : '#E5E7EB';
    return `<svg class="star-svg" viewBox="0 0 14 14" fill="${c}">
      <defs><linearGradient id="hg"><stop offset="50%" stop-color="#F59E0B"/><stop offset="50%" stop-color="#E5E7EB"/></linearGradient></defs>
      <path d="M7 1l1.55 3.14L12 4.64l-2.5 2.44.59 3.44L7 8.77l-3.09 1.75.59-3.44L2 4.64l3.45-.5L7 1z"/>
    </svg>`;
  }).join('');
}

/* ────────── RENDER ────────── */
function renderProducts() {
  grid.innerHTML = '';

  if (!filtered.length) {
    noResults.classList.remove('hidden');
    resultsLabel.innerHTML = `<strong>لا توجد منتجات</strong> مطابقة`;
    return;
  }
  noResults.classList.add('hidden');
  resultsLabel.innerHTML = `عرض <strong>${filtered.length}</strong> من <strong>${products.length}</strong> منتج`;

  filtered.forEach((p, i) => {
    const sc = cardColors[p.id] || p.colors[0];
    const ss = cardSizes[p.id]  || '';
    const fav = favs.includes(p.id);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 0.055}s`;

    const badgeMap = { 'الأكثر مبيعاً':'bestseller', 'جديد':'new', 'تخفيض':'sale' };
    const badgeHTML = p.badge
      ? `<span class="card-badge badge-${badgeMap[p.badge]}">${p.badge}</span>`
      : '';

    const colorsHTML = p.colors.map(c =>
      `<div class="color-circle ${sc.name===c.name?'chosen':''}"
        style="background:${c.hex}" title="${c.name}"
        data-id="${p.id}" data-cn="${c.name}" data-ch="${c.hex}"></div>`
    ).join('');

    const sizesHTML = p.sizes.map(s =>
      `<button class="size-pill ${ss===s?'chosen':''}"
        data-id="${p.id}" data-s="${s}">${s}</button>`
    ).join('');

    const priceHTML = p.originalPrice
      ? `<span class="card-price">${p.price.toLocaleString('ar-EG')} جنيه</span>
         <span class="card-orig-price">${p.originalPrice.toLocaleString('ar-EG')} جنيه</span>`
      : `<span class="card-price">${p.price.toLocaleString('ar-EG')} جنيه</span>`;

    card.innerHTML = `
      <div class="card-img-wrap">
        <img class="card-img" src="${p.images[0]}" alt="${p.name}" loading="lazy" />
        ${badgeHTML}
        <button class="card-fav-btn ${fav?'is-fav':''}" data-id="${p.id}" aria-label="المفضلة">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${fav?'var(--accent)':'none'}" stroke="${fav?'var(--accent)':'currentColor'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-cat">${catLabel(p.category)}</div>
        <div class="card-rating">
          <div class="stars-row">${buildStars(p.rating)}</div>
          <span class="rating-val">${p.rating}</span>
          <span class="rating-cnt">(${p.reviews})</span>
        </div>
        <div class="card-colors">${colorsHTML}</div>
        <div class="card-sizes">${sizesHTML}</div>
        <div class="card-price-row">${priceHTML}</div>
        <div class="card-actions">
          <button class="btn-quick-view" data-id="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            شوفي التفاصيل
          </button>
          <button class="btn-reserve-card" data-id="${p.id}" aria-label="احجزي عبر واتساب">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  updateFavCount();
  attachRipples();
  grid.addEventListener('click', onGridClick, { once: true });
}

function catLabel(c) {
  return c === 'women' ? 'نسائي' : c === 'men' ? 'رجالي' : 'يونيسكس';
}

/* ────────── GRID CLICK ────────── */
function onGridClick(e) {
  const favBtn  = e.target.closest('.card-fav-btn');
  const qvBtn   = e.target.closest('.btn-quick-view');
  const resBtn  = e.target.closest('.btn-reserve-card');
  const colorEl = e.target.closest('.color-circle');
  const sizeEl  = e.target.closest('.size-pill');

  if (favBtn)  handleFavCard(favBtn);
  if (qvBtn)   openModal(+qvBtn.dataset.id);
  if (resBtn) {
    const p  = products.find(x => x.id === +resBtn.dataset.id);
    const sz = cardSizes[p.id]  || 'غير محدد';
    const cl = cardColors[p.id] ? cardColors[p.id].name : p.colors[0].name;
    whatsapp(p, sz, cl);
  }
  if (colorEl) {
    const id = +colorEl.dataset.id;
    cardColors[id] = { name: colorEl.dataset.cn, hex: colorEl.dataset.ch };
    colorEl.closest('.card-colors')?.querySelectorAll('.color-circle').forEach(d =>
      d.classList.toggle('chosen', d.dataset.cn === colorEl.dataset.cn));
  }
  if (sizeEl) {
    const id = +sizeEl.dataset.id;
    cardSizes[id] = sizeEl.dataset.s;
    sizeEl.closest('.card-sizes')?.querySelectorAll('.size-pill').forEach(b =>
      b.classList.toggle('chosen', b.dataset.s === sizeEl.dataset.s));
  }

  grid.addEventListener('click', onGridClick, { once: true });
}

function handleFavCard(btn) {
  const id = +btn.dataset.id;
  toggleFav(id);
  const on = favs.includes(id);
  btn.classList.toggle('is-fav', on);
  const svg = btn.querySelector('svg');
  svg.setAttribute('fill', on ? 'var(--accent)' : 'none');
  svg.setAttribute('stroke', on ? 'var(--accent)' : 'currentColor');
}

/* ────────── FILTERS ────────── */
function applyFilters() {
  const q     = searchInput.value.trim().toLowerCase();
  const cat   = catFilter.value;
  const size  = sizeFilter.value;
  const color = colorFilter.value;
  const sort  = sortFilter.value;

  filtered = products.filter(p => {
    if (q     && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    if (cat   && p.category !== cat)                          return false;
    if (size  && !p.sizes.includes(size))                     return false;
    if (color && !p.colors.some(c => c.name === color))       return false;
    return true;
  });

  if (sort === 'rating')     filtered.sort((a,b) => b.rating - a.rating);
  if (sort === 'price-asc')  filtered.sort((a,b) => a.price  - b.price);
  if (sort === 'price-desc') filtered.sort((a,b) => b.price  - a.price);
  if (sort === 'newest')     filtered.sort((a,b) => b.addedDate - a.addedDate);

  renderProducts();
  renderTags();
}

function renderTags() {
  if (!activeTagsEl) return;
  const tags = [];
  if (catFilter.value)   tags.push({ text: catLabel(catFilter.value),                        clear: () => { catFilter.value = ''; applyFilters(); } });
  if (sizeFilter.value)  tags.push({ text: `المقاس: ${sizeFilter.value}`,                    clear: () => { sizeFilter.value = ''; applyFilters(); } });
  if (colorFilter.value) tags.push({ text: colorFilter.options[colorFilter.selectedIndex].text, clear: () => { colorFilter.value = ''; applyFilters(); } });
  if (searchInput.value) tags.push({ text: `"${searchInput.value}"`,                          clear: () => { searchInput.value = ''; applyFilters(); } });

  activeTagsEl.innerHTML = tags.map((t,i) =>
    `<span class="active-tag" data-i="${i}">${t.text}
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </span>`
  ).join('');
  activeTagsEl.querySelectorAll('.active-tag').forEach((el, i) =>
    el.addEventListener('click', tags[i].clear));
}

[searchInput, catFilter, sizeFilter, colorFilter, sortFilter].forEach(el =>
  el?.addEventListener('change', applyFilters));
searchInput?.addEventListener('input', () => {
  searchClear?.classList.toggle('show', !!searchInput.value);
  applyFilters();
});
searchClear?.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.remove('show');
  applyFilters();
});
resetBtn?.addEventListener('click', () => {
  searchInput.value = '';
  catFilter.value = sizeFilter.value = colorFilter.value = '';
  sortFilter.value = 'newest';
  searchClear?.classList.remove('show');
  applyFilters();
});

/* ────────── MODAL ────────── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentModal  = p;
  modalColor    = (cardColors[id] || p.colors[0]).name;
  modalSize     = cardSizes[id]  || '';

  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalDesc').textContent  = p.description;
  document.getElementById('modalFabric').innerHTML  = `<strong>الخامة:</strong> ${p.fabric}`;
  document.getElementById('modalPrice').textContent = `${p.price.toLocaleString('ar-EG')} جنيه`;

  const origEl = document.getElementById('modalOrig');
  origEl.textContent = p.originalPrice ? `${p.originalPrice.toLocaleString('ar-EG')} جنيه` : '';

  const badgeSlot = document.getElementById('modalBadgeSlot');
  const badgeMap  = { 'الأكثر مبيعاً':'bestseller', 'جديد':'new', 'تخفيض':'sale' };
  badgeSlot.innerHTML = p.badge
    ? `<span class="card-badge badge-${badgeMap[p.badge]}">${p.badge}</span>`
    : '';

  document.getElementById('modalStars').innerHTML       = buildStars(p.rating);
  document.getElementById('modalReviews').textContent   = `${p.rating} (${p.reviews} تقييم)`;

  // Gallery
  const mainImg = document.getElementById('modalImg');
  mainImg.src   = p.images[0];
  const thumbsEl = document.getElementById('modalThumbs');
  thumbsEl.innerHTML = p.images.map((src,i) =>
    `<div class="modal-thumb ${i===0?'on':''}" data-src="${src}">
       <img src="${src}" alt="صورة ${i+1}" loading="lazy" />
     </div>`
  ).join('');
  thumbsEl.querySelectorAll('.modal-thumb').forEach(t => {
    t.addEventListener('click', () => {
      mainImg.src = t.dataset.src;
      thumbsEl.querySelectorAll('.modal-thumb').forEach(x => x.classList.remove('on'));
      t.classList.add('on');
    });
  });

  // Colors
  const colWrap    = document.getElementById('modalColors');
  const colLabel   = document.getElementById('selectedColorLabel');
  colLabel.textContent = modalColor;
  colWrap.innerHTML = p.colors.map(c =>
    `<div class="modal-color-dot ${c.name===modalColor?'on':''}"
      style="background:${c.hex}" title="${c.name}" data-cn="${c.name}"></div>`
  ).join('');
  colWrap.querySelectorAll('.modal-color-dot').forEach(d => {
    d.addEventListener('click', () => {
      modalColor = d.dataset.cn;
      colLabel.textContent = modalColor;
      colWrap.querySelectorAll('.modal-color-dot').forEach(x =>
        x.classList.toggle('on', x.dataset.cn === modalColor));
    });
  });

  // Sizes
  const szWrap  = document.getElementById('modalSizes');
  const szLabel = document.getElementById('selectedSizeLabel');
  szLabel.textContent = modalSize || 'لم يُختر';
  szWrap.innerHTML = p.sizes.map(s =>
    `<button class="modal-size-btn ${s===modalSize?'on':''}" data-s="${s}">${s}</button>`
  ).join('');
  szWrap.querySelectorAll('.modal-size-btn').forEach(b => {
    b.addEventListener('click', () => {
      modalSize = b.dataset.s;
      szLabel.textContent = modalSize;
      szWrap.querySelectorAll('.modal-size-btn').forEach(x =>
        x.classList.toggle('on', x.dataset.s === modalSize));
    });
  });

  // Features
  document.getElementById('modalFeats').innerHTML =
    p.features.map(f => `<li>${f}</li>`).join('');

  // Fav
  const favBtn = document.getElementById('modalFavBtn');
  const isFav  = favs.includes(p.id);
  favBtn.classList.toggle('is-fav', isFav);
  favBtn.querySelector('svg').setAttribute('fill', isFav ? 'var(--accent)' : 'none');
  favBtn.onclick = () => {
    toggleFav(p.id);
    const now = favs.includes(p.id);
    favBtn.classList.toggle('is-fav', now);
    favBtn.querySelector('svg').setAttribute('fill', now ? 'var(--accent)' : 'none');
    toast(now ? '❤️ تم الإضافة للمفضلة' : 'تم الإزالة من المفضلة', now ? 'ok' : '');
  };

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose?.addEventListener('click', closeModal);
overlay?.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('modalReserveBtn')?.addEventListener('click', () => {
  if (!currentModal) return;
  whatsapp(currentModal, modalSize || 'غير محدد', modalColor || currentModal.colors[0].name);
});

/* ────────── WHATSAPP ────────── */
function whatsapp(p, size, color) {

  const code = prompt("اكتب كود الخصم (إجباري):");

  if (!code || code.trim() === "") {
    alert("لازم تكتب كود الخصم عشان تكمل الطلب.");
    return;
  }

  // قيمة الخصم الثابتة لكل الأكواد
  const discount = 300;

  const finalPrice = Math.max(0, p.price - discount);

  const msg = encodeURIComponent(`السلام عليكم 👋

عايزة أحجز:

المنتج: ${p.name}

اللون: ${color}

المقاس: ${size}

كود الخصم: ${code}

السعر الأصلي: ${p.price} جنيه

قيمة الخصم: ${discount} جنيه

السعر النهائي: ${finalPrice} جنيه
`);

  window.open(
    `https://wa.me/201507480809?text=${msg}`,
    "_blank"
  );
}

/* ────────── FAVORITES ────────── */
function toggleFav(id) {
  const i = favs.indexOf(id);
  if (i === -1) favs.push(id);
  else favs.splice(i, 1);
  localStorage.setItem('riva_favs', JSON.stringify(favs));
  updateFavCount();
}
function updateFavCount() {
  if (!favBadge) return;
  favBadge.textContent = favs.length;
  favBadge.classList.toggle('show', favs.length > 0);
}

/* ────────── TOAST ────────── */
let toastT;
function toast(msg, type = '') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ────────── RIPPLE ────────── */
function attachRipples() {
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    if (btn.dataset.rippled) return;
    btn.dataset.rippled = '1';
    btn.addEventListener('click', e => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;`;
      btn.appendChild(wave);
      setTimeout(() => wave.remove(), 700);
    });
  });
}

/* ────────── URL PARAMS ────────── */
const params  = new URLSearchParams(location.search);
const paramCat = params.get('category');
if (paramCat && catFilter) catFilter.value = paramCat;

/* ────────── INIT ────────── */
applyFilters();
updateFavCount();
