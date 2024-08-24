export const ACTION_TYPE = {
    BUY: 'BUY',
    SELL: 'SELL',
    UPDATE: 'UPDATE',
    SPLIT: 'SPLIT',
    REVERSE_SPLIT: 'REVERSE_SPLIT',
} as const;

export type ActionType = typeof ACTION_TYPE[keyof typeof ACTION_TYPE];

export const ACTION_TYPE_LABEL = {
    [ACTION_TYPE.BUY]: {label: $localize`:@@buy:Buy`, color: 'green', link: 'buy'},
    [ACTION_TYPE.SELL]: {label: $localize`:@@sell:Sell`, color: 'red', link: 'sell'},
    [ACTION_TYPE.UPDATE]: {label: $localize`:@@update:Update`, color: 'blue', link: 'update'},
    [ACTION_TYPE.SPLIT]: {label: $localize`:@@split:Split`, color: 'green', link: 'split'},
    [ACTION_TYPE.REVERSE_SPLIT]: {label: $localize`:@@reverseSplit:Reverse Split`, color: 'red', link: 'reverse-split'}
} as const;
