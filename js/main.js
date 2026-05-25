/**
 * Sled Dog Tours & Kennel Experience - Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initWeatherWidget();
    initThemeSwitcher();
    initBackToTop();
    initActiveLink();
});

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
        });
    });

    // RTL Switcher
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.dir || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.dir = newDir;
            
            // Toggle active class for styling
            rtlToggles.forEach(t => t.classList.toggle('rtl-active', newDir === 'rtl'));
            
            // Save preference
            localStorage.setItem('dir', newDir);
        });
    });

    // Load preferences
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.dir = 'rtl';
        rtlToggles.forEach(t => t.classList.add('rtl-active'));
    }
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

    // Show widget immediately / soon (500ms delay)
    setTimeout(() => {
        widget.classList.add('visible');
    }, 500);
}

// Active Link Highlighter
function initActiveLink() {
    const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const navLinks = document.querySelectorAll('.glass-nav a, .mobile-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        let linkPath = href.split('/').pop().toLowerCase().replace('.html', '');
        let current = currentPath.replace('.html', '');
        
        // Match index for empty paths or root
        const isIndex = (current === 'index' || current === '');
        const isLinkIndex = (linkPath === 'index');
        
        if (linkPath === current || (isIndex && isLinkIndex)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Back to Top Logic
function initBackToTop() {
    // Create button
    const btn = document.createElement('div');
    btn.id = 'back-to-top';
    btn.className = 'glass';
    btn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    document.body.appendChild(btn);

    // Show/Hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Scroll to top
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
