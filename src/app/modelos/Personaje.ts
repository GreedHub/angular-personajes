import { Rol } from './Rol';

export class Personaje{

   nombre:  string;
   winrate: Number;
   roles:   Rol[]; 
   id:      Number;

    constructor(nombre){
        this.nombre = nombre;
        this.winrate = 0;
        this.roles = [];
    }

    agregarRol(rol){
        this.roles.push(rol);
    }

}