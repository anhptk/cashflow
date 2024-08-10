import { DBSchema } from "idb";

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

export interface Profession {
    id?: number;
    name: string;
}

export interface Session {
    id: number;
    professionId: number;
    date: string;
}