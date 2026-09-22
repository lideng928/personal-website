const menu = document.querySelector('.menu');
const nav = document.querySelector('#primary-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.addEventListener('click', (e) => {
  if (e.target.matches('a')) {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }
});
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('#primary-nav a')];
const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    links.forEach((link) =>
      link.classList.toggle('active', link.hash === `#${visible.target.id}`),
    );
  },
  { rootMargin: '-35% 0px -55%' },
);
sections.forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
