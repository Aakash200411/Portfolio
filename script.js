// One deliberate motion moment: ledger/stat figures count up from 0
// to their real value on load. Respects reduced-motion.

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const numEls = document.querySelectorAll(".num[data-count]");

  numEls.forEach((el) => {
    const target = parseFloat(el.dataset.count);

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(1);
      return;
    }

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(1);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(1);
      }
    }
    requestAnimationFrame(tick);
  });
});
