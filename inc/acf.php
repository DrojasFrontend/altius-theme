<?php
  add_filter('acf/settings/save_json', 'my_acf_json_save_point');
  function my_acf_json_save_point( $path ) {
    $path = get_stylesheet_directory() . '/inc/acf-json';
    return $path;
  }

  if(function_exists('acf_add_options_page')) {
    acf_add_options_page(
      [
        'page_title' => 'Footer',
        'menu_title' => 'Footer',
        'menu_slug'  => 'page-footer',
        'post_id'    => 'page_footer'
      ]
    );
  
   /*  acf_add_options_page(
      [
        'page_title' => 'Contacto Opciones',
        'menu_title' => 'Contacto Opciones',
        'menu_slug'  => 'contact-options',
        'post_id'    => 'contact_options'
      ]
    ); */
  
   /*  acf_add_options_page(
      [
        'page_title' => 'Theme options',
        'menu_title' => 'Theme options',
        'menu_slug'  => "theme-options",
        'post_id'    => 'theme_options'
      ]
    ); */
  }
?>