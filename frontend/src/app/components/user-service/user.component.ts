import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  users: string[] = [];
  message = '';

  constructor(private userService: ApiService) {}

  register() {
    this.userService.register(this.username, this.password).subscribe({
      next: (res: any) => this.message = res.message,
      error: (err: any) => this.message = err.error.error
    });
  }

  login() {
    this.userService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.fetchPlaces();
      },
      error: (err: any) => this.message = err.error.error
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => this.users = res.users,
      error: (err: any) => this.message = err.error.error
    });
  }

  fetchPlaces() {
    if (!this.username) return;
    this.userService.getPlaces(this.username).subscribe({
      next: (res: any) => this.userPlaces = res.places,
      error: (err: any) => this.message = err.error.error
    });
  }

  savePlaces() {
    if (!this.username) return;
    this.userService.savePlaces(this.username, this.places).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.fetchPlaces();
      },
      error: (err: any) => this.message = err.error.error
    });
  }
}
