var map = L.map('earthquakemap').setview([38, -95], 4);
var basemapUrl = 'https://.tile.opentopomap.org/{z}/{x}/{y}.png';
var basemap = L.tilelayer(basemapUrl, {attribution: '&copy; <a href="https://' + 'www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}); 

var quakeUrl=  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
var quakeDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var quake = L.tilelayer.wms(quakeUrl, quakeDisplayOptions).addTo(map);

$.getJSON(quakeUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'green';
            if (feature.properties.mag === '>1') alertColor = 'green';  
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.headline);

        }
    }).addTo(map);
});
