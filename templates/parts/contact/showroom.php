<?php
  $fields = get_fields();
?>
<div class="contact__showroom-bckg" style="background-image: url(<?= $fields['showroom_bckg'] ?>)">
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