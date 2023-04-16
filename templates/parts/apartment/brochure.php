<?php 
$fields = get_fields();
?>
<div class="apartment__brochure-bckg" style="background-image: url('<?= $fields['apartment_brochure_bckg'] ?>')">
  <div class="container">
    <div class="apartment__brochure-wrapper">
      <a href="<?= $fields['apartment_brochure_link'] ?>" target="_blank" aria-label="download brochure">
        <img class="" src="<?= IMG_BASE; ?>icons/icon-brochure.svg" alt="prev" width="" height="" loading="lazy">
        <?= $fields['apartment_brochure_text'] ?>
      </a>
    </div>
  </div>
</div>
