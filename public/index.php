<!DOCTYPE html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>City of Kelowna Road Mapper</title>
  <!-- Bootstrap fonts -->
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <!-- our external style sheet -->
  <link rel="stylesheet" href="css/stylesheet.css">
  <!-- header javascript functions -->
  <script src="js/headerFunc.js"></script>
  <!-- google maps -->
  <script src="js/mapFunc.js"></script>
  <!-- header resize on scroll function -->
  <script src="js/headerScroll.js"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
  <!-- Include jQuery -->
  <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
  <!-- checkbox list javascript functions -->
  <!-- Include jBox -->
  <link href="http://code.jboxcdn.com/0.3.2/jBox.css" rel="stylesheet">
  <script src="http://code.jboxcdn.com/0.3.2/jBox.min.js"></script>
  <!-- Latest compiled JavaScript -->
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script src="js/listFunc.js"></script>
  <script>
    // Symbol that gets animated along the polyline
    var lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 2,
      strokeColor: '#005db5',
      strokeWidth: '#005db5',
      strokeWeight: 5
    };
  </script>
</head>

<body>
  <div id="wrapper">
    <?php include '../application/views/header.php';?>
      <div id="main">
        <div id="content">
          <section>
            <div class="container">
              <br>
              <br>
              <h1>Current Road Conditions: Kelowna</h1>
              <p>Use the filters below to toggle different layers on the map.</p>
              <p>
            </div>
          </section>
          <section class="color">
            <div class="container" style="margin-top:20px;">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-4">
                  <h3 class="text-center" style="color:white">Select a Filter Below:</h3>
                  <br>
                  <div class="well" style="max-height: 800px; overflow: auto;" id="sideContent">
                    <br>
                    <ul id="check-list-box" class="list-group checked-list-box">
                      <li class="list-group-item">Snow: Cleared Roads</li>
                      <li class="list-group-item">Snow: Not Cleared</li>
                      <li class="list-group-item">Construction: Road Closures</li>
                      <li class="list-group-item">Construction: Current Projects</li>
                      <li class="list-group-item">Events: Closures</li>
                    </ul>
                    <br />
                    <button class="btn btn-primary col-xs-12" id="get-checked-data">Update</button>
                    <br>
                    <br>
                    <h3 class="text-center" style="color:black">Legend:</h3>
                    <br>
                    <ul class="list-group">
                      <li class="list-group-item"><img src="images/greenLine.png">&nbsp Snow - Cleared Roads</li>
                      <li class="list-group-item"><img src="images/redLine.png">&nbsp Snow - Not Cleared</li>
                      <li class="list-group-item"><img src="images/blueLine.png">&nbsp Construction - Road Closed</li>
                      <li class="list-group-item"><img src="images/pinkLine.png">&nbsp Construction - Current Projects</li>
                      <li class="list-group-item"><img src="images/yellowLine.png">&nbsp Events - Road Closed</li>
                      <br />
                      <span style="display: block !important; width: 320px; text-align: center; font-family: sans-serif; font-size: 12px; margin: 20px auto 0 auto;"><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:00000.1.71203&bannertypeclick=wu_clean2day" title="Kelowna, British Columbia Weather Forecast" target="_blank"><img src="http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_clean2day_metric_cond&airportcode=CYLW&ForcedCity=Kelowna&ForcedState=Canada&wmo=71203&language=EN" alt="Find more about Weather in Kelowna, CA" width="300" /></a><br><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:00000.1.71203&bannertypeclick=wu_clean2day" title="Get latest Weather Forecast updates" style="font-family: sans-serif; font-size: 12px; color: #000;" target="_blank">Click for weather forecast</a></span>
                    </ul>
                  </div>
                  <pre id="display-json"></pre>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-8">
                  <!-- <div id="map" style="margin: 0 auto 0 auto;"></div> -->
                  <h3 class="text-center" style="color:white">Navigate the Google Map:</h3>
                  <br>
                  <div class="google-maps">
                    <div id="map"></div>
                  </div>
                </div>
              </div>
              <!-- row -->
            </div>
            <!-- container -->
            </p>
            <!-- </div> -->
          </section>
          <section>
            <div class="container">
              <h1>Notes:</h1>
              <li>The current construction projects refer to the current capital projects in the city.</li>
              <li>Snowplow cleared roads are updated every 10 minutes, or as the data becomes available.</li>
            </div>
          </section>
        </div>
        <!-- #content -->
      </div>
      <!-- #main -->
  </div>
  <!-- /#wrapper -->
  <?php include '../application/views/footer.php';?>
</body>

</html>
