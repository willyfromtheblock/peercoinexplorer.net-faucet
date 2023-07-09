<?php
require_once("jsonRPCClient.php");
require_once("config.php");

# cors
header('Access-Control-Allow-Origin: "https://faucet.peercoinexplorer.net"');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

# verify captcha
if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (isset($_POST['h-captcha-response'])) {
    $captcha = $_POST['h-captcha-response'];
}
if (!$captcha) {
    echo json_encode(array('cookie-result' => false));
    exit;
}

$data = array(
    'secret' => $hcaptchaSecret,
    'response' => $_POST['h-captcha-response']
);
$verify = curl_init();
curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
curl_setopt($verify, CURLOPT_POST, true);
curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($verify);
$responseData = json_decode($response);

if($responseData->success) {
  #captcha is verified
  $success = true;
  $amount = 10;
  $address = $_POST["address"];

  try {
      $txid = $peercoin->sendtoaddress($address, $amount);
      $time = time();

      //mysql
      $mysqli = new mysqli('localhost', $mysqlUser, $mysqlPass, $mysqlDB);
      if ($mysqli->connect_errno) {
          echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
      }
      $query = "INSERT INTO transactions (address, amount, txid, time) VALUES ('$address', '$amount', '$txid', $time)";
      $mysqli->query($query);

      //return 
      echo json_encode(array("result" => $success, "address" => $_POST["address"], "txid" => $txid));
  } catch (Exception $e) {
      $result = $e->getMessage();
      $success = false;
      echo json_encode(array("result" => $success, "address" => $_POST["address"], "message" => $result));
  }
} else {
    echo json_encode(array("hCaptcha-result" => false));
}