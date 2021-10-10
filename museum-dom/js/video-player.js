const video = document.querySelector('.video__video'),
      videoContainer = document.querySelector('.video__player'),
      bigPlayButton = document.querySelector('.video__play-button'),
      smallPlayButton = document.querySelector('.player-controls__play-button-small'),
      soundButton = document.querySelector('.player-controls__sound-button'),
      fullscreenButton = document.querySelector('.player-controls__fullscreen-button'),
      videoProgressBar = document.querySelector('.player-controls__progress-bar'),
      videoSoundBar = document.querySelector('.player-controls__volume'),
      controlVideoPanel = document.querySelector('.player-controls'),
      body = document.querySelector('body');

bigPlayButton.addEventListener('click', function() {
    togglePlayButtons();
    toggleVideo();
});

smallPlayButton.addEventListener('click', function() {
    togglePlayButtons(); 
    toggleVideo();
});

video.addEventListener('click', function(event) {
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

video.addEventListener('timeupdate', function() {
    videoProgressBar.value = (video.currentTime * 100)/video.duration;
    if (videoProgressBar.value === 100) togglePlayButtons();
});

video.addEventListener('ended', function() {
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
    video.paused? video.play() : video.pause()
};

function toggleSoundVideo() {
    if ( video.volume > 0) {
        video.volume = 0;
        videoSoundBar.value = 0;
    } else {
        video.volume = 0.3;
        videoSoundBar.value = 30;
    }
    soundButton.classList.toggle('player-controls__sound-button');
    soundButton.classList.toggle('player-controls__mute-button');
};

function changeSoundVideo() {
    video.volume = videoSoundBar.value/100;

    if (video.volume === 0) {
        soundButton.classList.remove('player-controls__sound-button');
        soundButton.classList.add('player-controls__mute-button');    
    } else {
        soundButton.classList.add('player-controls__sound-button');
        soundButton.classList.remove('player-controls__mute-button');    
    }
};

function changeVideoProgressBar() {
    video.currentTime = (video.duration * videoProgressBar.value)/100;
};

function speedUpVideo() {
    video.playbackRate = Math.fround(video.playbackRate + 0.25);
    console.log(video.playbackRate)
};

function speedDownVideo() {
    video.playbackRate = Math.fround(video.playbackRate - 0.25);
    console.log(video.playbackRate)
};

function toggleFullscreenVideo() {
    video.classList.toggle('video-fullscreen');
    video.classList.toggle('video__video');
    videoContainer.classList.toggle('video__player-fullscreen');
    videoContainer.classList.toggle('video__player');
    body.classList.toggle('no-scroll');    
}
