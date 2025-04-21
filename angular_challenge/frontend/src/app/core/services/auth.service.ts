import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';
  private readonly validUser = { username: 'admin', password: '123' };

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const isAuthenticated = username === this.validUser.username && password === this.validUser.password;
    if (isAuthenticated) localStorage.setItem('isAuthenticated', 'true');

    return isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
