import { Component, ChangeDetectionStrategy, input, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-percent-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-percent-input.component.html',
    styleUrl: './todo-percent-input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPercentInputComponent {
    label = input('');
    placeholder = input('');
    value = model<number | undefined>(undefined);
    max = input<number>(100);

    // Compute remaining allowed
    remaining = computed(() => this.max());

    updateValue(event: any) {
        let newValue = event;
        if (typeof event === 'object' && event?.target) {
            newValue = event.target.value;
        }

        // If input is empty, reset to undefined to show placeholder
        if (newValue === '' || newValue === null || newValue === undefined) {
            this.value.set(undefined);
            return;
        }

        let num = Number(newValue);
        if (isNaN(num)) {
            this.value.set(undefined);
            return;
        }

        if (num < 0) num = 0;
        if (num > this.max()) num = this.max();

        if (this.value() === num) {
            this.value.set(-1);
            setTimeout(() => this.value.set(num), 0);
        } else {
            this.value.set(num);
        }
    }
}