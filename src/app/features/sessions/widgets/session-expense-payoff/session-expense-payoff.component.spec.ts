import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpensePayoffComponent } from './session-expense-payoff.component';

describe('SessionExpensePayoffComponent', () => {
  let component: SessionExpensePayoffComponent;
  let fixture: ComponentFixture<SessionExpensePayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionExpensePayoffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionExpensePayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
