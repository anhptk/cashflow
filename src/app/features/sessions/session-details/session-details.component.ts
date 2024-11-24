import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Observable, withLatestFrom } from 'rxjs';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { CommonModule, Location } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { SessionHeaderComponent } from '../widgets/session-header/session-header.component';
import { SessionExpensesComponent } from '../widgets/session-expenses/session-expenses.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SessionService } from '../../../shared/services/db/session.service';
import { SessionAssetsComponent } from '../widgets/session-assets/session-assets.component';
import { FAST_TRACK_WIN_CASHFLOW } from '../../../shared/constants/app.constant';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RouterModule,
    SessionHeaderComponent,
    SessionExpensesComponent,
    SessionAssetsComponent,
    ButtonComponent,
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {

  readonly FAST_TRACK_WIN_CASHFLOW = FAST_TRACK_WIN_CASHFLOW;
  data$: Observable<SessionState>;
  isFastTrack$: Observable<boolean>;
  sessionId: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _sessionService: SessionService,
    private _location: Location,
    private _route: ActivatedRoute
  ) {
    this.data$ = this._sessionStore.state$;
    this.isFastTrack$ = this._sessionStore.select(state => state.isFastTrackView);
    this.sessionId = +_route.snapshot.params['sessionId'];
  }

  ngOnInit(): void {
    this._subscribeToIncomeChange();
  }

  public delete(): void {
    const cf = confirm($localize`:@@confirmDeleteSession:Do you really want to delete this session?`);
    if (cf) {
      this._sessionService.delete(this.sessionId).subscribe(() => {
        this._location.back();
      });
    }
  }

  private _subscribeToIncomeChange(): void {
    this._sessionStore.select(state => state.totalIncome)
      .pipe(withLatestFrom(this._sessionStore.select(state => state.session)))
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
    const isWon = income >= this._sessionStore.state().totalExpenses;

    if (isWon) {
      alert($localize`:@@ratRaceWon:Congratulations! You have completed the Rat Race. You will now enter the Fast Track!`);

      this._sessionStore.createFastTrackSession();
    }
  }
}
