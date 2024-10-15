import { Component } from '@angular/core';
import { SellAssetComponent } from "../../assets/sell-asset/sell-asset.component";
import { CommonModule } from '@angular/common';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

@Component({
  selector: 'app-sell-stock',
  standalone: true,
  imports: [SellAssetComponent, CommonModule],
  templateUrl: './sell-stock.component.html',
  styleUrl: './sell-stock.component.scss'
})
export class SellStockComponent {
  private _assetIndex: number;
  public asset$: Observable<AssetItem>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService,
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this.asset$ = this._sessionStore.select(state => state.session.assets[this._assetIndex]);
  }
}
