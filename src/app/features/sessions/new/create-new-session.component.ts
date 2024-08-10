import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DividerComponent } from '../../../shared/ui/divider/divider.component';
import { RouterLink } from '@angular/router';
import { ProfessionsListComponent } from '../../professions/professions-list/professions-list.component';

@Component({
  selector: 'app-create-new-session',
  standalone: true,
  imports: [
    ButtonComponent,
    DividerComponent,
    RouterLink,
    ProfessionsListComponent
  ],
  templateUrl: './create-new-session.component.html',
  styleUrl: './create-new-session.component.scss'
})
export class CreateNewSessionComponent {

}
