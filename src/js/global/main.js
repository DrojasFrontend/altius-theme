jQuery(function ($) {

  if(jAnimation) {
    jAnimation.load("body");
  }

  if(jSearchFilter) {
    jSearchFilter.load(".filter");
  }

  if (jHeader) {
    jHeader.load("body");
  }

  if (jCounter) {
    jCounter.load("#counter");
  }

  if (jPlayVideo) {
    jPlayVideo.load(".swiper-top");
  }

  const $swiperClass = $('.swiper')

  if(jSwiper && $swiperClass.length) {
    jSwiper.load($swiperClass);
  }

});
