<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Altius_Theme
 * @since Altius Theme 1.0
 */

 $option_fields = get_fields( 'page_footer' );
?>
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->

	

	<?php 
		if(is_front_page() || is_home()) { ?>
			<style>
				.footer::before {
					background: #f0000075;
				}

				.footer .h3 {
					color: #ffffff;
				}
			</style>

		<?php }
	?>
	<footer class="footer" style="background-image: url(<?= $option_fields['footer_bckg']['url'] ?>">
		<div class="container">
			<div class="footer__wrapper">
				<div class="footer__bottom">
					<div class="footer__bottom-wrapper">
						<div class="footer__bottom-left">
							<h3 class="h3">Menú</h3>
							<?php get_template_part( 'templates/parts/footer/nav' ); ?>
						</div>
						<div class="footer__bottom-center">
							<!-- <?php if ( is_active_sidebar( 'footer_widget' ) ) : ?>
								<?php dynamic_sidebar( 'footer_widget' ); ?>
							<?php endif; ?> -->
							<div class="footer__bottom-copy">
								<?php if ( is_active_sidebar( 'footer_widget_3' ) ) : ?>
									<?php dynamic_sidebar( 'footer_widget_3' ); ?>
								<?php endif; ?>
							</div>
						</div>
						<div class="footer__bottom-right">
							<?php if ( is_active_sidebar( 'footer_widget_2' ) ) : ?>
								<?php dynamic_sidebar( 'footer_widget_2' ); ?>
							<?php endif; ?>
							<div class="footer__bottom-contact">
								<h3 class="h3">
									Contacto
								</h3>
								<?php foreach ($option_fields['repeater_contact'] as $key => $item) : ?>
									<a href="<?= $item['repeater_contact_link']; ?>" target="blank">
										<img src="<?= $item['repeater_contact_icon']; ?>" alt="<?= $item['repeater_contact_text']; ?>">
										<?= $item['repeater_contact_text']; ?>
									</a>
								<?php endforeach; ?>

								<div class="footer__bottom-social">
									<?php foreach ($option_fields['repeater_social'] as $key => $item) : ?>
										<a href="<?= $item['repeater_social_link']; ?>" target="blank">
											<img src="<?= $item['repeater_social_icon']; ?>" alt="Social">
										</a>
									<?php endforeach; ?>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="footer__bottom-legal">
				<?php if ( is_active_sidebar( 'footer_widget_4' ) ) : ?>
					<?php dynamic_sidebar( 'footer_widget_4' ); ?>
				<?php endif; ?>
			</div>
		</div>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
