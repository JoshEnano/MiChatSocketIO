//Se crea una constante que recibe nombre, mensaje 

const crearMensaje = (nombre, mensaje) => {
	//Retorna nombre, mensaje y fecha
	return {
		nombre,
		mensaje,
		fecha: new Date().getTime()
	};
}

//Se exporta modulo
module.exports = {
	crearMensaje
}