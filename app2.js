/* Initial Map */
let tooltip = 'Drag the marker or move the map<br>to change the coordinates<br>of the location';
let center = [-3.3219307,114.5821667];
let map = L.map('map').setView(center, 16); //lat, long, zoom
map.scrollWheelZoom.disable(); //disable zoom with scroll

/* Tile Basemap */
let basemap = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: ''
});
basemap.addTo(map);

/* Display zoom, latitude, longitude in URL */
let hash = new L.Hash(map);

/* Marker */
let marker = L.marker(center, {draggable: true});
marker.addTo(map);

/* Tooltip Marker */
marker.bindTooltip(tooltip);
marker.openTooltip();

//Dragend marker
marker.on('dragend', dragMarker);

//Move Map
map.addEventListener('moveend', mapMovement);

function dragMarker (e) {
  let latlng = e.target.getLatLng();

  //Displays coordinates on the form
  document.getElementById("latitude").value = latlng.lat.toFixed(5);
  document.getElementById("longitude").value = latlng.lng.toFixed(5);

  //Change the map center based on the marker location
  map.flyTo(new L.LatLng(latlng.lat.toFixed(9), latlng.lng.toFixed(5)));
}

function mapMovement (e) {
  let mapcenter = map.getCenter();

  //Displays coordinates on the form
  document.getElementById("latitude").value = mapcenter.lat.toFixed(7);
  document.getElementById("longitude").value = mapcenter.lng.toFixed(7);

  //Create marker
  marker.setLatLng([mapcenter.lat.toFixed(5), mapcenter.lng.toFixed(5)]).update();
  marker.on('dragend', dragMarker);
}

function mapCenter (e) {
  let mapcenter = map.getCenter();
  let x = document.getElementById("longitude").value;
  let y = document.getElementById("latitude").value;

  map.flyTo(new L.LatLng(y, x), 18);
}

//2022

let newkumuh = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "grey",
      fillColor: "orange",
      fillOpacity: 0.3,
      opacity: 0.5,
      width: 0.001,
      riseOnHover: true
    };
  },
});
$.getJSON("map/data/kumuh2022.geojson", function (data) {
  newkumuh.addData(data);
  newkumuh.addTo(map);
});

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control
  .locate({
    position: "topleft",
    drawCircle: true,
    follow: true,
    setView: true,
    keepCurrentZoomLevel: true,
    markerStyle: {
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.8,
    },
    circleStyle: {
      weight: 1,
      clickable: false,
    },
    icon: "fa fa-crosshairs",
    metric: true,
    strings: {
      title: "Lokasi Anda",
      popup: "Lokasi Anda sekarang di sini<br>Akurasi {distance} {unit}",
      outsideMapBoundsMsg: "Sepertinya Anda berada di luar batas Peta.",
    },
    locateOptions: {
      maxZoom: 18,
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000,
    },
  })
  .addTo(map);

  /*Fullscreen Control*/
let fullscreenControl = L.control.fullscreen({
  position: "topright"
}).addTo(map);


// Submit to google spreadsheet Musrenbang
const scriptURLMusrenbang = 'https://script.google.com/macros/s/AKfycbx_YHOh4yHOHT3cX5Ccp8ANOJiCeKQJ3WvWsCciQdPNsGLnOfirVyUN7lUE6hfWtWDTFA/exec';
const form2 = document.forms['survei-musrenbang'];
const btnSimpan2 = document.querySelector('.btn-simpan2');
const btnLoading2 = document.querySelector('.btn-loading2');
const myAlert2 = document.querySelector('.my-alert2');

form2.addEventListener('submit', event => {
  event.preventDefault();
  btnSimpan2.classList.toggle('d-none');
  btnLoading2.classList.toggle('d-none');
  fetch(scriptURLMusrenbang, { mode: 'no-cors', method: 'POST', body: new FormData(form2)})
    .then(response => {
      console.log('Success!', response);
      btnSimpan2.classList.toggle('d-none');
      btnLoading2.classList.toggle('d-none');
      myAlert2.classList.toggle('d-none');
      form2.reset();
    })
    .catch(error => console.error('Error!', error.message));
})