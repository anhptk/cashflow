import { Component } from '@angular/core';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Location } from '@angular/common';
import { MAX_CHILDREN, RAT_RACE_CHARITY_RATE } from '../../../shared/constants/app.constant';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  data: SessionState;

  constructor(
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._sessionStore.state$.subscribe((data) => {
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
    } else {
      const cf = confirm($localize`:@@actions.addBabyConfirm:Add Baby: Cashflow -$${this.data.profession.expenses.childSupport}`);
      if (cf) {
        this._sessionStore.addChild();
        this._location.back();
      }
    }
  }

  public doCharity(): void {
    const charityAmount = (this.data.cashflow + this.data.totalExpenses) * RAT_RACE_CHARITY_RATE;
    if (this.data.session.cash < charityAmount) {
      alert($localize`:@@actions.canNotDonate:Insufficient cash. Can not donate.`);
    } else {
      const cf = confirm($localize`:@@actions.doCharityConfirm:Donate: Cash -$${charityAmount}`);
      if (cf) {
        this._sessionStore.adjustCash(-charityAmount);
        this._location.back();
      }
    }
  }
}
