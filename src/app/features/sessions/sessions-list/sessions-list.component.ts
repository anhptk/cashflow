import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { NgForOf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Session } from '../../../shared/models/database/session.db';
import { SessionService } from '../../../shared/services/db/session.service';

@Component({
  selector: 'app-sessions-list',
  standalone: true,
  imports: [
    ButtonComponent,
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.scss'
})
export class SessionsListComponent {
  sessions: Session[] = [];

  constructor(
    private _sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this._loadSessions();
  }

  private _loadSessions(): void {
    this._sessionService.query().subscribe(sessions => {
      this.sessions = sessions;
    });
  }
}
