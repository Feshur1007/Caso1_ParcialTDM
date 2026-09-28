const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
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
  const tipo = (data.get('tipo') || '').toString();
  const mensaje = (data.get('mensaje') || '').toString().trim();
  if (nombre.length < 3) return error('texto error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error('texto error');
  if (!tipo) return error('texto error');
  if (mensaje.length < 10) return error('texto error');
  msg.className = 'form-msg ok';
  msg.textContent = 'texto exito';
  form.reset();
});
function error(t) {
  msg.className = 'form-msg err';
  msg.textContent = t;
}
