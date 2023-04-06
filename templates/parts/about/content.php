<?php
  $fields = get_fields();
?>

<style>
  .about__content-bckg:before {
    background: transparent linear-gradient(180deg, <?= $fields['about_bckg']; ?>00 0%, <?= $fields['about_bckg']; ?> 100%) 0% 0% no-repeat padding-box;
  }
</style>

<div class="about__content-bckg" style="background-color: <?= $fields['about_bckg']; ?>">
  <div class="container">
    <div class="about__content-wrapper">
      <h2>
      <?= $fields['about_title']; ?>
      </h2>
      <p class="text">
        <?= $fields['about_copy']; ?>
      </p>
    </div>
  </div>
</div>