import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCashAdjustmentComponent } from './session-cash-adjustment.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionCashAdjustmentComponent', () => {
  let component: SessionCashAdjustmentComponent;
  let fixture: ComponentFixture<SessionCashAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCashAdjustmentComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
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
