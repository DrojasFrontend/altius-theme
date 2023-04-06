<?php

/*
Template Name: Nosotros
*/

get_header(); ?>

  <section class="about__hero">
    <?php get_template_part('templates/parts/about/video'); ?>
  </section>

  <section class="about__content">
    <?php get_template_part('templates/parts/about/content'); ?>
  </section>

  <section class="about__banner">
    <?php get_template_part('templates/parts/about/banner'); ?>
  </section>

  <section id="counter" class="about__counter">
    <?php get_template_part('templates/parts/about/counter'); ?>
  </section>

  <section class="about__world">
    <?php get_template_part('templates/parts/about/world'); ?>
  </section>

  <section class="about__brand">
    <?php get_template_part('templates/parts/about/brand'); ?>
  </section>

  <section class="about__mision">
    <?php get_template_part('templates/parts/about/mision'); ?>
  </section>

<?php get_footer(); ?>