import { Profession } from '../database/cashflow.db';
import { Session, AssetItem } from '../database/session.db';

export interface SessionState {
  totalIncome: number;
  totalExpenses: number;
  cashflow: number;

  expenseLiabilities: AssetItem[];
  incomeLiabilities: AssetItem[];

  profession: Profession;
  session: Session;
}