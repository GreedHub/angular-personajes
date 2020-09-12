import { Component, OnInit } from '@angular/core';
import { Personaje } from 'src/app/modelos/Personaje';
import { PersonajesService } from 'src/app/servicios/personajes.service';
import { ApiRestService } from 'src/app/servicios/api-rest.service';


@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.scss']
})
export class ListaPersonajesComponent implements OnInit {

  personajes:Personaje[] = [];
  constructor(private personajeService:PersonajesService,) { }

  ngOnInit(): void {

    this.personajeService.ListaPersonajes.subscribe(personajes=>{
      this.personajes = personajes;
    })

  }
  
}
