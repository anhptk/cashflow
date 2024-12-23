import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SellAssetComponent } from "../../assets/sell-asset/sell-asset.component";

@Component({
  selector: 'app-sell-house',
  standalone: true,
  imports: [
    CommonModule,
    SellAssetComponent
],
  templateUrl: './sell-house.component.html',
  styleUrl: './sell-house.component.scss'
})
export class SellHouseComponent {
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
