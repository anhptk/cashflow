export const DEAL_TYPE = {
    STOCKS: 'STOCKS',
    HOUSING: 'HOUSING',
    LAND: 'LAND',
    BUSINESS: 'BUSINESS',
    GOLD: 'GOLD'
} as const;

export type DealType = typeof DEAL_TYPE[keyof typeof DEAL_TYPE];