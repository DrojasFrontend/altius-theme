<?php
$fields = get_fields();
?>
<div class="swiper-hero">
  <div class="home__hero-center">
    <div class="home__hero-copy">
      <div>
        <h1 class="h1" data-text-left-right><?= $fields['home_hero_title'] ?></h1>
        <div class="swiper-pagination"></div>
        <p><?= $fields['home_hero_cta'] ?></p>
        <?php get_template_part('templates/parts/icons/line-animate'); ?>
      </div>
      <div>Form</div>
    </div>
  </div>
  <div class="swiper-wrapper">
    <?php if (!empty($fields['repeater_hero_swiper']) && count($fields['repeater_hero_swiper'])) : ?>
      <?php foreach ($fields['repeater_hero_swiper'] as $key => $item) : ?>
        <div class="swiper-slide">
          <figure>
            <img class="" src="<?= $item['repeater_swiper_img'] ?>" alt="image-1" width="" height="">
          </figure>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>