import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionCashSummaryComponent } from '../../../sessions/widgets/session-cash-summary/session-cash-summary.component';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-sell-house',
  standalone: true,
  imports: [
    CommonModule,
    SessionCashSummaryComponent,
    DividerComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './sell-house.component.html',
  styleUrl: './sell-house.component.scss'
})
export class SellHouseComponent {
  private _assetIndex: number;

  public asset$: Observable<AssetItem>;

  public priceControl: FormControl<number>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this.asset$ = this._sessionStore.select(state => state.session.assets[this._assetIndex]);
    this.priceControl = new FormControl<number>(null, [Validators.required, Validators.min(0)]);
  }

  public sellHouse() {
    if (this.priceControl.invalid) {
      alert($localize`:@@invalidPrice:Please enter a valid price.`);
      return;
    }

    const cf = confirm($localize`:@@sellHouseConfirm:Are you sure you want to sell this house?`);
    if (cf) {
      this._sessionStore.sellAsset(this._assetIndex, this.priceControl.value);
    }
  }
}
