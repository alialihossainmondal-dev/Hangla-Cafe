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

    // --- 2. Mobile Menu Toggle (Basic setup for expansion) ---
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    // Note: To fully implement expanding menu, you'd toggle a class on navLinks here
    // For this design, navigation links jump to sections, so keeping it clean.

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
            observer.unobserve(entry.target); // Run only once
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
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            menuCards.forEach(card => {
                // Apply a slight fade-out effect
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === "all" || card.classList.contains(filterValue)) {
                        card.style.display = "block";
                        // Force reflow
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = "none";
                    }
                }, 300); // Wait for fade-out transition
            });
        });
    });

    // --- 5. Gallery Lightbox ---
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const closeBtn = lightbox.querySelector(".close-lightbox");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgSrc = item.querySelector("img").getAttribute("src");
            lightboxImg.setAttribute("src", imgSrc);
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent scrolling
        });
    });

    // Close lightbox on button click or clicking outside image
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
});
