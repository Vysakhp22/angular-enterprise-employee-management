import { Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { SignupRequest } from '../../../core/models/signup';

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

  protected signupForm = form(this.signupModel, (s) => {
    required(s.name, { message: 'Full name is required' });
    required(s.email, { message: 'Email is required' });
    required(s.role, { message: 'Role is required' });
    required(s.password, { message: 'Password is required' });
    required(s.confirmPassword, { message: 'Please confirm your password' });
  });

  protected async onSubmit() {
    await submit(this.signupForm, async (f) => {
      if (!f().valid) {
        console.log('Form is invalid:', f().errors);
        return;
      }
      console.log('Signup form submitted:', f().value());
    });
  }
}

