document.addEventListener('DOMContentLoaded', () => {

    // --- Language Toggle Logic (3 Languages: DE, FR, EN) ---
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'de'; // default

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang; // Accessibility

        // Update all text elements
        const elements = document.querySelectorAll('[data-de], [data-fr], [data-en]');

        elements.forEach(el => {
            if (el.dataset[lang]) {
                // Standard text update
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.textContent = el.dataset[lang];
                } else {
                    // If it contains HTML keys (like <br>), innerHTML is safer
                    el.innerHTML = el.dataset[lang];
                }
            }
        });

        // Update active state on language buttons
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
    }

    // Add click listeners to all language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            if (newLang && newLang !== currentLang) {
                setLanguage(newLang);
            }
        });
    });

    // --- Mobile Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Reveal on Scroll Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger slightly earlier
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset calculation for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
