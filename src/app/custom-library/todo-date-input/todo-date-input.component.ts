import { Component, ChangeDetectionStrategy, input, model, effect } from '@angular/core';
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
    min = input<string | null>(null);

    constructor() {
        effect(() => {
            const minDate = this.min();
            if (minDate) {
                this.value.set(minDate);
            } else {
                // Default to now (local time)
                const now = new Date();
                const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
                this.value.set(localIso);
            }
        });
    }
}