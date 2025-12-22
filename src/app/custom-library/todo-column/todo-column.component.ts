import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoListViewModel, TodoItemViewModel } from '../../api/api-client';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoIconButtonComponent } from '../todo-icon-button/todo-icon-button.component';

export interface ItemMovedEvent {
    item: TodoItemViewModel;
    newListId: string;
    oldListId: string;
}

@Component({
    selector: 'todo-column',
    imports: [CommonModule, DragDropModule, TodoCardComponent, TodoIconButtonComponent],
    templateUrl: './todo-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoColumnComponent {

    list = input.required<TodoListViewModel>();

    addItem = output<string>(); // emits listId
    editItem = output<TodoItemViewModel>();
    printList = output<string>();
    deleteList = output<string>();
    itemMoved = output<ItemMovedEvent>();

    drop(event: CdkDragDrop<TodoItemViewModel[] | undefined>) {
        if (!event.container.data || !event.previousContainer.data) return;

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );

            // Notify parent about change to handle API updates
            this.itemMoved.emit({
                item: event.container.data[event.currentIndex],
                newListId: event.container.id,
                oldListId: event.previousContainer.id
            });
        }
    }
}
