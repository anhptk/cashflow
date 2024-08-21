import { Component } from '@angular/core';
import { SessionService } from '../../../shared/services/db/session.service';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Location } from '@angular/common';

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
    const cf = confirm($localize`:@@paydayMessage:Payday: Cash + $${this.data.cashflow}`);
    if (cf) {
      this._sessionStore.payday();
    }
  }
}