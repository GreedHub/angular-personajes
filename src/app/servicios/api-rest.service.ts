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
    urlBase: "http://localhost:5001",
  }


  obtenerPersonajes():Observable<Personaje[]>{
    
    let url = `${this.configuracionServicio.urlBase}/obtenerPersonajes`;

    return this.http.get<Personaje[]>(url);
  
  }

  agregarPersonaje(nombre:string,roles:string[]):Observable<any>{
    
    let url = `${this.configuracionServicio.urlBase}/agregarPersonaje`;

    const params = {
      nombre,
      roles,
    }

    return this.http.post<any>(url,params);
  
  }

  borrarPersonaje(nombre:string):Observable<any>{
    
    console.log(nombre)

    let url = `${this.configuracionServicio.urlBase}/borrarPersonaje`;

    const params = {
      nombre,
    }

    return this.http.delete<any>(url,{params});
  
  }
}
