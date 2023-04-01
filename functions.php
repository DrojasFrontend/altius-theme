<?php
  $templateUrl = base_url();
  $templatePath = get_template_directory();
  define('URL_BASE', site_url('/'));
  define('TEMPLATE_BASE', $templateUrl);
  define('IMG_BASE', $templateUrl . 'assets/images/');
  define('CSS_BASE', $templateUrl . 'assets/css/');
  define('JS_BASE', $templateUrl . 'assets/js/');
  define('ADMIN_AJAX', admin_url('admin-ajax.php'));
  define('AJAX_NONCE', 'ajax-seguridad-5021');
  $incPath = $templatePath . '/inc/';
  
  require_once $incPath . 'acf.php';
  require_once($incPath . 'enqueue-style-scripts.php');
  require_once($incPath . 'remove-styles-scripts.php');
  require_once($incPath . 'theme-setup.php');

  // Admin bar Remove
  function remove_admin_bar() {
    if (!is_admin()) {
      show_admin_bar(false);
    }
  }
  add_action('after_setup_theme', 'remove_admin_bar');

  // get base url
  function base_url($url = null) {
    $url_final = ($url != null) ? get_stylesheet_directory_uri() . '/' . $url : get_stylesheet_directory_uri() . '/';
    return $url_final;
  }

  function dd($value) {
    print '<pre>';
    print_r($value);
    print '</pre>';
  }

  // Menu
  function get_nav_menu_custom($menuSlug, $menuClass = 'menu') {
    $menuMain = wp_nav_menu([
      'menu' => $menuSlug,
      'menu_class' => $menuClass,
      'container' => 'nav',
      'items_wrap' => '<ul class="%2$s" itemscope itemtype="http://www.schema.org/SiteNavigationElement">%3$s</ul>',
      'echo' => false
    ]);
    return str_replace('rel=', 'itemprop=', $menuMain);
  }
?>
