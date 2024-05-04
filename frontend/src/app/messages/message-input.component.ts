import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { UserService } from '../auth/user.service';
import { Subscription } from 'rxjs';

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

  isLoggedIn(): boolean {
    return this.userId !== 'unknown';
  }

  onSubmit(formulario: NgForm) {
    if (!this.isLoggedIn()) {
      alert('Não é possível enviar a mensagem, usuário não está logado.');
      return;
    }
    const messageAux: Message = new Message(
      formulario.value.myContentngForm, this.userFirstName, undefined, this.userId
    );
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
