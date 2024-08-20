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
}

export interface SessionLog {
  id: number;
  sessionId: number;
  message: string;
  dateTime: Date;
}

export class Session {
  id: number;
  professionId: number;
  profession: Profession;
  logs: SessionLog[] = [];
  isRatRace: boolean = true;

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