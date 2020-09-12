import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonajesService } from 'src/app/servicios/personajes.service';
import { ApiRestService } from 'src/app/servicios/api-rest.service';

@Component({
  selector: 'app-agregar-personajes',
  templateUrl: './agregar-personajes.component.html',
  styleUrls: ['./agregar-personajes.component.scss']
})
export class AgregarPersonajesComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  constructor( private personajeService:PersonajesService,) { }
  nombre:string;


 
  ngOnInit(): void {

    

  }

  onKey(event){
      switch(event.key.toLowerCase()){
        case "enter":
          this.agregarPersonaje();
          break;
        default:
          console.log(event.key);
      }
  } 

  agregarPersonaje(){

    if(this.nombre == "") return;
    
    this.personajeService.agregarPersonaje(this.nombre,[]);

    this.nombre = "";
  
  }

}
