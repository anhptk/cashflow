import { DealType } from '../../constants/deals.enum';
import { Profession } from './cashflow.db';

export interface FinancialItem {
  name: string;
  cashflow: number;
}

export interface ExpenseItem extends FinancialItem {
  value?: number;
  isLiability?: boolean;
}

export interface AssetItem extends FinancialItem {
  value: number;
  downPayment?: number;
  volume?: number;
  unitPrice?: number;
  isLiability?: boolean;
  assetType?: DealType;
}

export interface SessionLog {
  id: number;
  sessionId: number;
  message: string;
  createdAt: Date;
}

export class Session {
  id: number;
  profession: Profession;
  logs: SessionLog[] = [];
  fastTrackId?: number;

  cash: number;
  children: number;

  income: FinancialItem[] = [];
  expenses: ExpenseItem[] = [];
  assets: AssetItem[] = [];

  createdAt: Date;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}
