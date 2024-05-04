import { Component, EventEmitter, Output, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from './message.model';
import { MessageService } from './message.service';

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

  constructor(private messageService: MessageService) { }

  onEdit(formulario: NgForm) {
    const messageAux: Message = new Message(formulario.value.myContentngForm, "User");
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
