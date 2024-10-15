import { Component } from '@angular/core';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { ActivatedRoute } from '@angular/router';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SellAssetComponent } from "../../assets/sell-asset/sell-asset.component";

@Component({
  selector: 'app-sell-gold',
  standalone: true,
  imports: [SellAssetComponent, CommonModule],
  templateUrl: './sell-gold.component.html',
  styleUrl: './sell-gold.component.scss'
})
export class SellGoldComponent {
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
