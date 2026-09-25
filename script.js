document.addEventListener('DOMContentLoaded', () => {

  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const desktopNavigation = window.matchMedia('(min-width: 1024px)');
  let menuOpen = false;
  let previousBodyOverflow = '';

  const setMenuState = (open, returnFocus = false) => {
    if (open && !menuOpen) {
      previousBodyOverflow = document.body.style.overflow;
    }

    menuOpen = open;
    mobileToggle.classList.toggle('active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('hidden', !open);
    document.body.style.overflow = open ? 'hidden' : previousBodyOverflow;

    if (returnFocus) {
      mobileToggle.focus();
    }
  };

  mobileToggle.addEventListener('click', () => {
    setMenuState(!menuOpen);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      setMenuState(false, true);
    }
  });

  const closeDesktopMenu = (event) => {
    if (event.matches && menuOpen) {
      setMenuState(false);
    }
  };

  if (typeof desktopNavigation.addEventListener === 'function') {
    desktopNavigation.addEventListener('change', closeDesktopMenu);
  } else {
    desktopNavigation.addListener(closeDesktopMenu);
  }

  // Intersection Observer for fade-up animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const fadeElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach(el => {
      el.classList.add('visible');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // Hide mobile bottom bar when CTA section is visible
  const ctaSection = document.getElementById('cta');
  const mobileBar = document.getElementById('mobile-contact-bar');

  if (ctaSection && mobileBar) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        mobileBar.classList.toggle('is-hidden', entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    ctaObserver.observe(ctaSection);
  }

});
