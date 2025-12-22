import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemViewModel } from '../../api/api-client';
import { TodoBadgeComponent } from '../todo-badge/todo-badge.component';
import { TodoProgressBarComponent } from '../todo-progress-bar/todo-progress-bar.component';

@Component({
    selector: 'todo-card',
    standalone: true,
    imports: [CommonModule, TodoBadgeComponent, TodoProgressBarComponent],
    templateUrl: './todo-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCardComponent {
    item = input.required<TodoItemViewModel>();
}
