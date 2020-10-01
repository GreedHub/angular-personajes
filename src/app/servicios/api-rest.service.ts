import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje } from '../modelos/Personaje';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http:HttpClient) { }

  configuracionServicio={
    urlBase: "http://localhost:5000",
  }


  obtenerPersonajes():Observable<Personaje[]>{
    
    let url = `${this.configuracionServicio.urlBase}/personajes`;

    return this.http.get<Personaje[]>(url);
  
  }

  agregarPersonaje(nombre:string,roles:string[]):Observable<any>{
    
    let url = `${this.configuracionServicio.urlBase}/personajes`;

    const params = {
      nombre,
      roles,
    }

    return this.http.post<any>(url,params);
  
  }

  borrarPersonaje(id:Number):Observable<any>{
    
    let url = `${this.configuracionServicio.urlBase}/personajes`;

    const params = {
      id:id.toString(),
    }

    return this.http.delete<any>(url,{params});
  
  }

  obtenerRoles():Observable<Personaje[]>{
    
    let url = `${this.configuracionServicio.urlBase}/roles`;

    return this.http.get<Personaje[]>(url);
  
  }

  actualizarRoles(idPersonaje:Number,roles:any[]):Observable<any>{

    let url = `${this.configuracionServicio.urlBase}/roles`;

    const params = {
      idPersonaje,
      roles,
    }

    return this.http.put<any>(url,params);

  }
}
