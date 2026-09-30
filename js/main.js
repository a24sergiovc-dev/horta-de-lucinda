document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const navToggle = document.querySelector('.nav-toggle');

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const currentYear = document.querySelector('[data-current-year]');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const setVisibility = () => {
      const shouldShow = window.scrollY > 220;
      backToTop.classList.toggle('visible', shouldShow);
    };

    setVisibility();
    window.addEventListener('scroll', setVisibility, { passive: true });
  }
});
