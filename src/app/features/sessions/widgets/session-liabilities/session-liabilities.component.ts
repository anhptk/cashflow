import { Component, input } from '@angular/core';
import { AssetItem, ExpenseItem } from '../../../../shared/models/database/session.db';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-session-liabilities',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './session-liabilities.component.html',
  styleUrl: './session-liabilities.component.scss'
})
export class SessionLiabilitiesComponent {
  expenseLiabilities = input.required<ExpenseItem[]>();
  assets = input.required<AssetItem[]>();

}
