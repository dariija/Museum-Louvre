const videoSliderLeftBtn = document.querySelector('.video-slider__button-left'),
      videoSliderRightBtn = document.querySelector('.video-slider__button-right'),
      videoSliderBullets = document.querySelectorAll('.video-slider__pagination'),
      currentVideo = document.querySelector('.video__video'),
      videoSliderVideos = document.getElementsByClassName('video__item'),
      videoSliderVideosContainer = document.querySelector('.video__playlist-slides');
let indexVideo = 0;
let lastIndex = 0;

videoSliderLeftBtn.addEventListener('click', function(e) {
    changeActiveVideo(indexVideo - 1);
    previousVideoSlide()
});

videoSliderRightBtn.addEventListener('click', function(e) {
    changeActiveVideo(indexVideo + 1);
    nextVideoSlide()
});

videoSliderBullets.forEach(function(item, itemIndex) {
    item.addEventListener('click', function() {
        changeActiveVideo(itemIndex);
        changeVideoSliderOrder(lastIndex, indexVideo);
    }) 
})      

function changeActiveVideo(index) {
    lastIndex = indexVideo;
    videoSliderBullets[indexVideo].classList.remove('video-slider__pagination_active');
    indexVideo = (videoSliderBullets.length + index) % videoSliderBullets.length;
    videoSliderBullets[indexVideo].classList.add('video-slider__pagination_active');
    changeCurrentVideo();
}

function changeCurrentVideo() {
    currentVideo.src = `assets/video/video${indexVideo}.mp4`;
    currentVideo.poster = `assets/img/video-posters/poster${indexVideo}.jpg`;
}

function changeVideoSliderOrder(lastIndex, indexVideo) {
    if (!(lastIndex === indexVideo)) lastIndex > indexVideo? previousVideoSlide(Math.abs(indexVideo - lastIndex)) : nextVideoSlide(Math.abs(indexVideo - lastIndex));
}

function nextVideoSlide(n = 1) {
    videoSliderVideosContainer.append(videoSliderVideos[0]);
    if (n > 1 ) nextVideoSlide(n - 1);
}

function previousVideoSlide(n = 1) {
    videoSliderVideosContainer.prepend(videoSliderVideos[videoSliderVideos.length-1])
    if (n > 1 ) previousVideoSlide(n - 1)
}