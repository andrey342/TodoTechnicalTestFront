import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'todo-badge',
    templateUrl: './todo-badge.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoBadgeComponent {
    text = input.required<string>();
}
