export function initHeader() {
    const menuBtn = document.querySelector('#menuToggle');
    const navMenu = document.querySelector('#navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('show');
        });
    }
    //dynamic active class for nav links
    const navLinks = document.querySelectorAll('.navLink');
    let currentPath = window.location.pathname.split('/').pop();
    // Handle the case when the path is empty (e.g., when accessing the root URL)
    if (currentPath === '') {
        currentPath = 'index.html';
    }
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}