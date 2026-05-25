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

  revealEls.forEach((el) => ioReveal.observe(el));

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
})();

