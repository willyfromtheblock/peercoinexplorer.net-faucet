<?php
require_once("jsonRPCClient.php");
require_once("config.php");

# verify captcha
if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
    $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (isset($_POST['g-recaptcha-response'])) {
    $captcha = $_POST['g-recaptcha-response'];
}
if (!$captcha) {
    echo json_encode(array(result => false));
    exit;
}
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $recaptchaSecret . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']);
if ($response . success == false) {
    echo json_encode(array(result => false));
} else {
    #captcha is verified
    $success = true;
    try {
        $response = $peercoin->sendtoaddress($_POST["address"], 100);
        echo json_encode(array("result" => $success, "address" => $_POST["address"], "txid" => $response));
    } catch (Exception $e) {
        $result = $e->getMessage();
        $success = false;
        echo json_encode(array("result" => $success, "address" => $_POST["address"], "message" => $result));
    }
}
