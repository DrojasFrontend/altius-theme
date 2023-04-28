<?php
  $fields = get_fields();
?>

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