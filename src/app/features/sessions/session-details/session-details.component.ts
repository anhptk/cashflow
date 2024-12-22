import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { Observable } from 'rxjs';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';
import { SessionHeaderComponent } from '../widgets/session-header/session-header.component';
import { SessionExpensesComponent } from '../widgets/session-expenses/session-expenses.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { SessionService } from '../../../shared/services/db/session.service';
import { SessionAssetsComponent } from '../widgets/session-assets/session-assets.component';
import { FAST_TRACK_WIN_CASHFLOW } from '../../../shared/constants/app.constant';
import { SessionIncomesComponent } from "../widgets/session-incomes/session-incomes.component";
import { SessionLiabilitiesComponent } from "../widgets/session-liabilities/session-liabilities.component";

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    RouterModule,
    SessionHeaderComponent,
    SessionExpensesComponent,
    SessionAssetsComponent,
    ButtonComponent,
    SessionIncomesComponent,
    SessionLiabilitiesComponent
],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {

  readonly FAST_TRACK_WIN_CASHFLOW = FAST_TRACK_WIN_CASHFLOW;
  data$: Observable<SessionState>;
  isFastTrack$: Observable<boolean>;
  sessionId: number;

  constructor(
    private _sessionStore: SessionStoreService,
    private _sessionService: SessionService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.data$ = this._sessionStore.state$;
    this.isFastTrack$ = this._sessionStore.select(state => state.isFastTrackView);
    this.sessionId = +this._route.snapshot.params['sessionId'];
  }

  public delete(): void {
    const cf = confirm($localize`:@@confirmDeleteSession:Do you really want to delete this session?`);
    if (cf) {
      this._sessionService.delete(this.sessionId).subscribe(() => {
        this._router.navigate(['/sessions']);
      });
    }
  }

}
