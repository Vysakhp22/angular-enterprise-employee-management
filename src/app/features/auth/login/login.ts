import { Component, inject, signal } from '@angular/core';
import { LoginRequest } from '../../../core/models/login';
import { AuthService } from '../../../core/services/auth-service';
import { form, FormField, required, submit } from '@angular/forms/signals';

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

  protected loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });


  protected async onSubmit() {
    const success = await submit(this.loginForm, async (f) => {
      const result = this.authService.login(f().value());
      if (!result.success) {
        return { kind: 'loginError', message: result.message };
      }
      return;
    });

    if (success) {
      console.log('Login successful');
    }
  }
}
