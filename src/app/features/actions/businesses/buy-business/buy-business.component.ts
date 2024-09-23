import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { Location, CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { filter } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { BuyAssetForm } from '../../../../shared/models/forms/asset-form';

@Component({
  selector: 'app-buy-business',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    DividerComponent,
    ReactiveFormsModule,
    SessionCashSummaryComponent
  ],
  templateUrl: './buy-business.component.html',
  styleUrl: './buy-business.component.scss'
})
export class BuyBusinessComponent {
  mainForm: FormGroup<BuyAssetForm>;

  public totalPayment: number;
  public mortgage: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
    this.mainForm = this._buildForm();
    this._subscribeToFormChanges();
  }

  private _buildForm(): FormGroup<BuyAssetForm> {
    return new FormGroup<BuyAssetForm>({
      assetName: new FormControl<string>('', [Validators.required]),
      cost: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
      downPayment: new FormControl<number>(null, [Validators.min(0)]),
      cashFlow: new FormControl<number>(null)
    });
  }

  private _subscribeToFormChanges() {
    this.mainForm.valueChanges
      .pipe(filter(() => this.mainForm.valid))
      .subscribe((formValue) => {
        this.totalPayment = formValue.downPayment ?? formValue.cost;
        this.mortgage = formValue.cost - formValue.downPayment;
      });
  }

  public submit() {
    const formValue = this.mainForm.value;
    const newAsset: AssetItem = {
      name: formValue.assetName,
      value: formValue.cost,
      downPayment: formValue.downPayment,
      cashflow: formValue.cashFlow,
      isLiability: formValue.cost > formValue.downPayment,
      assetType: 'BUSINESS'
    }

    const cf = confirm($localize`:@@confirmBuyBusiness:Are you sure you want to buy this business?`);

    if (cf) {
      this._sessionStore.autoLoan(newAsset.downPayment, () => {
        this._sessionStore.addAsset(newAsset);
        this._location.historyGo(-4);
      })
    }
  }
}
