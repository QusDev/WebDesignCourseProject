document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter-effect");

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-counter-value');
    const duration = 2500;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const count = Math.floor(easeOutProgress * target);
        counter.innerText = count;

        if (count < target) {
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };

    requestAnimationFrame(updateCount);
};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
