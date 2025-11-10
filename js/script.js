// ===========================
// CONSTANTS
// ===========================

const FORMSPREE_ID = 'xyzgwqdo'; // Formspree ID para enniogama11@gmail.com

// ===========================
// DOM ELEMENTS
// ===========================

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// ===========================
// MOBILE MENU TOGGLE
// ===========================

menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close if it's a special link (like CV download)
        if (link.getAttribute('onclick')) {
            return;
        }
        navMobile.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(element => {
    observer.observe(element);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===========================
// FORM SUBMISSION WITH FORMSPREE
// ===========================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        showFormStatus('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('Por favor, insira um email válido.', 'error');
        return;
    }

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    submitBtn.style.opacity = '0.6';

    try {
        // Send to Formspree
        const response = await fetch(`https://formspree.io/f/${xldwkoen}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
            }),
        });

        if (response.ok) {
            showFormStatus('✓ Mensagem enviada com sucesso! Obrigado pelo contacto.', 'success');
            contactForm.reset();
            
            // Reset button
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.style.opacity = '1';
            }, 1500);
        } else {
            showFormStatus('✗ Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
            submitBtn.style.opacity = '1';
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('✗ Erro de conexão. Tente novamente mais tarde.', 'error');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.style.opacity = '1';
    }
});

// ===========================
// FORM STATUS MESSAGE
// ===========================

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status show ${type}`;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        formStatus.classList.remove('show');
    }, 5000);
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a special link (like CV download)
        if (this.getAttribute('onclick')) {
            return;
        }

        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// PARALLAX EFFECT (Optional)
// ===========================

window.addEventListener('scroll', () => {
    const bgLayer = document.querySelector('.bg-layer');
    if (bgLayer) {
        bgLayer.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// ===========================
// INITIALIZATION
// ===========================

console.log('Portfolio loaded successfully!');
console.log('Formspree ID:', FORMSPREE_ID);

