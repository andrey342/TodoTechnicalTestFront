import { Component, ChangeDetectionStrategy, inject, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { TodoClient, TodoItemViewModel, AddTodoItemCommand, UpdateTodoItemCommand, RegisterProgressionCommand, AddTodoItemDto, UpdateTodoItemDto, RegisterProgressionDto, ProgressionViewModel } from '../../api/api-client';
import { TodoModalComponent } from '../../custom-library/todo-modal/todo-modal.component';
import { TodoInputComponent } from '../../custom-library/todo-input/todo-input.component';
import { TodoButtonComponent } from '../../custom-library/todo-button/todo-button.component';
import { TodoCategorySelectorComponent } from '../../custom-library/todo-category-selector/todo-category-selector.component';
import { TodoProgressHistoryComponent } from '../../custom-library/todo-progress-history/todo-progress-history.component';
import { TodoProgressBarComponent } from '../../custom-library/todo-progress-bar/todo-progress-bar.component';
import { TodoDateInputComponent } from '../../custom-library/todo-date-input/todo-date-input.component';
import { TodoPercentInputComponent } from '../../custom-library/todo-percent-input/todo-percent-input.component';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-todo-item-modal',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TodoModalComponent,
        TodoInputComponent,
        TodoButtonComponent,
        TodoCategorySelectorComponent,
        TodoProgressHistoryComponent,
        TodoProgressBarComponent,
        TodoDateInputComponent,
        TodoPercentInputComponent
    ],
    templateUrl: './todo-item-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemModalComponent {
    private todoClient = inject(TodoClient);
    private toastService = inject(ToastService);

    isOpen = input(false);
    listId = input<string | undefined>(undefined);
    item = input<TodoItemViewModel | undefined>(undefined);
    close = output<boolean>();

    categories = signal<string[]>([]);

    // Form logic with Signals
    title = signal('');
    description = signal('');
    initialDescription = signal('');
    category = signal('');

    // Progression Logic
    progressInput = signal<number>(0);
    dateInput = signal<string>(new Date().toISOString().split('T')[0]);
    progressHistory = signal<ProgressionViewModel[]>([]);

    // State logic
    isLocked = signal(false);
    currentProgress = signal(0);

    constructor() {
        // Get All categories
        this.todoClient.categories().subscribe(cats => this.categories.set(cats));

        // Update form values when modal opens
        effect(() => {
            if (this.isOpen()) {
                const item = this.item();
                if (item) {
                    // EDIT MODE
                    this.title.set(item.title || '');
                    this.description.set(item.description || '');
                    this.initialDescription.set(item.description || '');
                    this.category.set(item.category || '');

                    this.currentProgress.set(item.totalProgress || 0);
                    this.progressHistory.set(item.progressions || []);

                    this.isLocked.set((item.totalProgress || 0) > 50);

                    // Reset progression inputs
                    this.progressInput.set(0);
                    this.dateInput.set(new Date().toISOString().split('T')[0]);
                } else {
                    // CREATE MODE - RESET EVERYTHING
                    this.resetForm();
                }
            }
        }, { allowSignalWrites: true });
    }

    get isEditMode() {
        return !!this.item();
    }

    resetForm() {
        this.title.set('');
        this.description.set('');
        this.initialDescription.set('');
        this.category.set('');

        this.currentProgress.set(0);
        this.progressHistory.set([]);
        this.progressInput.set(0);
        this.dateInput.set(new Date().toISOString().split('T')[0]);

        this.isLocked.set(false);
    }

    saveChanges() {
        if (!this.title() || !this.description() || !this.category()) {
            this.toastService.showWarning('Por favor, completa los campos requeridos');
            return;
        }

        if (this.isEditMode) {
            this.updateItem();
        } else {
            this.createItem();
        }
    }

    // Helper for max percent
    maxPercentAllowed = computed(() => {
        return 100 - this.currentProgress();
    });

    registerProgressAction() {
        if (this.currentProgress() >= 100) {
            this.toastService.showWarning('La tarea ya está completada al 100%');
            return;
        }

        const delta = this.progressInput();

        if (delta <= 0) {
            this.toastService.showWarning('El progreso debe ser incremental (mayor a 0)');
            return;
        }

        if ((this.currentProgress() + delta) > 100) {
            const max = 100 - this.currentProgress();
            this.toastService.showWarning(`El progreso total no puede superar el 100%. Máximo permitido: ${max}%`);
            return;
        }

        if (!this.dateInput()) {
            this.toastService.showWarning('Debes seleccionar una fecha para el progreso');
            return;
        }

        this.registerProgress(delta);
    }

    private createItem() {
        const command: AddTodoItemCommand = {
            requestId: crypto.randomUUID(),
            todoItem: {
                todoListId: this.listId(),
                title: this.title(),
                description: this.description(),
                category: this.category()
            } as AddTodoItemDto
        };

        this.todoClient.itemPOST(command).subscribe({
            next: () => {
                this.toastService.showSuccess('Tarea creada correctamente');
                this.close.emit(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.showError('Error al crear la tarea');
            }
        });
    }

    private updateItem() {
        if (this.isLocked()) {
            this.toastService.showWarning('No se puede editar una tarea con más del 50% de progreso');
            return;
        }

        const command: UpdateTodoItemCommand = {
            todoItem: {
                todoListId: this.item()?.todoListId,
                itemId: this.item()?.itemId,
                description: this.description()
            } as UpdateTodoItemDto
        };

        this.todoClient.itemPUT(command).subscribe({
            next: () => {
                this.toastService.showSuccess('Descripción actualizada');
                this.initialDescription.set(this.description());
                this.close.emit(true); // Close modal on update per requirements
            },
            error: (err) => {
                console.error(err);
                this.toastService.showError('Error al actualizar la tarea');
            }
        });
    }

    private registerProgress(delta: number) {
        const item = this.item();
        if (!item) return;

        const command: RegisterProgressionCommand = {
            requestId: crypto.randomUUID(),
            todoListId: item.todoListId,
            itemId: item.itemId,
            progression: {
                actionDate: new Date(this.dateInput()),
                percent: delta
            } as RegisterProgressionDto
        };

        this.todoClient.progression(command).subscribe({
            next: () => {
                this.toastService.showSuccess('Progreso registrado (+ ' + delta + '%)');
                this.close.emit(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.showError('Error al registrar progreso');
            }
        });
    }

    deleteItem() {
        if (this.isLocked()) {
            this.toastService.showWarning('No se puede eliminar una tarea con más del 50% de progreso');
            return;
        }

        const item = this.item();
        if (!item) return;

        if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

        this.todoClient.itemDELETE({
            todoItem: {
                todoListId: item.todoListId,
                itemId: item.itemId
            }
        }).subscribe({
            next: () => {
                this.toastService.showSuccess('Tarea eliminada');
                this.close.emit(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.showError('Error al eliminar la tarea');
            }
        });
    }
}