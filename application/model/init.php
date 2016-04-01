<?php
$db = new database();

#get range of times to query on db based on current time of day then format
date_default_timezone_set('PST8PDT');
$tsNow = mktime(date('H'), date('i'), date('s'), 12, 27, 2015);
$timeBefore = date('Y-m-d H:i:s', $tsNow - (60*10));
$timeNow = date('Y-m-d H:i:s', $tsNow);
#create array to store points in and set of query
$pointarr = '';
$sql = $db -> select("select id, lon, lat, curtime from Data where curtime > '$timeBefore' and curtime < '$timeNow';");

#fill array with points
if ($sql) {
    while ($data = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
        $pointarr = $pointarr.$data['id'].', '.$data['lat'].', '.$data['lon'].', '.$data['curtime']."\n";
    }
    echo $pointarr;
} else {
    echo 'Could not retrieve records';
}
 ?>
