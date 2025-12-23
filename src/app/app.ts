import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoToastComponent } from './custom-library/todo-toast/todo-toast.component';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private signalRService = inject(SignalRService);
  protected readonly title = signal('TodoTechnicalTestFront');
}