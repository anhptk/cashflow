import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DividerComponent } from '../../../shared/ui/divider/divider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-new-session',
  standalone: true,
  imports: [
    ButtonComponent,
    DividerComponent,
    RouterLink
  ],
  templateUrl: './create-new-session.component.html',
  styleUrl: './create-new-session.component.scss'
})
export class CreateNewSessionComponent {

}
