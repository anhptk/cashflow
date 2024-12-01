import { Component, input } from '@angular/core';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { AssetItem, ExpenseItem } from '../../../../shared/models/database/session.db';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-liabilities',
  standalone: true,
  imports: [],
  templateUrl: './session-liabilities.component.html',
  styleUrl: './session-liabilities.component.scss'
})
export class SessionLiabilitiesComponent {
  expenseLiabilities = input.required<ExpenseItem[]>();
  incomeLiabilities = input.required<AssetItem[]>();

}
