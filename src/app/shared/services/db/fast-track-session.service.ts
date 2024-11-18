import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { from, map, Observable } from "rxjs";
import { Session } from '../../models/database/session.db';
import { FastTrackSession } from "../../models/database/fast-track-session.db";
import { DatabaseTable } from "../../constants/database-table.enum";
import { FAST_TRACK_START_RATE } from "../../constants/app.constant";

@Injectable({
    providedIn: "root"
})

export class FastTrackSessionService {
    private readonly dbTableName: DatabaseTable = "fastTrackSessions";

    constructor(
        private indexedDbService: IndexedDbService
    ) { }

    public add(session: Session): Observable<number> {
        const fastTrack = this._constructNewFastTrack(session);

        return from(this.indexedDbService.addData(this.dbTableName, fastTrack));
    }

    private _constructNewFastTrack(session: Session): Partial<FastTrackSession> {
        return {
            sessionId: session.id,
            createdAt: new Date(),
            startCashflow: FAST_TRACK_START_RATE * session.assets.reduce((acc, asset) => acc + asset.cashflow, 0)
        }
    }

    public get(id: number): Observable<FastTrackSession> {
        return from(this.indexedDbService.getData(this.dbTableName, id))
            .pipe(map((session: FastTrackSession) => new FastTrackSession(session)));
    }

    public update(session: FastTrackSession): Observable<number> {
        return from(this.indexedDbService.updateData(this.dbTableName, session));
    }

    public delete(id: number): Observable<void> {
        return from(this.indexedDbService.deleteData(this.dbTableName, id));
    }
}