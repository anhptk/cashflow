import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ACTION_TYPE, ACTION_TYPE_LABEL, ActionType } from '../../../shared/constants/actions.enum';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DEAL_TYPE, DealType } from '../../../shared/constants/deals.enum';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-action-types-select',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    RouterModule
  ],
  templateUrl: './action-types-select.component.html',
  styleUrl: './action-types-select.component.scss'
})
export class ActionTypesSelectComponent {
  public actionTypes: ActionType[];
  public readonly ACTION_TYPE_LABEL = ACTION_TYPE_LABEL;

  private _dealType: DealType;
  private readonly _assetIndex: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sessionStore: SessionStoreService
  ) {
    this._assetIndex = +this._activatedRoute.snapshot.params['assetIndex'];
    
    this._setupActions();
  }

  private _setupActions(): void {
    this._sessionStore.select(state => state.isFastTrackView)
      .pipe(takeUntilDestroyed())
      .subscribe(isFastTrackView => {
        if (isFastTrackView) {
          this.actionTypes = [ACTION_TYPE.SELL];
        } else {
          this._setupSessionActions();
        }
      });
  }

  private _setupSessionActions(): void {
    if (isNaN(this._assetIndex)) {
      this._dealType = this._activatedRoute.snapshot.data['dealType'];
      this.actionTypes = this._constructActionTypes();
    } else {
      this._sessionStore.select(state => state.session.assets[this._assetIndex])
        .pipe(takeUntilDestroyed())
        .subscribe(asset => {
          this._dealType = asset.assetType;
          this.actionTypes = this._constructActionTypes().filter(action => action !== ACTION_TYPE.BUY);
        });
    }
  }

  private _constructActionTypes(): ActionType[] {
    switch (this._dealType) {
      case DEAL_TYPE.STOCKS:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL, ACTION_TYPE.SPLIT, ACTION_TYPE.REVERSE_SPLIT];
      
      case DEAL_TYPE.HOUSING:
      case DEAL_TYPE.BUSINESS:
      case DEAL_TYPE.LAND:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL, ACTION_TYPE.UPDATE];
      
      default:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL];
    }
  }
}
