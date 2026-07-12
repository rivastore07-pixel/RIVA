/* ============================================================
   RIVA STORE — main.js  (Home Page)
   ============================================================ */

/* ── Navbar ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('open');
  }
});

/* ── Hero Ken Burns ── */
document.querySelector('.hero')?.classList.add('loaded');

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => observer.observe(el));

/* ── Ripple effect ── */
function attachRipple(btn) {
  btn.addEventListener('click', e => {
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const wave   = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top  - size / 2}px;
    `;
    btn.appendChild(wave);
    setTimeout(() => wave.remove(), 700);
  });
}
document.querySelectorAll('.btn-ripple').forEach(attachRipple);

/* ── Testimonials slider ── */
const track   = document.getElementById('testiTrack');
const dots    = document.getElementById('testiDots');
const prevBtn = document.getElementById('testiPrev');
const nextBtn = document.getElementById('testiNext');

if (track) {
  const cards = [...track.querySelectorAll('.testi-card')];
  let current = 0;
  let timer;

  const visible = () =>
    window.innerWidth <= 900 ? 1 :
    window.innerWidth <= 1200 ? 2 : 3;

  const totalSlides = () => Math.ceil(cards.length / visible());

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `شريحة ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dots.appendChild(d);
    }
  }

  function goTo(idx) {
    current = (idx + totalSlides()) % totalSlides();
    const vc  = visible();
    const w   = cards[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${current * vc * w}px)`; // RTL: positive = shift right
    dots?.querySelectorAll('.testi-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5500);
  }

  prevBtn?.addEventListener('click', () => goTo(current + 1)); // RTL: prev arrow goes next physically
  nextBtn?.addEventListener('click', () => goTo(current - 1));

  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { current = 0; buildDots(); goTo(0); }, 250);
  });

  buildDots();
  resetTimer();
}

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href').slice(1);
    const el  = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    }
  });
});
