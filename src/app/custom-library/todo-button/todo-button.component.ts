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
        let base = 'btn-base';

        if (this.fullWidth()) base += ' w-full';

        switch (this.type()) {
            case 'primary':
                return base + ' btn-primary';
            case 'secondary':
                return base + ' bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100';
            case 'ghost':
                return base + ' btn-ghost';
            case 'danger':
                return base + ' btn-danger';
            default:
                return base;
        }
    });
}
