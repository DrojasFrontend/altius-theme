<?php 
$fields = get_fields();

$terms = get_terms( array(
  'taxonomy' => 'category',
  'object_type' => 'noticia',
) );
?>
<style>
  .news__search-bckg:before {
    background: transparent linear-gradient(180deg, <?= $fields['news_bckg_color_main'] ?>00 0%, <?= $fields['news_bckg_color_main'] ?> 100%) 0% 0% no-repeat padding-box;
  }
</style>
<div class="news__search-bckg" style="background-color: <?= $fields['news_bckg_color_main']; ?>">
  <div class="container">
    <div class="news__search-form">
     <!--  <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
        <button type="submit" class="news__search-submit">
          <img class="" src="<?= IMG_BASE; ?>icons/icon-search.svg" alt="" width="" height="" loading="lazy">
        </button>
        <label>
          <span class="sr-only"><?php echo _x( 'Buscar:', 'label' ); ?></span>
          <input type="search" class="news__search-input" placeholder="<?php echo esc_attr_x( 'Buscar...', 'placeholder' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
        </label>
      </form> -->
      <form method="get">
        <button type="submit" class="news__search-submit">
          <img class="" src="<?= IMG_BASE; ?>icons/icon-search.svg" alt="" width="" height="" loading="lazy">
        </button>
        <select name="categoria">
            <option value="">Todas las categorías</option>
            <?php foreach ( $terms as $term ) : ?>
                <option value="<?php echo esc_attr( $term->slug ); ?>"><?php echo esc_html( $term->name ); ?></option>
            <?php endforeach; ?>
        </select>
      </form>
    </div>
  </div>
</div>