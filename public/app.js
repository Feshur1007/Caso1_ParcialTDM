const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.textContent = isOpen ? '✕' : '☰';
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menú');
  })
);
document.getElementById('year').textContent = new Date().getFullYear();
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nombre = (data.get('nombre') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  if (nombre.length < 2) return error('Escribe tu nombre para continuar.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error('Escribe un correo electrónico válido.');
  msg.className = 'form-msg ok';
  msg.textContent = `¡Gracias, ${nombre}! Te avisaremos cuando haya novedades de BRUMA.`;
  form.reset();
});
function error(t) {
  msg.className = 'form-msg err';
  msg.textContent = t;
}