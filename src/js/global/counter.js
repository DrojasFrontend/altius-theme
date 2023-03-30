var jCounter = (function ($) {
  var executed = false;

  $(window).scroll(function() {
    var $counterDiv = $('#counter');
    if (!executed && $counterDiv.hasClass('home__counter') && isInViewport($counterDiv)) {
      executed = true;
      $('.count').each(function () {
        $(this).prop('Counter',0).animate({
          Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
        });
      });
    }
  });

  function isInViewport($elem) {
    var win = $(window);
    var viewportTop = win.scrollTop();
    var viewportBottom = viewportTop + win.height();
    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();
    return elemBottom > viewportTop && elemTop < viewportBottom;
  }
})(jQuery);
