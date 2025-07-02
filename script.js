// script.js

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter');
    const text = typewriterText.textContent;
    typewriterText.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typewriterText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typeWriter();
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Active navigation link highlighting based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact form functionality (dummy function)
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Log form data (in a real app, you would send this to a server)
            console.log('Form submitted:', formEntries);
            
            // Show success message
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Parallax and floating elements effect
    console.log('Script loaded - checking for parallax elements');
    
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    console.log('Found parallax elements:', parallaxElements.length);
    console.log('Found floating shapes:', floatingShapes.length);
    
    // Force initial positioning for visibility
    parallaxElements.forEach((element, index) => {
        element.style.transform = 'translate3d(0px, 0px, 0px)';
        element.style.opacity = '0.5'; // Make more visible for testing
    });
    
    floatingShapes.forEach((shape, index) => {
        shape.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg)';
        shape.style.opacity = '0.5'; // Make more visible for testing
    });
    
    // Improved smooth scrolling and element propagation
    function updateParallax() {
        let scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const sections = document.querySelectorAll('section');
        
        // Get current section based on scroll position
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
                currentSectionIndex = index;
            }
        });
        
        // Apply smoother movement to parallax elements
        parallaxElements.forEach((element, index) => {
            // Use slower base speeds for smoother effect
            const baseSpeed = 0.1 + (index * 0.03);
            
            // Simpler, smoother motion calculations
            const yPos = -scrollY * baseSpeed;
            const xPos = Math.sin(scrollY * 0.0005) * 30 * (index + 1);
            
            // Smoother scale with less variation
            const scale = 1 + Math.sin(scrollY * 0.001) * 0.05;
            
            // Apply smooth easing for transforms
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
            element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale})`;
            
            // Subtle opacity changes
            const opacityBase = 0.15;
            const opacityVariation = Math.sin(scrollY * 0.001) * 0.05;
            element.style.opacity = opacityBase + opacityVariation;
        });
        
        // Apply smoother movement to floating shapes
        floatingShapes.forEach((shape, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const baseSpeed = 0.05 + (index * 0.02);
            
            // Calculate smoother motion
            const xPos = direction * scrollY * baseSpeed * 0.5;
            const yPos = -scrollY * baseSpeed * 0.3;
            const rotation = scrollY * 0.02 * direction;
            
            // Apply smoother transitions
            shape.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            shape.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
        // Process elements within visible sections with smoother animations
        sections.forEach((section, sectionIndex) => {
            const rect = section.getBoundingClientRect();
            
            // Only process sections near the viewport
            if (rect.top < windowHeight + 100 && rect.bottom > -100) {
                // More linear calculation of section progress
                const sectionProgress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
                
                // Content elements within section
                const sectionElements = section.querySelectorAll('h2, h3, p, .skills-list li, .project-card');
                
                sectionElements.forEach((el, elementIndex) => {
                    // Skip elements with no-propagate class
                    if (el.classList.contains('no-propagate')) return;
                    
                    // Calculate staggered timing based on element position
                    const staggerDelay = Math.min(0.5, elementIndex * 0.02);
                    const effectTiming = Math.max(0, Math.min(1, sectionProgress - staggerDelay));
                    
                    // Smoother, smaller translation effect
                    const translateY = (1 - effectTiming) * 15;
                    const opacity = Math.min(1, effectTiming * 1.5);
                    const scale = 0.98 + effectTiming * 0.02;
                    
                    // Apply the effect with proper easing
                    el.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease-out';
                    el.style.transform = `translateY(${translateY}px) scale(${scale})`;
                    el.style.opacity = opacity;
                });
            }
        });
        
        ticking = false;
    }
    
    // Optimize scroll handler for smoother performance
    let lastScrollY = window.scrollY;
    let ticking = false;
    let rafId = null;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            // Cancel any pending animation frame to prevent stacking
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            // Request new frame with throttling
            rafId = requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
                rafId = null;
            });
            
            ticking = true;
        }
    }, { passive: true });
    
    // Remove the debug indicator element
    document.addEventListener('DOMContentLoaded', function() {
        // Remove the existing Effects Active indicator
        const existingIndicators = document.querySelectorAll('div[style*="Effects Active"]');
        existingIndicators.forEach(el => el.remove());
        
        // Find and remove any existing debug indicators
        const debugElements = document.querySelectorAll('div[style*="Parallax: ACTIVE"]');
        debugElements.forEach(el => el.remove());
        
        // Also remove any element with debug-related text content
        document.querySelectorAll('div').forEach(el => {
            if (el.textContent && (el.textContent.includes('Parallax:') || 
                                  el.textContent.includes('Effects Active'))) {
                el.remove();
            }
        });
    });
    
    // Modify the project card animation for smoother movement
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
        
        projectCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Use smoother, smaller movements
                const scrollSpeed = 0.02 + (index * 0.005);
                const translateY = scrollDirection * Math.min(10, Math.abs(scrollTop - lastScrollTop) * scrollSpeed);
                
                // Apply smoother transition
                card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
                card.style.transform = `translateY(${-translateY}px)`;
                
                clearTimeout(card.resetTimeout);
                card.resetTimeout = setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                }, 300);
            }
        });
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Initialize the propagation effects
    initPropagationEffects();
});

// Also add this function to initialize the propagation effect for all elements
function initPropagationEffects() {
    // Select all content elements that should have propagation effects
    const contentElements = document.querySelectorAll('h2, h3, p, .skills-list li, .project-card');
    
    // Set initial state (slightly translated down and partially transparent)
    contentElements.forEach(el => {
        el.style.transform = 'translateY(20px) scale(0.95)';
        el.style.opacity = '0';
        el.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        
        // Skip immediate transition for offscreen elements
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            el.classList.add('no-transition');
            setTimeout(() => {
                el.classList.remove('no-transition');
            }, 500);
        }
    });
    
    // Force an initial parallax update
    updateParallax();
}