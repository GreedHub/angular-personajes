let router = require('express').Router();
let Personaje = require('../classes/Personaje')
let PersonajesController = require('../classes/PersonajesController');

/* Nahuel va a agregar el vaciado de la db */
router
    .route("/personajes")
    .get(async (req,res)=>{

        let personajesController = new PersonajesController();

        let personajes = await personajesController.obtenerPersonajes()
            .catch(err=>{
                res.status(500).send(err);
            })


        res.send(personajes);
        
        
    })
    .post((req,res)=>{
        let {nombre} = req.body;

        let personaje = new Personaje(nombre);

        let personajesController = new PersonajesController();
        
        personajesController.crearPersonaje(personaje)
            .catch(err=>{
                res.status(500).send(err);
            })

        res.status(201).send();
    })
    .delete((req,res)=>{

        let {id} = req.query;

        let personajesController = new PersonajesController();
        
        personajesController.borrarPersonaje(id)
            .catch(err=>{
                res.status(500).send(err);
            })

        res.status(200).send();
    
    })



module.exports = router;