var plowRoute=[];
var truckRoute=[];
var color=["#FF6600","#FF3300","#FF0000","#CC3300","#FF0033","#FF0066","#CC0099","#9900CC","#6600FF","#3300FF","#0033CC","#3366FF","#0099FF","#33CCFF","#00CC99","#00FF66","#FFCC33"];
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 49.8801, lng: -119.4436},
    zoom: 12
  });


  //query csv file named "text.csv" and process it
      $.ajax({
          type:"GET",
          url:"../application/views/dataUpdate.php",
          success:function(data){
            processData(data);}
      });
  }

  function processData(data){
      //get the latitude and longitude
      var allDataLines=data.split(/\r\n|\n/);
          var temp=parseRow(allDataLines[0]);
          var id=temp[0];
      for(var i=0;i<allDataLines.length;i++){                  // get data from line 10 to line 19
          var line=parseRow(allDataLines[i]);
          if (id!=line[0]){
            id=line[0];
            plowRoute.push(truckRoute);
            truckRoute=[];
          }
            truckRoute.push(line[1]+','+line[2]);
      }
      //get snap-to-road points according to the points provide and plot
      for(var ii=0;ii<plowRoute.length;ii++){
      $.get('https://roads.googleapis.com/v1/snapToRoads', {
          interpolate: true,
          key:'AIzaSyBaWC_s7uAHTX6BeKramcTZDaFfXTh5k74',
          path: plowRoute[ii].join('|')
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
              strokeColor:color.pop(),
              strokeOpacity:1.0,
              strokeWeight:4
          });
          plowPath.setMap(map);
      });
    }

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
