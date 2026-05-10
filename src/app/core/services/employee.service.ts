import { Injectable, signal, computed, inject } from '@angular/core';
import { Employee, EmployeeFormData } from '../models/employee';
import { StorageService } from './storage-service';

const MOCK_EMPLOYEES: Employee[] = [
  // Engineering
  { id: '1', name: 'Alice Johnson', email: 'alice.johnson@company.com', department: 'Engineering', role: 'admin', status: 'active' },
  { id: '2', name: 'Ethan Clark', email: 'ethan.clark@company.com', department: 'Engineering', role: 'manager', status: 'active' },
  { id: '3', name: 'Ivy Taylor', email: 'ivy.taylor@company.com', department: 'Engineering', role: 'employee', status: 'active' },
  { id: '4', name: 'Eve Davis', email: 'eve.davis@company.com', department: 'Engineering', role: 'manager', status: 'on-leave' },
  { id: '5', name: 'Noah Martinez', email: 'noah.martinez@company.com', department: 'Engineering', role: 'intern', status: 'active' },

  // HR
  { id: '6', name: 'Jack Anderson', email: 'jack.anderson@company.com', department: 'HR', role: 'admin', status: 'active' },
  { id: '7', name: 'Bob Smith', email: 'bob.smith@company.com', department: 'HR', role: 'manager', status: 'active' },
  { id: '8', name: 'Mia Robinson', email: 'mia.robinson@company.com', department: 'HR', role: 'employee', status: 'inactive' },

  // Finance
  { id: '9', name: 'Kate Thomas', email: 'kate.thomas@company.com', department: 'Finance', role: 'manager', status: 'active' },
  { id: '10', name: 'Carol White', email: 'carol.white@company.com', department: 'Finance', role: 'employee', status: 'inactive' },
  { id: '11', name: 'Oscar Lee', email: 'oscar.lee@company.com', department: 'Finance', role: 'intern', status: 'active' },

  // Marketing
  { id: '12', name: 'David Brown', email: 'david.brown@company.com', department: 'Marketing', role: 'manager', status: 'active' },
  { id: '13', name: 'Liam Jackson', email: 'liam.jackson@company.com', department: 'Marketing', role: 'intern', status: 'on-leave' },
  { id: '14', name: 'Sophia Harris', email: 'sophia.harris@company.com', department: 'Marketing', role: 'employee', status: 'active' },

  // Sales
  { id: '15', name: 'Frank Miller', email: 'frank.miller@company.com', department: 'Sales', role: 'manager', status: 'active' },
  { id: '16', name: 'Ava Thompson', email: 'ava.thompson@company.com', department: 'Sales', role: 'employee', status: 'active' },
  { id: '17', name: 'James Garcia', email: 'james.garcia@company.com', department: 'Sales', role: 'intern', status: 'inactive' },

  // Operations
  { id: '18', name: 'Henry Moore', email: 'henry.moore@company.com', department: 'Operations', role: 'employee', status: 'inactive' },
  { id: '19', name: 'Charlotte Lewis', email: 'charlotte.lewis@company.com', department: 'Operations', role: 'manager', status: 'active' },
  { id: '20', name: 'William Walker', email: 'william.walker@company.com', department: 'Operations', role: 'employee', status: 'on-leave' },

  // Design
  { id: '21', name: 'Grace Wilson', email: 'grace.wilson@company.com', department: 'Design', role: 'manager', status: 'active' },
  { id: '22', name: 'Chloe Hall', email: 'chloe.hall@company.com', department: 'Design', role: 'employee', status: 'active' },
  { id: '23', name: 'Benjamin Allen', email: 'benjamin.allen@company.com', department: 'Design', role: 'intern', status: 'on-leave' },
];

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private static readonly STORAGE_KEY = 'EMPLOYEES';

  private readonly _storageService = inject(StorageService);

  private readonly _employees = signal<Employee[]>(this._storageService.get(EmployeeService.STORAGE_KEY, MOCK_EMPLOYEES) ?? MOCK_EMPLOYEES);

  readonly employees = this._employees.asReadonly();

  readonly stats = computed(() => {
    const all = this._employees();
    return {
      total: all.length,
      active: all.filter(e => e.status === 'active').length,
      departments: new Set(all.map(e => e.department)).size,
      admins: all.filter(e => e.role === 'admin').length,
    };
  });

  addEmployee(data: EmployeeFormData): void {
    const newEmployee: Employee = { ...data, id: crypto.randomUUID() };
    this._employees.update(list => {
      const updatedList = [...list, newEmployee];
      this._storageService.set(EmployeeService.STORAGE_KEY, updatedList);
      return updatedList;
    })
  }

  updateEmployee(id: string, data: EmployeeFormData): void {
    this._employees.update(list => {
      const updatedList = list.map(e => (e.id === id ? { ...e, ...data } : e));
      this._storageService.set(EmployeeService.STORAGE_KEY, updatedList);
      return updatedList;
    });
  }

  deleteEmployee(id: string): void {
    this._employees.update(list => {
      const updated = list.filter(e => e.id !== id);
      this._storageService.set(EmployeeService.STORAGE_KEY, updated);
      return updated;
    });
  }
}
