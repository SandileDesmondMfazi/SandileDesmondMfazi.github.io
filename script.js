// 1. Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cubic-bezier friction
    smooth: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 2. Initialize GSAP Staggered Fade-Up Reveal
gsap.registerPlugin(ScrollTrigger);

// Select all elements with the 'gsap-reveal' class
const revealElements = document.querySelectorAll('.gsap-reveal');

revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { 
            y: 40, // Translate upward along the Y-axis[cite: 5]
            opacity: 0 // Opacity transitions from 0 to 1[cite: 5]
        },
        {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Triggers when element is 85% down the viewport
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out", // Custom cubic-bezier easing formula[cite: 5]
            stagger: 0.2
        }
    );
});

// 3. Hamburger Menu Toggle Logic
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('nav ul');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        // Toggles the 'X' animation on the bars
        mobileMenu.classList.toggle('is-active');
        // Slides the navigation menu down
        navMenu.classList.toggle('active');
    });
};