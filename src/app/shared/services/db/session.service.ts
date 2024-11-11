import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { from, map, Observable } from "rxjs";
import { Session, ExpenseItem } from '../../models/database/session.db';
import { Profession } from '../../models/database/cashflow.db';

@Injectable({
    providedIn: "root"
})

export class SessionService {
    constructor(
        private indexedDbService: IndexedDbService
    ) { }

    public add(profession: Profession): Observable<number> {
        const session = this._constructNewSession(profession);

        return from(this.indexedDbService.addData("sessions", session));
    }

    private _constructNewSession(profession: Profession): Partial<Session> {
        const expenses: ExpenseItem[] = [
            { name: $localize`:@@carLoans:Car loans`, cashflow: profession.expenses.carLoan, value: profession.liabilities.carLoan, isLiability: true },
            { name: $localize`:@@creditCards:Credit cards`, cashflow: profession.expenses.creditCard, value: profession.liabilities.creditCard, isLiability: true },
            { name: $localize`:@@homeMortgage:Home mortgage`, cashflow: profession.expenses.homeMortgage, value: profession.liabilities.homeMortgage, isLiability: true },
            { name: $localize`:@@schoolLoans:School loans`, cashflow: profession.expenses.schoolLoan, value: profession.liabilities.schoolLoan, isLiability: true },
            { name: $localize`:@@otherPayments:Other payments`, cashflow: profession.expenses.other },
            { name: $localize`:@@taxes:Taxes`, cashflow: profession.expenses.taxes },
            { name: $localize`:@@retailDebt:Retail debt`, cashflow: profession.expenses.retail, value: profession.liabilities.retail, isLiability: true }
        ];

        const intialCashflow = profession.income.salary - expenses.map(expense => expense.cashflow).reduce((acc, cashflow) => acc + cashflow);

        return {
            profession,
            expenses,
            cash: profession.assets.savings + intialCashflow,
            children: 0
        };
    }

    public get(id: number): Observable<Session> {
        return from(this.indexedDbService.getData("sessions", id))
            .pipe(map((session: Session) => new Session(session)));
    }

    public query(): Observable<Session[]> {
        return from(this.indexedDbService.getAllData("sessions"))
            .pipe(map((sessions: Session[]) => sessions.map(session => new Session(session))));
    }

    public update(session: Session): Observable<number> {
        return from(this.indexedDbService.updateData("sessions", session));
    }

    public delete(id: number): Observable<void> {
        return from(this.indexedDbService.deleteData("sessions", id));
    }
}