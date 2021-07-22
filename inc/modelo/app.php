<?php
$url = $_GET["url"];
if (!empty($_GET["url"])) {
    // $mi_host = file_get_contents("https://api.ipify.org/");
    echo file_get_contents('http://localhost:5000/ping/'.base64_encode($url));

}elseif (!empty($_GET["u"])) {

    echo file_get_contents('http://localhost:4000/cue/'.$_GET["u"]);
}
