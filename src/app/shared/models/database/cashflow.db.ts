import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { ProfessionForm } from "../forms/profession-form";
import { SessionType } from "../../constants/session-type.enum";
import { SessionLog } from "../session-details";
import { RatRaceDetails } from "../rat-race-details";

export interface CashflowDB extends DBSchema {
    professions: {
        key: number;
        value: Profession;
    },
    sessions: {
        key: number;
        value: Session;
    }
}

export interface Profession extends TypedFormValue<FormGroup<ProfessionForm>> {
    id: number;
}

export interface Session {
    id: number;
    professionId: number;
    ratRaceId?: number;
    type: SessionType;
    logs: SessionLog[];

    profession: Profession;
    ratRace?: RatRaceDetails;
}