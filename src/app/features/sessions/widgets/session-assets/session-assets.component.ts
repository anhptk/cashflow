import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { CommonModule } from '@angular/common';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-session-assets',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './session-assets.component.html',
  styleUrl: './session-assets.component.scss'
})
export class SessionAssetsComponent {
  assets$: Observable<AssetItem[]>;

  DEAL_TYPE = DEAL_TYPE;

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.assets$ = this._sessionStore.select(state => state.session.assets);
  }
}
