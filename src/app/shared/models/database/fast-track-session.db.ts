import { FinancialItem, SessionLog } from "./session.db";

export class FastTrackSession {
    id: number;
    sessionId: number;
    logs: SessionLog[] = [];
    cash: number = 0;
    income: FinancialItem[] = [];
    createdAt: Date;
    startCashflow: number;

    constructor(session?: Partial<FastTrackSession>) {
        Object.assign(this, session);
    }
}