/* ==========================================================================
   Back-to-Top Button Visibility
   ========================================================================== */

const topButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    topButton.classList.toggle('show', scrollTop > 20);
});

/* ==========================================================================
   Scroll-triggered Slide-in Animation
   ========================================================================== */

function animateOnScroll() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
}

// Run animation on scroll and page load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

/* ==========================================================================
   Smooth Scrolling
   ========================================================================== */

// Add slide-in animation to headings and paragraphs on page load   
/* ==========================================================================
   Slide-Up on Scroll for Headings and Paragraphs
   ========================================================================== */

function animateSlideUp() {
    const slideText = document.querySelectorAll('.slide-up');
    const windowHeight = window.innerHeight;

    slideText.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// Run on scroll and load
window.addEventListener('scroll', animateSlideUp);
window.addEventListener('load', animateSlideUp);
document.querySelectorAll('h1, h2, h3, ul, p').forEach(el => {
    el.classList.add('slide-up');
});