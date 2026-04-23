var streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution:
    'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map("map", {
  center: [39.67293206761876, -97.40217044408527],
  zoom: 4,
    layers: streets
});

// MiniMap basemap
var miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 0,
  maxZoom: 13,
  attribution: '&copy; OpenStreetMap'
});
// Minimap control
var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(map);

var homeCenter = map.getCenter();
var homeZoom = map.getZoom();

L.easyButton(('<img src="images/Home_icon_black.png", height=70%>'), function () {
  map.setView(homeCenter, homeZoom);
}, "Home").addTo(map);

// DATA
fetch("data/us_reservation_boundaries.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "brown",
        weight: 1,
        fillOpacity: 0.3
      },
      onEachFeature: function (feature, layer) {

        let popupContent = "";

        if (feature.properties.AGENCY) {
          popupContent += "<strong>Agency:</strong> " + feature.properties.AGENCY + "<br>";
        }

        if (feature.properties.LARNAME) {
          popupContent += "<strong>Name:</strong> " + feature.properties.LARNAME + "<br>";
        }

        if (popupContent !== "") {
          layer.bindPopup(popupContent);
        }
      }
    }).addTo(map);
  });

// Custom Pop-ups with Images

var mesaverdePopup = "Mesa Verde National Park, Colorado<br/><img src='' alt='' width='150px'/>";

var casagrandePopup = "Casa Grande Ruins National Monument, Arizona<br/><img src='' alt='' width='150px'/>";

var organPopup = "Organ Mountains-Desert Peaks National Monument, New Mexico<br/><img src='' alt='' width='150px'/>";

var effigyPopup = "Effigy Mounds National Monument, Iowa<br/><img src='' alt='' width='150px'/>";

var chacoPopup = "Chaco Culture National Historical Park<br/><img src='' alt='christ wiki' width='150px'/>";

var hopewellPopup = "Hopewell Culture National Historical Park, Ohio<br/><img src='' alt='' width='150px'/>";

var canyonsPopup = "Canyons of the Ancients National Monument, Colorado<br/><img src='' alt='' width='150px'/>";

var aztecPopup = "Aztec Ruins National Monument, New Mexico<br/><img src='' alt='' width='150px'/>";

var ocumulgeePopup = "Ocmulgee National Monument, Georgia<br/><img src='' alt='' width='150px'/>";

var gilaPopup = "Gila Cliff Dwellings National Monument, New Mexico<br/><img src='' alt='' width='150px'/>";

var customOptions ={'maxWidth': '150','className' : 'custom'};

/*LayerGroup and Data Array*/

var marks = L.layerGroup();

var sites = [
    { name: "Mesa Verde", coords: [37.23142438872834, -108.46171724458303], popupHtml: mesaverdePopup },
    { name: "Casa Grande Ruins", coords: [32.99746256467499, -111.53254680185343], popupHtml: casagrandePopup },
    { name: "Organ Mountains-Desert Peaks", coords: [32.32250827365291, -106.57398917453443], popupHtml: organPopup },
    { name: "Effigy Mounds", coords: [43.08879636546783, -91.18556687285295], popupHtml: effigyPopup },
    { name: "Chaco", coords: [36.05297375054783, -107.9558918153027], popupHtml: chacoPopup },
    { name: "Hopewell", coords: [39.37639766322145, -83.00460055260355], popupHtml: hopewellPopup },
    { name: "Canyons of the Ancients", coords: [37.48084021630583, -108.88431248644497], popupHtml: canyonsPopup },
    { name: "Aztec Ruins", coords: [36.83520785046959, -107.99964240179632], popupHtml: aztecPopup },
    { name: "Ocmulgee", coords: [32.837372433102345, -83.60172195736486], popupHtml: ocumulgeePopup },
    { name: "Gila Cliff Dwellings", coords: [33.22709852513367, -108.27067050185015], popupHtml: gilaPopup }
];

// add markers

function addSitesToLayer(dataArray, layerGroup) {

  for (var i = 0; i < dataArray.length; i++) {
    var feature = dataArray[i];

    var marker = L.marker(feature.coords);

    marker.bindPopup(feature.popupHtml, customOptions);  

    marker.bindTooltip(feature.name, {
      direction: "top",
      sticky: true,
      opacity: 0.9});

    marker.addTo(layerGroup);
  }
}

addSitesToLayer(sites, marks);

var baseLayers = {
    'Streetmap': streets,
    'Satellite Imagery': imagery,
    };

var overlays = {
  "Historical Sites": marks,
};

var layerControl = L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(map);
