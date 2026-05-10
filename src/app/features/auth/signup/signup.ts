import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required, submit, validate } from '@angular/forms/signals';
import { SignupRequest } from '../../../core/models/signup';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  protected signupModel = signal<SignupRequest>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'HR'
  });

  private readonly authService = inject(AuthService);

  protected signupForm = form(this.signupModel, (s) => {
    required(s.name, { message: 'Full name is required' });
    required(s.email, { message: 'Email is required' });
    required(s.role, { message: 'Role is required' });
    required(s.password, { message: 'Password is required' });
    minLength(s.password, 6, { message: 'Password must be at least 6 characters long' });
    required(s.confirmPassword, { message: 'Please confirm your password' });
    validate(s.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(s.password);
      return confirmPassword === password ? null : { kind: 'passwordMismatch', message: 'Passwords do not match' };
    })
  });

  protected async onSubmit() {
    const success = await submit(this.signupForm, async (f) => {
      const result = this.authService.signup(f().value());
      if (!result.success) {
        return { kind: 'signupError', message: result.message };
      }
      return;
    });

    if (success) {
      console.log('Signup successful');
    }
  }
}

