import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { SessionService } from '../../../shared/services/db/session.service';
import { provideComponentStore } from '@ngrx/component-store';

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

    this.sessionService.get(this._sessionId)
      .subscribe(session => {
        this.sessionStore.setSession(session);
      });
  }
}
