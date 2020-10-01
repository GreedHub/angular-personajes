import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from 'src/app/modelos/Personaje';
import { PersonajesService } from 'src/app/servicios/personajes.service';
import { EditarRolesComponent } from '../../modales/editar-roles/editar-roles.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss']
})
export class PersonajeComponent implements OnInit {

  constructor(private personajeService:PersonajesService,
              public dialog: MatDialog) { }

  @Input() personaje:Personaje;

  ngOnInit(): void {
    
  }

  borrarPersonaje(){
    this.personajeService.borrarPersonaje(this.personaje.id);
  } 

  editarPersonaje(){

    let dialogRef = this.dialog.open(EditarRolesComponent, {
      data: this.personaje,
    });
    
  } 

}
