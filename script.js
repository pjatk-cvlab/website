// Mobile menu
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
}

toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    setMenu(false);
    toggle.focus();
  }
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hero eye: the iris follows the pointer (fine pointers only, motion allowed)
const iris = document.getElementById('iris');
const eye = document.querySelector('.eye');
const canFollow =
  matchMedia('(pointer: fine)').matches &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches;

if (iris && eye && canFollow) {
  const MAX_X = 80;  // in SVG user units
  const MAX_Y = 40;
  let frame = 0;

  window.addEventListener('pointermove', (e) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const r = eye.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const nx = Math.max(-1, Math.min(1, dx / (innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (innerHeight / 2)));
      iris.style.transform = `translate(${(nx * MAX_X).toFixed(1)}px, ${(ny * MAX_Y).toFixed(1)}px)`;
    });
  }, { passive: true });

  document.addEventListener('pointerleave', () => { iris.style.transform = ''; });
}

// Hide events whose date has passed; hide the whole list when none are left
const today = new Date().toISOString().slice(0, 10);
document.querySelectorAll('.event[data-date]').forEach((el) => {
  if (el.dataset.date < today) el.remove();
});
const events = document.querySelector('.events');
if (events && !events.children.length) {
  events.previousElementSibling?.remove();
  events.remove();
}
