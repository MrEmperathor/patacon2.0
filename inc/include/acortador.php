#!/usr/bin/php
<?php

function ouo_io($claveApi, $enlace){
 
	//Petición GET
	$acortado = @file_get_contents(
	            "http://ouo.io/api/"
	            . urlencode($claveApi)
	            . "?s="
	            . urlencode($enlace));
 
 
	// Comprobar si lo que obtuvimo
	// es un enlace válido utilizando una
	// expresión regular
 
    if (preg_match('/^http:\/\/ouo\.io\/\w+$/', $acortado) !== 1)
        // throw new Exception("Enlace inesperado al acortar con ouo.io: " . $acortado);
    return $acortado;
}
 
// Ejemplo de uso

$claveApi = "RT8uMIRV";
$enlace = $argv[1];
echo ouo_io($claveApi, $enlace); //Salida: algo como http://ouo.io/D5UZXp


?>
