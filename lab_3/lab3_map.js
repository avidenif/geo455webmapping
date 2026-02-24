const map = L.map("map").setView([35.153179639769064, 136.89882974436026], 8);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

var myIcon1 = L.icon({
    iconUrl: 'images/icon1.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon2 = L.icon({
    iconUrl: 'images/icon2.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon3 = L.icon({
    iconUrl: 'images/icon3.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon4 = L.icon({
    iconUrl: 'images/icon4.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon5 = L.icon({
    iconUrl: 'images/icon5.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon6 = L.icon({
    iconUrl: 'images/icon6.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon7 = L.icon({
    iconUrl: 'images/icon7.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon8 = L.icon({
    iconUrl: 'images/icon8.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon9 = L.icon({
    iconUrl: 'images/icon9.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon10 = L.icon({
    iconUrl: 'images/icon10.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon11 = L.icon({
    iconUrl: 'images/icon11.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon12 = L.icon({
    iconUrl: 'images/icon12.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon13 = L.icon({
    iconUrl: 'images/icon13.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon14 = L.icon({
    iconUrl: 'images/icon14.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon15 = L.icon({
    iconUrl: 'images/icon15.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon16 = L.icon({
    iconUrl: 'images/icon16.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon17 = L.icon({
    iconUrl: 'images/icon17.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var myIcon18 = L.icon({
    iconUrl: 'images/icon18.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
});

var nar = L.marker([35.77077873, 140.3842401], {icon: myIcon1})
  .bindPopup(`
    <div class="popup">
      <b>Narita</b><br>
      <img src="images/img1.jpg" alt="Narita">
    </div>
  `)
  .addTo(map);

var toko = L.marker([34.85273235, 136.8099447], {icon: myIcon2})
  .bindPopup(`
    <div class="popup">
      <b>Tokoname</b><br>
      <img src="images/img2.jpg" alt="Tokoname">
    </div>
  `)
  .addTo(map);

var nag = L.marker([35.1662323, 136.8753928], {icon: myIcon3})
  .bindPopup(`
    <div class="popup">
      <b>Nagoya</b><br>
      <img src="images/img3.jpg" alt="Nagoya">
    </div>
  `)
  .addTo(map);

var naga = L.marker([35.17497721, 137.0881761], {icon: myIcon4})
  .bindPopup(`
    <div class="popup">
      <b>Nagakute</b><br>
      <img src="images/img4.jpg" alt="Nagakute">
    </div>
  `)
  .addTo(map);

var shib = L.marker([35.66839767, 139.7055835], {icon: myIcon5})
  .bindPopup(`
    <div class="popup">
      <b>Shibuya and Takeshita Shopping Street</b><br>
      <img src="images/img5.jpg" alt="Shibuya and Takeshita Shopping Street">
    </div>
  `)
  .addTo(map);

var tok = L.marker([35.67977261, 139.7756025], {icon: myIcon6})
  .bindPopup(`
    <div class="popup">
      <b>Tokyo</b><br>
      <img src="images/img7.jpg" alt="Tokyo">
    </div>
  `)
  .addTo(map);

var ryo = L.marker([35.03441524, 135.718258], {icon: myIcon7})
  .bindPopup(`
    <div class="popup">
      <b>Ryoanji Temple</b><br>
      <img src="images/img8.jpg" alt="Ryoanji Temple">
    </div>
  `)
  .addTo(map);

var kink = L.marker([35.03913986, 135.7294278], {icon: myIcon8})
  .bindPopup(`
    <div class="popup">
      <b>Kinkaku-ji Temple</b><br>
      <img src="images/img9.jpg" alt="Kinkaku-ji Temple">
    </div>
  `)
  .addTo(map);

var san = L.marker([34.98787571, 135.7726085], {icon: myIcon9})
  .bindPopup(`
    <div class="popup">
      <b>Sanjusangen-do Temple</b><br>
      <img src="images/img10.jpg" alt="Sanjusangen-do Temple">
    </div>
  `)
  .addTo(map);

var kiyo = L.marker([34.99470136, 135.7846717], {icon: myIcon10})
  .bindPopup(`
    <div class="popup">
      <b>Kiyomizu-dera Temple</b><br>
      <img src="images/img11.jpg" alt="Kiyomizu-dera Temple">
    </div>
  `)
  .addTo(map);

var sen = L.marker([34.96695777, 135.7746412], {icon: myIcon11})
  .bindPopup(`
    <div class="popup">
      <b>Senbon Tori Gates, Fukakusa Yabunouchicho</b><br>
      <img src="images/img12.jpg" alt="Senbon Tori Gates, Fukakusa Yabunouchicho">
    </div>
  `)
  .addTo(map);

var osu = L.marker([35.15961026, 136.8994454], {icon: myIcon12})
  .bindPopup(`
    <div class="popup">
      <b>Osu Kannon Temple and Osu Shopping Street</b><br>
      <img src="images/img13.jpg" alt="Osu Kannon Temple and Osu Shopping Street">
    </div>
  `)
  .addTo(map);

var atsu = L.marker([35.1272877, 136.9086787], {icon: myIcon13})
  .bindPopup(`
    <div class="popup">
      <b>Atsuta-jingu Shrine</b><br>
      <img src="images/img14.jpg" alt="Atsuta-jingu Shrine">
    </div>
  `)
  .addTo(map);

var nara = L.marker([34.68493231, 135.8430925], {icon: myIcon14})
  .bindPopup(`
    <div class="popup">
      <b>Nara Park</b><br>
      <img src="images/img15.jpg" alt="Nara Park">
    </div>
  `)
  .addTo(map);

var kofu = L.marker([34.68312523, 135.8312769], {icon: myIcon15})
  .bindPopup(`
    <div class="popup">
      <b>Kōfuku-ji Temple</b><br>
      <img src="images/img16.jpg" alt="Kōfuku-ji Temple">
    </div>
  `)
  .addTo(map);

var kasu = L.marker([34.681466, 135.8484773], {icon: myIcon16})
  .bindPopup(`
    <div class="popup">
      <b>Kasugataisha Shrine</b><br>
      <img src="images/img17.jpg" alt="Kasugataisha Shrine">
    </div>
  `)
  .addTo(map);

var cast = L.marker([35.18468872, 136.8996722], {icon: myIcon17})
  .bindPopup(`
    <div class="popup">
      <b>Nagoya Castle</b><br>
      <img src="images/img18.jpg" alt="Nagoya Castle">
    </div>
  `)
  .addTo(map);

var kiyosu = L.marker([35.21413037, 136.8343211], {icon: myIcon18})
  .bindPopup(`
    <div class="popup">
      <b>Kiyosu</b><br>
      <img src="images/img19.jpg" alt="Kiyosu">
    </div>
  `)
  .addTo(map);

