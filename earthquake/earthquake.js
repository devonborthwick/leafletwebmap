var map = L.map('quakemap').setView([38, -95], 4);
L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


   
// Additional Layer
// var radarUrl=  'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?';
// var radarDisplayOptions = {
//     layers: 'nexrad-n0r-900913',
//     format: 'image/png',
//     transparent: true
// };
// var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);


var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

$.getJSON(quakeUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature, latlng){
            // var alertColor = 'orange';
            // if (feature.properties.severity === 'Severe') alertColor = 'red'; 
            // if (feature.properties.severity === 'Extreme') alertColor = 'black';
            return l.circleMarker{latlng, geojsonMarkerOptions};
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.headline);

        }
    }).addTo(map);
});
