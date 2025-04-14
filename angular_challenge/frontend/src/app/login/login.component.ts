import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      lembrar: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:3000/api/login', this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res?.autenticado) {
              this.router.navigate(['/home'], { state: { usuario: res.nome } });
            } else {
              this.loginError = 'E-mail ou senha inválidos.';
            }
          },
          error: () => {
            this.loginError = 'Erro ao tentar logar. Tente novamente.';
          }
        });
    }
  }
}
