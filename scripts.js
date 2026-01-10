// ===========================
// SIDEBAR TOGGLE (for blog pages)
// ===========================

const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', () => {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.classList.remove('sidebar-open');
  });
}

// ===========================
// NAVIGATION
// ===========================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('open');
  });
});

// ===========================
// SMOOTH SCROLLING & ACTIVE NAV
// ===========================

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNav);

function updateActiveNav() {
  const sections = document.querySelectorAll('.content-section');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Initial active state
updateActiveNav();

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===========================
// GALLERY IMAGE MODAL
// ===========================

const galleryImages = document.querySelectorAll('.gallery-grid img');

galleryImages.forEach(img => {
  img.addEventListener('click', function() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
      <div class="img-modal-bg"></div>
      <img src="${this.src}" alt="${this.alt}" class="img-modal-img">
    `;
    
    document.body.appendChild(modal);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Close modal on background click
    const modalBg = modal.querySelector('.img-modal-bg');
    modalBg.addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = '';
    });
    
    // Close modal on Escape key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
  });
});

// ===========================
// NAVBAR STYLING ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.borderBottom = '1px solid var(--border)';
  } else {
    navbar.style.borderBottom = '1px solid var(--border)';
  }
});