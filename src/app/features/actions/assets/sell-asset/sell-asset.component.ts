import { Component } from '@angular/core';
import { SessionCashSummaryComponent } from "../../../sessions/widgets/session-cash-summary/session-cash-summary.component";
import { DividerComponent } from "../../../../shared/ui/divider/divider.component";
import { ButtonComponent } from "../../../../shared/ui/button/button.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sell-asset',
  standalone: true,
  imports: [SessionCashSummaryComponent, DividerComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './sell-asset.component.html',
  styleUrl: './sell-asset.component.scss'
})
export class SellAssetComponent {
  private _assetIndex: number;
  public priceControl: FormControl<number>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this.priceControl = new FormControl<number>(null, [Validators.required, Validators.min(0)]);
  }

  public sell() {
    if (this.priceControl.invalid) {
      alert($localize`:@@invalidPrice:Please enter a valid price.`);
      return;
    }

    const cf = confirm($localize`:@@sellAssetConfirm:Are you sure you want to sell asset at $${this.priceControl.value}?`);
    if (cf) {
      this._sessionStore.sellAsset(this._assetIndex, this.priceControl.value);
      this._location.historyGo(-5); // move back to the main session page
    }
  }
}
