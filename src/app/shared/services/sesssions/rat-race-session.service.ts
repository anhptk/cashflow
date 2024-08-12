import { Injectable } from "@angular/core";
import { Session } from "../../models/database/cashflow.db";
import { BehaviorSubject } from "rxjs";
import { RatRaceDetails } from "../../models/rat-race-details";
import { SessionService } from "../session.service";

@Injectable()
export class RatRaceSessionService {
    private _session: Session;
    private _data$: BehaviorSubject<RatRaceDetails> = new BehaviorSubject(null);
    
    constructor(
        private _sessionService: SessionService
    ) {}

    public setSession(session: Session): void {
        this._session = session;
        if (!session.ratRace) {
            const data = new RatRaceDetails({
                cash: session.profession.assets.savings
            });

            this.updateData(data);
        } else {
            this._data$.next(new RatRaceDetails(session.ratRace));
        }
    }

    get data$() {
        return this._data$.asObservable();
    }

    get currentData(): RatRaceDetails {
        return this._data$.getValue();
    }

    public addChild(): void {
        const ratRaceDetails = this.currentData;

        if (ratRaceDetails.numberOfChildren < 3) {
            ratRaceDetails.numberOfChildren++;
            ratRaceDetails.totalAdditionalExpenses += this._session.profession.expenses.childSupport;

            this.updateData(ratRaceDetails);
        } else {
            alert('You already reach the maximum number of children (3).');
        }
    }

    public updateData(data: RatRaceDetails): void {
        this._data$.next(data);
        this._session.ratRace = data;
        this._sessionService.update(this._session);
    }
}