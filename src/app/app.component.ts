import { Component } from '@angular/core';
import { ChatWssService } from './servicios/chat-wss.service';
import { PersonajesService } from './servicios/personajes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'leagueoflol';

  constructor(private personajeService:PersonajesService,){

    }

  ngOnInit(): void {

    this.personajeService.cargarPersonajesApi();

  }

}
