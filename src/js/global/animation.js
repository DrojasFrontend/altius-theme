var jAnimation = (function ($) {
  $(window).scroll(function () {
    var wScroll = $(this).scrollTop();
    $("#letter-animation").css({
      transform: "translate(0px, " + wScroll / 1 + "%)",
    });
  });

  setTimeout(() => {
    $("#letter-animation").addClass("letter-animation");
  }, 1000);

  $.when($("[data-text-left-right]").addClass("text-left-to-right")).then(
    function () {
      $(".line-animate").addClass("active");
      setTimeout(() => {
        $(".filter__position").addClass("wobble-active");
      }, 1500);
    }
  );
})(jQuery);
