// window.onload = loadScript();

var plowRoute = [];
var truckRoute = [];
var color = ["#FF6600", "#FF3300", "#FF0000", "#CC3300", "#CC0033", "#FF3366",
  "#FF0033", "#FF0066", "#CC0099", "#9900CC", "#6600FF", "#3300FF",
  "#0033CC", "#3366FF", "#0099FF", "#33CCFF", "#00CC99", "#00FF66",
  "#FFCC33", "#FF9900", "#FFCC00", "#CC9900", "#99CC00", "#CCFF00"
];

function initMap(layer) {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {
      lat: 49.8801,
      lng: -119.4436
    },
    zoom: 12
  });
  //query database and process it
  $.ajax({
    type: "GET",
    url: "../application/model/dataUpdate.php",
    success: function(data) {
      processData(data);
    }
  });

  if (layer == 'traffic') {
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }

  if (layer == 'bike') {
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
  }

}

/**
 * initMap2 - this is the original blank map that loads centered on Kelowna
 * @author James Rogers
 */
function initMap2() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {
      lat: 49.8801,
      lng: -119.4436
    },
    zoom: 12
  });

}

function processData(data) {
  //get the latitude and longitude
  var allDataLines = data.split(/\r\n|\n/);
  var temp = parseRow(allDataLines[0]);
  var id = temp[0];
  for (var i = 0; i < allDataLines.length; i++) { // get data from line 10 to line 19
    var line = parseRow(allDataLines[i]);
    if (id !== line[0]) {
      id = line[0];
      plowRoute.push(truckRoute);
      truckRoute = [];
    }
    truckRoute.push(line[1] + ',' + line[2]);
  }
  //get snap-to-road points according to the points provide and plot
  for (var ii = 0; ii < plowRoute.length; ii++) {
    var start = 0,
      end = 100;
    var segment = [];
    while (start < plowRoute[ii].length) {
      if (end > plowRoute[ii].length) {
        end = plowRoute[ii].length;
      }
      segment = plowRoute[ii].slice(start, end);
      start += 99;
      end = start + 100;
      $.get('https://roads.googleapis.com/v1/snapToRoads', {
        interpolate: true,
        key: 'AIzaSyA7Ka8FkNjbSUzPyg0OfMqDqHw257cbWSQ',
        path: segment.join('|')
      }, function(data) {
        var snappedCoordinates = [];
        for (var i = 0; i < data.snappedPoints.length; i++) {
          var latlng = new google.maps.LatLng(
            data.snappedPoints[i].location.latitude,
            data.snappedPoints[i].location.longitude);
          snappedCoordinates.push(latlng);
        }
        var plowPath = new google.maps.Polyline({
          path: snappedCoordinates,
          strokeColor: color.pop(),
          strokeOpacity: 1.0,
          strokeWeight: 4,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
        });
        plowPath.setMap(map);
        animateCircle(plowPath);
      });
    }
  }
}

//parse and split data by comma, and take care of commas in quotes/
function parseRow(str) {
  var insideQuote = false,
    entries = [],
    entry = [];
  str.split('').forEach(function(character) {
    if (character === '"') {
      insideQuote = !insideQuote;
    } else {
      if (character == "," && !insideQuote) {
        entries.push(entry.join(''));
        entry = [];
      } else {
        entry.push(character);
      }
    }
  });
  entries.push(entry.join(''));
  return entries;
}

// function loadScript() {
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = "http://maps.googleapis.com/maps/api/js?callback=initMap";
//   document.head.appendChild(script);
// }

/**
 * Animate an icon along a polyline
 * @author James Rogers
 * @param {Object} polyline The line to animate the icon along
 */
function animateCircle(polyline) {
  var count = 0;
  // fallback icon if the poly has no icon to animate
  var defaultIcon = [{
    icon: lineSymbol,
    offset: '100%'
  }];
  window.setInterval(function() {
    count = (count + 1) % 200;
    var icons = polyline.get('icons') || defaultIcon;
    icons[0].offset = (count / 2) + '%';
    polyline.set('icons', icons);
  }, 20);
}
