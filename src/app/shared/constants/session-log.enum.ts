export const SESSION_LOG_TYPE = {
    Payday: 'Payday',
    Downsize: 'Downsize',
    Loan: 'Loan',
    CashAdjustment: 'CashAdjustment',
    Payoff: 'Payoff',
    BuyAsset: 'BuyAsset',
    SellAsset: 'SellAsset',
    UpdateAsset: 'UpdateAsset',
    SplitStock: 'SplitStock',
    ReverseSplitStock: 'ReverseSplitStock',
    NewBaby: 'NewBaby',
    Doodads: 'Doodads',
    Charity: 'Charity',
    LoseCash: 'LoseCash',
    
} as const;

export type SessionLogType = typeof SESSION_LOG_TYPE[keyof typeof SESSION_LOG_TYPE];