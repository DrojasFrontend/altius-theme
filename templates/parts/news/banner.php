<?php 
$fields = get_fields();
?>
  <div class="news__banner-bckg" style="background-image: url(<?= $fields['news_banner'] ?>)">
    <div class="container">
      <div class="news__banner-copy">
        <h1 class="h1" id="letter-animation"><?= the_title(); ?></h1>
      </div>
    </div>
  </div>