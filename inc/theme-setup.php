<?php
if ( ! function_exists( 'altius_theme_setup' ) ) {
	function altius_theme_setup() {
		
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );

		register_nav_menus(
      array(
        'main-menu' => _( 'Menu Principal' ),
        'main-menu-footer' => _( 'Menu Footer' ),
      )
    );

		$logo_width  = 300;
		$logo_height = 100;
		add_theme_support(
			'custom-logo',
			array(
				'height'               => $logo_height,
				'width'                => $logo_width,
				'flex-width'           => true,
				'flex-height'          => true,
				'unlink-homepage-logo' => true,
			)
		);

		// Excerpt
		add_post_type_support('page', 'excerpt');

		function registrar_widget_footer() {

			register_sidebar( array(
				'name'          => __( 'Footer Widget 1', 'altium_theme' ),
				'id'            => 'footer_widget',
				'description'   => __( 'Widget para el pie de página.', 'altium_theme' ),
				'before_widget' => '<div class="widget-footer">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="h3">',
				'after_title'   => '</h3>',
			));

			register_sidebar( array(
				'name'          => __( 'Footer Widget 2', 'altium_theme' ),
				'id'            => 'footer_widget_2',
				'description'   => __( 'Widget para el pie de página.', 'altium_theme' ),
				'before_widget' => '<div class="widget-footer">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="h3">',
				'after_title'   => '</h3>',
			));

			register_sidebar( array(
				'name'          => __( 'Footer Widget 3', 'altium_theme' ),
				'id'            => 'footer_widget_3',
				'description'   => __( 'Widget para el pie de página.', 'altium_theme' ),
				'before_widget' => '<div class="widget-footer">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="h3">',
				'after_title'   => '</h3>',
			));

			register_sidebar( array(
				'name'          => __( 'Footer Widget 4', 'altium_theme' ),
				'id'            => 'footer_widget_4',
				'description'   => __( 'Widget para el pie de página.', 'altium_theme' ),
				'before_widget' => '<div class="widget-footer">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="h3">',
				'after_title'   => '</h3>',
			));

			register_sidebar( array(
				'name'          => __( 'Sidebar Single', 'altium_theme' ),
				'id'            => 'siedebar_widget_1',
				'description'   => __( 'Widget para el pie de página.', 'altium_theme' ),
				'before_widget' => '<div class="sidebar-widget-single">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="h3">',
				'after_title'   => '</h3>',
			));
		}
		add_action( 'widgets_init', 'registrar_widget_footer' );

		// add_filter ('wpcf7_load_js', '__return_false'); 
		add_filter ('wpcf7_load_css', '__return_false');

	}
}
add_action( 'after_setup_theme', 'altius_theme_setup' );