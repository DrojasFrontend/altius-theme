
<?php 
  $fields = get_fields();
?>
<style>
  .apartment__copy-bckg:before {
    background: transparent linear-gradient(180deg, <?= $fields['apartment_detail_bckg'] ?>00 0%, <?= $fields['apartment_detail_bckg'] ?> 100%) 0% 0% no-repeat padding-box;
  }
</style>
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