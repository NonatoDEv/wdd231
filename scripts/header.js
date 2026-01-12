const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const menuIcon = document.getElementById('menuIcon');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.classList.contains('open')) {
        menuIcon.innerHTML = '&#10006;';
    } else {
        menuIcon.innerHTML = '&#9776;';
    }
});
