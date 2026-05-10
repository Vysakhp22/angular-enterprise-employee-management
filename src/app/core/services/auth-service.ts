import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage-service';
import { SignupRequest } from '../models/signup';
import { LoginRequest } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly USERS_KEY = 'REGISTERED_USERS';
  private static readonly AUTH_KEY = 'AUTH_USER';

  private readonly _storageService = inject(StorageService);

  private readonly _registeredUsers = signal<SignupRequest[]>(this._storageService.get(AuthService.USERS_KEY, []) ?? []);
  private readonly _authUser = signal<LoginRequest | null>(this._storageService.get(AuthService.AUTH_KEY, null));

  readonly currentUser = this._authUser.asReadonly();

  readonly isAuthenticated = computed(() => !!this._authUser());

  signup(request: SignupRequest): { success: boolean; message: string } {

    if (this.checkUserExists(request.email)) {
      return { success: false, message: 'User with this email already exists' };
    }

    this._registeredUsers.update(users => {
      const updatedUsers = [...users, request];
      this._storageService.set(AuthService.USERS_KEY, updatedUsers);
      return updatedUsers;
    });

    // In a real application, you would also want to log the user in immediately after signup
    const authUser: LoginRequest = { email: request.email, password: request.password };
    this._authUser.set(authUser);
    this._storageService.set(AuthService.AUTH_KEY, authUser);

    return { success: true, message: 'Signup successful' };
  }


  private checkUserExists(email: string): boolean {
    return this._registeredUsers()?.some(user => user.email === email) ?? false;
  }

  login(request: LoginRequest): { success: boolean; message: string } {
    const user = this._registeredUsers()?.find(u => u.email === request.email && u.password === request.password);
    if (user) {
      this._authUser.set(request);
      this._storageService.set(AuthService.AUTH_KEY, request);
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid email or password' };
  }

  logout(): void {
    this._authUser.set(null);
    this._storageService.delete(AuthService.AUTH_KEY);
  }

// This is a mock implementation. In a real application, you would make an HTTP request to your backend API to refresh the token.
  refreshToken(): Observable<{ accessToken: string }> {
    return new Observable(observer => {
      // Simulate an API call to refresh the token
      setTimeout(() => {
        const newToken = 'newlyGeneratedAccessToken';
        observer.next({ accessToken: newToken });
        observer.complete();
      }, 1000);
    });
  }



}
