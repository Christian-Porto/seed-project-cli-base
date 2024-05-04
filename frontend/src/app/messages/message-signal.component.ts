import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-message-signal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './message-signal.component.html',
  styleUrl: './message-signal.component.css'
})
export class MessageSignalComponent {
  @Output() outputMessage: EventEmitter<string> = new EventEmitter<string>();
  messageVarClasse = input<Message>(new Message("", ""));
  showEditForm: boolean = true;
  private subscription: Subscription;
  private userId!: string;
  private userFirstName!: string;

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.subscription = this.userService.userNameObservable.subscribe({
      next: (name: string) => {
        this.userFirstName = name;
      },
      error: (err) => console.error('Failed to get user name', err)
    });
  
    this.subscription.add(
      this.userService.userIdObservable.subscribe({
        next: (id: string) => {
          this.userId = id;
        },
        error: (err) => console.error('Failed to get user ID', err)
      })
    );
   }

  onEdit(formulario: NgForm) {
    const messageAux: Message = new Message(
      formulario.value.myContentngForm, this.userFirstName, undefined, this.userId
    );
    if(messageAux.messageId == null) {
      messageAux.messageId = this.messageVarClasse().messageId;
    };
    this.messageService.editMessage(messageAux, this.messageVarClasse()).subscribe((response) => {
      this.messageVarClasse = response;
      this.outputMessage.emit(response);
    }, (error) => {
      this.outputMessage.emit("Erro ao editar mensagem");
    });
    formulario.resetForm();
    window.location.reload();
  }

  onDelete() {
    this.messageService.deleteMessage(this.messageVarClasse());
  }

  onClick() {
    this.showEditForm = !this.showEditForm;
    return this.showEditForm;
  }
}
