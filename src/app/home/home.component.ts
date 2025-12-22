import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoClient, TodoListViewModel } from '../api/api-client';
import { TodoColumnComponent, ItemMovedEvent } from '../custom-library/todo-column/todo-column.component';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DragDropModule, TodoColumnComponent, CreateListModalComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private todoClient = inject(TodoClient);

  todoLists = signal<TodoListViewModel[]>([]);
  isCreateListModalOpen = signal(false);

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.todoClient.todoListAll(undefined, true).subscribe({
      next: (lists) => {
        this.todoLists.set(lists);
      },
      error: (err) => console.error('Failed to load lists', err)
    });
  }

  onCreateListClosed(created: boolean) {
    this.isCreateListModalOpen.set(false);
    if (created) {
      this.loadLists();
    }
  }

  onAddItem(listId: string) {
    // TODO: Implement Add Item Modal
    console.log('Add Item to List', listId);
    alert('Implementar Modal Crear Tarea');
  }

  onDeleteList(listId: string) {
    // TODO: Implement Delete List
    console.log('Delete List', listId);
  }

  onItemMoved(event: ItemMovedEvent) {
    console.log('Item Moved', event);
    // NOTE: Backend API doesn't support moving items between lists directly.
    // The visual move persists but won't be saved to the backend.
    // A proper implementation would require a Remove + Add operation.
  }
}
