import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPersonajesComponent } from './componentes/lista-personajes/lista-personajes.component';
import { AgregarPersonajesComponent } from './componentes/agregar-personajes/agregar-personajes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarRolComponent } from './componentes/agregar-rol/agregar-rol.component';
import { PersonajeComponent } from './componentes/generales/personaje/personaje.component';
import { EditarRolesComponent } from './componentes/modales/editar-roles/editar-roles.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPersonajesComponent,
    AgregarPersonajesComponent,
    AgregarRolComponent,
    PersonajeComponent,
    EditarRolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  entryComponents: [
    EditarRolesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
