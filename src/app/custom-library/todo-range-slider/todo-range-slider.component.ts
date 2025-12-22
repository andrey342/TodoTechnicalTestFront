import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-range-slider',
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-range-slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoRangeSliderComponent {

    value = model<number>(0);
    max = input(100);
    min = input(0);
    step = input(5);
    disabled = input(false);
}
