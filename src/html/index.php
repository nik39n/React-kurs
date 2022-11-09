<?php
phpinfo();
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "root";
$db = "laravelkurs";
$conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

return $conn;