<?php
  $fields = get_fields();
?>
<div class="about__banner-bckg" style="background-image: url(<?= $fields['about_banner']; ?>)">
  <div class="about__banner-wrapper">
    <div class="about__banner-overlay">
      <span style="background-color: <?= $fields['about_banner_bckg']; ?>"></span>
      <h2 class="h2">
        Desde 2008 venimos construyendo historia
      </h2>
    </div>
  </div>
</div>