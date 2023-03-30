<?php
class MainNavWalker extends Walker_Nav_Menu {
  function display_element($item, &$children_elements, $max_depth, $depth, $args, &$output) {
    if ($max_depth == 0) { ?>
      <div class="menu__item">
        <a class="menu__item-link" href="<?php echo $item->url; ?>">
          <?php echo $item->title ?>
          <!-- <?php if (isset($children_elements[$item->ID])) { ?>
            <svg class="navbar__arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-right"></use>
            </svg>
          <?php } ?> -->
        </a>
        <?php if (isset($children_elements[$item->ID])) { ?>
          <div class="submenu" role="tabpanel" aria-labelledby="<?php echo $item->title; ?>">
            <?php foreach ($children_elements[$item->ID] as $key => $child) { ?>
              <div class="submenu__item-link">
                <a href="<?php echo $child->url; ?>"><?php echo $child->title; ?></a>
                <?php if (isset($children_elements[$child->ID])) { ?>
                  <img class="navbar__arrow" src="<?= IMG_BASE; ?>icons/icon-chevron-right.png" alt="" width="" height="" loading="lazy">
                  <div class="submenu-submenu" role="tabpanel" aria-labelledby="<?php echo $child->title; ?>">
                    <?php foreach ($children_elements[$child->ID] as $key => $grandchild) { ?>
                      <div class="submenu-submenu__item-link">
                        <a aria-label="<?php echo $grandchild->title; ?>" href="<?php echo $grandchild->url; ?>"><?php echo $grandchild->title; ?></a>
                        <?php if (isset($children_elements[$grandchild->ID])) { ?>
                          <img class="navbar__arrow" src="<?= IMG_BASE; ?>icons/icon-chevron-right.png" alt="" width="" height="" loading="lazy">
                          <div class="submenu-submenu-submenu<?php if($grandchild->title == '100% vendidos'): echo " more-row"; endif; ?>" role="tabpanel" aria-labelledby="<?php echo $grandchild->title; ?>">
                            <?php foreach ($children_elements[$grandchild->ID] as $greatgrandchild) { ?>
                              <div class="submenu-submenu-submenu__item-link">
                                <a aria-label="<?php echo $greatgrandchild->title; ?>" href="<?php echo $greatgrandchild->url; ?>"><?php echo $greatgrandchild->title; ?></a>
                              </div>
                            <?php } ?>
                          </div>
                        <?php } ?>
                      </div>
                    <?php } ?>
                  </div>
                <?php } ?>
              </div>
            <?php } ?>
          </div>
        <?php } ?>
      </div>
    <?php }
  }
}
?>


<div class="menu">
  <div class="menu__wrapper">
    <?php
      wp_nav_menu([
        'theme_location' => 'main-menu',
        'container_class' => '',
        'menu_class' => '',
        'walker' => new MainNavWalker()
      ]);
    ?>
  </div>
</div>
