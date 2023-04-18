<?php
$fields = get_fields();
?>
<div class="swiper-hero">
  <div class="home__hero-center">
    <div class="home__hero-copy">
      <div>
        <h1 class="h1" data-text-left-right><?= $fields['home_hero_title'] ?></h1>
        <div class="swiper-pagination"></div>
        <p><?= $fields['home_hero_cta'] ?></p>
        <?php get_template_part('templates/parts/icons/line-animate'); ?>
      </div>
      <div class="filter">
        <div class="filter__position">
          <?php echo do_shortcode('[searchandfilter id="591"]'); ?>
        </div>
      </div>
      <!-- <div class="filter">
        <div class="filter__position">
          <ul>
            <li class="menu">
              <h4>Tipo</h4>
              <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Apartamento</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Apartamento</li>
                  <li><span></span> Oficina</li>
                  <li><span></span> Local Comercial</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
            <li class="menu">
              <h4>Ciudad</h4>
                <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Montevideo</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Montevideo</li>
                  <li><span></span> Punta del Este</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
            <li class="menu">
              <h4>Barrio</h4>
              <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Buceo</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Buceo</li>
                  <li><span></span> Carrasco</li>
                  <li><span></span> Cordón</li>
                  <li><span></span> Goes</li>
                  <li><span></span> Centro</li>
                  <li><span></span> La Blanquedad</li>
                  <li><span></span> Malvín</li>
                  <li><span></span> Pocitos</li>
                  <li><span></span> Punta Carretas</li>
                  <li><span></span> Prado</li>
                  <li><span></span> Tres Cruces</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
            <li class="menu">
              <h4>Condición</h4>
              <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Lanzamiento</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Lanzamiento</li>
                  <li><span></span> En obra</li>
                  <li><span></span> Entrega inmediata</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
            
            <li class="menu">
              <h4>Dormitorios</h4>
              <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Monoambiente</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Monoambiente</li>
                  <li><span></span> 1 Dormitorio</li>
                  <li><span></span> 2 Dormitorios</li>
                  <li><span></span> 3 Dormitorios</li>
                  <li><span></span> 4 Dormitorios</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
            <li class="menu">
              <h4>Proyecto</h4>
              <img class="" src="<?= IMG_BASE; ?>icons/icon-chevron-down.png" alt="" width="" height="" loading="lazy">
              <div class="result">Nostrum Bay</div>
              <ul class="submenu">
                <div class="submenu-bckg">
                  <li><span></span> Nostrum Bay</li>
                  <li><span></span> Nostrum Central</li>
                  <li><span></span> Nostrum Cordón</li>
                  <li><span></span> Nostrum Plaza 2</li>
                  <li><span></span> Nostrum Malvin</li>
                </div>
                <div class="actions">
                <button>× Vaciar</button>
                <button> Aceptar</button>
                </div>
              </ul>
            </li>
          </ul>
          <h4 style="margin-top: 1rem">ENTORNO DE PRECIO</h4>
          <ul class="range">
            <li><span>USD 80K</span></li>
            <li><span>USD 3M</span></li>
          </ul>

          <button class="view">VER RESULTADOS</button>
        </div>
      </div> -->
    </div>
  </div>
  <div class="swiper-wrapper">
    <?php if (!empty($fields['repeater_hero_swiper']) && count($fields['repeater_hero_swiper'])) : ?>
      <?php foreach ($fields['repeater_hero_swiper'] as $key => $item) : ?>
        <div class="swiper-slide">
          <figure>
            <img class="" src="<?= $item['repeater_swiper_img'] ?>" alt="image-1" width="" height="">
          </figure>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</div>