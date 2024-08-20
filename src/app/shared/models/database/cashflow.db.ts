import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { ProfessionForm } from "../profession-form";
import { Session } from './session.db';

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
    createdAt: Date;
}
