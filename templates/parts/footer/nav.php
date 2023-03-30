<?php
class MainNavWalkerFooter extends Walker_Nav_Menu {
  function display_element($item, &$children_elements, $max_depth, $depth, $args, &$output) {
    if ($max_depth == 0) { ?>
      <div class="menu__item">
        <a class="menu__item-link" href="<?php echo $item->url; ?>">
          <?php echo $item->title ?>
        </a>
      </div>
    <?php }
  }
}
?>

<div class="menu">
  <div class="menu__wrapper">
    <?php
      wp_nav_menu([
        'theme_location' => 'main-menu-footer',
        'container_class' => '',
        'menu_class' => '',
        'walker' => new MainNavWalkerFooter()
      ]);
    ?>
  </div>
</div>
