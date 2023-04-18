<?php
$fields = get_fields();
?>
<div class="about__hero">
  <div class="about__hero-video">
    <video controls width="100%" autoplay loop class="video">
      <source src="<?= $fields['about_video']; ?>" type="video/mp4">
      <p>Tu navegador no soporta la etiqueta de video.</p>
    </video>
  </div>
</div>

<script>
  var promise = document.querySelector('video').play();

  if (promise !== undefined) {
    promise.then(_ => {
      document.querySelector('video').autoplay = true;
document.querySelector('video').play();
    }).catch(error => {
    });
  }
</script>