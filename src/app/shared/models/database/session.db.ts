import { Profession } from './cashflow.db';

interface FinancialItem {
  name: string;
  amount: number;
}

interface AssetItem {
  name: string;
  value: number;
  downPayment?: number;
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
  income: FinancialItem[] = [];
  expenses: FinancialItem[] = [];
  assets: AssetItem[] = [];
  liabilities: FinancialItem[] = [];

  createdAt: Date;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}