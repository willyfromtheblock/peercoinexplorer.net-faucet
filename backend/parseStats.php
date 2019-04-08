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
    echo $e->getMessage();
}

//update balance 
$mysqli->query("UPDATE `info` SET `balance` = $balance");

//get other stats

//last payout
$lastPayout = $mysqli->query("SELECT * FROM `transactions` ORDER BY `id` DESC LIMIT 1 ");
$row =  $lastPayout->fetch_array(MYSQLI_ASSOC);
$lastPayoutTime = date("Y-m-d H:i:s", $row["time"]);
$lastPayout->free();

//total + week payouts
$allPayouts = $mysqli->query("SELECT `amount`, `time` FROM `transactions`");

$totalPayout = 0;
$weeklyPayout = 0;

while ($row =  $allPayouts->fetch_array(MYSQLI_ASSOC)) {
    $totalPayout += $row["amount"];
    if ($row["time"] >= time() - 604800) {
        //tx within last week
        $weeklyPayout += $row["amount"];
    }
}
//make array

$statsArray = array(
    "balance" => $balance,
    "lastPayoutTime" => $lastPayoutTime,
    "totalPayout" => $totalPayout,
    "weeklyPayout" => $weeklyPayout
);

//write file
file_put_contents("/var/www/html/peercoinexplorer.net/faucet/backend/stats.json", json_encode($statsArray));
