<?php
$fields = get_fields();
?>

<style>
  .home__featured-bckg:before {
    background: transparent linear-gradient(180deg, <?= $fields['home_featured_bckg'] ?>00 0%, <?= $fields['home_featured_bckg'] ?> 100%) 0% 0% no-repeat padding-box;
  }
</style>

<div class="home__featured-bckg" style="background-color: <?= $fields['home_featured_bckg'] ?>">
  <div class="container">
    <div class="home__featured-items">
      <?php if (!empty($fields['repeater_featured']) && count($fields['repeater_featured'])) : ?>
        <?php foreach ($fields['repeater_featured'] as $key => $item) : ?>
          <a  href="<?= $item['repeater_featured_link'] ?>" class="home__featured-item">
            <figure>
              <img class="" src="<?= $item['repeater_featured_img'] ?>" alt="image-1" width="" height="">
            </figure>
            <h2 class="h3">
              <?= $item['repeater_featured_title'] ?>
            </h2>
          </a>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>
  </div>
</div>