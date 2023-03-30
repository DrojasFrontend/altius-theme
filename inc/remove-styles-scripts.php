<?php

 // javascript WP remove
 remove_action ('wp_head', 'print_emoji_detection_script', 7); remove_action ('wp_print_styles', 'print_emoji_styles'); 
 remove_action ('admin_print_scripts', 'print_emoji_detection_script'); remove_action ('admin_print_styles', 'print_emoji_styles');

 // Hide WordPress Version
remove_action ('wp_head', 'wp_generator');

// Remove heartbeat
add_action( 'init', 'stop_heartbeat', 1 );
function stop_heartbeat() {
  wp_deregister_script('heartbeat');
}

// Remove classic theme styles
function disable_classic_theme_styles() {
  wp_deregister_style('classic-theme-styles');
  wp_dequeue_style('classic-theme-styles');
}
add_filter('wp_enqueue_scripts', 'disable_classic_theme_styles', 100);

// Remove global styles
add_action( 'wp_enqueue_scripts', 'remove_global_styles' );
function remove_global_styles(){
  wp_dequeue_style( 'global-styles' );
}