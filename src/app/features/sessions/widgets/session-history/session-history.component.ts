import { Component } from '@angular/core';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { SessionLog } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-history.component.html',
  styleUrl: './session-history.component.scss'
})
export class SessionHistoryComponent {
  public readonly DATE_FORMAT = 'dd/MM HH:mm:ss';
  
  sessionLogs$: Observable<SessionLog[]>;

  constructor(
    private sessionStore: SessionStoreService
  ) {
    this.sessionLogs$ = this.sessionStore.select(s => s.logs);
  }
}
