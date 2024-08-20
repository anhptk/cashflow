import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session } from '../../models/database/session.db';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor() {
    super(null);
  }

  readonly data$ = this.select({
    profession: this.select(state => state.profession),
    session: this.select(state => state.session),
    totalIncome: this.select(state => this._calculateIncome(state.session)),
    totalExpenses: this.select(state => this._calculateExpenses(state.session)),
    cashflow: this.select(state => state.totalIncome - state.totalExpenses)
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
    return session.income.reduce((acc, income) => acc + income.cashflow, 0);
  }

  private _calculateExpenses(session: Session): number {
    const childSupport = session.profession.expenses.childSupport * session.children;
    return session.expenses.reduce((acc, expense) => acc + expense.cashflow, childSupport);
  }
}
