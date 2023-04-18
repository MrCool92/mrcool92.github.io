const toggleTheme = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode && !localStorage.getItem('dark-mode')) {
    document.body.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.add('fa-moon');
    }
});

toggleTheme.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
    if (isDarkMode) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});