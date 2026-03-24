// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = ['home', 'about', 'skills', 'resume', 'contact'];
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

// Download Resume Function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // You can replace this URL with your actual resume PDF URL
    // Option 1: If you have a PDF file in the same directory
    link.href = 'Lijashree_B_Resume.pdf';
    
    // Option 2: If you want to use your resume image URL (will download as image)
    // link.href = 'https://6cc49bcb0150f92b3eb0ab1f121d35ebcfb72e48.cdn.bubble.io/f1737447671426x227647016819637950/Screenshot%202025-01-21%20100027.png';
    
    link.download = 'Lijashree_B_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    alert('📥 Resume download started! Thank you for your interest.');
}

// Contact Form Submit with Web3Forms
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const originalText = submitButton.textContent;
    
    // Hide any previous messages
    formMessage.style.display = 'none';
    
    // Get form data
    const formData = new FormData(form);
    
    // Show sending state
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
            // Success message
            formMessage.textContent = '✅ Message Sent Successfully! I will get back to you soon.';
            formMessage.style.display = 'block';
            formMessage.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)';
            formMessage.style.border = '1px solid #10b981';
            formMessage.style.color = '#6ee7b7';
            
            submitButton.textContent = '✅ Sent Successfully!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Reset form
            form.reset();
            
            // Reset button and hide message after 5 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)';
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            // Error message
            formMessage.textContent = '❌ Message Not Sent. Please try again or email me directly.';
            formMessage.style.display = 'block';
            formMessage.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)';
            formMessage.style.border = '1px solid #ef4444';
            formMessage.style.color = '#fca5a5';
            
            submitButton.textContent = '❌ Failed to Send';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            
            // Reset button after 5 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)';
                formMessage.style.display = 'none';
            }, 5000);
        }
    })
    .catch(error => {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Network error message
        formMessage.textContent = '❌ Network Error! Please check your connection and try again.';
        formMessage.style.display = 'block';
        formMessage.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)';
        formMessage.style.border = '1px solid #ef4444';
        formMessage.style.color = '#fca5a5';
        
        submitButton.textContent = '❌ Network Error';
        submitButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        
        console.error('Form submission error:', error);
        
        // Reset button after 5 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)';
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // First section should be visible immediately
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.opacity = '1';
        homeSection.style.transform = 'translateY(0)';
    }
});