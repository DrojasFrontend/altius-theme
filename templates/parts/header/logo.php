<?php
$option_fields = get_fields( 'page_header' );
?>
<?php if ( has_custom_logo() ) : ?>
	<div class="logo">
		<?php the_custom_logo(); ?>
		<a href="/" class="logo-red">
			<img src="<?= $option_fields['logo_red'] ?>" alt="">
		</a>
		<a href="/" class="logo-white">
			<img src="<?= $option_fields['logo_black'] ?>" alt="">
		</a>
	</div>
<?php endif; ?>