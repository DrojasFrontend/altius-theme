<?php

/*
Template Name: Contacto
*/

get_header(); ?>

  <section class="contact__hero">
    <?php get_template_part('templates/parts/contact/hero'); ?>
  </section>

  <section class="contact__form">
    <?php get_template_part('templates/parts/contact/form'); ?>
  </section>

  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872841.441356368!2d-58.14344732135017!3d-32.56475609337021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9575073afb5fde09%3A0x4a5596616016524a!2sUruguay!5e0!3m2!1ses-419!2sco!4v1680271059270!5m2!1ses-419!2sco" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

  <section class="contact__showroom">
    <?php get_template_part('templates/parts/contact/showroom'); ?>
  </section>


<?php get_footer(); ?>