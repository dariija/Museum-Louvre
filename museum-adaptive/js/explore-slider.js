function exploreCompare() {
    let overlayImg = document.body.querySelector('.picture-slider__img-overlay');
    exploreCompareImg(overlayImg);

    function exploreCompareImg(img) {
        let clicked = false;
        let widthImg = img.clientWidth;
        let exploreSlider = document.body.querySelector('.picture-slider__slider');

        img.style.width = (widthImg / 100 * 59) + (exploreSlider.offsetWidth / 2) + 'px';


        exploreSlider.addEventListener('mousedown', exploreSliderReady);
        window.addEventListener('mouseup', exploreSliderFinish);

        exploreSlider.addEventListener('touchstart', exploreSliderReady);
        window.addEventListener('touchstop', exploreSliderFinish);

        function exploreSliderReady(event) {
            event.preventDefault();
            clicked = true;

            window.addEventListener('mousemove', exploreSliderMove);
            window.addEventListener('touchmove', exploreSliderMove);
        }

        function exploreSliderFinish() {
            clicked = false;
        }

        function exploreSliderMove(event) {
            if (!clicked) return false;

            let exploreSliderPos = getExploreSliderPos(event);

            if (exploreSliderPos < 0) {exploreSliderPos = 0};
            if (exploreSliderPos > widthImg) {exploreSliderPos = widthImg};

            exploreSliderSlide(exploreSliderPos);
        }

        function getExploreSliderPos(event) {
            event = event || window.event();
            let positionImg = img.getBoundingClientRect();
            let position = event.clientX - positionImg.left;
            return position
        }

        function exploreSliderSlide(pos) {
            img.style.width = `${pos}px`;
            exploreSlider.style.left = img.clientWidth - (exploreSlider.offsetWidth / 2) + 'px'
        }
    }
}

exploreCompare();