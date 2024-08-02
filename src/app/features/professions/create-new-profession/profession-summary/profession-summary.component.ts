import { Component, Input } from '@angular/core';
import { ProfessionSummary, ProfessionForm } from '../../../../shared/models/profession-form';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profession-summary',
  standalone: true,
  imports: [],
  templateUrl: './profession-summary.component.html',
  styleUrl: './profession-summary.component.scss'
})
export class ProfessionSummaryComponent {
  @Input() form?: FormGroup<ProfessionForm>;
  professionSummary: ProfessionSummary;

  constructor() {
    this.professionSummary = this._buildSummary();
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
