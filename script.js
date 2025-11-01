// =====================================
// SREE KUMAR WEBSITE - MAIN SCRIPT
// =====================================

// Partner pages mapping
const brandPageMap = {
    mitsubishi: 'mitsubishi.html',
    lloyd: 'lloyd.html',
    hitachi: 'hitachi.html',
    bosch: 'bosch.html',
    sharp: 'sharp.html',
    havells: 'havells.html',
    mccoy: 'mccoy.html',
    standard: 'standard.html',
    onida: 'onida.html'
};

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ===== DETECT MOBILE DEVICE =====
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
}

// ===== VIEWPORT HEIGHT FIX FOR MOBILE =====
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// ===== THROTTLE FUNCTION FOR PERFORMANCE =====
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== NAVBAR FUNCTIONALITY =====
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// Navbar scroll effect
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}, 100));

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Mobile menu close when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth < 992) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    }
});

// Prevent scroll when menu is open
navbarToggler.addEventListener('click', () => {
    if (window.innerWidth < 992) {
        document.body.style.overflow = navbarCollapse.classList.contains('show') ? '' : 'hidden';
    }
});

// ===== SCROLL ANIMATIONS =====
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .partner-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        scrollAnimationObserver.observe(el);
    });
});

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== PARTNER CARDS INTERACTION =====
const partnerImages = document.getElementById('partnerImages');
const partnerImageGrid = document.getElementById('partnerImageGrid');
const closePartnerBtn = document.getElementById('closePartnerImages');
const partnerCards = document.querySelectorAll('.partner-card');

// Partner data object with all images
const partnerImageData = {
    mitsubishi: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Inverter Split AC', 
                description: 'Advanced inverter technology with efficient cooling and low power consumption.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Smart AC System', 
                description: 'Wi-Fi enabled smart control with mobile app integration and voice commands.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Multi-Split System', 
                description: 'Connect multiple indoor units to one outdoor unit for whole-home cooling.' 
            }
        ]
    },
    lloyd: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Smart Inverter AC', 
                description: 'Next-generation inverter technology with smart connectivity and energy monitoring.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Heavy Duty Window AC', 
                description: 'Powerful cooling for large spaces with anti-bacterial filter and auto restart.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Portable AC Unit', 
                description: 'Compact and mobile cooling solution perfect for single rooms and quick installations.' 
            }
        ]
    },
    hitachi: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Premium Inverter AC', 
                description: 'Top-tier cooling performance with advanced filtration and silent operation mode.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Eco-Friendly Split AC', 
                description: 'Environment-conscious cooling with eco-friendly refrigerant and energy saving.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Commercial Cooling System', 
                description: 'Industrial-grade air conditioning for offices and commercial spaces.' 
            }
        ]
    },
    bosch: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Climate 5000 Series', 
                description: 'German-engineered cooling excellence with precise temperature control.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Quiet Comfort AC', 
                description: 'Ultra-quiet operation with advanced noise reduction technology.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Smart Climate Control', 
                description: 'IoT-enabled system with smartphone control and automation features.' 
            }
        ]
    },
    sharp: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Plasmacluster AC', 
                description: 'Advanced air purification with Plasmacluster Ion Technology for healthier air.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Energy Star Series', 
                description: 'High-efficiency cooling with superior energy ratings and cost savings.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Deluxe Inverter', 
                description: 'Premium inverter technology with rapid cooling and humidity control.' 
            }
        ]
    },
    havells: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Lloyd Grande AC', 
                description: 'Powerful cooling with high airflow and wide-angle air distribution.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Eleganza Series', 
                description: 'Stylish design with mood lighting and premium finish options.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Pro Inverter', 
                description: 'Professional-grade inverter AC with 4-way air swing and self-diagnosis.' 
            }
        ]
    },
    mccoy: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Value Series AC', 
                description: 'Budget-friendly cooling with reliable performance and basic smart features.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Compact Window AC', 
                description: 'Space-saving design with quick installation and efficient cooling.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Economy Inverter', 
                description: 'Cost-effective inverter technology with energy-saving modes.' 
            }
        ]
    },
    standard: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Comfort Plus AC', 
                description: 'Enhanced comfort features with adjustable airflow and sleep modes.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Commercial Series', 
                description: 'Heavy-duty cooling systems for offices and retail spaces.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', 
                alt: 'Standard Inverter', 
                description: 'Reliable inverter technology with standard features and good efficiency.' 
            }
        ]
    },
    onida: {
        images: [
            { 
                src: 'https://images.unsplash.com/photo-1631545223936-b5d1d8b92b22?w=400&h=300&fit=crop', 
                alt: 'Smart Cooling Pro', 
                description: 'Advanced cooling with smartphone control and voice commands.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop', 
                alt: 'Dual Inverter AC', 
                description: 'Twin inverter compressor for faster cooling and better efficiency.' 
            },
            { 
                src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', 
                alt: 'Air Purifier AC', 
                description: 'Built-in air purification with PM 2.5 filter and ionizer.' 
            }
        ]
    }
};

// Partner cards click handler
partnerCards.forEach(card => {
    card.addEventListener('click', () => {
        const partner = card.getAttribute('data-partner');
        
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            partnerImages.classList.remove('active');
            partnerImageGrid.innerHTML = '';
        } else {
            partnerCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            displayPartnerImages(partner);
        }
    });
});

// Display partner images with "More Products" button
function displayPartnerImages(partner) {
    const data = partnerImageData[partner];
    
    if (!data) return;
    
    partnerImageGrid.innerHTML = '';
    partnerImageGrid.classList.add('loading');
    
    const imageRow = document.createElement('div');
    imageRow.className = 'row g-4 mb-4';
    
    // Display first 3 images
    data.images.forEach((image, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="partner-image-card" style="animation-delay: ${index * 0.1}s">
                <img src="${image.src}" alt="${image.alt}" class="img-fluid rounded">
                <div class="partner-product-content">
                    <h5>${image.alt}</h5>
                    <p class="product-description">${image.description}</p>
                </div>
            </div>
        `;
        imageRow.appendChild(col);
    });
    
    partnerImageGrid.appendChild(imageRow);
    
    // Add "More Products View" button
    const moreProductsContainer = document.createElement('div');
    moreProductsContainer.className = 'row mb-4';
    moreProductsContainer.innerHTML = `
        <div class="col-12 text-center">
            <button class="btn btn-primary btn-lg btn-custom more-products-btn" data-brand="${partner}">
                View More Products <i class="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    `;
    partnerImageGrid.appendChild(moreProductsContainer);
    
    // Add event listener to "More Products" button
    const moreProductsBtn = moreProductsContainer.querySelector('.more-products-btn');
    moreProductsBtn.addEventListener('click', () => {
        const brandPage = brandPageMap[partner];
        if (brandPage) {
            window.location.href = brandPage;
        }
    });
    
    partnerImages.classList.add('active');
    
    setTimeout(() => {
        partnerImageGrid.classList.remove('loading');
        partnerImages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Handle close button click
closePartnerBtn?.addEventListener('click', () => {
    partnerImages.classList.remove('active');
    partnerCards.forEach(c => c.classList.remove('active'));
    partnerImageGrid.innerHTML = '';
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        
        const whatsappMessage = `*New Contact Request from Sree Kumar Website*%0A%0A` +
                               `*Name:* ${encodeURIComponent(name)}%0A` +
                               `*Email:* ${encodeURIComponent(email)}%0A` +
                               `*Phone:* ${encodeURIComponent(phone)}%0A` +
                               `*Message:* ${encodeURIComponent(message)}`;
        
        const whatsappNumber = '919100071866';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        window.open(whatsappURL, '_blank');
        contactForm.reset();
        alert('Thank you! Redirecting to WhatsApp...');
    });

    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) {
                input.classList.remove('is-invalid');
            }
        });

        if (input.type === 'tel') {
            input.setAttribute('inputmode', 'numeric');
            input.setAttribute('pattern', '[0-9]*');
        }
        
        if (input.type === 'email') {
            input.setAttribute('inputmode', 'email');
        }
        
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', () => {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            });
        }
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CAROUSEL TOUCH SWIPE FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('#galleryCarousel');
if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            const nextButton = carousel.querySelector('.carousel-control-next');
            if (nextButton) nextButton.click();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            const prevButton = carousel.querySelector('.carousel-control-prev');
            if (prevButton) prevButton.click();
        }
    }
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== MOBILE ORIENTATION CHANGE =====
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY + 1);
        window.scrollTo(0, window.scrollY - 1);
    }, 100);
});

// ===== PREVENT ZOOM ON DOUBLE TAP =====
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===== SMOOTH SCROLL FOR MOBILE =====
if (isMobileDevice()) {
    document.documentElement.style.scrollBehavior = 'smooth';
}
