<?php
require_once("jsonRPCClient.php");
require_once("config.php");

//init mysql

$mysqli = new mysqli('localhost', $mysqlUser, $mysqlPass, $mysqlDB);
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

//get current balance
$balance = 0;

try {
    $response = $peercoin->getwalletinfo();
    if (array_key_exists("balance", $response)) {
        $balance = $response["balance"];
    }
} catch (Exception $e) {
    $result = $e->getMessage();
    echo $result;
}

//update balance 
$query = "UPDATE `info` SET `balance` = $balance";
$result = $mysqli->query($query);
