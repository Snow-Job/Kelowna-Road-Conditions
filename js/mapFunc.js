var plowRoute=[];
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 49.8801, lng: -119.4436},
    zoom: 12
  });


  //query csv file named "text.csv" and process it
      $.ajax({
          type:"GET",
          url:"data/test.csv",
          dataType:"text",
          success:function(data){
              processData(data);}
      });
  }

  function processData(data){
      //get the latitude and longitude
      var allDataLines=data.split(/\r\n|\n/);
      var headers=allDataLines[8].split(','); // in this case, headers are at 9th line in the csv
      for(var i=9;i<19;i++){                  // get data from line 10 to line 19
          var line=parseRow(allDataLines[i]);
          plowRoute.push(line[7]+','+line[6]);// latitude is in 8th cell, longitude is in 7th cell
      }
      //get snap-to-road points according to the points provide and plot
      $.get('https://roads.googleapis.com/v1/snapToRoads', {
          interpolate: true,
          key:'AIzaSyBaWC_s7uAHTX6BeKramcTZDaFfXTh5k74',
          path: plowRoute.join('|')
      },function(data){
          var snappedCoordinates=[];
          for(var i=0;i<data.snappedPoints.length;i++){
              var latlng = new google.maps.LatLng(
                  data.snappedPoints[i].location.latitude,
                  data.snappedPoints[i].location.longitude);
              snappedCoordinates.push(latlng);
          }
          var plowPath=new google.maps.Polyline({
              path:snappedCoordinates,
              strokeColor:'#FF0000',
              strokeOpacity:1.0,
              strokeWeight:2
          });
          plowPath.setMap(map);
      });
  }
  //parse and split data by comma, and take care of commas in quotes/
  function parseRow(str){
      var insideQuote = false,
      entries = [],
      entry = [];
      str.split('').forEach(function (character) {
          if(character === '"') {
              insideQuote = !insideQuote;
          } else {
              if(character == "," && !insideQuote) {
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
  function loadScript(){
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src="http://maps.googleapis.com/maps/api/js?callback=initMap";
    document.head.appendChild(script);

  }
  window.onload=loadScript();
