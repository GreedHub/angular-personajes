import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonajesService } from 'src/app/servicios/personajes.service';
import { ApiRestService } from 'src/app/servicios/api-rest.service';
import { ChatWssService } from 'src/app/servicios/chat-wss.service';
import { catchError, tap, map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-agregar-personajes',
  templateUrl: './agregar-personajes.component.html',
  styleUrls: ['./agregar-personajes.component.scss']
})
export class AgregarPersonajesComponent implements OnInit {

  @Output() emitter = new EventEmitter();


  nombre:string;

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
      switch(data){

        case 'PING :tmi.twitch.tv':
            this._socket.send('PONG :tmi.twitch.tv')
            break;

        default:
        
            break;

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
    }
      
    })


  }
  
 
  ngOnInit(): void {

    this.chatWssService.connect();


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
    this._socket.send(`PRIVMSG #gravityl :${this.nombre}`)
    this.personajeService.agregarPersonaje(this.nombre,[]);

    this.nombre = "";
  
  }

}
