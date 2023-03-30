<?php

/*
Template Name: Home
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

  <section class="home__hero">
    <div class="container">
      <?php get_template_part('templates/parts/home/hero'); ?>
    </div>
  </section>

  <section class="home__featured">
    <div class="container">
      <?php get_template_part('templates/parts/home/featured'); ?>
    </div>
  </section>

  <section class="home__newprojects">
    <div class="container">
      <?php get_template_part('templates/parts/home/newprojects'); ?>
    </div>
  </section>

  <section class="home__video">
    <div class="container">
      <?php get_template_part('templates/parts/home/video'); ?>
    </div>
  </section>

  <section id="counter" class="home__counter">
    <div class="container">
      <?php get_template_part('templates/parts/home/counter'); ?>
    </div>
  </section>

<?php get_footer(); ?>