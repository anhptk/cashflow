import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { DividerComponent } from "../../../../shared/ui/divider/divider.component";
import { SessionCashSummaryComponent } from "../../../sessions/widgets/session-cash-summary/session-cash-summary.component";
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';
import { BuyStocksForm } from '../../../../shared/models/forms/stocks-form';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-buy-gold',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    DividerComponent,
    SessionCashSummaryComponent
],
  templateUrl: './buy-gold.component.html',
  styleUrl: './buy-gold.component.scss'
})
export class BuyGoldComponent {
  totalCost = signal(0);

  mainForm: FormGroup<Omit<BuyStocksForm, 'assetName'>>;

  constructor(
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) {
    this.mainForm = this._constructForm();
    this._calculateTotalCost();
  }

  private _constructForm() {
    return new FormGroup({
      unitPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }
  
  private _calculateTotalCost(): void {
    this.mainForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.totalCost.set(value.unitPrice * value.quantity || 0);
      });
  }

  submit() {
    if (!this.mainForm.valid) {
      alert($localize`:@@pleaseFillOutAllRequiredFields:Please fill out all required fields`);
      return;
    }

    const cf = confirm($localize`:@@buyGoldConfirm:Are you sure you want to buy Gold? Cash -$${this.totalCost}.`);
    if (!cf) return;

    const newAsset: AssetItem = {
      name: $localize`:@@gold:Gold`,
      cashflow: 0,
      value: this.totalCost(),
      downPayment: 0,
      volume: this.mainForm.value.quantity,
      unitPrice: this.mainForm.value.unitPrice,
      assetType: DEAL_TYPE.GOLD
    }

    this._sessionStore.autoLoan(this.totalCost(), () => {
      this._sessionStore.addAsset(newAsset);
      this._router.navigateByUrl(this._sessionStore.sessionUrl);
    });
  }
}
