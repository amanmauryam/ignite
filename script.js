document.addEventListener('DOMContentLoaded', () => {

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
    document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

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
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Exam card hover rotation effect
  document.querySelectorAll('.exam-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const rotate = ((x - centerX) / centerX) * 1.5;
      card.style.transform = `translateY(-4px) rotate(${rotate}deg)`;
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const centerX = rect.width / 2;
      const rotate = ((x - centerX) / centerX) * 1.5;
      card.style.transform = `translateY(-4px) rotate(${rotate}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotate(0deg)';
    });
  });

  // Sticker hover effect on hero
  document.querySelectorAll('.sticker-el').forEach(sticker => {
    sticker.addEventListener('mouseenter', () => {
      sticker.style.transform = 'rotate(0deg) scale(1.05)';
    });
    sticker.addEventListener('mouseleave', () => {
      sticker.style.transform = '';
    });
  });

});
