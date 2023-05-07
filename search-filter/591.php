<?php
/**
 * Search & Filter Pro 
 *
 * Sample Results Template
 * 
 * @package   Search_Filter
 * @author    Daniel Rojas Astood
 * @link      https://searchandfilter.com
 * @copyright 2022 Search & Filter
 * 
 *
 */

  if ( ! defined( 'ABSPATH' ) ) { exit; }
  $type = isset($_GET['_sft_tipo']) ? $_GET['_sft_tipo'] : '';
?>
<?php 
  if ($type == 'vivienda') { ?>
    <section class="result__apartment">
      <div class="container">
        <div class="result__apartment-wrapper">
          <div class="result__apartment-loop">
            <div class="desk">
              <h2 class="h2 title">
                Propiedades
              </h2>
              <p class="text count">
                <?php 
                  if ( $query->have_posts() ) { 
                    $count = $query->found_posts;
                    if ($count > 1) {
                      echo "$count resultados";
                    } else {
                      echo "$count resultado";
                    }
                  }
                ?>
              </p>
            </div>
            <ul class="result__apartment-items">
              <?php $key = 0; ?>
              <?php if ( $query->have_posts() ) { ?>
                <?php while ($query->have_posts()) { $query->the_post(); ?>
                  <?php $key++; ?>
                  
                  <li class="result__apartment-item">
                    <div class="result__apartment-item__img">
                      <figure>
                        <img class="" src="<?= IMG_BASE; ?>placeholder-tipologia.png" alt="" width="" height="" loading="lazy">
                        <!-- <img class="" src="<?php the_field("vista_previa_imagen") ?>" alt="" width="" height="" loading="lazy"> -->
                      </figure>
                      <div class="result__apartment-item__hover">
                        <button type="button" class="btn-show-modal no-border" data-target="modal-<?php echo $key; ?>">
                          <img class="" src="<?= IMG_BASE; ?>icons/icon-plus-circle.svg " alt="" width="" height="" loading="lazy">
                        </button>
                        <button style="opacity: 0" type="button" class="btn-show-modal" data-target="modal-<?php echo $key; ?>">
                          DESCRIPCIÓN DEL PROYECYO
                        </button>
                      </div>
                    </div>
                    <div class="result__apartment-item__bottom">
                      <span class="text">
                        <img class="" src="<?= IMG_BASE; ?>icons/icon-topologia.svg " alt="" width="" height="" loading="lazy">
                        <?php the_field("tipologia") ?>
                      </span>
                      <span class="text">
                        <?php the_field("m2_totales") ?> m²
                      </span>
                      <span class="text">
                        <img class="" src="<?= IMG_BASE; ?>icons/icon-dorm.svg" alt="" width="" height="" loading="lazy">
                        <?php the_field("dorm") ?>
                      </span>
                    </div>
                  </li>

                  <div id="modal-<?php echo $key; ?>" class="modal">
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
                                <img class="" src="<?= IMG_BASE; ?>placeholder-tipologia.png" alt="" width="" height="" loading="lazy">
                              </figure>
                              
                            </div>
                            <div class="modal-content__info">
                              <h5 class="h3">Características</h5>
                              <p class="text"> Área total: <?php the_field("m2_totales") ?>  m²</p>
                              <p class="text bckg"> Área propia: <?php the_field("m2_internos") ?> m²</p>
                              <p class="text"> Terraza cubierta: <?php the_field("m2_terr_cub") ?> m²</p>
                              <p class="text bckg"> Terraza descubierta: <?php the_field("m2_terr_desc") ?> m²</p>
                              <p class="text"> Espacios comunes: <?php the_field("m2_esp_comunes") ?> m²</p>
                              
                            </div>
                          </div>
                        </div>
                        <footer>
                          <button type="button" class="modal-content__btn open-form">Consultar</button>
                          <a href="<?php the_field("brochure") ?>" class="modal-content__btn" target="_blank">Descargar</a>
                          <?= do_shortcode('[contact-form-7 id="1381" title="Formulario Propiedad" html_class="contact-form"]') ?>
                          <p id="display-price" class="display-price">
                            USD 
                            <?= get_field("precio"); ?>
                          </p>
                        </footer>
                      </div>
                    </div>
                  </div>
                <?php } ?>

                <div class="pagination">
                  <?php echo paginate_links( array(
                    'base' => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
                    'format' => '?paged=%#%',
                    'current' => max( 1, get_query_var( 'paged' ) ),
                    'total' => $query->max_num_pages)); 
                  ?>
                </div>

              <?php } else { ?>
                <h2 class="h3">No se han encontrado resultados</h2>
              <?php } ?>
            </ul>
            <div class="result__apartment-filter__form mobile">
              <h3 class="h3">CONTÁCTANOS</h3>
              <?= do_shortcode('[contact-form-7 id="1380" title="Formulario Contáctanos Filtro Sidebar"]'); ?>
            </div>
          </div>
          <div class="result__apartment-filter">
            <div class="mobile">
              <h2 class="h2 title">
                Propiedades
              </h2>
              <p class="text count">
                <?php 
                  if ( $query->have_posts() ) { 
                    $count = $query->found_posts;
                    if ($count > 1) {
                      echo "$count resultados";
                    } else {
                      echo "$count resultado";
                    }
                  }
                ?>
              </p>
            </div>
            <div class="result__apartment-filter__shortcode">
              <h2 class="h3">BUSCÁ</h2>
              <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
            </div>
            <div class="result__apartment-filter__form desk">
              <h3 class="h3">CONTÁCTANOS</h3>
              <?= do_shortcode('[contact-form-7 id="1380" title="Formulario Contáctanos Filtro Sidebar"]'); ?>
            </div>
          </div>
        </div>
      </div>
    </section>

  <?php } else if ($type == 'local' || $type == 'oficina') { ?>
    <section class="result__local <?php if ($type == 'oficina') { ?>padding<?php } ?>">
      <?php if ($type == 'local') { ?>
        <h2 class="h2 title">
          <figure style="margin-bottom: 2rem">
            <img src="/wp-content/uploads/banner-locales-comerciales-scaled.jpeg" alt="">
          </figure>
        </h2>
      <?php } ?>
      
      <div class="container">
        <div class="result__local-wrapper">
          <div class="result__local-loop">
            <div class="desk">
              <?php if ($type == 'local') { ?>
                <h2 class="h2 title">
                  Locales Comerciales
                </h2>
              <?php } else { ?>
                <h2 class="h2 title">
                  Oficinas
                </h2>
              <?php } ?>
              <p class="text count">
                <?php 
                  if ( $query->have_posts() ) { 
                    $count = $query->found_posts;
                    if ($count > 1) {
                      echo "$count resultados";
                    } else {
                      echo "$count resultado";
                    }
                  }
                ?>
              </p>
            </div>
            <ul class="result__local-items">
              <?php $key = 0; ?>
              <?php if ( $query->have_posts() ) { ?>
                <?php while ($query->have_posts()) { $query->the_post(); ?>
                  <?php $key++; ?>
                  <a href="<?= the_permalink(); ?>" class="result__local-item">
                    <figure>
                      <img class="" src="<?= IMG_BASE; ?>placeholder-tipologia.png" alt="" width="" height="" loading="lazy">
                    </figure>
                    <span class="status"><?php the_field("condicion_avance_de_obra") ?></span>
                    <div class="info">
                      <div class="bottom">
                        <!-- <span class="view">ver más</span> -->
                        <h5 class="name"><?php the_field("nombre_del_proyecto") ?> - <?php the_field("unidad") ?></h5>
                        <p class="text"><?php the_field("direccion") ?></p>
                        <p class="text"><?php the_field("barrio") ?></p>
                        <p class="text metro"><?php the_field("m2_totales") ?> m²</p>
                        <?php if(get_field("precio")) : ?>
                        <p class="price">
                          <strong>USD
                          <?= get_field("precio"); ?>
                          </strong></p>
                        <?php endif; ?>
                      </div>
                    </div>
                  </a>
                  <?php } ?>

                  <div class="pagination">
                    <?php echo paginate_links( array(
                      'base' => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
                      'format' => '?paged=%#%',
                      'current' => max( 1, get_query_var( 'paged' ) ),
                      'total' => $query->max_num_pages)); 
                    ?>
                  </div>

                  <div class="result__apartment-filter__form mobile">
                    <h3 class="h3">CONTÁCTANOS</h3>
                    <?= do_shortcode('[contact-form-7 id="1380" title="Formulario Contáctanos Filtro Sidebar"]'); ?>
                  </div>

                <?php } else { ?>
                  <h2 class="h3">No se han encontrado resultados</h2>
              <?php } ?>
            </ul>
          </div>
          <div class="result__apartment-filter">
            <div class="mobile">
              <h2 class="h2 title">
                Locales Comerciales
              </h2>
              <p class="text count">
                <?php 
                  if ( $query->have_posts() ) { 
                    $count = $query->found_posts;
                    if ($count > 1) {
                      echo "$count resultados";
                    } else {
                      echo "$count resultado";
                    }
                  }
                ?>
              </p>
            </div>
            <div class="result__apartment-filter__shortcode">
              <h2 class="h3">BUSCÁ</h2>
              <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
            </div>
            <div class="result__apartment-filter__form desk">
              <h3 class="h3">CONTÁCTANOS</h3>
              <?= do_shortcode('[contact-form-7 id="1380" title="Formulario Contáctanos Filtro Sidebar"]'); ?>
            </div>
          </div>
        </div>
      </div>
    </section>
  <?php }

?>
<script>
  jQuery('.btn-show-modal').click(function() {
    var target = jQuery(this).data('target');
    jQuery('#' + target).fadeIn();
  });

  jQuery('.open-form').click(function() {
    jQuery('.contact-form').slideToggle();
  });

  jQuery('.btn-hide-modal').click(function() {
    jQuery(this).parents('.modal').fadeOut();
    jQuery('.display-price').fadeOut();
  });
</script>
