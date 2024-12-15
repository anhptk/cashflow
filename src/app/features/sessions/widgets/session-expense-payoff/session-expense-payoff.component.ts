import { Component } from '@angular/core';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { Observable } from 'rxjs';
import { ExpenseItem } from '../../../../shared/models/database/session.db';
import { CommonModule } from '@angular/common';
import { SessionCashSummaryComponent } from '../session-cash-summary/session-cash-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expense-payoff',
  standalone: true,
  imports: [
    CommonModule,
    SessionCashSummaryComponent
  ],
  templateUrl: './session-expense-payoff.component.html',
  styleUrl: './session-expense-payoff.component.scss'
})
export class SessionExpensePayoffComponent {
  expenseLiabilities$: Observable<ExpenseItem[]>;

  constructor(
    private sessionStore: SessionStoreService,
    private router: Router
  ) {
    this.expenseLiabilities$ = this.sessionStore.select(state => state.expenseLiabilities);
  }

  public payoff(expense: ExpenseItem): void {
    if (expense.name === $localize`:@@loans:Loans`) {
      this.router.navigateByUrl(`${this.router.url}/loans`);
      return;
    }

    const cf = confirm($localize`:@@sessionExpenses.payoffConfirm:Payoff: ${expense.name}. Cash -$${expense.value}. Cashflow +$${expense.cashflow}`);
    if (cf) {
      this.sessionStore.payoffExpense(expense);
    }
  }
}
