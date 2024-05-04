import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styles: `
    input.ng-invalid.ng-touched { border: 1px solid red; }
  `
})
export class MessageInputComponent {

  constructor(private messageService: MessageService) { }

  onSubmit(formulario: NgForm) {
    console.log("MessageInputComponent: " + formulario);
    const messageAux: Message = new Message(formulario.value.myContentngForm, "User");
    this.messageService.addMessage(messageAux)
      .subscribe({
        next: (res: any) => {
          console.log(res.myMsgSucesso);
          console.log({ content: res.objMessageSave.content });
          console.log({ id: res.objMessageSave._id });
        },
        error: (err) => {
          console.log(`$== !!Error (subscribe): - ${err.info_extra} ==`);
          console.log(err);
        }
      });
      formulario.resetForm();
    window.location.reload();
  }
}
