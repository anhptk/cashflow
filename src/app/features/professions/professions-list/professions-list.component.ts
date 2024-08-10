import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Profession } from '../../../shared/models/database/cashflow.db';
import { ProfessionService } from '../../../shared/services/profession.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-professions-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent
  ],
  templateUrl: './professions-list.component.html',
  styleUrl: './professions-list.component.scss'
})
export class ProfessionsListComponent {
  public professions: Profession[] = [];

  constructor(
    private _professionService: ProfessionService
  ) {
  }
  
  public ngOnInit(): void {
    this._loadProfessions();
  }

  private _loadProfessions(): void {
    this._professionService.query().subscribe(professions => {
      this.professions = professions;
    });
  }
}
