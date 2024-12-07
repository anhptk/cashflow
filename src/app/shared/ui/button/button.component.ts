import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() clickFn: () => void = () => {};
  @Input() color = 'blue';
  @Input() disabled = false;
  @Input({transform: numberAttribute}) paddingSize = 2;
  @Input() className = '';
}
