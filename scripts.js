// script.js
// Este archivo controla el menú móvil, el cambio de navbar al hacer scroll
// y las animaciones suaves de entrada con Intersection Observer.

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');
const heroTitle = document.querySelector('.hero h1');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Aquí puedes añadir más lógica específica del proyecto.
// Por ejemplo, reemplazar el formulario visual con una integración real luego.

const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-menu a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        menuLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    let valid = true;

    [nameField, emailField, messageField].forEach((field) => {
      field.style.border = '';
    });

    if (!nameField.value.trim()) {
      nameField.style.border = '2px solid #ff6b6b';
      valid = false;
    }

    if (!emailField.value.trim() || !emailField.value.includes('@')) {
      emailField.style.border = '2px solid #ff6b6b';
      valid = false;
    }

    if (!messageField.value.trim()) {
      messageField.style.border = '2px solid #ff6b6b';
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Enviando mensaje...';
    submitButton.disabled = true;
    submitButton.style.background = 'linear-gradient(135deg, #c8f5d4, #9eebb5)';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

window.addEventListener('scroll', () => {
  // Navbar
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Blur + fade en el título hero
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  const progress = scrollY / (heroHeight * 1.2);

  if (heroTitle) {
    const opacity = Math.max(0, 1 - progress);
    const blur = Math.min(8, progress * 8);
    heroTitle.style.transition = 'none';
    heroTitle.style.opacity = opacity;
    heroTitle.style.filter = `blur(${blur}px)`;
    heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
});