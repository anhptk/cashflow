import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ACTION_TYPE, ActionType } from '../../../../shared/constants/actions.enum';
import { DEAL_TYPE, DealType } from '../../../../shared/constants/deals.enum';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { SellStockComponent } from "../../stocks/sell-stock/sell-stock.component";
import { SellBusinessComponent } from "../../businesses/sell-business/sell-business.component";
import { SellGoldComponent } from "../../gold/sell-gold/sell-gold.component";
import { SellHouseComponent } from "../../houses/sell-house/sell-house.component";
import { SellLandComponent } from "../../lands/sell-land/sell-land.component";
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { filter, switchMap, Observable } from 'rxjs';
import { SplitStockComponent } from "../../stocks/split-stock/split-stock.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AssetItem } from '../../../../shared/models/database/session.db';

@Component({
  selector: 'app-quick-asset-action',
  standalone: true,
  imports: [SellStockComponent, SellBusinessComponent, SellGoldComponent, SellHouseComponent, SellLandComponent, UpdateAssetComponent, SplitStockComponent],
  templateUrl: './quick-asset-action.component.html',
  styleUrl: './quick-asset-action.component.scss'
})
export class QuickAssetActionComponent {
  public readonly ActionType = ACTION_TYPE;
  public readonly AssetType = DEAL_TYPE;

  public actionType: ActionType;
  public assetType: DealType;
  private _assetIndex: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sessionStore: SessionStoreService
  ) {
    this.actionType = this.activatedRoute.snapshot.data['actionType'];
    this._assetIndex = +this.activatedRoute.snapshot.params['assetIndex'];
    
    this._setupAssetType();
  }

  private _setupAssetType() {
    this.sessionStore.select(state => state.isFastTrackView)
    .pipe(
      switchMap(isFastTrack => this._selectAssetItem(isFastTrack)),
      filter(Boolean),
      takeUntilDestroyed()
    ).subscribe(asset => {
        this.assetType = asset.assetType;
    });
  }

  private _selectAssetItem(isFastTrack: boolean): Observable<AssetItem> {
    if (isFastTrack) {
      return this.sessionStore.select(state => state.fastTrack.assets[this._assetIndex]);
    } else {
      return this.sessionStore.select(state => state.session.assets[this._assetIndex]);
    }
  }
}
