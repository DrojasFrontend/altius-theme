var jSwiper = (function($) {

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,

    breakpoints: {
      1024: {
        slidesPerView: 6,
      },

      680: {
        slidesPerView: 2,
      },
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

  const swiperHero = new Swiper('.swiper-hero', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
    },
  
    pagination: {
      el: '.swiper-pagination',
      draggable: true,
      clickable: true
    },
  
  });

  const swiperSingle = new Swiper('.swiper-single', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

  const swiperBottom = new Swiper(".swiper-bottom", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 2,
    freeMode: true,

    breakpoints: {
      1280: {
        slidesPerView: 5,
      },

      1024: {
        slidesPerView: 3,
      },
    },
  });

  const swiperTop = new Swiper(".swiper-top", {
    loop: true,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperBottom,
    },
  });

  if (typeof myVideo !== 'undefined' && myVideo !== null) {
    swiperTop.on('slideChange', function () {
      if (myVideo.paused === false && $(".swiper-slide-active").find("#myVideo").length === 0) {
        myVideo.pause();
        $(".play-video-gallery").fadeIn();
      }
    });
  }
  

})(jQuery)