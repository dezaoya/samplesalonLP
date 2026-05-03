const fixedCta = document.querySelector(".fixed-cta");
const footer = document.querySelector(".footer");
const headingRevealTargets = document.querySelectorAll(".section-title, .contact-card h2");

const updateFixedCta = () => {
  if (!fixedCta) return;

  const scrolledEnough = window.scrollY > 500;
  const footerIsNear =
    footer && footer.getBoundingClientRect().top < window.innerHeight + 180;

  fixedCta.classList.toggle("is-visible", scrolledEnough && !footerIsNear);
};

window.addEventListener("scroll", updateFixedCta, { passive: true });
window.addEventListener("resize", updateFixedCta);
updateFixedCta();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

headingRevealTargets.forEach((target) => {
  target.classList.add("reveal-heading");
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  headingRevealTargets.forEach((target) => {
    target.classList.add("is-visible");
  });
} else {
  const headingObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16,
    }
  );

  headingRevealTargets.forEach((target) => {
    headingObserver.observe(target);
  });
}
