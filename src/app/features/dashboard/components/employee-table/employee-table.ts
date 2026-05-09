import { Component, input, output } from '@angular/core';
import { Employee } from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.scss',
})
export class EmployeeTable {
  employees = input.required<Employee[]>();
  editEmployee = output<Employee>();
  deleteEmployee = output<string>();

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      active: 'badge-soft badge-success',
      inactive: 'badge-soft badge-error',
      'on-leave': 'badge-soft badge-warning',
    };
    return map[status] ?? 'badge-ghost';
  }

  getRoleBadge(role: string): string {
    const map: Record<string, string> = {
      admin: 'badge-soft badge-primary',
      manager: 'badge-soft badge-info',
      employee: 'badge-soft badge-neutral',
      intern: 'badge-soft badge-secondary',
    };
    return map[role] ?? 'badge-ghost';
  }

  formatStatus(status: string): string {
    const map: Record<string, string> = {
      active: 'Active',
      inactive: 'Inactive',
      'on-leave': 'On Leave',
    };
    return map[status] ?? status;
  }

  formatRole(role: string): string {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }
}
