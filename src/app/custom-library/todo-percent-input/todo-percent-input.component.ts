import { Component, ChangeDetectionStrategy, input, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-percent-input',
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-percent-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoPercentInputComponent {
    label = input('');
    placeholder = input('');
    value = model<number>(0);
    max = input<number>(100);

    // Compute remaining allowed
    remaining = computed(() => this.max());

    updateValue(newValue: number) {
        if (newValue < 0) newValue = 0;
        if (newValue > this.max()) newValue = this.max();
        this.value.set(newValue);
    }
}
