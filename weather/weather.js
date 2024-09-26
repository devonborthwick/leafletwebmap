var map = L.map('weathermap').setView([38, -95], 4);
var basemapUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'; 
var basemap = L.tileLayer(basemapUrl, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});



   

var radarUrl=  'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://www.weather.gov/documentation/services-web-api#/default/get_alerts_active';
$.getJSON(weatherAlertsUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red';  
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(feature.properties.headline);

        }
    }).addTo(map);
});
