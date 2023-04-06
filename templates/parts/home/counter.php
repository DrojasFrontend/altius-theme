<?php
$fields = get_fields();
?>
<div class="home__counter-bckg" style="background-image: url(<?= $fields['home_counter_bckg'] ?>)">
  <div class="container">
    <div class="home__counter-items">
      <?php if (!empty($fields['home_repeater_counter']) && count($fields['home_repeater_counter'])) : ?>
        <?php foreach ($fields['home_repeater_counter'] as $key => $item) : ?>
          <div class="home__counter-item">
            <img class="" src="<?= $item['home_repeater_couner_icon'] ?>" alt="" width="" height="" loading="lazy">
            <div class="number">
              +<span class="count"><?= $item['home_repeater_counter_number'] ?></span>
            </div>
            <p><?= $item['home_repeater_counter_detail'] ?></p>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</div>