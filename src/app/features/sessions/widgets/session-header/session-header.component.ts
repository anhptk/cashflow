import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from '../../../../shared/models/database/session.db';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { FastTrackSession } from '../../../../shared/models/database/fast-track-session.db';

@Component({
  selector: 'app-session-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './session-header.component.html',
  styleUrl: './session-header.component.scss'
})
export class SessionHeaderComponent {
  session$: Observable<Session>;
  fastTrack$: Observable<FastTrackSession>;
  isFastTrackView$: Observable<boolean>;

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.session$ = this._sessionStore.select(state => state.session);
    this.fastTrack$ = this._sessionStore.select(state => state.fastTrack);
    this.isFastTrackView$ = this._sessionStore.select(state => state.isFastTrackView);
  }

  public toggleFastTrackView(isFastTrack: boolean): void {
    this._sessionStore.toggleFastTrackView(isFastTrack);
  }
}
