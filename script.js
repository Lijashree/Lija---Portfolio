// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active Navigation Link on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active link
    const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const { offsetTop, offsetHeight } = section;
            const link = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        }
    });
});

// Download Resume Function - DIRECT DOWNLOAD (NO NEW TAB)
function downloadResume() {
    showNotification('⏳ Preparing your download...');
    
    fetch('Lijashree_B_Resume.pdf')
        .then(response => response.blob())
        .then(blob => {
            saveAs(blob, 'Lijashree_B_Resume.pdf'); // Uses FileSaver.js
            showNotification('✅ Resume downloaded!');
        })
        .catch(error => {
            showNotification('❌ Error downloading resume');
            console.error(error);
        });
}

// Modern Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5);
        z-index: 10000;
        font-weight: 600;
        animation: slideInRight 0.5s ease-out;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Contact Form Submit with Web3Forms
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const originalText = submitButton.textContent;

    formMessage.style.display = 'none';
    const formData = new FormData(form);

    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';

        if (data.success) {
            formMessage.textContent = '✅ Message Sent Successfully! I will get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)';
            formMessage.style.border = '1px solid #10b981';
            formMessage.style.color = '#6ee7b7';

            submitButton.textContent = '✅ Sent Successfully!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            form.reset();

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)';
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            formMessage.textContent = '❌ Message Not Sent. Please try again or email me directly.';
            formMessage.style.display = 'block';
            formMessage.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)';
            formMessage.style.border = '1px solid #ef4444';
            formMessage.style.color = '#fca5a5';

            submitButton.textContent = '❌ Failed to Send';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)';
                formMessage.style.display = 'none';
            }, 5000);
        }
    })
    .catch(error => {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';

        formMessage.textContent = '❌ Network Error! Please check your connection and try again.';
        formMessage.style.display = 'block';
        formMessage.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)';
        formMessage.style.border = '1px solid #ef4444';
        formMessage.style.color = '#fca5a5';

        submitButton.textContent = '❌ Network Error';
        submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

        console.error('Form submission error:', error);

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)';
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Particle Background Effect for ALL Sections
function createParticles() {
    const particleIds = [
        'particles-home',
        'particles-about', 
        'particles-skills',
        'particles-projects',
        'particles-resume',
        'particles-contact'
    ];

    particleIds.forEach(id => {
        const particlesContainer = document.getElementById(id);
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    });

    // Add CSS animation for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10%, 90% {
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Scroll to Top Button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Auto-update copyright year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Create particle effect for all sections
    createParticles();

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Set home section as visible immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }

    // Show/hide scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
    }
});

// Add 3D tilt effect to cards on mouse move
document.querySelectorAll('.project-card, .skill-card, .education-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
