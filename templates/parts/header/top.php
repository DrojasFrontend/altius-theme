<?php
$option_fields = get_fields( 'page_header' );
?>
<div class="header__top">
  <div class="header__top-desktop"></div>
  <div class="header__top-phone">
    <a href="tel:<?= $option_fields['header_phone'] ?>">
      <img class="" src="<?= IMG_BASE; ?>icons/icon-phone.svg" alt="" width="" height="" loading="lazy">
      <?= $option_fields['header_phone'] ?>
    </a>
  </div>
  <div class="header__top-social">
    <a href="<?= $option_fields['social_facebook_link'] ?>" target="blank" aria-label="facebook">
      <img class="" src="<?= $option_fields['social_facebook_icon'] ?>" alt="" width="12" height="24" loading="lazy">
    </a>  
    <a href="<?= $option_fields['social_instagram_link'] ?>" target="blank" aria-label="instagram">
      <img class="" src="<?= $option_fields['social_instagram_icon'] ?>" alt="" width="25" height="25" loading="lazy">
    </a>  
    <a href="<?= $option_fields['social_youtube_link'] ?>" target="blank" aria-label="youtube">
      <img class="" src="<?= $option_fields['social_youtube_icon'] ?>" alt="" width="27" height="19" loading="lazy">
    </a>  
    <a href="mailto:<?= $option_fields['social_email_link'] ?>" target="blank" aria-label="email">
      <img class="" src="<?= $option_fields['social_email_icon'] ?>" alt="" width="30" height="21" loading="lazy">
    </a>  
  </div>
</div>