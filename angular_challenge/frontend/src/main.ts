import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/shared/app.routing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/core/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    AuthService, // Providers globais
    // Adicione outros serviços/guards aqui
  ]
}).catch(err => console.error(err));