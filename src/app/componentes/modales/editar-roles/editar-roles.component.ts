import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Personaje } from 'src/app/modelos/Personaje';
import { PersonajesService } from 'src/app/servicios/personajes.service';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.scss']
})
export class EditarRolesComponent implements OnInit {

  personaje:Personaje; 
  rolesActuales:string[];
  ROLES:string[] = [ "adc", "mid","support", "jungla", "top" ];

  
 
  constructor(
    public dialogRef: MatDialogRef<EditarRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personaje,
    private personajeService:PersonajesService) {}


  ngOnInit(): void {
    this.personaje = this.data;
    this.rolesActuales = this.personaje.roles;
  }


  //crear metodo "toggleRol" que revise en un array si existe un string y lo saque, sino lo agregue
  toggleRol(rolSeleccionado:string): void {

    let rolEncontrado = this.rolesActuales.find(rol => rol === rolSeleccionado);

    if(!rolEncontrado){
      this.rolesActuales.push(rolSeleccionado);
      return;
    }

    this.rolesActuales = this.rolesActuales.filter(rol => rol !== rolSeleccionado);
    
  } 

// crear metodo "actualizarRoles" que envíe los roles al servicio
  actualizarRoles(){

    //array1.filter(value => array2.includes(value))
   
    this.personajeService.actualizarRoles(???);


  }

}
