import { Component } from '@angular/core';
import { SellAssetComponent } from "../../assets/sell-asset/sell-asset.component";
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

@Component({
  selector: 'app-sell-business',
  standalone: true,
  imports: [
    CommonModule,
    SellAssetComponent
  ],
  templateUrl: './sell-business.component.html',
  styleUrl: './sell-business.component.scss'
})
export class SellBusinessComponent {
  private _assetIndex: number;

  public asset$: Observable<AssetItem>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    
    this.asset$ = this._sessionStore.select(state => state.isFastTrackView)
    .pipe(
      switchMap(isFastTrack => this._selectAssetItem(isFastTrack)),
    );
  }

  private _selectAssetItem(isFastTrack: boolean): Observable<AssetItem> {
    if (isFastTrack) {
      return this._sessionStore.select(state => state.fastTrack.assets[this._assetIndex]);
    } else {
      return this._sessionStore.select(state => state.session.assets[this._assetIndex]);
    }
  }
}
