import { DealType } from '../../constants/deals.enum';
import { SessionLogType } from '../../constants/session-log.enum';
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
  logType: SessionLogType;
  data: SessionLogData;
  createdAt: Date;
}

export interface SessionLogData {
  cash?: number;
  cashflow?: number;
  assetName?: string;
  assetType?: DealType;
  assetVolume?: number;
}

export class Session {
  id: number;
  profession: Profession;
  logsDataId?: number;
  fastTrackId?: number;

  cash: number;
  children = 0;

  income: FinancialItem[] = [];
  expenses: ExpenseItem[] = [];
  assets: AssetItem[] = [];

  createdAt: Date;

  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }
}
