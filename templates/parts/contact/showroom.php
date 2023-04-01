<?php
  $fields = get_fields();
?>
<div class="contact__showroom-bckg" style="background-image: url(<?= $fields['showroom_bckg'] ?>)">
  <div class="contact__showroom-gallery">
    <img class="contact__showroom-gallery-1" src="<?= $fields['showroom_imagen_1']?>" alt="" width="" height="" loading="lazy">
    <img class="contact__showroom-gallery-3" src="<?= $fields['showroom_imagen_3']?>" alt="" width="" height="" loading="lazy">
    <img class="contact__showroom-gallery-2" src="<?= $fields['showroom_imagen_2']?>" alt="" width="" height="" loading="lazy">
    <img class="contact__showroom-gallery-4" src="<?= $fields['showroom_imagen_4']?>" alt="" width="" height="" loading="lazy">
  </div>
  <div class="container">
    <div class="contact__showroom-copy">
      <h2 class="h2">
        <?= $fields['showroom_left'] ?>
      </h2>
      <div class="contact__showroom-copy-right">
        <?= $fields['showroom_right'] ?>
      </div>
    </div>
    <div class="contact__showroom-bottom">
      <div>
        <?= $fields['showroom_bottom_left'] ?>
      </div>
      <div>
        <?= $fields['showroom_bottom_right'] ?>
      </div>
    </div>

  </div>
</div>