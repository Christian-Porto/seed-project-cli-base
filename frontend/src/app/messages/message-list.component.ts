import { Component, OnInit } from '@angular/core';
import { MessageSignalComponent } from './message-signal.component';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageSignalComponent],
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe({
      next: (res: any) => {
        this.messages = res.objsMessagesRecuperados;
      },
      error: (err) => {
        console.log(`$== !!Error (subscribe): - ${err.info_extra} ==`);
        console.log(err);
      }
    });
  }
}
