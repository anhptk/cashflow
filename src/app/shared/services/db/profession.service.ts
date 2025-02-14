import { Injectable } from "@angular/core";
import { IndexedDbService } from "./indexed-db.service";
import { from, Observable } from "rxjs";
import { Profession } from '../../models/database/cashflow.db';

@Injectable({
    providedIn: "root"
})
export class ProfessionService {
    constructor(
        private indexedDbService: IndexedDbService
    ) {}

    public add(profession: Partial<Profession>): Observable<number> {
        return from(this.indexedDbService.addData("professions", profession));
    }

    public get(id: number): Observable<Profession> {
        return from(this.indexedDbService.getData("professions", id)) as Observable<Profession>;
    }

    public query(): Observable<Profession[]> {
        return from(this.indexedDbService.getAllData("professions")) as Observable<Profession[]>;
    }

    public update(profession: Profession): Observable<number> {
        return from(this.indexedDbService.updateData("professions", profession));
    }

    public delete(id: number): Observable<void> {
        return from(this.indexedDbService.deleteData("professions", id));
    }
}