import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Observable } from 'rxjs';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { CommonModule, Location } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { SessionHeaderComponent } from '../widgets/session-header/session-header.component';
import { SessionExpensesComponent } from '../widgets/session-expenses/session-expenses.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SessionService } from '../../../shared/services/db/session.service';
@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RouterModule,
    SessionHeaderComponent,
    SessionExpensesComponent,
    ButtonComponent,
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {

  data$: Observable<SessionState>;
  sessionId: number;

  constructor(
    private sessionStore: SessionStoreService,
    private sessionService: SessionService,
    private _location: Location,
    private route: ActivatedRoute
  ) {
    this.data$ = this.sessionStore.state$;
    this.sessionId = +route.snapshot.params['sessionId'];
  }

  public delete(): void {
    const cf = confirm($localize`:@@confirmDeleteSession:Do you really want to delete this session?`);
    if (cf) {
      this.sessionService.delete(this.sessionId).subscribe(() => {
        this._location.back();
      });
    }
  }

}
