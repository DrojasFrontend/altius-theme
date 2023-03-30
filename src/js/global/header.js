var jHeader = (function ($) {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 34) {
      $(".header__bottom").addClass("fixed");
    } else {
      $(".header__bottom").removeClass("fixed");
    }
  });
})(jQuery);
