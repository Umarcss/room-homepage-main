document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = menuToggle.querySelector("img");
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const overlay = document.querySelector(".overlay");
  let menuOpen = false;

  function closeMenu() {
    menuOpen = false;
    menuIcon.src = "./images/icon-hamburger.svg";
    menuToggle.setAttribute("aria-label", "Open Navigation Menu");
    header.classList.remove("menu-open");
    nav.classList.remove("active");
    nav.setAttribute("aria-hidden", "true");
    overlay.classList.remove("active");

    document.body.classList.remove("no-scroll");
  }

  menuToggle.addEventListener("click", () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      menuIcon.src = "./images/icon-close.svg";
      menuToggle.setAttribute("aria-label", "Close the navigation menu");
      header.classList.add("menu-open");
      nav.classList.add("active");
      nav.setAttribute("aria-hidden", "false");
      overlay.classList.add("active");

      document.body.classList.add("no-scroll");
    } else {
      closeMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slider");
  let currentIndex = 0;
  let lastDirection = null;

  const nextButtons = document.querySelectorAll(".slider-nav.next");
  const prevButtons = document.querySelectorAll(".slider-nav.prev");

  updateSlides();

  function updateSlides() {
    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      const text = slide.querySelector(".slider-text");

      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", !isActive);
      slide.tabIndex = isActive ? 0 : -1;

      if (isActive) {
        text.setAttribute("aria-live", "polite");
      } else {
        text.removeAttribute("aria-live");
      }
    });
  }

  function showSlide(index) {
    const total = slides.length;
    currentIndex = (index + total) % total;
    updateSlides();

    const activeSlide = slides[currentIndex];
    const nextBtn = activeSlide.querySelector(".slider-nav.next");
    const prevBtn = activeSlide.querySelector(".slider-nav.prev");

    if (lastDirection === "next" && nextBtn) {
      nextBtn.focus();
    } else if (lastDirection === "prev" && prevBtn) {
      prevBtn.focus();
    } else {
      const focusable = activeSlide.querySelector(
        "button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"
      );
      if (focusable) focusable.focus();
      else activeSlide.focus();
    }
  }

  function showNext() {
    lastDirection = "next";
    showSlide(currentIndex + 1);
  }

  function showPrevious() {
    lastDirection = "prev";
    showSlide(currentIndex - 1);
  }

  nextButtons.forEach((btn) => btn.addEventListener("click", showNext));
  prevButtons.forEach((btn) => btn.addEventListener("click", showPrevious));

  document.addEventListener("keydown", (e) => {
    if (document.activeElement.closest(".slider-wrapper")) {
      if (e.key === "ArrowRight") {
        lastDirection = "next";
        showSlide(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        lastDirection = "prev";
        showSlide(currentIndex - 1);
      }
    }
  });
});
