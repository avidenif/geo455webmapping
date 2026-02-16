const map = L.map("map").setView([44.804897440194374, -93.16720073049063], 7);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

L.marker([43.81642117539796, -91.23209456992531])
  .addTo(map)
  .bindPopup("<b>Hello!</b><br>I am University of Wisconsin–La Crosse.")
  .openPopup();

L.marker([44.804897440194374, -93.16720073049063])
  .addTo(map)
  .bindPopup("<b>Hello!</b><br>I am Avi's Hometown!")
  .openPopup();

L.marker([46.78696999911343, -92.10313609155438])
  .addTo(map)
  .bindPopup("<b>Hello!</b><br>I am Avi's favorite vacation spot in Minnesota!")
  .openPopup();