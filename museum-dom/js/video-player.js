const mainVideo = document.querySelector('.video__video'),
      videoContainer = document.querySelector('.video__player'),
      bigPlayButton = document.querySelector('.video__play-button'),
      smallPlayButton = document.querySelector('.player-controls__play-button-small'),
      soundButton = document.querySelector('.player-controls__sound-button'),
      fullscreenButton = document.querySelector('.player-controls__fullscreen-button'),
      videoProgressBar = document.querySelector('.player-controls__progress-bar'),
      videoSoundBar = document.querySelector('.player-controls__volume'),
      controlVideoPanel = document.querySelector('.player-controls');
    //   body = document.querySelector('body');

bigPlayButton.addEventListener('click', function() {
    togglePlayButtons();
    toggleVideo();
});

smallPlayButton.addEventListener('click', function() {
    togglePlayButtons(); 
    toggleVideo();
});

mainVideo.addEventListener('click', function(event) {
    if (!event.target.classList.contains('video__play-button')) {
        togglePlayButtons();
        toggleVideo();
    }
});

soundButton.addEventListener('click', function() {
    toggleSoundVideo();
});

videoSoundBar.addEventListener('input', function() {
    changeSoundVideo();
})

videoProgressBar.addEventListener('input', function() {
    changeVideoProgressBar();
})

mainVideo.addEventListener('timeupdate', function() {
    videoProgressBar.value = (mainVideo.currentTime * 100)/mainVideo.duration;
    if (videoProgressBar.value === 100) togglePlayButtons();
});

mainVideo.addEventListener('ended', function() {
    togglePlayButtons();
})

fullscreenButton.addEventListener('click', function() {
    toggleFullscreenVideo();
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        event.preventDefault();
        togglePlayButtons(); 
        toggleVideo();
    } else if (event.code === 'KeyM') {
        toggleSoundVideo();
    } else if (event.code === 'KeyF') {
        toggleFullscreenVideo();
    } else if (event.shiftKey) {

        document.onkeyup = function(event) {
            if (event.code === 'Comma') {
                speedUpVideo()
            } else if (event.code === 'NumpadDecimal' || event.code === 'Period') {
                speedDownVideo()
            } else document.onkeyup =  null

        }
    }
});

function togglePlayButtons() {
    bigPlayButton.classList.toggle('hide-button');
    smallPlayButton.classList.toggle('player-controls__play-button-small');
    smallPlayButton.classList.toggle('player-controls__pause-button');    
};

function toggleVideo() {
    mainVideo.paused? mainVideo.play() : mainVideo.pause()
};

function toggleSoundVideo() {
    if ( mainVideo.volume > 0) {
        mainVideo.volume = 0;
        videoSoundBar.value = 0;
    } else {
        mainVideo.volume = 0.3;
        videoSoundBar.value = 30;
    }
    soundButton.classList.toggle('player-controls__sound-button');
    soundButton.classList.toggle('player-controls__mute-button');
};

function changeSoundVideo() {
    mainVideo.volume = videoSoundBar.value/100;

    if (mainVideo.volume === 0) {
        soundButton.classList.remove('player-controls__sound-button');
        soundButton.classList.add('player-controls__mute-button');    
    } else {
        soundButton.classList.add('player-controls__sound-button');
        soundButton.classList.remove('player-controls__mute-button');    
    }
};

function changeVideoProgressBar() {
    mainVideo.currentTime = (mainVideo.duration * videoProgressBar.value)/100;
};

function speedUpVideo() {
    mainVideo.playbackRate = Math.fround(mainVideo.playbackRate + 0.25);
    console.log(mainVideo.playbackRate)
};

function speedDownVideo() {
    mainVideo.playbackRate = Math.fround(mainVideo.playbackRate - 0.25);
    console.log(mainVideo.playbackRate)
};

function toggleFullscreenVideo() {
    mainVideo.classList.toggle('video-fullscreen');
    mainVideo.classList.toggle('video__video');
    videoContainer.classList.toggle('video__player-fullscreen');
    videoContainer.classList.toggle('video__player');
    body.classList.toggle('no-scroll');    
}
