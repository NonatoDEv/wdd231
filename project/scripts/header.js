const menuBtn = document.querySelector('#menuToggle');
const navMenu = document.querySelector('#navMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navMenu.classList.toggle('show');

});