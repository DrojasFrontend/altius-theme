var jHeader = (function ($) {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $(".header__bottom").addClass("fixed");
    } else {
      $(".header__bottom").removeClass("fixed");
    }
  });
})(jQuery);
