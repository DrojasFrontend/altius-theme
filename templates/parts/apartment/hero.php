
<?php 
  $fields = get_fields();
?>
<div class="apartment__hero-bckg" style="background-image: url('<?= $fields['apartment_hero_image']; ?>')">
  <div class="apartment__hero-wrapper">
    <div class="apartment__hero-logo">
      <img src="<?= $fields['apartment_hero_logo'] ?>" alt="" width="" height="" loading="lazy">
    </div>
    <div class="filter">
      <div class="filter__position">
        <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
      </div>
    </div>
  </div>
</div>