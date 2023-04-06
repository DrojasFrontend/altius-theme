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
  
    pagination: {
      el: '.swiper-pagination',
      draggable: true,
      clickable: true
    },
  
  });

})(jQuery)