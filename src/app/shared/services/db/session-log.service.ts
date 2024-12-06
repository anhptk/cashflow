import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { SessionLog, SessionLogData } from "../../models/database/session.db";
import { from, Observable } from "rxjs";
import { DatabaseTable } from "../../constants/database-table.enum";
import { SessionLogType } from "../../constants/session-log.enum";
import { SessionLogDb } from "../../models/database/cashflow.db";

@Injectable({
    providedIn: 'root'
})
export class SessionLogService {
    private readonly dbTableName: DatabaseTable = "logs";

    constructor(private indexedDbService: IndexedDbService) { }
    
    public createNewLog(logType: SessionLogType, data: SessionLogData): SessionLog {
        return {
            logType,
            data,
            createdAt: new Date()
        };
    }

    public add(): Observable<number> {
        return from(this.indexedDbService.addData(this.dbTableName, {logs: []}));
    }

    public get(id: number): Observable<SessionLog[]> {
        return from(this.indexedDbService.getData(this.dbTableName, id)
            .then((res: SessionLogDb) => res.logs));
    }

    public update(id: number, logs: SessionLog[]): Observable<number> {
        return from(this.indexedDbService.updateData(this.dbTableName, {id, logs}));
    }
}