class Personaje{

    constructor(nombre){
        this.nombre = nombre;
        this.winrate = 0;
        this.roles = [];
    }

    agregarRol(rol){
        this.roles.push(rol);
    }

}

module.exports = Personaje;