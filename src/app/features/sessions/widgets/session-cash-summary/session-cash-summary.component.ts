import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/ui/divider/divider.component';

@Component({
  selector: 'app-session-cash-summary',
  standalone: true,
  imports: [
    CommonModule,
    DividerComponent
  ],
  templateUrl: './session-cash-summary.component.html',
  styleUrl: './session-cash-summary.component.scss'
})
export class SessionCashSummaryComponent {
  cash$: Observable<number>;
  cashflow$: Observable<number>;

  constructor(
    private _store: SessionStoreService,
  ) {
    this.cashflow$ = this._store.select(state => state.cashflow);
    this.cash$ = this._store.select(state => state.isFastTrackView ? state.fastTrack.cash : state.session.cash);
  }
}
