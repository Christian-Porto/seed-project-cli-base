import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  
  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  onLogout() {
    localStorage.clear();
    alert('Você foi deslogado com sucesso!');
  }
}
