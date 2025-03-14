import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session, AssetItem, ExpenseItem, SessionLog } from '../../models/database/session.db';
import { SessionService } from '../db/session.service';
import { LOAN_INTEREST, LOAN_STEP } from '../../constants/app.constant';
import { switchMap, tap } from 'rxjs';
import { DEAL_TYPE } from '../../constants/deals.enum';
import { FastTrackSessionService } from '../db/fast-track-session.service';
import { FastTrackSession } from '../../models/database/fast-track-session.db';
import { SessionLogService } from '../db/session-log.service';
import { SESSION_LOG_TYPE, SessionLogType } from '../../constants/session-log.enum';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor(
    private sessionService: SessionService,
    private fastTrackService: FastTrackSessionService,
    private sessionLogService: SessionLogService
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
      cashflow: this._calculateCashflow(session),
      logs: []
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public setFastTrackSession(session: Session, fastTrack: FastTrackSession): void {
    session.fastTrackId = fastTrack.id;

    this.setState({
      session: session,
      profession: session.profession,
      fastTrack,
      isFastTrackView: true,
      incomeLiabilities: fastTrack.assets,
      expenseLiabilities: [],
      totalIncome: this._calculateIncome(fastTrack),
      totalExpenses: 0,
      cashflow: this._calculateCashflow(fastTrack),
      logs: []
    });

    this._updateFastTrackDb(this.select(state => state.fastTrack));
  }

  public setLogs(logs: SessionLog[]): void { 
    this.patchState({logs});
    this._updateLogsDb(this.select(state => state.logs));
  }

  public addLog(log: SessionLog): void {
    this.patchState((state: SessionState) => ({
      logs: state.logs.concat(log)
    }));
  }

  public toggleFastTrackView(isFastTrackView: boolean): void {
    this.patchState({isFastTrackView});
    if (isFastTrackView) {
      this.patchState(this._calculateDisplayData(this.get(state => state.fastTrack)));
    } else {
      this.patchState(this._calculateDisplayData(this.get(state => state.session)));
    }
  }

  public createFastTrackSession(): void {
    if (this.get(state => state.session.fastTrackId)) {return;}

    this.fastTrackService.add(this.get(state => state.session))
    .pipe(switchMap((id) => this.fastTrackService.get(id)))
    .subscribe((fastTrack) => {    
      this.setFastTrackSession(this.get(state => state.session), fastTrack);

      this._updateSessionDb(this.select(state => state.session));
    });
  }

  public payday(): void {
    const cashflow = this.get(state => state.cashflow);
    this.adjustCash(cashflow);
    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.Payday, {cash: cashflow}));
  }

  public downsize(): void {
    const expenses = this.get(state => state.totalExpenses);
    this.adjustCash(-expenses);
    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.Downsize, {cash: -expenses}));
  }

  public loan(amount: number): void {
    const loanLabel = $localize`:@@loans:Loans`;
    this.patchState((state: SessionState) => {
      const newSession = new Session({
        ...state.session,
        expenses: state.session.expenses.filter(x => x.name !== loanLabel).concat(this._calculateLoan(state.session, amount)),
        cash: state.session.cash += amount
      });

      return {
        session: newSession,
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.Loan, {cash: amount, cashflow: -amount * LOAN_INTEREST}));
  }

  public autoLoan(expenseAmount: number, next: Function): void {
    const isFastTrack = this.get(state => state.isFastTrackView);
    if (isFastTrack) {
      if (expenseAmount <= this.get(state => state.fastTrack.cash)) {
        next();
      } else {
        alert($localize`:@@insuffientCash: Insufficient cash.`);
      }

      return;
    }
    
    const missingAmount = expenseAmount - this.get(state => state.session.cash);

    if (missingAmount <= 0) {
      next();
      return;
    }

    const loanAmount = Math.ceil(missingAmount / LOAN_STEP) * LOAN_STEP;
    const cashflowReduction = loanAmount * LOAN_INTEREST;

    const cf = confirm($localize`:@@actions.getLoanConfirm: Insufficient cash. Get Loan: Cash +$${loanAmount}. Cashflow -$${cashflowReduction}`);
    if (cf) {
      this.loan(loanAmount);
      next();
    }
  }

  public adjustCash(amount: number, logType?: SessionLogType): void {
    this.patchState((state: SessionState) => {
      if (state.isFastTrackView) {
        return {fastTrack: this._adjustFastTrackCash(amount, state.fastTrack)};
      } else {
        return {session: this._adjustSessionCash(amount, state.session)};
      }
    });

    if (logType) {
      this.addLog(this.sessionLogService.createNewLog(logType, {cash: amount}));
    }
  }

  public payoffExpense(expense: ExpenseItem): void {
    this.patchState((state: SessionState) => {
      if (expense.value > state.session.cash) {
        alert($localize`:@@actions.payoffExpenseFailed:Insufficient cash. Can not pay off.`);
        return state;
      }

      const newSession = new Session({
        ...state.session,
        expenses: state.session.expenses.filter(x => x.name !== expense.name),
        cash: state.session.cash -= expense.value
      });

      return {
        session: newSession,
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.Payoff, {cash: -expense.value, cashflow: expense.cashflow, assetName: expense.name}));
  }
  
  public payoffLoan(amount: number): void {
    const loanLabel = $localize`:@@loans:Loans`;
    const loanItem = this.get(state => state.session.expenses.find(expense => expense.name === loanLabel));
    
    if (!loanItem) {
      return;
    }

    if (amount === loanItem.value) {
      this.payoffExpense(loanItem);
      return;
    }

    const newLoan = {
      ...loanItem,
      cashflow: loanItem.cashflow - amount * LOAN_INTEREST,
      value: loanItem.value - amount
    }

    this.patchState((state: SessionState) => {
      const newSession = new Session({
        ...state.session,
        expenses: state.session.expenses
        .filter(x => x.name !== loanLabel)
        .concat(newLoan),
        cash: state.session.cash -= amount
      });

      return {
        session: newSession,
        expenseLiabilities: this._expenseLiabilities(newSession),
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });
  
    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.Payoff, {cash: -amount, cashflow: amount * LOAN_INTEREST, assetName: 'Loans'}));
  }

  public addAsset(asset: AssetItem): void {
    let payment = asset.downPayment ?? asset.value;

    if (asset.volume) {
      payment = asset.value;
    }

    this.patchState((state: SessionState) => {
      const newSession = new Session({
        ...state.session,
        assets: state.session.assets.concat(asset),
        cash: state.session.cash -= payment
      });

      return {
        session: newSession,
        ...this._calculateDisplayData(newSession)
      }
    });

    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.BuyAsset, {cash: -payment, assetName: asset.name, assetType: asset.assetType, assetVolume: asset.volume, cashflow: asset.cashflow}));
  }

  public addFastTrackAsset(asset: AssetItem): void {
    this.patchState((state: SessionState) => {
      const newSession = new FastTrackSession({
        ...state.fastTrack,
        assets: state.fastTrack.assets.concat(asset),
        cash: state.fastTrack.cash -= asset.value
      });

      return {
        fastTrack: newSession,
        ...this._calculateDisplayData(newSession)
      }
    });

    this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.BuyAsset, {cash: -asset.value, assetName: asset.name, assetType: asset.assetType, cashflow: asset.cashflow}));
  }

  public sellAsset(assetIndex: number, sellAtPrice: number, volume = 1): void {
    const isFastTrack = this.get(state => state.isFastTrackView);
      if (isFastTrack) {
        return this._sellFastTrackAsset(assetIndex, sellAtPrice);
      } else {
        return this._sellSessionAsset(assetIndex, sellAtPrice, volume);
      }
  }

  private _sellFastTrackAsset(assetIndex: number, sellAtPrice: number): void {
    this.patchState((state: SessionState) => {
      const selectedAsset = state.fastTrack.assets[assetIndex];
      this.addLog(
        this.sessionLogService.createNewLog(SESSION_LOG_TYPE.SellAsset, {
          cash: sellAtPrice,
          assetName: selectedAsset.name,
          assetType: selectedAsset.assetType
        })
      );

      const newFastTrack = new FastTrackSession({
        ...state.fastTrack,
        cash: state.fastTrack.cash += sellAtPrice
      });

      newFastTrack.assets = state.fastTrack.assets.filter((_, index) => index !== assetIndex);

      return {
        fastTrack: newFastTrack,
        ...this._calculateDisplayData(newFastTrack)
      }
    });
  }

  private _sellSessionAsset(assetIndex: number, sellAtPrice: number, volume: number): void {
    this.patchState((state: SessionState) => {
      const asset = state.session.assets[assetIndex];

      let profit = sellAtPrice * volume;

      if (asset.assetType === DEAL_TYPE.HOUSING 
        || asset.assetType === DEAL_TYPE.BUSINESS 
        || asset.assetType === DEAL_TYPE.LAND) {
        profit += asset.downPayment - asset.value;
      }

      if (!isNaN(asset.volume)) {
        asset.volume = asset.volume < volume ? 0 : asset.volume - volume;
      }

      this.addLog(
        this.sessionLogService.createNewLog(SESSION_LOG_TYPE.SellAsset, {
          cash: profit,
          assetName: asset.name,
          assetType: asset.assetType,
          assetVolume: volume
        })
      );

      const newSession = new Session({
        ...state.session,
        cash: state.session.cash += profit
      });

      if (asset.volume === 0 || isNaN(asset.volume)) {
        newSession.assets = state.session.assets.filter((_, index) => index !== assetIndex);
      }

      return {
        session: newSession,
        ...this._calculateDisplayData(newSession)
      }
    });
  }

  private _adjustSessionCash(amount: number, session: Session): Session {
    return new Session({...session, cash: session.cash += amount});
  }

  private _adjustFastTrackCash(amount: number, fastTrack: FastTrackSession): FastTrackSession {
    return new FastTrackSession({...fastTrack, cash: fastTrack.cash += amount});
  }

  public updateAssetCashflow(assetIndex: number, cashflow: number): void {
    const isFastTrack = this.get(state => state.isFastTrackView);
    if (isFastTrack) {
      return this._updateFastTrackAssetCashflow(assetIndex, cashflow);
    } else {
      return this._updateSessionAssetCashflow(assetIndex, cashflow);
    }
  }

  private _updateFastTrackAssetCashflow(assetIndex: number, cashflow: number): void {
    this.patchState((state: SessionState) => {
      const newFastTrack = new FastTrackSession({
        ...state.fastTrack,
        assets: state.fastTrack.assets.map((asset, index) => {
          if (index === assetIndex) {
            return { ...asset, cashflow: asset.cashflow + cashflow };
          }
          return asset;
        })
      });

      const asset = newFastTrack.assets[assetIndex];
      this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.UpdateAsset, {assetName: asset.name, assetType: asset.assetType, cashflow}));

      return {
        fastTrack: newFastTrack,
        ...this._calculateDisplayData(newFastTrack)
      }
    });
  }

  private _updateSessionAssetCashflow(assetIndex: number, cashflow: number): void {
    this.patchState((state: SessionState) => {
      const newSession = new Session({
        ...state.session,
        assets: state.session.assets.map((asset, index) => {
          if (index === assetIndex) {
            return { ...asset, cashflow: asset.cashflow + cashflow };
          }
          return asset;
        })
      });

      const asset = newSession.assets[assetIndex];
      this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.UpdateAsset, {assetName: asset.name, assetType: asset.assetType, cashflow}));

      return {
        session: newSession,
        ...this._calculateDisplayData(newSession)
      }
    });
  }

  public splitStock(stockName: string, splitRatio: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.map(asset => {
          if (asset.name === stockName && asset.assetType === DEAL_TYPE.STOCKS) {
            const volume = Math.ceil(asset.volume * splitRatio);
            
            this.addLog(this.sessionLogService.createNewLog(
              SESSION_LOG_TYPE.SplitStock, 
              {assetName: asset.name, assetType: asset.assetType, assetVolume: volume - asset.volume}
            ));

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
        session: new Session(newSession)
      }
    });
  }

  public reverseSplitStock(stockName: string, splitRatio: number): void {
    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.map(asset => {
          if (asset.name === stockName && asset.assetType === DEAL_TYPE.STOCKS) {
            const volume = Math.ceil(asset.volume / splitRatio);

            this.addLog(this.sessionLogService.createNewLog(
              SESSION_LOG_TYPE.ReverseSplitStock, 
              {assetName: asset.name, assetType: asset.assetType, assetVolume: volume - asset.volume}
            ));

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
        session: new Session(newSession)
      }
    });
  }

  public addChild(): void {
    this.patchState((state: SessionState) => {
      const newSession = new Session({ ...state.session, children: state.session.children += 1 });

      this.addLog(this.sessionLogService.createNewLog(SESSION_LOG_TYPE.NewBaby, {cashflow: -state.profession.expenses.childSupport}));
      
      return {
        session: newSession,
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });
  }

  private _incomeLiabilities(session: Session | FastTrackSession): AssetItem[] {
    if (!session) return [];
    return session.assets.filter(asset => asset.cashflow > 0);
  }

  private _expenseLiabilities(session: Session): ExpenseItem[] {
    if (!session) return [];
    return session.expenses.filter(expense => expense.isLiability);
  }

  private _calculateIncome(session: Session | FastTrackSession): number {
    if (!session) return 0;

    if (session instanceof Session) {
      const assets = session.assets.filter(item => item.cashflow > 0);
      const assetsIncome = assets.reduce((acc, liability) => acc + liability.cashflow, 0);

      return session.income.reduce((acc, income) => acc + income.cashflow, assetsIncome);
    } else {
      const assets = session.assets.filter(asset => asset.cashflow > 0);
      return assets.reduce((acc, asset) => acc + asset.cashflow, 0);
    }
  }

  private _calculateExpenses(session: Session): number {
    if (!session) return 0;

    const childSupport = session.profession.expenses.childSupport * (session.children || 0);
    
    const expenseAssetExpenses = session.assets
    .filter(expense => expense.cashflow < 0)
    .reduce((acc, liability) => acc - liability.cashflow, 0);

    return session.expenses.reduce((acc, expense) => acc + expense.cashflow, childSupport + expenseAssetExpenses);
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
    const loanLabel = $localize`:@@loans:Loans`;
    const loan = session.expenses.find(expense => expense.name === loanLabel);
    if (!loan) {
      return {
        name: loanLabel,
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

  private _calculateDisplayData(session: Session | FastTrackSession): Partial<SessionState> {
    if (session instanceof FastTrackSession) {
      return {
        incomeLiabilities: session.assets,
        expenseLiabilities: [],
        totalIncome: this._calculateIncome(session),
        totalExpenses: 0,
        cashflow: this._calculateCashflow(session)
      }
    } else {
      return {
        incomeLiabilities: this._incomeLiabilities(session),
        expenseLiabilities: this._expenseLiabilities(session),
        totalIncome: this._calculateIncome(session),
        totalExpenses: this._calculateExpenses(session),
        cashflow: this._calculateCashflow(session)
      }
    }
  }

  private _updateSessionDb = this.effect<Session>(session$ => {
    return session$.pipe(
      tap((session:Session) => {
        this.sessionService.update({...session});
      })
    );
  });

  private _updateFastTrackDb = this.effect<FastTrackSession>(session$ => {
    return session$.pipe(
      tap((session:FastTrackSession) => {
        this.fastTrackService.update({...session});
      })
    );
  });

  private _updateLogsDb = this.effect<SessionLog[]>(logs$ => {
    return logs$.pipe(
      tap((logs:SessionLog[]) => {
        this.sessionLogService.update(this.get(state => state.session.logsDataId), logs);
      })
    );
  });
}
