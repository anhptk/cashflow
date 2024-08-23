import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

@Component({
  selector: 'app-session-doodads',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DividerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './session-doodads.component.html',
  styleUrl: './session-doodads.component.scss'
})
export class SessionDoodadsComponent {
  cash$: Observable<number>;
  cashflow$: Observable<number>;

  amountControl: FormControl<number>;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
    this.cash$ = this._sessionStore.select(state => state.session.cash);
    this.cashflow$ = this._sessionStore.select(state => state.cashflow);
    this.amountControl = new FormControl(null, [Validators.required, Validators.min(0)]);
  }

  public submit(): void {
    const amount = this.amountControl.value;

    if (!this.amountControl.valid) return;

    const cf = confirm($localize`:@@actions.doodadsConfirm: Cash -$${amount}`);
    if (cf) {
      this._sessionStore.autoLoan(amount, () => {
        this._sessionStore.adjustCash(-amount);
        this._location.back();
      });
    }
  }
}
