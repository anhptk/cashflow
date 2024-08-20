import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session, AssetItem, ExpenseItem } from '../../models/database/session.db';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor() {
    super(null);
  }

  readonly data$ = this.select({
    profession: this.select(state => state.profession),
    session: this.select(state => state.session),
    totalIncome: this.select(state => state.totalIncome),
    totalExpenses: this.select(state => state.totalExpenses),
    cashflow: this.select(state => state.cashflow),
    expenseLiabilities: this.select(state => state.expenseLiabilities),
    incomeLiabilities: this.select(state => state.incomeLiabilities)
  });

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
      return {
        session: {...state.session, cash: state.session.cash += state.cashflow}
      }
    })
  }

  public adjustCash(amount: number): void {
    this.patchState((state: SessionState) => {
      return {
        session: {...state.session, cash: state.session.cash += amount}
      }
    });
  }

  public addChild(): void {
    this.patchState((state: SessionState) => {
      return {
        session: {...state.session, children: state.session.children += 1},
        totalExpenses: this._calculateExpenses(state.session),
        cashflow: this._calculateCashflow(state.session)
      }
    });
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
}
