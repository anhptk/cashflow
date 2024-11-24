import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() maxValue = 100;

  public progress = 0;
  public completed = signal(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] || changes['value'].currentValue) {
      this.progress = Math.round((this.value / this.maxValue) * 100);

      this.completed.set(this.progress >= 100);
    }
  }
}
