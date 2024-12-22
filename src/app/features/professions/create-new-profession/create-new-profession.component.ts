import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessionForm } from '../../../shared/models/forms/profession-form';
import { ProfessionSummaryComponent } from './profession-summary/profession-summary.component';
import { TypedFormValue } from '../../../shared/models/typed-fom-value';
import { Profession } from '../../../shared/models/database/cashflow.db';
import { Location } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { SessionService } from '../../../shared/services/db/session.service';
import { ProfessionService } from '../../../shared/services/db/profession.service';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-new-profession',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    ProfessionSummaryComponent,
    RouterModule
  ],
  templateUrl: './create-new-profession.component.html',
  styleUrl: './create-new-profession.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNewProfessionComponent {

  profession = input<Profession>(undefined);

  professionForm: FormGroup<ProfessionForm>;

  constructor(
    private _professionService: ProfessionService,
    private _sessionService: SessionService,
    private _location: Location,
    private _router: Router
  ) {
    this.professionForm = this._buildForm();

    effect(() => {
      this.professionForm.patchValue(this.profession());
    })
  }

  private _buildForm(): FormGroup {
    return new FormGroup(<ProfessionForm>{
      name: new FormControl<string>(null, [Validators.required]),
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

    this._upsertProfessionRequest().subscribe(() => {
      confirm($localize`:@@professionCreatedSuccessfully:Profession created successfully!`);
      this._location.back();
    });
  }

  public submitAndCreateSession(): void {
    if (!this.professionForm.valid) {
      alert($localize`:@@formValidation.required:Please fill out all required fields`);
      return;
    }

    this._upsertProfessionRequest()
    .pipe(
      switchMap((professionId) => this._professionService.get(professionId)),
      switchMap(profession => this._sessionService.add(profession)),
      takeUntilDestroyed()
    ).subscribe((sessionId) => {
      alert($localize`:@@sessionAdded:Session added successfully!`);
      this._router.navigateByUrl(`/sessions/${sessionId}`);
    })
  }

  private _upsertProfessionRequest(): Observable<number> {
    const professionValue: TypedFormValue<FormGroup<ProfessionForm>> = this.professionForm.value;

    if (this.profession()) {
      return this._professionService.update({ ...professionValue, id: this.profession().id, createdAt: this.profession().createdAt });
    } else {
      return this._professionService.add(professionValue);
    }
  }

  public delete(): void {
    this._professionService.delete(this.profession().id).subscribe(() => {
      alert($localize`:@@professionDeleted:Profession deleted successfully!`);
      this._location.back();
    });
  }
}
