var jPlayVideo = (function ($) {
  $(".play-video-gallery").on("click", playVideoHideButton);
  var myVideo = $("#myVideo")[0];

  function playVideoHideButton() {
    $(this).fadeOut();
    myVideo.play();
  }

  $(myVideo).on("click", function() {
    $(".play-video-gallery").fadeOut();
  });

})(jQuery);
