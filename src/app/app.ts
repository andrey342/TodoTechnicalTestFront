import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoToastComponent } from './custom-library/todo-toast/todo-toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TodoTechnicalTestFront');
}