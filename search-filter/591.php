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
  if ($type == 'apartamento') { ?>
    <div class="result__apartment">
      <div class="container">
        <div class="result__apartment-wrapper">
          <div class="result__apartment-loop">
            <h2 class="h2">Propiedades</h2>
            <ul class="result__apartment-items">
              <?php if ( $query->have_posts() ) { ?>
                <?php while ($query->have_posts()) { $query->the_post(); ?>
                  <li class="result__apartment-item">
                    <a href="">
                      <div><?php the_title() ?></div>
                      <div><?php the_field("tipologia") ?></div>
                      <div><?php the_field("dorm") ?></div>
                      <div><?php the_field("m2totales") ?></div>
                      <div><?php the_field("m2terrcub") ?></div>
                      <div><?php the_field("m2terrdesc") ?></div>
                      <div><?php the_field("m2espcomunes") ?></div>
                      <div><?php the_field("precious") ?></div>
                    </a>
                  </li>
                <?php } ?>
              <?php } else { ?>
                <h2 class="h2">No se han encontrado resultados</h2>
              <?php } ?>
            </ul>
          </div>
          <div class="result__apartment-filter">
            Filter
            <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
          </div>
        </div>
      </div>
    </div>
  <?php } else if ($type == 'local-comercial') { ?>
  <?php } else if ($type == 'oficina') { ?>
  <?php } 

?>




