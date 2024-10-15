import { Component } from '@angular/core';
import { SellAssetComponent } from "../../assets/sell-asset/sell-asset.component";
import { CommonModule } from '@angular/common';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sell-land',
  standalone: true,
  imports: [SellAssetComponent, CommonModule],
  templateUrl: './sell-land.component.html',
  styleUrl: './sell-land.component.scss'
})
export class SellLandComponent {
  private _assetIndex: number;

  public asset$: Observable<AssetItem>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    this.asset$ = this._sessionStore.select(state => state.session.assets[this._assetIndex]);
  }
}
