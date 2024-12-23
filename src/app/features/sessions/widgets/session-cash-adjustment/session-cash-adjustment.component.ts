import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { SessionCashSummaryComponent } from '../session-cash-summary/session-cash-summary.component';
import { Router } from '@angular/router';
import { SESSION_LOG_TYPE } from '../../../../shared/constants/session-log.enum';

@Component({
  selector: 'app-session-cash-adjustment',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    SessionCashSummaryComponent
  ],
  templateUrl: './session-cash-adjustment.component.html',
  styleUrl: './session-cash-adjustment.component.scss'
})
export class SessionCashAdjustmentComponent {
  cashAmountControl: FormControl<number> = new FormControl(null, [Validators.required, Validators.min(0)]);

  constructor(
    private _store: SessionStoreService,
    private _router: Router
  ) {}

  public submit(isDecrease=false): void {
    const amount = this.cashAmountControl.value ?? 0;
    const sign = isDecrease ? '-' : '+';

    const cf = confirm($localize`:@@confirmCashAdjustment: Are you sure you want to adjust the cash by ${sign}$${amount}?`);
    if (cf) {
      if (isDecrease) {
        this._store.autoLoan(amount, () => this.adjustCash(-amount));
      } else {
        this.adjustCash(amount);
      }
    }
  }

  private adjustCash(amount: number): void {
    this._store.adjustCash(amount, SESSION_LOG_TYPE.CashAdjustment);

    alert($localize`:@@cashAdjustmentSuccess: Cash adjustment successful.`);
    this._router.navigateByUrl(this._store.sessionUrl);
  }
}
