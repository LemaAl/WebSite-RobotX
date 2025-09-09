// ================= Navbar & Sections =================
const sections = document.querySelectorAll("section, .info-box, .carousel, .contact-grid, .counter, #register, #contact");
const navLinks = document.querySelectorAll("nav ul li a");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const navbar = document.getElementById("navbar");

// Reset active links on load
navLinks.forEach(link => link.classList.remove("active"));

// Scroll highlight + shrink navbar
window.addEventListener("scroll", () => {
  let current = "";
  const screenCenter = window.innerHeight / 2;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionId = section.getAttribute("id");
    if (rect.top <= screenCenter && rect.bottom >= screenCenter) {
      current = sectionId;
    }
  });

 if (current === "" || current === "header") {
  navLinks.forEach(link => link.classList.remove("active"));
} else {
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}


  // Shrink navbar on scroll
  if (window.scrollY > 100) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

// Smooth scroll (center the section)
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});

// Toggle menu (mobile)
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// ================= Carousel =================
const carousel = document.getElementById("club-carousel");
let isDown = false;
let startX;
let scrollLeft;
let autoScroll;
let direction = 1;

// Duplicate items for infinite loop
const cards = Array.from(carousel.children);
cards.forEach(card => {
  const clone = card.cloneNode(true);
  carousel.appendChild(clone);
});

// Mouse events
carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  clearInterval(autoScroll);
});
carousel.addEventListener("mouseleave", () => isDown = false);
carousel.addEventListener("mouseup", (e) => {
  isDown = false;
  const endX = e.pageX - carousel.offsetLeft;
  if (endX < startX) direction = 1;   // dragged left → move left
  else if (endX > startX) direction = -1; // dragged right → move right
  startAutoScroll();
});
carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch events
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  clearInterval(autoScroll);
});
carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].pageX - carousel.offsetLeft;
  if (endX < startX) direction = 1;
  else if (endX > startX) direction = -1;
  startAutoScroll();
});
carousel.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Auto scroll with wrap
function startAutoScroll() {
  clearInterval(autoScroll);
  autoScroll = setInterval(() => {
    carousel.scrollLeft += direction * 1;

    // If reached half (duplicated items) → reset to start
    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
      carousel.scrollLeft = 0;
    }
    if (carousel.scrollLeft <= 0 && direction === -1) {
      carousel.scrollLeft = carousel.scrollWidth / 2;
    }
  }, 16); // ~60fps
}

startAutoScroll();
