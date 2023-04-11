<?php
/**
 * The template for displaying all single posts and attachments
 */
 
get_header(); ?>

<div class="news">
  <?php
    while ( have_posts() ) : the_post();
    the_title();
    endwhile;
  ?>
</div>

<?php get_footer(); ?>