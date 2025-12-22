import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressionViewModel } from '../../api/api-client';

@Component({
  selector: 'todo-progress-history',
  imports: [CommonModule],
  templateUrl: './todo-progress-history.component.html',
  styleUrl: './todo-progress-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoProgressHistoryComponent {
  progressions = input<ProgressionViewModel[]>([]);
}
