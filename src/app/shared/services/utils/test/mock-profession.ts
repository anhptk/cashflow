import { Profession } from '../../../models/database/cashflow.db';

export const mockProfession: Profession = {
  id: 1,
  name: 'Test Profession',
  income: {
    salary: 10000
  },
  expenses: {
    taxes: 1000,
    homeMortgage: 1000,
    other: 2000,
    childSupport: 500
  },
  assets: {
    savings: 5000
  },
  liabilities: {
    homeMortgage: 100000
  },
  createdAt: new Date()
}