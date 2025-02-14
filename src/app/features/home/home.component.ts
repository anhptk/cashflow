import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RouterModule } from '@angular/router';
import { DividerComponent } from '../../shared/ui/divider/divider.component';
import { SessionsListComponent } from '../sessions/sessions-list/sessions-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterModule,
    DividerComponent,
    SessionsListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
