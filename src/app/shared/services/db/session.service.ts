import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { from, map, mergeMap, Observable, of } from "rxjs";
import { ProfessionService } from "./profession.service";
import { Session, FinancialItem, AssetItem } from '../../models/database/session.db';
import { Profession } from '../../models/database/cashflow.db';

@Injectable({
    providedIn: "root"
})

export class SessionService {
    constructor(
        private indexedDbService: IndexedDbService,
        private professionService: ProfessionService
    ) {}

    public add(profession: Profession): Observable<number> {
        const session = this._constructNewSession(profession);

        return from(this.indexedDbService.addData("sessions", session));
    }

    private _constructNewSession(profession: Profession): Partial<Session> {
        const expenses: FinancialItem[] = [
            {name: 'Taxes', cashflow: profession.expenses.taxes},
            {name: 'Other payment', cashflow: profession.expenses.other}
        ];

        const liabilities: AssetItem[] = [
            {name: 'Home mortage', cashflow: -profession.expenses.homeMortgage, value: profession.liabilities.homeMortgage},
            {name: 'School loans', cashflow: -profession.expenses.schoolLoan, value: profession.liabilities.schoolLoan},
            {name: 'Car loans', cashflow: -profession.expenses.carLoan, value: profession.liabilities.carLoan},
            {name: 'Credit cards', cashflow: -profession.expenses.creditCard, value: profession.liabilities.creditCard}
        ];

        return {
            professionId: profession.id,
            expenses,
            liabilities,
            cash: profession.assets.savings,
            children: 0
        };
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