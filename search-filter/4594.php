<?php if ( $query->have_posts() ) { ?>
  <?php while ($query->have_posts()) { $query->the_post(); ?>
    <prev>
    <?php 
    the_title();
    ?>
    </prev>
    <?php } ?>
    <?php } else { ?>
    <h2 class="h3">No se han encontrado resultados</h2>
<?php } ?>