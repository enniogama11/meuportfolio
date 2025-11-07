// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Smooth scrolling & active links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
    a.classList.add('active');
  });
});

// simple scroll reveal (IntersectionObserver)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('.fade-up').forEach(el=> io.observe(el));

// small parallax for background on scroll
const bg = document.querySelector('.bg-layer');
window.addEventListener('scroll',()=>{
  const y = window.scrollY;
  if(bg) bg.style.transform = `translateY(${y * 0.06}px) scale(1.02)`;
});

// contact form (no backend)
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Mensagem enviada! Vou responder em breve — obrigado 😊');
  this.reset();
});
