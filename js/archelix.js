/* ==========================================================================
   Back-to-Top Button Visibility
   ========================================================================== */

// Select the back-to-top button from the DOM and store it in a constant.
// `const` is a block-scoped variable and cannot be reassigned.
const topButton = document.querySelector('.back-to-top'); // [HTMLElement or null]

// Add a scroll event listener to the window object
window.addEventListener('scroll', () => {
    // Get the vertical scroll distance from the top of the document.
    // `scrollTop` is a number (in pixels).
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log(`[Back-to-Top] Scroll position: ${scrollTop}`);
    // Toggle the 'show' class if scrollTop is greater than 20.
    // `toggle(className, condition)` adds class if condition is true, removes if false.
    topButton.classList.toggle('show', scrollTop > 20);
});





/* ==========================================================================
   Scroll-triggered Slide-in Animation
   ========================================================================== */

// Define a function that checks for .slide-in-left and .slide-in-right elements
function animateOnScroll() {
    // Get all elements with these classes and store in a NodeList
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right'); // [NodeList of Elements]

    // Get the height of the visible browser window (viewport)
    const windowHeight = window.innerHeight; // [Number]
    console.log(`[Slide-In] Window height: ${windowHeight}`);

    // Loop through each slide-in element
    elements.forEach(el => {
        // Get the distance from the top of the viewport to the element
        const elementTop = el.getBoundingClientRect().top; // [Number]
        console.log(`[Slide-In] ${el.className} top: ${elementTop}`);

        // If the element is within 100px of entering the viewport, make it visible
        if (elementTop < windowHeight - 100) {
            el.classList.add('visible'); // Adds class which triggers CSS animation
            console.log(`[Slide-In] ${el.className} made visible`);
        }
    });
}

// Attach the animation function to both scroll and load events
window.addEventListener('scroll', animateOnScroll); // Triggers when user scrolls
window.addEventListener('load', animateOnScroll);   // Triggers once page fully loads





/* ==========================================================================
   Slide-Up on Scroll for Headings and Paragraphs
   ========================================================================== */

// Add slide-in animation to headings and paragraphs on page load   

// Define a function for animating text (headings, paragraphs, etc.) to slide up
function animateSlideUp() {
    // Select all elements with .slide-up (added below)
    const slideText = document.querySelectorAll('.slide-up'); // [NodeList of Elements]

    // Get current height of the browser window
    const windowHeight = window.innerHeight; // [Number]
    console.log(`[Slide-Up] Window height: ${windowHeight}`);

    // Loop through each .slide-up element
    slideText.forEach(el => {
        // Get the distance from the top of the viewport to the element
        const elementTop = el.getBoundingClientRect().top; // [Number]
        console.log(`[Slide-Up] ${el.tagName} top: ${elementTop}`);

        // If the element is in view (with 60px buffer), add the 'visible' class
        if (elementTop < windowHeight - 60) {
            el.classList.add('visible'); // Triggers slide-up animation via CSS
            console.log(`[Slide-Up] ${el.tagName} made visible`);
        }
    });
}

// Run the animation function on scroll and load
window.addEventListener('scroll', animateSlideUp); // When user scrolls
window.addEventListener('load', animateSlideUp);   // When page finishes loading

// Automatically apply the slide-up class to common text elements (optional automation)
document.querySelectorAll('h1, h2, h3, ul, p').forEach(el => {
    // Add the slide-up class so they can be animated on scroll
    el.classList.add('slide-up');
    console.log(`[Init] Added slide-up to <${el.tagName.toLowerCase()}>`);
});