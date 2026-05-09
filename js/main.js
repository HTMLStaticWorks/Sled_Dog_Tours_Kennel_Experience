/**
 * Sled Dog Tours & Kennel Experience - Core Logic
 * Animations: GSAP, ScrollTrigger
 * Effects: Snowfall, 3D Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
    initSnowfall();
    initGSAP();
    initMobileMenu();
    init3DTilt();
    initPreloader();
    initWeatherWidget();
    initVideoHero();
    initThemeSwitcher();
    initCustomCursor();
    initMagicalScroll();
});

// Custom Premium Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor hidden lg:block';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    const interactables = document.querySelectorAll('a, button, .tilt-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });
}

// Magical Scroll Parallax
function initMagicalScroll() {
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    parallaxImgs.forEach(img => {
        gsap.to(img, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// GSAP Initialization
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections on scroll with staggering
    const sections = gsap.utils.toArray('section');
    sections.forEach(section => {
        const reveals = section.querySelectorAll('.reveal-item');
        if (reveals.length > 0) {
            gsap.from(reveals, {
                opacity: 0,
                y: 100,
                rotateX: -15,
                stagger: 0.2,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                }
            });
        } else {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });

    // Hero Text Animation
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        delay: 0.5,
        ease: 'power4.out'
    });

    gsap.from('.hero-content p', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 1.3,
        ease: 'back.out(1.7)'
    });

    // Hero Floating Magic
    gsap.to('.hero-content', {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut'
    });
}

// Snowfall Particle System
function initSnowfall() {
    const canvas = document.createElement('canvas');
    canvas.id = 'snowfall-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height, snowflakes = [];

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.velX = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.y += this.speed;
            this.x += this.velX;

            if (this.y > height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 200; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        snowflakes.forEach(f => {
            f.update();
            f.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    // Canvas styling
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '50';
}

// Mobile Menu Logic
function initMobileMenu() {
    const burger = document.querySelector('.burger-menu');
    const menu = document.querySelector('.mobile-menu');
    const links = document.querySelectorAll('.mobile-menu a');

    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
}

// 3D Tilt Effect
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });

            // Glint effect
            const glint = card.querySelector('.card-glint');
            if (glint) {
                gsap.to(glint, {
                    x: (x / rect.width) * 100 + '%',
                    y: (y / rect.height) * 100 + '%',
                    opacity: 0.4,
                    duration: 0.2
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
            const glint = card.querySelector('.card-glint');
            if (glint) {
                gsap.to(glint, { opacity: 0, duration: 0.5 });
            }
        });
    });
}

// Theme and RTL Logic
function initThemeSwitcher() {
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    
    // Theme Switcher
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            
            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Subtle feedback
            gsap.to(toggle, { rotate: isLight ? 180 : 0, duration: 0.5 });
        });
    });

    // RTL Switcher
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.dir || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.dir = newDir;
            
            // Save preference
            localStorage.setItem('dir', newDir);
            
            // GSAP feedback
            gsap.to(toggle, { x: newDir === 'rtl' ? -5 : 0, duration: 0.3 });
        });
    });

    // Load preferences
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.dir = 'rtl';
    }
}

// Smooth Parallax for specific elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0.5;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Elite Frost Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.preloader-progress');
    
    if (!preloader) return;

    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 500);
        } else {
            width += Math.random() * 20;
            if (width > 100) width = 100;
            if (progress) progress.style.width = width + '%';
        }
    }, 100);
}

// Weather Widget Logic
function initWeatherWidget() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;

    // Simulated Tromsø weather
    const temps = [-8, -12, -15, -5, -10];
    const icons = ['❄️', '☁️', '🌫️', '🌬️'];
    
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const tempEl = widget.querySelector('.weather-temp');
    const iconEl = widget.querySelector('.weather-icon');

    if (tempEl) tempEl.innerHTML = `${randomTemp}°C`;
    if (iconEl) iconEl.innerHTML = randomIcon;

    // Show widget after preloader
    setTimeout(() => {
        widget.classList.add('visible');
    }, 2500);
}

// Interactive Video Hero
function initVideoHero() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    // Simple interaction: slightly speed up on hover
    const hero = video.closest('section');
    if (hero) {
        hero.addEventListener('mouseenter', () => {
            gsap.to(video, { playbackRate: 1.5, duration: 1 });
        });
        hero.addEventListener('mouseleave', () => {
            gsap.to(video, { playbackRate: 1.0, duration: 1 });
        });
    }
}
