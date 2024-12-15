import { Component, input } from '@angular/core';
import { SessionLogData } from '../../../../../shared/models/database/session.db';
import { SESSION_LOG_TYPE, SessionLogType } from '../../../../../shared/constants/session-log.enum';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-session-history-data-display',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './session-history-data-display.component.html',
  styleUrl: './session-history-data-display.component.scss'
})
export class SessionHistoryDataDisplayComponent {
  public readonly LogType = SESSION_LOG_TYPE;
  public logType = input.required<SessionLogType>();
  public data = input.required<SessionLogData>();
}
