import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'todo-toast-container',
  imports: [CommonModule],
  templateUrl: './todo-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './todo-toast.component.css'
})
export class TodoToastComponent {

  toastService = inject(ToastService);

  dismiss(id: string) {
    this.toastService.dismiss(id);
  }
}