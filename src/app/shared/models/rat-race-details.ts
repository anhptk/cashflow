interface SessionIncome {
    name: string;
    assetId?: number;
    cashflow: number;
}

interface SessionExpense {
    name: string;
    cashflow: number;
}

export class RatRaceDetails {
    professionName: string;
    salary: number;
    
    numberOfChildren: number = 0;
    cash: number = 0;
    passiveIncome: SessionIncome[] = [];
    additionalExpenses: SessionExpense[] = [];
    totalPassiveIncome: number = 0;
    totalAdditionalExpenses: number = 0;

    constructor(data?: Partial<RatRaceDetails>) {
        Object.assign(this, data);
    }
}