import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { ProfessionForm } from "../profession-form";

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
    date: string;
}