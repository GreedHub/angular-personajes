import { Injectable, Output } from '@angular/core';
import { Personaje } from '../modelos/Personaje';
import { ReplaySubject } from 'rxjs';
import { ApiRestService } from './api-rest.service';


@Injectable({
  providedIn: 'root'
})

export class PersonajesService {

  listaPersonajes:Personaje[]= [];

  @Output() ListaPersonajes: ReplaySubject<Personaje[]> = new ReplaySubject<Personaje[]>(1);

  constructor(private apiRestService:ApiRestService) { }
  
  agregarPersonaje(nombre:string,roles:string[]){
    this.apiRestService.agregarPersonaje(nombre,roles).subscribe(response=>{
      this.cargarPersonajesApi();
    });
  }

  cargarPersonajesApi(){
    this.apiRestService.obtenerPersonajes().subscribe(response=> {
      this.listaPersonajes = response;
      this.ListaPersonajes.next(this.listaPersonajes);
    });
  }

  borrarPersonaje(nombre:string){
    this.apiRestService.borrarPersonaje(nombre).subscribe(response=>{
      this.cargarPersonajesApi();
    });    
  }

  actualizarRoles(nombre:string,roles:string[]){
    this.apiRestService.actualizarRoles(nombre,roles).subscribe(response=>{
      this.cargarPersonajesApi();
    });    
  }

}
