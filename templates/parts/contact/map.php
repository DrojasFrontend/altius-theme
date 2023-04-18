<style>
  #map{
    width: 100%;
    height: 500px;
  }
</style>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>


<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlI8leb8D4SoFFksEnxFt0caXUvGwcdH0&libraries=places"></script>
<script src=""></script>
	<script>
		$(document).ready(function () {
  initMap(false, actual_project, true, actual_project);
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
    path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#000",
    strokeWeight: 0,
    scale: 1,
  };
}

function setMarkers(is_mobile, is_project, init) {
  is_mob = is_mobile;
  data_showrooms = [];

  let arr = [];
  for (let key in projects) {
    arr.push(projects[key]);
  }

  projects = arr;
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
  is_project ? (data = showroom_project) : (data = data_showrooms);
  markers = [];
  infoWindowContent = [];
  if (is_project && showroom != null) {
    let init_markers = false;
    if (is_project && is_project[0].showrooms != null) {
      init_markers = true;
    }
    let coords = showroom;
    let bool = showroom != null ? true : false;
    markers.push([
      coords.name,
      parseFloat(coords.lat),
      parseFloat(coords.lng),
      showroom.id,
    ]);
    let img = "";
  } else {
    data.forEach((s) => {
      let coords;
      let bool;

      if (is_project) {
        if (
          s.showrooms &&
          showroom &&
          s.showrooms.lat != showroom.lat &&
          s.showrooms.lng != showroom.lng
        ) {
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
        markers.push([
          coords.name,
          parseFloat(coords.lat),
          parseFloat(coords.lng),
          s.id,
        ]);
        let img = "";
          infoWindowContent.push([
            '<div class="info_content">' +
              '<p style="margin:0">' +
              coords.subname +
              "</p>" +
              '<p style="margin:0">' +
              coords.name +
              "</p>" +
              '<span class="txt">' +
              coords.direccion +
              "</span>" +
              "</div>",
          ]);
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
    markers = [];
    markers.push([
      showroom.name,
      parseFloat(showroom.lat),
      parseFloat(showroom.lng),
    ]);
    let img = "";
    infoWindowContent = [];
  }
}

function traceRoute(directionsService, directionsDisplay) {
  directionsService.route(
    {
      origin: myLatLng,
      destination: {
        lat: latit,
        lng: longit,
      },
      travelMode: google.maps.TravelMode[travelMode],
    },
    function (response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
        setTimeout(function () {
          $(".indications-box").removeClass("d-none");
          $(".close-indications").removeClass("d-none d-show");
        }, 500);
        $(".indications-box").removeClass("fade-in");
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

var initial_markers = [];

$(document).ready(function () {
  $("#button-trace").click(function (e) {
    e.preventDefault();
  });

  $("#select-showrooms").change(function (e) {
    markers = all_markers;

    if (e.target.value == "") {
      markers = [];
      projects = [];
      showrooms_without_projects.forEach((s) => {
        markers.push([s.name, parseFloat(s.lat), parseFloat(s.lng), s.id]);
        projects.push({
          showrooms: s,
        });
      });
      initMap(false, false, true, projects, false);
      return;
    }
    if (typeof is_project !== "undefined" && is_project) {
      is_project = false;
      // projects = projects_all[0];
      setMarkers(false, false, false);
      all_markers = markers;
    }
    if (e.target.value != "todos") {
      let show_name = e.target.value;
      setMarkerSelected(show_name);
      initMap(false, actual_project, false, projects, false);
    } else {
      initMap(false, actual_project, false, projects, false);
    }
  });

  $("#btn-automovil").click(function () {
    travelMode = "DRIVING";
    traceRoute(directionsService, directionsDisplay);
    $("#btn-automovil").addClass("active");
    $("#btn-caminando").removeClass("active");
  });

  $("#btn-caminando").click(function () {
    travelMode = "WALKING";
    traceRoute(directionsService, directionsDisplay);
    $("#btn-caminando").addClass("active");
    $("#btn-automovil").removeClass("active");
  });

  $("#btn-use-gps").click(function (e) {
    e.preventDefault();
    $("#places-input").val("");
    if (navigator.geolocation) {
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  $("#close-indications").click(function (e) {
    $(this).toggleClass("d-show");
    $(".indications-box").toggleClass("d-none");
  })
});

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");
  if (useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1) {
    mapdiv.style.width = "100%";
    mapdiv.style.height = "100%";
  } else {
    mapdiv.style.width = "600px";
    mapdiv.style.height = "800px";
  }
}

function geoSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  myLatLng = {
    lat: latitude,
    lng: longitude,
  };

  var mapProp = {
    zoom: 11,
    mapTypeId: "roadmap",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_LEFT,
    },
    FullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  };

  map = new google.maps.Map(document.getElementById("map"), mapProp);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    panel: document.getElementById("indications-panel"),
  });

  directionsDisplay.setMap(map);

  var bounds = new google.maps.LatLngBounds();

  var marker = new google.maps.Marker({
    position: myLatLng,
    icon: url_circle,
    map: map,
    title: "My location",
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

    if (
      !ready_aux &&
      actual_project &&
      actual_project[0].showrooms &&
      actual_project[0].showrooms.id == markers[i][3]
    ) {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: "http://altius.local/wp-content/uploads/pin-map.svg",
          scaledSize: new google.maps.Size(90, 60),
        },
        title: markers[i][0],
      });
      marker_aux = marker;
      ready_aux = true;
    } else {
      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: "http://altius.local/wp-content/uploads/pin-map.svg",
          scaledSize: new google.maps.Size(90, 60),
        },
        title: markers[i][0],
      });
    }

    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infoWindow.setContent(infoWindowContent[i][0]);
          map.setCenter(marker.getPosition());
          // map.panTo(marker.getPosition());
          infoWindow.open(map, marker);
          latit = marker.getPosition().lat();
          longit = marker.getPosition().lng();
          $("#error-label").removeClass("d-flex");
        };
      })(marker, i)
    );

    if (markers.length == 1) {
      latit = marker.getPosition().lat();
      longit = marker.getPosition().lng();
      traceRoute(directionsService, directionsDisplay);
    }

    marker.addListener("click", function () {
      traceRoute(directionsService, directionsDisplay);
    });
  }
  if (marker_aux) {
    latit = marker_aux.getPosition().lat();
    longit = marker_aux.getPosition().lng();
    traceRoute(directionsService, directionsDisplay);
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
    mapTypeId: "roadmap",
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_LEFT,
    },
    FullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  };

  map = new google.maps.Map(document.getElementById("map"), mapProp);
  var bounds = new google.maps.LatLngBounds();

  var input = document.getElementById("places-input");
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });

  if ((myLatLng && markers.length == 1) || all) {
    map = new google.maps.Map(document.getElementById("map"), mapProp);

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      panel: document.getElementById("indications-panel"),
    });

    directionsDisplay.setMap(map);

    var bounds = new google.maps.LatLngBounds();

    var marker = new google.maps.Marker({
      position: myLatLng,
      icon: url_circle,
      map: map,
      title: "My location",
    });

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

        if (
          !ready &&
          actual_project &&
          actual_project[0].showrooms &&
          actual_project[0].showrooms.id == markers[i][3]
        ) {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
          ready = true;
          actual_marker = marker;
        } else if (
          !ready &&
          actual_project &&
          actual_project[0] &&
          actual_project[0].id == markers[i][3]
        ) {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
          ready = true;
          actual_marker = marker;
        } else {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
        }

        if (markers.length == 1) {
          latit = marker.getPosition().lat();
          longit = marker.getPosition().lng();
          traceRoute(directionsService, directionsDisplay);
        }

        marker.addListener("click", function () {
          traceRoute(directionsService, directionsDisplay);
        });
      }
    } else {
      var position = new google.maps.LatLng(markers[0][1], markers[0][2]);
      bounds.extend(position);

      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: "http://altius.local/wp-content/uploads/pin-map.svg",
          scaledSize: new google.maps.Size(90, 60),
        },
        title: markers[0][0],
      });
      ready = true;
      actual_marker = marker;

      if (global_pos) {
        geoSuccess(global_pos);
      }

      google.maps.event.addListener(
        marker,
        "click",
        (function (marker) {
          return function () {
            $("#google-map").attr(
              "href",
              "https://maps.apple.com/?q=" + markers[0][1] + "," + markers[0][2]
            );
            $("#waze-map").attr(
              "href",
              "https://www.waze.com/livemap?ll=" +
                markers[0][1] +
                "%2C" +
                markers[0][2] +
                "&navigate=yes&zoom=17"
            );
            infoWindow.setContent(infoWindowContent[0][0]);
            map.setCenter(marker.getPosition());
            map.panTo(marker.getPosition());
            infoWindow.open(map, marker);
            latit = marker.getPosition().lat();
            longit = marker.getPosition().lng();
            $("#error-label").removeClass("d-flex");
          };
        })(marker)
      );
    }

    if (actual_marker)
      setTimeout(function () {
        map.setCenter(actual_marker.getPosition());
      }, 500);
  }

  searchBox.addListener("places_changed", function () {
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
        scaledSize: new google.maps.Size(25, 25),
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
          longitude,
        },
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

        if (
          !ready &&
          actual_project &&
          actual_project[0].showrooms &&
          actual_project[0].showrooms.id == markers[i][3]
        ) {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
          ready = true;
          actual_marker = marker;
        } else if (
          !ready &&
          actual_project &&
          actual_project[0] &&
          actual_project[0].id == markers[i][3]
        ) {
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
          ready = true;
          actual_marker = marker;
        } else {
          // Custom icon map
          marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: {
              url: "http://altius.local/wp-content/uploads/pin-map.svg",
              scaledSize: new google.maps.Size(90, 60),
            },
            title: markers[i][0],
          });
        }
        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              $("#google-map").attr(
                "href",
                "https://maps.apple.com/?q=" +
                  markers[i][1] +
                  "," +
                  markers[i][2]
              );
              $("#waze-map").attr(
                "href",
                "https://www.waze.com/livemap?ll=" +
                  markers[i][1] +
                  "%2C" +
                  markers[i][2] +
                  "&navigate=yes&zoom=17"
              );
              infoWindow.setContent(infoWindowContent[i][0]);
              map.setCenter(marker.getPosition());
              map.panTo(marker.getPosition());
              infoWindow.open(map, marker);
              latit = marker.getPosition().lat();
              longit = marker.getPosition().lng();
              $("#error-label").removeClass("d-flex");
            };
          })(marker, i)
        );
      }
    } else {
      var position = new google.maps.LatLng(markers[0][1], markers[0][2]);
      bounds.extend(position);

      marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
          url: "http://altius.local/wp-content/uploads/pin-map.svg",
          scaledSize: new google.maps.Size(90, 60),
        },
        title: markers[0][0],
      });
      ready = true;
      actual_marker = marker;

      google.maps.event.addListener(
        marker,
        "click",
        (function (marker) {
          return function () {
            $("#google-map").attr(
              "href",
              "https://maps.apple.com/?q=" + markers[0][1] + "," + markers[0][2]
            );
            $("#waze-map").attr(
              "href",
              "https://www.waze.com/livemap?ll=" +
                markers[0][1] +
                "%2C" +
                markers[0][2] +
                "&navigate=yes&zoom=17"
            );
            infoWindow.setContent(infoWindowContent[0][0]);
            map.setCenter(marker.getPosition());
            map.panTo(marker.getPosition());
            infoWindow.open(map, marker);
            latit = marker.getPosition().lat();
            longit = marker.getPosition().lng();
            $("#error-label").removeClass("d-flex");
          };
        })(marker)
      );
    }

    if (actual_marker)
      setTimeout(function () {
        map.setCenter(actual_marker.getPosition());
      }, 1000);
  }

  map.fitBounds(bounds);

  zoomChangeBoundsListener = google.maps.event.addListenerOnce(
    map,
    "bounds_changed",
    function (event) {
      if (this.getZoom()) {
        // or set a minimum
        this.setZoom(16); // set zoom here
      }
    }
  );

  setTimeout(function () {
    google.maps.event.removeListener(zoomChangeBoundsListener);
  }, 2000);
}

projects = [
  {
    showrooms: {
      id: 10,
      subname: "<strong>Punta del Este:</strong>",
      name: "Showroom Atlantico",
      direccion: "Av Roosevelt - Parada 22",
      lat: "-34.90691345838767",
      lng: "-56.14385410804081",
      medias: [],
    },
  },
  {
    showrooms: {
      id: 16,
      subname: "<strong>Montevideo:</strong>",
      name: "Altius Life",
      direccion: "26 de Marzo esquina <br> Luis Bonavita",
      lat: "-34.90523893660411",
      lng: "-56.135677762204246",
      medias: [],
    },
  },
];

let actual_project = null;
let url_star = "https://www.altius.com.uy/page_assets/img/star.png";
let url_circle = "https://www.altius.com.uy/page_assets/img/circle.png";

$("#places-input").on("keydown", (e) => {
  if (event.which == 13 || e.KeyCode == 13) e.preventDefault();
});

var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
  navigator.userAgent
);
var document_width = $(document).width(),
  document_height = $(document).height();

	</script>

<div class="custom-map">
  <div class="container">
    <h2 class="h2">ENCONTRÁ TU OFICINA DE VENTA</h2>
  </div>
  <div id="wo-map" class="">
    <div class="map-search">
      <div class="search-options">
        <form>
          <div class="check-ops">
            <button type="button" aria-label="walking" id="btn-caminando" class="btn-talk active">
            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 60" width="53" height="60">
              <path fill="transparent" class="a" d="m0 0h210v60h-210z"/>
              <path fill="#fff" class="b" d="m19.3 50.8l6-30.2-5.2 2.2v6.8h-3.1v-8.9l9.9-4.2q0.2 0 0.3-0.1 0.2-0.1 0.4-0.1 0.2-0.1 0.4-0.1 0.2 0 0.4-0.1 0.2 0 0.4 0 0.2 0 0.4 0 0.2 0 0.4 0.1 0.2 0 0.4 0 0.2 0.1 0.4 0.1 0.2 0.1 0.4 0.1 0.1 0.1 0.3 0.2 0.2 0.1 0.4 0.2 0.1 0.1 0.3 0.2 0.1 0.1 0.3 0.2 0.1 0.2 0.2 0.3 0.1 0.2 0.2 0.3l2.2 3.4q0.4 0.6 0.8 1.2 0.5 0.5 1 1 0.5 0.5 1 0.9 0.6 0.5 1.2 0.8 0.6 0.4 1.2 0.6 0.6 0.3 1.3 0.5 0.6 0.2 1.3 0.2 0.7 0.1 1.3 0.1v3.1q-0.8 0-1.6-0.1-0.8-0.1-1.6-0.3-0.9-0.2-1.6-0.5-0.8-0.3-1.5-0.6-0.8-0.5-1.5-1-0.7-0.4-1.3-1-0.6-0.6-1.2-1.2-0.5-0.7-1-1.4l-2 7.9 4.8 4.3v15.1h-3.1v-12.4l-5.6-5.1-4.1 17.5zm13.5-36.8q-0.7 0-1.4-0.3-0.7-0.3-1.2-0.9-0.5-0.5-0.8-1.2-0.3-0.7-0.3-1.4c0-1.3 0.6-2.4 1.6-3.1 1.1-0.7 2.4-0.9 3.6-0.4 1.1 0.5 2 1.5 2.2 2.8 0.3 1.2-0.1 2.5-1 3.3q-0.3 0.3-0.6 0.5-0.3 0.2-0.6 0.4-0.4 0.1-0.7 0.2-0.4 0.1-0.8 0.1z"/></svg>
              A pie
            </button>
            <button type="button" aria-label="car" id="btn-automovil" class="btn-car">
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="50" version="1.2">
              <path fill="transparent" d="M-4-6h210v60H-4z"/>
              <path fill="transparent" d="M-3.3-5.3h208.6v58.5H-3.2z" style="stroke:#fff;stroke-width:1.5"/>
              <path fill="#fff" class="b2" fill-rule="evenodd" d="M14.5 33.9v2.3q0 .2-.1.4-.1.3-.3.5l-.4.2q-.2.1-.5.1h-.8q-.3 0-.5-.1-.3-.1-.4-.2-.2-.2-.3-.5-.1-.2-.1-.4V22.6l3.6-10.8q0-.1.1-.2.1-.2.1-.3l.2-.2q.1-.1.3-.2.1-.1.2-.1.1-.1.3-.1.1-.1.3-.1h20q.2 0 .3.1.1 0 .3.1.1 0 .2.1t.3.2q.1.1.1.2.1.1.2.3.1.1.1.2l3.6 10.8v13.6q0 .2-.1.4-.1.3-.3.5l-.4.2q-.2.1-.5.1h-1.1q-.1 0-.2-.1-.2 0-.3-.1l-.1-.1-.2-.2q-.1-.1-.1-.3 0-.1-.1-.2v-2.5zm.1-13.8h23.3l-2.3-7H17zm-1 11.3h25.1v-8.8H13.6zm20.3-2.1q-.2-.1-.4-.1l-.4-.2q-.2-.2-.4-.3l-.2-.4q-.2-.2-.3-.4 0-.2-.1-.4v-.9q.1-.2.1-.4l.2-.4q.2-.2.3-.4.2-.2.4-.3.1-.1.4-.2.2-.1.4-.1.2-.1.4-.1.5 0 .9.2.5.2.8.5.3.3.5.8.2.4.2.9 0 .2-.1.4 0 .2-.1.4l-.2.4q-.1.2-.3.4l-.4.2q-.2.2-.4.3-.2 0-.4.1h-.9zm-16.3 0q-.2-.1-.5-.1l-.4-.2-.3-.3q-.2-.2-.3-.4l-.2-.4-.2-.4v-.4q0-.5.2-.9.2-.5.5-.8.3-.3.7-.5.5-.2.9-.2.3 0 .5.1.2 0 .4.1l.4.2q.2.1.4.3l.2.4q.2.2.2.4l.2.4v.9l-.2.4q0 .2-.2.4-.1.2-.2.3-.2.2-.4.3-.2.2-.4.3-.2 0-.4.1h-.9z"/></svg>
              En Coche
            </button>
          </div>
          <div class="custom-map__select">
            <div class="container">
              <div class="">
                <input type="text" class="form-control" id="places-input" placeholder="Escribí tu punto de partida">
              </div>
              <div>
                <select style="cursor: pointer;" name="Tipos" class="" id="select-showrooms">
                  <option selected value="todos">Todos</option>
                  <option value="Altius Life">Altius Life</option>
                  <option value="Showroom Atlantico">Showroom Atlantico</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div id="map" style="height: 600px; width: 100%;"></div>
    <button id="close-indications" class="close-indications d-none">
      <img class="" src="<?= IMG_BASE; ?>icon-next-ligh.png" alt="" width="" height="" loading="lazy">
    </button>
    <div class="indications-box d-none">
      <div id="indications-panel"></div>
      <div class="btn-box">
      </div>
    </div>
  </div>
</div>