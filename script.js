// Keep navigation consistent across every static page.
const siteNavigation = document.querySelector('nav');

if (siteNavigation) {
    siteNavigation.innerHTML = `
        <ul class="nav-menu">
            <li><a href="/">Home</a></li>
            <li class="nav-item has-mega-menu">
                <a href="#" role="button" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Services</a>
                <div class="dropdown-menu mega-menu">
                    <div class="mega-menu-content">
                        <div class="mega-col">
                            <div class="mega-col-header"><span class="blue-dot"></span> THE HOOK</div>
                            <div class="mega-col-sub">GET IN THE DOOR</div>
                            <a href="/services/workflow-automation" class="mega-service"><span class="service-name">Custom Automation</span><span class="service-tech">MAKE / POWER AUTOMATE</span></a>
                            <a href="/services/custom-portals" class="mega-service"><span class="service-name">Web &amp; Data Portals</span><span class="service-tech">APPS SCRIPT / POWER APPS</span></a>
                        </div>
                        <div class="mega-col">
                            <div class="mega-col-header"><span class="blue-dot"></span> THE BACKBONE</div>
                            <div class="mega-col-sub">UNIFY SYSTEMS</div>
                            <a href="/services/data-infrastructure" class="mega-service"><span class="service-name">Data Infrastructure</span><span class="service-tech">SNOWFLAKE / DATABRICKS</span></a>
                            <a href="/services/etl-pipelines" class="mega-service"><span class="service-name">Ingestion Pipelines</span><span class="service-tech">FIVETRAN / SSIS</span></a>
                        </div>
                        <div class="mega-col">
                            <div class="mega-col-header"><span class="blue-dot"></span> THE MULTIPLIER</div>
                            <div class="mega-col-sub">SCALE VALUE</div>
                            <a href="/services/semantic-modeling" class="mega-service"><span class="service-name">Semantic Modeling</span><span class="service-tech">DBT / DAX</span></a>
                            <a href="/services/bi-dashboards" class="mega-service"><span class="service-name">BI Dashboards</span><span class="service-tech">POWER BI / LOOKER</span></a>
                        </div>
                    </div>
                    <div class="mega-menu-footer"><span class="mega-footer-question">NOT SURE WHERE TO START?</span><a href="/contact" class="mega-footer-cta">GET YOUR BLUEPRINT</a></div>
                </div>
            </li>
            <li class="nav-item has-mega-menu">
                <a href="#" role="button" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">Industries</a>
                <div class="dropdown-menu mega-menu" style="width: 600px;">
                    <div class="mega-menu-content" style="grid-template-columns: repeat(2, 1fr);">
                        <div class="mega-col" style="padding: 2rem;"><a href="/industries/financial-services" class="mega-service" style="align-items: flex-start; text-align: left;"><span class="service-name">Financial Services &amp; Assurance</span><span class="service-tech">AUDIT TRAILS &amp; COMPLIANCE</span></a></div>
                        <div class="mega-col" style="padding: 2rem;"><a href="/industries/agriculture-logistics" class="mega-service" style="align-items: flex-start; text-align: left;"><span class="service-name">Agriculture &amp; Logistics</span><span class="service-tech">SUPPLY CHAIN VISIBILITY</span></a></div>
                    </div>
                    <div class="mega-menu-footer"><span class="mega-footer-question">DON'T SEE YOUR INDUSTRY?</span><a href="/contact" class="mega-footer-cta">GET YOUR BLUEPRINT</a></div>
                </div>
            </li>
            <li><a href="/assessment">Assessment</a></li>
            <li><a href="/onboarding">How We Work</a></li>
            <li><a href="/contact" class="btn-primary" style="padding: 0.6rem 1.5rem; color: var(--bg-white);">BOOK DISCOVERY</a></li>
        </ul>`;
}

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

// Mobile Footer Accordion Toggle
document.addEventListener("DOMContentLoaded", function() {
    const footerHeaders = document.querySelectorAll('.footer-col:not(:first-child) h4');
    
    footerHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Only trigger the accordion effect on mobile screens
            if (window.innerWidth <= 768) {
                const parentCol = header.parentElement;
                parentCol.classList.toggle('active');
            }
        });
    });
});