/* =========================================================
   Afifa Tahsin Mridula — Portfolio Script
   Vanilla JavaScript — no frameworks, no dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 700);
  });

  /* ---------------------------------------------------------
     2. DARK / LIGHT MODE TOGGLE (persisted in localStorage)
  --------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------------------------------------------------------
     3. STICKY NAVBAR + HAMBURGER MENU
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------
     4. SCROLL PROGRESS BAR + NAVBAR SHADOW + BACK TO TOP
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    navbar.classList.toggle('scrolled', scrollTop > 10);
    backToTop.classList.toggle('visible', scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------------
     5. SCROLL SPY — highlights nav links + gutter line numbers
  --------------------------------------------------------- */
  const sections = document.querySelectorAll('main .section, .hero');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const gutterItems = document.querySelectorAll('.gutter-list li');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        gutterItems.forEach(item => {
          item.classList.toggle('active', item.dataset.target === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  gutterItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = document.getElementById(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------------------------------------------------------
     6. TYPING TEXT ANIMATION (hero terminal card)
  --------------------------------------------------------- */
  const typedRole = document.getElementById('typedRole');
  const roles = ['Software Engineer', 'Web Developer', 'Problem Solver', 'AI Enthusiast', 'Frontend Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedRole.textContent = `"${current.slice(0, charIndex)}`;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedRole.textContent = `"${current.slice(0, charIndex)}`;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  typedRole.textContent = '"';
  typeLoop();

  /* ---------------------------------------------------------
     7. SCROLL REVEAL ANIMATION (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     8. ANIMATED SKILL BARS
  --------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skillbar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.dataset.level;
        const fill = bar.querySelector('.skillbar-fill');
        fill.style.width = level + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------------------------------------------------------
     9. ANIMATED COUNTERS (About section stats)
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 30);

        const timer = setInterval(() => {
          current++;
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, stepTime);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------------
     10. SKILLS TABS
  --------------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`panel-${btn.dataset.tab}`).classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     11. PROJECT CARD — cursor-follow glow effect
  --------------------------------------------------------- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  /* ---------------------------------------------------------
     12. CONTACT FORM — client-side validation + demo submit
     NOTE: This form has no backend. Connect it to a service
     like Formspree, EmailJS, or your own API endpoint to
     actually receive messages.
  --------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitLabel = document.getElementById('submitLabel');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please fill in every field before sending.';
      formStatus.className = 'form-status error';
      return;
    }
    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    submitLabel.textContent = 'Sending...';

    setTimeout(() => {
      formStatus.textContent = `Thanks, ${name}! Your message has been prepared — connect a backend (e.g. Formspree/EmailJS) to deliver it automatically.`;
      formStatus.className = 'form-status success';
      submitLabel.textContent = 'Send Message';
      contactForm.reset();
    }, 900);
  });

  /* ---------------------------------------------------------
     13. FOOTER YEAR
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     14. PARTICLE BACKGROUND (pure canvas, no libraries)
  --------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function getParticleColor() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return isLight ? 'rgba(99,102,241,0.35)' : 'rgba(139,143,247,0.55)';
  }
  function getLineColor() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return isLight ? 'rgba(99,102,241,' : 'rgba(139,143,247,';
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getParticleColor();
    const lineColor = getLineColor();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${lineColor}${1 - dist / 130})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    animFrame = requestAnimationFrame(drawParticles);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initParticles() {
    resizeCanvas();
    createParticles();
    if (!reducedMotion) {
      cancelAnimationFrame(animFrame);
      drawParticles();
    }
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  if (!reducedMotion) {
    initParticles();
  } else {
    resizeCanvas();
    createParticles();
    drawParticles();
    cancelAnimationFrame(animFrame);
  }

});
