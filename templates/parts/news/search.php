<?php 
$fields = get_fields();

$terms = get_terms( array(
  'taxonomy' => 'category',
  'object_type' => 'noticia',
) );
?>
<div class="news__search-bckg" style="background-color: <?= $fields['news_bckg_color_main']; ?>">
  <div class="container">
    <div class="news__search-form">
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