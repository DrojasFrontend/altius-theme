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

		function wpdocs_codex_noticia_init() {
			$labels = array(
				'name' => _x( 'Noticias', 'Nombre general del tipo de publicación', 'altius_theme' ),
				'singular_name' => _x( 'Noticia', 'Post type singular name', 'altius_theme' ),
				'menu_name' => _x( 'Noticias', 'Texto del menú de administración', 'altius_theme' ),
				'name_admin_bar' => _x( 'Noticia', 'Agregar nuevo en la barra de herramientas', 'altius_theme' ),
				'add_new' => __( 'Agregar nuevo', 'altius_theme' ),
				'add_new_item' => __( 'Agregar Nueva Noticia', 'altius_theme' ),
				'nuevo_elemento' => __( 'Nueva Noticia', 'altius_theme' ),
				'edit_item' => __( 'Editar Noticia', 'altius_theme' ),
				'view_item' => __( 'Ver Noticia', 'altius_theme' ),
				'all_items' => __( 'Todas las Noticias', 'altius_theme' ),
				'search_items' => __( 'Buscar Noticias', 'altius_theme' ),
				'parent_item_colon' => __( 'Parent Noticias:', 'altius_theme' ),
				'not_found' => __( 'No se encontraron noticias.', 'altius_theme' ),
				'not_found_in_trash' => __( 'No se encontraron noticias en la Papelera.', 'altius_theme' ),
				'featured_image' => _x( 'Imagen de portada de Noticia', 'Anula la frase "Imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'set_featured_image' => _x( 'Establecer imagen de portada', 'Anula la frase "Establecer imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'remove_featured_image' => _x( 'Eliminar imagen de portada', 'Anula la frase "Eliminar imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'use_featured_image' => _x( 'Usar como imagen de portada', 'Anula la frase "Usar como imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'archivos' => _x( 'Archivos de Noticia', 'La etiqueta de archivo de tipo de publicación utilizada en los menús de navegación. Predeterminado "Archivos de publicación". Agregado en 4.4', 'altius_theme' ),
				'insert_into_item' => _x( 'Insertar en noticia', 'Anula la frase "Insertar en publicación"/"Insertar en página" (usada al insertar medios en una publicación). Agregado en 4.4', 'altius_theme' ),
				'uploaded_to_this_item' => _x( 'Subido a esta noticia', 'Anula la frase "Subido a esta publicación"/"Subido a esta página" (usado cuando se visualizan medios adjuntos a una publicación). Agregado en 4.4', 'altius_theme' ),
				'filter_items_list' => _x( 'Filtrar lista de noticias', 'Texto del lector de pantalla para el encabezado de enlaces de filtro en la pantalla de listado de tipo de publicación. Predeterminado "Filtrar lista de publicaciones"/"Filtrar lista de páginas". Agregado en 4.4', 'altius_theme' ),
				'items_list_navigation' => _x( 'Navegación de la lista de noticias', 'Texto del lector de pantalla para el encabezado de paginación en la pantalla de listado de tipo de publicación. "Navegación de la lista de publicaciones"/"Navegación de la lista de páginas". Añadido en 4.4', 'altius_theme' ) ,
				'items_list' => _x( 'Lista de noticias', 'Texto del lector de pantalla para el encabezado de la lista de elementos en la pantalla de listado de tipo de publicación. "Lista de publicaciones"/"Lista de páginas" predeterminada. Agregado en 4.4', 'altius_theme' ),
			);

			$args = array(
				'labels'             => $labels,
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'noticia' ),
				'capability_type'    => 'post',
				'has_archive'        => true,
				'hierarchical'       => false,
				'menu_position'      => 4,
				'menu_icon'           => 'dashicons-archive',
				'taxonomies'          => array( 'category' ),
				'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
			);

			register_post_type( 'noticia', $args );
		}
		add_action( 'init', 'wpdocs_codex_noticia_init' );

		function wpdocs_codex_local_init() {
			$labels = array(
				'name' => _x( 'Locales', 'Nombre general del tipo de publicación', 'altius_theme' ),
				'singular_name' => _x( 'Local', 'Post type singular name', 'altius_theme' ),
				'menu_name' => _x( 'Locales', 'Texto del menú de administración', 'altius_theme' ),
				'name_admin_bar' => _x( 'Local', 'Agregar nuevo en la barra de herramientas', 'altius_theme' ),
				'add_new' => __( 'Agregar nuevo', 'altius_theme' ),
				'add_new_item' => __( 'Agregar Nueva Local', 'altius_theme' ),
				'nuevo_elemento' => __( 'Nueva Local', 'altius_theme' ),
				'edit_item' => __( 'Editar Local', 'altius_theme' ),
				'view_item' => __( 'Ver Local', 'altius_theme' ),
				'all_items' => __( 'Todas las Locales', 'altius_theme' ),
				'search_items' => __( 'Buscar Locales', 'altius_theme' ),
				'parent_item_colon' => __( 'Parent Locales:', 'altius_theme' ),
				'not_found' => __( 'No se encontraron locales.', 'altius_theme' ),
				'not_found_in_trash' => __( 'No se encontraron locales en la Papelera.', 'altius_theme' ),
				'featured_image' => _x( 'Imagen de portada de Local', 'Anula la frase "Imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'set_featured_image' => _x( 'Establecer imagen de portada', 'Anula la frase "Establecer imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'remove_featured_image' => _x( 'Eliminar imagen de portada', 'Anula la frase "Eliminar imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'use_featured_image' => _x( 'Usar como imagen de portada', 'Anula la frase "Usar como imagen destacada" para este tipo de publicación. Agregado en 4.3', 'altius_theme' ),
				'archivos' => _x( 'Archivos de Local', 'La etiqueta de archivo de tipo de publicación utilizada en los menús de navegación. Predeterminado "Archivos de publicación". Agregado en 4.4', 'altius_theme' ),
				'insert_into_item' => _x( 'Insertar en noticia', 'Anula la frase "Insertar en publicación"/"Insertar en página" (usada al insertar medios en una publicación). Agregado en 4.4', 'altius_theme' ),
				'uploaded_to_this_item' => _x( 'Subido a esta noticia', 'Anula la frase "Subido a esta publicación"/"Subido a esta página" (usado cuando se visualizan medios adjuntos a una publicación). Agregado en 4.4', 'altius_theme' ),
				'filter_items_list' => _x( 'Filtrar lista de locales', 'Texto del lector de pantalla para el encabezado de enlaces de filtro en la pantalla de listado de tipo de publicación. Predeterminado "Filtrar lista de publicaciones"/"Filtrar lista de páginas". Agregado en 4.4', 'altius_theme' ),
				'items_list_navigation' => _x( 'Navegación de la lista de locales', 'Texto del lector de pantalla para el encabezado de paginación en la pantalla de listado de tipo de publicación. "Navegación de la lista de publicaciones"/"Navegación de la lista de páginas". Añadido en 4.4', 'altius_theme' ) ,
				'items_list' => _x( 'Lista de locales', 'Texto del lector de pantalla para el encabezado de la lista de elementos en la pantalla de listado de tipo de publicación. "Lista de publicaciones"/"Lista de páginas" predeterminada. Agregado en 4.4', 'altius_theme' ),
			);

			$args = array(
				'labels'             => $labels,
				'public'             => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'show_in_menu'       => true,
				'query_var'          => true,
				'rewrite'            => array( 'slug' => 'noticia' ),
				'capability_type'    => 'post',
				'has_archive'        => true,
				'hierarchical'       => false,
				'menu_position'      => 4,
				'menu_icon'           => 'dashicons-archive',
				'taxonomies'          => array( 'category' ),
				'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ),
			);

			register_post_type( 'local', $args );
		}
		add_action( 'init', 'wpdocs_codex_local_init' );
	}
}
add_action( 'after_setup_theme', 'altius_theme_setup' );
