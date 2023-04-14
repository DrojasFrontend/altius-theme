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
?>

<?php if ( ! defined( 'ABSPATH' ) ) { exit; }
if ( $query->have_posts() ) { ?>
  <?php while ($query->have_posts()) { $query->the_post(); ?>
    <?php the_title(); ?>
  <?php } ?>
<?php } else { ?>
  <h2>No se han encontrado resultados</h2>
<?php } ?>