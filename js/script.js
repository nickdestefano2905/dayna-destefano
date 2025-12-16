// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling with Formspree
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        const successMsg = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
        const errorMsg = form.querySelector('.form-error');

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Hide any previous messages
        if (successMsg) successMsg.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                form.reset();
                if (successMsg) successMsg.style.display = 'block';
                submitBtn.textContent = 'Sent!';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            if (errorMsg) errorMsg.style.display = 'block';
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// FAQ Accordion functionality (optional enhancement)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.style.cursor = 'pointer';
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// Add animation on scroll (optional enhancement)
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

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .step-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

console.log('Dayna DeStefano Consulting - Website Loaded Successfully');
