const welcomeSlides= document.querySelectorAll('.welcome-slider__slide'),
      welcomePaginationBullets = document.querySelector('.welcome-slider__bullets'),
      welcomeBullets = document.querySelectorAll('.bullet'),
      welcomeControls = document.querySelector('.welcome-slider__controls'),
      currentNumPoster = document.querySelector('.slider__num-now'),

      left = document.querySelector('.welcome-slider__button-left'),
      right = document.querySelector('.welcome-slider__button-right');
let indexSlide = 0;
let isEnabled = true;

function changeWelcomeSlide(index) {
    welcomeBullets[indexSlide].classList.remove('bullet_active');
    indexSlide = (welcomeSlides.length + index) % welcomeSlides.length;
    welcomeBullets[indexSlide].classList.add('bullet_active');
    currentNumPoster.innerHTML = `0${indexSlide + 1}`;
}

function hideSlide(direction) {
    isEnabled = false;
    welcomeSlides[indexSlide].classList.add(direction);
    welcomeSlides[indexSlide].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showSlide(direction) {
    welcomeSlides[indexSlide].classList.add('next', direction);
    welcomeSlides[indexSlide].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true;
    })
}

function previousSlide(index) {
    hideSlide('to-right');
    changeWelcomeSlide(index);
    showSlide('from-left');
}

function nextSlide(index) {
    hideSlide('to-left');
    changeWelcomeSlide(index);
    showSlide('from-right');
}

welcomeControls.addEventListener('click', function(event) {
    if (isEnabled) {
        if (event.target.classList.contains('welcome-slider__button-left')) {
            previousSlide(indexSlide - 1)
        }
        if (event.target.classList.contains('welcome-slider__button-right')) {
            nextSlide(indexSlide + 1)
        }
    }
});

welcomeBullets.forEach(function(item, itemIndex) {
    item.addEventListener('click', function() {
        itemIndex > indexSlide? nextSlide(itemIndex) : previousSlide(itemIndex);
    })
})


let welcomeSwipeArea = function(welcomeSlidesContainer) {
    let startPosX,
        startPosY,
        distX,
        distY,
        minDistX = 30,
        limitDistY = 100;

    let startSwipeTime,
        swipeTime,
        limitSwipeTime = 2000;

    welcomeSlidesContainer.addEventListener('mousedown', function(event) {
        isEnabled = false;
        event.preventDefault();

        startPosX = event.clientX;
        startPosY = event.clientY;
        startSwipeTime = new Date().getTime();
    });

    welcomeSlidesContainer.addEventListener('mouseup', function(event) {
        distX = event.clientX - startPosX;
        distY = event.clientY - startPosY;
        swipeTime =  new Date().getTime() - startSwipeTime;
        isEnabled = true;

        if (isEnabled && Math.abs(distX) > minDistX && Math.abs(distY) < limitDistY && swipeTime < limitSwipeTime) {
            distX > 0? previousSlide(indexSlide - 1) : nextSlide(indexSlide +1);
        }
    });

    welcomeSlidesContainer.addEventListener('touchstart', function(event) {
        isEnabled = false;
        event.preventDefault();

        let touch = event.changedTouches[0];
        startPosX = touch.clientX;
        startPosY = touch.clientY;
        startSwipeTime = new Date().getTime();
    });

    welcomeSlidesContainer.addEventListener('touchend', function(event) {
        let touch = event.changedTouches[0];
        distX = touch.clientX - startPosX;
        distY = touch.clientY - startPosY;
        swipeTime =  new Date().getTime() - startSwipeTime;
        isEnabled = true;

        if (isEnabled && Math.abs(distX) > minDistX && Math.abs(distY) < limitDistY && swipeTime < limitSwipeTime) {
            distX > 0? previousSlide(indexSlide - 1) : nextSlide(indexSlide + 1);
        }
    });
}

const welcomeSlidesContainer = document.body.querySelector('.welcome-slider__inner');
welcomeSwipeArea(welcomeSlidesContainer);