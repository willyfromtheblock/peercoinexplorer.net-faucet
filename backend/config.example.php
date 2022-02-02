<?php
$rpcUser = "bitcoinrpc";
$rpcPass = "rpcpass";
$url = "http://localhost:9904";
$peercoin = new Bitcoin($url, $rpcUser, $rpcPass);
$hcaptchaSecret = "myhcaptcasecret";