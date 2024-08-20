import { Component } from '@angular/core';
import { Profession } from '../../../shared/models/database/cashflow.db';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateNewProfessionComponent } from '../create-new-profession/create-new-profession.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ProfessionService } from '../../../shared/services/db/profession.service';
import { SessionService } from '../../../shared/services/db/session.service';

@Component({
  selector: 'app-profession-details',
  standalone: true,
  imports: [
    CreateNewProfessionComponent,
    ButtonComponent
  ],
  templateUrl: './profession-details.component.html',
  styleUrl: './profession-details.component.scss'
})
export class ProfessionDetailsComponent {
  public profession?: Profession;

  private _professionId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _professionService: ProfessionService,
    private _sessionService: SessionService,
    private _router: Router
  ) {
    this._professionId = Number(this._activatedRoute.snapshot.params['professionId']);
  }

  ngOnInit(): void {
    this._loadProfession();
  }

  private _loadProfession(): void {
    if (!this._professionId || isNaN(this._professionId)) {
      return;
    }

    this._professionService.get(this._professionId)
      .subscribe(profession => {
        this.profession = profession;
      });
  }

  public createSession(): void {
    if (!this.profession.id) {
      return;
    }

    this._sessionService.add(this.profession.id)
      .subscribe(sessionId => {
        this._router.navigate(['/sessions', sessionId]);
      });
  }
}
