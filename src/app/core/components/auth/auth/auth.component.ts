import { Component, inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { formGroupValidatorLogin } from '../../../models/auth/auth.interfaces';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ButtonModule, CardModule, InputTextModule, PasswordModule, ToastModule, FloatLabelModule, ReactiveFormsModule],
  providers: [MessageService, HttpClient],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: true
})

export class AuthComponent {

  router: Router = inject(Router)
  authService: AuthService = inject(AuthService);

  loginForm: FormGroup<formGroupValidatorLogin> = new FormGroup<formGroupValidatorLogin>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] })
  })

  constructor(private messageService: MessageService) { }


  login() {
    if (!this.loginForm.valid) {
      console.log("Form no valido");
    } else {
      this.authService.login(this.loginForm).subscribe({
        next: (response) => {
          console.log(response);
          console.log('response.body.token: ', response.body.token);
          localStorage.setItem('jwtToken', response.body.token);
          this.messageService.add({ severity: 'success', summary: '¡Bienvenido!', detail: 'Ingresando al inventario', life: 3000 });
          // * el settimeout es para simular una carga de 1 segundo y mostrar mensaje, pero realmente no es necesario
          setTimeout
            (() => {
              this.router.navigate(['/inventario']);
              this.messageService.clear();
            }, 1000);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error al iniciar sesión', detail: error.error, life: 3000 });
          console.log(error);
        }
      })
    }
  }
}
