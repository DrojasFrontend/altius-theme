<div class="swiper-top swiper">
  <?php 
  $media = get_field('apartment_galery_slide');
  if( $media ): ?>
    <ul class="swiper-wrapper">
      <?php foreach( $media as $item ): ?>
        <li class="swiper-slide">
          <?php if ($item['type'] == 'image') : ?>
            <img src="<?php echo esc_url($item['sizes']['large']); ?>" alt="<?php echo esc_attr($item['alt']); ?>" />
          <?php elseif ($item['type'] == 'video') : ?>
            <video controls id="myVideo">
              <source src="<?php echo esc_url($item['url']); ?>" type="<?php echo esc_attr($item['mime_type']); ?>">
            </video>
            <button class="play play-video-gallery" type="button" aria-label="play">
              <img class="" src="<?= IMG_BASE; ?>icons/icon-play-big.svg" alt="prev" width="" height="" loading="lazy">
            </button>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>
</div>

<div class="apartment__gallery-shadow">
  <div class="apartment__gallery-bottom">
    <div class="apartment__gallery-wrapper">
      <div class="swiper-bottom swiper">
        <?php 
        $media = get_field('apartment_galery_slide');
        if( $media ): ?>
          <ul class="swiper-wrapper">
            <?php foreach( $media as $item ): ?>
              <li class="swiper-slide">
                <?php if ($item['type'] == 'image') : ?>
                  <img src="<?php echo esc_url($item['sizes']['medium']); ?>" alt="<?php echo esc_attr($item['alt']); ?>" />
                <?php elseif ($item['type'] == 'video') : ?>
                  <div class="video">
                    <img class="play" class="" src="<?= IMG_BASE; ?>icons/icon-play-big.svg" alt="prev" width="" height="" loading="lazy">
                  </div>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    </div>
    <div class="apartment__gallery-actions">
      <button type="button" class="swiper-button-prev" aria-label="prev slide">
        <img class="" src="<?= IMG_BASE; ?>icon-prev-ligh.png" alt="prev" width="" height="" loading="lazy">
      </button>
      <button type="button" class="swiper-button-next" aria-label="next slide">
        <img class="" src="<?= IMG_BASE; ?>icon-next-ligh.png" alt="next" width="" height="" loading="lazy">
      </button>
    </div>
  </div>
</div>