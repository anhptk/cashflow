import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { SessionCashSummaryComponent } from '../session-cash-summary/session-cash-summary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-doodads',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    SessionCashSummaryComponent
  ],
  templateUrl: './session-doodads.component.html',
  styleUrl: './session-doodads.component.scss'
})
export class SessionDoodadsComponent {

  amountControl: FormControl<number>;

  constructor(
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) {
    this.amountControl = new FormControl(null, [Validators.required, Validators.min(0)]);
  }

  public submit(): void {
    const amount = this.amountControl.value;

    if (!this.amountControl.valid) return;

    const cf = confirm($localize`:@@actions.doodadsConfirm: Cash -$${amount}`);
    if (cf) {
      this._sessionStore.autoLoan(amount, () => {
        this._sessionStore.adjustCash(-amount);
        this._router.navigateByUrl(this._sessionStore.sessionUrl);
      });
    }
  }
}
