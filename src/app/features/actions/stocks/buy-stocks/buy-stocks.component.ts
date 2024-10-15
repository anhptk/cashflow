import { Component } from '@angular/core';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuyStocksForm } from '../../../../shared/models/forms/stocks-form';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { CommonModule, Location } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem } from '../../../../shared/models/database/session.db';

@Component({
  selector: 'app-buy-stocks',
  standalone: true,
  imports: [
    SessionCashSummaryComponent,
    ReactiveFormsModule,
    DividerComponent,
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './buy-stocks.component.html',
  styleUrl: './buy-stocks.component.scss'
})
export class BuyStocksComponent {
  mainForm: FormGroup<BuyStocksForm>;

  totalCost: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
    this.mainForm = this._constructForm();
    this._calculateTotalCost();
  }

  private _constructForm(): FormGroup<BuyStocksForm> {
    return new FormGroup(<BuyStocksForm>{
      assetName: new FormControl<string>('', [Validators.required]),
      unitPrice: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl<number>(null, [Validators.required, Validators.min(1)]),
      interRestOrDividend: new FormControl<number>(null)
    });
  }

  private _calculateTotalCost(): void {
    this.mainForm.valueChanges.subscribe((value) => {
      this.totalCost = value.unitPrice * value.quantity || 0;
    });
  }
  
  public submit(): void {
    if (!this.mainForm.valid) {
      alert($localize`:@@pleaseFillOutAllRequiredFields:Please fill out all required fields`);
      return;
    }

    const cf = confirm($localize`:@@buyStockConfirm:Are you sure you want to buy this stock?`);
    if (!cf) return;

    const newAsset: AssetItem = {
      name: this.mainForm.value.assetName,
      cashflow: 0,
      value: this.totalCost,
      downPayment: 0,
      volume: this.mainForm.value.quantity,
      unitPrice: this.mainForm.value.unitPrice,
      assetType: 'STOCKS'
    }

    this._sessionStore.autoLoan(this.totalCost, () => {
      this._sessionStore.addAsset(newAsset);
      this._location.back();
    });
  }
}
