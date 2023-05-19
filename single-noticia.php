<?php
/**
 * The template for displaying all single posts and attachments
 */
get_header(); 
$fields = get_fields();
?>
<?php
  while ( have_posts() ) : the_post(); ?>
    <section class="new__detail-swiper">
      <h1 class="title"><?= the_title(); ?></h1>
      <div class="swiper-single">
        <div class="swiper-wrapper">
          <?php if (!empty($fields['new_detail_repeater']) && count($fields['new_detail_repeater'])) : ?>
            <?php foreach ($fields['new_detail_repeater'] as $key => $item) : ?>
              <div class="swiper-slide">
                <figure>
                  <img class="new-detail-swiper__img" class="" src="<?= $item['new_detail_repeater_img'] ?>" alt="slide-<?= $key ?>" width="" height="" loading="lazy">
                </figure>
              </div>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
      </div>

      <div class="new__detail-actions">
        <button type="button" class="swiper-button-prev new-detail__prev" aria-label="prev slide">
          <img class="" src="<?= IMG_BASE; ?>icons/icon-prev.svg" alt="image-1" width="" height="" loading="lazy">
        </button>
        <button type="button" class="swiper-button-next new-detail__next" aria-label="next slide">
          <img class="" src="<?= IMG_BASE; ?>icons/icon-next.svg" alt="image-1" width="" height="" loading="lazy">
        </button>
      </div>
    </section>

    <section class="new__detail-bckg">
      <div class="new__detail-wrapper">
        <div class="new__detail-content">
          <div class="new__detail-copy">
            <h3 class="h3">Descripción</h3>
            <?php if (isset($fields['new_detail_small_copy']) && array_key_exists('new_detail_small_copy', $fields)) { ?>
              <div class="text">
                <?= $fields['new_detail_small_copy'] ?>
              </div>
            <?php } ?>
          </div>
          <div class="text">
            <?= the_content(); ?>
          </div>
          <?php if($fields['new_detail_fuente']) { ?>
            <div class="new__detail-content__link">
              <p class="h3">
                FUENTE
              </p>
              <a class="text" href="<?= $fields['new_detail_fuente'] ?>">
                <?= $fields['new_detail_fuente'] ?>
              </a>
            </div>
          <?php } ?>
        </div>
        <div class="new__detail-sidebar">
          <!-- <div class="section">
            <h3 class="h3">ENCUENTRA TU NOTICIA</h3>
            <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
              <label>
                <span class="sr-only"><?php echo _x( 'Buscar:', 'label' ); ?></span>
                <input type="search" class="news__search-input" placeholder="<?php echo esc_attr_x( 'Buscar...', 'placeholder' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
              </label>
              <button type="submit" class="news__search-submit">BUSCAR</button>
            </form>
          </div> -->

          <?php if ( is_active_sidebar( 'siedebar_widget_1' ) ) : ?>
            <div class="section">
              <h3 class="h3 center">Redes Sociales</h3>
							<?php dynamic_sidebar( 'siedebar_widget_1' ); ?>
            </div>
          <?php endif; ?>

          <div class="section">
            <h3 class="h3 center">Relevantes</h3>
            <?php
              $args = array(
                'post_type' => 'noticia',
                'posts_per_page' => 3,
                'orderby' => 'date',
                'order' => 'DESC'
              );
              $noticias_query = new WP_Query( $args );
              if ( $noticias_query->have_posts() ) {
                while ( $noticias_query->have_posts() ) {
                  $noticias_query->the_post();
                  $title = get_the_title();
                  $title_str = substr( $title, 0, 40 ) . '...';
                  $date = get_the_date('D - d - M');
                  $excerpt = substr(get_the_excerpt(), 0, 135) . '...';
                  $permalink = get_permalink();

                  echo '<div class="latest-news">';
                  echo '<h5 class="h4">' . $title_str . '</h5>';
                  echo '<p class="date">' . $date . '</p>';
                  echo '<p class="excerpt text">' . $excerpt . '</p>';
                  echo '<a class="link" href="' . $permalink . '">Continuá leyendo</a>';
                  echo '</div>';
                }
              } else {
                echo 'No se encontraron noticias.';
              }
                wp_reset_postdata();
            ?>
          </div>
        </div>
      </div>
    </section>

<?php endwhile; ?>

<?php get_footer(); ?>