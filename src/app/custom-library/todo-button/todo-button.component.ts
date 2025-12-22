import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'todo-button',
    imports: [CommonModule],
    templateUrl: './todo-button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoButtonComponent {

    type = input<'primary' | 'secondary' | 'ghost' | 'danger'>('primary');
    text = input.required<string>();
    icon = input<string>();
    iconPosition = input<'left' | 'right'>('left');
    disabled = input(false);
    submit = input(false);
    fullWidth = input(false);

    clicked = output<void>();

    classes = computed(() => {
        let base = '';

        if (this.fullWidth()) base += ' w-full';

        switch (this.type()) {
            case 'primary':
                return base + ' bg-primary hover:bg-primary-hover active:scale-95 text-white shadow-sm';
            case 'secondary':
                return base + ' bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100';
            case 'ghost':
                return base + ' bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300';
            case 'danger':
                return base + ' bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-700';
            default:
                return base;
        }
    });
}
