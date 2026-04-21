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
        if (feature.properties.NAME) {
          layer.bindPopup(feature.properties.NAME);
        }
      }
    }).addTo(map);
  });

var baseLayers = {
    'Streetmap': streets,
    'Satellite Imagery': imagery,
    };

var overlays = {

};

var layerControl = L.control.layers(baseLayers, overlays, {collapsed: true}).addTo(map);
