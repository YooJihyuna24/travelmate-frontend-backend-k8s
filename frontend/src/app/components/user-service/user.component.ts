import { Component } from '@angular/core';
import { ApiService } from ../../services/api.service';

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
