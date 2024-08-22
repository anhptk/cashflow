import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoanRequestComponent } from './session-loan-request.component';

describe('SessionLoanRequestComponent', () => {
  let component: SessionLoanRequestComponent;
  let fixture: ComponentFixture<SessionLoanRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLoanRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
