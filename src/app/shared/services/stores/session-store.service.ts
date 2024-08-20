import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session } from '../../models/database/session.db';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor() {
    super({
      profession: null,
      session: null,
      totalIncome: 0,
      totalExpenses: 0,
      cashflow: 0,
      expenseLiabilities: [],
      incomeLiabilities: []
    });
  }

  readonly data$ = this.select({
    profession: this.select(state => state.profession),
    session: this.select(state => state.session),
    totalIncome: this.select(state => this._calculateIncome(state.session)),
    totalExpenses: this.select(state => this._calculateExpenses(state.session)),
    cashflow: this.select(state => this._calculateCashflow(state.session)),
    expenseLiabilities: this.select(state => state.session?.liabilities.filter(liability => liability.cashflow < 0) || []),
    incomeLiabilities: this.select(state => state.session?.liabilities.filter(liability => liability.cashflow > 0) || [])
  });

  public setSession(session: Session): void {
    this.patchState({
      session: session,
      profession: session.profession
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
        session: {...state.session, children: state.session.children += 1}
      }
    });
  }

  private _calculateIncome(session: Session): number {
    if (!session) return 0;

    const liabilities = session.liabilities.filter(liability => liability.cashflow > 0);
    const totalLiabilities = liabilities.reduce((acc, liability) => acc + liability.cashflow, 0);

    return session.income.reduce((acc, income) => acc + income.cashflow, totalLiabilities);
  }

  private _calculateExpenses(session: Session): number {
    if (!session) return 0;

    const childSupport = session.profession.expenses.childSupport * session.children;
    const liabilities = session.liabilities.filter(liability => liability.cashflow < 0);
    const liabilitiesTotal = liabilities.reduce((acc, liability) => acc + liability.cashflow, 0);

    return session.expenses.reduce((acc, expense) => acc + expense.cashflow, childSupport - liabilitiesTotal);
  }

  private _calculateCashflow(session: Session): number {
    if (!session) return 0;

    return session.profession.income.salary + this._calculateIncome(session) - this._calculateExpenses(session);
  }
}
