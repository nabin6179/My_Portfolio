/*
  script.js
  - Mobile nav toggle
  - Smooth section highlighting (active link) (optional minimal)
  - Scroll reveal animations (fade/slide)
  - Typing animation for the hero subtitle

  No libraries required.
*/

(() => {
  // --- Utilities ---
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // --- Sticky nav: active link based on section in view ---
  const sections = $$('main section[id]');
  const navLinks = $$('[data-nav-links] a[href^="#"]');

  // --- Scroll Reveal ---
  const revealEls = $$('[data-reveal]');

  // IntersectionObserver is widely supported in modern browsers.
  const ioReveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          ioReveal.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  // Apply staggered reveal delays (order based) by setting CSS variable --d
  revealEls.forEach((el, idx) => {
    // clamp delay to keep things snappy
    el.style.setProperty('--d', `${Math.min(600, idx * 70)}ms`);
    ioReveal.observe(el);
  });


  // --- Typing animation ---
  // Requirements mention an optional typing animation in hero section.
  // We'll keep it subtle: type the subtitle text into the <span.typing>.
  const typingSpan = $('.typing');
  const caret = $('.typing-caret');

  if (typingSpan) {
    // Use data-typing if provided; otherwise use current content.
    const fullText = typingSpan.textContent.trim();

    // If user already has a long subtitle, typing it once looks good.
    // We'll type only if enough characters.
    const shouldType = fullText.length > 20;

    // Start with empty text
    if (shouldType) typingSpan.textContent = '';

    let i = 0;
    const speed = 22; // ms per character

    if (shouldType) {
      caret && (caret.style.display = 'inline-block');

      const t = setInterval(() => {
        i++;
        typingSpan.textContent = fullText.slice(0, i);
        if (i >= fullText.length) {
          clearInterval(t);
          // Keep caret blinking; looks cyber.
        }
      }, speed);
    }
  }

  // --- Mobile nav toggle ---
  const toggleBtn = $('[data-nav-toggle]');
  const nav = $('[data-nav-links]');

  const setNavOpen = (open) => {
    if (!nav) return;
    nav.dataset.open = open ? 'true' : 'false';
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(open));
  };

  if (toggleBtn && nav) {
    // Initialize closed state
    setNavOpen(false);

    toggleBtn.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true';
      setNavOpen(!isOpen);
    });

    // Close menu after clicking a link
    $$('[data-nav-links] a').forEach((a) => {
      a.addEventListener('click', () => setNavOpen(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    });
  }

  // --- Active link highlight ---
  // Add a subtle underline/glow to the active section link.
  const ioActive = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (!visible.length) return;
      const id = visible[0].target.id;

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const linkId = href ? href.replace('#', '') : '';
        const isActive = linkId === id;
        link.style.border = isActive ? '1px solid rgba(57,165,255,.35)' : '1px solid transparent';
        link.style.boxShadow = isActive ? '0 0 0 4px rgba(57,165,255,.12)' : 'none';
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((s) => ioActive.observe(s));

  // --- Optional: Year in footer ---
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Cyber terminal overlay (random messages + mouse interaction) ---
  const terminalSection = document.querySelector('.terminal');
  const terminalInner = terminalSection ? terminalSection.querySelector('.terminal__inner') : null;

  const terminalLines = $$('[data-terminal-line]');

  // Only run if the terminal exists
  if (terminalSection && terminalLines.length) {
    const messages = [
      'ACCESS GRANTED',
      'SCANNING NETWORK…',
      'FIREWALL BYPASSED',
      'ROUTING TABLE UPDATED',
      'PACKET INSPECTION ACTIVE',
      'VLAN TAGGING VERIFIED',
      'AUTHENTICATION COMPLETE',
      'IDS SIGNATURES LOADED',
      'SYSLOG STREAM ONLINE'
    ];

    // Update one of the terminal lines with a small "type" effect
    const typeInto = (el, text) => {
      if (!el) return;
      el.textContent = '';
      let i = 0;
      const tick = () => {
        i++;
        el.textContent = text.slice(0, i);
        if (i >= text.length) clearInterval(timer);
      };
      const timer = setInterval(tick, 18);
    };

    let msgIdx = 0;

    // Pick a line randomly so it feels "alive"
    const pushMessage = () => {
      const line = terminalLines[Math.floor(Math.random() * terminalLines.length)];
      const msg = messages[msgIdx % messages.length];
      msgIdx++;
      typeInto(line, msg);
    };

    // Initial burst
    for (let k = 0; k < terminalLines.length; k++) {
      setTimeout(() => pushMessage(), 400 + k * 250);
    }

    // Keep updating periodically
    const interval = setInterval(() => pushMessage(), 2800);

    // Mouse interaction: on hover/move, spike "scan" messages quickly
    window.addEventListener('mousemove', () => {
      // Throttle by using a flag
      if (window.__terminalSpiking) return;
      window.__terminalSpiking = true;

      // Quick sequence
      const burst1 = messages[1];
      const burst2 = messages[4];
      const burst3 = messages[0];

      const l0 = terminalLines[0];
      const l1 = terminalLines[1];
      const l2 = terminalLines[2];

      if (terminalInner) {
        terminalInner.classList.remove('terminal-glitch');
        // force reflow so the animation restarts
        // eslint-disable-next-line no-unused-expressions
        terminalInner.offsetHeight;
        terminalInner.classList.add('terminal-glitch');
      }

      typeInto(l0, burst1);
      setTimeout(() => typeInto(l1, burst2), 180);
      setTimeout(() => typeInto(l2, burst3), 360);


      setTimeout(() => {
        window.__terminalSpiking = false;
      }, 900);
    }, { passive: true });

    // Stop interval on tab hidden for performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(interval);
    });
  }
})();

