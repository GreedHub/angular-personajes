import { Injectable, Output } from '@angular/core';
import { Personaje } from '../modelos/Personaje';
import { ReplaySubject } from 'rxjs';
import { ApiRestService } from './api-rest.service';


@Injectable({
  providedIn: 'root'
})

export class PersonajesService {

  listaPersonajes:Personaje[]= [];
  appInfo:any = {};

  @Output() ListaPersonajes: ReplaySubject<Personaje[]> = new ReplaySubject<Personaje[]>(1);
  @Output() AppInfo: ReplaySubject<any> = new ReplaySubject<any>(1);

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

  cargarRolesApi(){
    this.apiRestService.obtenerRoles().subscribe(response=> {
      this.appInfo.roles = response;
      this.AppInfo.next(this.appInfo);
    });
  }

  borrarPersonaje(id:Number){
    this.apiRestService.borrarPersonaje(id).subscribe(response=>{
      this.cargarPersonajesApi();
    });    
  }

  actualizarRoles(idPersonaje:Number,roles:any[]){
    this.apiRestService.actualizarRoles(idPersonaje,roles).subscribe(response=>{
      this.cargarPersonajesApi();
    });    
  }

}
