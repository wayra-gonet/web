document.addEventListener("DOMContentLoaded", () => {
  // Select sections to animate (excluding Hero sections using pt-32 padding or swiper components)
  // We target major typographies and grid cards to animate softly
  const animatableSelector = "section:not(.pt-32):not(.swiper) h2, section:not(.pt-32):not(.swiper) h3, section:not(.pt-32):not(.swiper) p:not(.text-sm), section:not(.pt-32):not(.swiper) .grid > div, footer .grid > div, .animate-indicator";
  const elements = document.querySelectorAll(animatableSelector);

  // Initial CSS styles for animation logic injected natively to avoid external CSS dependecies
  const style = document.createElement('style');
  style.innerHTML = `
    .scroll-reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .scroll-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Intersection observer for entering viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before the item actually hits the bottom
    threshold: 0.1
  });

  // Track layout structure to stagger sibling elements beautifully
  elements.forEach((el) => {
    el.classList.add('scroll-reveal');

    // Add cascading transition delays for grid cards
    if (el.parentElement && el.parentElement.classList.contains('grid')) {
      // Find index within the parent grid
      const siblings = Array.from(el.parentElement.children);
      const index = siblings.indexOf(el);
      // Soft stagger delay maxing out at the 4th item per row to prevent excessive delays
      const delay = (index % 4) * 0.15;
      el.style.transitionDelay = `${delay}s`;
    }
    
    observer.observe(el);
  });
});
