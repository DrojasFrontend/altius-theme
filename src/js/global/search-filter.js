var jSearchFilter = (function ($) {
  var radioBtnType1 = $('.sf-item-0 input[name="_sft_tipo[]"');
  var radioBtnType2 = $('.sf-item-25 input[name="_sft_tipo[]"');

  var btnSelected = $(".sf-field-taxonomy-tipo .selected");

  radioBtnType1.removeAttr("checked");
  radioBtnType2.prop("checked", true);

  var checkedInput = $('.sf-field-taxonomy-tipo input[type="radio"]:checked');
  var text = checkedInput.next("label").text();
  $("<span class='selected'>")
    .text(text)
    .insertAfter("li.sf-field-taxonomy-tipo h4");

    $('.sf-field-taxonomy-tipo input[type="radio"]').click(function (e) {
      e.stopPropagation();
      var text = $(this).next("label").text();
      if ($(this).is(":checked")) {
        $("li.sf-field-taxonomy-tipo span").remove();
        $("<span class='selected'>")
          .text(text)
          .insertAfter("li.sf-field-taxonomy-tipo h4");
      }
    });
    
    $(".sf-field-taxonomy-tipo .selected").on("click", function () {
      $(this).next('ul').slideToggle();
    });
    
})(jQuery);
