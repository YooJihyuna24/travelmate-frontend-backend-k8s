import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
})

export class UserComponent {
  username = '';
  password = '';
  places: string[] = [];
  userPlaces: string[] = [];
  message = '';

  constructor(private userService: ApiService) {};
  @Output() loggedIn = new EventEmitter<string>();
  
  register() {
    this.userService.register(this.username, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.loggedIn.emit(this.username);
      },
      error: (err: any) => this.message = err.error.error
    });
  }

  login() {
    this.userService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.loggedIn.emit(this.username);
      },
      error: (err: any) => this.message = err.error.error
    });
  }

  
}
