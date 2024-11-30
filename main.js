
const navBar = document.querySelector('.nav-bar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-bar a');

function updateActiveSection() {
    const currentScroll = window.scrollY;
    const heroHeight = document.querySelector('#home').offsetHeight;

    // Show/hide navbar based on hero section
    if (currentScroll > heroHeight / 2) {
        navBar.classList.add('visible');
    } else {
        navBar.classList.remove('visible');
    }

    // Update active section
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (currentScroll >= sectionTop - sectionHeight / 3) {

            // Update nav links
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
            
            // Add current section tracking
            navBar.setAttribute('data-current-section', section.id);
        }
    });
}

// Smooth scroll with easeIn
document.querySelectorAll('a[href^="#"], .nav-dot').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') || `#${this.dataset.section}`;
        const target = document.querySelector(targetId);
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + startPosition;
        const startTime = performance.now();
        const duration = 400; // 1 second duration

        function ease(t) {
            return t * t * t; // Cubic easing
        }

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = ease(progress);
            
            window.scrollTo(0, startPosition + (targetPosition - startPosition) * easeProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    });
});
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Position particles across the entire screen
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        // Random movement direction for each particle
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--moveX', `${moveX}px`);
        particle.style.setProperty('--moveY', `${moveY}px`);
        // Random animation delay
        particle.style.animationDelay = Math.random() * 4 + 's';
        particles.appendChild(particle);
    }
});
const container = document.querySelector('.license-container');
const frontCard = container.querySelector('.front');
const backCard = container.querySelector('.hidden');
let isFlipped = false;

container.addEventListener('click', () => {
  const current = isFlipped ? backCard : frontCard;
  const next = isFlipped ? frontCard : backCard;
  
  current.classList.add('flip-diagonal-1-tr');
  
  setTimeout(() => {
    current.classList.remove('flip-diagonal-1-tr');
    current.classList.add('hidden');
    next.classList.remove('hidden');
  }, 420);
  
  isFlipped = !isFlipped;
});
const projectSection = document.getElementById('projects');
const projectLiItems = projectSection.querySelectorAll('li');

function toggleAccordion() {
    projectLiItems.forEach(item => {
        item.classList.remove('active');
    });
    this.classList.add('active');
}

projectLiItems.forEach(item => {
    item.addEventListener('click', toggleAccordion);
});
// Material floating label effect
document.querySelectorAll('.form-control').forEach(element => {
    // Initial check for pre-filled inputs
    if (element.value) {
        element.parentElement.classList.add('active');
    }

    // Handle focus events
    element.addEventListener('focus', () => {
        element.parentElement.classList.add('active');
    });

    // Handle blur events
    element.addEventListener('blur', () => {
        if (!element.value) {
            element.parentElement.classList.remove('active');
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    alert('Form submitted! In a real application, this would be sent to a server.');
});

// Listen for scroll events
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('resize', updateActiveSection);

// Initial update
updateActiveSection();