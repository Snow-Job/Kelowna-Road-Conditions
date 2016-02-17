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
    <!-- Include jQuery -->
    <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
    <!-- Include jBox -->
    <link href="http://code.jboxcdn.com/0.3.2/jBox.css" rel="stylesheet">
    <script src="http://code.jboxcdn.com/0.3.2/jBox.min.js"></script>
		<!-- Latest compiled JavaScript -->
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <!-- our external style sheet -->
		<link rel="stylesheet" href="css/stylesheet.css">

    <!-- header javascript functions -->
    <script src="js/headerFunc.js"></script>
    <!-- checkbox list javascript functions -->
    <script src="js/listFunc.js"></script>



    <!-- resizes header when you scroll down -->
    <script>
        function init() {
            window.addEventListener('scroll', function(e){

                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 100,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header,"smaller");
                    var image = document.getElementById('imgLogo');
                    image.src = 'img/logo2.png';
                    image.style.width = '70px';
                    image.style.padding = '5px 0 0 0';
                } else {
                    if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                    var image = document.getElementById('imgLogo');
                    image.src = 'img/logo.png';
                    image.style.width = '150px';
                    image.style.padding = '20px 0 0 0';
                    }
                }
            });
        }
        window.onload = init();

    </script>

	</head>

<body>
  <div id="wrapper">
	<?php include("include/header.php");?>
  <div id="main">
      <div id="content">
          <section>
              <div class="container">
								<br>
                  <h1>Current Road Conditions: Kelowna</h1>
                  <p>Use the filters below to toggle different layers on the map.</p>
									<p>


              </div>
            </section>
            <section class="color">
          <div class="container" style="margin-top:20px;">
	<div class="row">
    <div class="col-xs-12 col-sm-4 col-md-4">
      <h3 class="text-center" style="color:white">Select a Filter Below:</h3>
      <br>
        <div class="well" style="max-height: 800px;overflow: auto;" id="sideContent">

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
                <li class="list-group-item"><img src="img/greenLine.png">&nbsp Snow - Cleared Roads</li>
                <li class="list-group-item"><img src="img/redLine.png">&nbsp Snow - Not Cleared</li>
                <li class="list-group-item"><img src="img/blueLine.png">&nbsp Construction - Road Closed</li>
                <li class="list-group-item"><img src="img/pinkLine.png">&nbsp Construction - Current Projects</li>
                <li class="list-group-item"><img src="img/yellowLine.png">&nbsp Events - Road Closed</li>
                <br />
          </ul>
          <span style="display: block !important; width: 320px; text-align: center; font-family: sans-serif; font-size: 12px; margin: 20px auto 0 auto;"><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:00000.1.71203&bannertypeclick=wu_clean2day" title="Kelowna, British Columbia Weather Forecast" target="_blank"><img src="http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_clean2day_metric_cond&airportcode=CYLW&ForcedCity=Kelowna&ForcedState=Canada&wmo=71203&language=EN" alt="Find more about Weather in Kelowna, CA" width="300" /></a><br><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:00000.1.71203&bannertypeclick=wu_clean2day" title="Get latest Weather Forecast updates" style="font-family: sans-serif; font-size: 12px; color: #000;" target="_blank">Click for weather forecast</a></span>
        </div>
        <pre id="display-json"></pre>

    </div>

    <div class="col-xs-12 col-sm-8 col-md-8">
      <!-- <div id="map" style="margin: 0 auto 0 auto;"></div> -->
      <!-- <br> -->
      <h3 class="text-center" style="color:white">Navigate the Google Map:</h3>
      <br>
      <!-- <br> -->
      <div class="google-maps">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164477.2564417612!2d-119.59474512615797!3d49.89960812697432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537d8cb6e3c730b3%3A0x4ef8e53ddab4c4f7!2sKelowna%2C+BC!5e0!3m2!1sen!2sca!4v1455680052493" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
</div>
    </div>



	</div> <!-- row -->
</div> <!-- container -->
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

      </div> <!-- #content -->
  </div><!-- #main -->


  </div><!-- /#wrapper -->
  <?php include("include/footer.php");?>
</body>
</html>
