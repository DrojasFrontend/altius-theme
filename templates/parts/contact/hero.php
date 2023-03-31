<?php
  $fields = get_fields();
?>
<style>
  .contact__hero::before {
    background: #000000a6;
  }
</style>
<div class="contact__hero" style="background-image: url(<?= $fields['contact_hero'] ?>)">
  <div class="container">
    <div class="contact__hero-copy">
      <h1 class="h1"><?= $fields['contact_title'] ?></h1>
    </div>
  </div>
</div>