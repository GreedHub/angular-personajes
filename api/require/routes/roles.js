let router = require('express').Router();
let PersonajesController = require('../classes/PersonajesController');

router
    .route("/roles")
    .get(async (req,res)=>{

        let personajesController = new PersonajesController();
        
        let roles = await personajesController.obtenerRoles()
            .catch(err=>{
                res.status(500).send(err);
            })

        res.status(200).send(roles);

    })
    .post((req,res)=>{

        let {idPersonaje,roles} = req.body;

        let personajesController = new PersonajesController();
        
        roles.forEach( async rol => {
            await personajesController.agregarRol(idPersonaje,rol.id)
                    .catch(err=>{
                        res.status(500).send(err);
                    })
        });

        res.status(200).send();
    })
    .put(async(req,res)=>{
        //obtener rol y nombre
        let{idPersonaje,roles} = req.body;   
        
        let personajesController = new PersonajesController(); 

        let rolesDb = await personajesController.obtenerRolesDePersonaje(idPersonaje)
                .catch(err=>{
                    console.log(err);
                })


        roles = roles.filter( rol => { 

            let encontrado = rolesDb.find(_rol => _rol == rol.id  );

            return !encontrado ? true : false;

        });


        //agregar un nuevo rol
        roles.forEach( async rol=>{
            if(!rol.id) return;

            await personajesController.agregarRol(idPersonaje,rol.id)
                .catch(err=>{
                    console.log(err)
                });

        })

        res.send();
    })


module.exports = router;