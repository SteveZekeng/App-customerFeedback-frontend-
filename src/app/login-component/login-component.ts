import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule
  ],
  standalone:true,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  creds = { username: '', password: '' };
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMsg = '';
    console.log('Login clicked', this.creds);

    if (!this.creds.username || !this.creds.password) {
      this.errorMsg = 'Veuillez remplir tous les champs';
      return;
    }

    this.authService.login(this.creds).subscribe({
      next: () => this.router.navigate(['/feedbacks']),
      error: () => this.errorMsg = 'Identifiants incorrects'
    });
  }
}
