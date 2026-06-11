// ===== INTERSECTION OBSERVER UNTUK ANIMASI SCROLL =====
const animateElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

animateElements.forEach(el => observer.observe(el));

// ===== PARTICLES BACKGROUND (HERO) =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 8 + 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL UNTUK LINK NAVIGASI =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== IDEATE SLIDER =====
let currentIndex = 0;
const slides = document.querySelectorAll('.ideate-slide');

function updateSlider() {
  const totalSlides = slides.length;
  slides.forEach((slide, index) => {
    let offset = index - currentIndex;
    if (offset < -1) offset += totalSlides;
    if (offset > totalSlides - 2) offset -= totalSlides;

    if (offset === 0) {
      slide.style.transform = "translateX(0px) scale(1) rotateY(0deg)";
      slide.style.zIndex = "10";
      slide.style.opacity = "1";
      slide.style.filter = "blur(0px)";
    } else if (offset === 1) {
      slide.style.transform = "translateX(180px) scale(0.85) rotate(5deg) translateZ(-50px)";
      slide.style.zIndex = "5";
      slide.style.opacity = "0.85";
      slide.style.filter = "blur(1px)";
    } else if (offset === -1) {
      slide.style.transform = "translateX(-180px) scale(0.85) rotate(-5deg) translateZ(-50px)";
      slide.style.zIndex = "5";
      slide.style.opacity = "0.85";
      slide.style.filter = "blur(1px)";
    } else if (offset === 2 || offset === -2) {
      slide.style.transform = `translateX(${offset * 140}px) scale(0.7) rotate(${offset * 4}deg) translateZ(-100px)`;
      slide.style.zIndex = "2";
      slide.style.opacity = "0.5";
      slide.style.filter = "blur(3px)";
    } else {
      slide.style.transform = "translateX(0px) scale(0.5)";
      slide.style.zIndex = "0";
      slide.style.opacity = "0";
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

document.addEventListener("DOMContentLoaded", () => {
  updateSlider();
});