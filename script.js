$(document).ready(function () {
  // Register GSAP plugins if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ════════════════════════════════════════
  // 1. PAGE LOADER
  // ════════════════════════════════════════
  const loader = document.getElementById('page-loader');
  const loaderBar = document.querySelector('.loader-bar');
  let loaderRemoved = false;

  function removeLoader() {
    if (loaderRemoved) return;
    loaderRemoved = true;
    if (loader) {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      setTimeout(function() {
        loader.style.display = 'none';
        initHeroAnimations();
        initMatrixRain();
        initTerminalTyping();
      }, 600);
    }
  }

  if (typeof gsap !== 'undefined') {
    gsap.to(loaderBar, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: removeLoader
    });
  } else {
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(removeLoader, 1500);
  }
  setTimeout(removeLoader, 4000);

  // ════════════════════════════════════════
  // 2. CUSTOM CURSOR
  // ════════════════════════════════════════
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (!hasFinePointer && cursorDot && cursorOutline) {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
    document.body.style.cursor = 'auto';
  } else if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      const target = e.target;
      if (target.closest && target.closest('.light-section')) {
        cursorDot.classList.add('dark');
        cursorOutline.classList.add('dark');
      } else {
        cursorDot.classList.remove('dark');
        cursorOutline.classList.remove('dark');
      }
    });
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = outlineX + 'px';
      cursorOutline.style.top = outlineY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  document.querySelectorAll('.hover-trigger, a, button, input, textarea, select, .whatsapp-float').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      if (cursorOutline) cursorOutline.classList.add('hovered');
    });
    el.addEventListener('mouseleave', function() {
      if (cursorOutline) cursorOutline.classList.remove('hovered');
    });
  });

  // ════════════════════════════════════════
  // 3. HAMBURGER & MOBILE MENU
  // ════════════════════════════════════════
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        mobileMenu.classList.remove('invisible', 'opacity-0');
        mobileMenu.classList.add('visible', 'opacity-100');
        document.body.style.overflow = 'hidden';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo('.menu-item', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
          gsap.fromTo('.menu-details', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 });
        }
      } else {
        mobileMenu.classList.remove('visible', 'opacity-100');
        mobileMenu.classList.add('invisible', 'opacity-0');
        document.body.style.overflow = 'auto';
      }
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) {
        mobileMenu.classList.remove('visible', 'opacity-100');
        mobileMenu.classList.add('invisible', 'opacity-0');
      }
      document.body.style.overflow = 'auto';
    }
  });

  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function () {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) {
        mobileMenu.classList.remove('visible', 'opacity-100');
        mobileMenu.classList.add('invisible', 'opacity-0');
      }
      document.body.style.overflow = 'auto';
    });
  });

  // ════════════════════════════════════════
  // 4. NAVBAR SCROLL
  // ════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('bg-black/90');
      navbar.classList.remove('bg-black/50', 'border-white/5');
    } else {
      navbar.classList.remove('bg-black/90');
      navbar.classList.add('bg-black/50', 'border-white/5');
    }
  });

  // ════════════════════════════════════════
  // 5. HERO ANIMATIONS
  // ════════════════════════════════════════
  function initHeroAnimations() {
    // Hero content is shown instantly, no entrance animation
    document.querySelectorAll('.hero-anim').forEach(function(el) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    });
    const heroCard = document.getElementById('hero-card');
    if (heroCard) { heroCard.style.transform = 'none'; heroCard.style.opacity = '1'; }
  }

  // ════════════════════════════════════════
  // 6. PARALLAX
  // ════════════════════════════════════════
  if (window.innerWidth > 768 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.parallax-col').forEach(function(col) {
      const speed = parseFloat(col.getAttribute('data-speed')) || 1;
      gsap.to(col, { yPercent: -20 * speed, ease: 'none', scrollTrigger: { trigger: '#gallery', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  // ════════════════════════════════════════
  // 7. TEXT REVEAL
  // ════════════════════════════════════════
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from('.text-reveal-trigger', { scrollTrigger: { trigger: '#about', start: 'top 80%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
  }

  // ════════════════════════════════════════
  // 8. IMAGE REVEAL
  // ════════════════════════════════════════
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.portfolio-item img, .portfolio-card img, .project-card img').forEach(function(img) {
      gsap.from(img, { scrollTrigger: { trigger: img, start: 'top 90%' }, scale: 1.2, opacity: 0, duration: 1.5, ease: 'power2.out' });
    });
  }

  // ════════════════════════════════════════
  // 9. COUNTER ANIMATION
  // ════════════════════════════════════════
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.counter').forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-target'));
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: counter, start: 'top 85%', once: true,
        onEnter: function() {
          gsap.to(obj, { val: target, duration: 2, ease: 'power2.out',
            onUpdate: function() { counter.textContent = Math.ceil(obj.val) + '+'; }
          });
        }
      });
    });
  } else {
    document.querySelectorAll('.counter').forEach(function(counter) {
      const target = counter.getAttribute('data-target');
      if (target) counter.textContent = target + '+';
    });
  }

  // ════════════════════════════════════════
  // 10. PORTFOLIO FILTER
  // ════════════════════════════════════════
  document.querySelectorAll('.portfolio-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('.portfolio-filter').forEach(function(b) {
        b.classList.remove('text-white', 'active');
        b.classList.add('text-gray-500');
      });
      this.classList.remove('text-gray-500');
      this.classList.add('text-white', 'active');
      document.querySelectorAll('.portfolio-card').forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ════════════════════════════════════════
  // 11. SMOOTH SCROLL
  // ════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  // ════════════════════════════════════════
  // 12. CONTACT FORM
  // ════════════════════════════════════════
  window.handleContactSubmit = function() {
    const btn = document.querySelector('#contact-form button[type="submit"]');
    if (!btn) return;
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(function() {
      btn.textContent = 'Message Sent!';
      btn.style.backgroundColor = '#22c55e';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.disabled = false;
        const form = document.getElementById('contact-form');
        if (form) form.reset();
      }, 2000);
    }, 1500);
  };

  // ════════════════════════════════════════
  // 13. SCROLL REVEAL SECTIONS
  // ════════════════════════════════════════
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('section > div').forEach(function(elem) {
      gsap.from(elem, { scrollTrigger: { trigger: elem, start: 'top 90%', toggleActions: 'play none none none' }, y: 40, opacity: 0, duration: 1, ease: 'power3.out' });
    });
  }

  // ════════════════════════════════════════
  // 14. TERMINAL TYPING EFFECT
  // ════════════════════════════════════════
  function initTerminalTyping() {
    const terminals = document.querySelectorAll('.terminal-typing');
    terminals.forEach(function(term) {
      const text = term.getAttribute('data-text') || '';
      const speed = parseInt(term.getAttribute('data-speed')) || 50;
      let i = 0;
      term.textContent = '';
      function type() {
        if (i < text.length) {
          term.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(type, 300);
            observer.unobserve(term);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(term);
    });
  }

  // ════════════════════════════════════════
  // 15. MATRIX RAIN EFFECT
  // ════════════════════════════════════════
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FF3B30';
      ctx.font = fontSize + 'px JetBrains Mono';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    setInterval(draw, 50);
  }

  // ════════════════════════════════════════
  // 16. GLITCH TEXT TRIGGER
  // ════════════════════════════════════════
  document.querySelectorAll('.glitch-trigger').forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      this.classList.add('glitch');
    });
    el.addEventListener('mouseleave', function() {
      this.classList.remove('glitch');
    });
  });

  // ════════════════════════════════════════
  // 17. REVEAL ON SCROLL (CSS class based)
  // ════════════════════════════════════════
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .stagger-children').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ════════════════════════════════════════
  // 18. WHATSAPP BUTTON HOVER
  // ════════════════════════════════════════
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { scale: 1.15, rotation: -5, duration: 0.3, ease: 'back.out(2)' });
      }
    });
    whatsappBtn.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, { scale: 1, rotation: 0, duration: 0.3 });
      }
    });
  }

  // ════════════════════════════════════════
  // 19. RANDOM CONTRIBUTION GRAPH
  // ════════════════════════════════════════
  document.querySelectorAll('.contrib-cell').forEach(function(cell) {
    const levels = ['', 'l1', 'l2', 'l3', 'l4'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    if (randomLevel) cell.classList.add(randomLevel);
  });

  // ════════════════════════════════════════
  // 20. MAGNETIC BUTTON EFFECT
  // ════════════════════════════════════════
  document.querySelectorAll('.magnetic').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = 'translate(' + x * 0.2 + 'px, ' + y * 0.2 + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });

  // ════════════════════════════════════════
  // 21. GENERATE CONTRIBUTION GRAPH
  // ════════════════════════════════════════
  const graph = document.getElementById('contrib-graph');
  if (graph) {
    for (let i = 0; i < 80; i++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';
      const rand = Math.random();
      if (rand > 0.7) cell.classList.add('l1');
      if (rand > 0.8) cell.classList.add('l2');
      if (rand > 0.9) cell.classList.add('l3');
      if (rand > 0.95) cell.classList.add('l4');
      graph.appendChild(cell);
    }
  }
});
