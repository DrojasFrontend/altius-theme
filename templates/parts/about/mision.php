<?php
  $fields = get_fields();
?>
<div class="about__mision-bckg" style="background-color: <?= $fields['about_mision_bckg']; ?>">
  <div class="about__mision-wrapper">
    <div class="about__mision-img" style="background-image: url(<?= $fields['about_mision_image']; ?>)">
      <h2 class="h2">
        <?= $fields['about_mision_title']; ?>
      </h2>
      <h3 class="h5">
        <?= $fields['about_mision_copy']; ?>
      </h3>
    </div>
    <ul>
      <?php if (!empty($fields['about_mision_repeater_icons']) && count($fields['about_mision_repeater_icons'])) : ?>
        <?php foreach ($fields['about_mision_repeater_icons'] as $key => $item) : ?>
          <li>
            <img class="" src="<?= $item['about_mision_repeater_icon'] ?>" alt="" width="" height="" loading="lazy">
            <p class="text">
              <?= $item['about_mision_repeater_name'] ?>
            </p>
          </li>
        <?php endforeach; ?>
      <?php endif; ?>
    </ul>
  </div>
</div>