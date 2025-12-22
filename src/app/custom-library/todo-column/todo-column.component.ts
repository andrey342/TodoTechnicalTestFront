import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListViewModel, TodoItemViewModel } from '../../api/api-client';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoIconButtonComponent } from '../todo-icon-button/todo-icon-button.component';

@Component({
    selector: 'todo-column',
    imports: [CommonModule, TodoCardComponent, TodoIconButtonComponent],
    templateUrl: './todo-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoColumnComponent {

    list = input.required<TodoListViewModel>();

    addItem = output<string>(); // emits listId
    editItem = output<TodoItemViewModel>();
    printList = output<string>();
    deleteList = output<string>();
}
