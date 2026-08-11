document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sticky Navigation ---
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- 2. Mobile Menu Toggle (FULLY FUNCTIONAL) ---
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuIcon = document.getElementById("menu-icon");

    mobileBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Change icon between Menu (3 lines) and X (Close)
        if (navLinks.classList.contains("active")) {
            menuIcon.setAttribute("data-lucide", "x");
        } else {
            menuIcon.setAttribute("data-lucide", "menu");
        }
        lucide.createIcons(); // Re-render the icon
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuIcon.setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });

    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Menu Filtering ---
    const filterBtns = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            menuCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === "all" || card.classList.contains(filterValue)) {
                        card.style.display = "block";
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = "none";
                    }
                }, 300); 
            });
        });
    });
});
