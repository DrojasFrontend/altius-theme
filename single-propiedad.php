<?php
/**
 * The template for displaying all single posts and attachments
 */
 
get_header(); ?>

<div class="properties">
  <?php while ( have_posts() ) : the_post(); ?>
    <section class="properties__swiper">
      <div class="swiper-top swiper">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
          </li>
          <li class="swiper-slide">
            <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
          </li>
        </ul>
      </div>
      <div class="swiper-bottom swiper">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
          </li>
          <li class="swiper-slide">
            <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
          </li>
        </ul>
        <div class="apartment__gallery-actions">
          <button type="button" class="swiper-button-prev" aria-label="prev slide">
            <img class="" src="<?= IMG_BASE; ?>icon-prev-ligh.png" alt="prev" width="" height="" loading="lazy">
          </button>
          <button type="button" class="swiper-button-next" aria-label="next slide">
            <img class="" src="<?= IMG_BASE; ?>icon-next-ligh.png" alt="next" width="" height="" loading="lazy">
          </button>
        </div>
      </div>
    </section>
    <section class="properties__detail">
      <div class="container">
        <div class="properties__detail-wrapper">
          <div>
            <h1 class="h3"><?= the_title(); ?></h1>
            <p class="text">Local sobre Av. Italia esq. Erevan</p>
            <div class="box">
              <span class="text">Venta: <strong>US $821.600</strong></span>
              <span class="text">Alquiler: <strong>US $6.004</strong></span>
            </div>
            <div class="properties__detail-img">
              <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
            </div>
          </div>
          <div>
            Filter
          </div>
        </div>
      </div>
    </section>
  <?php endwhile; ?>
</div>

<?php get_footer(); ?>