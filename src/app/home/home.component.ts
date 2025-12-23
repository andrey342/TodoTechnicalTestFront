import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoClient, TodoListViewModel, TodoItemViewModel } from '../api/api-client';
import { TodoColumnComponent } from '../custom-library/todo-column/todo-column.component';
import { CreateListModalComponent } from './create-list-modal/create-list-modal.component';
import { TodoItemModalComponent } from './todo-item-modal/todo-item-modal.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TodoColumnComponent, CreateListModalComponent, TodoItemModalComponent],
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
    if (refresh) {
      this.loadLists();
    }
    this.selectedItem.set(undefined);
    this.selectedListId.set(undefined);
  }

  onDeleteList(listId: string) {
    // TODO: Implement Delete List
    console.log('Delete List', listId);
  }
}