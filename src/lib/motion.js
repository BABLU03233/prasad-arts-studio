import { useEffect } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('motion-paused'));

/**
 * Site-wide motion: scroll reveals (with optional stagger) and a single
 * rAF-driven parallax loop. Everything is a progressive enhancement — if
 * motion is reduced or paused, elements simply render in their final state.
 *
 * Usage in markup:
 *   class="reveal"            → fades/translates in once on scroll
 *   data-reveal="clip"        → clip-path reveal variant
 *   style={{'--i': n}}        → stagger index (0,1,2…) for grouped reveals
 *   data-parallax="0.12"      → subtle vertical parallax; value is the speed
 */
export function useSiteMotion(deps = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // --- Scroll reveals ---
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      document.querySelectorAll('.reveal').forEach((el) => {
        if (!el.classList.contains('is-visible')) io.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    }

    // --- Parallax ---
    const nodes = Array.from(document.querySelectorAll('[data-parallax]'));
    let frame = 0;
    let running = false;

    const render = () => {
      running = false;
      const vh = window.innerHeight;
      for (const el of nodes) {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const rect = el.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        const offset = (centre - vh / 2) * speed;
        el.style.setProperty('--py', `${offset.toFixed(1)}px`);
      }
    };
    const request = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(render);
    };
    const onScroll = () => {
      if (prefersReduced()) return;
      request();
    };

    if (nodes.length && !prefersReduced()) {
      render();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
