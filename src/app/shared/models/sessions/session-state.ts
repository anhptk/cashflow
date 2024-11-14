import { Profession } from '../database/cashflow.db';
import { FastTrackSession } from '../database/fast-track-session.db';
import { Session, AssetItem, ExpenseItem } from '../database/session.db';

export interface SessionState {
  totalIncome: number;
  totalExpenses: number;
  cashflow: number;
  isFastTrackView?: boolean;

  expenseLiabilities: ExpenseItem[];
  incomeLiabilities: AssetItem[];

  profession: Profession;
  session: Session;
  fastTrack?: FastTrackSession;
}