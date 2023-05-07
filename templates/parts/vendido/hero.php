
<?php 
  $fields = get_fields();
?>
<div class="vendido__hero-bckg" style="background-image: url('<?= $fields['vendido_hero_image']; ?>')">
  <div class="vendido__hero-wrapper">
    <div class="vendido__hero-logo">
      <img src="<?= $fields['vendido_hero_logo'] ?>" alt="" width="" height="" loading="lazy">
    </div>
    <!-- <div class="filter">
      <div class="filter__position">
        <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
      </div>
    </div> -->
  </div>
</div>