
<?php 
  $fields = get_fields();
  $amenities = $fields['apartment_amenities'];

?>
<div class="apartment__amenities-bckg" style="background-color: <?= $fields['apartment_amenities_bckg']; ?>">
  <div class="apartment__amenities-wrapper">
    <div>
      <div class="apartment__amenities-title">
        <h2 class="h2">AMENITIES</h2>
      </div>
      <div class="apartment__amenities-items">
        <?php
          if ($amenities) :
            foreach ($amenities as $post) : setup_postdata($post); ?>
              <div class="apartment__amenities-item">
                <?php if (has_post_thumbnail()) { ?>
                  <?= get_the_post_thumbnail($post->ID); ?>
                <?php } ?>
                <p class="text"> <?= the_title(); ?></p>
              </div>
            <?php endforeach;
            wp_reset_postdata();
          endif;
        ?>
      </div>
    </div>
    <figure>
      <img src="<?= $fields['apartment_amenities_img'] ?>" alt="" width="" height="" loading="lazy">
    </figure>
  </div>
</div>