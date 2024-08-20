import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { from, map, mergeMap, Observable, of } from "rxjs";
import { ProfessionService } from "./profession.service";
import { Session } from '../../models/database/session.db';

@Injectable({
    providedIn: "root"
})

export class SessionService {
    constructor(
        private indexedDbService: IndexedDbService,
        private professionService: ProfessionService
    ) {}

    public add(professionId: number): Observable<number> {
        const session = new Session({professionId});

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
                        return new Session({...session, profession});
                    })
                );
            })
        );
        
    }

    public query(): Observable<Session[]> {
        return from(this.indexedDbService.getAllData("sessions"))
          .pipe(map((sessions: Session[]) => sessions.map(session => new Session(session))));
    }

    public update(session: Session): Observable<number> {
        return from(this.indexedDbService.updateData("sessions", session.id, session));
    }

    public delete(id: number): Observable<void> {
        return from(this.indexedDbService.deleteData("sessions", id));
    }
}