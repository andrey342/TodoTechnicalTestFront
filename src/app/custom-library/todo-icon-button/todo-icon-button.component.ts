import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'todo-icon-button',
    imports: [CommonModule],
    templateUrl: './todo-icon-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoIconButtonComponent {

    icon = input.required<string>();
    title = input('');
    variant = input<'default' | 'danger'>('default');

    clicked = output<void>();

    classes = computed(() => {
        if (this.variant() === 'danger') {
            return 'text-red-400 hover:text-red-700 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/10';
        }
        return 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50';
    });
}
