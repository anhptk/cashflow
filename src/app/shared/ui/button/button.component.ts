import { Component, Input, numberAttribute, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() clickFn: () => void = () => {};
  @Input() color = 'blue';
  @Input({transform: numberAttribute}) paddingSize = 2;
  @Input() className = '';

  public disabled = input(false);
}
