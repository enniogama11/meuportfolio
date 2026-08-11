// ===========================
// CONSTANTS & CONFIG
// ===========================
const FORMSPREE_ID = 'xldwkoen';

// ===========================
// DOM ELEMENTS
// ===========================
const loader = document.getElementById('loader');
const scrollProgress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// ===========================
// PAGE LOADER
// ===========================
window.addEventListener('load', () => {
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        initTypewriter();
    }, 1500);
});

// ===========================
// SCROLL PROGRESS BAR
// ===========================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";
});

// ===========================
// TYPEWRITER EFFECT
// ===========================
function initTypewriter() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const text = heroSubtitle.innerText;
    heroSubtitle.innerText = '';
    heroSubtitle.classList.add('typewriter-cursor');

    let i = 0;
    function type() {
        if (i < text.length) {
            heroSubtitle.innerText += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

// ===========================
// MAGNETIC BUTTONS & TILT CARDS
// ===========================
const magneticElements = document.querySelectorAll('.btn, .social-icon');

function addRafMouseEffect(el, onFrame, resetStyle = '') {
    let frameRequested = false;
    let latestEvent = null;

    el.addEventListener('mousemove', (event) => {
        latestEvent = event;
        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(() => {
                const pos = el.getBoundingClientRect();
                const x = latestEvent.clientX - pos.left - pos.width / 2;
                const y = latestEvent.clientY - pos.top - pos.height / 2;
                onFrame(el, x, y, pos);
                frameRequested = false;
            });
        }
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = resetStyle;
        frameRequested = false;
        latestEvent = null;
    });
}

magneticElements.forEach(el => {
    addRafMouseEffect(el, (element, x, y) => {
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }, 'translate(0px, 0px)');
});

const tiltCards = document.querySelectorAll('.project-card');
tiltCards.forEach(card => {
    addRafMouseEffect(card, (element, x, y, pos) => {
        const rX = (y / pos.height) * -10;
        const rY = (x / pos.width) * 10;
        element.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
});

// ===========================
// MOBILE MENU
// ===========================
if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
}

if (navMobile && menuToggle) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMobile.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===========================
// FORM SUBMISSION
// ===========================
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';

        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                showFormStatus('✓ Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
            } else {
                showFormStatus('✗ Erro ao enviar. Tente novamente.', 'error');
            }
        } catch (err) {
            showFormStatus('✗ Erro de conexão.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Mensagem';
        }
    });
}

function showFormStatus(msg, type) {
    formStatus.innerText = msg;
    formStatus.className = `form-status show ${type}`;
    setTimeout(() => formStatus.classList.remove('show'), 5000);
}

// ===========================
// SMOOTH SCROLL OFFSET
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
