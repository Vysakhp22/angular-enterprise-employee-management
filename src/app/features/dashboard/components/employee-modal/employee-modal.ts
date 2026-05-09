import { Component, input, output, inject, effect, viewChild, ElementRef, afterNextRender } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {
  Employee,
  EmployeeFormData,
  EmployeeStatus,
  DEPARTMENTS,
  ROLES,
  STATUSES,
} from '../../../../core/models/employee';

@Component({
  selector: 'app-employee-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-modal.html',
  styleUrl: './employee-modal.scss',
})
export class EmployeeModal {
  private fb = inject(FormBuilder);

  employee = input<Employee | null>(null);
  save = output<EmployeeFormData>();
  cancel = output<void>();

  readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogEl');

  readonly departments = DEPARTMENTS;
  readonly roles = ROLES;
  readonly statuses = STATUSES;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    role: ['', Validators.required],
    status: ['active' as EmployeeStatus, Validators.required],
  });

  get isEditMode(): boolean {
    return !!this.employee();
  }

  constructor() {
    afterNextRender(() => {
      this.dialogRef().nativeElement.showModal();
    });

    effect(() => {
      const emp = this.employee();
      if (emp) {
        this.form.patchValue(emp);
      } else {
        this.form.reset({ status: 'active' });
      }
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value as EmployeeFormData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  formatLabel(value: string): string {
    return value
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
