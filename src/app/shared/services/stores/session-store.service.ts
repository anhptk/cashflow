import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session, AssetItem, ExpenseItem } from '../../models/database/session.db';
import { SessionService } from '../db/session.service';
import { LOAN_INTEREST, LOAN_STEP } from '../../constants/app.constant';
import { tap } from 'rxjs';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor(
    private sessionService: SessionService
  ) {
    super();
  }

  public setSession(session: Session): void {
    this.setState({
      session: session,
      profession: session.profession,
      incomeLiabilities: this._incomeLiabilities(session),
      expenseLiabilities: this._expenseLiabilities(session),
      totalIncome: this._calculateIncome(session),
      totalExpenses: this._calculateExpenses(session),
      cashflow: this._calculateCashflow(session)
    });
  }

  public payday(): void {
    this.patchState((state: SessionState) => {
      return this._adjustSessionCash(state.cashflow, state.session);
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  public downsize(): void {
    this.patchState((state: SessionState) => {
      return this._adjustSessionCash(-state.totalExpenses, state.session);
    });

    this._updateSessionDb(this.select(state => state.session));
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
      return this._adjustSessionCash(amount, state.session);
    });

    this._updateSessionDb(this.select(state => state.session));
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
    const payment = asset.assetType === 'HOUSING' ? asset.downPayment : asset.value;

    this.patchState((state: SessionState) => {
      const newSession = {
        ...state.session,
        assets: state.session.assets.concat(asset),
        cash: state.session.cash -= payment
      }

      return {
        session: newSession,
        incomeLiabilities: this._incomeLiabilities(newSession),
        totalIncome: this._calculateIncome(newSession),
        cashflow: this._calculateCashflow(newSession)
      }
    });

    this._updateSessionDb(this.select(state => state.session));
  }

  private _adjustSessionCash(amount: number, session: Session): Session {
    return {...session, cash: session.cash += amount};
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

  private _incomeLiabilities(session: Session): AssetItem[] {
    if (!session) return [];
    return session.assets.filter(asset => asset.isLiability);
  }

  private _expenseLiabilities(session: Session): ExpenseItem[] {
    if (!session) return [];
    return session.expenses.filter(expense => expense.isLiability);
  }

  private _calculateIncome(session: Session): number {
    if (!session) return 0;

    const liabilities = this._incomeLiabilities(session).filter(item => item.cashflow > 0);
    const totalLiabilities = liabilities.reduce((acc, liability) => acc + liability.cashflow, 0);

    return session.income.reduce((acc, income) => acc + income.cashflow, totalLiabilities);
  }

  private _calculateExpenses(session: Session): number {
    if (!session) return 0;

    const childSupport = session.profession.expenses.childSupport * session.children;

    return session.expenses.reduce((acc, expense) => acc + expense.cashflow, childSupport);
  }

  private _calculateCashflow(session: Session): number {
    if (!session) return 0;

    return session.profession.income.salary + this._calculateIncome(session) - this._calculateExpenses(session);
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

  private _updateSessionDb = this.effect<Session>(session$ => {
    return session$.pipe(
      tap((session:Session) => {
        this.sessionService.update(session);
      })
    );
  });
}
