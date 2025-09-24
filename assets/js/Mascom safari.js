// =====================
// PRELOADER PARTICLES
// =====================
const canvas = document.getElementById('preloader-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ['#fff', '#ffb347', '#ff7a00'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  const number = window.innerWidth / 10;
  for (let i = 0; i < number; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// =====================
// HIDE PRELOADER AND INIT SWIPERS
// =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');

    setTimeout(() => {
      preloader.style.display = 'none';
      document.getElementById('main-content').style.display = 'block';

      // ===== HERO SWIPER =====
      new Swiper(".tourSwiper", {
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        effect: "fade",
        fadeEffect: { crossFade: true },
        speed: 1200,
        on: {
          slideChangeTransitionStart() {
            const active = document.querySelector(".swiper-slide-active");
            document.querySelectorAll(".caption-text").forEach(el => {
              if (!active.contains(el)) {
                el.style.opacity = 0;
                el.style.transform = "translateY(20px)";
              }
            });
          },
          slideChangeTransitionEnd() {
            const active = document.querySelector(".swiper-slide-active");
            active.querySelectorAll(".caption-text").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
              }, i * 200);
            });
          }
        }
      });

      // ===== PACKAGES SWIPER =====
      const packagesSwiper = new Swiper(".packagesSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".packagesSwiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".packagesSwiper .swiper-button-next",
    prevEl: ".packagesSwiper .swiper-button-prev",
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 1 },
    480: { 
      slidesPerView: 1,   // single card per view
      spaceBetween: 20,
    },
  },
  on: {
    slideChangeTransitionStart() {
      document.querySelectorAll(".packagesSwiper .swiper-slide").forEach(slide => {
        slide.classList.remove("visible");
      });
    },
    slideChangeTransitionEnd(swiper) {
      swiper.slides.forEach(slide => {
        slide.classList.add("visible");
      });
    },
  },
});


    }, 500); // fade-out transition
  }, 1000); // preloader visible 2s
});

// ===== NAVBAR / HAMBURGER =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("toggle");
});

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("toggle");
    }
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) nav.classList.add("shrink");
  else nav.classList.remove("shrink");
});

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  document.querySelectorAll(".about-text, .about-image, .package-card, .dest-card, .contact-form")
    .forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("visible");
    });
}
window.addEventListener("scroll", revealOnScroll);
window.dispatchEvent(new Event("scroll"));

// ===== BACK TO TOP =====
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.style.display = window.scrollY > 400 ? "block" : "none";
});
backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== PACKAGE VIDEO PREVIEW =====
document.querySelectorAll(".package-card").forEach(card => {
  const video = card.querySelector(".preview-video");
  if (!video) return;
  card.addEventListener("mouseenter", () => video.play());
  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

// ===== COUNTER ANIMATION =====
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const speed = 200;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 20);
      }
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
});

// ===== GLOBAL SCROLL REVEAL FOR OTHER ELEMENTS =====
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".section-title, .section-subtitle, .card, .team-member, .counter-box"
  );

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.2,
  });

  elements.forEach(el => {
    el.classList.add("slide-up");
    observer.observe(el);
  });
});

