var jCounter = (function ($) {
  var isCounterAnimated = false;

  $(window).scroll(function () {
    var $initCounter = $(".init__counter");

    var offsetTop = 0;
    if ($initCounter.length > 0) {
      var windowHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var padding = parseInt($initCounter.css("padding-top"));
      var offsetTop = $initCounter.offset().top - padding + 200; // Agregamos 200 para retrasar la animación
      var offsetBottom = offsetTop + $initCounter.height() + 2 * padding;
      if (
        !isCounterAnimated &&
        offsetBottom >= scrollTop &&
        offsetTop <= scrollTop + windowHeight
      ) {
        $(".count").each(function () {
          $(this)
            .prop("Counter", 0)
            .animate(
              {
                Counter: $(this).text(),
              },
              {
                duration: 4000,
                easing: "swing",
                step: function (now) {
                  $(this).text(Math.ceil(now));
                },
              }
            );
        });
        isCounterAnimated = true;
      }
    }
  });
})(jQuery);
