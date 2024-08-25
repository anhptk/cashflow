import { Component } from '@angular/core';
import { AssetItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-select-house',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './select-house.component.html',
  styleUrl: './select-house.component.scss'
})
export class SelectHouseComponent {
  public HouseType = DEAL_TYPE.HOUSING;

  public assets$: Observable<AssetItem[]>;

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.assets$ = this._sessionStore.select(state => state.session.assets);
  }
}
