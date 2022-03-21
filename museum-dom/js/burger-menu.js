const burgerMenu = document.body.querySelector('.burger');
const body = document.querySelector('body');
const navMenu = document.querySelector('.header__nav');
const welcomeContent = document.querySelector('.welcome__content');
const overlay = document.querySelector('.overlay');

burgerMenu.addEventListener('click', function() {
    navMenu.classList.toggle('header__nav_show');
    burgerMenu.classList.toggle('active');
    welcomeContent.classList.toggle('hide');
    overlay.classList.toggle('overlay_active');
});

navMenu.addEventListener('click', function(event) {
    if ( event.target.classList.contains('nav-header__link')) {
        navMenu.classList.toggle('header__nav_show');
        burgerMenu.classList.toggle('active');
        welcomeContent.classList.toggle('hide');
        overlay.classList.toggle('overlay_active');
    }
});

overlay.addEventListener('click', function(event) {
    if (!event.target.classList.contains('.header__nav') || !event.target.classList.contains('.header__nav') ){
        navMenu.classList.toggle('header__nav_show');
        burgerMenu.classList.toggle('active');
        welcomeContent.classList.toggle('hide');
        overlay.classList.toggle('overlay_active');
    }
});
