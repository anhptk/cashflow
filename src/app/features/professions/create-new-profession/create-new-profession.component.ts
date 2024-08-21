import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessionForm } from '../../../shared/models/forms/profession-form';
import { ProfessionSummaryComponent } from './profession-summary/profession-summary.component';
import { TypedFormValue } from '../../../shared/models/typed-fom-value';
import { Profession } from '../../../shared/models/database/cashflow.db';
import { ProfessionService } from '../../../shared/services/db/profession.service';
import { Location } from '@angular/common';

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

  @Input() profession?: Profession;

  professionForm: FormGroup<ProfessionForm>;

  constructor(
    private _professionService: ProfessionService,
    private _location: Location
  ) {
    this.professionForm = this._buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profession'].currentValue) {
      this.professionForm.patchValue(this.profession!);
    }
  }

  private _buildForm(): FormGroup {
    return new FormGroup(<ProfessionForm>{
      name: new FormControl<string>('', [Validators.required]),
      income: new FormGroup({
        salary: new FormControl<number>(null, [Validators.min(1)])
      }),
      expenses: new FormGroup({
        taxes: new FormControl<number>(null),
        homeMortgage: new FormControl<number>(null),
        schoolLoan: new FormControl<number>(null),
        carLoan: new FormControl<number>(null),
        creditCard: new FormControl<number>(null),
        retail: new FormControl<number>(0),
        other: new FormControl<number>(null),
        childSupport: new FormControl<number>(null, Validators.min(1))
      }),
      assets: new FormGroup({
        savings: new FormControl<number>(null, Validators.min(1))
      }),
      liabilities: new FormGroup({
        homeMortgage: new FormControl<number>(null),
        schoolLoan: new FormControl<number>(null),
        carLoan: new FormControl<number>(null),
        creditCard: new FormControl<number>(null),
        retail: new FormControl<number>(0)
      }),
    });
  }

  public submit(): void {
    if (!this.professionForm.valid) {
      alert($localize`:@@pleaseFillOutAllRequiredFields:Please fill out all required fields`);
      return;
    }

    const profession: TypedFormValue<FormGroup<ProfessionForm>> = this.professionForm.value;

    this._professionService.add(profession).subscribe(() => {
      confirm($localize`:@@professionCreatedSuccessfully:Profession created successfully!`);
      setTimeout(() => {
        this._location.back();
      }, 200)
    });
  }

}
