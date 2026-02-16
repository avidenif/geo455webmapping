const map = L.map("map").setView([44.804897440194374, -93.16720073049063], 7);

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
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