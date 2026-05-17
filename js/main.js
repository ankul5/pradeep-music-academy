document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
        cursorOutline.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
    });

    // Cursor Hover Effects
    const links = document.querySelectorAll('a, button, .gallery-item, select, input, textarea');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.transform += ' scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            cursorOutline.style.borderColor = 'var(--primary)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(255,255,255,0.5)';
        });
    });

    // 2. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. Overlay Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    
    if (hamburger && menuOverlay && menuBackdrop) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
            document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
        };

        hamburger.addEventListener('click', toggleMenu);
        menuBackdrop.addEventListener('click', toggleMenu);
        
        // Close menu when clicking a link
        const overlayLinks = menuOverlay.querySelectorAll('a');
        overlayLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                menuBackdrop.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 5. Enhanced Scroll Reveal (3D)
    const revealElements = document.querySelectorAll('.reveal, .reveal-3d');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-bar');
    
    if (statsSection) {
        let animated = false;
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                stats.forEach(stat => {
                    const targetText = stat.getAttribute('data-target');
                    const target = parseInt(targetText);
                    let current = 0;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current) + (targetText.includes('+') ? '+' : '');
                            setTimeout(updateCounter, duration / steps);
                        } else {
                            stat.innerText = targetText;
                        }
                    };
                    updateCounter();
                });
                animated = true;
            }
        });
        statsObserver.observe(statsSection);
    }

    // 7. WhatsApp Form Submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const instrument = document.getElementById('instrument').value;
            const message = document.getElementById('message').value;
            
            const whatsappNumber = "918806565063";
            const text = `*New Booking Request*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Instrument:* ${instrument}%0A*Message:* ${message}`;
            
            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }
});
