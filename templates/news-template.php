<?php 
/*
	Template Name: Noticias
*/
get_header(); 
$fields = get_fields();
?>

<section class="news__banner">
  <?php get_template_part('templates/parts/news/banner'); ?>
</section>

<section class="news__search">
  <?php get_template_part('templates/parts/news/search'); ?>
</section>

<section class="news__loop">
  <?php get_template_part('templates/parts/news/loop'); ?>
</section>

<?php get_footer(); ?>