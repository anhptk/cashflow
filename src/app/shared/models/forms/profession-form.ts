import { FormControl, FormGroup } from '@angular/forms';

export interface ProfessionForm {
  name: FormControl<string>;
  income: FormGroup<ProfessionIncomeForm>;
  expenses: FormGroup<ProfessionExpensesForm>;
  assets: FormGroup<ProfessionAssetsForm>;
  liabilities: FormGroup<ProfessionLiabilitiesForm>;
}

interface ProfessionIncomeForm {
  salary: FormControl<number>;
}

interface ProfessionExpensesForm {
  taxes: FormControl<number>;
  homeMortgage: FormControl<number>;
  schoolLoan: FormControl<number>;
  carLoan: FormControl<number>;
  creditCard: FormControl<number>;
  retail: FormControl<number>;
  other: FormControl<number>;
  childSupport: FormControl<number>;
}

interface ProfessionAssetsForm {
  savings: FormControl<number>;
}

interface ProfessionLiabilitiesForm {
  homeMortgage: FormControl<number>;
  schoolLoan: FormControl<number>;
  carLoan: FormControl<number>;
  creditCard: FormControl<number>;
  retail: FormControl<number>;
}

export interface ProfessionSummary {
  salary: number;
  passiveIncome: number;
  monthlyIncome: number;
  totalExpenses: number;
  monthlyCashFlow: number;
}