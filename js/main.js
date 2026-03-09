// ============================================
// Scroll-triggered animations (Intersection Observer)
// ============================================
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate language bars
      if (entry.target.classList.contains('language-card')) {
        const fill = entry.target.querySelector('.language-fill');
        if (fill) {
          const width = fill.getAttribute('data-width');
          setTimeout(() => { fill.style.width = width + '%'; }, 200);
        }
      }

      // Counter animation
      if (entry.target.querySelector('.counter')) {
        animateCounter(entry.target.querySelector('.counter'));
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in, .language-card').forEach(el => {
  observer.observe(el);
});

// ============================================
// Counter animation
// ============================================
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';

  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
    el.textContent = Math.round(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ============================================
// Cursor glow effect
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.classList.add('active');
});

document.addEventListener('mouseleave', () => {
  cursorGlow.classList.remove('active');
});

function updateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(updateGlow);
}
updateGlow();

// ============================================
// Hero particles
// ============================================
const particlesContainer = document.getElementById('heroParticles');

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = 50 + Math.random() * 50 + '%';
  particle.style.animationDelay = Math.random() * 4 + 's';
  particle.style.animationDuration = 4 + Math.random() * 4 + 's';

  const colors = ['#FA5D29', '#49B3FC', '#AAEEC4'];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 10000);
}

// Create particles periodically
setInterval(createParticle, 500);
for (let i = 0; i < 8; i++) {
  setTimeout(createParticle, i * 300);
}

// ============================================
// Navbar scroll effect
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ============================================
// Mobile navigation toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============================================
// Smooth scroll for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });
});

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink && !navLink.classList.contains('nav-cta')) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLink.style.color = 'rgba(255, 255, 255, 1)';
      } else {
        navLink.style.color = '';
      }
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// ============================================
// Tilt effect on stat cards
// ============================================
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================================
// Magnetic button effect
// ============================================
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translateY(-3px) translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ============================================
// Skill tag stagger animation
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.skill-tag');
      tags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(12px) scale(0.95)';
        setTimeout(() => {
          tag.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          tag.style.opacity = '1';
          tag.style.transform = 'translateY(0) scale(1)';
        }, i * 60);
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-group').forEach(group => {
  skillObserver.observe(group);
});

// ============================================
// Timeline tags stagger
// ============================================
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.timeline-tags span');
      tags.forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateX(-8px)';
        setTimeout(() => {
          tag.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          tag.style.opacity = '1';
          tag.style.transform = 'translateX(0)';
        }, 200 + i * 80);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});
