<?php

/*
Template Name: Locales Comerciales
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

  <section>
    <?php get_template_part('templates/parts/bussines/hero'); ?>
  </section>

  <section>
    <div class="container">
      <?php get_template_part('templates/parts/bussines/loop'); ?>
    </div>
  </section>

<?php get_footer(); ?>