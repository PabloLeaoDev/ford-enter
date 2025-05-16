import { Routes } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';
import { HomeComponent } from '../features/home/home.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];