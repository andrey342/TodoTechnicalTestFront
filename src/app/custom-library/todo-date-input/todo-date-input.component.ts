import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-date-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-date-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDateInputComponent {
    label = input('');
    value = model<string>('');
    min = input<string>('');
}
