<?php

/*
Template Name: Nosotros
*/

get_header(); ?>

<?php
  // $fields = get_fields();

  // Hero
  // $hero = (object) [
  //   'titleSup' => $fields['hero_title_sup'],
  //   'title' => $fields['hero_title'],
  //   'description' => $fields['hero_description'],
  //   'videoUrl' => $fields['hero_video_url'] . '?controls=0'
  // ];
?>

  <section class="about__hero">
    <?php get_template_part('templates/parts/about/hero'); ?>
  </section>

  <section class="about__content">
    <div class="container">
      <?php get_template_part('templates/parts/about/content'); ?>
    </div>
  </section>

  <section class="about__loop">
    <?php get_template_part('templates/parts/about/loop'); ?>
  </section>

<?php get_footer(); ?>