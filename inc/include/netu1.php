#!/usr/bin/php
<?php 
include __DIR__ . '/../config.php';
$user_token = $CONFIG["NetuApi"];


// echo "token: ".$user_token;

// $url = 'http://netu.tv/plugins/cb_multiserver/api/get_upload_server.php?user_hash=ef5c25e20b0ee1aa668542c7357fdc70';


// $json = file_get_contents($url);
// $datos = json_decode($json, true);
// print_r($datos);



////////////////////////////////////////////////////////
// API version 1.1 (ssl)
//
// for php 5.6+ you need to make some changes in code
// method 1
// add the following line
// curl_setopt($ch, CURLOPT_SAFE_UPLOAD, 0);
//
// method 2
// change
// $post_fields['Filedata'] = "@".$file;
// to
// $post_fields['Filedata'] = CURLFile($file);
////////////////////////////////////////////////////////


//REQUIRED Registered Users - You can find your user token in profile page.


// $user_token = "859caaf780b6ad03e12ccf3f7e7ca4c4";

//$file = "/var/www/video.mp4";

$file = $argv[1];

function removeBOM($str="") {
    if(substr($str, 0, 3) == pack('CCC', 0xef, 0xbb, 0xbf)) {
        $str = substr($str, 3);
    }
    return $str;
}


$ctx = stream_context_create(array(
            'ssl'=>array(
                'verify_peer'=>false,
                'verify_peer_name'=>false,
            ),
));

function curl($url="",$post_fields=array()){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_POST,1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $result=curl_exec ($ch);

    $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close ($ch);
    return(array("result" => json_decode(removeBOM($result), true), "code" => $code));
}


if(!file_exists("$file"))
die("ERROR: Can't find '$file'!\n");

$path_parts = pathinfo($file);
$ext = $path_parts['extension'];
$title = $path_parts['basename'];
$allowed = array("flv", "avi", "rmvb", "mkv", "mp4", "wmv", "mpeg", "mpg", "mov","divx","3gp","xvid","asf","rm","dat","m4v","f4v","webm","ogv");

if (!in_array(strtolower($ext),$allowed))
    die("ERROR: Video format not permitted. Formats allowed: wmv,avi,divx,3gp,mov,mpeg,mpg,xvid,flv,asf,rm,dat,mp4,mkv,m4v,f4v,webm,ogv!\n");

$con = file_get_contents("https://netu.tv/plugins/cb_multiserver/api/get_upload_server.php?user_hash=".$user_token, false, $ctx);
// 859caaf780b6ad03e12ccf3f7e7ca4c4

$converter = json_decode(removeBOM($con), true);

// echo "server to upload: ".var_dump($converter);

if(isset($converterp['error']))
    die("ERROR: Could not choose converter. Aborting. Error:(".$converter['error'].") \n");

if (function_exists('curl_file_create')) { // php 5.5+
  $post_fields['Filedata'] = curl_file_create($file);
} else {
  $post_fields['Filedata'] = "@".$file;
}
$post_fields['upload'] = "1";

foreach ($converter as $key => &$value) {
    $post_fields[$key] = $value;
}
// echo "upload video to server: ".$converter['upload_server'];
$result = curl($converter['upload_server'],$post_fields);


if($result['code'] == 200){

    if(isset($result['result']['success']))
    {
        $post_fields = array();
        $post_fields['insertVideo'] = "yes";
        $post_fields['title'] = $title;
        $post_fields['server='] = $converter['upload_server'];
        $post_fields['user_hash'] = $user_token;
        foreach ($result['result'] as $key => &$value) {
            $post_fields[$key] = $value;
        }
        $result_insert = curl("http://netu.tv/actions/file_uploader.php",$post_fields);
        if($result_insert['code'] == 200){

            preg_match('/<iframe src="(.*?)"/', $result_insert['result']['embed_code_non_secured'], $match);
            echo $match[1];


            // echo $result_insert['result']['video_link'];
            // echo "....ESTO ES UN SIMULACRO....";
            // print "\n ";
            // var_dump($result_insert['result']);
        }else {
            echo "-----else3----";
             echo $result_insert['result'];
        }
    }else{
        echo "-----else2----";
        var_dump($result);
    }
}else{
    echo "-----else1----";
    var_dump($result);}
 ?>

