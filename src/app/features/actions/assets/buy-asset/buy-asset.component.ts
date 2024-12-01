import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { BuyAssetForm } from '../../../../shared/models/forms/asset-form';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { filter, Observable } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { HOUSE_TYPE_LABEL } from '../../../../shared/constants/houses.enum';
import { DEAL_TYPE, DealType } from '../../../../shared/constants/deals.enum';
import { Router } from '@angular/router';

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
export class BuyAssetComponent implements OnInit {
  readonly DealType = DEAL_TYPE;

  @Input({required: true}) assetType: DealType;
  @Input({required: true}) nameControl: FormControl<string>;

  mainForm: FormGroup<BuyAssetForm>;

  public totalPayment: number;
  public mortgage: number;

  public isFastTrackAction$: Observable<boolean>;

  constructor(
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) {
    this.isFastTrackAction$ = this._sessionStore.select(state => state.isFastTrackView);
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
      downPayment: formValue.downPayment || 0,
      cashflow: formValue.cashFlow || 0,
      isLiability: formValue.cost - formValue.downPayment != 0,
      assetType: this.assetType
    }

    const cf = confirm(this._constructBuyAssetConfirmMessage());

    if (cf) {
      this._sessionStore.autoLoan(newAsset.downPayment, () => {
        this._sessionStore.addAsset(newAsset);
        this._router.navigateByUrl(this._sessionStore.sessionUrl);
      });
    }
  }

  public submitFastTrack() {
    const formValue = this.mainForm.value;

    const newAsset: AssetItem = {
      name: formValue.assetName,
      value: formValue.cost,
      downPayment: 0,
      cashflow: formValue.cashFlow || 0,
      assetType: this.assetType
    }

    const cf = confirm(this._constructBuyAssetConfirmMessage());

    if (cf) {
      if (newAsset.value > this._sessionStore.state().fastTrack.cash) {
        alert($localize`:@@notEnoughCash:You do not have enough cash to buy this asset.`);
        return;
      }

      this._sessionStore.addFastTrackAsset(newAsset);
      this._router.navigateByUrl(this._sessionStore.sessionUrl);
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
