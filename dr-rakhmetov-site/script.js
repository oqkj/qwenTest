// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if (nav.style.display === 'flex') {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = '#ffffff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                nav.style.display = 'none';
            }
        }
    });
});

// Modal Functionality
const modal = document.getElementById('modal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.querySelector('.close-modal');

// Open Modal
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close Modal
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form Submission Handling
const appointmentForm = document.getElementById('appointmentForm');
const modalForm = document.getElementById('modalForm');

function handleFormSubmit(e, formName) {
    e.preventDefault();
    
    // In a real application, you would send this data to a server
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log(`${formName} submitted:`, data);
    
    // Show success message
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время для подтверждения записи.');
    
    // Reset form
    e.target.reset();
    
    // Close modal if it's the modal form
    if (formName === 'Modal Form') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Appointment Form'));
}

if (modalForm) {
    modalForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Modal Form'));
}

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate Elements on Scroll (Simple Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards and review cards
document.querySelectorAll('.service-card, .review-card, .stat-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Phone number formatter (simple version)
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 0) {
            let formattedValue = '+7 ';
            if (value.length > 1) formattedValue += '(' + value.substring(1, 4);
            if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
            if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
            if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
            
            e.target.value = formattedValue;
        }
    });
});

console.log('Сайт Dr. Rakhmetov успешно загружен!');
