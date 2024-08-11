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
    numberOfChildren: number;
    cash: number;
    passiveIncome: SessionIncome[] = [];
    additionalExpenses: SessionExpense[] = [];

    constructor(data?: Partial<RatRaceDetails>) {
        this.numberOfChildren = data?.numberOfChildren || 0;
        this.cash = data?.cash || 0;
    }

    public addChild() {
        if (this.numberOfChildren < 3) {
            this.numberOfChildren++;
        } else {
            alert('You already reach the maximum number of children (3).');
        }
    }

    public get totalPassiveIncome(): number {
        return this.passiveIncome.reduce((total, income) => total + income.cashflow, 0);
    }

    public get totalAdditionalExpenses(): number {
        return this.additionalExpenses.reduce((total, expense) => total + expense.cashflow, 0);
    }
    
}