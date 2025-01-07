// public/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript chargé avec succès !');

    // Fonction de changement de thème
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            console.log(`Thème changé en ${newTheme}`);
        });
    }
});
