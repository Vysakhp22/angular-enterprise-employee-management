import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.html',
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  alertClass(type: ToastType): string {
    const classes: Record<ToastType, string> = {
      success: 'alert alert-success',
      error: 'alert alert-error',
      info: 'alert alert-info',
      warning: 'alert alert-warning',
    };
    return classes[type];
  }

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
