import { Component, input } from '@angular/core';
import { Profession } from '../../../../shared/models/database/cashflow.db';
import { AssetItem } from '../../../../shared/models/database/session.db';

@Component({
  selector: 'app-session-incomes',
  standalone: true,
  imports: [],
  templateUrl: './session-incomes.component.html',
  styleUrl: './session-incomes.component.scss'
})
export class SessionIncomesComponent {
  profession = input.required<Profession>();
  incomeLiabilities = input.required<AssetItem[]>();
}
