import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoInputComponent {

    label = input('');
    placeholder = input('');
    type = input('text');
    icon = input<string>();
    autofocus = input(false);
    maxLength = input<number>();

    value = model<any>();
}