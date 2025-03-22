// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.mobile-menu-btn')) {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerHeight = 80;
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }

        if (sectionId =='hero' && scrollPosition < 100) {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });
        }
    });
});

// Add fixed header class on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

// // Form submission
// const contactForm = document.querySelector('.contact-form form');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Get form values
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
        
//         // Simple validation
//         if (!name || !email || !message) {
//             alert('Please fill in all fields');
//             return;
//         }
        
//         // Here you would typically send the form data to a server
//         // For demo purposes, we'll just show a success message
//         alert('Thank you for your message! We will get back to you soon.');
//         contactForm.reset();
//     });
// }

// // Newsletter subscription
// const newsletterForm = document.querySelector('.footer-newsletter form');
// if (newsletterForm) {
//     newsletterForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         const email = newsletterForm.querySelector('input[type="email"]').value;
        
//         if (!email) {
//             alert('Please enter your email address');
//             return;
//         }
        
//         // Here you would typically send the subscription to a server
//         // For demo purposes, we'll just show a success message
//         alert('Thank you for subscribing to our newsletter!');
//         newsletterForm.reset();
//     });
// }

// Animation on scroll
window.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.card, .impact-item, .about-image, .goals-image, .vision-image, .feature, .advantage, .stat, .example-item, .ecosystem-item, .partnership-item, .timeline-item'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }, 500);
    });
}); 

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 2, // Default for larger screens
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { slidesPerView: 2, spaceBetween: 10 },  // Phones
            480: { slidesPerView: 3, spaceBetween: 15 },  // Small tablets
            768: { slidesPerView: 4, spaceBetween: 20 },  // Tablets
            1024: { slidesPerView: 4, spaceBetween: 30 }  // Desktops
        }
    });
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        tabContents[index].classList.add('active');
    });
});

const ctx = document.getElementById('evaluationChart').getContext('2d');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            'Functionality and effectiveness (25%)',
            'User experience and accessibility (25%)',
            'Innovation and originality (20%)',
            'Scalability and production viability (20%)',
            'Presentation quality (10%)'
        ],
        datasets: [{
            data: [25, 25, 20, 20, 10],
            backgroundColor: [
                '#6a0dad', '#7fbcff', '#ff6384', '#ffcd56', '#36a2eb'
            ],
        }]
    },
    options: {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    }
});
