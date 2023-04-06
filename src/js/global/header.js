var jHeader = (function ($) {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $(".header").addClass("default");
      $(".header__top").addClass("hide");
    } else {
      $(".header").removeClass("default");
      $(".header__top").removeClass("hide");
    }
  });

  var header = document.querySelector(".header");
  var navbarHeight = header.offsetHeight;
  var lastScrollTop = 0;
  
  window.onscroll = function() {scrollHide()};
  
  function scrollHide() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
})(jQuery);
