var jSwiper = (function($) {

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 6,
    spaceBetween: 0,

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
    slidesPerView: 5,
    freeMode: true,
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

  swiperTop.on('slideChange', function () {
    if (myVideo.paused === false && $(".swiper-slide-active").find("#myVideo").length === 0) {
      myVideo.pause();
      $(".play-video-gallery").fadeIn();
    }
  });

})(jQuery)