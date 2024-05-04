import { Component } from '@angular/core';
import { MessageListComponent } from './message-list.component';
import { MessageInputComponent } from './message-input.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MessageListComponent,
    MessageInputComponent
  ],
  templateUrl: './message.component.html'
})
export class MessageComponent {

}
