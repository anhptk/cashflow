import { Profession } from '../database/cashflow.db';
import { Session, AssetItem, ExpenseItem } from '../database/session.db';

export interface SessionState {
  totalIncome: number;
  totalExpenses: number;
  cashflow: number;

  expenseLiabilities: ExpenseItem[];
  incomeLiabilities: AssetItem[];

  profession: Profession;
  session: Session;
}