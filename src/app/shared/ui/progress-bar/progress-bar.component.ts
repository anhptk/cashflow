import { DecimalPipe } from '@angular/common';
import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  public value = input(0);
  public maxValue = input(100);

  public progress = 0;
  public completed = computed(() => Math.round(this.value()/this.maxValue()) >= 1);
}
