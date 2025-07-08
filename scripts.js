const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const navLinks = document.querySelectorAll('.sidebar nav a');

// Open and close sidebar
const openSidebar = () => {
  sidebar.classList.add('open');
  document.body.classList.add('sidebar-open');
  backdrop.style.display = 'block';
  hamburger.classList.add('open');
};

const closeSidebar = () => {
  sidebar.classList.remove('open');
  document.body.classList.remove('sidebar-open');
  backdrop.style.display = 'none';
  hamburger.classList.remove('open');
};

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

backdrop.addEventListener('click', closeSidebar);

// Sidebar link navigation
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault(); // Same-page anchor
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (window.innerWidth < 900) {
      closeSidebar();
    }
  });
});

// Highlight active nav link
const sections = document.querySelectorAll('main section');
function activateNavLink() {
  let index = sections.length;
  while (--index && window.scrollY + 110 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[index]) navLinks[index].classList.add('active');
}
activateNavLink();
window.addEventListener('scroll', activateNavLink);

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 250 ? 'block' : 'none';
  }
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Gallery modal
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', function () {
    const modal = document.createElement('div');
    modal.className = 'img-modal';
    modal.innerHTML = `
      <div class="img-modal-bg"></div>
      <img src="${this.src}" alt="${this.alt}" class="img-modal-img">
    `;
    document.body.appendChild(modal);
    modal.querySelector('.img-modal-bg').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  });
});

// Move contact box on mobile
function moveContactBox() {
  const contact = document.querySelector('.about-contact');
  const footer = document.querySelector('footer');
  const aboutFlex = document.querySelector('.about-flex');
  if (window.innerWidth <= 760 && contact && footer) {
    footer.parentNode.insertBefore(contact, footer);
  } else if (window.innerWidth > 760 && contact && aboutFlex && !aboutFlex.contains(contact)) {
    aboutFlex.appendChild(contact);
  }
}
window.addEventListener('load', moveContactBox);
window.addEventListener('resize', moveContactBox);
