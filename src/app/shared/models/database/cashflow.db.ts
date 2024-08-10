import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { ProfessionForm } from "../profession-form";
import { SessionType } from "../../constants/session-type.enum";
import { SessionLog } from "../session-details";

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
    profession: Profession;
    type: SessionType;
    logs: SessionLog[];
}