var jFooter = (function ($) {
  var isFooterAnimated = false;

  $(window).scroll(function () {
    var $initCounter = $(".footer");

    var offsetTop = 0;
    if ($initCounter.length > 0) {
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var padding = parseInt($initCounter.css("padding-top"));
      var offsetTop = $initCounter.offset().top - padding + 300; // Agregamos 200 para retrasar la animación
      var offsetBottom = offsetTop + $initCounter.height() + 2 * padding;
      if (
        !isFooterAnimated &&
        offsetBottom >= scrollTop &&
        offsetTop <= scrollTop + windowHeight
      ) {

        $(".footer__bckg").addClass("is-show");
        $(".footer__bottom-left").addClass("is-show");
        $(".footer__bottom-center").addClass("is-show");
        $(".footer__bottom-right").addClass("is-show");
        isFooterAnimated = true;
      }
    }
  });
})(jQuery);
