import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

@Component({
  selector: 'app-session-cash-adjustment',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DividerComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './session-cash-adjustment.component.html',
  styleUrl: './session-cash-adjustment.component.scss'
})
export class SessionCashAdjustmentComponent {
  cash$: Observable<number>;
  cashAmountControl: FormControl<number> = new FormControl(null);

  constructor(
    private _store: SessionStoreService,
    private _location: Location
  ) {
    this.cash$ = this._store.select(state => state.session.cash);
  }

  public submit(): void {
    const amount = this.cashAmountControl.value || 0;
    const cf = confirm($localize`:@@confirmCashAdjustment: Are you sure you want to adjust the cash by ${amount}?`);
    if (cf) {
      this._store.adjustCash(amount);
      alert($localize`:@@cashAdjustmentSuccess: Cash adjustment successful.`);
      this._location.back();
    }
  }
}
