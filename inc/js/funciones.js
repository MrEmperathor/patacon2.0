

function agregardatos(nombre,apellido,email,telefono){

	cadena="nombre=" + nombre + 
			"&apellido=" + apellido +
			"&email=" + email +
			"&telefono=" + telefono;

	$.ajax({
		type:"POST",
		url:"php/agregarDatos.php",
		data:cadena,
		success:function(r){
			if(r==1){
				$('#tabla').load('componentes/tabla.php');
				alertify.success("agregado con exito :)");
			}else{
				alertify.error("Fallo el servidor :(");
			}
		}
	});

}

function agregaform(datos){

	d=datos.split('||');

	$('#idpersona').val(d[0]);
	$('#nombreu').val(d[1]);
	$('#apellidou').val(d[2]);
	$('#emailu').val(d[3]);
	$('#telefonou').val(d[4]);
	
}

function actualizaDatos(){


	id=$('#idpersona').val();
	nombre=$('#nombreu').val();
	apellido=$('#apellidou').val();
	email=$('#emailu').val();
	telefono=$('#telefonou').val();

	cadena= "id=" + id +
			"&nombre=" + nombre + 
			"&apellido=" + apellido +
			"&email=" + email +
			"&telefono=" + telefono;

	$.ajax({
		type:"POST",
		url:"php/actualizaDatos.php",
		data:cadena,
		success:function(r){
			
			if(r==1){
				$('#tabla').load('componentes/tabla.php');
				alertify.success("Actualizado con exito :)");
			}else{
				alertify.error("Fallo el servidor :(");
			}
		}
	});

}
function BorradoMultiple(array) {
	console.log('arguments pasados'+arguments.length);
	if (arguments.length !== 1) {
		console.log('lo que se eliminara'+array);
		// array.forEach(element => {
		// 	eliminarDatos(element);
		// });
	}else{
		console.log('n entro')
		// eliminarDatos(array);
	}
}

function preguntarSiNo(id){
	alertify.confirm('Eliminar Pelicula', '¿Esta seguro de eliminar este registro?',
					function(){ BorradoMultiple(id) }
                , function(){ alertify.error('Se cancelo')});
}

function preguntarSiNoSeri(id){
	alertify.confirm('Eliminar Series', '¿Esta seguro de eliminar este registro?', 
					function(){ eliminarDatosSeri(id) }
                	,function(){ alertify.error('Se cancelo')});
}


function eliminarDatos(id){

	cadena="id=" + id;

		$.ajax({
			type:"POST",
			url:"php/eliminarDatos.php",
			data:cadena,
			success:function(r){
				if(r==1){
					$('#tabla').load('tabla.php');
					alertify.success("Eliminado con exito!");
				}else{
					alertify.error("Fallo el servidor :(");
				}
			}
		});
}

function eliminarDatosSeri(id){

	cadena="id=" + id;

		$.ajax({
			type:"POST",
			url:"php/eliminarDatosSeri.php",
			data:cadena,
			success:function(r){
				if(r==1){
					$('#tabla').load('tablaserie.php');
					alertify.success("Eliminado con exito!");
				}else{
					alertify.error("Fallo el servidor :(");
				}
			}
		});
}