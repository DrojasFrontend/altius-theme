<?php

/*
Template Name: Home
*/

get_header(); ?>

  <section class="home__hero">
    <?php get_template_part('templates/parts/home/hero'); ?>
  </section>

  <section class="home__featured">
    <?php get_template_part('templates/parts/home/featured'); ?>
  </section>

  <section class="home__newprojects">
    <?php get_template_part('templates/parts/home/newprojects'); ?>
  </section>

  <section id="counter" class="home__counter init__counter">
    <?php get_template_part('templates/parts/home/counter'); ?>
  </section>

  <section class="contact__map">
    <?php get_template_part('templates/parts/contact/map'); ?>
  </section>

<?php get_footer(); ?>