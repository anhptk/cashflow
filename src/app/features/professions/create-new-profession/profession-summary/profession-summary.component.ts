import { Component, Input } from '@angular/core';
import { ProfessionSummary, ProfessionForm } from '../../../../shared/models/forms/profession-form';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { INPUT_DEBOUNCE_TIME } from '../../../../shared/constants/app.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypedFormValue } from '../../../../shared/models/typed-fom-value';

@Component({
  selector: 'app-profession-summary',
  standalone: true,
  imports: [],
  templateUrl: './profession-summary.component.html',
  styleUrl: './profession-summary.component.scss'
})
export class ProfessionSummaryComponent {
  @Input() form!: FormGroup<ProfessionForm>;

  professionSummary: ProfessionSummary;

  constructor() {
    this.professionSummary = this._buildSummary();
    this._subscribeToFormChanges();
  }

  private _subscribeToFormChanges() {
    if (!this.form) return;

    this.form.valueChanges
      .pipe(debounceTime(INPUT_DEBOUNCE_TIME), takeUntilDestroyed())
      .subscribe((value) => {
        this.professionSummary = this._calculateSummary(value);
      });
  }

  private _calculateSummary(formValue: TypedFormValue<FormGroup<ProfessionForm>>): ProfessionSummary {
    const salary = formValue.income.salary;
    const passiveIncome = 0;
    const monthlyIncome = salary;
    const totalExpenses = formValue.expenses.taxes + formValue.expenses.homeMortgage + formValue.expenses.schoolLoan + formValue.expenses.carLoan + formValue.expenses.retail + formValue.expenses.creditCard + formValue.expenses.other;
    const monthlyCashFlow = monthlyIncome - totalExpenses;

    return {
      salary,
      passiveIncome,
      monthlyIncome,
      totalExpenses,
      monthlyCashFlow
    };
  }

  private _buildSummary(): ProfessionSummary {
    return {
      salary: 0,
      passiveIncome: 0,
      monthlyIncome: 0,
      totalExpenses: 0,
      monthlyCashFlow: 0
    };
  }
}
