import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SESSION_LOG_TYPE, SessionLogType } from '../../../../../shared/constants/session-log.enum';

@Component({
  selector: 'app-session-history-type',
  standalone: true,
  imports: [],
  templateUrl: './session-history-type.component.html',
  styleUrl: './session-history-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionHistoryTypeComponent {
  public logType = input.required<SessionLogType>();
  public readonly LogType = SESSION_LOG_TYPE;
}
