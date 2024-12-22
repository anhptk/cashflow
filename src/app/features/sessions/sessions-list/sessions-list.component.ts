import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
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
    RouterLink,
    DatePipe
  ],
  templateUrl: './sessions-list.component.html',
  styleUrl: './sessions-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionsListComponent implements OnInit {
  sessions = signal<Session[]>([])

  constructor(
    private _sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this._loadSessions();
  }

  private _loadSessions(): void {
    this._sessionService.query().subscribe(sessions => {
      sessions.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
      this.sessions.set(sessions);
    });
  }
}
