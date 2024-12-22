import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LOAN_STEP } from '../../../../shared/constants/app.constant';
import { SessionCashSummaryComponent } from "../session-cash-summary/session-cash-summary.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { filter, map } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-session-loan-payoff',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SessionCashSummaryComponent,
    ButtonComponent,
],
  templateUrl: './session-loan-payoff.component.html',
  styleUrl: './session-loan-payoff.component.scss'
})
export class SessionLoanPayoffComponent {
  public readonly LOAN_STEP = LOAN_STEP;
  public loanAmountControl = new FormControl<number>(null);
  public loansBalance: number;

  constructor(
    private readonly sessionStoreService: SessionStoreService,
    private readonly router: Router
  ) {
    this._subscribeToLoansBalance();
  }

  payoff(): void {
    const amount = this.loanAmountControl.value;

    if (!this.loanAmountControl.valid || amount % LOAN_STEP !== 0) {
      alert($localize`:@@invalidLoanAmount: Invalid loan amount.`);
      return;
    }

    if (amount > this.sessionStoreService.state().session.cash) {
      alert($localize`:@@insufficientCash: Insufficient cash.`);
      return;
    }

    const cf = confirm($localize`:@@payoffLoanConfirm: Are you sure you want to payoff $${this.loanAmountControl.value} loan?`);
    if (cf) {
      this.sessionStoreService.payoffLoan(amount);
      alert($localize`:@@loanPayoffSuccess: Loan payoff successful.`);
      this.router.navigateByUrl(this.sessionStoreService.sessionUrl);
    }
   }

  private _subscribeToLoansBalance(): void {
    this.sessionStoreService.state$
    .pipe(
      map(state => state.expenseLiabilities.find(e => e.name === $localize`:@@loans:Loans`)),
      filter(e => !!e),
      takeUntilDestroyed()
    )
    .subscribe(e => {
      this.loansBalance = e.value;
      this.loanAmountControl.setValidators([Validators.required, Validators.min(0), Validators.max(this.loansBalance)]);
    });
  }
}
