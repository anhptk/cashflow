import { Component } from '@angular/core';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BuyStocksForm } from '../../../../shared/models/forms/stocks-form';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { STOCK_LABELS, StockOptions, STOCKS } from '../../../../shared/constants/stocks.enum';
import { Router } from '@angular/router';

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
  public mainForm: FormGroup<BuyStocksForm>;
  public totalCost: number;
  public stockOptions = Object.keys(STOCKS) as StockOptions[];
  public stockLabels = STOCK_LABELS;
  public showOtherStockName: boolean;

  constructor(
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) {
    this.mainForm = this._constructForm();
    this._calculateTotalCost();
  }

  private _constructForm(): FormGroup<BuyStocksForm> {
    return new FormGroup(<BuyStocksForm>{
      assetName: new FormControl<string>('', [Validators.required]),
      assetOtherName: new FormControl<string>(''),
      unitPrice: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
      quantity: new FormControl<number>(null, [Validators.required, Validators.min(1)]),
      interRestOrDividend: new FormControl<number>(null)
    });
  }

  private _calculateTotalCost(): void {
    this.mainForm.valueChanges.subscribe((value) => {
      this.totalCost = value.unitPrice * value.quantity || 0;

      this.showOtherStockName = value.assetName === STOCKS.Other;
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
      name: this._getAssetName(),
      cashflow: 0,
      value: this.totalCost,
      downPayment: 0,
      volume: this.mainForm.value.quantity,
      unitPrice: this.mainForm.value.unitPrice,
      assetType: 'STOCKS'
    }

    this._sessionStore.autoLoan(this.totalCost, () => {
      this._sessionStore.addAsset(newAsset);
      this._router.navigateByUrl(this._sessionStore.sessionUrl);
    });
  }

  private _getAssetName(): string {
    if (this.mainForm.value.assetName === STOCKS.Other) {
      return this.mainForm.value.assetOtherName;
    }
    return this.mainForm.value.assetName;
  }
}
