import { Injectable } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import {environment} from '../../environments/environment'
import { PersonajesService } from './personajes.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { catchError, tap, switchAll } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatWssService {

  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e }));
 
  public connect(): void {
 
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }

    
  }
 
  private getNewWebSocket() {
    let ws = webSocket(environment.TWITCH_WSS_URL);
    ws.next(`PASS ${environment.CHAT_SECRET}`);
    ws.next('NICK gravityl');
    ws.next('CAP REQ :twitch.tv/commands');
    ws.next('CAP REQ :twitch.tv/tags');
    ws.next('JOIN #gravityl');
    return ws;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete(); 
  }

}



 