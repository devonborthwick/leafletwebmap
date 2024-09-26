var map = L.map('weathermap').setView([38, -95], 4);
L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


   

var radarUrl=  'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);


var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';

$.getJSON(weatherAlertsUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red'; 
            if (feature.properties.severity === 'Extreme') alertColor = 'black';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.headline);

        }
    }).addTo(map);
});
