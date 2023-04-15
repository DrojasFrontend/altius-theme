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
        <?php get_template_part('templates/parts/apartment/hero'); ?>
      </section>

      <section class="apartment__copy">
        <?php get_template_part('templates/parts/apartment/copy'); ?>
      </section>

      <section class="apartment__amenities">
        <?php get_template_part('templates/parts/apartment/amenities'); ?>
      </section>

    <?php endwhile;
  ?>
</div>

<?php get_footer(); ?>