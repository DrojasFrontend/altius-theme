function initMap() {
  $(document).ready(function () {
    if ($(window).width() < 480 || isMobile) {
      initMap(true, actual_project, true, my_projects);
    } else {
      initMap(false, actual_project, true, my_projects);
    }
    $(window).resize(function () {
      if (document_width != $(document).width() || document_height != $(document).height()) {
        document_width = $(document).width();
        document_height = $(document).height();
        if ($(window).width() < 480 || isMobile) {
          initMap(true, actual_project, true, my_projects);
        } else {
          initMap(false, actual_project, true, my_projects);
        }
      }
    });
  });
  
  var markers = [];
  var all_markers = [];
  var infoWindowContent = [];
  var directionsService;
  var directionsDisplay;
  let travelMode = "WALKING";
  var myLatLng;
  var latit;
  var longit;
  let global_pos;
  var map;
  let is_mob;
  let data_showrooms = [];
  var projects = [];
  
  function pinSymbol(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 0,
          scale: 1
      };
  }
  
  function setMarkers(is_mobile, is_project, init) {
      is_mob = is_mobile;
      data_showrooms = [];
  
      let arr = [];
      for (let key in projects) {
          arr.push(projects[key]);
      }
  
      projects = arr
      projects.forEach((p) => {
          let exist_showroom = data_showrooms.find((d) => {
              if (p.showrooms != null && d != null && d.name == p.showrooms.name) {
                  return true;
              } else {
                  return false;
              }
          });
          if (!exist_showroom) {
              if (p.showrooms != null) {
                  data_showrooms.push(p);
              }
          }
      });
  
      let data;
      is_project ? data = showroom_project : data = data_showrooms;
      markers = [];
      infoWindowContent = [];
      if (is_project && showroom != null) {
          let init_markers = false;
          if (is_project && is_project[0].showrooms != null) {
              init_markers = true;
          }
          let coords = showroom;
          let bool = showroom != null ? true : false;
          markers.push([coords.name, parseFloat(coords.lat), parseFloat(coords.lng), showroom.id]);
          let img = '';
          if (coords.medias.length > 0 && bool) {
              img = coords.medias[0].thumb;
              if (!is_mobile) {
                  infoWindowContent.push([
                      '<div style="padding: 10px 15px;" class="info_content container">' +
                      '<div class="row">' +
                      '<div class="col-12">' +
                      '<a href="' + showroom.full_url + '">' +
                      '<h3 style="font-size: 19px;" class="wo-map-title-showroom">' + coords.name + '</h3>' +
                      '</a>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row">' +
                      '<div class="col-4">' +
                      '<div style="height: 100px;">' +
                      '<a href="' + showroom.full_url + '">' +
                      '<img style="width: 100%; height: 100%; object-fit: scale-down;" src="' + img + '">' +
                      '</a>' +
                      '</div>' +
                      '</div>' +
                      '<div class="col-8">' +
                      '<div style="display: flex; flex-direction: column; justify-content:center; height: 100%;">' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span>' +
                      '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;<strong>DirecciÃ³n:</strong> ' + coords.direccion + '</span>' +
                      '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>'
                  ]);
              } else {
                  infoWindowContent.push([
                      '<div style="padding: 10px 15px;" class="info_content container-fluid" style="font-size: 12px;">' +
                      '<div class="row">' +
                      '<div class="col-12">' +
                      '<a href="' + showroom.full_url + '">' +
                      '<h3 class="wo-map-title-showroom" style="font-size: 19px;">' + coords.name + '</h3>' +
                      '</a>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row">' +
                      '<div class="col-12" style="">' +
                      '<div class="row">' +
                      '<div class="col-12">' +
                      '<div class="display: flex; flex-direction: column">' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span>' +
                      '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;<strong>DirecciÃ³n:</strong> ' + coords.direccion + '</span>' +
                      '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>'
                  ]);
              }
          } else if (coords.medias.length > 0 && !bool) {
              infoWindowContent.push([
                  '<div style="padding: 10px 15px;" class="info_content">' +
                  '<a href="' + coords.full_url + '">' +
                  '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                  '</a>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span>' +
                  '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                  '</span>' +
                  '</div>' +
                  '</div>'
              ]);
          } else {
              infoWindowContent.push([
                  '<div style="padding: 10px 15px;" class="info_content">' +
                  '<a href="' + coords.full_url + '">' +
                  '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                  '</a>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span>' +
                  '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                  '</span>' +
                  '</div>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                  '</div>' +
                  '<div>' +
                  '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                  '</div>' +
                  '</div>' +
                  '</div>'
              ]);
          }
  
          if (init_markers) {
              data.forEach((s) => {
                  let coords;
                  let bool;
  
                  if (is_project) {
                      if (s.showrooms && showroom && s.showrooms.lat != showroom.lat && s.showrooms.lng != showroom.lng) {
                          coords = s.showrooms != null ? s.showrooms : s;
                          bool = s.showrooms != null ? true : false;
                      } else if (!showroom) {
                          coords = s.showrooms;
                          bool = true;
                      }
                  } else {
                      coords = s.showrooms != null ? s.showrooms : s;
                      bool = s.showrooms != null ? true : false;
                  }
  
                  if (coords) {
                      markers.push([coords.name, parseFloat(coords.lat), parseFloat(coords.lng), s.id]);
                      let img = '';
                      if (coords.medias.length > 0 && bool) {
                          img = coords.medias[0].thumb;
                          if (!is_mobile) {
                              infoWindowContent.push([
                                  '<div style="padding: 10px 15px;" class="info_content container">' +
                                  '<div class="row">' +
                                  '<div class="col-12">' +
                                  '<a href="' + s.full_url + '">' +
                                  '<h3 style="font-size: 19px;" class="wo-map-title-showroom">' + coords.name + '</h3>' +
                                  '</a>' +
                                  '</div>' +
                                  '</div>' +
                                  '<div class="row">' +
                                  '<div class="col-4">' +
                                  '<div style="height: 100px;">' +
                                  '<a href="' + s.full_url + '">' +
                                  '<img style="width: 100%; height: 100%; object-fit: scale-down;" src="' + img + '">' +
                                  '</a>' +
                                  '</div>' +
                                  '</div>' +
                                  '<div class="col-8">' +
                                  '<div style="display: flex; flex-direction: column; justify-content:center; height: 100%;">' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span>' +
                                  '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;<strong>DirecciÃ³n:</strong> ' + coords.direccion + '</span>' +
                                  '</span>' +
                                  '</div>' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                                  '</div>' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>'
                              ]);
                          } else {
                              infoWindowContent.push([
                                  '<div style="padding: 10px 15px;" class="info_content container-fluid" style="font-size: 12px;">' +
                                  '<div class="row">' +
                                  '<div class="col-12">' +
                                  '<a href="' + s.full_url + '">' +
                                  '<h3 class="wo-map-title-showroom" style="font-size: 19px;">' + coords.name + '</h3>' +
                                  '</a>' +
                                  '</div>' +
                                  '</div>' +
                                  '<div class="row">' +
                                  '<div class="col-12" style="">' +
                                  '<div class="row">' +
                                  '<div class="col-12">' +
                                  '<div class="display: flex; flex-direction: column">' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span>' +
                                  '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;<strong>DirecciÃ³n:</strong> ' + coords.direccion + '</span>' +
                                  '</span>' +
                                  '</div>' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                                  '</div>' +
                                  '<div style="margin-bottom: 10px;">' +
                                  '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>' +
                                  '</div>'
                              ]);
                          }
                      } else if (coords.medias.length > 0 && !bool) {
                          infoWindowContent.push([
                              '<div style="padding: 10px 15px;" class="info_content">' +
                              '<a href="' + coords.full_url + '">' +
                              '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                              '</a>' +
                              '<div style="margin-bottom: 10px;">' +
                              '<span>' +
                              '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                              '</span>' +
                              '</div>' +
                              '</div>'
                          ]);
                      } else {
                          infoWindowContent.push([
                              '<div style="padding: 10px 15px;" class="info_content">' +
                              '<a href="' + coords.full_url + '">' +
                              '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                              '</a>' +
                              '<div style="margin-bottom: 10px;">' +
                              '<span>' +
                              '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                              '</span>' +
                              '</div>' +
                              '<div style="margin-bottom: 10px;">' +
                              '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                              '</div>' +
                              '<div>' +
                              '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                              '</div>' +
                              '</div>' +
                              '</div>'
                          ]);
                      }
                  }
              });
          }
      } else {
          data.forEach((s) => {
              let coords;
              let bool;
  
              if (is_project) {
                  if (s.showrooms && showroom && s.showrooms.lat != showroom.lat && s.showrooms.lng != showroom.lng) {
                      coords = s.showrooms != null ? s.showrooms : s;
                      bool = s.showrooms != null ? true : false;
                  } else if (!showroom) {
                      coords = s.showrooms;
                      bool = true;
                  }
              } else {
                  coords = s.showrooms != null ? s.showrooms : s;
                  bool = s.showrooms != null ? true : false;
              }
  
              if (coords) {
                  markers.push([coords.name, parseFloat(coords.lat), parseFloat(coords.lng), s.id]);
                  let img = '';
                  if (coords.medias.length > 0 && bool) {
                      img = coords.medias[0].thumb;
                      if (!is_mobile) {
                          infoWindowContent.push([
                              '<div style="position: relative">' +
                              '<img src="" />' +
                              '<div>' +
                              '</div>' +
                              '<a style="text-decoration: none; color: #000;" href="' + s.full_url + '">' +
                              '<p style="margin: 0" class="wo-map-title-showroom">' + coords.name + ':</p>' +
                              '</a>' +
                              '<p style="margin:0">' + coords.direccion + '</p>' +
                              '</div>'
                          ]);
                      } else {
                        infoWindowContent.push([
                          '<div style="padding: 0">' +
                          '<div class="row">' +
                          '<div class="col-12">' +
                          '<a style="text-decoration: none; color: #000;" href="' + s.full_url + '">' +
                          '<p style="margin: 0" class="wo-map-title-showroom">' + coords.name + '</p>' +
                          '</a>' +
                          '</div>' +
                          '</div>' +
                          '<div class="row">' +
                          '<div class="col-4">' +
                          '</div>' +
                          '<div class="col-8">' +
                          '<div style="display: flex; flex-direction: column; justify-content:center; height: 100%;">' +
                          '<span class="txt">' + coords.direccion + '</span>' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '</div>'
                      ]);
                      }
                  } else if (coords.medias.length > 0 && !bool) {
                      infoWindowContent.push([
                          '<div style="padding: 10px 15px;" class="info_content">' +
                          '<a href="' + coords.full_url + '">' +
                          '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                          '</a>' +
                          '<div style="margin-bottom: 10px;">' +
                          '<span>' +
                          '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                          '</span>' +
                          '</div>' +
                          '</div>'
                      ]);
                  } else {
                      infoWindowContent.push([
                          '<div style="padding: 10px 15px;" class="info_content">' +
                          '<a href="' + coords.full_url + '">' +
                          '<h3 class="wo-map-title-showroom">' + coords.name + '</h3>' +
                          '</a>' +
                          '<div style="margin-bottom: 10px;">' +
                          '<span>' +
                          '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;' + coords.direccion + '</span>' +
                          '</span>' +
                          '</div>' +
                          '<div style="margin-bottom: 10px;">' +
                          '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + coords.horarios + '</span>' +
                          '</div>' +
                          '<div>' +
                          '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + coords.telefono + '.</span>' +
                          '</div>' +
                          '</div>' +
                          '</div>'
                      ]);
                  }
              }
          });
      }
  }
  
  function setMarkerSelected(show_name) {
      let showroom = data_showrooms.find((s) => {
          if (s.showrooms != null && s.showrooms.name == show_name) {
              return s.showrooms;
          }
      });
      if (showroom.showrooms) {
          showroom = showroom.showrooms;
          markers = []
          markers.push([showroom.name, parseFloat(showroom.lat), parseFloat(showroom.lng)]);
          let img = '';
          infoWindowContent = [];
          if (showroom.medias.length > 0) {
              img = showroom.medias[0].normal;
              if (!is_mob) {
                  infoWindowContent.push([
                      '<div style="">' +
                      '<a style="text-decoration: none; color: #000;" href="' + showroom.full_url + '">' +
                      '<p style="margin: 0">' + showroom.name + ':</p>' +
                      '</a>' +
                      '<p style="margin: 0">' + showroom.direccion + '</p>' +
                      '</div>'
                  ]);
              } else {
                  infoWindowContent.push([
                      '<div style="padding: 10px 15px;" class="info_content container-fluid" style="font-size: 12px;">' +
                      '<div class="row">' +
                      '<div class="col-12">' +
                      '<a href="' + showroom.full_url + '">' +
                      '<h3 class="wo-map-title-showroom" style="font-size: 19px;">' + showroom.name + '</h3>' +
                      '</a>' +
                      '</div>' +
                      '</div>' +
                      '<div class="row">' +
                      '<div class="col-12" style="">' +
                      '<div class="row">' +
                      '<div class="col-12">' +
                      '<div class="display: flex; flex-direction: column">' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span>' +
                      '<span class="txt"><i class="fas fa-map-marker-alt"></i>&nbsp;<strong>DirecciÃ³n:</strong> ' + showroom.direccion + '</span>' +
                      '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="far fa-clock"></i>&nbsp;<strong>Horario:</strong> ' + showroom.horarios + '</span>' +
                      '</div>' +
                      '<div style="margin-bottom: 10px;">' +
                      '<span class="txt"><i class="fas fa-phone"></i>&nbsp;<strong>TelÃ©fono:</strong> ' + showroom.telefono + '.</span>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>' +
                      '</div>'
                  ]);
              }
          } else {
              infoWindowContent.push([
                  '<div style="padding: 10px 15px;" class="info_content">' +
                  '<a href="' + showroom.full_url + '">' +
                  '<h3 class="wo-map-title-showroom">' + showroom.name + '</h3>' +
                  '</a>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span>' +
                  '<i class="fas fa-map-marker-alt"></i> <span class="txt">' + showroom.direccion + '.</span>' +
                  '</span>' +
                  '</div>' +
                  '<div>' +
                  '<span>' +
                  '<i class="far fa-clock"></i> <span class="txt">' + showroom.horarios + '. TelÃ©fono: ' + showroom.telefono + '.</span>' +
                  '</span>' +
                  '</div>' +
                  '</div>'
              ]);
          }
      } else {
          markers = []
          markers.push([showroom.name, parseFloat(showroom.lat), parseFloat(showroom.lng)]);
          let img = '';
          infoWindowContent = [];
          if (showroom.medias.length > 0) {
              img = showroom.medias[0].normal;
              infoWindowContent.push([
                  '<div style="padding: 10px 15px;" class="info_content">' +
                  '<a href="' + showroom.full_url + '">' +
                  '<h3 class="wo-map-title-showroom">' + showroom.name + '</h3>' +
                  '</a>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span>' +
                  '<i class="fas fa-map-marker-alt"></i> <span class="txt">' + showroom.direccion + '</span>' +
                  '</span>' +
                  '</div>' +
                  '<div>' +
                  '<span>' +
                  '<i class="far fa-clock"></i> <span class="txt">' + showroom.horarios + '. TelÃ©fono: ' + showroom.telefono + '.</span>' +
                  '</span>' +
                  '</div>' +
                  '<a href="' + showroom.full_url + '">' +
                  '<div style="display: flex; justify-content: center; align-items: center; height: 140px; margin: 25px 0;">' +
                  '<img style="width: auto; height: 100%; object-fit: scale-down;" src="' + img + '">' +
                  '</div>' +
                  '</a>' +
                  '</div>'
              ]);
          } else {
              infoWindowContent.push([
                  '<div style="padding: 10px 15px;" class="info_content">' +
                  '<a href="' + showroom.full_url + '">' +
                  '<h3 class="wo-map-title-showroom">' + showroom.name + '</h3>' +
                  '</a>' +
                  '<div style="margin-bottom: 10px;">' +
                  '<span>' +
                  '<i class="fas fa-map-marker-alt"></i> <span class="txt">' + showroom.direccion + '.</span>' +
                  '</span>' +
                  '</div>' +
                  '<div>' +
                  '<span>' +
                  '<i class="far fa-clock"></i> <span class="txt">' + showroom.horarios + '. TelÃ©fono: ' + showroom.telefono + '.</span>' +
                  '</span>' +
                  '</div>' +
                  '</div>'
              ]);
          }
      }
  }
  
  function traceRoute(directionsService, directionsDisplay) {
      directionsService.route({
          origin: myLatLng,
          destination: {
              lat: latit,
              lng: longit
          },
          travelMode: google.maps.TravelMode[travelMode]
      }, function (response, status) {
          if (status === 'OK') {
              directionsDisplay.setDirections(response);
              setTimeout(function () {
                  $('.indications-box').removeClass('d-none');
              }, 500);
              $('.indications-box').removeClass('fade-in');
          } else {
              window.alert('Directions request failed due to ' + status);
          }
      });
  }
  
  var initial_markers = []
  
  $(document).ready(function () {
  
      $('#button-trace').click(function (e) {
          e.preventDefault();
      });
  
      $('#select-showrooms').change(function (e) {
          projects = my_projects;
          markers = all_markers;
          // data_showrooms = projects;
  
          if (e.target.value == '') {
              markers = [];
              projects = [];
              showrooms_without_projects.forEach(s => {
                  markers.push([s.name, parseFloat(s.lat), parseFloat(s.lng), s.id]);
                  projects.push({
                      showrooms:s
                  })
              })
              initMap(false, false, true, projects,false);
              return
          }
          if (typeof is_project !== 'undefined' && is_project) {
              is_project = false;
              // projects = projects_all[0];
              setMarkers(false, false, false);
              all_markers = markers;
          }
          if (e.target.value != "todos") {
              let show_name = e.target.value;
              setMarkerSelected(show_name)
              initMap(false, actual_project, false, projects, false);
          } else {
              initMap(false, actual_project, false, projects, false);
          }
      });
  
      $('#btn-automovil').click(function () {
          travelMode = "DRIVING";
          traceRoute(directionsService, directionsDisplay);
          $('#btn-automovil').addClass('active');
          $('#btn-caminando').removeClass('active');
      });
  
      $('#btn-caminando').click(function () {
          travelMode = "WALKING";
          traceRoute(directionsService, directionsDisplay);
          $('#btn-caminando').addClass('active');
          $('#btn-automovil').removeClass('active');
      });
  
      $("#btn-use-gps").click(function (e) {
          e.preventDefault();
          $('#places-input').val('')
          if (navigator.geolocation) {
              // var options = {
              //     enableHighAccuracy: true,
              //     timeout: 5000,
              //     maximumAge: 0
              // };
              //
              // function success(pos) {
              //     var crd = pos.coords;
              //
              //     console.log('Your current position is:');
              //     console.log('Latitude : ' + crd.latitude);
              //     console.log('Longitude: ' + crd.longitude);
              //     console.log('More or less ' + crd.accuracy + ' meters.');
              //     geoSuccess(pos)
              // };
              //
              // function error(err) {
              //     console.warn('ERROR(' + err.code + '): ' + err.message);
              //     geoError()
              // };
              //
              // navigator.geolocation.getCurrentPosition(success, error, options);
              // navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
              // alert("Geolocation is supported by this browser.");
          } else {
              alert("Geolocation is not supported by this browser.");
          }
      })
  });
  
  function detectBrowser() {
      var useragent = navigator.userAgent;
      var mapdiv = document.getElementById("map");
      if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
          mapdiv.style.width = '100%';
          mapdiv.style.height = '100%';
      } else {
          mapdiv.style.width = '600px';
          mapdiv.style.height = '800px';
      }
  }
  
  function geoSuccess(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
  
      myLatLng = {
          lat: latitude,
          lng: longitude
      };
  
      var mapProp = {
          zoom: 11,
          mapTypeId: 'roadmap',
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.TOP_LEFT
          },
          FullscreenControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
          }
      };
  
      map = new google.maps.Map(document.getElementById("map"), mapProp);
  
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          panel: document.getElementById('indications-panel'),
      });
  
      directionsDisplay.setMap(map);
  
      var bounds = new google.maps.LatLngBounds();
  
      var marker = new google.maps.Marker({
          position: myLatLng,
          icon: url_circle,
          map: map,
          title: 'My location'
      });
  
      let my_marker = marker;
  
      var infoWindow;
  
      if (is_mob) {
          infoWindow = new google.maps.InfoWindow({
              maxWidth: 250,
          });
      } else {
          infoWindow = new google.maps.InfoWindow({
              maxWidth: 400,
          });
      }
  
      let actual_marker;
      let markers_in = [];
      let ready = false;
  
      markers.forEach((m) => {
  
          let exists = false;
  
          markers_in.forEach((item) => {
              if (item[1] == m[1] && item[2] == m[2]) {
                  exists = true;
                  return;
              }
              exists = false;
          });
          if (exists == false) {
              markers_in.push(m);
          }
      });
  
      markers = markers_in;
      let marker_aux;
      let ready_aux = false;
      for (i = 0; i < markers.length; i++) {
          var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
          bounds.extend(position);
  
          if (!ready_aux && actual_project && actual_project[0].showrooms && actual_project[0].showrooms.id == markers[i][3]) {
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: {
                    url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                    scaledSize: new google.maps.Size(90, 60)
                  },
                  title: markers[i][0]
              });
              marker_aux = marker;
              ready_aux = true;
          } else {
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: {
                    url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                    scaledSize: new google.maps.Size(90, 60)
                  },
                  title: markers[i][0]
              });
          }
  
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                  infoWindow.setContent(infoWindowContent[i][0]);
                  map.setCenter(marker.getPosition());
                  // map.panTo(marker.getPosition());
                  infoWindow.open(map, marker);
                  latit = marker.getPosition().lat();
                  longit = marker.getPosition().lng();
                  $('#error-label').removeClass('d-flex');
              }
          })(marker, i));
  
          if (markers.length == 1) {
              latit = marker.getPosition().lat();
              longit = marker.getPosition().lng();
              traceRoute(directionsService, directionsDisplay)
          }
  
  
          marker.addListener('click', function () {
              traceRoute(directionsService, directionsDisplay)
          });
  
      }
      if (marker_aux) {
          latit = marker_aux.getPosition().lat();
          longit = marker_aux.getPosition().lng();
          traceRoute(directionsService, directionsDisplay)
  
      }
  
      setTimeout(function () {
          map.setZoom(13);
          map.setCenter(my_marker.getPosition());
      }, 500);
  
  }
  
  function geoError() {
      alert("Geocoder failed.");
  }
  
  function initMap(is_mobile, actual_project, init, projects, all) {
      if (init) {
          setMarkers(is_mobile, actual_project, projects);
          all_markers = markers;
      }
  
      var mapProp = {
          zoom: 12,
          mapTypeId: 'roadmap',
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.TOP_LEFT
          },
          FullscreenControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
          }
      };
  
      map = new google.maps.Map(document.getElementById("map"), mapProp);
      var bounds = new google.maps.LatLngBounds();
  
      var input = document.getElementById('places-input');
      // var searchBox = new google.maps.places.SearchBox(input);
  
      map.addListener('bounds_changed', function () {
          // searchBox.setBounds(map.getBounds());
      });
  
      if (myLatLng && markers.length == 1 || all) {
          map = new google.maps.Map(document.getElementById("map"), mapProp);
  
          directionsService = new google.maps.DirectionsService;
          directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              panel: document.getElementById('indications-panel'),
          });
  
          directionsDisplay.setMap(map);
  
          var bounds = new google.maps.LatLngBounds();
  
          var marker = new google.maps.Marker({
              position: myLatLng,
              icon: url_circle,
              map: map,
              title: 'My location'
          });
  
          var infoWindow;
  
          if (is_mobile) {
              infoWindow = new google.maps.InfoWindow({
                  maxWidth: 250,
              });
          } else {
              infoWindow = new google.maps.InfoWindow({
                  maxWidth: 400,
              });
          }
  
          let actual_marker;
          let markers_in = [];
          let ready = false;
  
          markers.forEach((m) => {
  
              let exists = false;
  
              markers_in.forEach((item) => {
                  if (item[1] == m[1] && item[2] == m[2]) {
                      exists = true;
                      return;
                  }
                  exists = false;
              });
              if (exists == false) {
                  markers_in.push(m);
              }
          });
  
          markers = markers_in;
          if (markers.length > 1) {
              for (i = 0; i < markers.length; i++) {
                  var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                  bounds.extend(position);
  
                  if (!ready && actual_project && actual_project[0].showrooms && actual_project[0].showrooms.id == markers[i][3]) {
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                      ready = true;
                      actual_marker = marker;
                  } else if (!ready && actual_project && actual_project[0] && actual_project[0].id == markers[i][3]) {
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                      ready = true;
                      actual_marker = marker;
                  } else {
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                  }
  
                  google.maps.event.addListener(marker, 'click', (function (marker, i) {
                      return function () {
                          $('#google-map').attr('href', 'https://maps.apple.com/?q=' + markers[i][1] + ',' + markers[i][2]);
                          $('#waze-map').attr('href', 'https://www.waze.com/livemap?ll=' + markers[i][1] + '%2C' + markers[i][2] + '&navigate=yes&zoom=17');
                          infoWindow.setContent(infoWindowContent[i][0]);
                          map.setCenter(marker.getPosition());
                          // map.panTo(marker.getPosition());
                          infoWindow.open(map, marker);
                          latit = marker.getPosition().lat();
                          longit = marker.getPosition().lng();
                          $('#error-label').removeClass('d-flex');
                      }
                  })(marker, i));
  
                  if (markers.length == 1) {
                      latit = marker.getPosition().lat();
                      longit = marker.getPosition().lng();
                      traceRoute(directionsService, directionsDisplay)
                  }
  
                  marker.addListener('click', function () {
                      traceRoute(directionsService, directionsDisplay)
                  });
  
              }
          } else {
              var position = new google.maps.LatLng(markers[0][1], markers[0][2]);
              bounds.extend(position);
  
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: {
                    url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                    scaledSize: new google.maps.Size(90, 60)
                  },
                  title: markers[0][0]
              });
              ready = true;
              actual_marker = marker;
  
              if (global_pos) {
                  geoSuccess(global_pos);
              }
  
  
              google.maps.event.addListener(marker, 'click', (function (marker) {
                  return function () {
                      $('#google-map').attr('href', 'https://maps.apple.com/?q=' + markers[0][1] + ',' + markers[0][2]);
                      $('#waze-map').attr('href', 'https://www.waze.com/livemap?ll=' + markers[0][1] + '%2C' + markers[0][2] + '&navigate=yes&zoom=17');
                      infoWindow.setContent(infoWindowContent[0][0]);
                      map.setCenter(marker.getPosition());
                      map.panTo(marker.getPosition());
                      infoWindow.open(map, marker);
                      latit = marker.getPosition().lat();
                      longit = marker.getPosition().lng();
                      $('#error-label').removeClass('d-flex');
                  }
              })(marker));
          }
  
          if (actual_marker)
              setTimeout(function () {
                  map.setCenter(actual_marker.getPosition());
              }, 500);
      }
  
      searchBox.addListener('places_changed', function () {
  
          var places = searchBox.getPlaces();
          if (places.length == 0) {
              return;
          }
  
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function (place) {
  
              if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
              }
              var icon = {
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
              };
  
              if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
              } else {
                  bounds.extend(place.geometry.location);
              }
  
              var latitude = place.geometry.location.lat();
              var longitude = place.geometry.location.lng();
  
              pos = {
                  coords: {
                      latitude,
                      longitude
                  }
              };
  
              global_pos = pos;
  
              geoSuccess(pos);
  
          });
          map.fitBounds(bounds);
  
      });
  
      var infoWindow;
  
      if (is_mobile) {
          infoWindow = new google.maps.InfoWindow({
              maxWidth: 180,
          });
      } else {
          infoWindow = new google.maps.InfoWindow({
              maxWidth: 400,
          });
      }
  
      let actual_marker;
      let markers_in = [];
      let ready = false;
  
      if (!all) {
          markers.forEach((m) => {
              let exists = false;
  
              markers_in.forEach((item) => {
                  if (item[1] == m[1] && item[2] == m[2]) {
                      exists = true;
                      return;
                  }
                  exists = false;
              });
              if (exists == false) {
                  markers_in.push(m);
              }
          });
  
          markers = markers_in;
          if (markers.length > 1) {
              for (i = 0; i < markers.length; i++) {
                  var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                  bounds.extend(position);
  
                  if (!ready && actual_project && actual_project[0].showrooms && actual_project[0].showrooms.id == markers[i][3]) {
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                      ready = true;
                      actual_marker = marker;
                  } else if (!ready && actual_project && actual_project[0] && actual_project[0].id == markers[i][3]) {
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                      ready = true;
                      actual_marker = marker;
                  } else {
                    // Custom icon map
                      marker = new google.maps.Marker({
                          position: position,
                          map: map,
                          icon: {
                            url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                            scaledSize: new google.maps.Size(90, 60)
                          },
                          title: markers[i][0]
                      });
                  }
                  google.maps.event.addListener(marker, 'click', (function (marker, i) {
                      return function () {
                          $('#google-map').attr('href', 'https://maps.apple.com/?q=' + markers[i][1] + ',' + markers[i][2]);
                          $('#waze-map').attr('href', 'https://www.waze.com/livemap?ll=' + markers[i][1] + '%2C' + markers[i][2] + '&navigate=yes&zoom=17');
                          infoWindow.setContent(infoWindowContent[i][0]);
                          map.setCenter(marker.getPosition());
                          map.panTo(marker.getPosition());
                          infoWindow.open(map, marker);
                          latit = marker.getPosition().lat();
                          longit = marker.getPosition().lng();
                          $('#error-label').removeClass('d-flex');
                      }
                  })(marker, i));
  
              }
          } else {
              var position = new google.maps.LatLng(markers[0][1], markers[0][2]);
              bounds.extend(position);
  
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: {
                    url: 'https://nuevo.altius.com.uy/wp-content/uploads/pin-map.svg',
                    scaledSize: new google.maps.Size(90, 60)
                  },
                  title: markers[0][0]
              });
              ready = true;
              actual_marker = marker;
  
              google.maps.event.addListener(marker, 'click', (function (marker) {
                  return function () {
                      $('#google-map').attr('href', 'https://maps.apple.com/?q=' + markers[0][1] + ',' + markers[0][2]);
                      $('#waze-map').attr('href', 'https://www.waze.com/livemap?ll=' + markers[0][1] + '%2C' + markers[0][2] + '&navigate=yes&zoom=17');
                      infoWindow.setContent(infoWindowContent[0][0]);
                      map.setCenter(marker.getPosition());
                      map.panTo(marker.getPosition());
                      infoWindow.open(map, marker);
                      latit = marker.getPosition().lat();
                      longit = marker.getPosition().lng();
                      $('#error-label').removeClass('d-flex');
                  }
              })(marker));
          }
  
          if (actual_marker)
              setTimeout(function () {
                  map.setCenter(actual_marker.getPosition());
              }, 1000);
  
      }
  
      map.fitBounds(bounds);
  
      zoomChangeBoundsListener =
          google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
              if (this.getZoom()) {   // or set a minimum
                  this.setZoom(13);  // set zoom here
              }
          });
  
      setTimeout(function () {
          google.maps.event.removeListener(zoomChangeBoundsListener)
      }, 2000);
  }
  
  projects = [
    {
      "id": 23,
      "friendly_url": "bilu-biarritz",
      "name": "Bil\u00fa Biarritz",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"LA TORRE M\u00c1S EXCLUSIVA DE VILLA BIARRITZ\\n\\nFrente al parque de Villa Biarritz y a metros de la Rambla de Punta Carretas, Bil\u00fa Biarritz ofrece vistas \u00fanicas y acceso a un sinf\u00edn de servicios de alta calidad.\\n\\nCon el dise\u00f1o del Estudio Carlos Ott en asociaci\u00f3n con Carlos Ponce de Le\u00f3n Arquitectos, Bil\u00fa Biarritz se desarrolla en el predio de la ic\u00f3nica mansi\u00f3n de la familia Gallinal, en la intersecci\u00f3n de Benito Blanco y V\u00e1zquez Ledesma, un punto \u00fanico en Villa Biarritz que permite a la torre ofrecer vistas hacia el parque y hacia la rambla.\\n\\nUna torre exclusiva que ofrece a sus residentes amplios e iluminados apartamentos con terminaciones de primera calidad y lo \u00faltimo en tecnolog\u00eda aplicada al confort.\\nAmenities Premium y para toda la familia hacen el d\u00eda a d\u00eda en Bil\u00fa Biarritz una experiencia de magn\u00edfico disfrute.\\n\"}]}",
      "link": null,
      "crm_id": null,
      "departamento": 10,
      "barrios_id": 22,
      "showrooms_id": null,
      "marcas_id": 4,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Juan Benito Blanco 612 esq. J. V\u00e1zquez Ledesma",
      "lat": "-34.920328",
      "lng": "-56.151314",
      "fliphtml5": null,
      "active": 1,
      "pos": 3005,
      "created_at": "2020-07-10 14:55:31",
      "updated_at": "2022-07-25 13:11:36",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZPYa7g.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZPYa7g.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZPYa7g.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZPYa7g.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/23\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/bilu-biarritz",
      "medias": [{
        "id": 2379,
        "group": "item",
        "url": "zZqrO4g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_zZqrO4g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_zZqrO4g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_zZqrO4g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_zZqrO4g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_zZqrO4g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2388,
        "group": "galeria",
        "url": "qg5Vy2v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5Vy2v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5Vy2v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5Vy2v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5Vy2v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5Vy2v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2401,
        "group": "portada",
        "url": "4veWBYZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-07-10 16:21:42",
        "updated_at": "2020-07-10 16:21:42",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4veWBYZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4veWBYZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4veWBYZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4veWBYZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4veWBYZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2408,
        "group": "logo",
        "url": "6ZPYa7g.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-07-10 16:31:09",
        "updated_at": "2020-07-10 16:31:09",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZPYa7g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZPYa7g.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZPYa7g.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZPYa7g.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZPYa7g.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 2387,
        "group": "galeria",
        "url": "5vKn6Og.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_5vKn6Og.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_5vKn6Og.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_5vKn6Og.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_5vKn6Og.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_5vKn6Og.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2391,
        "group": "galeria",
        "url": "yvWQkxZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yvWQkxZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yvWQkxZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yvWQkxZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yvWQkxZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yvWQkxZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2399,
        "group": "galeria",
        "url": "NZYnXKg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2020-07-10 14:55:37",
        "updated_at": "2020-07-10 14:55:37",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZYnXKg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZYnXKg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZYnXKg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZYnXKg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZYnXKg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2398,
        "group": "galeria",
        "url": "8ZNDL4v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2020-07-10 14:55:37",
        "updated_at": "2020-07-10 14:55:37",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNDL4v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNDL4v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNDL4v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNDL4v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNDL4v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2395,
        "group": "galeria",
        "url": "MgBabyZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2020-07-10 14:55:36",
        "updated_at": "2020-07-10 14:55:36",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBabyZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBabyZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBabyZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBabyZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBabyZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2392,
        "group": "galeria",
        "url": "Wg9x23Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2020-07-10 14:55:35",
        "updated_at": "2020-07-10 14:55:35",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wg9x23Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wg9x23Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wg9x23Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wg9x23Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wg9x23Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2389,
        "group": "galeria",
        "url": "4veWBlZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4veWBlZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4veWBlZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4veWBlZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4veWBlZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4veWBlZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2381,
        "group": "galeria",
        "url": "Mp6kn4Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6kn4Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6kn4Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6kn4Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6kn4Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6kn4Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2383,
        "group": "galeria",
        "url": "wv7VE7g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7VE7g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7VE7g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7VE7g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7VE7g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7VE7g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2380,
        "group": "galeria",
        "url": "bgMO86p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_bgMO86p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_bgMO86p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_bgMO86p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_bgMO86p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_bgMO86p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2385,
        "group": "galeria",
        "url": "mvyXBPg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2020-07-10 14:55:33",
        "updated_at": "2020-07-10 14:55:33",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvyXBPg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvyXBPg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvyXBPg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvyXBPg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvyXBPg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2390,
        "group": "galeria",
        "url": "rZb39bg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZb39bg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZb39bg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZb39bg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZb39bg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZb39bg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2393,
        "group": "galeria",
        "url": "NZwNwYp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2020-07-10 14:55:35",
        "updated_at": "2020-07-10 14:55:35",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZwNwYp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZwNwYp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZwNwYp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZwNwYp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZwNwYp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2384,
        "group": "galeria",
        "url": "EvV2Y8v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 14,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvV2Y8v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvV2Y8v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvV2Y8v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvV2Y8v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvV2Y8v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2382,
        "group": "galeria",
        "url": "Av4WoGg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2020-07-10 14:55:32",
        "updated_at": "2020-07-10 14:55:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av4WoGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av4WoGg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av4WoGg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av4WoGg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av4WoGg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2386,
        "group": "galeria",
        "url": "qZzOPPg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 16,
        "created_at": "2020-07-10 14:55:34",
        "updated_at": "2020-07-10 14:55:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzOPPg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzOPPg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzOPPg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzOPPg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzOPPg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2394,
        "group": "galeria",
        "url": "1ZJqz9p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 17,
        "created_at": "2020-07-10 14:55:36",
        "updated_at": "2020-07-10 14:55:36",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_1ZJqz9p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_1ZJqz9p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_1ZJqz9p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_1ZJqz9p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_1ZJqz9p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2396,
        "group": "galeria",
        "url": "6ZPYaWg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 18,
        "created_at": "2020-07-10 14:55:37",
        "updated_at": "2020-07-10 14:55:37",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZPYaWg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZPYaWg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZPYaWg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZPYaWg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZPYaWg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2397,
        "group": "galeria",
        "url": "VpRB4Vp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 19,
        "created_at": "2020-07-10 14:55:37",
        "updated_at": "2020-07-10 14:55:37",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRB4Vp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRB4Vp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRB4Vp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRB4Vp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRB4Vp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2400,
        "group": "galeria",
        "url": "qg5Vy3v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 23,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 20,
        "created_at": "2020-07-10 14:55:38",
        "updated_at": "2020-07-10 14:55:38",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5Vy3v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5Vy3v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5Vy3v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5Vy3v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5Vy3v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 4,
        "friendly_url": "bilu",
        "name": "Bil\u00fa",
        "link_ext": "https:\/\/bilu.com.uy\/",
        "active": 1,
        "pos": 600,
        "created_at": "2018-08-23 16:26:29",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1910,
          "group": "normal",
          "url": "8ZNxPvR.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Bil\\u00fa\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 4,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:19:22",
          "updated_at": "2019-04-11 15:19:22",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNxPvR.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNxPvR.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNxPvR.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNxPvR.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNxPvR.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": null,
      "etapas": []
    }, 
    {
      "id": 19,
      "friendly_url": "more-buceo",
      "name": "More Buceo",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"La primera Torre residencial de Montevideo con Certificaci\u00f3n LEED. 27 Pisos con apartamentos y amenities que te aseguran la mejor calidad de vida.\\n\\nEn un sector de la ciudad que se distingue por su calidad urbana y por su completa oferta de servicios, MORE BUCEO se ubica a solo tres cuadras de la Rambla ofreciendo maravillosas vistas a\u00fan desde los pisos m\u00e1s bajos.\\n\\nAmaneceres y atardeceres maravillosos y despejados para disfrutar desde la comodidad de tu nuevo hogar.\\n\"}]}",
      "link": null,
      "crm_id": null,
      "departamento": 10,
      "barrios_id": 22,
      "showrooms_id": null,
      "marcas_id": 3,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Av. Gral. Rivera 4237",
      "lat": "-34.895749",
      "lng": "-56.121964",
      "fliphtml5": null,
      "active": 1,
      "pos": 3002,
      "created_at": "2019-05-20 13:10:22",
      "updated_at": "2021-10-01 14:04:36",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzOKGg.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzOKGg.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzOKGg.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzOKGg.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/19\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/more-buceo",
      "medias": [{
        "id": 2669,
        "group": "galeria",
        "url": "PvmPGJg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 19,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-12-15 19:18:10",
        "updated_at": "2020-12-15 19:18:10",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvmPGJg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvmPGJg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvmPGJg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvmPGJg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_PvmPGJg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1934,
        "group": "item",
        "url": "LvLQGpO.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 19,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-20 13:32:04",
        "updated_at": "2019-05-20 13:32:04",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_LvLQGpO.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_LvLQGpO.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_LvLQGpO.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_LvLQGpO.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_LvLQGpO.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 1937,
        "group": "portada",
        "url": "Mp6kBkZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 19,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-20 15:08:05",
        "updated_at": "2019-05-20 15:08:05",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6kBkZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6kBkZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6kBkZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6kBkZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6kBkZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1942,
        "group": "logo",
        "url": "qZzOKGg.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 19,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-24 13:00:03",
        "updated_at": "2019-05-24 13:00:03",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzOKGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzOKGg.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzOKGg.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzOKGg.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzOKGg.png",
        "video": "",
        "mime_type": "image\/png"
      }],
      "marcas": {
        "id": 3,
        "friendly_url": "more",
        "name": "More",
        "link_ext": "https:\/\/www.more.com.uy\/",
        "active": 1,
        "pos": 800,
        "created_at": "2018-08-23 16:19:39",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1909,
          "group": "normal",
          "url": "VpRq0vd.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 3,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:19:03",
          "updated_at": "2019-04-11 15:19:03",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRq0vd.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRq0vd.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRq0vd.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRq0vd.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRq0vd.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": null,
      "etapas": []
    }, 
    {
      "id": 24,
      "friendly_url": "more-atlantico",
      "name": "More Atl\u00e1ntico",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"More Atl\u00e1ntico se localiza en un \u00e1rea estrat\u00e9gica caracterizada por su desarrollo urbano, la cobertura de servicios y sus excepcionales calidades paisaj\u00edsticas, sumadas a las visuales \u00fanicas de Punta del Este.\\n\\nA pocas cuadras de Playa Mansa, a pasos del centro de Maldonado y minutos de la Pen\u00ednsula, lo convierten en un lugar \u00fanico de residencia temporal o permanente y tambi\u00e9n una inmejorable oportunidad de inversi\u00f3n.\\nSu ubicaci\u00f3n cercana a importantes ejes viales, lo hacen tener una conectividad \u00f3ptima, con la mejor cobertura de transporte, equipamientos p\u00fablicos y servicios privados de primer nivel.\\n\\nMore Atl\u00e1ntico se desarrolla en planta baja con Lobby de acceso de doble altura, 18 niveles de apartamentos, estacionamientos y servicios de apoyo en subsuelos.\\nEl primer nivel de apartamentos corresponde al piso 6 ya que el Shopping se desarrolla en los niveles inferiores, funcionando de forma totalmente independiente.\\nApartamentos de dise\u00f1o con funcionamiento eficiente, para hacerte la vida m\u00e1s simple y disfrutable. Monoambientes y apartamentos de uno, dos y tres dormitorios con lock-off (opcional), con la calidad de More.\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"El nivel 4 est\u00e1 destinado a amenities que incluyen:\"},{\"insert\":\"\\n- Dos Salones Barbacoa integrables, equipados con parrilleros y cocina gourmet.\\n- Barbacoas pergoladas.\\n- Amplia terraza equipada con livings exteriores.\\n- Pet Garden.\\n- Playground.\\n- Teen Area equipada como play room y con un bar de previas integrado al espacio.\\n- Kids Area equipado con equipamiento l\u00fadico fijo y m\u00f3vil, para ni\u00f1os de 2 a 8 a\u00f1os.\\n- \u00c1rea de SPA integrada por:\\nPiscina climatizada interior y exterior, ambas con sector definido para ni\u00f1os, orientadas al noroeste.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Sol\u00e1rium equipado con reposeras, camastros y sombrillas.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Sala de Masajes.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Sauna h\u00famedo.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Gimnasio con equipamiento de fitness de \u00faltima generaci\u00f3n.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"Servicios higi\u00e9nicos con accesibilidad universal.\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Apartamentos con privilegiadas vistas 360\u00b0.\"},{\"insert\":\"\\nUn abanico visual que recorre desde la Playa Mansa, la perspectiva de la Avenida Roosevelt hacia el sur, hasta visuales sobre el barrio jard\u00edn de Punta del Este, reafirmando las mejores vistas para vivir una experiencia \u00fanica.\\n\"}]}",
      "link": "https:\/\/roundme.com\/embed\/534339\/1766981",
      "crm_id": null,
      "departamento": 9,
      "barrios_id": 21,
      "showrooms_id": null,
      "marcas_id": 3,
      "unidades_id": 1,
      "selected": 0,
      "direccion": null,
      "lat": "-34.915722955110255",
      "lng": "-54.9605987329473",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/lxlbv\/sdkk\/",
      "active": 1,
      "pos": 3006,
      "created_at": "2021-02-12 20:09:29",
      "updated_at": "2022-07-13 13:36:22",
      "dpto_name": "Maldonado",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yZGo0EZ.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yZGo0EZ.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yZGo0EZ.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yZGo0EZ.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/24\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/more-atlantico",
      "medias": [{
        "id": 3156,
        "group": "galeria",
        "url": "mZDal7g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mZDal7g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mZDal7g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mZDal7g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mZDal7g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mZDal7g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2933,
        "group": "logo",
        "url": "yZGo0EZ.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-06-25 20:18:24",
        "updated_at": "2021-06-25 20:18:24",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yZGo0EZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yZGo0EZ.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yZGo0EZ.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yZGo0EZ.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yZGo0EZ.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 2722,
        "group": "item",
        "url": "Pvl15lp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-02-12 20:58:04",
        "updated_at": "2021-02-12 20:58:04",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Pvl15lp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Pvl15lp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Pvl15lp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Pvl15lp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Pvl15lp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3155,
        "group": "galeria",
        "url": "NZYnozg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZYnozg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZYnozg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZYnozg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZYnozg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZYnozg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3158,
        "group": "galeria",
        "url": "Wp15Wlp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wp15Wlp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wp15Wlp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wp15Wlp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wp15Wlp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wp15Wlp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3159,
        "group": "galeria",
        "url": "dg249jp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_dg249jp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_dg249jp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_dg249jp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_dg249jp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_dg249jp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3160,
        "group": "galeria",
        "url": "Rpo4YXZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo4YXZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo4YXZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo4YXZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo4YXZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo4YXZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3157,
        "group": "galeria",
        "url": "opjEJMv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 24,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2022-07-13 13:32:27",
        "updated_at": "2022-07-13 13:32:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_opjEJMv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_opjEJMv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_opjEJMv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_opjEJMv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_opjEJMv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 3,
        "friendly_url": "more",
        "name": "More",
        "link_ext": "https:\/\/www.more.com.uy\/",
        "active": 1,
        "pos": 800,
        "created_at": "2018-08-23 16:19:39",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1909,
          "group": "normal",
          "url": "VpRq0vd.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 3,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:19:03",
          "updated_at": "2019-04-11 15:19:03",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRq0vd.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRq0vd.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRq0vd.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRq0vd.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRq0vd.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": null,
      "etapas": []
    }, 
    {
      "id": 14,
      "friendly_url": "bilu-riviera",
      "name": "Bil\u00fa Riviera",
      "description_aux": "En el predio donde se ubica el ex Hotel Riviera, surge el primer proyecto \"mixed-use\" de Altius Group, combinando oficinas inteligentes de primer nivel (Smart Riviera) con viviendas de lujo (Bil\u00fa Riviera) en un punto incomparable de la Rambla Carrasquense. Un proyecto llevado a cabo por el prestigioso estudio G\u00f3mez Platero.",
      "description": "{\"ops\":[{\"insert\":\"En el predio donde se ubica el ex Hotel Riviera, surge el primer proyecto \\\"mixed-use\\\" de Altius Group, combinando oficinas inteligentes de primer nivel (Smart Riviera) con viviendas de lujo (Bil\u00fa Riviera) en un punto incomparable de la Rambla de Carrasco. Un proyecto llevado a cabo por el prestigioso estudio G\u00f3mez Platero.\\n\"}]}",
      "link": null,
      "crm_id": null,
      "departamento": 10,
      "barrios_id": 22,
      "showrooms_id": 10,
      "marcas_id": 4,
      "unidades_id": 1,
      "selected": 0,
      "direccion": null,
      "lat": "-34.89744",
      "lng": "-56.06311",
      "fliphtml5": null,
      "active": 1,
      "pos": 2600,
      "created_at": "2018-08-23 01:05:57",
      "updated_at": "2022-08-04 17:25:02",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvmbJpD.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvmbJpD.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvmbJpD.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvmbJpD.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/14\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/bilu-riviera",
      "medias": [{
        "id": 3332,
        "group": "portada",
        "url": "OvrAz2g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2023-01-10 20:43:10",
        "updated_at": "2023-01-10 20:43:10",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvrAz2g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvrAz2g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvrAz2g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvrAz2g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvrAz2g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3333,
        "group": "item",
        "url": "yZGoaDZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2023-01-10 20:43:10",
        "updated_at": "2023-01-10 20:43:10",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yZGoaDZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yZGoaDZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yZGoaDZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yZGoaDZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yZGoaDZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3337,
        "group": "galeria",
        "url": "Mp6k5GZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2023-01-10 20:45:14",
        "updated_at": "2023-01-10 20:45:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6k5GZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6k5GZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6k5GZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6k5GZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6k5GZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1569,
        "group": "logo",
        "url": "PvmbJpD.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-11-07 19:46:32",
        "updated_at": "2018-11-07 19:46:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvmbJpD.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvmbJpD.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvmbJpD.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvmbJpD.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_PvmbJpD.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 3340,
        "group": "galeria",
        "url": "EvV2z0v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2023-01-10 20:45:14",
        "updated_at": "2023-01-10 20:45:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvV2z0v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvV2z0v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvV2z0v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvV2z0v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvV2z0v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3336,
        "group": "galeria",
        "url": "bgMOQ3p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2023-01-10 20:45:13",
        "updated_at": "2023-01-10 20:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_bgMOQ3p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_bgMOQ3p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_bgMOQ3p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_bgMOQ3p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_bgMOQ3p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3339,
        "group": "galeria",
        "url": "wv7Vexg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2023-01-10 20:45:14",
        "updated_at": "2023-01-10 20:45:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7Vexg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7Vexg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7Vexg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7Vexg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7Vexg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3338,
        "group": "galeria",
        "url": "Av4W09g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2023-01-10 20:45:14",
        "updated_at": "2023-01-10 20:45:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av4W09g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av4W09g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av4W09g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av4W09g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av4W09g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3334,
        "group": "galeria",
        "url": "LvL3l2g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2023-01-10 20:45:12",
        "updated_at": "2023-01-10 20:45:12",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_LvL3l2g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_LvL3l2g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_LvL3l2g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_LvL3l2g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_LvL3l2g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3335,
        "group": "galeria",
        "url": "zZqrzJg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2023-01-10 20:45:12",
        "updated_at": "2023-01-10 20:45:12",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_zZqrzJg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_zZqrzJg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_zZqrzJg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_zZqrzJg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_zZqrzJg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3342,
        "group": "galeria",
        "url": "qZzOJ6g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2023-01-10 20:45:15",
        "updated_at": "2023-01-10 20:45:15",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzOJ6g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzOJ6g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzOJ6g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzOJ6g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzOJ6g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3341,
        "group": "galeria",
        "url": "mvyXwJg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 14,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2023-01-10 20:45:14",
        "updated_at": "2023-01-10 20:45:15",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvyXwJg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvyXwJg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvyXwJg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvyXwJg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvyXwJg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 4,
        "friendly_url": "bilu",
        "name": "Bil\u00fa",
        "link_ext": "https:\/\/bilu.com.uy\/",
        "active": 1,
        "pos": 600,
        "created_at": "2018-08-23 16:26:29",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1910,
          "group": "normal",
          "url": "8ZNxPvR.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Bil\\u00fa\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 4,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:19:22",
          "updated_at": "2019-04-11 15:19:22",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNxPvR.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNxPvR.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNxPvR.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNxPvR.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNxPvR.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 10,
        "friendly_url": "showroom-bilu-riviera",
        "name": "Showroom Bil\u00fa Riviera",
        "description": null,
        "direccion": "WTC | Torre 3 -  26 de Marzo esq. Luis Bonavita.",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bados de 10 a 19 hs.",
        "lat": "-34.905437",
        "lng": "-56.135747",
        "active": 1,
        "pos": 800,
        "created_at": "2018-08-23 01:11:06",
        "updated_at": "2021-05-31 13:58:20",
        "medias": [{
          "id": 1571,
          "group": "normal",
          "url": "qpxj9g3.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 10,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2018-11-07 20:01:43",
          "updated_at": "2018-11-07 20:01:43",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qpxj9g3.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qpxj9g3.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qpxj9g3.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qpxj9g3.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qpxj9g3.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 17,
      "friendly_url": "more-echevarriarza",
      "name": "More Echevarriarza",
      "description_aux": "UNA PROPUESTA ARQUITECT\u00d3NICA VANGUARDISTA\r\n\r\nConcebido a partir de lo que la modernidad nos propone y nos demanda. Funcionalidad, conectividad, adaptabilidad y flexibilidad, pero tambi\u00e9n dise\u00f1o, calidez y buen gusto. Todo esto adem\u00e1s, en el lugar de la ciudad donde todo sucede, en el coraz\u00f3n de Pocitos.\r\n\r\n\r\nMORE ECHEVARRIARZA es un proyecto completamente innovador que se desarrolla en 6 niveles: Planta Baja, 3 niveles de apartamentos, un Roof-Top y un Subsuelo.\r\nOfrece a los compradores 7 apartamentos de dos dormitorios, 25 de un dormitorio y 25 monoambientes. En PB y Subsuelo se ubican los sitios de estacionamiento y bicicleteros. Cuenta con un patio central enjardinado de triple altura y dos torres de apartamentos, que se relacionan armoniosamente con un entorno que se destaca por su modernidad y buen gusto.\r\n\r\n\r\nEncontr\u00e1 m\u00e1s de MORE en: <a href=\"http:\/\/www.more.com.uy\">www.more.com.uy<\/a>",
      "description": "{\"ops\":[{\"insert\":\"More Echevarriarza es la respuesta proyectual del Estudio G\u00f3mez Platero, a las condiciones del predio, la normativa urbana (altura y ocupaci\u00f3n de suelo), un programa residencial completamente innovador en Montevideo y su enclave singular.\\n\\nEl edificio en r\u00e9gimen de propiedad horizontal est\u00e1 desarrollado en 6 niveles: Planta Baja (PB), 3 niveles de apartamentos (1, 2 y 3), un Roof-Top destinado a Amenities (RT) y un Subsuelo (-1).\\nEl programa residencial se compone de 57 unidades de vivienda: 25 monoambientes, 25 unidades de un dormitorio y 7 unidades de dos dormitorios.\\n\\nLa planta tipo dispone de un patio central enjardinado de triple altura y dos Torres de apartamentos de condiciones equilibradas, en relaci\u00f3n a su relaci\u00f3n con la v\u00eda p\u00fablica, el patio y el jard\u00edn posterior. Esta disposici\u00f3n de las unidades optimiza las condiciones de asoleamiento y ventilaci\u00f3n. El doble n\u00facleo de circulaciones en cada Torre garantiza la eficiencia de las circulaciones verticales y horizontales.\\n\\nLas unidades se proyectan en base a dos plantas tipo: el Nivel 1 contiene 17 apartamentos y la planta de los niveles N2 y N3, 20 apartamentos en cada nivel.\\nLa modulaci\u00f3n de las unidades proporciona simplicidad estructural, constructiva y en el planteo de las instalaciones.\\n\\nEl proyecto cuenta con sitios de estacionamiento que se comercializan de forma independiente.\\n\\n\"}]}",
      "link": "https:\/\/more.com.uy\/pano\/echevarriarza1d\/",
      "crm_id": null,
      "departamento": 10,
      "barrios_id": 22,
      "showrooms_id": 11,
      "marcas_id": 3,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Ubicaci\u00f3n del proyecto: Echevarriarza 3471 esq. Luis A. de Herrera \r\nOficina de Venta: Altius Life:  WTC | Torre 3 - 26 de Marzo esq. Luis Bonavita",
      "lat": "-34.9089361",
      "lng": "-56.136781499999984",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/lxlbv\/kavz\/",
      "active": 1,
      "pos": 3000,
      "created_at": "2018-08-23 01:05:58",
      "updated_at": "2022-04-18 13:58:50",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_5vKnY9g.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_5vKnY9g.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_5vKnY9g.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_5vKnY9g.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/17\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/more-echevarriarza",
      "medias": [{
        "id": 1564,
        "group": "item",
        "url": "lvnWJp9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-11-07 18:10:13",
        "updated_at": "2018-11-07 18:10:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvnWJp9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvnWJp9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvnWJp9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvnWJp9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvnWJp9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1943,
        "group": "logo",
        "url": "5vKnY9g.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-24 13:08:27",
        "updated_at": "2019-05-24 13:08:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_5vKnY9g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_5vKnY9g.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_5vKnY9g.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_5vKnY9g.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_5vKnY9g.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 2998,
        "group": "portada",
        "url": "8ZNDMWv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-10-01 14:22:43",
        "updated_at": "2021-10-01 14:22:43",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNDMWv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNDMWv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNDMWv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNDMWv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNDMWv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1183,
        "group": "galeria",
        "url": "wv71xZY.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2018-08-23 23:58:54",
        "updated_at": "2018-11-07 21:02:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv71xZY.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv71xZY.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv71xZY.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv71xZY.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv71xZY.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1184,
        "group": "galeria",
        "url": "EvVr0vn.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2018-08-23 23:58:54",
        "updated_at": "2018-11-07 21:02:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvVr0vn.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvVr0vn.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvVr0vn.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvVr0vn.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvVr0vn.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1575,
        "group": "galeria",
        "url": "jp8XXpL.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2018-11-07 21:02:15",
        "updated_at": "2018-11-07 21:02:15",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_jp8XXpL.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_jp8XXpL.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_jp8XXpL.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_jp8XXpL.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_jp8XXpL.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1574,
        "group": "galeria",
        "url": "DpAd9vX.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2018-11-07 21:02:15",
        "updated_at": "2018-11-07 21:02:15",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_DpAd9vX.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_DpAd9vX.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_DpAd9vX.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_DpAd9vX.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_DpAd9vX.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1576,
        "group": "galeria",
        "url": "OvrBlvW.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2018-11-07 21:09:27",
        "updated_at": "2018-11-07 21:09:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvrBlvW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvrBlvW.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvrBlvW.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvrBlvW.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvrBlvW.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1579,
        "group": "galeria",
        "url": "zZqJBgk.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2018-11-07 21:09:27",
        "updated_at": "2018-11-07 21:09:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_zZqJBgk.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_zZqJBgk.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_zZqJBgk.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_zZqJBgk.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_zZqJBgk.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1577,
        "group": "galeria",
        "url": "yZGLKgB.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2018-11-07 21:09:27",
        "updated_at": "2018-11-07 21:09:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yZGLKgB.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yZGLKgB.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yZGLKgB.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yZGLKgB.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yZGLKgB.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1578,
        "group": "galeria",
        "url": "LvL9dpO.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2018-11-07 21:09:27",
        "updated_at": "2018-11-07 21:09:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_LvL9dpO.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_LvL9dpO.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_LvL9dpO.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_LvL9dpO.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_LvL9dpO.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1580,
        "group": "galeria",
        "url": "bgMwnpA.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2018-11-07 21:09:27",
        "updated_at": "2018-11-07 21:09:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_bgMwnpA.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_bgMwnpA.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_bgMwnpA.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_bgMwnpA.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_bgMwnpA.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1581,
        "group": "galeria",
        "url": "Mp6a3v9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2018-11-07 21:09:29",
        "updated_at": "2018-11-07 21:09:29",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6a3v9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6a3v9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6a3v9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6a3v9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6a3v9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1582,
        "group": "galeria",
        "url": "Av42RZW.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2018-11-07 21:09:29",
        "updated_at": "2018-11-07 21:09:29",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av42RZW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av42RZW.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av42RZW.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av42RZW.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av42RZW.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1583,
        "group": "galeria",
        "url": "wv7kOvY.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2018-11-07 21:09:29",
        "updated_at": "2018-11-07 21:09:29",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7kOvY.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7kOvY.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7kOvY.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7kOvY.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7kOvY.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1584,
        "group": "galeria",
        "url": "EvVAagn.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2018-11-07 21:09:30",
        "updated_at": "2018-11-07 21:09:30",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvVAagn.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvVAagn.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvVAagn.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvVAagn.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvVAagn.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1585,
        "group": "galeria",
        "url": "mvy0XgV.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 14,
        "created_at": "2018-11-07 21:09:30",
        "updated_at": "2018-11-07 21:09:30",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvy0XgV.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvy0XgV.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvy0XgV.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvy0XgV.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvy0XgV.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1586,
        "group": "galeria",
        "url": "qZzA3pa.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2018-11-07 21:09:32",
        "updated_at": "2018-11-07 21:09:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzA3pa.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzA3pa.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzA3pa.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzA3pa.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzA3pa.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2999,
        "group": "galeria",
        "url": "NZYnRPg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 16,
        "created_at": "2021-10-01 14:26:51",
        "updated_at": "2021-10-01 14:26:51",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZYnRPg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZYnRPg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZYnRPg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZYnRPg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZYnRPg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3000,
        "group": "galeria",
        "url": "qg5V35v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 17,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 18,
        "created_at": "2021-10-01 14:26:51",
        "updated_at": "2021-10-01 14:26:51",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5V35v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5V35v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5V35v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5V35v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5V35v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 3,
        "friendly_url": "more",
        "name": "More",
        "link_ext": "https:\/\/www.more.com.uy\/",
        "active": 1,
        "pos": 800,
        "created_at": "2018-08-23 16:19:39",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1909,
          "group": "normal",
          "url": "VpRq0vd.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 3,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:19:03",
          "updated_at": "2019-04-11 15:19:03",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRq0vd.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRq0vd.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRq0vd.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRq0vd.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRq0vd.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 11,
        "friendly_url": "more-echevarriarza",
        "name": "More Echevarriarza",
        "description": "Direcci\u00f3n del proyecto: Echevarriarza 3471 esq. Luis A. de Herrera\r\n\r\nEstamos atendiendo en nuestra Oficina de Ventas Altius Life",
        "direccion": "WTC | Torre 3 - 26 de Marzo esq. Luis Bonavita",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bado de 10 a 19 hs.",
        "lat": "-34.905437",
        "lng": "-56.135747",
        "active": 1,
        "pos": 1200,
        "created_at": "2018-11-07 20:07:44",
        "updated_at": "2022-04-18 13:58:50",
        "medias": [{
          "id": 1846,
          "group": "normal",
          "url": "rZbKjgM.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 11,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2019-02-07 17:39:40",
          "updated_at": "2019-02-07 17:39:40",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZbKjgM.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZbKjgM.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZbKjgM.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZbKjgM.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZbKjgM.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 6,
      "friendly_url": "altos-del-libertador",
      "name": "Altos del Libertador",
      "description_aux": "En un predio de 9.000 m2, con m\u00e1s de 38.000 m2 construidos se levanta Altos del Libertador ofreciendo una amplia gama de opciones de apartamentos de acuerdo a las necesidades de cada familia.\n\nApartamentos monoambientes, 1, 2, 3 dormitorios y exclusivos d\u00faplex, concebidos, dise\u00f1ados y construidos con la calidad y confort que una familia en el siglo XXI requiere para su disfrute m\u00e1s pleno, en espacios con alturas, terrazas y dimensiones \u00fanicas.\n\nUn proyecto con todo lo que so\u00f1aste vivir y disfrutar. Todos los servicios y la m\u00e1xima seguridad con los gastos comunes m\u00e1s bajos.\n\nGran parque interior de 2.200 m2 de espacios a cielo abierto, amplia piscina exterior de medidas generosas y sol\u00e1rium para disfrutar en familia. \u00c1rea recreativa equipada con juegos para ni\u00f1os. V\u00ednculo espacial y visual directo con otros servicios. P\u00e9rgolas sombreadas y solariums.\n\nCuatro barbacoas amplias situadas en el s\u00e9ptimo piso del edificio con excepcionales vistas hacia la Bah\u00eda de Montevideo, el Cerro, el Mercado Agr\u00edcola y la ciudad. Sala de musculaci\u00f3n y fitness con equipos de \u00faltima generaci\u00f3n y vista hacia el parque interior. Sal\u00f3n para ni\u00f1os con TV LCD, Wii y mesas infantiles. Sal\u00f3n para adolescentes con TV LCD, mesa de ping-pong, computadoras con internet y mesas de juego. Sal\u00f3n para adultos con TV LCD, mesa de pool y mesas de juego. Lavaderos. Internet WiFi en \u00e1reas de servicio y halles centrales.\n\nSistemas de seguridad y comunicaciones. Tarjetas de Control de Acceso. Instalaci\u00f3n y equipamiento de c\u00e1maras de seguridad (Circuito Cerrado de TV) en accesos peatonales y vehiculares, \u00e1reas de servicio y halles de cada piso. Central telef\u00f3nica para comunicaci\u00f3n entre unidades, recepci\u00f3n, seguridad y \u00e1reas de servicio. Garages internos con control de acceso.",
      "description": "{\"ops\":[{\"insert\":\"En un predio de 9.000 m2, con m\u00e1s de 38.000 m2 construidos se levanta Altos del Libertador ofreciendo una amplia gama de opciones de apartamentos de acuerdo a las necesidades de cada familia.\\n\\nApartamentos monoambientes, 1, 2, 3 dormitorios y exclusivos d\u00faplex, concebidos, dise\u00f1ados y construidos con la calidad y confort que una familia en el siglo XXI requiere para su disfrute m\u00e1s pleno, en espacios con alturas, terrazas y dimensiones \u00fanicas.\\n\\nUn proyecto con todo lo que so\u00f1aste vivir y disfrutar. Todos los servicios y la m\u00e1xima seguridad con los gastos comunes m\u00e1s bajos.\\n\\nGran parque interior de 2.200 m2 de espacios a cielo abierto, amplia piscina exterior de medidas generosas y sol\u00e1rium para disfrutar en familia. \u00c1rea recreativa equipada con juegos para ni\u00f1os. V\u00ednculo espacial y visual directo con otros servicios. P\u00e9rgolas sombreadas y solariums.\\n\\nCuatro barbacoas amplias situadas en el s\u00e9ptimo piso del edificio con excepcionales vistas hacia la Bah\u00eda de Montevideo, el Cerro, el Mercado Agr\u00edcola y la ciudad. Sala de musculaci\u00f3n y fitness con equipos de \u00faltima generaci\u00f3n y vista hacia el parque interior. Sal\u00f3n para ni\u00f1os con TV LCD, Wii y mesas infantiles. Lounge con TV Led ,mesa de pool y mesas de juego. Lavaderos. Internet WiFi en \u00e1reas de servicio y halles centrales.\\n\\nSistemas de seguridad y comunicaciones. Tarjetas de Control de Acceso. Instalaci\u00f3n y equipamiento de c\u00e1maras de seguridad (Circuito Cerrado de TV) en accesos peatonales y vehiculares, \u00e1reas de servicio y halles de cada piso. Central telef\u00f3nica para comunicaci\u00f3n entre unidades, recepci\u00f3n, seguridad y \u00e1reas de servicio. Garages internos con control de acceso.\\n\\nBENEFICIOS:\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del IVA \"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#363636\",\"bold\":true},\"insert\":\"POSIBILIDAD DE FINANCIACI\u00d3N A TRAV\u00c9S DEL BHU O CUALQUIER BANCO DE PLAZA.\"},{\"insert\":\"\\n\"}]}",
      "link": null,
      "crm_id": "252c01d3-682b-4fee-bf47-4035d155a837",
      "departamento": 10,
      "barrios_id": 16,
      "showrooms_id": 8,
      "marcas_id": 1,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Mart\u00edn Garc\u00eda 1618 esq. L. Terra (Frente al Mam)",
      "lat": "-34.88825",
      "lng": "-56.18397",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/lxlbv\/ljvi\/",
      "active": 1,
      "pos": 1400,
      "created_at": "2018-08-23 01:05:57",
      "updated_at": "2022-07-29 18:15:58",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvrzrvW.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvrzrvW.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvrzrvW.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvrzrvW.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/6\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/altos-del-libertador",
      "medias": [{
        "id": 1560,
        "group": "portada",
        "url": "Rpo9VgB.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-10-31 18:50:02",
        "updated_at": "2018-10-31 18:50:03",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo9VgB.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo9VgB.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo9VgB.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo9VgB.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo9VgB.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1376,
        "group": "logo",
        "url": "OvrzrvW.png",
        "extension": "png",
        "type": "image",
        "metas": "{\"attr_alt\":\"alt-prueba\"}",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-08-24 20:21:16",
        "updated_at": "2018-10-17 19:46:36",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvrzrvW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvrzrvW.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvrzrvW.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvrzrvW.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvrzrvW.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 1644,
        "group": "item",
        "url": "qg5rOvB.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-11-15 13:48:04",
        "updated_at": "2018-11-15 13:48:04",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5rOvB.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5rOvB.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5rOvB.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5rOvB.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5rOvB.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2173,
        "group": "galeria",
        "url": "Vg0R6Xp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-12-02 18:22:29",
        "updated_at": "2019-12-02 18:22:29",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Vg0R6Xp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Vg0R6Xp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Vg0R6Xp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Vg0R6Xp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Vg0R6Xp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1457,
        "group": "brochure",
        "url": "opjMyv3.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-10-08 20:56:57",
        "updated_at": "2018-10-08 20:56:57",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 2253,
        "group": "novedades_video",
        "url": "https:\/\/youtu.be\/xUcFIMTiVPc",
        "extension": "YT",
        "type": "video",
        "metas": "[]",
        "video_id": "xUcFIMTiVPc",
        "video_thumbnail": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2020-02-14 19:15:14",
        "updated_at": "2020-02-14 19:15:14",
        "icon": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "thumb": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "normal": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "large": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "extra": "http:\/\/i.ytimg.com\/vi\/xUcFIMTiVPc\/maxresdefault.jpg",
        "video": "https:\/\/www.altius.com.uy\/storage\/videos\/https:\/\/youtu.be\/xUcFIMTiVPc",
        "mime_type": "video\/YT"
      }, {
        "id": 1521,
        "group": "galeria",
        "url": "XZ3OYZy.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2018-10-23 20:00:48",
        "updated_at": "2021-06-21 20:09:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_XZ3OYZy.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_XZ3OYZy.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_XZ3OYZy.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_XZ3OYZy.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_XZ3OYZy.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1081,
        "group": "galeria",
        "url": "Mp6K1Z9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2018-08-23 23:43:07",
        "updated_at": "2018-11-12 19:45:48",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6K1Z9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6K1Z9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6K1Z9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6K1Z9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6K1Z9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1528,
        "group": "galeria",
        "url": "qZd6evN.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2018-10-23 20:00:52",
        "updated_at": "2021-06-21 20:09:32",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZd6evN.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZd6evN.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZd6evN.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZd6evN.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZd6evN.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1085,
        "group": "galeria",
        "url": "mvyakvV.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2018-08-23 23:43:09",
        "updated_at": "2018-12-02 18:34:41",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvyakvV.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvyakvV.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvyakvV.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvyakvV.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvyakvV.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1083,
        "group": "galeria",
        "url": "wv7QRZY.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2018-08-23 23:43:07",
        "updated_at": "2018-10-23 20:00:46",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7QRZY.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7QRZY.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7QRZY.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7QRZY.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7QRZY.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1520,
        "group": "galeria",
        "url": "lvn6Jv9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2018-10-23 20:00:47",
        "updated_at": "2018-10-23 20:00:48",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvn6Jv9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvn6Jv9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvn6Jv9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvn6Jv9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvn6Jv9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1519,
        "group": "galeria",
        "url": "apXxwpb.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2018-10-23 20:00:47",
        "updated_at": "2018-10-23 20:00:48",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_apXxwpb.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_apXxwpb.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_apXxwpb.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_apXxwpb.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_apXxwpb.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1523,
        "group": "galeria",
        "url": "4ZQnPg9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2018-10-23 20:00:49",
        "updated_at": "2020-01-16 15:02:46",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQnPg9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQnPg9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQnPg9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQnPg9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQnPg9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1524,
        "group": "galeria",
        "url": "JpOk1p9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2018-10-23 20:00:50",
        "updated_at": "2018-10-23 20:00:50",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_JpOk1p9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_JpOk1p9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_JpOk1p9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_JpOk1p9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_JpOk1p9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1529,
        "group": "galeria",
        "url": "Vg03lZM.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2018-10-23 20:00:56",
        "updated_at": "2020-01-16 15:02:46",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Vg03lZM.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Vg03lZM.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Vg03lZM.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Vg03lZM.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Vg03lZM.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1525,
        "group": "galeria",
        "url": "Pvm6JpD.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 14,
        "created_at": "2018-10-23 20:00:50",
        "updated_at": "2018-10-23 20:00:50",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Pvm6JpD.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Pvm6JpD.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Pvm6JpD.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Pvm6JpD.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Pvm6JpD.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1522,
        "group": "galeria",
        "url": "Pvl6dZW.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2018-10-23 20:00:48",
        "updated_at": "2019-12-02 18:22:28",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Pvl6dZW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Pvl6dZW.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Pvl6dZW.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Pvl6dZW.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Pvl6dZW.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1526,
        "group": "galeria",
        "url": "ApEPavb.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2018-10-23 20:00:51",
        "updated_at": "2018-10-23 20:00:51",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_ApEPavb.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_ApEPavb.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_ApEPavb.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_ApEPavb.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_ApEPavb.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2046,
        "group": "galeria",
        "url": "rZb3QRg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2019-09-11 17:16:00",
        "updated_at": "2020-02-14 19:10:03",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZb3QRg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZb3QRg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZb3QRg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZb3QRg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZb3QRg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2892,
        "group": "galeria",
        "url": "Wg9xjlZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 16,
        "created_at": "2021-06-21 20:04:52",
        "updated_at": "2021-06-21 20:04:52",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wg9xjlZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wg9xjlZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wg9xjlZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wg9xjlZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wg9xjlZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2893,
        "group": "galeria",
        "url": "NZwNqMp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 18,
        "created_at": "2021-06-21 20:04:53",
        "updated_at": "2021-06-21 20:04:53",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZwNqMp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZwNqMp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZwNqMp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZwNqMp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZwNqMp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2895,
        "group": "galeria",
        "url": "MgBaE0Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 20,
        "created_at": "2021-06-21 20:05:34",
        "updated_at": "2021-06-21 20:05:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBaE0Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBaE0Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBaE0Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBaE0Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBaE0Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2898,
        "group": "galeria",
        "url": "8ZNDmAv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 21,
        "created_at": "2021-06-21 20:05:36",
        "updated_at": "2021-06-21 20:05:36",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNDmAv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNDmAv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNDmAv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNDmAv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNDmAv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2891,
        "group": "galeria",
        "url": "yvWQ4zZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 6,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 23,
        "created_at": "2021-06-21 20:04:52",
        "updated_at": "2021-06-21 20:04:52",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yvWQ4zZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yvWQ4zZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yvWQ4zZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yvWQ4zZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yvWQ4zZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 1,
        "friendly_url": "altos-del-libertador",
        "name": "Altos del Libertador",
        "link_ext": null,
        "active": 1,
        "pos": 1000,
        "created_at": "2018-08-23 16:17:45",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1907,
          "group": "normal",
          "url": "MgBW6va.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Altos del Libertador\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 1,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:17:16",
          "updated_at": "2019-04-11 15:17:16",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBW6va.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBW6va.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBW6va.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBW6va.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBW6va.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 8,
        "friendly_url": "showroom-nostrum-bay",
        "name": "Showroom Nostrum Bay",
        "description": "Showroom con Apartamento Modelo.",
        "direccion": "La Paz esq. Julio Herrera y Obes",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bado de 10 a 19 hs",
        "lat": "-34.89971",
        "lng": "-56.195265",
        "active": 1,
        "pos": 1400,
        "created_at": "2018-08-23 01:11:06",
        "updated_at": "2022-07-29 18:15:58",
        "medias": [{
          "id": 1390,
          "group": "normal",
          "url": "rZbzdZM.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 8,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2018-08-24 20:28:04",
          "updated_at": "2018-08-24 20:28:04",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZbzdZM.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZbzdZM.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZbzdZM.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZbzdZM.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZbzdZM.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 15,
      "friendly_url": "nostrum-bay",
      "name": "Nostrum Bay",
      "description_aux": "Nostrum Bay ser\u00e1 un edificio ubicado en el barrio Centro, pr\u00f3ximo a la Bah\u00eda de Montevideo en la intersecci\u00f3n de las ramblas Franklin D. Roosevelt y Sud Am\u00e9rica, garantizando conectividad y proximidad a todos los servicios y equipamientos p\u00fablicos y privados.\n\nLa Torre en r\u00e9gimen de propiedad horizontal con destino a unidades de apartamentos se desarrolla en un subsuelo con garajes (opcionales) y \u00e1reas t\u00e9cnicas, una Planta Baja con amplio Hall de doble altura y un \u00e1rea destinada a 2 locales comerciales incluyendo sus respectivos entrepisos. \n\nSal\u00f3n recreativo incluyendo un gran espacio de esparcimiento al aire libre equipado con juegos infantiles\/m\u00e1quinas fitness y 22 niveles de 8 unidades por nivel. \n\n2 Salones de Usos M\u00faltiples con una amplia terraza jard\u00edn perimetral de expansi\u00f3n exterior y sol\u00e1rium en el nivel superior a 74 mts. de altura, teniendo la bah\u00eda a sus pies junto al Cerro de Montevideo, las vistas son muy privilegiadas dada la belleza del entorno. \n\nEl proyecto estar\u00e1 a cargo de los reconocidos arquitectos Carlos Ott y Carlos Ponce de Le\u00f3n.",
      "description": "{\"ops\":[{\"insert\":\"Nostrum Bay es un proyecto dise\u00f1ado por los reconocidos arquitectos Carlos Ott y Carlos Ponce de Le\u00f3n. Obtuvo el primer puesto en 5 diferentes categor\u00edas, en la 26\u00b0 edici\u00f3n del \\\"International Property Awards Architecture 2017-2018\\\"\\n\\nNostrum Bay se ubica en el barrio Centro, pr\u00f3ximo a la Bah\u00eda de Montevideo en la intersecci\u00f3n de las ramblas Franklin D. Roosevelt y Sud Am\u00e9rica, garantizando conectividad y proximidad a todos los servicios y equipamientos p\u00fablicos y privados.\\n\\nLa Torre de 26 pisos en r\u00e9gimen de propiedad horizontal con destino a unidades de apartamentos, se desarrolla en un subsuelo con garajes (opcionales) y \u00e1reas t\u00e9cnicas, una Planta Baja con amplio Hall de doble altura y un \u00e1rea destinada a 2 locales comerciales incluyendo sus respectivos entrepisos.\\n\\nSal\u00f3n recreativo incluyendo un gran espacio de esparcimiento al aire libre equipado con juegos infantiles y m\u00e1quinas fitness.\\n\\n2 Salones de Usos M\u00faltiples con una amplia terraza jard\u00edn perimetral de expansi\u00f3n exterior y sol\u00e1rium en el nivel superior a 74 mts. de altura, teniendo la bah\u00eda a sus pies junto al Cerro de Montevideo, las vistas son muy privilegiadas dada la belleza del entorno.\\n\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"El proyecto se encuentra amparado por la ley de vivienda promovida Ley 18.795 por lo que cuenta con:\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del IVA\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n de IRAE\/IRPF a las rentas generadas de los alquileres por 10 a\u00f1os\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del Impuesto al Patrimonio por 10 a\u00f1os\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#363636\",\"bold\":true},\"insert\":\"POSIBILIDAD DE FINANCIACI\u00d3N A TRAV\u00c9S DEL BHU O CUALQUIER BANCO DE PLAZA.\"},{\"insert\":\"\\n\\n\"}]}",
      "link": "https:\/\/www.altius.com.uy\/360\/360_bay\/index.html",
      "crm_id": "93f2f23a-4cae-4939-97f5-1b498a170d80",
      "departamento": 10,
      "barrios_id": 11,
      "showrooms_id": 8,
      "marcas_id": 2,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Nostrum Bay ser\u00e1 un edificio ubicado en el barrio Centro, pr\u00f3ximo a la Bah\u00eda de Montevideo en la intersecci\u00f3n de las ramblas Franklin D. Roosevelt y Sud Am\u00e9rica, garantizando conectividad y proximidad a todos los servicios y equipamientos p\u00fablicos y privados.",
      "lat": "-34.89971",
      "lng": "-56.195265",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/lxlbv\/iiuw\/",
      "active": 1,
      "pos": 2800,
      "created_at": "2018-08-23 01:05:58",
      "updated_at": "2022-07-29 18:15:58",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av40AvW.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av40AvW.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av40AvW.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av40AvW.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/15\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/nostrum-bay",
      "medias": [{
        "id": 1382,
        "group": "logo",
        "url": "Av40AvW.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-08-24 20:25:17",
        "updated_at": "2018-09-03 18:47:50",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av40AvW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av40AvW.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av40AvW.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av40AvW.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av40AvW.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 1459,
        "group": "brochure",
        "url": "dg2OEvV.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2018-10-08 20:57:25",
        "updated_at": "2018-10-08 20:57:25",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 3258,
        "group": "novedades_video",
        "url": "https:\/\/youtu.be\/g3xiQTWlq3I",
        "extension": "YT",
        "type": "video",
        "metas": "[]",
        "video_id": "g3xiQTWlq3I",
        "video_thumbnail": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-08-22 14:35:03",
        "updated_at": "2022-08-22 14:35:03",
        "icon": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "thumb": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "normal": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "large": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "extra": "http:\/\/i.ytimg.com\/vi\/g3xiQTWlq3I\/maxresdefault.jpg",
        "video": "https:\/\/www.altius.com.uy\/storage\/videos\/https:\/\/youtu.be\/g3xiQTWlq3I",
        "mime_type": "video\/YT"
      }, {
        "id": 2805,
        "group": "item",
        "url": "NZwN8Mp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-05-20 13:33:35",
        "updated_at": "2021-05-20 13:33:35",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZwN8Mp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZwN8Mp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZwN8Mp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZwN8Mp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZwN8Mp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2806,
        "group": "galeria",
        "url": "1ZJqGjp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-05-20 13:33:35",
        "updated_at": "2021-05-20 13:33:35",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_1ZJqGjp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_1ZJqGjp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_1ZJqGjp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_1ZJqGjp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_1ZJqGjp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3065,
        "group": "portada",
        "url": "XZ39YJv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-04-04 15:00:57",
        "updated_at": "2022-04-04 15:00:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_XZ39YJv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_XZ39YJv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_XZ39YJv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_XZ39YJv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_XZ39YJv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2829,
        "group": "galeria",
        "url": "Vg0RQ7p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2021-05-24 12:55:06",
        "updated_at": "2021-05-24 12:55:06",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Vg0RQ7p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Vg0RQ7p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Vg0RQ7p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Vg0RQ7p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Vg0RQ7p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2818,
        "group": "galeria",
        "url": "wgkRVjZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2021-05-20 13:33:40",
        "updated_at": "2021-05-24 12:55:06",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wgkRVjZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wgkRVjZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wgkRVjZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wgkRVjZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wgkRVjZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2830,
        "group": "galeria",
        "url": "DpA1V8p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2021-05-24 12:55:06",
        "updated_at": "2021-05-24 12:55:06",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_DpA1V8p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_DpA1V8p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_DpA1V8p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_DpA1V8p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_DpA1V8p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2831,
        "group": "galeria",
        "url": "jp8xyzp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2021-05-24 12:55:06",
        "updated_at": "2021-05-24 12:55:06",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_jp8xyzp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_jp8xyzp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_jp8xyzp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_jp8xyzp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_jp8xyzp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2817,
        "group": "galeria",
        "url": "OvaXVXg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2021-05-20 13:33:39",
        "updated_at": "2021-05-24 13:01:25",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvaXVXg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvaXVXg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvaXVXg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvaXVXg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvaXVXg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3038,
        "group": "galeria",
        "url": "Av4WDKg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av4WDKg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av4WDKg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av4WDKg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av4WDKg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av4WDKg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3042,
        "group": "galeria",
        "url": "qZzOyGg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzOyGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzOyGg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzOyGg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzOyGg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzOyGg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3040,
        "group": "galeria",
        "url": "EvV26Qv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvV26Qv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvV26Qv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvV26Qv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvV26Qv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvV26Qv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3039,
        "group": "galeria",
        "url": "wv7V2Pg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7V2Pg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7V2Pg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7V2Pg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7V2Pg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7V2Pg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3037,
        "group": "galeria",
        "url": "Mp6k1kZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6k1kZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6k1kZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6k1kZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6k1kZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6k1kZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3041,
        "group": "galeria",
        "url": "mvyXydg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2022-02-22 11:45:08",
        "updated_at": "2022-02-22 11:45:08",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvyXydg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvyXydg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvyXydg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvyXydg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvyXydg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2807,
        "group": "galeria",
        "url": "MgBay0Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2021-05-20 13:33:35",
        "updated_at": "2022-02-22 11:47:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBay0Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBay0Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBay0Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBay0Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBay0Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2833,
        "group": "galeria",
        "url": "yZGoVnZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2021-05-24 12:58:51",
        "updated_at": "2022-02-22 11:47:27",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yZGoVnZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yZGoVnZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yZGoVnZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yZGoVnZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yZGoVnZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3044,
        "group": "galeria",
        "url": "qg5Vj5v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 14,
        "created_at": "2022-02-22 11:45:13",
        "updated_at": "2022-02-22 11:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5Vj5v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5Vj5v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5Vj5v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5Vj5v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5Vj5v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3045,
        "group": "galeria",
        "url": "4veWYmZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 15,
        "created_at": "2022-02-22 11:45:13",
        "updated_at": "2022-02-22 11:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4veWYmZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4veWYmZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4veWYmZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4veWYmZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4veWYmZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3050,
        "group": "galeria",
        "url": "1ZJqdJp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 16,
        "created_at": "2022-02-22 11:45:16",
        "updated_at": "2022-02-22 11:45:16",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_1ZJqdJp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_1ZJqdJp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_1ZJqdJp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_1ZJqdJp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_1ZJqdJp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2901,
        "group": "galeria",
        "url": "4veW4xZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 17,
        "created_at": "2021-06-22 15:24:26",
        "updated_at": "2022-02-22 11:45:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4veW4xZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4veW4xZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4veW4xZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4veW4xZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4veW4xZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3046,
        "group": "galeria",
        "url": "rZb3P9g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 18,
        "created_at": "2022-02-22 11:45:13",
        "updated_at": "2022-02-22 11:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZb3P9g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZb3P9g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZb3P9g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZb3P9g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZb3P9g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3043,
        "group": "galeria",
        "url": "5vKnd9g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 19,
        "created_at": "2022-02-22 11:45:13",
        "updated_at": "2022-02-22 11:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_5vKnd9g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_5vKnd9g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_5vKnd9g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_5vKnd9g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_5vKnd9g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3047,
        "group": "galeria",
        "url": "yvWQGWZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 20,
        "created_at": "2022-02-22 11:45:13",
        "updated_at": "2022-02-22 11:45:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yvWQGWZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yvWQGWZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yvWQGWZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yvWQGWZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yvWQGWZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3048,
        "group": "galeria",
        "url": "Wg9xabZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 21,
        "created_at": "2022-02-22 11:45:14",
        "updated_at": "2022-02-22 11:45:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wg9xabZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wg9xabZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wg9xabZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wg9xabZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wg9xabZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3049,
        "group": "galeria",
        "url": "NZwNymp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 15,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 22,
        "created_at": "2022-02-22 11:45:15",
        "updated_at": "2022-02-22 11:45:15",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZwNymp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZwNymp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZwNymp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZwNymp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZwNymp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 2,
        "friendly_url": "nostrum",
        "name": "Nostrum",
        "link_ext": null,
        "active": 1,
        "pos": 1200,
        "created_at": "2018-08-23 16:18:28",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1908,
          "group": "normal",
          "url": "6ZP89Za.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Nostrum\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 2,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:18:11",
          "updated_at": "2019-04-11 15:18:11",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZP89Za.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZP89Za.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZP89Za.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZP89Za.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZP89Za.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 8,
        "friendly_url": "showroom-nostrum-bay",
        "name": "Showroom Nostrum Bay",
        "description": "Showroom con Apartamento Modelo.",
        "direccion": "La Paz esq. Julio Herrera y Obes",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bado de 10 a 19 hs",
        "lat": "-34.89971",
        "lng": "-56.195265",
        "active": 1,
        "pos": 1400,
        "created_at": "2018-08-23 01:11:06",
        "updated_at": "2022-07-29 18:15:58",
        "medias": [{
          "id": 1390,
          "group": "normal",
          "url": "rZbzdZM.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 8,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2018-08-24 20:28:04",
          "updated_at": "2018-08-24 20:28:04",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZbzdZM.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZbzdZM.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZbzdZM.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZbzdZM.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZbzdZM.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 21,
      "friendly_url": "nostrum-central",
      "name": "Nostrum Central",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"EN UNA ZONA C\u00c9NTRICA EN PLENO PROCESO DE REVITALIZACI\u00d3N URBANA, SURGE NOSTRUM CENTRAL, UNA TORRE PENSADA PARA LA PRACTICIDAD, QUE TE PERMITIR\u00c1 MAXIMIZAR TU INVERSI\u00d3N.\\n\\nNostrum Central es una propuesta proyectual innovadora de Carlos Ott en asociaci\u00f3n con Carlos Ponce de Le\u00f3n Arquitectos.\\n\\nLa torre prioriza el acceso vehicular, as\u00ed como un \u00f3ptimo acceso al transporte y a los servicios, tanto p\u00fablicos como privados. Un enclave de excelencia, en inmediata comunicaci\u00f3n con las principales arterias de v\u00eda r\u00e1pida de la ciudad, con el puerto de Montevideo y el coraz\u00f3n de Ciudad Vieja.\\nCon una tipolog\u00eda en esquina y pr\u00f3ximo a la bah\u00eda de Montevideo, Nostrum Central te ofrece excepcionales vistas abiertas al R\u00edo de la Plata, tanto hacia el oeste como hacia el este. Un gran proyecto en sinton\u00eda con el r\u00edo ancho como mar.\\n\\nUna torre de 13 niveles con unidades de uno, dos y tres dormitorios, con terminaciones de calidad y dise\u00f1o contempor\u00e1neo.\\n\\nMateriales, equipamiento y amenities que ponen la calidad al servicio de tu disfrute y confort cotidianos.\\n\\nLa torre contar\u00e1n con:\\n- Lobby de acceso con mobiliario contempor\u00e1neo\\n- Ascensores de \u00faltima generaci\u00f3n\\n- WiFi en \u00e1reas comunes\\n- Control de acceso con tarjeta codificada\\n- CCTV\\n- Unidades con cerradura digital\\n- Juegos exteriores para ni\u00f1os\\n- Equipamiento de Fitness\\n- Multicancha\\n- Salones de Usos M\u00faltiples (con mobiliario para espacio de Co-Work) \\n- Pet Garden\\n- Accesibilidad universal\\n- Grupo electr\u00f3geno\\n- Bicicleteros opcionales\\n- Garages opcionales\\n\\nEl proyecto se encuentra amparado por la ley de vivienda promovida Ley 18.795 por lo que contar\u00e1 con:\\n\\n- Exoneraci\u00f3n del IVA\\n- Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\\n- Exoneraci\u00f3n de IRAE\/IRPF a las rentas generadas de los alquileres por 10 a\u00f1os seg\u00fan Normativa vigente al 1\/9\/2019\\n- Exoneraci\u00f3n del Impuesto al Patrimonio por 10 a\u00f1os\\n\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"POSIBILIDAD DE FINANCIAMIENTO A TRAV\u00c9S DE CUALQUIER BANCO DE PLAZA.\"},{\"insert\":\"\\n\\n\"}]}",
      "link": "https:\/\/www.altius.com.uy\/360\/360_central2\/index.html",
      "crm_id": "9770d936-a64a-42d8-8d27-7b5da054da7a",
      "departamento": 10,
      "barrios_id": 11,
      "showrooms_id": 17,
      "marcas_id": 2,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Paraguay esq. La Paz",
      "lat": "-34.899601",
      "lng": "-56.193092",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/lxlbv\/tzyl\/",
      "active": 1,
      "pos": 3003,
      "created_at": "2019-10-01 12:43:24",
      "updated_at": "2022-07-29 18:16:15",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_dg24Yjp.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_dg24Yjp.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_dg24Yjp.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_dg24Yjp.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/21\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/nostrum-central",
      "medias": [{
        "id": 2059,
        "group": "logo",
        "url": "dg24Yjp.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 12:43:25",
        "updated_at": "2019-10-01 12:43:25",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_dg24Yjp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_dg24Yjp.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_dg24Yjp.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_dg24Yjp.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_dg24Yjp.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 2060,
        "group": "item",
        "url": "Rpo4LXZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 12:46:49",
        "updated_at": "2019-10-01 12:46:49",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo4LXZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo4LXZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo4LXZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo4LXZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo4LXZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2062,
        "group": "galeria",
        "url": "wgkRj3Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:02:04",
        "updated_at": "2019-10-01 13:02:04",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wgkRj3Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wgkRj3Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wgkRj3Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wgkRj3Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wgkRj3Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2079,
        "group": "portada",
        "url": "zZqr4Lg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:22:04",
        "updated_at": "2019-10-01 13:22:04",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_zZqr4Lg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_zZqr4Lg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_zZqr4Lg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_zZqr4Lg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_zZqr4Lg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2126,
        "group": "brochure",
        "url": "ApE0kev.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-11-04 17:16:50",
        "updated_at": "2019-11-04 17:16:50",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 3257,
        "group": "novedades_video",
        "url": "https:\/\/youtu.be\/srV2pRL1vJM",
        "extension": "YT",
        "type": "video",
        "metas": "[]",
        "video_id": "srV2pRL1vJM",
        "video_thumbnail": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-08-22 14:23:09",
        "updated_at": "2022-08-22 14:23:09",
        "icon": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "thumb": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "normal": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "large": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "extra": "http:\/\/i.ytimg.com\/vi\/srV2pRL1vJM\/maxresdefault.jpg",
        "video": "https:\/\/www.altius.com.uy\/storage\/videos\/https:\/\/youtu.be\/srV2pRL1vJM",
        "mime_type": "video\/YT"
      }, {
        "id": 2061,
        "group": "galeria",
        "url": "OvaXqbg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2019-10-01 13:02:02",
        "updated_at": "2019-10-01 13:02:02",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvaXqbg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvaXqbg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvaXqbg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvaXqbg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvaXqbg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2072,
        "group": "galeria",
        "url": "qZdXbmZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2019-10-01 13:02:16",
        "updated_at": "2019-10-01 13:02:16",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZdXbmZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZdXbmZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZdXbmZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZdXbmZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZdXbmZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2065,
        "group": "galeria",
        "url": "XZ394kv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2019-10-01 13:02:05",
        "updated_at": "2019-10-01 13:02:05",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_XZ394kv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_XZ394kv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_XZ394kv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_XZ394kv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_XZ394kv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2069,
        "group": "galeria",
        "url": "PvmPmPg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2019-10-01 13:02:07",
        "updated_at": "2019-10-01 13:02:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvmPmPg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvmPmPg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvmPmPg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvmPmPg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_PvmPmPg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2063,
        "group": "galeria",
        "url": "apXBL3g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2019-10-01 13:02:05",
        "updated_at": "2019-10-01 13:02:05",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_apXBL3g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_apXBL3g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_apXBL3g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_apXBL3g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_apXBL3g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2064,
        "group": "galeria",
        "url": "lvnoRjp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2019-10-01 13:02:05",
        "updated_at": "2019-10-01 13:02:05",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvnoRjp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvnoRjp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvnoRjp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvnoRjp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvnoRjp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2070,
        "group": "galeria",
        "url": "ApE0o8v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2019-10-01 13:02:13",
        "updated_at": "2019-10-01 13:02:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_ApE0o8v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_ApE0o8v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_ApE0o8v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_ApE0o8v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_ApE0o8v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2067,
        "group": "galeria",
        "url": "4ZQzNGg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2019-10-01 13:02:07",
        "updated_at": "2019-10-01 13:02:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQzNGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQzNGg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQzNGg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQzNGg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQzNGg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2068,
        "group": "galeria",
        "url": "JpO6PNv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2019-10-01 13:02:07",
        "updated_at": "2019-10-01 13:02:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_JpO6PNv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_JpO6PNv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_JpO6PNv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_JpO6PNv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_JpO6PNv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2075,
        "group": "galeria",
        "url": "jp8xBRp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2019-10-01 13:02:20",
        "updated_at": "2019-10-01 13:02:20",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_jp8xBRp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_jp8xBRp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_jp8xBRp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_jp8xBRp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_jp8xBRp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2071,
        "group": "galeria",
        "url": "qpx2OOg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2019-10-01 13:02:14",
        "updated_at": "2019-10-01 13:02:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qpx2OOg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qpx2OOg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qpx2OOg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qpx2OOg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qpx2OOg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2066,
        "group": "galeria",
        "url": "Pvl1GQp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 21,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2019-10-01 13:02:07",
        "updated_at": "2019-10-01 13:02:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Pvl1GQp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Pvl1GQp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Pvl1GQp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Pvl1GQp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Pvl1GQp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 2,
        "friendly_url": "nostrum",
        "name": "Nostrum",
        "link_ext": null,
        "active": 1,
        "pos": 1200,
        "created_at": "2018-08-23 16:18:28",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1908,
          "group": "normal",
          "url": "6ZP89Za.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Nostrum\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 2,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:18:11",
          "updated_at": "2019-04-11 15:18:11",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZP89Za.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZP89Za.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZP89Za.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZP89Za.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZP89Za.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 17,
        "friendly_url": "showroom-nostrum-central",
        "name": "Showroom Nostrum Central",
        "description": "Direcci\u00f3n del proyecto: Paraguay esq. La Paz . Con apartamento modelo.",
        "direccion": "La Paz 1024 esq. Julio H y Obes",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bados de 10 a 19 hrs.",
        "lat": "-34.89896",
        "lng": "-56.19560",
        "active": 1,
        "pos": 1600,
        "created_at": "2021-03-29 15:45:15",
        "updated_at": "2022-07-29 18:16:15",
        "medias": [{
          "id": 2747,
          "group": "normal",
          "url": "yvWQaRZ.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 17,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2021-03-29 15:46:38",
          "updated_at": "2021-03-29 15:46:38",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yvWQaRZ.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yvWQaRZ.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yvWQaRZ.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yvWQaRZ.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yvWQaRZ.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 18,
      "friendly_url": "nostrum-malvin",
      "name": "Nostrum Malv\u00edn",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"Nostrum Malv\u00edn es un Proyecto Residencial ubicado en el barrio Malv\u00edn, un sector de la ciudad caracterizado por sus excepcionales servicios y calidades urbanas\"},{\"attributes\":{\"color\":\"#222222\"},\"insert\":\".\"},{\"insert\":\"\\n\\nLocalizado estrat\u00e9gicamente en un \u00e1rea de transformaci\u00f3n urbana, con gran desarrollo edilicio, de servicios y comercial de la zona Este de Montevideo, a solo veinte minutos del centro de la ciudad. \\n\\nSu ubicaci\u00f3n sobre Av. Italia esq. Candelaria, le confiere la mejor cobertura de transporte, equipamientos urbanos y servicios privados del pa\u00eds. \\nEstos atributos sumados a la propuesta de valor, dise\u00f1o y calidad arquitect\u00f3nica, convierten a Nostrum Malv\u00edn en el nuevo hito residencial de la zona. \\n\\nNostrum Malv\u00edn es una propuesta proyectual innovadora de Carlos Ott en asociaci\u00f3n con Carlos Ponce de Le\u00f3n Arquitectos, a las condicionantes urbanas del predio, sobre un eje principal de la ciudad, mediante la altura y ocupaci\u00f3n de suelo, un programa residencial diferencial para Montevideo y su enclave singular.\\n\\n\"},{\"attributes\":{\"color\":\"#222222\",\"bold\":true},\"insert\":\"Recibi\u00f3 el premio 5 estrellas a mejor residencia m\u00faltiple en Uruguay en la 27 \u00b0 edici\u00f3n del International Property Awards Architecture 2018-2019, \"},{\"attributes\":{\"color\":\"#222222\"},\"insert\":\"organizaci\u00f3n que a\u00f1o a a\u00f1o se encarga de reconocer los proyectos con m\u00e1s valor arquitect\u00f3nico a nivel mundial.\"},{\"insert\":\"\\n\\nLas torres en R\u00e9gimen de Propiedad Horizontal est\u00e1n desarrolladas en un basamento de 6 niveles (altura 16.5 mt), que ocupa todo el frente de Av. Italia entre las calles Erev\u00e1n y Candelaria y se escalona hacia el norte con los predios linderos. Sobre el basamento en las esquinas, se elevan 2 Torres de 47.5 mt y 37 mt de altura.\\n\\nEl proyecto contar\u00e1 con unidades Monoambiente, 1, 2 y 3 dormitorios. \\n\\nEl proyecto cuenta con un \"},{\"attributes\":{\"bold\":true},\"insert\":\"innovador sistema\"},{\"insert\":\" llamado \"},{\"attributes\":{\"bold\":true},\"insert\":\"lock-off\"},{\"insert\":\" en tipolog\u00edas de 3 dormitorios. Dicha tipolog\u00eda\/distribuci\u00f3n permite a los propietarios de los apartamentos de 3 dormitorios convertirlos en dos apartamentos independientes, uno de 2 dormitorios y el otro en un monoambiente, pudiendo el propietario utilizar el espacio que necesita y alquilar el otro generando un ingreso adicional.\\n\\nLas torres contar\u00e1n con los siguientes amenities:\\n\\n-Hall de doble altura con mobiliario contempor\u00e1neo\\n-Previsi\u00f3n para porter\u00eda\\n-Seguridad a trav\u00e9s de CCTV\\n-Control de acceso con tarjeta magn\u00e9tica\\n-Unidades con cerradura digital\\n-Gimnasio\\n-Equipamiento fitness exterior\\n-Juegos para ni\u00f1os\\n-Parrilleros exteriores pergolados\\n-2 Sums equipados con parrilleros y cocina integrada\\n-Espacio co-work \\n-Pet Garden\\n-Zen Garden\\n\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"El proyecto se encuentra amparado por la ley de vivienda promovida Ley 18.795 por lo que contar\u00e1 con:\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del IVA\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n de IRAE\/IRPF a las rentas generadas de los alquileres por 10 a\u00f1os seg\u00fan Normativa vigente al 1\/9\/2019\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#666666\"},\"insert\":\"Exoneraci\u00f3n del Impuesto al Patrimonio por 10 a\u00f1os\"},{\"attributes\":{\"list\":\"bullet\"},\"insert\":\"\\n\"},{\"insert\":\"\\n\"}]}",
      "link": "https:\/\/www.altius.com.uy\/360\/360_MALVIN\/index.html",
      "crm_id": "873f628f-de4c-44c9-b243-590564829fcb",
      "departamento": 10,
      "barrios_id": 14,
      "showrooms_id": 12,
      "marcas_id": 2,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Av. Italia 4541 esq. Candelaria",
      "lat": "-34.886969",
      "lng": "-56.111490",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/rxont\/awld\/",
      "active": 1,
      "pos": 3001,
      "created_at": "2019-05-03 17:31:49",
      "updated_at": "2022-07-29 18:17:06",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvleEpW.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvleEpW.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvleEpW.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvleEpW.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/18\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/nostrum-malvin",
      "medias": [{
        "id": 1920,
        "group": "item",
        "url": "lvnwap9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-03 17:31:50",
        "updated_at": "2019-05-03 17:31:50",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvnwap9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvnwap9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvnwap9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvnwap9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvnwap9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 1922,
        "group": "logo",
        "url": "PvleEpW.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-03 17:50:27",
        "updated_at": "2019-05-03 17:50:28",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvleEpW.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvleEpW.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvleEpW.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvleEpW.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_PvleEpW.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 1923,
        "group": "portada",
        "url": "4ZQGxv9.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-05-03 17:59:34",
        "updated_at": "2019-05-03 17:59:34",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQGxv9.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQGxv9.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQGxv9.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQGxv9.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQGxv9.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3002,
        "group": "brochure",
        "url": "rZb3k9g.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-10-07 12:45:37",
        "updated_at": "2021-10-07 12:45:37",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 3293,
        "group": "novedades_video",
        "url": "https:\/\/youtu.be\/RrwF62xmVAo",
        "extension": "YT",
        "type": "video",
        "metas": "[]",
        "video_id": "RrwF62xmVAo",
        "video_thumbnail": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-10-21 18:37:36",
        "updated_at": "2022-10-21 18:37:36",
        "icon": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "thumb": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "normal": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "large": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "extra": "http:\/\/i.ytimg.com\/vi\/RrwF62xmVAo\/maxresdefault.jpg",
        "video": "https:\/\/www.altius.com.uy\/storage\/videos\/https:\/\/youtu.be\/RrwF62xmVAo",
        "mime_type": "video\/YT"
      }, {
        "id": 2015,
        "group": "galeria",
        "url": "dg244jp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-08-22 19:30:21",
        "updated_at": "2019-08-22 19:30:21",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_dg244jp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_dg244jp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_dg244jp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_dg244jp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_dg244jp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2024,
        "group": "galeria",
        "url": "JpO6qNv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2019-08-22 19:30:24",
        "updated_at": "2019-08-22 19:30:24",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_JpO6qNv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_JpO6qNv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_JpO6qNv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_JpO6qNv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_JpO6qNv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2022,
        "group": "galeria",
        "url": "Pvl11Qp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2019-08-22 19:30:24",
        "updated_at": "2019-08-22 19:30:24",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Pvl11Qp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Pvl11Qp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Pvl11Qp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Pvl11Qp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Pvl11Qp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2019,
        "group": "galeria",
        "url": "apXBB3g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2019-08-22 19:30:22",
        "updated_at": "2019-08-22 19:30:22",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_apXBB3g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_apXBB3g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_apXBB3g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_apXBB3g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_apXBB3g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2017,
        "group": "galeria",
        "url": "OvaXXbg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2019-08-22 19:30:22",
        "updated_at": "2019-08-22 19:30:22",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvaXXbg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvaXXbg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvaXXbg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvaXXbg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvaXXbg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2952,
        "group": "galeria",
        "url": "6ZPYn1g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2021-09-01 18:11:11",
        "updated_at": "2021-09-01 18:11:11",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZPYn1g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZPYn1g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZPYn1g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZPYn1g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZPYn1g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2016,
        "group": "galeria",
        "url": "Rpo44XZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2019-08-22 19:30:21",
        "updated_at": "2019-08-22 19:30:21",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo44XZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo44XZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo44XZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo44XZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo44XZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2951,
        "group": "galeria",
        "url": "MgBaJlZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2021-09-01 18:11:05",
        "updated_at": "2021-09-01 18:11:06",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBaJlZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBaJlZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBaJlZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBaJlZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBaJlZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2023,
        "group": "galeria",
        "url": "4ZQzzGg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2019-08-22 19:30:24",
        "updated_at": "2019-08-22 19:30:24",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQzzGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQzzGg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQzzGg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQzzGg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQzzGg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2953,
        "group": "galeria",
        "url": "VpRBljp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2021-09-01 18:11:11",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRBljp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRBljp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRBljp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRBljp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRBljp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2020,
        "group": "galeria",
        "url": "lvnoojp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2019-08-22 19:30:23",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvnoojp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvnoojp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvnoojp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvnoojp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvnoojp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2021,
        "group": "galeria",
        "url": "XZ399kv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2019-08-22 19:30:24",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_XZ399kv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_XZ399kv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_XZ399kv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_XZ399kv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_XZ399kv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2018,
        "group": "galeria",
        "url": "wgkRR3Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2019-08-22 19:30:22",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wgkRR3Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wgkRR3Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wgkRR3Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wgkRR3Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wgkRR3Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2139,
        "group": "galeria",
        "url": "wv7VaRg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2019-11-14 15:07:00",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7VaRg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7VaRg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7VaRg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7VaRg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7VaRg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2014,
        "group": "galeria",
        "url": "Wp155lp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 18,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 14,
        "created_at": "2019-08-22 19:30:21",
        "updated_at": "2021-09-01 18:19:45",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wp155lp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wp155lp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wp155lp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wp155lp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wp155lp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 2,
        "friendly_url": "nostrum",
        "name": "Nostrum",
        "link_ext": null,
        "active": 1,
        "pos": 1200,
        "created_at": "2018-08-23 16:18:28",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1908,
          "group": "normal",
          "url": "6ZP89Za.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Nostrum\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 2,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:18:11",
          "updated_at": "2019-04-11 15:18:11",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZP89Za.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZP89Za.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZP89Za.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZP89Za.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZP89Za.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 12,
        "friendly_url": "showroom-nostrum-malvin",
        "name": "Showroom Nostrum Malv\u00edn",
        "description": null,
        "direccion": "Av. Italia 4541 esq. Candelaria",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bado de 10 a 19 hs",
        "lat": "-34.886747",
        "lng": "-56.111458",
        "active": 1,
        "pos": 2000,
        "created_at": "2019-05-03 18:20:50",
        "updated_at": "2022-07-29 18:17:06",
        "medias": [{
          "id": 1924,
          "group": "normal",
          "url": "JpO07Z9.jpeg",
          "extension": "jpeg",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 12,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2019-05-03 18:20:51",
          "updated_at": "2019-05-03 18:20:51",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_JpO07Z9.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_JpO07Z9.jpeg",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_JpO07Z9.jpeg",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_JpO07Z9.jpeg",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_JpO07Z9.jpeg",
          "video": "",
          "mime_type": "image\/jpeg"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 22,
      "friendly_url": "nostrum-plaza-2",
      "name": "Nostrum Plaza 2",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"Nostrum Plaza 2 se ubicar\u00e1 en la zona de Tres Cruces, en la calle La Paz entre Defensa y Democracia, en un sector de gran evoluci\u00f3n reciente producto de nuevos proyectos residenciales, de importantes transformaciones en el espacio p\u00fablico y de la proximidad a grandes equipamientos y servicios de alcance nacional.\\n\\nLa torre proyectada en R\u00e9gimen de Propiedad Horizontal estar\u00e1 desarrollada mediante un volumen edificado con amplia fachada a la calle La Paz, orientaci\u00f3n Norte, lo que garantizar\u00e1 un asoleamiento e iluminaci\u00f3n natural durante todo el d\u00eda al conjunto.\\nAl interior de la manzana este volumen se articula con las nuevas construcciones linderas logrando una integraci\u00f3n de sus espacios exteriores y permitiendo a las unidades interiores con orientaci\u00f3n Este-Oeste disfrutar de la calma del patio central.\\n\\nEl programa residencial se compone de unidades de 1, 2 y 3 dormitorios, existiendo unidades de 2 y 3 dormitorios con parrilleros individuales.\\n\\nLas torres contar\u00e1n con:\\n-Lobby de doble altura con mobiliario contempor\u00e1neo.\\n-Unidades con cerradura digital\\n-Control de acceso con tarjeta codificada\\n-CCTV\\n-Espacio co-work\\n-Salas de reuniones\\n-WiFi en \u00e1reas comunes\\n-Multicancha\\n-Juegos para ni\u00f1os\\n-Gimnasio\\n-Equipamiento fitness\\n-Pet garden\\n-Salones de Usos M\u00faltiples con parrillero y cocina integrada\\n-Parrilleros exteriores pergolados\\n\\nEl proyecto se encuentra amparado por la ley de vivienda promovida, Ley 18.795 por lo que contar\u00e1 con:\\n\\n- Exoneraci\u00f3n del IVA\\n- Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\\n- Exoneraci\u00f3n de IRAE\/IRPF a las rentas generadas de los alquileres por 10 a\u00f1os seg\u00fan Normativa vigente al 1\/9\/2019\\n- Exoneraci\u00f3n del Impuesto al Patrimonio por 10 a\u00f1os\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"POSIBILIDAD DE FINANCIAMIENTO A TRAV\u00c9S DE CUALQUIER BANCO DE PLAZA\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"VISIT\u00c1 EL APTO MODELO DE 2 DORMITORIOS EN LA OBRA\"},{\"insert\":\"\\n\\n\"}]}",
      "link": "https:\/\/www.altius.com.uy\/360\/360_plaza2actualizado\/index.html",
      "crm_id": "8fd9b435-9e19-434f-a5a3-7036463cb8e0",
      "departamento": 10,
      "barrios_id": 8,
      "showrooms_id": 16,
      "marcas_id": 2,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "La Paz esq. Defensa",
      "lat": "-34.894448",
      "lng": "-56.174156",
      "fliphtml5": "https:\/\/online.fliphtml5.com\/rxont\/bdjy\/",
      "active": 1,
      "pos": 3004,
      "created_at": "2019-10-01 13:37:01",
      "updated_at": "2022-10-21 18:40:16",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_bgMOPlp.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_bgMOPlp.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_bgMOPlp.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_bgMOPlp.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/22\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/nostrum-plaza-2",
      "medias": [{
        "id": 2080,
        "group": "logo",
        "url": "bgMOPlp.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:37:01",
        "updated_at": "2019-10-01 13:37:01",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_bgMOPlp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_bgMOPlp.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_bgMOPlp.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_bgMOPlp.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_bgMOPlp.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 2081,
        "group": "item",
        "url": "Mp6kM9Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:37:02",
        "updated_at": "2019-10-01 13:37:02",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Mp6kM9Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Mp6kM9Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Mp6kM9Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Mp6kM9Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Mp6kM9Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2082,
        "group": "portada",
        "url": "Av4WNMg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:40:49",
        "updated_at": "2019-10-01 13:40:49",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Av4WNMg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Av4WNMg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Av4WNMg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Av4WNMg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Av4WNMg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2084,
        "group": "galeria",
        "url": "EvV2ONv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2019-10-01 13:57:14",
        "updated_at": "2019-10-01 13:57:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_EvV2ONv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_EvV2ONv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_EvV2ONv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_EvV2ONv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_EvV2ONv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3001,
        "group": "brochure",
        "url": "4veW3mZ.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2021-10-07 12:16:17",
        "updated_at": "2021-10-07 12:16:17",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 3294,
        "group": "novedades_video",
        "url": "https:\/\/youtu.be\/UtkCakTEPWM",
        "extension": "YT",
        "type": "video",
        "metas": "[]",
        "video_id": "UtkCakTEPWM",
        "video_thumbnail": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-10-21 18:40:16",
        "updated_at": "2022-10-21 18:40:16",
        "icon": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "thumb": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "normal": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "large": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "extra": "http:\/\/i.ytimg.com\/vi\/UtkCakTEPWM\/maxresdefault.jpg",
        "video": "https:\/\/www.altius.com.uy\/storage\/videos\/https:\/\/youtu.be\/UtkCakTEPWM",
        "mime_type": "video\/YT"
      }, {
        "id": 2087,
        "group": "galeria",
        "url": "5vKn8Gg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2019-10-01 13:57:17",
        "updated_at": "2019-10-01 13:57:17",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_5vKn8Gg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_5vKn8Gg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_5vKn8Gg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_5vKn8Gg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_5vKn8Gg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2083,
        "group": "galeria",
        "url": "wv7VPzg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2019-10-01 13:57:13",
        "updated_at": "2019-10-01 13:57:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wv7VPzg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wv7VPzg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wv7VPzg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wv7VPzg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wv7VPzg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2090,
        "group": "galeria",
        "url": "rZb35Rg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2019-10-01 13:57:18",
        "updated_at": "2019-10-01 13:57:18",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_rZb35Rg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_rZb35Rg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_rZb35Rg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_rZb35Rg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_rZb35Rg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2089,
        "group": "galeria",
        "url": "4veW14Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2019-10-01 13:57:18",
        "updated_at": "2019-10-01 13:57:18",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4veW14Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4veW14Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4veW14Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4veW14Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4veW14Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2091,
        "group": "galeria",
        "url": "yvWQq9Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2019-10-01 13:57:18",
        "updated_at": "2019-10-01 13:57:18",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_yvWQq9Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_yvWQq9Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_yvWQq9Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_yvWQq9Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_yvWQq9Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2092,
        "group": "galeria",
        "url": "Wg9xk6Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 6,
        "created_at": "2019-10-01 13:57:20",
        "updated_at": "2019-10-01 13:57:20",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Wg9xk6Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Wg9xk6Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Wg9xk6Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Wg9xk6Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Wg9xk6Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2085,
        "group": "galeria",
        "url": "mvyXDjg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2019-10-01 13:57:14",
        "updated_at": "2019-10-01 13:57:14",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_mvyXDjg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_mvyXDjg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_mvyXDjg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_mvyXDjg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_mvyXDjg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2086,
        "group": "galeria",
        "url": "qZzORrg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2019-10-01 13:57:17",
        "updated_at": "2019-10-01 13:57:17",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzORrg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzORrg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzORrg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzORrg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzORrg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2088,
        "group": "galeria",
        "url": "qg5VlQv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2019-10-01 13:57:17",
        "updated_at": "2019-10-01 13:57:17",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5VlQv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5VlQv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5VlQv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5VlQv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5VlQv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2675,
        "group": "galeria",
        "url": "jp8xrXp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2020-12-21 12:46:17",
        "updated_at": "2020-12-21 12:46:17",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_jp8xrXp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_jp8xrXp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_jp8xrXp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_jp8xrXp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_jp8xrXp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2095,
        "group": "galeria",
        "url": "MgBalnZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2019-10-01 13:57:21",
        "updated_at": "2019-10-01 13:57:21",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_MgBalnZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_MgBalnZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_MgBalnZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_MgBalnZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_MgBalnZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2674,
        "group": "galeria",
        "url": "DpA1Q9p.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2020-12-21 12:46:17",
        "updated_at": "2020-12-21 12:46:17",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_DpA1Q9p.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_DpA1Q9p.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_DpA1Q9p.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_DpA1Q9p.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_DpA1Q9p.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 2093,
        "group": "galeria",
        "url": "NZwN3yp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 22,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2019-10-01 13:57:20",
        "updated_at": "2019-10-01 13:57:20",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_NZwN3yp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_NZwN3yp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_NZwN3yp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_NZwN3yp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_NZwN3yp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 2,
        "friendly_url": "nostrum",
        "name": "Nostrum",
        "link_ext": null,
        "active": 1,
        "pos": 1200,
        "created_at": "2018-08-23 16:18:28",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1908,
          "group": "normal",
          "url": "6ZP89Za.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Nostrum\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 2,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:18:11",
          "updated_at": "2019-04-11 15:18:11",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZP89Za.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZP89Za.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZP89Za.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZP89Za.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZP89Za.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 16,
        "friendly_url": "nostrum-plaza-2",
        "name": "Nostrum Plaza 2",
        "description": "Con Apartamento Modelo.",
        "direccion": "Dr. Salvador Ferrer Serra 2025 esq. Defensa",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bados de 10 a 19 hrs.",
        "lat": "-34.895109",
        "lng": "-56.174094",
        "active": 1,
        "pos": 2400,
        "created_at": "2020-11-06 20:23:30",
        "updated_at": "2022-07-29 18:17:20",
        "medias": [{
          "id": 2616,
          "group": "normal",
          "url": "Rpo4AVZ.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 16,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2020-11-06 20:23:30",
          "updated_at": "2020-11-06 20:23:30",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo4AVZ.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo4AVZ.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo4AVZ.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo4AVZ.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo4AVZ.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }, 
    {
      "id": 25,
      "friendly_url": "nostrum-cordon",
      "name": "Nostrum Cord\u00f3n",
      "description_aux": null,
      "description": "{\"ops\":[{\"insert\":\"NOSTRUM CORD\u00d3N es una torre que abarca 3 frentes, ubic\u00e1ndose sobre la principal avenida de Montevideo, Av. 18 de Julio y las calles Pablo de Mar\u00eda y Coronel Brandsen.\\n\\nLa proximidad a las principales arterias de entrada y salida a la ciudad, as\u00ed como su cercan\u00eda a la principal terminal de \u00f3mnibus, universidades y centros educativos, hacen que Nostrum Cord\u00f3n sea un lugar \u00fanico, con fuerte impronta urbana, para vivir y conectarse con la ciudad.\\n\\nEl proyecto a cargo de los Estudios de reconocida trayectoria internacional, CARLOS OTT Arquitectos en asociaci\u00f3n con CARLOS PONCE de LEON Arquitectos, ofrece un dise\u00f1o de vanguardia en el coraz\u00f3n de la ciudad.\\n\\nLa torre en r\u00e9gimen de propiedad horizontal, con destino a unidades de apartamentos promovidos por la ANV a trav\u00e9s de la Ley 18.795, se desarrolla en planta baja, 12 niveles y penthouse, conformado por un n\u00facleo de circulaci\u00f3n vertical, adem\u00e1s de contar un subsuelo destinados a garajes y \u00e1reas t\u00e9cnicas.\\n\\nEl programa residencial se compone de unidades de apartamentos Monoambientes, 1, 2 dormitorios y 1 de 3 dormitorios.\\n\\nEl hall de acceso sobre la calle Pablo de Mar\u00eda, cuenta con una sala de reuniones, y se comunica con el n\u00facleo de circulaci\u00f3n vertical, el cual tiene 3 ascensores de \u00faltima generaci\u00f3n. A nivel de planta baja tambi\u00e9n se encuentra un local comercial de grandes dimensiones con acceso sobre la Avenida 18 de Julio.\\n\\nDentro de sus principales amenities podemos destacar:\\n-Previsi\u00f3n para porter\u00eda\\n-Ingreso con tarjeta magn\u00e9tica\\n-CCTV\\n-Unidades con cerradura digital\\n-Meeting Room\\n-Cowork\\n-Barbacoa con parrillero\\n-Gimnasio\\n-Equipamiento fitness exterior\\n-Juegos para ni\u00f1os\\n-Mini Cancha\\n\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\"},\"insert\":\"El proyecto se encuentra amparado por la ley de vivienda promovida Ley 18.795 por lo que contar\u00e1 con:\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\"},\"insert\":\"- Exoneraci\u00f3n del IVA\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\"},\"insert\":\"- Exoneraci\u00f3n del ITP (2% sobre el valor de catastro)\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\"},\"insert\":\"- Exoneraci\u00f3n de IRAE\/IRPF a las rentas generadas de los alquileres por 10 a\u00f1os seg\u00fan Normativa vigente al 1\/9\/2019\"},{\"insert\":\"\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\"},\"insert\":\"- Exoneraci\u00f3n del Impuesto al Patrimonio por 10 a\u00f1os\"},{\"insert\":\"\\n\\n\"},{\"attributes\":{\"color\":\"#0d0d0d\",\"bold\":true},\"insert\":\"POSIBILIDAD DE FINANCIAMIENTO A TRAV\u00c9S DE CUALQUIER BANCO DE PLAZA.\"},{\"insert\":\"\\n\"}]}",
      "link": "https:\/\/www.altius.com.uy\/360\/360_cordon\/index.html",
      "crm_id": "bc1f8f38-bfb7-4d79-9e19-7cba285544ba",
      "departamento": 10,
      "barrios_id": 1,
      "showrooms_id": 16,
      "marcas_id": 2,
      "unidades_id": 1,
      "selected": 0,
      "direccion": "Pablo de Mar\u00eda entre Coronel Brandsen y 18 de Julio",
      "lat": null,
      "lng": null,
      "fliphtml5": "https:\/\/online.fliphtml5.com\/rxont\/nslt\/?1666280689050",
      "active": 1,
      "pos": 3007,
      "created_at": "2022-06-02 16:06:20",
      "updated_at": "2022-11-18 18:08:36",
      "dpto_name": "Montevideo",
      "first_image": {
        "default": {
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQzrGg.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQzrGg.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQzrGg.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQzrGg.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/extra_default.png"
        }
      },
      "url": "proyectos\/25\/ficha",
      "full_url": "https:\/\/www.altius.com.uy\/proyectos\/nostrum-cordon",
      "medias": [{
        "id": 3123,
        "group": "logo",
        "url": "4ZQzrGg.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-06-03 14:10:28",
        "updated_at": "2022-06-03 14:10:28",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQzrGg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQzrGg.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQzrGg.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQzrGg.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQzrGg.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 3286,
        "group": "banner",
        "url": "qZzONNg.png",
        "extension": "png",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-09-29 20:27:13",
        "updated_at": "2022-09-29 20:27:13",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZzONNg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZzONNg.png",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZzONNg.png",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZzONNg.png",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZzONNg.png",
        "video": "",
        "mime_type": "image\/png"
      }, {
        "id": 3306,
        "group": "portada",
        "url": "1ZJqnPp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-11-18 15:05:26",
        "updated_at": "2022-11-18 15:05:26",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_1ZJqnPp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_1ZJqnPp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_1ZJqnPp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_1ZJqnPp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_1ZJqnPp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3308,
        "group": "item",
        "url": "6ZPYERg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-11-18 15:26:57",
        "updated_at": "2022-11-18 15:26:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZPYERg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZPYERg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZPYERg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZPYERg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZPYERg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3309,
        "group": "galeria",
        "url": "VpRBdnp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-11-18 15:26:57",
        "updated_at": "2022-11-18 15:26:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_VpRBdnp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_VpRBdnp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_VpRBdnp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_VpRBdnp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_VpRBdnp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3311,
        "group": "brochure",
        "url": "NZYnzwg.pdf",
        "extension": "pdf",
        "type": "document",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 0,
        "created_at": "2022-11-18 20:27:32",
        "updated_at": "2022-11-18 20:27:32",
        "icon": "",
        "thumb": "",
        "normal": "",
        "large": "",
        "extra": "",
        "video": "",
        "mime_type": "document\/pdf"
      }, {
        "id": 3310,
        "group": "galeria",
        "url": "8ZNDOLv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 1,
        "created_at": "2022-11-18 15:26:57",
        "updated_at": "2022-11-18 15:26:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZNDOLv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZNDOLv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZNDOLv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZNDOLv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZNDOLv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3271,
        "group": "galeria",
        "url": "qpx2Pbg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 2,
        "created_at": "2022-09-29 13:15:44",
        "updated_at": "2022-11-18 15:26:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qpx2Pbg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qpx2Pbg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qpx2Pbg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qpx2Pbg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qpx2Pbg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3268,
        "group": "galeria",
        "url": "JpO6x5v.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 3,
        "created_at": "2022-09-29 13:15:43",
        "updated_at": "2022-11-18 15:26:57",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_JpO6x5v.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_JpO6x5v.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_JpO6x5v.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_JpO6x5v.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_JpO6x5v.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3288,
        "group": "galeria",
        "url": "qg5Vekv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 4,
        "created_at": "2022-09-29 20:57:38",
        "updated_at": "2022-09-29 20:57:38",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5Vekv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5Vekv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5Vekv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5Vekv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5Vekv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3267,
        "group": "galeria",
        "url": "4ZQz02g.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2022-09-29 13:15:42",
        "updated_at": "2022-09-29 20:57:38",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4ZQz02g.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4ZQz02g.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4ZQz02g.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4ZQz02g.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4ZQz02g.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3276,
        "group": "galeria",
        "url": "OvrAbyg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 5,
        "created_at": "2022-09-29 13:16:07",
        "updated_at": "2022-09-29 13:16:07",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_OvrAbyg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_OvrAbyg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_OvrAbyg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_OvrAbyg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_OvrAbyg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3272,
        "group": "galeria",
        "url": "qZdXk7Z.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 7,
        "created_at": "2022-09-29 13:15:51",
        "updated_at": "2022-09-29 13:15:52",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qZdXk7Z.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qZdXk7Z.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qZdXk7Z.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qZdXk7Z.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qZdXk7Z.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3262,
        "group": "galeria",
        "url": "wgkRmbZ.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 8,
        "created_at": "2022-09-29 13:15:38",
        "updated_at": "2022-09-29 13:15:38",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_wgkRmbZ.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_wgkRmbZ.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_wgkRmbZ.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_wgkRmbZ.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_wgkRmbZ.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3273,
        "group": "galeria",
        "url": "Vg0REXp.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 9,
        "created_at": "2022-09-29 13:15:54",
        "updated_at": "2022-09-29 13:15:54",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Vg0REXp.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Vg0REXp.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Vg0REXp.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Vg0REXp.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Vg0REXp.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3265,
        "group": "galeria",
        "url": "XZ390jv.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 10,
        "created_at": "2022-09-29 13:15:41",
        "updated_at": "2022-09-29 13:15:41",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_XZ390jv.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_XZ390jv.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_XZ390jv.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_XZ390jv.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_XZ390jv.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3263,
        "group": "galeria",
        "url": "apXBJOg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 11,
        "created_at": "2022-09-29 13:15:40",
        "updated_at": "2022-09-29 13:15:40",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_apXBJOg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_apXBJOg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_apXBJOg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_apXBJOg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_apXBJOg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3269,
        "group": "galeria",
        "url": "PvmPxBg.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 12,
        "created_at": "2022-09-29 13:15:44",
        "updated_at": "2022-09-29 13:15:44",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_PvmPxBg.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_PvmPxBg.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_PvmPxBg.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_PvmPxBg.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_PvmPxBg.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }, {
        "id": 3264,
        "group": "galeria",
        "url": "lvnodep.jpeg",
        "extension": "jpeg",
        "type": "image",
        "metas": "[]",
        "video_id": "",
        "video_thumbnail": "",
        "mediable_id": 25,
        "mediable_type": "App\\Models\\Proyectos",
        "active": 1,
        "pos": 13,
        "created_at": "2022-09-29 13:15:41",
        "updated_at": "2022-09-29 13:15:41",
        "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_lvnodep.jpg",
        "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_lvnodep.jpeg",
        "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_lvnodep.jpeg",
        "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_lvnodep.jpeg",
        "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_lvnodep.jpeg",
        "video": "",
        "mime_type": "image\/jpeg"
      }],
      "marcas": {
        "id": 2,
        "friendly_url": "nostrum",
        "name": "Nostrum",
        "link_ext": null,
        "active": 1,
        "pos": 1200,
        "created_at": "2018-08-23 16:18:28",
        "updated_at": "2020-07-23 20:25:48",
        "medias": [{
          "id": 1908,
          "group": "normal",
          "url": "6ZP89Za.png",
          "extension": "png",
          "type": "image",
          "metas": "{\"attr_alt\":\"logo de Nostrum\"}",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 2,
          "mediable_type": "App\\Models\\Marcas",
          "active": 1,
          "pos": 0,
          "created_at": "2019-04-11 15:18:11",
          "updated_at": "2019-04-11 15:18:11",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_6ZP89Za.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_6ZP89Za.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_6ZP89Za.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_6ZP89Za.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_6ZP89Za.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "showrooms": {
        "id": 16,
        "friendly_url": "nostrum-plaza-2",
        "name": "Nostrum Plaza 2",
        "description": "Con Apartamento Modelo.",
        "direccion": "Dr. Salvador Ferrer Serra 2025 esq. Defensa",
        "telefono": "0800-8911 \/ WhatsApp 096424235",
        "horarios": "Lunes a S\u00e1bados de 10 a 19 hrs.",
        "lat": "-34.895109",
        "lng": "-56.174094",
        "active": 1,
        "pos": 2400,
        "created_at": "2020-11-06 20:23:30",
        "updated_at": "2022-07-29 18:17:20",
        "medias": [{
          "id": 2616,
          "group": "normal",
          "url": "Rpo4AVZ.png",
          "extension": "png",
          "type": "image",
          "metas": "[]",
          "video_id": "",
          "video_thumbnail": "",
          "mediable_id": 16,
          "mediable_type": "App\\Models\\Showrooms",
          "active": 1,
          "pos": 0,
          "created_at": "2020-11-06 20:23:30",
          "updated_at": "2020-11-06 20:23:30",
          "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_Rpo4AVZ.jpg",
          "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_Rpo4AVZ.png",
          "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_Rpo4AVZ.png",
          "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_Rpo4AVZ.png",
          "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_Rpo4AVZ.png",
          "video": "",
          "mime_type": "image\/png"
        }]
      },
      "etapas": []
    }];
      my_projects = null;
    let showrooms_without_projects = [{
    "id": 14,
    "friendly_url": "altius-life",
    "name": "Altius Life",
    "description": "Asesoramiento de todas las marcas:  Altos del Libertador, Nostrum, More y Bil\u00fa.",
    "direccion": "WTC | Torre 3 - 26 de Marzo esq. Dr. Luis Bonavita",
    "telefono": "0800-8911 \/ WhatsApp 096424235",
    "horarios": "Lunes a S\u00e1bado de 10 a 19 hs.",
    "lat": "-34.905437",
    "lng": "-56.135747",
    "active": 1,
    "pos": 400,
    "created_at": "2019-06-24 16:36:03",
    "updated_at": "2022-07-29 18:03:10",
    "medias": [{
      "id": 1954,
      "group": "normal",
      "url": "8ZND1Pv.png",
      "extension": "png",
      "type": "image",
      "metas": "[]",
      "video_id": "",
      "video_thumbnail": "",
      "mediable_id": 14,
      "mediable_type": "App\\Models\\Showrooms",
      "active": 1,
      "pos": 0,
      "created_at": "2019-06-24 16:36:03",
      "updated_at": "2019-06-24 16:36:03",
      "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_8ZND1Pv.jpg",
      "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_8ZND1Pv.png",
      "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_8ZND1Pv.png",
      "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_8ZND1Pv.png",
      "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_8ZND1Pv.png",
      "video": "",
      "mime_type": "image\/png"
    }]
  }, {
    "id": 13,
    "friendly_url": "showroom-more-buceo",
    "name": "Showroom More Buceo",
    "description": "Direcci\u00f3n Proyecto: Av. Rivera 4237 esq. Solano L\u00f3pez\r\n\r\n- Estamos atendiendo en nuestra Oficina de Ventas Altius Life",
    "direccion": "WTC- Torre 3 - 26 de Marzo esq. Dr. Luis Bonavita",
    "telefono": "0800-8911 \/ WhatsApp 096424235",
    "horarios": "Lunes a S\u00e1bado de 10 a 19 hs.",
    "lat": "-34.895749",
    "lng": "-56.122002",
    "active": 1,
    "pos": 1000,
    "created_at": "2019-05-20 13:08:17",
    "updated_at": "2022-04-18 13:50:50",
    "medias": [{
      "id": 1944,
      "group": "normal",
      "url": "qg5V95v.png",
      "extension": "png",
      "type": "image",
      "metas": "[]",
      "video_id": "",
      "video_thumbnail": "",
      "mediable_id": 13,
      "mediable_type": "App\\Models\\Showrooms",
      "active": 1,
      "pos": 0,
      "created_at": "2019-05-24 13:13:13",
      "updated_at": "2019-05-24 13:13:13",
      "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_qg5V95v.jpg",
      "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_qg5V95v.png",
      "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_qg5V95v.png",
      "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_qg5V95v.png",
      "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_qg5V95v.png",
      "video": "",
      "mime_type": "image\/png"
    }]
  }, {
    "id": 7,
    "friendly_url": "showroom-nostrum-dieciocho",
    "name": "Showroom Nostrum Dieciocho",
    "description": "Direcci\u00f3n del proyecto: 18 de Julio esq. Tacuaremb\u00f3 - Con Apartamentos Modelo de 3 Dormitorios.",
    "direccion": "Dr. Salvador Ferrer Serra 2025 esq. Defensa",
    "telefono": "0800-8911",
    "horarios": "Lunes a S\u00e1bado de 10 a 19 hs",
    "lat": "-34.8995446",
    "lng": "-56.1751288",
    "active": 1,
    "pos": 1800,
    "created_at": "2018-08-23 01:11:06",
    "updated_at": "2022-07-29 18:16:25",
    "medias": [{
      "id": 1389,
      "group": "normal",
      "url": "4vezYpX.png",
      "extension": "png",
      "type": "image",
      "metas": "[]",
      "video_id": "",
      "video_thumbnail": "",
      "mediable_id": 7,
      "mediable_type": "App\\Models\\Showrooms",
      "active": 1,
      "pos": 0,
      "created_at": "2018-08-24 20:27:41",
      "updated_at": "2018-08-24 20:27:41",
      "icon": "https:\/\/www.altius.com.uy\/storage\/images\/icon_4vezYpX.jpg",
      "thumb": "https:\/\/www.altius.com.uy\/storage\/images\/thumb_4vezYpX.png",
      "normal": "https:\/\/www.altius.com.uy\/storage\/images\/normal_4vezYpX.png",
      "large": "https:\/\/www.altius.com.uy\/storage\/images\/large_4vezYpX.png",
      "extra": "https:\/\/www.altius.com.uy\/storage\/images\/extra_4vezYpX.png",
      "video": "",
      "mime_type": "image\/png"
    }]
  }, {
    "id": 15,
    "friendly_url": "bilu-biarritz",
    "name": "Bil\u00fa Biarritz",
    "description": null,
    "direccion": "Juan Benito Blanco 612",
    "telefono": "08008911",
    "horarios": "Lunes a S\u00e1bados de 10 a 19 hs.",
    "lat": "-34.920328",
    "lng": "-56.151314",
    "active": 1,
    "pos": 3000,
    "created_at": "2020-07-10 19:24:42",
    "updated_at": "2021-05-31 14:03:07",
    "medias": []
  }, {
    "id": 22,
    "friendly_url": "showroom-atlantico-punta-del-este",
    "name": "Showroom Atl\u00e1ntico Punta del Este",
    "description": null,
    "direccion": "Av. Roosevelt - Parada 22",
    "telefono": "(+598) 4224 8844",
    "horarios": "Martes a S\u00e1bado de 10 a 19 hrs",
    "lat": "-34.91500169650127",
    "lng": "-54.96037575362353",
    "active": 1,
    "pos": 3001,
    "created_at": "2022-07-29 18:25:06",
    "updated_at": "2022-07-29 18:25:06",
    "medias": []
  }];
  
  let actual_project = null;
  let url_star =
    'https://www.altius.com.uy/page_assets/img/star.png';
  let url_circle =
    'https://www.altius.com.uy/page_assets/img/circle.png';
  
  $('#places-input').on('keydown', (
    e) => {
    if (event.which == 13 || e
      .KeyCode == 13)
      e.preventDefault();
  });
  
  var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  var document_width = $(document).width(), document_height = $(document).height();
}
   
  

// Carga la API de Google Maps
function loadMapScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAlI8leb8D4SoFFksEnxFt0caXUvGwcdH0&callback=initMap';
  document.body.appendChild(script);
}

// Carga la API de Google Maps cuando se cargue la página
window.addEventListener('load', loadMapScript);
