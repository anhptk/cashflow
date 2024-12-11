import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { SessionService } from '../../../shared/services/db/session.service';
import { provideComponentStore } from '@ngrx/component-store';
import { FastTrackSessionService } from '../../../shared/services/db/fast-track-session.service';
import { Session } from '../../../shared/models/database/session.db';
import { filter, withLatestFrom } from 'rxjs';
import { FAST_TRACK_WIN_CASHFLOW } from '../../../shared/constants/app.constant';
import { SessionLogService } from '../../../shared/services/db/session-log.service';

@Component({
  selector: 'app-session-details-wrapper',
  standalone: true,
  imports: [RouterModule],
  providers: [provideComponentStore(SessionStoreService)],
  templateUrl: './session-details-wrapper.component.html',
  styleUrl: './session-details-wrapper.component.scss'
})
export class SessionDetailsWrapperComponent {
  private _sessionId: number;

  constructor(
    private sessionService: SessionService,
    private fastTrackService: FastTrackSessionService,
    private sessionStore: SessionStoreService,
    private sessionLogService: SessionLogService,
    private route: ActivatedRoute
  ) {
    this._sessionId = +this.route.snapshot.params['sessionId'];
  }

  ngOnInit() {
    this._loadSession();
    this._subscribeToIncomeChange();
  }

  private _loadSession(): void {
    if (!this._sessionId || isNaN(this._sessionId)) {
      return;
    }

    if (this.sessionStore.state()?.session?.id === this._sessionId) {
      return;
    }

    this.sessionService.get(this._sessionId)
      .subscribe(session => {
        if (!session.fastTrackId) {
          this.sessionStore.setSession(session);
        } else {
          this._loadFastTrackSession(session);
        }

        this._loadSessionLogs(session.logsDataId);
      });
  }

  private _loadFastTrackSession(session: Session): void {
    this.fastTrackService.get(session.fastTrackId)
      .subscribe(fastTrack => {
        this.sessionStore.setFastTrackSession(session, fastTrack);
      });
  }

  private _loadSessionLogs(logsDataId: number): void {
    this.sessionLogService.get(logsDataId)
      .subscribe(logs => {
        this.sessionStore.setLogs(logs);
      });
  }
  
  private _subscribeToIncomeChange(): void {
    this.sessionStore.select(state => state.totalIncome)
      .pipe(
        withLatestFrom(this.sessionStore.select(state => state.session)),
        filter(([income, _]) => !!income),
      )
      .subscribe(([income, session]) => {
        if (session.fastTrackId) {
          this._checkFastTrackWon(income);
        } else {
          this._checkRatRaceWon(income);
        }
      });
  }
  
  private _checkFastTrackWon(income: number): void {
    const isWon = income >= FAST_TRACK_WIN_CASHFLOW;

    if (isWon) {
      alert($localize`:@@fastTrackWon:Congratulations! You have completed the Fast Track!`);
    }
  }

  private _checkRatRaceWon(income: number): void {
    const isWon = income >= this.sessionStore.state().totalExpenses;

    if (isWon) {
      alert($localize`:@@ratRaceWon:Congratulations! You have completed the Rat Race. You will now enter the Fast Track!`);

      this.sessionStore.createFastTrackSession();
    }
  }
}
