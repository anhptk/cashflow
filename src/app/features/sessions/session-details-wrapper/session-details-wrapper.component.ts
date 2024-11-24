import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { SessionService } from '../../../shared/services/db/session.service';
import { provideComponentStore } from '@ngrx/component-store';
import { FastTrackSessionService } from '../../../shared/services/db/fast-track-session.service';
import { Session } from '../../../shared/models/database/session.db';

@Component({
  selector: 'app-session-details-wrapper',
  standalone: true,
  imports: [RouterModule],
  providers: [provideComponentStore(SessionStoreService)],
  templateUrl: './session-details-wrapper.component.html',
  styleUrl: './session-details-wrapper.component.scss'
})
export class SessionDetailsWrapperComponent {
  private _sessionId: number;

  constructor(
    private sessionService: SessionService,
    private fastTrackService: FastTrackSessionService,
    private sessionStore: SessionStoreService,
    private route: ActivatedRoute
  ) {
    this._sessionId = Number(this.route.snapshot.params['sessionId']);
  }


  ngOnInit() {
    this._loadSession();
  }

  private _loadSession(): void {
    if (!this._sessionId || isNaN(this._sessionId)) {
      return;
    }

    if (this.sessionStore.state()?.session?.id === this._sessionId) {
      return;
    }

    this.sessionService.get(this._sessionId)
      .subscribe(session => {
        if (!session.fastTrackId) {
          this.sessionStore.setSession(session);
        } else {
          this._loadFastTrackSession(session);
        }
      });
  }

  private _loadFastTrackSession(session: Session): void {
    this.fastTrackService.get(session.fastTrackId)
      .subscribe(fastTrack => {
        this.sessionStore.setFastTrackSession(session, fastTrack);
      });
  }
}
