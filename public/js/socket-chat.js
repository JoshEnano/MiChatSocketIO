var socket = io();

//Personalizar nombre de usuario para leer por parametro//

var param = new URLSearchParams (window.location.search);

//Condicion que indica si no va el nombre te regresa a la pagina de index y manda una advertencia
if(!param.has('nombre') || !param.has('sala')){
	window.location = 'index.html';
	throw new Error('El nombre o sala es obligatorio');
}	

//Construir el nombre (se recibe por los parametros)

var usuario = {
	nombre: param.get('nombre'),
	sala: param.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
	
	//Esta linea muestra todos los usuarios que estan en linea
	socket.emit('entrarChat', usuario, function(resp){
		console.log('Usuarios conectados', resp);
	});
	
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor'); 

});
  

//---------------------------------------------//
//--------------- Ejemplo 1 -------------------//
//------ Mensaje simple con datos en duro------//
//---------------------------------------------//

// socket.emit('crearMensaje', {usuario: 'Fernando'});




//socket.emit('crearMensaje', {
//    usuario: 'Fernando',
//    mensaje: 'Hola Mundo'
//}, function(resp) {
//    console.log('respuesta server: ', resp);
//});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
   console.log('Servidor:', mensaje);

});

//Usuario entra o sale de chat
socket.on('listaPersonas', function(personas) {
   console.log(personas);

});

//Mensajes privados

socket.on('mensajePrivado', function(mensaje){
	console.log('Mensaje Privado:', mensaje);
});

//Notas: emit --> emite   on --> escucha