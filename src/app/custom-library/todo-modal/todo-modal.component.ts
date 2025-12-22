import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todo-modal',
  imports: [CommonModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoModalComponent {
  isOpen = input(false);
  title = input('');
  close = output<void>();
}
