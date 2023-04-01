var jAnimation = (function ($) {

  $(window).scroll(function() {
    var wScroll = $(this).scrollTop();
    $('#letter-animation').css({
      'transform' : 'translate(0px, '+ wScroll /1 + '%)',
    });
  })
  
  setTimeout(() => {
    $("#letter-animation").addClass("letter-animation");
  }, 1000);

})(jQuery);
