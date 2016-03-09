<?php

        #connect to db
	$mysqli = mysqli_connect("cosc304.ok.ubc.ca", "mjoseph", "15057136", "db_mjoseph");

        #get range of times to query on db based on current time of day then format
        $tsNow = mktime( date( 'H' ), date( 'i' ), date( 's' ), 1, 4, 2016 );
        $nowTime = date( 'Y-m-d H:i:s', $tsNow );
        $futureTime = date ( 'Y-m-d H:i:s', $tsNow + ( 60 * 10 ) );
        #create array to store points in and set of query
        $pointarr = "";
        $sql = "select id, lon, lat, curtime from Data where curtime > '$nowTime' and curtime < '$futureTime';";
	$res = mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));

        #fill array with points
        if ($res) {
		while ($data= mysqli_fetch_array($res, MYSQLI_ASSOC)) {
                    $pointarr = $pointarr.$data['id'].", ".$data['lat'].", ".$data['lon'].", ".$data['curtime']."\n";
	   	}
        echo $pointarr;
	} else {
		echo "Could not retrieve records";
	}

?>
