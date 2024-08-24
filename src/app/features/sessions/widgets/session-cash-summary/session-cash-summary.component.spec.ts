import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCashSummaryComponent } from './session-cash-summary.component';

describe('SessionCashSummaryComponent', () => {
  let component: SessionCashSummaryComponent;
  let fixture: ComponentFixture<SessionCashSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCashSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCashSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
