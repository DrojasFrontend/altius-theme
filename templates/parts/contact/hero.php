<?php
  $fields = get_fields();
?>
<div class="contact__hero-bckg" style="background-image: url(<?= $fields['contact_hero'] ?>)">
  <div class="container">
    <div class="contact__hero-copy">
      <h1 class="h1" id="letter-animation"><?= $fields['contact_title'] ?></h1>
    </div>
  </div>
</div>