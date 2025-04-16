import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUser = { username: 'admin', password: '123456' };

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