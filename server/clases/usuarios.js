
//Clase Usuarios se encargara de manejar a todos los usuarios conectados
class Usuarios {
	
	constructor() {
		this.personas = [];
	}
		
		agregarPersona(id, nombre, sala){
			
			let persona = {id, nombre, sala}; //Se crea a la persona
			this.personas.push(persona); //Se agrega al arrglo persona
			return this.personas; //Se retorna todo el arreglo de personas
		}
		
		//Se busca el id de una persona
		getPersona(id){
			//Se busca el id de la persona y se retorna
			let persona = this.personas.filter(persona => persona.id === id) [0]; //se indica que solo se retorne el primer elemento que se le parezca;
			return persona;
		}
		 
		//Metodo para regresar todo el objeto
		getPersonas(){
			return this.personas;
		}
		
		getPersonasPorSala (sala){
			let personasSala = this.personas.filter(persona => persona.sala === sala);
			return personasSala;
		}
		 
		
		//recibe un Id
		
		borrarPersona(id){
			//Se guarda el registro del usuarioantes de ser eliminado
			let personaBorrada = this.getPersona(id);
			
			//se borra la persona 
			this.personas = this.personas.filter(persona => persona.id != id);
			//Se retorna la persona que se ha borrado
			return personaBorrada;
		}
}

module.exports = {
	Usuarios
};