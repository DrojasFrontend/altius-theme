<?php

  if ( ! defined( '_S_VERSION' ) ) {
    $time = time();
    define( '_S_VERSION', $time );
  }

  function load_swiper_on_specific_pages() {
    global $post;
    $isActiveSwiper = is_front_page() || is_home() || is_single();

    if ( $isActiveSwiper ) {
      wp_enqueue_style('swiperCss',  CSS_BASE . 'libs/swiper.min.css', array(), '9.1.1');
      wp_enqueue_script('swiperJs', JS_BASE . 'libs/swiper.min.js', array('jqueryJs'), '9.1.1', true);
    }
  }
  add_action( 'wp_enqueue_scripts', 'load_swiper_on_specific_pages' );

  function enqueue_style_scripts() {
    global $post;
    $isHome = is_front_page() || is_home();

    // Styles
    wp_enqueue_style('mainCss',  CSS_BASE . 'main.css', array(), _S_VERSION);

    if ($isHome) {
      wp_enqueue_style('homeCss',  CSS_BASE . 'home.css', array(), _S_VERSION);
    } else if (!empty($post) && $post->post_type == 'page') {
      if ($post->post_name == 'nosotros') {
        wp_enqueue_style('aboutCss',  CSS_BASE . 'about.css', array(), _S_VERSION);
      } else if ($post->post_name == 'locales-comerciales') {
        wp_enqueue_style('bussinesCss',  CSS_BASE . 'bussines.css', array(), _S_VERSION);
      } else if ($post->post_name == 'contacto') {
        wp_enqueue_style('contactCss',  CSS_BASE . 'contact.css', array(), _S_VERSION);
      } else if ($post->post_name == 'noticias') {
        wp_enqueue_style('newsCss',  CSS_BASE . 'news.css', array(), _S_VERSION);
      } else if ($post->post_name == 'resultado-propiedades') {
        wp_enqueue_style('apartmentCss',  CSS_BASE . 'apartment.css', array(), _S_VERSION);
      }
    }  else if (is_single()) {
      wp_enqueue_style('singleCss',  CSS_BASE . 'single.css', array(), _S_VERSION);
    }

    // Scripts
    wp_enqueue_script('jqueryJs', JS_BASE . 'libs/jquery.min.js', array(), '3.6.4', true);
    wp_enqueue_script('mainJs', JS_BASE . 'main.js', array('jqueryJs'), _S_VERSION, true);
  }
  add_action('wp_enqueue_scripts', 'enqueue_style_scripts');

?>