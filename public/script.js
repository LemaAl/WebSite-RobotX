// Sections + Navbar links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const navbar = document.getElementById("navbar");

// Reset active on load
navLinks.forEach(link => link.classList.remove("active"));

// Scroll highlight
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
  } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    navLinks.forEach(link => link.classList.remove("active"));
    document.querySelector('nav ul li a[href="#contact"]').classList.add("active");
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

// Smooth scroll (center section)
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

// Open modal
function openModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (modal) modal.style.display = "flex";
}

// Close modal
function closeModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (modal) modal.style.display = "none";
}