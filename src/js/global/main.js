jQuery(function ($) {

  if (jHeader) {
    jHeader.load("body");
  }

  if (jCounter) {
    jCounter.load("#counter");
  }

  const $swiperClass = $('.swiper')

  if(jSwiper && $swiperClass.length) {
    jSwiper.load($swiperClass);
  }
});
