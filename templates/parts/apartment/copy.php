
<?php 
  $fields = get_fields();
?>
<div class="apartment__copy-bckg" style="background-color: <?= $fields['apartment_detail_bckg'] ?>">
  <div class="apartment__copy-wrapper">
    <figure>
      <img src="<?= $fields['apartment_detail_image'] ?>" alt="" width="" height="" loading="lazy">
    </figure>
    <div class="apartment__copy-copy text" style="color: <?= $fields['apartment_detail_color']; ?>">
      <?= $fields['apartment_detail']; ?>
    </div>
  </div>
</div>