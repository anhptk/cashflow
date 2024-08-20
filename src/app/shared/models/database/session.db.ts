import { Profession } from './cashflow.db';

export interface FinancialItem {
  name: string;
  cashflow: number;
}

export interface AssetItem {
  name: string;
  value: number;
  downPayment?: number;
  cashflow: number;
  volume?: number;
  unitPrice?: number;
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
  expenses: FinancialItem[] = [];
  assets: AssetItem[] = [];
  liabilities: AssetItem[] = [];

  createdAt: Date;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}