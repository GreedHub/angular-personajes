require('dotenv').config({ path: './variables.env' });
const express = require('express'); /* para responder mediante html */
const cors = require("cors"); /* consultas inter dominio */
var bodyParser = require('body-parser'); /* contenido del post */
let Personaje = require('./require/classes/Personaje');

let personajesRouter = require('./require/routes/personajes');
let rolesRouter = require('./require/routes/roles');

const app = express();
app.use(bodyParser.json({limit: '100mb',parameterLimit: 100000, extended: true})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '100mb',parameterLimit: 100000, extended: true})); // support encoded bodies
app.use(cors());
app.use(personajesRouter);
app.use(rolesRouter);

const port = 5000;

app.get(`/test`, async (req,res)=>{

    let personaje = new Personaje("");

    await personaje.test()
        .then(()=>res.status(200).send(`Health check succeeded - hostname: ${process.env.NODE_NAME}`))
        .catch(err=>res.status(500).send(`Health check failed: ${err}`));
        
});


app.listen(port, ()=>{
    console.log(`Se creó la api en la url http://localhost:${port}/`)
});