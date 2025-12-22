import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'todo-progress-bar',
    imports: [CommonModule],
    templateUrl: './todo-progress-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoProgressBarComponent {

    progress = input(0);

    colorClass = computed(() => {
        const p = this.progress();
        if (p >= 100) return 'bg-green-500';
        if (p > 50) return 'bg-primary';
        if (p > 20) return 'bg-cyan-500';
        return 'bg-gray-300';
    });
}
