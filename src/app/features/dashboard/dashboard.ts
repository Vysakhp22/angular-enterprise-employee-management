import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee, EmployeeFormData, DEPARTMENTS, STATUSES } from '../../core/models/employee';
import { StatsCard } from './components/stats-card/stats-card';
import { EmployeeTable } from './components/employee-table/employee-table';
import { EmployeeModal } from './components/employee-modal/employee-modal';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatsCard, EmployeeTable, EmployeeModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  readonly stats = this.employeeService.stats;
  readonly departments = DEPARTMENTS;
  readonly statuses = STATUSES;

  // Filter state
  searchQuery = signal('');
  selectedDepartment = signal('');
  selectedStatus = signal('');

  // Modal state
  isModalOpen = signal(false);
  selectedEmployee = signal<Employee | null>(null);

  readonly filteredEmployees = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const dept = this.selectedDepartment();
    const status = this.selectedStatus();

    return this.employeeService.employees().filter(e => {
      const matchesSearch =
        !query ||
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query);
      const matchesDept = !dept || e.department === dept;
      const matchesStatus = !status || e.status === status;
      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onDepartmentChange(event: Event): void {
    this.selectedDepartment.set((event.target as HTMLSelectElement).value);
  }

  onStatusChange(event: Event): void {
    this.selectedStatus.set((event.target as HTMLSelectElement).value);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedDepartment.set('');
    this.selectedStatus.set('');
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchQuery() || this.selectedDepartment() || this.selectedStatus());
  }

  openAddModal(): void {
    this.selectedEmployee.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(employee: Employee): void {
    this.selectedEmployee.set(employee);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedEmployee.set(null);
  }

  onSaveEmployee(data: EmployeeFormData): void {
    const emp = this.selectedEmployee();
    if (emp) {
      this.employeeService.updateEmployee(emp.id, data);
      this.toastService.success('Employee updated successfully!');
    } else {
      this.employeeService.addEmployee(data);
      this.toastService.success('Employee added successfully!');
    }
    this.closeModal();
  }

  onDeleteEmployee(id: string): void {
    if (confirm('Are you sure you want to remove this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.toastService.success('Employee deleted successfully!');
    }
  }

  logout(): void {
    this.toastService.info('You have been logged out.');
    this.router.navigate(['/']);
  }
}
