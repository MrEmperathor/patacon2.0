function doSomething_Click(post_type, post_id, dominio) {

    var dominio = 'https://'+dominio;
    var fembedEmbed = document.getElementById('fembedEmbed').value;
    var mystream = document.getElementById('mystream').value;
    var fembed = document.getElementById('fembed').value;
    var short720 = document.getElementById('short720').value;
    var netu = document.getElementById('netu').value;
    var short1080 = document.getElementById('short1080').value;


    
    // var fembedRedirect = document.getElementById('fembedRedirect').value;
    // var short = document.getElementById('short').value;
    // var ouo = document.getElementById('ouo').value;
    //idioma
    var idio = document.getElementById('idioma').value;
    // calidad
    var calid = document.getElementById('calidad').value;
    var poster = document.getElementById('poster').value;

    //tmdb
    if (post_id) {
        var tmdb = post_id;
    }else{
        var tmdb = document.getElementById('tmdb').value;
    }

    /*
    create: crear post nuevos
    update_links: actualizar post
    */
    // 29 = latino
    // 30 = castellano
    // 31 = sub

    var links = [];
    var idioma = [];
    var calidad = [85,84,84,84,84,84];
    var trType = [2,1,2,2,1,1];
    var api_key = '4cd9cd25-fc28-4089-9977-70377dc6cd4f';
    var type = post_type;
    // var urll = 'http://pelis24hd.test/wp-json/bk-dcms-seo-yoast-generate-post/v2';
    // postID/88/api/'.$api_key.'/blinks/'.$enlacess.'/blang/'.$idiomas.'/bcalidad/'.$calidades.'/type/'.$type';
    
    if (short1080 && short1080 != "No hay enlaces") links.push(short1080);
    if (netu && netu != "No hay enlaces") links.push(netu);
    if (short720 && short720 != "No hay enlaces") links.push(short720);
    if (fembed && fembed != "No hay enlaces") links.push(fembed);
    if (mystream && mystream != "No hay enlaces") links.push(mystream);
    if (fembedEmbed && fembedEmbed != "No hay enlaces") links.push(fembedEmbed);
    
    
    
    
    // if (mystream && mystream != "No hay enlaces") links.push(mystream);
    // if (fembedRedirect && fembedRedirect != "No hay enlaces") links.push(fembedRedirect);
    // if (short && short != "No hay enlaces") links.push(short);
    // if (ouo && ouo != "No hay enlaces") links.push(ouo);

    
    if (idio == "LAT" || idio == "LATINO") {

        var bkIdioma = "LAT";
        var addlinkIdioma = 29;

    } else if (idio == "CASTELLANO" || idio == "ESP") {

        var bkIdioma = "ESP";
        var addlinkIdioma = 30;


    } else if (idio == "SUB" || idio == "SUBTITULADO") {

        var bkIdioma = "SUB";
        var addlinkIdioma = 31;

    }

    if (calid == "(1080)") {
        var bkCalidad = "708";
    }else if (calid == "(720)") {
        var bkCalidad = "795";
    }

    for (let i = 0; i < links.length; i++) {
        // const element = array[i];
        idioma.push(bkIdioma);
        // calidad.push(bkCalidad);
    }

    var linksFinal = btoa(JSON.stringify(links)); 
    var idiomaFinal = btoa(JSON.stringify(idioma)); 
    var calidadFinal = btoa(JSON.stringify(calidad));
    var trType = btoa(JSON.stringify(trType));
    var poster = btoa(JSON.stringify(poster));

    console.log(linksFinal);
    console.log(idiomaFinal);
    console.log(calidadFinal);

    /*
    codificar a base64 btoa()
    decoificr base64 atob()
    var varDecode = btoa(varEncode);
    // postID/88/api/{api_key}/blinks/'.$enlacess.'/blang/'.$idiomas.'/bcalidad/'.$calidades.'/type/'.$type';

    */
//    const urll = `http://pelis24hd.test/wp-json/bk-dcms-seo-yoast-generate-post/v2/postID/${tmdb}/api/${api_key}/blinks/${linksFinal}/blang/${bcalidad}/bcalidad/${calidades}/type/${type}/`;
   const urll = dominio+'/wp-json/bk-dcms-seo-yoast-generate-post/v2/postID/'+tmdb+'/api/'+api_key+'/blinks/'+linksFinal+'/blang/'+idiomaFinal+'/bcalidad/'+calidadFinal+'/type/'+type+'/tr/'+trType+'/poster/'+poster+'/addlink/'+addlinkIdioma;
   console.log(urll);

    // var parametros = {
    //     "postID": tmdb,
    //     "api": api_key,
    //     "blinks": linksFinal,
    //     "blang" : idiomaFinal,
    //     "bcalidad" : calidadFinal,
    //     "type" : type
    // };

    // fetch(urll)
    // .then(function(response) { return response.json() })
    // .then(function(data) {
    //     console.log(data)
    // })
    document.querySelector('#cargaEmpezada').style.display = "block";
    fetch(urll)
    .then(function(response) {
        // document.getElementById('resultadooVery').innerHTML = response.text();
        return response.json();
    })
    .then(data => {
        console.log(data);
        data_json = JSON.parse(data);
        d = data_json.data ? data_json.data : data_json.url
        document.getElementById('resultadooVery').innerHTML += `${data_json.status}<br/>`;
        document.getElementById('resultadooVery').innerHTML += `${data_json.id}<br/>`;
        document.getElementById('resultadooVery').innerHTML += `${d}<br/>`;
        document.querySelector('#cargaEmpezada').style.display = "none";

        if (post_type == 'create') {
            alert('Post creado Exitosamente '+ d);
        }else{
            alert('Post Actualizado Exitosamente '+ d);
        }

    })
    .catch(function(err) {
        console.error(err);
        document.getElementById('resultadooVery').innerHTML = err;
        document.querySelector('#cargaEmpezada').style.display = "none";

    });

    // $.ajax({
    //         data:  parametros, //datos que se envian a traves de ajax
    //         // data: {'parametros': JSON.stringify(parametros)},
    //         url:   urll, //archivo que recibe la peticion
    //         type:  'GET', //método de envio
    //         beforeSend: function () {
    //                 $("#resultadooVery").html("Procesando, espere por favor...");
    //         },
    //         success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
    //                 $("#resultadooVery").html(response);
    //         }
    // });
}

// Obtenemos el botón a partir de su id. En este caso lo llamaremos testButton
var button_lat = document.getElementById('createPost_lat');
var button_esp = document.getElementById('createPost_esp');
var button_sub = document.getElementById('createPost_sub');
// var button_update_lat = document.getElementById('updatePost_lat');
// var button_update_esp = document.getElementById('updatePost_esp');
// var button_update_sub = document.getElementById('updatePost_sub');



// Registramos el evento
button_lat.addEventListener('click', function(){createPostWpApi(button_lat.value)});
button_esp.addEventListener('click', function(){createPostWpApi(button_esp.value)});
button_sub.addEventListener('click', function(){createPostWpApi(button_sub.value)});
// button_update_lat.addEventListener('click', updatePostWpApi);
// button_update_esp.addEventListener('click', updatePostWpApi);
// button_update_sub.addEventListener('click', function(){updatePostWpApi(button_update_sub.value)});

function createPostWpApi(dominiooo) {

    var post_type = "create";

    if(dominiooo == 'lat') var var_dominio_create = 'cine24h.online';
    if(dominiooo == 'esp') var var_dominio_create = 'esp.cine24h.online';
    if(dominiooo == 'sub') var var_dominio_create = 'sub.cine24h.online';
    doSomething_Click(post_type, null, var_dominio_create);
}

function updatePostWpApi(id_post,dominiowp) {
    var post_type = "update_links";
    var confirmar = confirm('Actualizar enlaces?');
    
    var post_id = id_post
    if(dominiowp == 'lat') var var_dominio = 'cine24h.online';
    if(dominiowp == 'esp') var var_dominio = 'esp.cine24h.online';
    if(dominiowp == 'sub') var var_dominio = 'sub.cine24h.online';

    if (confirmar == true) {
        doSomething_Click(post_type, post_id, var_dominio);
    }
}