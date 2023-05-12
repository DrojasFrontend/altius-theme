"use strict";var jAnimation=function(t){t(window).scroll(function(){var e=t(this).scrollTop();t("#letter-animation").css({transform:"translate(0px, "+ +e+"%)"})}),setTimeout(function(){t("#letter-animation").addClass("letter-animation")},1e3),t.when(t("[data-text-left-right]").addClass("text-left-to-right")).then(function(){t(".line-animate").addClass("active"),setTimeout(function(){t(".filter__position").addClass("wobble-active")},1500)})}(jQuery),jCounter=function(s){var a=!1;s(window).scroll(function(){var e,t,i,n,o=s(".init__counter");0<o.length&&(e=s(window).height(),t=s(window).scrollTop(),i=parseInt(o.css("padding-top")),o=(n=o.offset().top-i+200)+o.height()+2*i,!a)&&t<=o&&n<=t+e&&(s(".count").each(function(){s(this).prop("Counter",0).animate({Counter:s(this).text()},{duration:4e3,easing:"swing",step:function(e){s(this).text(Math.ceil(e))}})}),a=!0)})}(jQuery),jFooter=function(s){var a=!1;s(window).scroll(function(){var e,t,i,n,o=s(".footer");0<o.length&&(e=s(window).height(),t=s(window).scrollTop(),i=parseInt(o.css("padding-top")),o=(n=o.offset().top-i+300)+o.height()+2*i,!a)&&t<=o&&n<=t+e&&(s(".footer__bckg").addClass("is-show"),s(".footer__bottom-left").addClass("is-show"),s(".footer__bottom-center").addClass("is-show"),s(".footer__bottom-right").addClass("is-show"),a=!0)})}(jQuery),jHeader=function(t){t(".open-menu").on("click",function(){t("#menu").addClass("is-open")}),t(".menu__close").on("click",function(){t("#menu").removeClass("is-open")}),t(window).width()<=1024&&(t(".has-menu").on("click",function(e){t(".has-menu + .submenu").slideToggle()}),t(".has-submenu").on("click",function(e){t(e.currentTarget).parent().find(".submenu-submenu").slideToggle(),t(e.currentTarget).parent().find(".navbar__arrow").first().toggleClass("active")}),t(".submenu-submenu__item-link").on("click",function(e){console.log(e.target),t(e.currentTarget).find(".submenu-submenu-submenu").slideToggle(),t(e.currentTarget).find(".navbar__arrow").first().toggleClass("active")})),t(window).scroll(function(){20<t(this).scrollTop()?(t(".header").addClass("default"),t(".header__top").addClass("hide")):(t(".header").removeClass("default"),t(".header__top").removeClass("hide"))});var i=document.querySelector(".header"),n=(i.offsetHeight,0);window.onscroll=function(){var e=window.pageYOffset||document.documentElement.scrollTop;n<e?i.classList.add("hide"):i.classList.remove("hide"),n=e<=0?0:e}}(jQuery),jHome=void jQuery,jSearchFilter=(jQuery(function(e){jAnimation&&jAnimation.load("body"),jSearchFilter&&jSearchFilter.load(".filter"),jHeader&&jHeader.load("body"),jCounter&&jCounter.load("#counter"),jPlayVideo&&jPlayVideo.load(".swiper-top"),jFooter&&jFooter.load(".footer");e=e(".swiper");jSwiper&&e.length&&jSwiper.load(e)}),function(n){n("body").hasClass("home")&&n('.sf-field-taxonomy-tipo ul li:nth-child(2) input[name="_sft_tipo[]"]').prop("checked",!0),n("body").hasClass("single")&&n('.sf-field-taxonomy-tipo ul li:nth-child(2) input[name="_sft_tipo[]"]').prop("checked",!0),n(".sf-field-taxonomy-tipo .selected");var e=n('.sf-field-taxonomy-tipo input[type="radio"]:checked').next("label").text(),t=n("li.sf-field-taxonomy-tipo span.active");function i(t,i){t.on("click",'input[type="checkbox"]',function(e){e.stopPropagation();e=t.find('input[type="checkbox"]:checked').map(function(){return n(this).next("label").text()}).get();0<e.length?i.text(e.join(", ")):i.text("Selecciona")}),t.on("click","label",function(e){e.preventDefault();e=n(this).prev('input[type="checkbox"]');e.prop("checked",!e.prop("checked")).trigger("click")})}t.length?t.text(e):n("<span class='selected active'>").text(e).insertAfter("li.sf-field-taxonomy-tipo h4"),n('.sf-field-taxonomy-tipo input[type="radio"]').click(function(e){e.stopPropagation();var e=n(this).next("label").text(),t=n("li.sf-field-taxonomy-tipo span.active");n(this).is(":checked")&&(t.length?t.text(e):n("<span class='selected active'>").text(e).insertAfter("li.sf-field-taxonomy-tipo h4"))});var t=n(".sf-field-taxonomy-ciudad"),e=n("<span class='selected'>").insertAfter(t.find("h4")),o=(e.text("Selecciona"),n(".sf-field-taxonomy-barrio")),s=n("<span class='selected'>").insertAfter(o.find("h4")),a=(s.text("Selecciona"),n(".sf-field-taxonomy-condicion")),l=n("<span class='selected'>").insertAfter(a.find("h4")),r=(l.text("Selecciona"),n(".sf-field-taxonomy-dormitorio")),c=n("<span class='selected'>").insertAfter(r.find("h4")),d=(c.text("Selecciona"),n(".sf-field-taxonomy-proyecto")),p=n("<span class='selected'>").insertAfter(d.find("h4")),u=(p.text("Selecciona"),t.find("ul")),f=o.find("ul"),h=a.find("ul"),w=r.find("ul"),m=d.find("ul"),g=n("<button type='button' class='clean'>").text("× VACIAR"),y=n("<button type='button' class='accept'>").text("ACEPTAR");i(t,e),i(o,s),i(a,l),i(d,p),i(r,c),[u,f,h,m,w].forEach(function(e){var t=g.clone().text("× VACIAR"),i=(e.append(t),y.clone()),n=(e.append(i),e.siblings("span.selected"));i.on("click",function(){e.slideToggle()}),t.on("click",function(){e.find("input[type=checkbox]").prop("checked",!1),n.text("Selecciona")})}),n(".selected").on("click",function(){n(this).siblings("ul").slideToggle()})}(jQuery)),jSwiper=function(e){new Swiper(".swiper",{direction:"horizontal",slidesPerView:1,spaceBetween:0,breakpoints:{1024:{slidesPerView:6},680:{slidesPerView:2}},pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),new Swiper(".swiper-hero",{direction:"horizontal",slidesPerView:1,spaceBetween:0,autoplay:{delay:3e3},pagination:{el:".swiper-pagination",draggable:!0,clickable:!0}}),new Swiper(".swiper-single",{direction:"horizontal",slidesPerView:1,spaceBetween:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});var t=new Swiper(".swiper-bottom",{loop:!0,spaceBetween:0,slidesPerView:2,freeMode:!0,breakpoints:{1280:{slidesPerView:5},1024:{slidesPerView:3}}}),t=new Swiper(".swiper-top",{loop:!0,spaceBetween:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},thumbs:{swiper:t}});"undefined"!=typeof myVideo&&null!==myVideo&&t.on("slideChange",function(){!1===myVideo.paused&&0===e(".swiper-slide-active").find("#myVideo").length&&(myVideo.pause(),e(".play-video-gallery").fadeIn())})}(jQuery),jPlayVideo=function(e){e(".play-video-gallery").on("click",function(){e(this).fadeOut(),t.play()});var t=e("#myVideo")[0];e(t).on("click",function(){e(".play-video-gallery").fadeOut()})}(jQuery);