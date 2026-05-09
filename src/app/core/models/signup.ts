export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Admin' | 'HR' | 'Manager';
}