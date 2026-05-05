var streets = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution:
      "Tiles © Esri — Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
  }
);

var imagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution:
      "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
  }
);

var map = L.map("map", {
  center: [34.87455588323924, -108.12716074650054],
  zoom: 6,
  layers: [streets]
});

var baseLayers = {
  "Streetmap": streets,
  "Satellite Imagery": imagery
};

var overlays = {};

var layerControl = L.control.layers(baseLayers, overlays, {
  collapsed: true
}).addTo(map);

// MiniMap basemap
var miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 0,
  maxZoom: 13,
  attribution: "&copy; OpenStreetMap"
});

var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(map);

// home button
var homeCenter = map.getCenter();
var homeZoom = map.getZoom();

L.easyButton('<img src="images/globe_icon.png" height="70%">', function () {
  map.setView(homeCenter, homeZoom);
}, "Home").addTo(map);

// disclaimer button
var disclaimerControl = L.control({ position: "bottomright" });

disclaimerControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "disclaimer-button");

  div.innerHTML = "Disclaimer";

  div.onclick = function () {
    alert("I want to honor the sovereignty of all Indigenous nations, their lands, and their waters. The boundaries, territories, and historical sites on this map are sacred. This map is for informational purposes only, please respect the rights of Indigenous data sovereignty.");
  };

  return div;
};

disclaimerControl.addTo(map);

// CHOROPLETH
var Percentlayer;

fetch("data/sw_native_population.geojson")
  .then(response => response.json())
  .then(percentData => {
    console.log("Choropleth loaded:", percentData);

    Percentlayer = L.geoJSON(percentData, {
      style: stylePercent,
      onEachFeature: onEachPercentFeature
    }).addTo(map);

    layerControl.addOverlay(Percentlayer, "Population Percent");

    var searchControl = new L.Control.Search({
      position: "topright",
      layer: Percentlayer,
      propertyName: "cb_2025_us_county_500k_NAME",
      marker: false,
      textPlaceholder: "Search by name of county",
      moveToLocation: function (latlng, title, map) {
        map.setView(latlng, 15);
      }
    });

    map.addControl(searchControl);
  })
  .catch(error => console.error("Error loading choropleth:", error));

// colors
function getColorPercent(value) {
  return value > 32.6 ? "#08519c" :
         value > 16   ? "#3182bd" :
         value > 7.4  ? "#6baed6" :
         value > 2.5  ? "#bdd7e7" :
                         "#eff3ff";
}

function stylePercent(feature) {
  return {
    fillColor: getColorPercent(feature.properties.native_census_Native_Prt),
    weight: 1,
    opacity: 1,
    color: "gray",
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    color: "#666",
    fillOpacity: 0.4
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetPercentHighlight(e) {
  Percentlayer.resetStyle(e.target);
  e.target.closePopup();
}

function onEachPercentFeature(feature, layer) {
  layer.bindPopup(
    "<strong>" + feature.properties.cb_2025_us_county_500k_NAME + "</strong><br>" +
    "<strong>" + feature.properties.cb_2025_us_county_500k_STATE_NAME + "</strong><br>" +
    '<span style="color:red">' + feature.properties.native_census_Native_Prt + " %</span>"
  );

  layer.on({
    mouseover: function (e) {
      highlightFeature(e);
      e.target.openPopup();
    },
    mouseout: resetPercentHighlight
  });
}

// build legends in side panel
function buildLegendHTML(title, grades, colorFunction) {
  var html = '<div class="legend-title">' + title + "</div>";

  for (var i = 0; i < grades.length; i++) {
    var from = grades[i];
    var to = grades[i + 1];

    html +=
      '<div class="legend-box">' +
        '<span class="legend-color" style="background:' + colorFunction(from + 1) + '"></span>' +
        "<span>" + from + (to ? "&ndash;" + to : "+") + "</span>" +
      "</div>";
  }

  return html;
}

var PercentLegendDiv = document.getElementById("Percent-legend");

if (PercentLegendDiv) {
  PercentLegendDiv.innerHTML = buildLegendHTML(
    "Population %",
    [0, 2.5, 7.4, 16, 32.6],
    getColorPercent
  );
}

// reservation data
fetch("data/southwest_reservations.geojson")
  .then(response => response.json())
  .then(data => {
    var reservationsLayer = L.geoJSON(data, {
      style: {
        color: "brown",
        weight: 1,
        fillOpacity: 0.4
      },
      onEachFeature: function (feature, layer) {
        var popupContent = "";

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

    layerControl.addOverlay(reservationsLayer, "Reservations");
  })
  .catch(error => console.error("Error loading reservations:", error));

// historical sites
var mesaverdePopup = "Mesa Verde National Park<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cliff_Palace-Colorado-Mesa_Verde_NP.jpg/1920px-Cliff_Palace-Colorado-Mesa_Verde_NP.jpg' width='150px'/>";
var casagrandePopup = "Casa Grande Ruins<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/CasaGrandeRuin.jpg/1280px-CasaGrandeRuin.jpg' width='150px'/>";
var organPopup = "Organ Mountains<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Organ_Mountains-Desert_Peaks_National_Monument_%2817717943249%29.jpg/1280px-Organ_Mountains-Desert_Peaks_National_Monument_%2817717943249%29.jpg' width='150px'/>";
var chacoPopup = "Chaco Culture<br/><img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Chaco_Culture_NHP_%288023723138%29.jpg' width='150px'/>";
var canyonsPopup = "Canyons of the Ancients<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/My_Public_Lands_Roadtrip-_Canyons_of_the_Ancients_National_Monument_in_Colorado_%2819773890122%29.jpg/1280px-My_Public_Lands_Roadtrip-_Canyons_of_the_Ancients_National_Monument_in_Colorado_%2819773890122%29.jpg' width='150px'/>";
var aztecPopup = "Aztec Ruins<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Aztec_Ruins_National_Monument_by_RO.JPG/1280px-Aztec_Ruins_National_Monument_by_RO.JPG' width='150px'/>";
var gilaPopup = "Gila Cliff Dwellings<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Gila_Cliff_Dwellings%2C_New_Mexico%2C_USA_2012.jpg/1920px-Gila_Cliff_Dwellings%2C_New_Mexico%2C_USA_2012.jpg' width='150px'/>";

var customOptions = { maxWidth: 150 };

var marks = L.layerGroup().addTo(map);

var sites = [
  { name: "Mesa Verde", coords: [37.23, -108.46], popupHtml: mesaverdePopup },
  { name: "Casa Grande", coords: [32.99, -111.53], popupHtml: casagrandePopup },
  { name: "Organ Mountains", coords: [32.32, -106.57], popupHtml: organPopup },
  { name: "Chaco", coords: [36.05, -107.95], popupHtml: chacoPopup },
  { name: "Canyons", coords: [37.48, -108.88], popupHtml: canyonsPopup },
  { name: "Aztec Ruins", coords: [36.83, -107.99], popupHtml: aztecPopup },
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
layerControl.addOverlay(marks, "Historical Sites");

// boarding schools points
var schoolIcon = L.icon({
  iconUrl: "images/school_icon.webp",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -10]
});

var schoolsLayer;

fetch("data/schools.geojson")
  .then(res => res.json())
  .then(data => {
    schoolsLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: schoolIcon });
      },

      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "<b>Boarding School:</b> " + (feature.properties.Boarding_S || "Unknown") + "<br>" +
          "<b>Location:</b> " + (feature.properties.Location || "Unknown") + "<br>" +
          "<b>Operating Dates:</b> " + (feature.properties.Operating_Dates || "Unknown")
        );
      }
    }).addTo(map);

    layerControl.addOverlay(schoolsLayer, "Boarding Schools");
  })
  .catch(error => console.error("Error loading schools:", error));

window.addEventListener("resize", function () {
  map.invalidateSize();
});
