<style>
  #map{
    width: 100%;
    height: 500px;
  }
</style>
<div id="wo-map" class="">
          <div class="map-search">
            <div class="search-options">
              <form>
                <div class="check-ops">
                  <button type="button" aria-label="walking" id="btn-caminando" class="icon-box active">
                    Caminando
                  </button>
                  <button type="button" aria-label="car" id="btn-automovil" class="">
                    Automóvil
                  </button>
                </div>
                <div class="">
                  <a id="google-map" href="#" target="_blank" style="font-size: 14px; color: #ffffff; font-weight: bolder; margin-top: 10px; text-decoration: none;">
                    <div id="btn-caminando" class="icon-box">
                      Maps
                    </div>
                  </a>
                </div>
                <div class="">
                  <a id="waze-map" href="#" target="_blank" style="font-size: 14px; color: #ffffff; font-weight: bolder; margin-top: 10px; text-decoration: none;">
                    <div id="btn-automovil" class="icon-box">
                      Waze
                    </div>
                  </a>
                </div>
                <div class="">
                  <div class="">
                    <div>
                      <input type="text" class="form-control" id="places-input" placeholder="Elegí tu punto de partida">
                    </div>
                    <select style="cursor: pointer;" name="Tipos" class="" id="select-showrooms">
                      <option selected value="todos">Todos</option>
                      <option value="Showroom Bilú Riviera">Bilú Riviera</option>
                      <option value="More Echevarriarza">More Echevarriarza</option>
                      <option value="Showroom Nostrum Bay">Altos del Libertador</option>
                      <option value="Showroom Nostrum Bay">Nostrum Bay</option>
                      <option value="Showroom Nostrum Central">Nostrum Central</option>
                      <option value="Showroom Nostrum Malvín">Nostrum Malvín</option>
                      <option value="Nostrum Plaza 2">Nostrum Plaza 2</option>
                      <option value="Nostrum Plaza 2">Nostrum Cordón</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div id="map" style="height: 400px; width: 100%;"></div>
          <div class="indications-box">
            <div id="indications-panel"></div>
            <div class="btn-box">
            <button id="close-indications">Cerrar Panel</button>
            </div>
          </div>
        </div>