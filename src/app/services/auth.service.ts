import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, catchError} from "rxjs";
import {AuthResponse} from "../models/auth-response";
import {JwtHelperService} from "@auth0/angular-jwt";
import { access } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();

  login(auth: any): Observable<AuthResponse> {
      return this.http.post<AuthResponse>('http://localhost:8080/api/v1/account/login', auth, { headers: this.headers});
  }

  logout() {
    localStorage.clear();
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken).role;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
