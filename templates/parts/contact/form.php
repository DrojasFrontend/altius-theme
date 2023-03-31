<?php
  $fields = get_fields();
?>

<style>
  .contact__form-bckg:before {
    background: transparent linear-gradient(180deg, <?= $fields['contact_form_bckg'] ?>00 0%, <?= $fields['contact_form_bckg'] ?> 100%) 0% 0% no-repeat padding-box;
  }
</style>

<div class="contact__form-bckg" style="background-color: <?= $fields['contact_form_bckg'] ?>">
  <div class="container">
    <div class="contact__form-wrapper">
      <div class="contact__form-socials">
        <?php if (!empty($fields['repeater_phone']) && count($fields['repeater_phone'])) : ?>
          <?php foreach ($fields['repeater_phone'] as $key => $item) : ?>
            <div class="contact__form-social">
              <img class="" src="<?= $item['repeater_phone_icon'] ?>" alt="" width="" height="" loading="lazy">
              <a href="#" class="number" style="color: <?= $fields['contact_form_color'] ?>"><?= $item['repeater_phone_number'] ?></a>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>
        <div class="contact__form-hours" style="color: <?= $fields['contact_form_color'] ?>"><?= $fields['contact_form_hour'] ?></div>
      </div>
      <div>
        <?php echo do_shortcode('[contact-form-7 id="82" title="Formulario de Contacto"]'); ?>
      </div>
    </div>
  </div>
</div>