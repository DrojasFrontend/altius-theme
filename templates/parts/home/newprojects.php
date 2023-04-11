<?php
$fields = get_fields();
?>
<div style="background-color:<?= $fields['home_slide_bckg'] ?>">
  <h2 style="color: <?= $fields['home_slide_color'] ?>" class="h2"><?= $fields['home_slide_title'] ?></h2>
  <div class="swiper">
    <div class="swiper-wrapper">
      <?php if (!empty($fields['home_repeater_slides']) && count($fields['home_repeater_slides'])) : ?>
        <?php foreach ($fields['home_repeater_slides'] as $key => $item) : ?>
          <a href="<?= $item['home_repeater_slides_link'] ?>" class="swiper-slide">
            <figure>
              <img class="home__newprojects-img" class="" src="<?= $item['home_repeater_slides_img'] ?>" alt="slide-<?= $key ?>" width="" height="" loading="lazy">
            </figure>
            <figcaption class="home__newprojects-icon">
              <img src="<?= $item['home_repeater_slides_icon'] ?>" alt="" width="" height="" loading="lazy">
            </figcaption>
          </a>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
    <div class="swiper-pagination"></div>
  </div>
  <div class="home__newprojects-actions">
    <button type="button" class="swiper-button-prev" aria-label="prev slide">
      <img class="" src="<?= IMG_BASE; ?>icons/icon-prev.svg" alt="image-1" width="" height="" loading="lazy">
    </button>
    <button type="button" class="swiper-button-next" aria-label="next slide">
      <img class="" src="<?= IMG_BASE; ?>icons/icon-next.svg" alt="image-1" width="" height="" loading="lazy">
    </button>
  </div>
</div>