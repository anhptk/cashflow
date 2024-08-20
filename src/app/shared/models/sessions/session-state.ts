import { Profession } from '../database/cashflow.db';
import { Session } from '../database/session.db';

export interface SessionState {
  totalIncome: number;
  totalExpenses: number;
  cashflow: number;

  profession: Profession;
  session: Session;
}