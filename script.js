/**
 * Christian Felix - Artisan Charcutier
 * Script d'animations et interactions
 */

document.addEventListener('DOMContentLoaded', function() {

    // ================================================
    // Navigation fluide avec effet de scroll
    // ================================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Effet de transparence progressive
        if (currentScroll > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.8))';
        }

        lastScroll = currentScroll;
    });

    // ================================================
    // Défilement fluide pour les liens d'ancrage
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // Animation des éléments au scroll
    // ================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Ajouter la classe d'animation aux sections
    const sections = document.querySelectorAll(
        '.sf-block, .produit-card, .contact-block, .histoire-text p, .citation blockquote'
    );

    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

    // ================================================
    // Effet parallaxe léger sur le hero
    // ================================================
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    });

    // ================================================
    // Gestion du formulaire de contact
    // ================================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupération des valeurs
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulation d'envoi
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                submitBtn.style.background = '#2d5a27';

                // Reset après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ================================================
    // Animation des cartes produits au hover
    // ================================================
    const produitCards = document.querySelectorAll('.produit-card');

    produitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.image-placeholder').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.image-placeholder').style.transform = 'scale(1)';
        });
    });

    // Style pour l'animation de l'image
    const style = document.createElement('style');
    style.textContent = `
        .produit-image .image-placeholder {
            transition: transform 0.4s ease;
        }
    `;
    document.head.appendChild(style);

    // ================================================
    // Effet de soulignement progressif sur la nav
    // ================================================
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Style pour le lien actif
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--couleur-or) !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeStyle);

    // ================================================
    // Apparition douce au chargement
    // ================================================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

});
