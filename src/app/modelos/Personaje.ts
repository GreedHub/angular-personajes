export class Personaje{

   nombre:  string;
   winrate: Number;
   roles:   string[]; 

    constructor(nombre){
        this.nombre = nombre;
        this.winrate = 0;
        this.roles = [];
    }

    agregarRol(rol){
        this.roles.push(rol);
    }

}