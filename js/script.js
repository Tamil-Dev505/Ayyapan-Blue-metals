/* ============================================
   SHREE AYYAPAN BLUE METALS - MAIN JAVASCRIPT
   ============================================ */

// =============================================
// CONFIGURATION - Update these values as needed
// =============================================
const CONFIG = {
  // WhatsApp number (update with actual number)
  // Format: country code + number, no spaces or special characters
  whatsappNumber: '917539976424',

  // Business name
  businessName: 'Shree Ayyapan Blue Metals & Kamatchi Amman Hollow Blocks',

  // Default WhatsApp message
  defaultMessage: 'Hello, I would like to enquire about construction materials from Shree Ayyapan Blue Metals & Kamatchi Amman Hollow Blocks.',
};

// =============================================
// MOBILE NAVIGATION
// =============================================
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// =============================================
// STICKY NAVBAR
// =============================================
function initStickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// =============================================
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// =============================================
// WHATSAPP INTEGRATION
// =============================================
function openWhatsApp(message) {
  const msg = message || CONFIG.defaultMessage;
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function initWhatsAppButtons() {
  // Floating WhatsApp button
  const floatingBtn = document.getElementById('whatsappFloat');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
      openWhatsApp();
    });
  }

  // Product-specific enquiry buttons
  const enquiryBtns = document.querySelectorAll('[data-product-enquiry]');
  enquiryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product-enquiry');
      const message = `Hello, I would like to enquire about ${productName} from ${CONFIG.businessName}.`;
      openWhatsApp(message);
    });
  });

  // Godown rental specific enquiry buttons
  const godownBtns = document.querySelectorAll('[data-godown-enquiry]');
  godownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const message = "Hello, I am interested in your godown rental facility in Devathanapatti. I would like to know about the available storage space, rental charges, facilities, and availability. Please share more details.";
      openWhatsApp(message);
    });
  });

  // General WhatsApp buttons
  const waBtns = document.querySelectorAll('[data-whatsapp]');
  waBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const message = btn.getAttribute('data-whatsapp') || CONFIG.defaultMessage;
      openWhatsApp(message);
    });
  });
}

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// GALLERY LIGHTBOX
// =============================================
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let galleryItems = [];
  let currentIndex = 0;

  function updateGalleryItems() {
    galleryItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
  }

  function openLightbox(index) {
    updateGalleryItems();
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-item-label');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = label ? label.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-item-label');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = label ? label.textContent : '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-item-label');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = label ? label.textContent : '';
  }

  // Attach click events to gallery items
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);

  // Close on overlay click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// =============================================
// GALLERY FILTERS
// =============================================
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// =============================================
// CONTACT FORM VALIDATION
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    form.querySelectorAll('.form-error').forEach(err => {
      err.classList.remove('active');
    });
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.classList.remove('error');
    });

    // Validate Full Name
    const name = form.querySelector('#fullName');
    if (name && name.value.trim().length < 2) {
      showError(name, 'nameError', 'Please enter your full name.');
      isValid = false;
    }

    // Validate Phone
    const phone = form.querySelector('#phoneNumber');
    if (phone) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, 'phoneError', 'Please enter a valid 10-digit phone number.');
        isValid = false;
      }
    }

    // Validate Product Selection
    const product = form.querySelector('#productSelect');
    if (product && product.value === '') {
      showError(product, 'productError', 'Please select a product.');
      isValid = false;
    }

    // Validate Message
    const message = form.querySelector('#message');
    if (message && message.value.trim().length < 10) {
      showError(message, 'messageError', 'Please enter a message (at least 10 characters).');
      isValid = false;
    }

    if (isValid) {
      // Generate WhatsApp message with form data
      const waMessage = `Hello ${CONFIG.businessName},\n\n` +
        `Name: ${name.value.trim()}\n` +
        `Phone: ${phone.value.trim()}\n` +
        `Product: ${product.options[product.selectedIndex].text}\n` +
        `Message: ${message.value.trim()}\n\n` +
        `Sent from website contact form.`;

      openWhatsApp(waMessage);

      // Note: The form does not have a backend. This sends data via WhatsApp.
      // For a proper backend submission, integrate with a form service.
    }
  });

  function showError(input, errorId, message) {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('active');
    }
  }
}

// =============================================
// LAZY LOADING IMAGES
// =============================================
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

// =============================================
// HERO VIDEO AUTOPLAY & FALLBACK MANAGEMENT
// =============================================
function initHeroVideo() {
  const heroVideo = document.querySelector('.hero-video');
  if (!heroVideo) return;

  // Attempt video playback (handles low-power mode / autoplay policy gracefully)
  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.log('Video autoplay prevented or restricted:', error);
      // Poster image fallback will naturally display if video is unable to autoplay
    });
  }
}

// =============================================
// PRELOADER & HERO REVEAL ANIMATION
// =============================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('preloaderProgress');

  if (!preloader) {
    document.body.classList.add('loaded');
    return;
  }

  const duration = 2400; // 2.4 seconds total display time
  const startTime = Date.now();

  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const percentage = Math.min(Math.floor((elapsed / duration) * 100), 100);

    if (progress) {
      progress.style.width = percentage + '%';
    }

    if (elapsed < duration) {
      requestAnimationFrame(updateProgress);
    } else {
      if (progress) progress.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 300);
    }
  }

  requestAnimationFrame(updateProgress);
}

// =============================================
// INITIALIZE ALL MODULES
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMobileNav();
  initStickyNav();
  initActiveNav();
  initWhatsAppButtons();
  initScrollReveal();
  initBackToTop();
  initGalleryLightbox();
  initGalleryFilters();
  initContactForm();
  initLazyLoading();
  initSmoothScroll();
  initHeroVideo();
});
