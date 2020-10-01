import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Personaje } from 'src/app/modelos/Personaje';
import { Rol } from 'src/app/modelos/Rol';
import { PersonajesService } from 'src/app/servicios/personajes.service';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.scss']
})
export class EditarRolesComponent implements OnInit {

  personaje:Personaje; 
  rolesActuales:Rol[];
  ROLES:Rol[];

  constructor(
    public dialogRef: MatDialogRef<EditarRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Personaje,
    private personajeService:PersonajesService) {}


  ngOnInit(): void {
    this.personaje = this.data;
    this.rolesActuales = this.personaje.roles;

    this.personajeService.AppInfo.subscribe(appInfo=>{
      this.ROLES = appInfo.roles;
    })

  }


  //crear metodo "toggleRol" que revise en un array si existe un string y lo saque, sino lo agregue
  toggleRol(rolSeleccionado:Rol): void {

    console.log(this.rolesActuales,rolSeleccionado)

    let rolEncontrado = this.rolesActuales.find(rol => rol.id === rolSeleccionado.id);

    console.log({rolSeleccionado,rolEncontrado,roles:this.rolesActuales})
    if(!rolEncontrado){
      this.rolesActuales.push(rolSeleccionado);
      return;
    }

    this.rolesActuales = this.rolesActuales.filter(rol => rol.id !== rolSeleccionado.id);
    
  } 

// crear metodo "actualizarRoles" que envíe los roles al servicio
  actualizarRoles(){   
    this.personajeService.actualizarRoles(this.personaje.id,this.rolesActuales); 
    this.dialogRef.close();
  }

  tieneRol(rol:Rol){
    let rolEncontrado = this.rolesActuales.find(_rol=> rol.id === _rol.id);
    console.log(rolEncontrado)
    return rolEncontrado != undefined;
  }

}
