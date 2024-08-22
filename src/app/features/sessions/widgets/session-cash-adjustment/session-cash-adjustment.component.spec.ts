import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCashAdjustmentComponent } from './session-cash-adjustment.component';

describe('SessionCashAdjustmentComponent', () => {
  let component: SessionCashAdjustmentComponent;
  let fixture: ComponentFixture<SessionCashAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCashAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCashAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
