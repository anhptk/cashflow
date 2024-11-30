import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoanPayoffComponent } from './session-loan-payoff.component';

describe('SessionLoanPayoffComponent', () => {
  let component: SessionLoanPayoffComponent;
  let fixture: ComponentFixture<SessionLoanPayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLoanPayoffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionLoanPayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
