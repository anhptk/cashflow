import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from '../../../../shared/models/database/session.db';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

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

  constructor(
    private _sessionStore: SessionStoreService
  ) {
    this.session$ = this._sessionStore.select(state => state.session);
  }
}
