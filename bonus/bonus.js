// var map = L.map('bonusmap').setView([38, -95], 4);

// // Base layer (replace with your preferred provider)
// var baseMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//   maxZoom: 17,
//   minZoom: 0,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';

// var alerts; // Declare variable to hold the actual layer

// var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// var quake; // Declare variable to hold the actual layer

// $.getJSON(weatherAlertsUrl, function(data) {
//   alerts = L.geoJSON(data, {
//     style: function(feature) {
//       var alertColor = 'orange';
//       if (feature.properties.severity === 'Severe') alertColor = 'red'; 
//       if (feature.properties.severity === 'Extreme') alertColor   
//  = 'black';
//       return { color: alertColor };
//     },
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(feature.properties.headline);
//     }
//   });
// }).done(function() {
//   // Add alerts layer to map only after data is fetched
//   alerts.addTo(map);
//   alerts.setZIndex(100);
// });

// $.getJSON(quakeUrl, function(json) {
//     quake = L.geoJson( json,{
//         style: function(feature) {
//                     var mag = feature.properties.mag;
//                     if (mag >=7.0) {
//                         return {
//                             color: "#FF0000"
//                         }
//                     }
//                     if (mag >= 5.0) {
//                       return {
//                         color: "#FFA500"
//                       }; 
//                     }
//                     else if (mag >= 3.0) {
//                       return {
//                         color: "#FFFF00"
//                       };
//                     } else if (mag >= 2.0) {
//                       return {
//                         color: "#00FF00"
//                       };
//                     } else {
//                       return {
//                         color: "#ADD8E6"
//                       }
//                     }
//                   },
              
//                   onEachFeature: function(feature, layer) {
              
//                     var popupText = "<b>Magnitude:</b> " + feature.properties.mag +
//                       "<br><b>Location:</b> " + feature.properties.place +
//                       "<br><b>Time:</b>" + feature.properties.time;
                    
//                     layer.bindPopup(popupText);
//                   },
              
//                  pointToLayer: function(feature, latlng) {
//                     return L.circleMarker(latlng);
//                   },
//   });
// }).done(function() {
//   // Add quake layer to map only after data is fetched
//   quake.addTo(map);
//   quake.setZIndex(100);
// });

// var baseMaps = {
//   "Base Map": baseMap
// };

// var overlayMaps = {
//   "Earthquakes": quake,
//   "Weather Alerts": alerts
// };

// L.control.layers(baseMaps, overlayMaps).addTo(map);
var map = L.map('bonusmap').setView([38, -95], 4);

// Base layer (replace with your preferred provider)
var baseMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  minZoom: 0,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';

var alerts; // Declare variable to hold the actual layer

var quakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

var quake; // Declare variable to hold the actual layer

$.getJSON(weatherAlertsUrl, function(data) {
  alerts = L.geoJSON(data, {
    style: function(feature) {
      var alertColor = 'orange';
      if (feature.properties.severity === 'Severe') alertColor = 'red'; 
      if (feature.properties.severity === 'Extreme') alertColor   
 = 'black';
      return { color: alertColor };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.headline);
    }
  });
}).done(function() {
  // Add alerts layer to map only after data is fetched
  alerts.addTo(map);
  // Set z-index after adding the layer
  alerts.setZIndex(100);
});

$.getJSON(quakeUrl, function(json) {
  quake = L.geoJson( json,{
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
  });
}).done(function() {
  // Add quake layer to map only after data is fetched
  quake.addTo(map);
  // Set z-index after adding the layer
  quake.setZIndex(100);
});
var baseMaps = {
  "Base Map": baseMap
};

var overlayMaps = {
  "Earthquakes": quake,
  "Weather Alerts": alerts
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

