<?php get_header(); ?>

<div class="noticias">
  <?php if ( have_posts() ) : ?>
    <h1>Resultados de búsqueda para "<?php echo get_search_query(); ?>"</h1>
    <?php while ( have_posts() ) : the_post(); ?>
      <div class="post">
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <?php the_excerpt(); ?>
      </div>
    <?php endwhile; ?>

    <div class="pagination">
    <?php
      function paginateSearch(){
        global $wp_query;
        $searchPages = $wp_query -> max_num_pages;
        $theBig = 999999999;
        $paginateSearchArgs = array(
          'base' => str_replace($theBig,'%#%',esc_url (get_pagenum_link($theBigNumber))),
          'format' => '?page = %#%',
          'current' =>  max(1, get_query_var ('paged')),
          'total' => $searchPages
        );
          echo paginate_links($paginateSearchArgs);
      }
    ?>
    </div>

  <?php else : ?>
    <h1>No se encontraron resultados para "<?php echo get_search_query(); ?>"</h1>
  <?php endif; ?>
</div>

<?php get_footer(); ?>
