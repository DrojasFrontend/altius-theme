<?php
/**
 * Plantilla de búsqueda personalizada
 */
?>

<?php get_header(); ?>

<main>

  <div class="container">

    <h1>Resultados de la búsqueda para: "<?php echo get_search_query(); ?>"</h1>

    <?php if ( have_posts() ) : ?>

      <ul class="search-results">

        <?php while ( have_posts() ) : the_post(); ?>

          <li>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <p><?php the_excerpt(); ?></p>
          </li>

        <?php endwhile; ?>

      </ul>

      <?php
        // Mostrar la paginación
        global $wp_query;
        $big = 999999999; // número improbable
        echo paginate_links( array(
          'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
          'format' => '?paged=%#%',
          'current' => max( 1, get_query_var('paged') ),
          'total' => $wp_query->max_num_pages,
          'prev_text' => __('« Anterior'),
          'next_text' => __('Siguiente »'),
        ) );
      ?>

    <?php else : ?>

      <p>No se encontraron resultados para "<?php echo get_search_query(); ?>"</p>

    <?php endif; ?>

  </div>

</main>

<?php get_footer(); ?>
