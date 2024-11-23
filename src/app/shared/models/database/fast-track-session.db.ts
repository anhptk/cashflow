import { AssetItem, SessionLog } from "./session.db";

export class FastTrackSession {
    id: number;
    sessionId: number;
    logs: SessionLog[] = [];
    cash: number = 0;
    assets: AssetItem[] = [];
    createdAt: Date;
    startCashflow: number;

    constructor(session?: Partial<FastTrackSession>) {
        Object.assign(this, session);
    }
}