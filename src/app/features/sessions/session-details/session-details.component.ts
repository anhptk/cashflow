import { Component } from '@angular/core';
import { RatRaceSession } from '../../../shared/models/session-details';
import { SessionService } from '../../../shared/services/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {
  session?: RatRaceSession;

  private _sessionId: number;

  constructor(
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) {
    this._sessionId = this.route.snapshot.params['sessionId'];
  }
  
  ngOnInit() {
    this._loadSession();
  }

  private _loadSession(): void {
    if (!this._sessionId || isNaN(Number(this._sessionId))) {
      return;
    }

    this.sessionService.get(Number(this._sessionId))
      .subscribe(session => {
        this.session = new RatRaceSession(session);
      });
  }
}
