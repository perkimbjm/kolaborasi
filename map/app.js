/* Initial Map */
let map;
map = L.map(document.getElementById('map'), {
  zoom: 13,
  layers: [googleSatellite],
  center: [-3.314771,114.6185566],
  fullscreenControl: false
});

/*Fullscreen Control*/
let fullscreenControl = L.control.fullscreen({
  position: "topleft"
}).addTo(map);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}


/*DELINIASI KUMUH*/
let kumuh = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "grey",
      fillColor: "magenta",
      fillOpacity: 0.5,
      opacity: 0.5,
      width: 0.001,
      clickable: true,
      title: feature.properties.KATEGORI,
      riseOnHover: true
    };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      let content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>KRITERIA KUMUH</th><td>" + feature.properties.KRITERIA_KUMUH + "<tr><th>LUASAN KUMUH (M<SUP>2</SUP>)</th><td>" + feature.properties.LUAS + "</td></tr>" + "<tr><th>KELURAHAN</th><td>" + feature.properties.KELURAHAN + "</td></tr>" + "<tr><th>RT</th><td>" + feature.properties.RT+ "</td></tr>" +  "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.KATEGORI);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        let layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        kumuh.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/kumuh.geojson", function (data) {
  kumuh.addData(data);
});

//2022

let newkumuh = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "grey",
      fillColor: "#FF8916",
      fillOpacity: 0.6,
      opacity: 0.5,
      width: 0.001,
      clickable: true,
      title: feature.properties.RK,
      riseOnHover: true
    };
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      let content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>PRIORITAS</th><td>" + feature.properties.PENANGANAN + "<tr><th>LUASAN KUMUH (Ha)</th><td>" + feature.properties.LUAS_KUMUH +"<tr><th>NILAI KEKUMUHAN</th><td>" + feature.properties.NILAI_KEKUMUHAN + "</td></tr>" + "<tr><th>TINGKAT PERTIMBANGAN LAIN</th><td>" + feature.properties.PERTIMBANGAN_LAIN + "<tr><th>KEPADATAN PENDUDUK (Jiwa/Ha)</th><td>" + feature.properties.KEPADATAN + "</td></tr>" + "<tr><th>TIPOLOGI</th><td>" + feature.properties.TIPOLOGI+ "</td></tr>" + "<tr><th>KELURAHAN</th><td>" + feature.properties.KELURAHAN + "</td></tr>" + "<tr><th>RT/RW</th><td>" + feature.properties.RT_RW+ "</td></tr>" +  "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.RK);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");

        }
      });
    }
    layer.on({
      mouseover: function (e) {
        let layerkumuh = e.target;
        layerkumuh.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layerkumuh.bringToFront();
        }
      },
      mouseout: function (e) {
        newkumuh.resetStyle(e.target);
      },
      click: zoomToFeature
    });
  }
});
$.getJSON("data/kumuh2022.geojson", function (data) {
  newkumuh.addData(data);
});

let Kelurahan = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "#c92750",
      fill: true,
      fillOpacity: 0,
      opacity: 0.6,
      width: 0.01,
      clickable: true,
    };
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.KELURAHAN + "<a target='_blank' href='http://103.12.84.58/slum/profil16p/umum/info?kd_prop=63&kd_kota=6371&kd_kel=" + feature.properties.KODE_KOTAKU + "'>" + "<br>Lihat Profil</a>", layer.bindTooltip(feature.properties.KELURAHAN, 
    {permanent: true, direction:"center", className:"no-background"}
   )).openTooltip()
    
  }
});
$.getJSON("data/kelurahan.geojson", function (data) {
  Kelurahan.addData(data);
});

let batas_RT = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "grey",
      fill: true,
      fillOpacity: 0.2,
      opacity: 0.6,
      width: 0.01,
    };
  },
  onEachFeature: function (feature, layer) {
     layer.bindTooltip(feature.properties.Nama_RT, 
    {permanent: true, direction:"center", className:"no-background"}
   ).openTooltip()
    
  }
});
$.getJSON("data/BATAS_RT_AR.geojson", function (data) {
  batas_RT.addData(data);
});

// /*load wms form geoserver*/
// const sungai = L.tileLayer.wms("https://www.sialdobjm.com/geoserver/banjarmasin/wms?", {
//   layers: 'banjarmasin:sungai',
//   format: 'image/png',
//   transparent: true,
//   version: '1.1.0'

// });

// const jalan = L.tileLayer.wms("https://www.sialdobjm.com/geoserver/sialdo/wms?", {
//   layers: 'sialdo:jalan_LN',
//   format: 'image/png',
//   transparent: true,
//   version: '1.1.0'

// });

/* GeoJSON Point */
var pointsample = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: ( feature.properties.titik === "pangkal" ? "../img/pangkal.svg" : "../img/ujung.svg"), 
        iconSize: [20, 41],
        iconAnchor: [13, 41],
        shadowAnchor: [13, 41],
        popupAnchor: [0, -41],
      })
    });
  },
  /* Popup & Tooltip */
  onEachFeature: function (feature, layer) {
    var content = "<table class='tg'>" + 
      "<tr><th class='tg-zjf3'>Ruas / Segmen</th><td>" + feature.properties.nama + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Alamat</th><td>" + feature.properties.alamat + " RT. " + feature.properties.rt + " Kel. " + feature.properties.kelurahan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Jenis Kerusakan</th><td>" + feature.properties.kerusakan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Rencana Penanganan</th><td>" + feature.properties.rencana + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Dimensi</th><td>P = " + feature.properties.panjang + " m  L = " + feature.properties.lebar + "m</td></tr>" +
      "<tr><th class='tg-zjf3'>Catatan Khusus</th><td>" + feature.properties.catatan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Surveyor</th><td>" + feature.properties.surveyor + "</td></tr>" +
      "</table><br><button class='btn btn-sm btn-outline-success btn-block'><a target='_blank' href='https://maps.google.com/maps?q=" + feature.properties.lat + "," + feature.properties.lng + "&z=20&ll=" + feature.properties.lat + "," + feature.properties.lng + "'>Tunjukkan Peta</a></button><button class='btn btn-sm btn-outline-warning btn-block'>Google Streetview</button>";
    layer.on({
      click: function (e) {
        pointsample.bindPopup(content);
      },
      mouseover: function (e) {
        pointsample.bindTooltip(feature.properties.alamat);
      }
    });
  }
});
/* get JSON data */
$.getJSON("spreadsheetpoint.php", function (data) {
  pointsample.addData(data);
  map.fitBounds(pointsample.getBounds());
});



/* Musrenbang Point */
var musrenbang = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: ( feature.properties.titik === "pangkal" ? "../img/pangkal2.svg" : "../img/ujung2.svg"), 
        iconSize: [20, 41],
        iconAnchor: [13, 41],
        shadowAnchor: [13, 41],
        popupAnchor: [0, -41],
      })
    });
  },
  /* Popup & Tooltip */
  onEachFeature: function (feature, layer) {
    var content = "<table class='tg'>" + 
      "<tr><th class='tg-zjf3'>Ruas / Segmen</th><td>" + feature.properties.nama + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Alamat</th><td>" + feature.properties.alamat + " RT. " + feature.properties.rt + " Kel. " + feature.properties.kelurahan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Jenis Kerusakan</th><td>" + feature.properties.kerusakan + "</td></tr>" +
       "<tr><th class='tg-zjf3'>Catatan Khusus</th><td>" + feature.properties.catatan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Surveyor</th><td>" + feature.properties.surveyor + "</td></tr>" +
      "</table>";
    layer.on({
      click: function (e) {
        musrenbang.bindPopup(content);
      },
      mouseover: function (e) {
        musrenbang.bindTooltip(feature.properties.alamat);
      }
    });
  }
});
/* get JSON data */
$.getJSON("musrenbang.php", function (data) {
  musrenbang.addData(data);
  map.fitBounds(musrenbang.getBounds());
});

/* Pokir Point */
var pokir = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: ( feature.properties.titik === "pangkal" ? "../img/pangkal3.svg" : "../img/ujung3.svg"), 
        iconSize: [20, 41],
        iconAnchor: [13, 41],
        shadowAnchor: [13, 41],
        popupAnchor: [0, -41],
      })
    });
  },
  /* Popup & Tooltip */
  onEachFeature: function (feature, layer) {
    var content = "<table class='tg'>" + 
      "<tr><th class='tg-zjf3'>Ruas / Segmen</th><td>" + feature.properties.nama + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Alamat</th><td>" + feature.properties.alamat + " RT. " + feature.properties.rt + " Kel. " + feature.properties.kelurahan + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Jenis Kerusakan</th><td>" + feature.properties.kerusakan + "</td></tr>" +
       "<tr><th class='tg-zjf3'>Catatan Khusus</th><td>" + feature.properties.catatan + "</td></tr>" +
       "<tr><th class='tg-zjf3'>Pengusul</th><td>" + feature.properties.pengusul + "</td></tr>" +
       "<tr><th class='tg-zjf3'>Status</th><td>" + feature.properties.status + "</td></tr>" +
      "<tr><th class='tg-zjf3'>Surveyor</th><td>" + feature.properties.surveyor + "</td></tr>" +
      "</table>";
    layer.on({
      click: function (e) {
        pokir.bindPopup(content);
      },
      mouseover: function (e) {
        pokir.bindTooltip(feature.properties.alamat);
      }
    });
  }
});
/* get JSON data */
$.getJSON("pokir.php", function (data) {
  pokir.addData(data);
  map.fitBounds(pokir.getBounds());
});




/* Tile Basemap */
let baseLayers = {
  "Greyscale": cartoLight,

  "Street" : mapboxStreet,

  "Outdoor" : mapboxOutdoor,

  "Hybrid" : mapboxImagery,

  "Satellite" : googleSatellite,

  "Google Maps" : googleMaps,

  "Topo Map" : otopomap,

  "Dark": mapboxDark,
};

let groupedOverlays = {

  "TEMATIK": {
    "Deliniasi Kumuh 2015": kumuh,
    "Deliniasi Kumuh 2022": newkumuh,
  },

  "UTILITAS KOTA & BATAS ADMINISTRASI": {
    // "Kecamatan": Kecamatan,
    "Kelurahan": Kelurahan,
    "Batas RT": batas_RT,
    // "Sungai": sungai,
    // "Jalan": jalan,
  },

  "DATA SURVEI DAN USULAN": {
    "DED": pointsample,
    "Musrenbang" : musrenbang,
    "Pokir" : pokir,
  }
};


let layerControl = L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);


/* GPS enabled geolocation control set to follow the user's location */
let locateControl = L.control.locate({
  position: "topleft",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: true,
  strings: {
    title: "Lokasiku",
    popup: "Lokasimu {distance} {unit} dari titik ini",
    outsideMapBoundsMsg: "Kamu tampaknya berada di luar jangkauan peta"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);


/*Geocoder Searching*/

L.Control.geocoder({
  position: "topleft",
  collapsed: true,
}).addTo(map);



