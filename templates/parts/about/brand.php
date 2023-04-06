<?php
  $fields = get_fields();
?>
<div class="about__brand-bckg" style="background-color: <?= $fields['about_brand_bckg']; ?>">
  <h2 class="h2"><?= $fields['about_brand_title']; ?></h2>
  <div class="about__brand-wrapper">
    <?php if (!empty($fields['about_brand_repeater']) && count($fields['about_brand_repeater'])) : ?>
      <?php foreach ($fields['about_brand_repeater'] as $key => $item) : ?>
        <a class="about__brand-item" href="<?= $item['about_brand_repeater_link'] ?>">
          <figure>
            <img src="<?= $item['about_brand_repeater_img'] ?>" alt="" width="" height="" loading="lazy">
          </figure>
          <figcaption>
            <img class="about__brand-icon" src="<?= $item['about_brand_repeater_icon'] ?>" alt="" width="" height="" loading="lazy">
          </figcaption>
        </a>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>