import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { Session } from "../models/database/cashflow.db";
import { from, map, mergeMap, Observable, of } from "rxjs";
import { ProfessionService } from "./profession.service";

@Injectable({
    providedIn: "root"
})

export class SessionService {
    constructor(
        private indexedDbService: IndexedDbService,
        private professionService: ProfessionService
    ) {}

    public add(professionId: number): Observable<number> {
        const session: Omit<Session, 'id' | 'profession'> = {
            professionId,
            type: 'ratRace',
            logs: []
        };

        return from(this.indexedDbService.addData("sessions", session));
    }

    public get(id: number): Observable<Session> {
        const session$ = from(this.indexedDbService.getData("sessions", id)) as Observable<Session>;

        return session$.pipe(
            mergeMap(session => {
                if (!session) {
                    return of(null);
                }

                return this.professionService.get(session.professionId).pipe(
                    map(profession => {
                        session.profession = profession;
                        return session;
                    })
                );
            })
        );
        
    }

    public query(): Observable<Session[]> {
        return from(this.indexedDbService.getAllData("sessions")) as Observable<Session[]>;
    }

    public update(session: Session): Observable<number> {
        return from(this.indexedDbService.updateData("sessions", session));
    }

    public delete(id: number): Observable<void> {
        return from(this.indexedDbService.deleteData("sessions", id));
    }
}