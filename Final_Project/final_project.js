var streets = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution:
      'Tiles © Esri — Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  }
);

var imagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution:
      'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);

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

var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(map);

var homeCenter = map.getCenter();
var homeZoom = map.getZoom();

L.easyButton(('<img src="images/globe_icon.png", height=70%>'), function () {
  map.setView(homeCenter, homeZoom);
}, "Home").addTo(map);

var disclaimerControl = L.control({ position: "bottomright" });

disclaimerControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "disclaimer-button");

  div.innerHTML = "Disclaimer";

  div.onclick = function () {
    alert("Insert disclaimer here.");
  };

  return div;
};

disclaimerControl.addTo(map);

// DATA
fetch("data/us_reservation_boundaries.geojson")
  .then(response => response.json())
  .then(data => {

    var reservationsLayer = L.geoJSON(data, {
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

  // chorpleth data

  
    // Popups
    var mesaverdePopup = "Mesa Verde National Park<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cliff_Palace-Colorado-Mesa_Verde_NP.jpg/1920px-Cliff_Palace-Colorado-Mesa_Verde_NP.jpg' width='150px'/>";
    var casagrandePopup = "Casa Grande Ruins<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/CasaGrandeRuin.jpg/1280px-CasaGrandeRuin.jpg' width='150px'/>";
    var organPopup = "Organ Mountains<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Organ_Mountains-Desert_Peaks_National_Monument_%2817717943249%29.jpg/1280px-Organ_Mountains-Desert_Peaks_National_Monument_%2817717943249%29.jpg' width='150px'/>";
    var effigyPopup = "Effigy Mounds<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Big_bear_mound_at_Effigy_Mounds_State_Park.jpg/1280px-Big_bear_mound_at_Effigy_Mounds_State_Park.jpg' width='150px'/>";
    var chacoPopup = "Chaco Culture<br/><img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Chaco_Culture_NHP_%288023723138%29.jpg' width='150px'/>";
    var hopewellPopup = "Hopewell Culture<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hopewell_Culture_National_Historical_Park.jpg/1280px-Hopewell_Culture_National_Historical_Park.jpg' width='150px'/>";
    var canyonsPopup = "Canyons of the Ancients<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/My_Public_Lands_Roadtrip-_Canyons_of_the_Ancients_National_Monument_in_Colorado_%2819773890122%29.jpg/1280px-My_Public_Lands_Roadtrip-_Canyons_of_the_Ancients_National_Monument_in_Colorado_%2819773890122%29.jpg' width='150px'/>";
    var aztecPopup = "Aztec Ruins<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Aztec_Ruins_National_Monument_by_RO.JPG/1280px-Aztec_Ruins_National_Monument_by_RO.JPG' width='150px'/>";
    var ocmulgeePopup = "Ocmulgee<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mounds_at_Ocmulgee_National_Monument%2C_Bibb_County%2C_GA%2C_US.jpg/1920px-Mounds_at_Ocmulgee_National_Monument%2C_Bibb_County%2C_GA%2C_US.jpg' width='150px'/>";
    var gilaPopup = "Gila Cliff Dwellings<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gila_Cliff_Dwellings%2C_New_Mexico%2C_USA_2012.jpg/1920px-Gila_Cliff_Dwellings%2C_New_Mexico%2C_USA_2012.jpg' width='150px'/>";

    var customOptions = { maxWidth: 150 };

    var marks = L.layerGroup();

    var sites = [
      { name: "Mesa Verde", coords: [37.23, -108.46], popupHtml: mesaverdePopup },
      { name: "Casa Grande", coords: [32.99, -111.53], popupHtml: casagrandePopup },
      { name: "Organ Mountains", coords: [32.32, -106.57], popupHtml: organPopup },
      { name: "Effigy Mounds", coords: [43.08, -91.18], popupHtml: effigyPopup },
      { name: "Chaco", coords: [36.05, -107.95], popupHtml: chacoPopup },
      { name: "Hopewell", coords: [39.37, -83.00], popupHtml: hopewellPopup },
      { name: "Canyons", coords: [37.48, -108.88], popupHtml: canyonsPopup },
      { name: "Aztec Ruins", coords: [36.83, -107.99], popupHtml: aztecPopup },
      { name: "Ocmulgee", coords: [32.83, -83.60], popupHtml: ocmulgeePopup },
      { name: "Gila Cliff", coords: [33.22, -108.27], popupHtml: gilaPopup }
    ];

    function addSites(dataArray, layerGroup) {
      for (var i = 0; i < dataArray.length; i++) {
        var feature = dataArray[i];

        var marker = L.marker(feature.coords);

        marker.options.title = feature.name;

        marker.bindPopup(feature.popupHtml, customOptions);

        marker.bindTooltip(feature.name, {
          direction: "top",
          sticky: true,
          opacity: 0.9
        });

        marker.addTo(layerGroup);
      }
    }

    addSites(sites, marks);

    // search
    var searchControl = new L.Control.Search({
      position: 'topright',
      layer: marks,
      propertyName: 'title',
      marker: false,
      textPlaceholder: 'Search by name of historical site',  
      moveToLocation: function (latlng, title, map) {
        map.setView(latlng, 15);
      }
    });

    map.addControl(searchControl);

    var baseLayers = {
      'Streetmap': streets,
      'Satellite Imagery': imagery
    };

    var overlays = {
      "Historical Sites": marks,
      "Reservations": reservationsLayer
    };

    L.control.layers(baseLayers, overlays, { collapsed: true }).addTo(map);

  });