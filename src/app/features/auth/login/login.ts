import { Component, signal } from '@angular/core';
import { LoginRequest } from '../../../core/models/login';
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

  protected loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.password, { message: 'Password is required' });
  });


  protected async onSubmit() {
    // 1. At this point all fields are already marked as touched
    // 2. If form is invalid - this function will NOT be called
    // 3. f().submitting() === true during execution
    await submit(this.loginForm, async (f) => {
      if (!f().valid) {
        console.log('Form is invalid:', f().errors);
        return;
      }
      // Handle form submission, e.g., call an authentication service
      console.log('Form submitted with:', f().value());
    });
  }
}
