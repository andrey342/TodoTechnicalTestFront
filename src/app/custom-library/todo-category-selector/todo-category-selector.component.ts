import { Component, ChangeDetectionStrategy, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'todo-category-selector',
    imports: [CommonModule],
    templateUrl: './todo-category-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
    .filled { font-variation-settings: 'FILL' 1; }
  `]
})
export class TodoCategorySelectorComponent {
    categories = input.required<string[]>();
    selected = model<string>('');
    disabled = input(false);
}
