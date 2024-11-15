import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ACTION_TYPE, ACTION_TYPE_LABEL, ActionType } from '../../../shared/constants/actions.enum';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DEAL_TYPE, DealType } from '../../../shared/constants/deals.enum';

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
  actionTypes: ActionType[];
  ACTION_TYPE_LABEL = ACTION_TYPE_LABEL;

  private _dealType: DealType;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {
    this._dealType = this._activatedRoute.snapshot.data['dealType'];
    this.actionTypes = this._constructActionTypes();
  }

  private _constructActionTypes(): ActionType[] {
    switch (this._dealType) {
      case DEAL_TYPE.STOCKS:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL, ACTION_TYPE.SPLIT, ACTION_TYPE.REVERSE_SPLIT];
      
      case DEAL_TYPE.HOUSING:
      case DEAL_TYPE.BUSINESS:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL, ACTION_TYPE.UPDATE];
      
      default:
        return [ACTION_TYPE.BUY, ACTION_TYPE.SELL];
    }
  }
}
