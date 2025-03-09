import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ProfessionSummary, ProfessionForm } from '../../../../shared/models/forms/profession-form';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { INPUT_DEBOUNCE_TIME } from '../../../../shared/constants/app.constant';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypedFormValue } from '../../../../shared/models/typed-fom-value';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profession-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profession-summary.component.html',
  styleUrl: './profession-summary.component.scss'
})
export class ProfessionSummaryComponent implements OnInit {
  @Input() form!: FormGroup<ProfessionForm>;

  professionSummary: ProfessionSummary;

  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    this.professionSummary = this._buildSummary();
  }

  ngOnInit() {
    this._subscribeToFormChanges();
  }

  private _subscribeToFormChanges() {
    if (!this.form) return;

    this.form.valueChanges
      .pipe(debounceTime(INPUT_DEBOUNCE_TIME), takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        this.professionSummary = this._calculateSummary(value);
      });
  }

  private _calculateSummary(formValue: TypedFormValue<FormGroup<ProfessionForm>>): ProfessionSummary {
    const salary = formValue.income.salary;
    const passiveIncome = 0;
    const monthlyIncome = salary;
    const totalExpenses = this._calculateTotalExpenses(formValue);
    const monthlyCashFlow = monthlyIncome - totalExpenses;

    return {
      salary,
      passiveIncome,
      monthlyIncome,
      totalExpenses,
      monthlyCashFlow
    };
  }

  private _calculateTotalExpenses(formValue: TypedFormValue<FormGroup<ProfessionForm>>): number {
    return (formValue.expenses.taxes || 0) + (formValue.expenses.homeMortgage || 0) + (formValue.expenses.schoolLoan || 0) + (formValue.expenses.carLoan || 0) + (formValue.expenses.retail || 0) + (formValue.expenses.creditCard || 0) + (formValue.expenses.other || 0);
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
