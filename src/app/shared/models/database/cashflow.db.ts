import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { Session } from './session.db';
import { ProfessionForm } from '../forms/profession-form';

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
