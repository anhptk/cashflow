import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { SessionCashSummaryComponent } from '../session-cash-summary/session-cash-summary.component';
import { Router } from '@angular/router';

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
  cashAmountControl: FormControl<number> = new FormControl(null);

  constructor(
    private _store: SessionStoreService,
    private _router: Router
  ) {}

  public submit(): void {
    const amount = this.cashAmountControl.value || 0;
    const cf = confirm($localize`:@@confirmCashAdjustment: Are you sure you want to adjust the cash by ${amount}?`);
    if (cf) {
      this._store.adjustCash(amount);
      alert($localize`:@@cashAdjustmentSuccess: Cash adjustment successful.`);
      this._router.navigateByUrl(this._store.sessionUrl);
    }
  }
}
