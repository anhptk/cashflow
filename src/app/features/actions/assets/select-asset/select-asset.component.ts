import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { DealType } from '../../../../shared/constants/deals.enum';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-asset',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './select-asset.component.html',
  styleUrl: './select-asset.component.scss'
})
export class SelectAssetComponent {
  @Input({required: true}) assetType: DealType;
  public assets$: Observable<AssetItem[]>;

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.assets$ = this._sessionStore.select(state => state.session.assets);
  }
}
