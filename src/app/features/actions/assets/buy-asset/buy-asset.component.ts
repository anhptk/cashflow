import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { Location, CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { BuyAssetForm } from '../../../../shared/models/forms/asset-form';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { filter } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { HOUSE_TYPE_LABEL } from '../../../../shared/constants/houses.enum';
import { DEAL_TYPE, DealType } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-buy-asset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    DividerComponent,
    SessionCashSummaryComponent
  ],
  templateUrl: './buy-asset.component.html',
  styleUrl: './buy-asset.component.scss'
})
export class BuyAssetComponent {
  readonly DealType = DEAL_TYPE;

  @Input({required: true}) assetType: DealType;
  @Input({required: true}) nameControl: FormControl<string>;

  mainForm: FormGroup<BuyAssetForm>;

  public totalPayment: number;
  public mortgage: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
  }

  ngOnInit() {
    this.mainForm = this._buildForm();
    this._subscribeToFormChanges();
  }

  private _buildForm(): FormGroup<BuyAssetForm> {
    return new FormGroup<BuyAssetForm>({
      assetName: this.nameControl,
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
      name: this.assetType === DEAL_TYPE.HOUSING ? HOUSE_TYPE_LABEL[formValue.assetName] : formValue.assetName,
      value: formValue.cost,
      downPayment: formValue.downPayment,
      cashflow: formValue.cashFlow,
      isLiability: true,
      assetType: this.assetType
    }

    const cf = confirm(this._constructBuyAssetConfirmMessage());

    if (cf) {
      this._sessionStore.autoLoan(newAsset.downPayment, () => {
        this._sessionStore.addAsset(newAsset);
        this._location.historyGo(-4);
      })
    }
  }

  private _constructBuyAssetConfirmMessage(): string {
    switch (this.assetType) {
      case 'HOUSING':
        return $localize`:@@confirmBuyHouse:Are you sure you want to buy this house?`;

      case 'BUSINESS':
        return $localize`:@@confirmBuyBusiness:Are you sure you want to buy this business?`;

      case 'LAND':
        return $localize`:@@confirmBuyLand:Are you sure you want to buy this land?`;

      default:
        return '';
    }
  }
}
