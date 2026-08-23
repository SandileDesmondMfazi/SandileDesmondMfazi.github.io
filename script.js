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

// 4. Dropdown toggle behavior for touch/mobile
const dropdownToggles = document.querySelectorAll('.nav-link.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        // Only handle toggle behavior when the link is a trigger (href="#" or prevented)
        e.preventDefault();
        e.stopPropagation();

        const parent = toggle.parentElement;
        const menu = parent.querySelector('.dropdown-menu');
        if (!menu) return;

        const isOpen = menu.classList.contains('open');
        // Close any other open menus at the same level
        document.querySelectorAll('.dropdown-menu.open').forEach(m => {
            if (m !== menu) m.classList.remove('open');
        });

        if (isOpen) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            menu.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });
});

// Close open menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('.nav-link.dropdown-toggle[aria-expanded="true"]').forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
});