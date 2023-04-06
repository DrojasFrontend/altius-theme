<?php
$fields = get_fields();
?>
<div class="about__counter-bckg" style="background-image: url(<?= $fields['about_counter_bckg'] ?>)">
  <div class="container">
    <div class="about__counter-items">
      <?php if (!empty($fields['about_repeater_counter']) && count($fields['about_repeater_counter'])) : ?>
        <?php foreach ($fields['about_repeater_counter'] as $key => $item) : ?>
          <div class="about__counter-item">
            <img class="" src="<?= $item['about_repeater_couner_icon'] ?>" alt="" width="" height="" loading="lazy">
            <div class="number">
              +<span class="count"><?= $item['about_repeater_couner_number'] ?></span>
            </div>
            <p><?= $item['about_repeater_couner_detail'] ?></p>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</div>