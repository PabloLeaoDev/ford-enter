import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink, NgClass],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sidebarOpen = false;
  nomeUsuario: string | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.nomeUsuario = navigation?.extras?.state?.['usuario'] || 'usuário';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
