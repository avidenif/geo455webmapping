//-- create map

var mymap = L.map("map", {
  center: [51.48882027639122, -0.1028811094342392],
  zoom: 11,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(mymap);

// MiniMap basemap (no key)
var miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 0,
  maxZoom: 13,
  attribution: '&copy; OpenStreetMap'
});

// Add minimap control
var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(mymap);

//---POP DENSITY
// colors
function getColorDensity(value) {
    return value > 139 ? '#08519c':
           value > 87  ? '#3182bd':
           value > 53  ? '#6baed6':
           value > 32  ? '#bdd7e7':
                         '#eff3ff';
}

function styleDensity(feature){
    return {
        fillColor: getColorDensity(feature.properties.pop_den),   
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
} 

// highlight function
function highlightFeature(e) {
    var layer = e.target;
  layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

// reset function
function resetDensityHighlight(e) {
  densitylayer.resetStyle(e.target);
  e.target.closePopup();
}

// interaction functions
function onEachDensityFeature(feature, layer) {
  layer.bindPopup(
    '<strong>' + feature.properties.NAME + '</strong><br>' +
    '<span style="color:purple">' + feature.properties.pop_den + ' people/hectares</span>'
  );

  layer.on({
    mouseover: function (e) {
      highlightFeature(e);
      e.target.openPopup();
    },
    mouseout: resetDensityHighlight
  });
}

var densitylayer = L.geoJSON(data, {
    style: styleDensity,
    onEachFeature: onEachDensityFeature
}).addTo(mymap);

// build legends in side panel

function buildLegendHTML(title, grades, colorFunction) {
  var html = '<div class="legend-title">' + title + '</div>';
  
  for (var i = 0; i < grades.length; i++) {
    var from = grades[i];
    var to = grades[i + 1];
    
    html +=
      '<div class="legend-box">' +
        '<span class="legend-color" style="background:' + colorFunction(from + 1) + '"></span>' +
        '<span>' + from + (to ? '&ndash;' + to : '+') + '</span>' +
      '</div>';
  }
  return html;
}

// insert density legend
var densityLegendDiv = document.getElementById('density-legend');
if (densityLegendDiv) {
  densityLegendDiv.innerHTML = buildLegendHTML(
    'Population Density',
    [0, 32, 53, 87, 139],
    getColorDensity
  );
}

//---NON_ENG SPEAKERS DENSITY

// colors
function getColorSpeak(value) {
    return value > 6.45 ? '#006d2c':
           value > 4.43 ? '#31a354':
           value > 2.25 ? '#74c476':
           value > 0.99 ? '#bae4b3':
                          '#edf8e9';
}

function styleSpeak(feature){
    return {
        fillColor: getColorSpeak(feature.properties.speak_den),   
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    };
} 

// highlight function
function highlightSpeakFeature(e) {
    var layer = e.target;
  layer.setStyle({
        weight: 5,
        color: '#666',
        fillOpacity: 0.7
    });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

// reset function
function resetSpeakHighlight(e) {
  speak_densitylayer.resetStyle(e.target);
  e.target.closePopup();
}

// interaction functions
function onEachSpeakFeature(feature, layer) {
  layer.bindPopup(
    '<strong>' + feature.properties.name + '</strong><br>' +
    '<span style="color:purple">' + feature.properties.speak_den + ' people/hectares</span>'
  );

  layer.on({
    mouseover: function (e) {
      highlightSpeakFeature(e);
      e.target.openPopup();
    },
    mouseout: resetSpeakHighlight
  });
}

var speak_densitylayer = L.geoJSON(speaker_den, {
    style: styleSpeak,
    onEachFeature: onEachSpeakFeature
}).addTo(mymap);


// insert density legend
var speakLegendDiv = document.getElementById('language-legend');
if (speakLegendDiv) {
  speakLegendDiv.innerHTML = buildLegendHTML(
    'Non-English Speakers',
    [0, 0.99, 2.25, 4.43, 6.45],
    getColorSpeak
  );
}


// layer control menu
var baseLayers = {
  "Population Density": densitylayer,
  "Non-English Speakers": speak_densitylayer
};  

var overlays = {};

L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(mymap);