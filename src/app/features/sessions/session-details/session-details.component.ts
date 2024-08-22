import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Observable } from 'rxjs';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { SessionHeaderComponent } from '../widgets/session-header/session-header.component';
import { SessionExpensesComponent } from '../widgets/session-expenses/session-expenses.component';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RouterModule,
    SessionHeaderComponent,
    SessionExpensesComponent
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {

  data$: Observable<SessionState>;

  constructor(
    private sessionStore: SessionStoreService,
  ) {
    this.data$ = this.sessionStore.data$;
  }
}
