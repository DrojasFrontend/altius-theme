
<?php 
  $fields = get_fields();
?>
<div class="vendido__copy-bckg" style="background-color: <?= $fields['vendido_detail_bckg'] ?>">
  <div class="vendido__copy-wrapper">
    <!-- <figure>
      <img src="<?= $fields['vendido_detail_image'] ?>" alt="" width="" height="" loading="lazy">
    </figure> -->
    <div class="vendido__copy-copy text" style="color: <?= $fields['vendido_detail_color']; ?>">
      <?= $fields['vendido_detail']; ?>
    </div>
  </div>
</div>