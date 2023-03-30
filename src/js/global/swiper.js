var jSwiper = (function($) {

  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 4,
    spaceBetween: 0,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

})(jQuery)