// Alex Zhang Personal Website - Global Interaction Script

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      document.body.style.overflow = "auto";
    });
  }

  // 2. Cinematic Intro (Only on index.html)
  const introEl = document.getElementById("cinematic-intro");
  const skipBtn = document.getElementById("skip-intro-btn");
  const dontShowAgainBtn = document.getElementById("dont-show-again-btn");

  if (introEl) {
    const hasSeenIntro = sessionStorage.getItem("az-intro-seen");
    const disabledForever = localStorage.getItem("az-intro-disabled");

    if (hasSeenIntro === "true" || disabledForever === "true") {
      introEl.classList.add("hidden-intro");
      setTimeout(() => introEl.remove(), 800);
    } else {
      const timer = setTimeout(() => {
        closeIntro(false);
      }, 4800);

      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          clearTimeout(timer);
          closeIntro(false);
        });
      }

      if (dontShowAgainBtn) {
        dontShowAgainBtn.addEventListener("click", () => {
          clearTimeout(timer);
          closeIntro(true);
        });
      }
    }
  }

  function closeIntro(disableForever) {
    if (!introEl) return;
    sessionStorage.setItem("az-intro-seen", "true");
    if (disableForever) {
      localStorage.setItem("az-intro-disabled", "true");
    }
    introEl.classList.add("hidden-intro");
    setTimeout(() => introEl.remove(), 800);
  }
});
