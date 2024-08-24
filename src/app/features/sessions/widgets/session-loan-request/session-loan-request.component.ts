import { Component } from '@angular/core';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { CommonModule, Location } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { LOAN_INTEREST, LOAN_STEP } from '../../../../shared/constants/app.constant';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { SessionCashSummaryComponent } from '../session-cash-summary/session-cash-summary.component';

@Component({
  selector: 'app-session-loan-request',
  standalone: true,
  imports: [CommonModule, DividerComponent, FormsModule, ReactiveFormsModule, ButtonComponent, SessionCashSummaryComponent],
  templateUrl: './session-loan-request.component.html',
  styleUrl: './session-loan-request.component.scss'
})
export class SessionLoanRequestComponent {
  LOAN_INTEREST = LOAN_INTEREST;
  LOAN_STEP = LOAN_STEP;

  loanAmountControl: FormControl<number>;

  constructor(
    private _store: SessionStoreService,
    private _location: Location
  ) {
    this.loanAmountControl = new FormControl(null, [Validators.required, Validators.min(1)]);
  }

  public onLoanRequest(): void {
    const amount = this.loanAmountControl.value;

    if (this.loanAmountControl.valid && amount % LOAN_STEP === 0) {
      this._store.loan(amount);
      alert($localize`:@@loanRequestSuccess: Loan request successful.`);
      this._location.back();

    } else {
      alert($localize`:@@invalidLoanAmount: Invalid loan amount.`);
    }
  }
}
