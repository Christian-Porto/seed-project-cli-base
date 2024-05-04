import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = "http://localhost:3000";
  private messagesService: Message[] = [];

  constructor(private httpClient: HttpClient) { }

  errorHandler(error: any, info: string): Observable<any> {
    throw({
      info_extra: info,
      error_SS: error,
      error_CS: "Client-Side: errorHandler: Ocorreu um erro!" 
    })
  }

  addMessage(message: Message): Observable<any> {
    this.messagesService.push(message);
    return this.httpClient.post<any>(`${this.baseUrl}/message`, message).pipe(
      catchError((error) => this.errorHandler(error, "addMessage()"))
    );
  }

  deleteMessage(message: Message) {
    this.messagesService.splice(this.messagesService.indexOf(message), 1);
    this.httpClient.delete<any>(`${this.baseUrl}/message/${message.messageId}`).subscribe();
  }

  editMessage(message: Message, messageAtual: Message) {
    const index = this.messagesService.indexOf(messageAtual);
    if (index === -1) {
      throw new Error('Message not found in messagesService');
    }

    this.messagesService[index] = message;

    return this.httpClient.patch<any>(`${this.baseUrl}/message/${message.messageId}`, message).pipe(
      catchError((error) => this.errorHandler(error, "editMessage()"))
    );
  }

  getMessages() {
    return this.httpClient.get<any>(`${this.baseUrl}/message`).pipe(
      map((response: any) => {

        const messagesResponseRecebida = response.objsMessagesRecuperados;

        let transformedCastMessagesModelFrontend: Message [] = [];
        for(let message of messagesResponseRecebida) {
          transformedCastMessagesModelFrontend.push(
            new Message(message.content, "User", message._id)
          );
        }
        this.messagesService = [...transformedCastMessagesModelFrontend];
        response.objsMessagesRecuperados = this.messagesService;

        return response
      }),
      catchError((error) => this.errorHandler(error, "getMessages()"))
    );
  }
}
