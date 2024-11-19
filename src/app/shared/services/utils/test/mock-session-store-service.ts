import { SessionStoreService } from '../../stores/session-store.service';
import { of } from 'rxjs';

export class MockSessionStoreService implements Partial<jasmine.SpyObj<SessionStoreService>> {
  setSession = jasmine.createSpy('setSession');
  payday = jasmine.createSpy('payday');
  downsize = jasmine.createSpy('downsize');
  loan = jasmine.createSpy('loan');
  autoLoan = jasmine.createSpy('autoLoan');
  adjustCash = jasmine.createSpy('adjustCash');
  payoffExpense = jasmine.createSpy('payoffExpense');
  addChild = jasmine.createSpy('addChild');
  addAsset = jasmine.createSpy('addAsset');
  sellAsset = jasmine.createSpy('sellAsset');
  updateAssetCashflow = jasmine.createSpy('updateAssetCashflow');
  splitStock = jasmine.createSpy('splitStock');
  reverseSplitStock = jasmine.createSpy('reverseSplitStock');
  select: jasmine.Spy = jasmine.createSpy('select');
  state$ = of(null)

  constructor() {
    this.select.and.returnValue(of(null));
  }
}