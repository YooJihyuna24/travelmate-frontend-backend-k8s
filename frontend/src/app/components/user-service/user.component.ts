import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  username = '';
  password = '';
  places: string[] = [];
  userPlaces: string[] = [];
  users: string[] = [];
  message = '';

  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.username, this.password).subscribe({
      next: res => this.message = res.message,
      error: err => this.message = err.error.error
    });
  }

  login() {
    this.userService.login(this.username, this.password).subscribe({
      next: res => {
        this.message = res.message;
        this.fetchPlaces();
      },
      error: err => this.message = err.error.error
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: res => this.users = res.users,
      error: err => this.message = err.error.error
    });
  }

  fetchPlaces() {
    if (!this.username) return;
    this.userService.getPlaces(this.username).subscribe({
      next: res => this.userPlaces = res.places,
      error: err => this.message = err.error.error
    });
  }

  savePlaces() {
    if (!this.username) return;
    this.userService.savePlaces(this.username, this.places).subscribe({
      next: res => {
        this.message = res.message;
        this.fetchPlaces();
      },
      error: err => this.message = err.error.error
    });
  }
}
