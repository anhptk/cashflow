import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { Profession } from '../../../shared/models/database/cashflow.db';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfessionService } from '../../../shared/services/db/profession.service';

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
export class ProfessionsListComponent implements OnInit {
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
