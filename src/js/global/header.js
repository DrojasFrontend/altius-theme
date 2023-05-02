var jHeader = (function ($) {
  $(".open-menu").on("click", openMenuMobile);

  function openMenuMobile() {
    $("#menu").addClass("is-open");
  }

  $(".menu__close").on("click", closeMenuMobile);

  function closeMenuMobile() {
    $("#menu").removeClass("is-open");
  }

  if ($(window).width() <= 1024) {
    $(".has-menu").on("click", openSubMenuMobile);

    function openSubMenuMobile(e) {
      $(".has-menu + .submenu").slideToggle();
    }

    $(".has-submenu").on("click", openSubMenuMenuMobile);

    function openSubMenuMenuMobile(e) {
      $(e.currentTarget).parent().find(".submenu-submenu").slideToggle();
      $(e.currentTarget)
        .parent()
        .find(".navbar__arrow")
        .first()
        .toggleClass("active");
    }

    $(".submenu-submenu__item-link").on("click", openSubMenuMenuMenuMobile);

    function openSubMenuMenuMenuMobile(e) {
      console.log(e.target);
      $(e.currentTarget).find(".submenu-submenu-submenu").slideToggle();
      $(e.currentTarget).find(".navbar__arrow").first().toggleClass("active");
    }
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
      $(".header").addClass("default");
      $(".header__top").addClass("hide");
    } else {
      $(".header").removeClass("default");
      $(".header__top").removeClass("hide");
    }
  });

  var header = document.querySelector(".header");
  var navbarHeight = header.offsetHeight;
  var lastScrollTop = 0;

  window.onscroll = function () {
    scrollHide();
  };

  function scrollHide() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
})(jQuery);
