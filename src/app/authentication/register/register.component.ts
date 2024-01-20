import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user-model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) { }
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  repeatedPassword: string = '';
  address: string = '';
  phone: string = '';
  userType: string = '';

  // is there an error message to be shown 
  error: Boolean = false;
  errorMessage: string = '';

  navigateToLogin() {
    this.router.navigate(['/login'])
  }

  register() {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let phoneNumberRegex = /^[0-9]+$/;
    this.error = false;
    if (this.password.length < 6) {
      this.error = true;
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }
    if (this.password != this.repeatedPassword) {
      this.error = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }
    if (this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0 || 
        this.address.length == 0 || this.phone.length == 0 || this.userType.length == 0) {
        this.error = true;
        this.errorMessage = 'There cannot be empty fields'
        return;
    }

    if (!emailRegex.test(this.email)) {
      this.error = true;
      this.errorMessage = 'Invalid email';
      return;
    }

    if (!phoneNumberRegex.test(this.phone)) {
      this.error = true;
      this.errorMessage = 'Invalid phone number';
      return;
    }

    let user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.email,
      address: this.address, 
      phone: this.phone,
      password: this.password,
      userType: this.userType
    }

    console.log(user)
    this.authService.register(user).subscribe({
      next: () => {this.router.navigate(['/login'])},
      error: e => {
        this.error = true;
        this.errorMessage = e.error || 'Error encountered, try again...';
      }
    })
  }
}
