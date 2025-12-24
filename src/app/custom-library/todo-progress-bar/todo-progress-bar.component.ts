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
    previewInput = input(0);

    total = computed(() => {
        const p = Number(this.progress()) || 0;
        const add = Number(this.previewInput()) || 0;
        return Math.min(p + add, 100);
    });

    colorClass = computed(() => {
        const p = this.total();
        if (p >= 100) return 'bg-green-500';
        if (p > 50) return 'bg-primary';
        if (p > 20) return 'bg-cyan-500';
        return 'bg-gray-300';
    });
}