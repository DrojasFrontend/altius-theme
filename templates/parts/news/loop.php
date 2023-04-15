<?php
$fields = get_fields();
?>
<div class="news__loop-wrapper">
  <div style="background-color: <?= $fields['news_bckg_color_main']; ?>">
    <div class="news__loop-cards">
      <?php 
        $args = array(
          'post_type' => 'noticia',
          'posts_per_page' => 7,
          'paged' => get_query_var('paged') ? get_query_var('paged') : 1, // Agregar esta línea

        );
      
        if ( isset( $_GET['categoria'] ) && $_GET['categoria'] ) {
          $args['tax_query'] = array(
            array(
              'taxonomy' => 'category',
              'field' => 'slug',
              'terms' => sanitize_text_field( $_GET['categoria'] ),
            ),
          );
        }
        
        $loop = new WP_Query( $args );

        if( $loop->have_posts() ):
          $count = 0;
          while( $loop->have_posts() ): $loop->the_post();
            if($count == 0) {
              ?>
                <div class="news__loop-card-bckg" style="background-color: <?= $fields['news_bckg_color']; ?>">
                  <div class="news__loop-card-main">
                    <header>
                      <p class="text news__loop-card__date black">
                        <span class="month"><?= get_the_date('M'); ?></span>
                        <span class="day"><?= get_the_date('d'); ?></span>
                        <span class="year"><?= get_the_date('Y'); ?></span>
                      </p>
                      <h2><?= the_title(); ?></h2>
                    </header>
                    <?php if (has_post_thumbnail()): ?>
                      <div class="news__loop-card__image">
                        <?= the_post_thumbnail('large'); ?>
                        <a href="<?php the_permalink(); ?>" class="news__loop-card__link text">Continuá leyendo</a>
                      </div>
                    <?php endif; ?>
                    <footer class="news__loop-card__excerpt text">
                      <?= substr(get_the_excerpt(), 0, 230) . '...'; ?>
                    </footer>
                  </div>
                </div>
              <?php } else { ?>
                <div class="news__loop-card news__loop-bottom">
                  <?php if (has_post_thumbnail()): ?>
                    <div class="news__loop-card__image">
                      <p class="news__loop-card__date">
                        <span class="month"><?= get_the_date('M'); ?></span>
                        <span class="day"><?= get_the_date('d'); ?></span>
                        <span class="year"><?= get_the_date('Y'); ?></span>
                      </p>
                      <?= the_post_thumbnail(); ?>
                      <div class="news__loop-card__cat">
                        <?php
                          $categories = get_the_category();
                          if ( ! empty( $categories ) ) {
                            foreach( $categories as $category ) {
                              echo $category->name;
                            }
                          }
                        ?>
                      </div>
                    </div>
                  <?php endif; ?>
                  <footer>
                    <h2><?= the_title(); ?></h2>
                    <?php
                    if(get_the_excerpt()) { ?>
                      <p>
                        <?= substr(get_the_excerpt(), 0, 155) . '...'; ?>
                      </p>
                    <?php } ?>
                    <a href="<?php the_permalink(); ?>" class="news__loop-card__link text">Continuá leyendo</a>
                  </footer>
                </div>
              <?php } $count++;
          endwhile;

          // Agregar paginador
          $total_pages = $loop->max_num_pages;
          if ($total_pages > 1) {
            $current_page = max(1, get_query_var('paged')); // Obtener la página actual
            echo '<div class="pagination">';
            echo paginate_links(array(
              'base' => get_pagenum_link(1) . '%_%',
              'format' => 'page/%#%',
              'current' => $current_page,
              'total' => $total_pages,
              'prev_next' => true,
              'prev_text' => __('«'),
              'next_text' => __('»'),
            ));
            echo '</div>';
          }

        endif;
      wp_reset_postdata(); ?>
    </div>
  </div>
</div>
