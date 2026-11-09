const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const closeMenu = () => {
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
};

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  if (open) closeMenu();
  else {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
  }
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    closeMenu();
    toggle.focus();
  }
});

const appointmentForm = document.querySelector('#appointment-form');
if (appointmentForm) {
  const dateInput = appointmentForm.querySelector('input[type="date"]');
  const today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(appointmentForm);
    const message = [
      'Hello Lucky Beauty Hair Salon, I would like to request an appointment.',
      `Preferred date: ${formData.get('date')}`,
      `Service: ${formData.get('service')}`,
      `Professional: ${formData.get('stylist')}`
    ].join('\n');
    window.open(`https://wa.me/60143332009?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}

document.querySelectorAll('.style-comparison input[type="range"]').forEach((slider) => {
  slider.addEventListener('input', () => {
    slider.closest('.style-comparison').style.setProperty('--split', `${slider.value}%`);
  });
});

const animatedHero = document.querySelector('#hero');
if (animatedHero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let heroFramePending = false;
  const updateHeroScroll = () => {
    const progress = Math.min(1, Math.max(0, window.scrollY / (animatedHero.offsetHeight * 0.72)));
    const exitProgress = Math.max(0, Math.min(1, (progress - 0.12) / 0.72));
    const copyFade = Math.max(0, 1 - progress / 0.38);
    const reveal = Math.max(0, Math.min(1, (progress - 0.2) / 0.48));
    animatedHero.style.setProperty('--hero-left-shift', `${-47 * exitProgress}vw`);
    animatedHero.style.setProperty('--hero-right-shift', `${47 * exitProgress}vw`);
    animatedHero.style.setProperty('--hero-copy-opacity', `${copyFade}`);
    animatedHero.style.setProperty('--hero-lockup-opacity', `${reveal}`);
    heroFramePending = false;
  };
  window.addEventListener('scroll', () => {
    if (!heroFramePending) {
      heroFramePending = true;
      window.requestAnimationFrame(updateHeroScroll);
    }
  }, { passive: true });
  updateHeroScroll();
}
