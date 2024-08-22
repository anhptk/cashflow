import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { Session } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-expenses',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './session-expenses.component.html',
  styleUrl: './session-expenses.component.scss'
})
export class SessionExpensesComponent {
  @Input({required: true}) childSupport: number;

  session$: Observable<Session>;

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.session$ = this._sessionStore.select(state => state.session);
  }
}
