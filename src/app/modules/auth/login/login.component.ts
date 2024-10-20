import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: Toast | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);
      // Llamada al método de inicio de sesión
      if (email && password) {
        this.authService
          .login(email, password)
          .then(() => {
            console.log('Inicio de sesión exitoso');
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Inicio de sesión exitoso',
              life: 5000,
            });
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.error('Error al iniciar sesión:', error);
          });
      }
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: keyof typeof this.loginForm.controls): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field) {
      if (field.errors?.['required']) {
        return 'Este campo es obligatorio.';
      }
      if (field.errors?.['email']) {
        return 'Ingrese un correo electrónico válido.';
      }
      if (field.errors?.['minlength']) {
        return `La contraseña debe tener al menos ${field.errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return '';
  }
}
