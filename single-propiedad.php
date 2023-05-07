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
            <p class="text"><?php the_field("barrio") ?> - <?php the_field("direccion") ?></p>
            <div class="box">
              <span class="text">Venta: <strong>USD <?= get_field("precio"); ?></strong></span>
              <!-- <span class="text">Alquiler: <strong>US $6.004</strong></span> -->
            </div>
            <div class="properties__detail-img">
              <img class="" src="<?= IMG_BASE; ?>placeholder-1920.jpeg" alt="prev" width="" height="" loading="lazy">
            </div>

            <div class="properties__detail-bottom">
              <p class="text">Tipo de propiedad: <strong><?php the_field("tipo") ?></strong></p>
              <h4 class="h3">Descripción</h4>
              <p class="text">
              Amplio Local comercial sobra Av. Italia esq Erevan, ubicado en la planta baja de la torre Nostrum Malvín. Una torre diseñada por los reconocidos arquitectos Carlos Ott en asociación con Carlos Ponce de León que contará con 225 unidades de vivienda Monoambientes, 1, 2 y 3 dormitorios asegurando un amplio flujo de personas durante todo el día.
              </p>
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