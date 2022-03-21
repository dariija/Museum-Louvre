function shuffleGallery( arraySrc) {
    shuffle(arraySrc).map( function(imgSrc) {
        let img = document.createElement('img');
        img.className = 'img gallery-pictures__image';
        img.src = imgSrc;
        img.alt = 'gallery-image';
        galleryPicturesInner.append(img);
    })
};

function shuffle( array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array
};

function animGalleryScroll() {
    galleryPictures.forEach(function(picture) {
        let pictureHeight = picture.offsetHeight;
        let picturePosOffsetY = picture.getBoundingClientRect().top + window.pageYOffset;
        let startAnim = 5;
        let pictureAnimPoint = window.innerHeight - pictureHeight/startAnim;
        
        if ( window.pageYOffset > (picturePosOffsetY - pictureAnimPoint)) {
            picture.classList.add('show-picture');
        } else picture.classList.remove('show-picture');
    })
};

function debounce(func, wait, immediate) {
    let timeout;
  
    return function executedFunction() {
      const context = this;
      const args = arguments;
  
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      const callNow = immediate && !timeout;
  
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
};

const galleryPicturesInner = document.querySelector('.gallery-pictures__inner');
const galleryPicturesSrc = ['assets/img/gallery/gallery1.jpg', 'assets/img/gallery/gallery2.jpg', 'assets/img/gallery/gallery3.jpg', 'assets/img/gallery/gallery4.jpg','assets/img/gallery/gallery5.jpg',
                          'assets/img/gallery/gallery6.jpg', 'assets/img/gallery/gallery7.jpg', 'assets/img/gallery/gallery8.jpg', 'assets/img/gallery/gallery9.jpg', 'assets/img/gallery/gallery10.jpg',
                          'assets/img/gallery/gallery11.jpg', 'assets/img/gallery/gallery12.jpg', 'assets/img/gallery/gallery13.jpg', 'assets/img/gallery/gallery14.jpg', 'assets/img/gallery/gallery15.jpg'];

shuffleGallery( galleryPicturesSrc);

let galleryPictures = document.querySelectorAll('.gallery-pictures__image');
window.addEventListener('scroll',  debounce(animGalleryScroll, 20, true));
