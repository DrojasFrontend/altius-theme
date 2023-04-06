<?php

  define('VERSION', '1.1.0');

  function load_swiper_on_specific_pages() {
    global $post;
    $isHome = is_front_page() || is_home();

    if ( $isHome ) {
      wp_enqueue_style('swiperCss',  CSS_BASE . 'libs/swiper.min.css', array(), '9.1.1');
      wp_enqueue_script('swiperJs', JS_BASE . 'libs/swiper.min.js', array('jqueryJs'), '9.1.1', true);
    }
  }
  add_action( 'wp_enqueue_scripts', 'load_swiper_on_specific_pages' );

  function enqueue_style_scripts() {
    global $post;
    $isHome = is_front_page() || is_home();

    // Styles
    wp_enqueue_style('mainCss',  CSS_BASE . 'main.css', array(), VERSION);

    if ($isHome) {
      wp_enqueue_style('homeCss',  CSS_BASE . 'home.css', array(), VERSION);
    } else if (!empty($post) && $post->post_type == 'page') {
      if ($post->post_name == 'nosotros') {
        wp_enqueue_style('aboutCss',  CSS_BASE . 'about.css', array(), VERSION);
      } else if ($post->post_name == 'locales-comerciales') {
        wp_enqueue_style('bussinesCss',  CSS_BASE . 'bussines.css', array(), VERSION);
      } else if ($post->post_name == 'contacto') {
        wp_enqueue_style('contactCss',  CSS_BASE . 'contact.css', array(), VERSION);
      } 
    }

    // Scripts
    wp_enqueue_script('jqueryJs', JS_BASE . 'libs/jquery.min.js', array(), '3.6.4', true);
    wp_enqueue_script('mainJs', JS_BASE . 'main.js', array('jqueryJs'), VERSION, true);
  }
  add_action('wp_enqueue_scripts', 'enqueue_style_scripts');

  /* function add_custom_scripts() {
    wp_register_script( 'map-script', JS_BASE . 'libs/map.js', array('jquery'), false, true );
    wp_enqueue_script( 'map-script' );
  }
  add_action( 'wp_enqueue_scripts', 'add_custom_scripts' ); */
?>