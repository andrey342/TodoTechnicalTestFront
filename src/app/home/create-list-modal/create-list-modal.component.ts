import { Component, ChangeDetectionStrategy, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoModalComponent } from '../../custom-library/todo-modal/todo-modal.component';
import { TodoInputComponent } from '../../custom-library/todo-input/todo-input.component';
import { TodoButtonComponent } from '../../custom-library/todo-button/todo-button.component';
import { TodoClient, CreateTodoListCommand, TodoListDto } from '../../api/api-client';

@Component({
    selector: 'app-create-list-modal',
    imports: [CommonModule, TodoModalComponent, TodoInputComponent, TodoButtonComponent],
    templateUrl: './create-list-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateListModalComponent {

    isOpen = input(false);
    close = output<boolean>(); // true if created, false if cancelled

    listName = signal('');
    isSubmitting = signal(false);

    private todoClient = inject(TodoClient);

    cancel() {
        this.listName.set('');
        this.close.emit(false);
    }

    createList() {
        if (!this.listName()) return;

        this.isSubmitting.set(true);
        const command: CreateTodoListCommand = {
            requestId: crypto.randomUUID(),
            todoList: { name: this.listName() } as TodoListDto
        };

        this.todoClient.todoListPOST(command).subscribe({
            next: () => {
                this.listName.set('');
                this.isSubmitting.set(false);
                this.close.emit(true);
            },
            error: (err) => {
                console.error('Error creating list', err);
                this.isSubmitting.set(false);
            }
        });
    }
}