
const mainNav = document.querySelector('#mainNav ul');
const menuButton = document.querySelector('#menuToggle');
const menuIcon = document.querySelector('#menuIcon');

menuButton.addEventListener('click', () => {
    
    mainNav.classList.toggle('show');
    
    if (mainNav.classList.contains('show')) {
        menuIcon.innerHTML = "&#10006;";
    } else {
        menuIcon.innerHTML = "&#9776;";
    }
});