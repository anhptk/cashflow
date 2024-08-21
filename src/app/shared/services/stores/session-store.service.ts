import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SessionState } from '../../models/sessions/session-state';
import { Session, AssetItem, ExpenseItem } from '../../models/database/session.db';
import { SessionService } from '../db/session.service';

@Injectable()
export class SessionStoreService extends ComponentStore<SessionState> {

  constructor(
    private sessionService: SessionService
  ) {
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
      return this._adjustSessionCash(state.profession.income.salary, state.session);
    });
  }

  public downsize(): void {
    this.patchState((state: SessionState) => {
      return this._adjustSessionCash(-state.totalExpenses, state.session);
    });
  }

  public adjustCash(amount: number): void {
    this.patchState((state: SessionState) => {
      return this._adjustSessionCash(amount, state.session);
    });
  }

  private _adjustSessionCash(amount: number, session: Session): Session {
    const newSession = {...session, cash: session.cash += amount};
    this.sessionService.update(newSession);
    return newSession;
  }

  public addChild(): void {
    this.patchState((state: SessionState) => {
      const newSession = {...state.session, children: state.session.children += 1};
      this.sessionService.update(newSession);
      return {
        session: newSession,
        totalExpenses: this._calculateExpenses(newSession),
        cashflow: this._calculateCashflow(newSession)
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
