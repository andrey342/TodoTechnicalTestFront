import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-modal',
  imports: [CommonModule],
  templateUrl: './todo-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.3s ease-out;
    }
  `]
})
export class TodoModalComponent {
  isOpen = input(false);
  title = input('');
  close = output<void>();
}
