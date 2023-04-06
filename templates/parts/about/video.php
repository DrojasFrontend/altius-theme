<?php
$fields = get_fields();
?>
<div class="about__hero">
  <div class="about__hero-video">
    <video autoplay muted>
      <source src="<?= $fields['about_video']; ?>" type="video/mp4">
      <p>Tu navegador no soporta la etiqueta de video.</p>
    </video>
  </div>
</div>