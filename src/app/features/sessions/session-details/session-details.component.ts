import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { SessionService } from '../../../shared/services/db/session.service';
import { Observable } from 'rxjs';
import { SessionState } from '../../../shared/models/sessions/session-state';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/ui/progress-bar/progress-bar.component';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent
  ],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
  providers: [SessionStoreService]
})
export class SessionDetailsComponent {

  session$: Observable<SessionState>;

  private _sessionId: number;

  constructor(
    private sessionService: SessionService,
    private sessionStore: SessionStoreService,
    private route: ActivatedRoute
  ) {
    this._sessionId = Number(this.route.snapshot.params['sessionId']);
    this.session$ = this.sessionStore.data$;
  }


  ngOnInit() {
    this._loadSession();
  }

  private _loadSession(): void {
    if (!this._sessionId || isNaN(this._sessionId)) {
      return;
    }

    this.sessionService.get(this._sessionId)
      .subscribe(session => {
        this.sessionStore.setSession(session);
      });
  }
}
