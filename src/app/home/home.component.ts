import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TodoClient, TodoListViewModel, TodoItemViewModel } from '../api/api-client';
import { TodoColumnComponent, ItemMovedEvent } from '../custom-library/todo-column/todo-column.component';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';
import { TodoItemModalComponent } from './todo-item-modal/todo-item-modal.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, DragDropModule, TodoColumnComponent, CreateListModalComponent, TodoItemModalComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private todoClient = inject(TodoClient);

  todoLists = signal<TodoListViewModel[]>([]);
  isCreateListModalOpen = signal(false);

  // TodoItem Modal State
  isTodoItemModalOpen = signal(false);
  selectedListId = signal<string | undefined>(undefined);
  selectedItem = signal<TodoItemViewModel | undefined>(undefined);

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
    this.selectedListId.set(listId);
    this.selectedItem.set(undefined);
    this.isTodoItemModalOpen.set(true);
  }

  onEditItem(item: TodoItemViewModel) {
    this.selectedItem.set(item);
    this.selectedListId.set(item.todoListId);
    this.isTodoItemModalOpen.set(true);
  }

  onTodoItemModalClosed(refresh: boolean) {
    this.isTodoItemModalOpen.set(false);
    this.selectedItem.set(undefined);
    this.selectedListId.set(undefined);
    if (refresh) {
      this.loadLists();
    }
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
