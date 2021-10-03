const burgerMenu = document.body.querySelector('.burger');
const body = document.querySelector('body');
const navMenu = document.querySelector('.header__nav');
const welcomeContent = document.querySelector('.welcome__content');

burgerMenu.addEventListener('click', function() {
    body.classList.toggle('no-scroll');
    navMenu.classList.toggle('header__nav_show');
    burgerMenu.classList.toggle('active');
    welcomeContent.classList.toggle('hide');
});

navMenu.addEventListener('click', function(event) {
    if ( event.target.classList.contains('nav-header__link')) {
        body.classList.toggle('no-scroll');
        navMenu.classList.toggle('header__nav_show');
        burgerMenu.classList.toggle('active');
        welcomeContent.classList.toggle('hide');
    }
})
