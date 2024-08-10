interface SessionIncome {
    name: string;
    assetReference?: number;
    cashflow: number;
}

export class RatRaceDetails {
    numberOfChildren: number;
    cash: number;
    incomes: SessionIncome[];

    constructor(data?: Partial<RatRaceDetails>) {
        this.numberOfChildren = data?.numberOfChildren || 0;
        this.cash = data?.cash || 0;
        this.incomes = data?.incomes || [];
    }

    public addChild() {
        if (this.numberOfChildren < 3) {
            this.numberOfChildren++;
        } else {
            alert('You already reach the maximum number of children (3).');
        }
    }
}