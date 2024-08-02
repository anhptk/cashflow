import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-create-new-profession',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './create-new-profession.component.html',
  styleUrl: './create-new-profession.component.scss'
})
export class CreateNewProfessionComponent {

}
