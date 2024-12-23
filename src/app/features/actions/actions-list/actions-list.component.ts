import { Component } from '@angular/core';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { AsyncPipe, Location } from '@angular/common';
import { FAST_TRACK_CHARITY_AMOUNT, MAX_CHILDREN, RAT_RACE_CHARITY_RATE } from '../../../shared/constants/app.constant';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { SESSION_LOG_TYPE } from '../../../shared/constants/session-log.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  public data: SessionState;
  public isFastTrackView$: Observable<boolean>;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location,
    private _router: Router
  ) {
    this.isFastTrackView$ = this._sessionStore.select(state => state.isFastTrackView);
    this._setupData();
  }

  private _setupData(): void {
    this._sessionStore.state$
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
      this.data = data;
    });
  }

  public payday(): void {
    const cf = confirm($localize`:@@actions.paydayConfirm:Payday: Cash +$${this.data.cashflow}`);
    if (cf) {
      this._sessionStore.payday();
      this._location.back();
    }
  }

  public downsize(): void {
    const cf = confirm($localize`:@@actions.downsizeConfirm:Downsize: Cash -$${this.data.totalExpenses}`);
    if (cf) {
      this._sessionStore.autoLoan(
        this.data.totalExpenses,
        () => {
        this._sessionStore.downsize();
        this._location.back();
      });
    }
  }

  public addChild(): void {
    const maxChildrenReached = this.data.session.children >= MAX_CHILDREN;

    if (maxChildrenReached) {
      alert($localize`:@@actions.maxChildrenReached:You have reached the maximum number of children (${MAX_CHILDREN}).`);
      return;
    }

    const cf = confirm($localize`:@@actions.addBabyConfirm:Add Baby: Cashflow -$${this.data.profession.expenses.childSupport}`);
    if (cf) {
      this._sessionStore.addChild();
      this._location.back();
    }
  }

  public doCharity(): void {
    const charityAmount = (this.data.cashflow + this.data.totalExpenses) * RAT_RACE_CHARITY_RATE;
    if (this.data.session.cash < charityAmount) {
      alert($localize`:@@actions.canNotDonate:Insufficient cash. Can not donate.`);
      return;
    }

    const cf = confirm($localize`:@@actions.doCharityConfirm:Donate: Cash -$${charityAmount}`);
    if (cf) {
      this._sessionStore.adjustCash(-charityAmount, SESSION_LOG_TYPE.Charity);
      this._location.back();
    }
  }

  public doFastTrackCharity(): void {
    if (this.data.fastTrack.cash < FAST_TRACK_CHARITY_AMOUNT) {
      alert($localize`:@@actions.canNotDonate:Insufficient cash. Can not donate.`);
      return;
    }

    const cf = confirm($localize`:@@actions.doCharityConfirm:Donate: Cash -$${FAST_TRACK_CHARITY_AMOUNT}`);
    if (cf) {
      this._sessionStore.adjustCash(-FAST_TRACK_CHARITY_AMOUNT, SESSION_LOG_TYPE.Charity);
      this._location.back();
    }
  }

  public loseAllCash(): void {
    const lostCash = this.data.fastTrack.cash;
    const cf = confirm($localize`:@@actions.loseAllCashConfirm:Lose All Cash: Cash -$${lostCash}`);
    if (cf) {
      this._sessionStore.adjustCash(-lostCash, SESSION_LOG_TYPE.LoseCash);
      this._location.back();
    }
  }

  public loseHalfCash(): void {
    const lostCash = Math.round(this.data.fastTrack.cash / 2);

    const cf = confirm($localize`:@@actions.loseHalfCashConfirm:Lose Half Cash: Cash -$${lostCash}`);
    if (cf) {
      this._sessionStore.adjustCash(-lostCash, SESSION_LOG_TYPE.LoseCash);
      this._location.back();
    }
  }

  public switchRatRace(): void {
    this._sessionStore.toggleFastTrackView(false);
    this._router.navigateByUrl(this._sessionStore.sessionUrl);
  }
}
