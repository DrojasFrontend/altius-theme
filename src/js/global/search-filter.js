var jSearchFilter = (function ($) {  

  if ($('body').hasClass('home')) {
    var radioBtnType2 = $('.sf-item-95 input[name="_sft_tipo[]"]');
    radioBtnType2.prop("checked", true);
  }

  if ($('body').hasClass('single')) {
    var radioBtnType2 = $('.sf-item-54 input[name="_sft_tipo[]"]');
    radioBtnType2.prop("checked", true);
  }

  var btnSelected = $(".sf-field-taxonomy-tipo .selected");

  var checkedInput = $('.sf-field-taxonomy-tipo input[type="radio"]:checked');
  var text = checkedInput.next("label").text();

  var activeSpan = $("li.sf-field-taxonomy-tipo span.active");

  if (activeSpan.length) {
    activeSpan.text(text);
  } else {
    $("<span class='selected active'>")
      .text(text)
      .insertAfter("li.sf-field-taxonomy-tipo h4");
  }

  $('.sf-field-taxonomy-tipo input[type="radio"]').click(function (e) {
    e.stopPropagation();
    var text = $(this).next("label").text();
    var activeSpan = $("li.sf-field-taxonomy-tipo span.active");

    if ($(this).is(":checked")) {
      if (activeSpan.length) {
        activeSpan.text(text);
      } else {
        $("<span class='selected active'>")
          .text(text)
          .insertAfter("li.sf-field-taxonomy-tipo h4");
      }
    }
  });

  // Checkbox
  function handleCheckboxGroup($checkboxGroup, $activeSpan) {
    $checkboxGroup.on("click", 'input[type="checkbox"]', function (e) {
      e.stopPropagation();
      const labels = $checkboxGroup
        .find('input[type="checkbox"]:checked')
        .map(function () {
          return $(this).next("label").text();
        })
        .get();

      if (labels.length > 0) {
        $activeSpan.text(labels.join(", "));
      } else {
        $activeSpan.text("Selecciona");
      }
    });

    $checkboxGroup.on("click", "label", function (e) {
      e.preventDefault();
      const checkbox = $(this).prev('input[type="checkbox"]');
      checkbox.prop("checked", !checkbox.prop("checked")).trigger("click");
    });
  }

  const $ciudadGroup = $(".sf-field-taxonomy-ciudad");
  const $activeCiudadSpan = $("<span class='selected'>").insertAfter(
    $ciudadGroup.find("h4")
  );
  $activeCiudadSpan.text("Selecciona");

  const $barrioGroup = $(".sf-field-taxonomy-barrio");
  const $activeBarrioSpan = $("<span class='selected'>").insertAfter(
    $barrioGroup.find("h4")
  );
  $activeBarrioSpan.text("Selecciona");

  const $condicionGroup = $(".sf-field-taxonomy-condicion");
  const $activeCondicionSpan = $("<span class='selected'>").insertAfter(
    $condicionGroup.find("h4")
  );
  $activeCondicionSpan.text("Selecciona");

  const $dormitorioGroup = $(".sf-field-taxonomy-dormitorio");
  const $activeDormitorioSpan = $("<span class='selected'>").insertAfter(
    $dormitorioGroup.find("h4")
  );
  $activeDormitorioSpan.text("Selecciona");

  const $proyectoGroup = $(".sf-field-taxonomy-proyecto");
  const $activeProyectoSpan = $("<span class='selected'>").insertAfter(
    $proyectoGroup.find("h4")
  );
  $activeProyectoSpan.text("Selecciona");

  const $ulCiudadGroup = $ciudadGroup.find("ul");
  const $ulBarrioGroup = $barrioGroup.find("ul");
  const $ulCondicionGroup = $condicionGroup.find("ul");
  const $ulDormitorioGroup = $dormitorioGroup.find("ul");
  const $ulProyectoGroup = $proyectoGroup.find("ul");

  const $sfClean = $("<button type='button' class='clean'>").text("× VACIAR");
  const $sfAccept = $("<button type='button' class='accept'>").text("ACEPTAR");

  handleCheckboxGroup($ciudadGroup, $activeCiudadSpan);
  handleCheckboxGroup($barrioGroup, $activeBarrioSpan);
  handleCheckboxGroup($condicionGroup, $activeCondicionSpan);
  handleCheckboxGroup($proyectoGroup, $activeProyectoSpan);
  handleCheckboxGroup($dormitorioGroup, $activeDormitorioSpan);

  const $ulArray = [
    $ulCiudadGroup,
    $ulBarrioGroup,
    $ulCondicionGroup,
    $ulProyectoGroup,
    $ulDormitorioGroup
  ];

  $ulArray.forEach(($ul) => {
    const $sfCleanClone = $sfClean.clone().text("× VACIAR");
    $ul.append($sfCleanClone);
    const $sfAcceptClone = $sfAccept.clone();
    $ul.append($sfAcceptClone);
    const $activeSpan = $ul.siblings("span.selected"); 
    const toggleUl = function () {
      $ul.slideToggle();
    };
    $sfAcceptClone.on("click", toggleUl);
    $sfCleanClone.on("click", function () {
      $ul.find("input[type=checkbox]").prop("checked", false);
      $activeSpan.text("Selecciona");
    });
  });

  $(".selected").on("click", function () {
    $(this).siblings("ul").slideToggle();
  });
})(jQuery);
