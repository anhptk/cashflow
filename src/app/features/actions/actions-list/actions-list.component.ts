import { Component } from '@angular/core';
import { SessionService } from '../../../shared/services/db/session.service';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Location } from '@angular/common';
import { MAX_CHILDREN } from '../../../shared/constants/app.constant';

@Component({
  selector: 'app-actions-list',
  standalone: true,
  imports: [],
  templateUrl: './actions-list.component.html',
  styleUrl: './actions-list.component.scss'
})
export class ActionsListComponent {
  data: SessionState;

  constructor(
    private _sessionService: SessionService,
    private _sessionStore: SessionStoreService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._sessionStore.data$.subscribe((data) => {
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
      // TODO: Add load if cash is less than total expenses
      this._sessionStore.downsize();
      this._location.back();
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
}
