



const { io } = require('../server');
const {Usuarios} = require('../clases/usuarios');
const {crearMensaje} = require('../Utils/Utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {
	
//---------------------------------------------//
//--------------- Ejemplo 1 -------------------//
//------ Mensaje simple con datos en duro------//
//---------------------------------------------//

	//client.on('entrarChat', (client) => {
	//	console.log(usuario);
	//})


	
	//---------------------------------------------//
	//---------------- Conexion -------------------//
	//---------------------------------------------//
	client.on('entrarChat', (data, callback) => {
		
		//validacion que manda error si la data no lleva nombre
		
		if(!data.nombre || !data.sala){
			return callback({
			error: true,
			mensaje: 'El nombre o sala es obligatorio'
			});
		}
		
		client.join(data.sala);
		
		//Se agrega a la clase de usuarios
		
		usuarios.agregarPersona(client.id, data.nombre, data.sala);
		
		//Evento que se dispara cada que vez que entra una persona (muestra todas las personas que se conectan al chat)
		client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se ha conectado`));
		client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));
		
		callback(usuarios.getPersonasPorSala(data.sala));
	});
	 
	 
	 //Evento que emite el mensaje de un usuario hacia los demas
	client.on('crearMensaje', (data) => {
		
		let persona = usuarios.getPersona(client.id);
		
		let mensaje = crearMensaje(persona.nombre, data.mensaje);
		client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
		
	});
	 
	//---------------------------------------------//
	//---------------- Desconexion ----------------//
	//---------------------------------------------//
	 
	client.on('disconnect', () => {
		
       let personaBorrada = usuarios.borrarPersona(client.id); 
	   
	   //Evento para enviar mensaje a todos los usuarios: lleva un usuario y un mensaje
	   client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} se ha desconectado`));
	                   
	   client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
   });

   
   client.on('mensajePrivado', data => {
	  
		let persona = usuarios.getPersona(client.id);
		
		
		client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje) );
	  
   });
   
   
   
   
   
   
   
   
//   console.log('Usuario conectado');
//
//   client.emit('enviarMensaje', {
//       usuario: 'Administrador',
//       mensaje: 'Bienvenido a esta aplicación'
//   });
//
//
//
//   client.on('disconnect', () => {
//       console.log('Usuario desconectado');
//   });
//
//   // Escuchar el cliente
//   client.on('enviarMensaje', (data, callback) => {
//
//       console.log(data);
//
//       client.broadcast.emit('enviarMensaje', data);
//
//
//       // if (mensaje.usuario) {
//       //     callback({
//       //         resp: 'TODO SALIO BIEN!'
//       //     });
//
//       // } else {
//       //     callback({
//       //         resp: 'TODO SALIO MAL!!!!!!!!'
//       //     });
//       // }
//
//
//
//   });

	
});