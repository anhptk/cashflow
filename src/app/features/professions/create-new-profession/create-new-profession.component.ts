import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessionForm } from '../../../shared/models/profession-form';
import { ProfessionSummaryComponent } from './profession-summary/profession-summary.component';

@Component({
  selector: 'app-create-new-profession',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    ProfessionSummaryComponent
  ],
  templateUrl: './create-new-profession.component.html',
  styleUrl: './create-new-profession.component.scss'
})
export class CreateNewProfessionComponent {

  professionForm: FormGroup<ProfessionForm>;

  constructor() {
    this.professionForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return new FormGroup(<ProfessionForm>{
      professionName: new FormControl<string>('', [Validators.required]),
      income: new FormGroup({
        salary: new FormControl<number>(0, [Validators.min(1)])
      }),
      expenses: new FormGroup({
        taxes: new FormControl<number>(0),
        homeMortgage: new FormControl<number>(0),
        schoolLoan: new FormControl<number>(0),
        carLoan: new FormControl<number>(0),
        creditCard: new FormControl<number>(0),
        retail: new FormControl<number>(0),
        other: new FormControl<number>(0),
        childSupport: new FormControl<number>(0, Validators.min(1))
      }),
      assets: new FormGroup({
        savings: new FormControl<number>(0, Validators.min(1))
      }),
      liabilities: new FormGroup({
        homeMortgage: new FormControl<number>(0),
        schoolLoan: new FormControl<number>(0),
        carLoan: new FormControl<number>(0),
        creditCard: new FormControl<number>(0),
        retail: new FormControl<number>(0)
      }),
    });
  }

}
