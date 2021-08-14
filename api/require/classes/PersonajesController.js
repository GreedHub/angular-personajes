let SqlManager = require('./SqlManager');
let SqlParameter = require('./SqlParameter');
let AppConfig = require('../globals/AppConfig');

let sql = new SqlManager(AppConfig.database.name);
sql.setServer(AppConfig.database.server);
sql.setDbUser(AppConfig.database.user,AppConfig.database.password);

class PersonajesController{

    async obtenerPersonajes(){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("obtenerPersonajes")
            .then(async (response)=>{ 
                let personajes = [];

                response.forEach( row => {
                        
                    let personaje = personajes.find(personaje => personaje.nombre == row.nombre);

                    if(!personaje){

                        personajes.push({
                            id: row.id_personaje,
                            nombre: row.nombre,
                            roles: [{rol:row.rol,id:row.id_rol}],
                        })

                        return;
                    }

                   // console.log({antes:"antes",personaje,nombre:row.nombre});
                    personajes = personajes.map(_personaje=>{

                        if(_personaje.nombre === personaje.nombre) 
                            _personaje.roles.push({rol:row.rol,id:row.id_rol});

                        return _personaje;

                    });

               });

               // console.log(personajes)
                resolve(personajes);
            })
            .catch((err)=>{
                reject(err);
             })
             
        });

    }  
    
    async crearPersonaje(personaje){

        return new Promise(async(resolve,reject)=>{

            let nombre = personaje.nombre.replace(/\\r/,'').replace(/\\n/,'');

            await sql.executeProcedure("crearPersonaje",[new SqlParameter("nombre",nombre)])
            .then(async (response)=>{ 
                resolve(response);
               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

    async borrarPersonaje(id){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("borrarPersonaje",[new SqlParameter("id",id)])
            .then(async (response)=>{ 

                resolve(response);

               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

    async agregarRol(idPersonaje,idRol){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("agregarRol",[new SqlParameter("idPersonaje",idPersonaje),new SqlParameter("idRol",idRol)])
            .then(async (response)=>{ 

                resolve(response);

               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

    async borrarRolPersonaje(idPersonaje,idRol){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("borrarRolPersonaje",[new SqlParameter("idPersonaje",idPersonaje),new SqlParameter("idRol",idRol)])
            .then(async (response)=>{ 

                resolve(response);

               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

    async obtenerRoles(){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("obtenerRoles")
            .then(async (response)=>{ 

                let roles = response.map(_rol=>{

                    let rol = {

                        id: _rol.id_rol,
                        rol: _rol.rol,
                    }

                    return rol;
                })

                resolve(roles);

               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

    async obtenerRolesDePersonaje(idPersonaje){

        return new Promise(async(resolve,reject)=>{

            await sql.executeProcedure("obtenerRolesDePersonaje",[new SqlParameter("idPersonaje",idPersonaje)])
            .then(async (response)=>{ 

                response = response.map(rol => rol.id_rol );

                resolve(response);

               })
            .catch((err)=>{
                console.log(err);
                reject(err);
             })
             
        });

    } 

}


module.exports = PersonajesController;