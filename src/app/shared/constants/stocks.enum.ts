export const STOCKS = {
  MYT4U: 'MYT4U',
  OK4U: 'OK4U',
  ON2U: 'ON2U',
  GRO4US: 'GRO4US',
  TwoBigPower: 'TwoBigPower',
  CertificateofDeposit: 'Certificate of Deposit',
  Other: 'Other' 
} as const;

export const STOCK_LABELS = {
  MYT4U: 'MYT4U',
  OK4U: 'OK4U',
  ON2U: 'ON2U',
  GRO4US: 'GRO4US',
  TwoBigPower: '2 BigPower',
  CertificateofDeposit: $localize`:@@certificateOfDeposit:Certificate of Deposit`,
  Other: $localize`:@@other:Other`
}

export type StockOptions = typeof STOCKS[keyof typeof STOCKS];
