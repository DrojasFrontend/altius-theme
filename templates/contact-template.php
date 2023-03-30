<?php

/*
Template Name: Contacto
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

  <section class="contact__hero">
    <?php get_template_part('templates/parts/contact/hero'); ?>
  </section>

  <section class="contact__form">
    <div class="container">
      <?php get_template_part('templates/parts/contact/form'); ?>
    </div>
  </section>


<?php get_footer(); ?>