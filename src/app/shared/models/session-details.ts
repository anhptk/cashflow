import { SessionType } from "../constants/session-type.enum";
import { Profession, Session } from "./database/cashflow.db";
import { RatRaceDetails } from "./rat-race-details";


export class RatRaceSession implements Session {
    id: number;
    professionId: number;
    profession: Profession;
    type: SessionType;
    logs: SessionLog[];

    data: RatRaceDetails;
    
    constructor(data: Session) {
        this.id = data.id;
        this.professionId = data.professionId;
        this.profession = data.profession;
        this.type = data.type;
        this.logs = data.logs;

        this.data = new RatRaceDetails();
    }

    public payDay() {
        this.data.cash += this.monthlyCashFlow;
    }

    public get monthlyCashFlow(): number {
        return this._calculateMonthlyCashFlow();
    }

    private _calculateMonthlyCashFlow(): number {
        return this.profession.income.salary + this.data.totalPassiveIncome - this._calculateTotalExpenses();
    }

    private _calculateTotalExpenses(): number {
        return this._calculateProfessionExpenses() + this._calculateSessionExpenses();
    }

    private _calculateSessionExpenses(): number {
        return this.data.numberOfChildren * this.profession.expenses.childSupport + this.data.totalAdditionalExpenses;
    }

    private _calculateProfessionExpenses(): number {
        let totalExpenses = 0;
        for (const key in this.profession.expenses) {
            totalExpenses += this.profession.expenses[key] || 0;
        }

        return totalExpenses;
    }
}