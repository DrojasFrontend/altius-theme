<?php 
$bckg = get_field('color_header');
if (is_page('nosotros')) { ?>
  <style>
    .black {
      background: #292929;
    }
  </style>
<?php } ?>

<div class="header__wrapper">
  <?php get_template_part('templates/parts/header/top'); ?>
  <div class="header__bottom black">
   <div class="header__bottom-wrapper">
      <?php get_template_part('templates/parts/header/logo'); ?>
      <?php get_template_part('templates/parts/header/nav'); ?>
   </div>
 </div>
</div>