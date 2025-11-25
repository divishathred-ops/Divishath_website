// Projects data
const projectsData = [
    {
        name: "Eurenza Trading Platform",
        description: "Comprehensive fintech platform with cryptocurrency and fiat exchange integration, order book mechanics, and real-time trading features",
        technologies: ["Flutter", "Firebase", "Cryptocurrency APIs", "Real-time Database"],
        details: "A full-featured trading platform that handles both cryptocurrency and traditional banking operations. Includes real-time order book, multi-currency support, secure authentication, and seamless payment gateway integration.",
        features: [
            "Real-time order book with WebSocket integration",
            "Cryptocurrency to fiat exchange capabilities",
            "Secure user authentication and authorization",
            "Multi-currency wallet management",
            "Payment gateway integration"
        ]
    },
    {
        name: "Authentication System",
        description: "Secure user authentication system with JWT tokens, Firebase Auth, and Google Sign-In integration",
        technologies: ["Firebase", "JWT", "OAuth", "Security"],
        details: "Enterprise-grade authentication system featuring multiple sign-in methods, token-based security, and seamless user management.",
        features: [
            "JWT token-based authentication",
            "Google Sign-In integration",
            "Password reset functionality",
            "Session management",
            "Role-based access control"
        ]
    },
    {
        name: "ISP Management System",
        description: "Business management solution for cable TV and internet service provider operations",
        technologies: ["Automation", "Database Management", "Backend APIs"],
        details: "Comprehensive business management system for scaling ISP operations, including customer management, service tracking, and automated workflows.",
        features: [
            "Customer database management",
            "Service subscription tracking",
            "Automated billing systems",
            "Performance analytics dashboard",
            "WhatsApp integration for communications"
        ]
    },
    {
        name: "Payment Gateway Integration",
        description: "Multi-currency payment processing with cryptocurrency-to-fiat conversion",
        technologies: ["Payment APIs", "Firebase", "Cloud Functions"],
        details: "Robust payment processing solution supporting multiple currencies and payment methods with secure transaction handling.",
        features: [
            "Multi-currency support",
            "Cryptocurrency payment processing",
            "Fiat currency conversion",
            "Transaction history and reporting",
            "Webhook integration for real-time updates"
        ]
    }
];

// Typing animation
const typingText = document.getElementById('typingText');
const roles = ['Backend Developer', 'FinTech Entrepreneur', 'Flutter Specialist', 'Platform Architect'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeRole, typeSpeed);
}

// Start typing animation
typeRole();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation based on scroll position
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scrolling for navigation links
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
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animateElements = document.querySelectorAll('.about, .skills, .projects, .services, .contact');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Project modal functionality
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDetails = document.getElementById('modalDetails');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech = document.getElementById('modalTech');

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectIndex = card.getAttribute('data-project');
        const project = projectsData[projectIndex];
        
        modalTitle.textContent = project.name;
        modalDetails.textContent = project.details;
        
        // Clear and populate features
        modalFeatures.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });
        
        // Clear and populate technologies
        modalTech.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tech;
            modalTech.appendChild(span);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Simulate form submission
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.className = 'form-message success';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate skill bars when in view
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Prevent right-click for production (optional)
// Uncomment if needed
// document.addEventListener('contextmenu', (e) => e.preventDefault());

console.log('Portfolio website loaded successfully!');