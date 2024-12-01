import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SessionCashSummaryComponent } from "../../../sessions/widgets/session-cash-summary/session-cash-summary.component";
import { DividerComponent } from "../../../../shared/ui/divider/divider.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { DEAL_TYPE, DealType } from '../../../../shared/constants/deals.enum';

class AssetFormViewModel {
  public price: FormControl<number>;
  public volume?: FormControl<number>;
}

@Component({
  selector: 'app-sell-asset',
  standalone: true,
  imports: [SessionCashSummaryComponent, DividerComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './sell-asset.component.html',
  styleUrl: './sell-asset.component.scss'
})
export class SellAssetComponent implements OnChanges {
  private _assetIndex: number;
  public mainForm: FormGroup<AssetFormViewModel>;

  @Input() assetType: DealType;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService,
    private _router: Router
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.mainForm = new FormGroup({
      price: new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.assetType.currentValue) {
      this._setupVolumeForm();
    }
  }

  public sell() {
    if (this.mainForm.controls.price.invalid) {
      alert($localize`:@@invalidPrice:Please enter a valid price.`);
      return;
    }

    let priceValue = this.mainForm.controls.price.value;
    let totalValue = priceValue;

    if (this.mainForm.controls.volume) {
      totalValue *= this.mainForm.controls.volume.value;
    }
    
    const cf = confirm($localize`:@@sellAssetConfirm:Are you sure you want to sell asset at $${totalValue}?`);
    if (cf) {
      this._sessionStore.sellAsset(this._assetIndex, priceValue, this.mainForm.controls.volume?.value ?? 1);
      this._router.navigateByUrl(this._sessionStore.sessionUrl);
    }
  }

  private _setupVolumeForm(): void {
    if (this.assetType !== DEAL_TYPE.STOCKS) return;

    this.mainForm.addControl('volume', new FormControl(null, [Validators.required, Validators.min(0)]));
  }
}
