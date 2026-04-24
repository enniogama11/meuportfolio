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
// ANIMATED COUNTERS
// ===========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            if (!counter.hasAttribute('data-target')) {
                counter.setAttribute('data-target', target);
                counter.innerText = '0';
            }
            
            const count = +counter.innerText.replace('%', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('%') || counter.getAttribute('data-target').includes('%') ? '%' : '');
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
            }
        };
        updateCount();
    });
}

// ===========================
// INTERSECTION OBSERVER (Reveal & Counters)
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('stats-card')) {
                animateCounters();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// ===========================
// MAGNETIC BUTTONS & TILT CARDS
// ===========================
const magneticElements = document.querySelectorAll('.btn, .social-icon, .btn-cv');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const pos = el.getBoundingClientRect();
        const x = e.clientX - pos.left - pos.width / 2;
        const y = e.clientY - pos.top - pos.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
    });
});

const tiltCards = document.querySelectorAll('.project-card, .skill-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const pos = card.getBoundingClientRect();
        const x = e.clientX - pos.left - pos.width / 2;
        const y = e.clientY - pos.top - pos.height / 2;
        const rX = (y / pos.height) * -10;
        const rY = (x / pos.width) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// ===========================
// MOBILE MENU
// ===========================
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMobile.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

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
