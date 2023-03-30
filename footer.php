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

?>
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->

	

	<style>
		.footer::before {
			background: #000000a6;
		}
	</style>
	<footer class="footer" style="background-image: url(<?= IMG_BASE; ?>1440x600@2x.png)">
		<div class="container">
			<div class="footer__wrapper">
				<div class="footer__top">
					<h3 class="h3">Sobre nosotros</h3>
					<p class="text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, magnam fugit. Molestiae vel id quod, nostrum in ipsa saepe. Assumenda libero aliquam, quasi perferendis magni repellat! Cupiditate in hic asperiores!
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, magnam fugit. Molestiae vel id quod, nostrum in ipsa saepe. Assumenda libero aliquam, quasi perferendis magni repellat! Cupiditate in hic asperiores!
					</p>
				</div>
				<div class="footer__bottom">
					<div class="footer__bottom-wrapper">
						<div class="footer__bottom-left">
							<h3 class="h3">Menú</h3>
							<?php get_template_part( 'templates/parts/footer/nav' ); ?>
						</div>
						<div class="footer__bottom-center">
							<?php if ( is_active_sidebar( 'footer_widget' ) ) : ?>
								<?php dynamic_sidebar( 'footer_widget' ); ?>
							<?php endif; ?>
						</div>
						<div class="footer__bottom-right">
							<?php if ( is_active_sidebar( 'footer_widget_2' ) ) : ?>
								<?php dynamic_sidebar( 'footer_widget_2' ); ?>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</div>
			<div class="footer__bottom-copy">
				<?php if ( is_active_sidebar( 'footer_widget_3' ) ) : ?>
					<?php dynamic_sidebar( 'footer_widget_3' ); ?>
				<?php endif; ?>
			</div>
		</div>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
