// theme.js
class ThemeSwitcher {
    constructor() {
        this.themeLink = document.getElementById('theme-variables');
        this.button = document.getElementById('theme-toggle');
        this.STORAGE_KEY = 'preferred-theme';
        this.createToast();
        
        this.initialize();
        this.addEventListeners();
    }

    createToast() {
        this.toast = document.createElement('div');
        this.toast.className = 'toast';
        document.body.appendChild(this.toast);
    }

    showToast(theme) {
        const message = `${theme} mode`;
        this.toast.textContent = message;
        this.toast.classList.add('show');
        
        // Remove toast after animation
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2000);
    }

    initialize() {
        // Check local storage first
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (savedTheme) {
            this.setTheme(savedTheme, false); // Don't show toast on initial load
            return;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            this.setTheme('light', false);
        } else {
            this.setTheme('dark', false);
        }
    }

    addEventListeners() {
        // Theme toggle button
        this.button.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' 
                ? 'dark' 
                : 'light';
            this.setTheme(newTheme, true);
        });

        // System theme change listener
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'light' : 'dark', true);
            }
        });
    }

    setTheme(theme, showToastNotification = true) {
        // Update CSS file
        this.themeLink.href = `${theme}.css`;
        
        // Update data attribute for icon visibility
        document.documentElement.setAttribute('data-theme', theme);
        
        // Save to local storage
        localStorage.setItem(this.STORAGE_KEY, theme);

        // Show toast notification if requested
        if (showToastNotification) {
            this.showToast(theme);
        }
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});