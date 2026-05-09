export type EmployeeStatus = 'active' | 'inactive' | 'on-leave';

export type EmployeeRole = 'admin' | 'manager' | 'employee' | 'intern';

export type EmployeeDepartment =
  | 'Engineering'
  | 'HR'
  | 'Finance'
  | 'Marketing'
  | 'Sales'
  | 'Operations'
  | 'Design';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: EmployeeDepartment;
  role: EmployeeRole;
  status: EmployeeStatus;
}

export type EmployeeFormData = Omit<Employee, 'id'>;

export const DEPARTMENTS: EmployeeDepartment[] = [
  'Engineering',
  'HR',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Design',
];

export const ROLES: EmployeeRole[] = ['admin', 'manager', 'employee', 'intern'];

export const STATUSES: EmployeeStatus[] = ['active', 'inactive', 'on-leave'];
