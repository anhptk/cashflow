import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session, AssetItem, ExpenseItem } from '../../models/database/session.db';
import { SessionService } from '../db/session.service';
import { LOAN_INTEREST, LOAN_STEP } from '../../constants/app.constant';
import { switchMap, tap } from 'rxjs';
import { DEAL_TYPE } from '../../constants/deals.enum';
import { FastTrackSessionService } from '../db/fast-track-session.service';
import { FastTrackSession } from '../../models/database/fast-track-session.db';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor(
    private sessionService: SessionService,
    private fastTrackService: FastTrackSessionService
  ) {
    super();
  }

  public get sessionUrl(): string {
    return `/sessions/${this.get(state => state.session.id)}`;
  }

  public setSession(session: Session, fastTrack?: FastTrackSession): void {
    this.setState({
      session: session,
      profession: session.profession,
      fastTrack,
      isFastTrackView: !!session.fastTrackId,
      incomeLiabilities: this._incomeLiabilities(session),
      expenseLiabilities: this._expenseLiabilities(session),
      totalIncome: this._calculateIncome(session),
      totalExpenses: this._calculateExpenses(session),
      cashflow: this._calculateCashflow(session)
    });
  }

  public setFastTrackSession(session: Session, fastTrack: FastTrackSession): void {
    this.setState({
      session: session,
      profession: session.profession,
      fastTrack,
      isFastTrackView: true,
      incomeLiabilities: fastTrack.assets,
      expenseLiabilities: [],
      totalIncome: this._calculateIncome(fastTrack),
      totalExpenses: 0,
      cashflow: this._calculateCashflow(fastTrack)
  });
}

  public toggleFastTrackView(isFastTrackView: boolean): void {
    this.patchState({isFastTrackView});
    this._calculateDisplayData(isFastTrackView);
  }

  public createFastTrackSession(): void {
    this.fastTrackService.add(this.get(state => state.session))
    .pipe(switchMap((id) => this.fastTrackService.get(id)))
    .subscribe((session) => {      
      this.patchState({
        fastTrack: session
      });

      this.toggleFastTrackView(true);
    });
  }

  public payday(): void {
    this.adjustCash(this.get(state => state.cashflow));
  }

  public downsize(): void {
    this.adjustCash(-this.get(state => state.totalExpenses));
  }

  public loan(amount: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        expenses: state.session.expenses.filter(x=> x.name !== 'Loans').concat(this._calculateLoan(state.session, amount)),
        cash: state.session.cash += amount
      }

      return {
        session: newSession,
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public autoLoan(expenseAmount: number, next: Function): void {
    const missingAmount = expenseAmount -  this.get(state => state.session.cash);

    if (missingAmount <= 0) {
      next();
      return;
    }

    const loanAmount = Math.ceil(missingAmount/LOAN_STEP)*LOAN_STEP;
    const cashflowReduction = loanAmount*LOAN_INTEREST;

    const cf = confirm($localize`:@@actions.getLoanConfirm: Insufficient cash. Get Loan: Cash +$${loanAmount}. Cashflow -$${cashflowReduction}`);
    if (cf) {
      next();
      this.loan(loanAmount);
    }
  }

  public adjustCash(amount: number): void {
    this.patchState((state: SessionState) => {
      if (state.isFastTrackView) {
        return {fastTrack: this._adjustFastTrackCash(amount, state.fastTrack)};
      } else {
        return {session: this._adjustSessionCash(amount, state.session)};
      }
    });

    this._updateSessionDb(this.select(state => state.session));
    this._updateFastTrackDb(this.select(state => state.fastTrack));
  }

  public payoffExpense(expense: ExpenseItem): void {
    this.patchState((state: SessionState) => {
      if (expense.value > state.session.cash) {
        alert($localize`:@@actions.payoffExpenseFailed:Insufficient cash. Can not pay off.`);
        return state;
      }

      const newSession = {
        ...state.session,
        expenses: state.session.expenses.filter(x => x.name !== expense.name),
        cash: state.session.cash -= expense.value
      }

      return {
        session: newSession,
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public addAsset(asset: AssetItem): void {
    const payment = asset.downPayment ?? asset.value;

    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.concat(asset),
        cash: state.session.cash -= payment
      }

      return {
        session: newSession,
        incomeLiabilities: this._incomeLiabilities(newSession),
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalIncome: this._calculateIncome(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public addFastTrackAsset(asset: AssetItem): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.fastTrack,
        assets: state.fastTrack.assets.concat(asset),
        cash: state.fastTrack.cash -= asset.value
      }

      return {
        fastTrack: newSession,
        incomeLiabilities: this._incomeLiabilities(newSession),
        totalIncome: this._calculateIncome(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateFastTrackDb(this.select(state => state.fastTrack));
  }

  public sellAsset(assetIndex: number, sellAtPrice: number): void {
    this.patchState((state: SessionState) => {
      const asset = state.session.assets[assetIndex];

      let profit = sellAtPrice;
      if (asset.downPayment > 0) {
        profit += asset.downPayment - asset.value;
      }

      const newSession = {
        ...state.session,
        assets: state.session.assets.filter((_, index) => index !== assetIndex),
        cash: state.session.cash += profit
      }

      return {
        session: newSession,
        incomeLiabilities: this._incomeLiabilities(newSession),
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalIncome: this._calculateIncome(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  private _adjustSessionCash(amount: number, session: Session): Session {
    return {...session, cash: session.cash += amount};
  }

  private _adjustFastTrackCash(amount: number, fastTrack: FastTrackSession): FastTrackSession {
    return {...fastTrack, cash: fastTrack.cash += amount};
  }

  public updateAssetCashflow(assetIndex: number, cashflow: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.map((asset, index) => {
          if (index === assetIndex) {
            return {...asset, cashflow: cashflow};
          }
          return asset;
        })
      }

      return {
        session: newSession,
        incomeLiabilities: this._incomeLiabilities(newSession),
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalIncome: this._calculateIncome(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public splitStock(stockName: string, splitRatio: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.map(asset => {
          if (asset.name === stockName && asset.assetType === DEAL_TYPE.STOCKS) {
            const volume = Math.ceil(asset.volume * splitRatio);
            return {
              ...asset, 
              volume,
              unitPrice: +(asset.value / volume).toFixed(2)
            };
          }
          return asset;
        })
      }

      return {
        session: newSession
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public reverseSplitStock(stockName: string, splitRatio: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.map(asset => {
          if (asset.name === stockName && asset.assetType === DEAL_TYPE.STOCKS) {
            const volume = Math.ceil(asset.volume / splitRatio);
            return {
              ...asset, 
              volume,
              unitPrice: +(asset.value / volume).toFixed(2)
            };
          }
          return asset;
        })
      }

      return {
        session: newSession
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public addChild(): void {
    this.patchState((state: SessionState) => {
      const newSession = {...state.session, children: state.session.children += 1};
      return {
        session: newSession,
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  private _incomeLiabilities(session: Session | FastTrackSession): AssetItem[] {
    if (!session) return [];
    return session.assets.filter(asset => asset.isLiability);
  }

  private _expenseLiabilities(session: Session): ExpenseItem[] {
    if (!session) return [];
    return session.expenses.filter(expense => expense.isLiability);
  }

  private _calculateIncome(session: Session | FastTrackSession): number {
    if (!session) return 0;

    if (session instanceof Session) {
      const liabilities = this._incomeLiabilities(session).filter(item => item.cashflow > 0);
      const totalLiabilities = liabilities.reduce((acc, liability) => acc + liability.cashflow, 0);

      return session.income.reduce((acc, income) => acc + income.cashflow, totalLiabilities);
    } else {
      const assets = session.assets.filter(asset => asset.cashflow > 0);
      return assets.reduce((acc, asset) => acc + asset.cashflow, 0);
    }
  }

  private _calculateExpenses(session: Session): number {
    if (!session) return 0;

    const childSupport = session.profession.expenses.childSupport * session.children;

    return session.expenses.reduce((acc, expense) => acc + expense.cashflow, childSupport);
  }

  private _calculateCashflow(session: Session | FastTrackSession): number {
    if (!session) return 0;

    if (session instanceof Session) {
      return session.profession.income.salary + this._calculateIncome(session) - this._calculateExpenses(session);
    } else {
      return session.startCashflow + this._calculateIncome(session);
    }
  }

  private _calculateLoan(session: Session, amount: number): ExpenseItem {
    const loan = session.expenses.find(expense => expense.name === 'Loans');
    if (!loan) {
      return {
        name: 'Loans',
        cashflow: amount * LOAN_INTEREST,
        value: amount,
        isLiability: true
      };
    }
    return {
      ...loan,
      cashflow: loan.cashflow + amount * LOAN_INTEREST,
      value: loan.value + amount
    };
  }

  private _calculateDisplayData(isFastTrackView: boolean): void {
    if (isFastTrackView) {
      this.patchState({
        incomeLiabilities: this.get(state => state.fastTrack.assets),
        expenseLiabilities: [],
        totalIncome: this._calculateIncome(this.get(state => state.fastTrack)),
        totalExpenses: 0,
        cashflow: this._calculateCashflow(this.get(state => state.fastTrack))
      })
    } else {
      const session = this.get(state => state.session);
      this.patchState({
        incomeLiabilities: this._incomeLiabilities(session),
        expenseLiabilities: this._expenseLiabilities(session),
        totalIncome: this._calculateIncome(session),
        totalExpenses: this._calculateExpenses(session),
        cashflow: this._calculateCashflow(session)
      });
    }
  }

  private _updateSessionDb = this.effect<Session>(session$ => {
    return session$.pipe(
      tap((session:Session) => {
        this.sessionService.update(session);
      })
    );
  });

  private _updateFastTrackDb = this.effect<FastTrackSession>(session$ => {
    return session$.pipe(
      tap((session:FastTrackSession) => {
        this.fastTrackService.update(session);
      })
    );
  });
}
