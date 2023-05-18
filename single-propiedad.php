<?php
/**
 * The template for displaying all single posts and attachments
 */
 
get_header(); 
$header = get_field('vista_previa_imagen_detalle');
?>

<div class="properties">
  <?php while ( have_posts() ) : the_post(); ?>
    <!-- <section class="properties__swiper">
      <div class="swiper-top swiper">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
          </li>
          <li class="swiper-slide">
            <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
          </li>
        </ul>
      </div>
      <div class="swiper-bottom swiper">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
          </li>
          <li class="swiper-slide">
            <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
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
    </section> -->

    <section class="properties__header" style="background-image: url(<?= $header ?>)"></section>
    <section class="properties__detail">
      <div class="container">
        <div class="properties__detail-wrapper">
          <div>
            <h1 class="h3"><?= the_title(); ?></h1>
            <p class="text"><?php the_field("barrio") ?> - <?php the_field("direccion") ?></p>
            <div class="box">
              <span class="text">Venta: <strong>
                USD
                <?php
                  $precio = get_field("precio");
                  $formatted_precio = number_format($precio, 0, '.', '.');
                  echo $formatted_precio;
                ?>
              </strong></span>
              <!-- <span class="text">Alquiler: <strong>US $6.004</strong></span> -->
            </div>
            <ul class="result__apartment-items">
              <div class="result__apartment-item">
                <div class="result__apartment-item__img">
                  <figure>
                    <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
                  </figure>
                  <div class="result__apartment-item__hover">
                    <button type="button" class="btn-show-modal no-border" data-target="modal-<?php echo $key; ?>">
                      <img class="" src="<?= IMG_BASE; ?>icons/icon-plus-circle.svg " alt="" width="" height="" loading="lazy">
                    </button>
                  </div>
                </div>
              </div>
              <div id="modal-1" class="modal">
                <div class="modal-container">
                  <div class="modal-wrapper">
                    <header>
                      <button type="button" class="btn-hide-modal">
                        <img class="" src="<?= IMG_BASE; ?>icons/icon-close-circle.svg" alt="" width="" height="" loading="lazy">
                      </button>
                    </header>
                    <div class="modal-content">
                      <div class="modal-content__wrapper">
                        <div class="modal-content__wrapper-left">
                          <span class="line"></span>
                          <p class="h4">Apartamento: <span class="red"><?= the_title();?></span></p>
                          <figure class="modal-content__img">
                            <img class="" src="<?= get_field("vista_previa_imagen"); ?>" alt="" width="" height="" loading="lazy">
                          </figure>
                          
                        </div>
                        <div class="modal-content__info">
                          <h5 class="h3">Características</h5>
                          <?php if (get_field("m2_totales")) : ?>
                            <p class="text"> Área total: <?php the_field("m2_totales") ?>  m²</p>
                          <? endif; ?>
                          <?php if (get_field("m2_internos")) : ?>
                            <p class="text bckg"> Área propia: <?php the_field("m2_internos") ?> m²</p>
                          <? endif; ?>
                          <?php if (get_field("m2_terr_cub")) : ?>
                            <p class="text"> Terraza cubierta: <?php the_field("m2_terr_cub") ?> m²</p>
                          <? endif; ?>
                          <?php if (get_field("m2_terr_desc")) : ?>
                            <p class="text bckg"> Terraza descubierta: <?php the_field("m2_terr_desc") ?> m²</p>
                          <? endif; ?>
                          <?php if (get_field("m2_esp_comunes")) : ?>
                            <p class="text"> Espacios comunes: <?php the_field("m2_esp_comunes") ?> m²</p>
                          <? endif; ?>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>

            <div class="properties__detail-bottom">
              <p class="text">Tipo de propiedad: <strong><?php the_field("tipo") ?></strong></p>
              <?php if (get_field("descripcion_locales")) : ?>
                <h4 class="h3">Descripción</h4>
                <div class="text">
                  <?= the_field("descripcion_locales"); ?>
                </div>
              <? endif; ?>
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

<script>
  jQuery('.btn-show-modal').click(function() {
    jQuery('.modal').fadeIn();
  });

  jQuery('.btn-hide-modal').click(function() {
    jQuery(this).parents('.modal').fadeOut();
    jQuery('.display-price').fadeOut();
  });
</script>