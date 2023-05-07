<?php
/**
 * The template for displaying all single posts and attachments
 */
 
get_header(); 
?>

<div class="apartment">
  <?php
    while ( have_posts() ) : the_post(); ?>

      <section class="apartment__hero">
        <?php get_template_part('templates/parts/vendido/hero'); ?>
      </section>

      <section class="vendido__copy">
        <?php get_template_part('templates/parts/vendido/copy'); ?>
      </section>

      <section class="vendido__gallery">
        <?php get_template_part('templates/parts/vendido/gallery'); ?>
      </section>
    <?php endwhile;
  ?>
</div>

<style>
  .footer::before {
    background: #f0000075;
  }

  .footer .h3 {
    color: #ffffff;
  }
</style>

<?php get_footer(); ?>