import { Component, inject, signal } from '@angular/core';
import { LoginRequest } from '../../../core/models/login';
import { AuthService } from '../../../core/services/auth-service';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  protected loginModel = signal<LoginRequest>({
    email: '',
    password: ''
  });

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });


  protected async onSubmit() {
    let errorMessage = '';
    const success = await submit(this.loginForm, async (f) => {
      const result = this.authService.login(f().value());
      if (!result.success) {
        errorMessage = result.message;
        return { kind: 'loginError', message: result.message };
      }
      return;
    });

    if (success) {
      this.toastService.success('Login successful! Welcome back.');
      this.router.navigate(['/dashboard']);
    } else if (errorMessage) {
      this.toastService.error(errorMessage);
    }
  }
}
