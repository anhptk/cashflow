import { DBSchema } from "idb";
import { TypedFormValue } from "../typed-fom-value";
import { FormGroup } from "@angular/forms";
import { Session, SessionLog } from './session.db';
import { ProfessionForm } from '../forms/profession-form';
import { FastTrackSession } from "./fast-track-session.db";

export interface CashflowDB extends DBSchema {
    professions: {
        key: number;
        value: Profession;
    },
    sessions: {
        key: number;
        value: Session;
    },
    fastTrackSessions: {
        key: number;
        value: FastTrackSession;
    },
    logs: {
        key: number;
        value: SessionLogDb;
    }
}


export interface SessionLogDb {
  id: number;
  logs: SessionLog[];
}

export interface Profession extends TypedFormValue<FormGroup<ProfessionForm>> {
    id: number;
    createdAt: Date;
}
