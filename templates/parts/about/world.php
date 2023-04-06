<?php
  $fields = get_fields();
?>
<div class="about__world-bckg" style="background-color: <?= $fields['about_world_bckg']; ?>">
  <div class="about__world-wrapper">
    <?php if (!empty($fields['about_world_repeater']) && count($fields['about_world_repeater'])) : ?>
      <?php foreach ($fields['about_world_repeater'] as $key => $item) : ?>
        <figure>
          <img class="" src="<?= $item['about_world_repeater_img'] ?>" alt="" width="" height="" loading="lazy">
          <?php if($key == 1) { ?>
            <h2 class="h2">
              <?= $fields['about_world_title']; ?>
            </h2>
          <?php } ?>
        </figure>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>