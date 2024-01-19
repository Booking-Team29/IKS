import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth-response';
import { Login } from '../../models/login-model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService]
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) { }
  navigateToRegister() {
    this.router.navigate(['/register'])
  }

  username: string = '';
  password: string = '';
  error: Boolean = false;
  errorMessage: string = '';

  login() {
    this.error = false;
    const login: Login = {
      username: this.username || '',
      password: this.password || ''
    }
    this.authService.login(login).subscribe({
      next: (response: AuthResponse) => {
        localStorage.setItem('user', response.jwt);
        this.authService.setUser()
        console.log(this.authService.getRole());
        this.router.navigate(['home'])
      },
      error: e => {
        this.errorMessage = 'Invalid credentials';
        this.error = true;
      }
    })
  }
}
