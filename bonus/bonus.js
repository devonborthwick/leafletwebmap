var map = L.map('weathermap').setView([38, -95], 4);
L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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

var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

$.getJSON(quakeUrl, function(json) {

   L.geoJson(json, {
  
      style: function(feature) {
        var mag = feature.properties.mag;
        if (mag >=7.0) {
            return {
                color: "#FF0000"
            }
        }
        if (mag >= 5.0) {
          return {
            color: "#FFA500"
          }; 
        }
        else if (mag >= 3.0) {
          return {
            color: "#FFFF00"
          };
        } else if (mag >= 2.0) {
          return {
            color: "#00FF00"
          };
        } else {
          return {
            color: "#ADD8E6"
          }
        }
      },
  
      onEachFeature: function(feature, layer) {
  
        var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
          "<br><b>Location:</b> " + feature.properties.place +
          "<br><b>Time:</b>" + feature.properties.time;
        
        layer.bindPopup(popupText);
      },
  
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
    }).addTo(map);
  });

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Magnitude</h4>";
    div.innerHTML += '<i style="background: #FF0000"></i><span>>=7.0 (Major)</span><br>';
    div.innerHTML += '<i style="background: #FFA500"></i><span>>=5.0 (Moderate)</span><br>';
    div.innerHTML += '<i style="background: #FFFF00"></i><span>>=3.0 (Light)</span><br>';
    div.innerHTML += '<i style="background: #00FF00"></i><span>>=2.0 (Minor)</span><br>';
    div.innerHTML += '<i style="background: #ADD8E6"></i><span><2.0 (Weak)</span><br>';
 
    return div;
  };
  
  legend.addTo(map);