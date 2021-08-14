import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonajesService } from 'src/app/servicios/personajes.service';
import { ApiRestService } from 'src/app/servicios/api-rest.service';
import { ChatWssService } from 'src/app/servicios/chat-wss.service';
import { catchError, tap, map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Rol } from 'src/app/modelos/Rol';
import { Personaje } from 'src/app/modelos/Personaje';
@Component({
  selector: 'app-agregar-personajes',
  templateUrl: './agregar-personajes.component.html',
  styleUrls: ['./agregar-personajes.component.scss']
})
export class AgregarPersonajesComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  appInfo:any;
  nombre:string;
  personajes: Personaje[];

  _socket:WebSocket;

  constructor( private personajeService:PersonajesService,
               private chatWssService:ChatWssService) {
           
     this._socket = new WebSocket(environment.TWITCH_WSS_URL);

     this._socket.addEventListener('open',(e)=>{
       console.log("connected")
        this._socket.send(`PASS ${environment.CHAT_SECRET}`);
        this._socket.send('NICK gravityl');
        this._socket.send('CAP REQ :twitch.tv/commands');
        this._socket.send('CAP REQ :twitch.tv/tags');
        this._socket.send('JOIN #gravityl');
     })

     this._socket.addEventListener('message',(e)=>{
       let data = e.data;

      if(data.includes('PING :tmi.twitch.tv')){
        this._socket.send('PONG :tmi.twitch.tv')
      }

    let command = data.split(" :!")[1];

    if(!command) return;

    command = {
        type : command.substr(0,command.indexOf(' ')),
        value : command.substr(command.indexOf(' ')+1), 
    }

    switch(command.type){
        case "personaje":
          this.personajeService.agregarPersonaje(command.value,[]);
            break;

        case "roles":

          let personaje = command.value.split(' ')[0];

          let roles = command.value.substr(command.value.indexOf(' ')+1).split(" ");
          

          roles = roles.map(_rol => {
            
            let rol = this.appInfo.roles.find(rolActual=> rolActual.rol == _rol);

            return rol;

          });

          personaje = this.personajes.find(_personaje => personaje === _personaje.nombre);

          this.personajeService.actualizarRoles(personaje.id,roles);
            break;
    }
      
    })


  }
  
 
  ngOnInit(): void {

    this.chatWssService.connect();

      this.personajeService.AppInfo.subscribe (response=>{
        this.appInfo = response;
    });

    this.personajeService.ListaPersonajes.subscribe (response=>{
      this.personajes = response;
  });


  }

  

  onKey(event){
      switch(event.key.toLowerCase()){
        case "enter":
          this.agregarPersonaje();
          break;
        default:
          break;
      }
  } 

  agregarPersonaje(){

    if(this.nombre == "") return;
    /* this._socket.send(`PRIVMSG #gravityl :${this.nombre}`) */
    this.personajeService.agregarPersonaje(this.nombre,[]);

    this.nombre = "";
  
  }

}
