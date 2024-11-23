import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCashSummaryComponent } from './session-cash-summary.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionCashSummaryComponent', () => {
  let component: SessionCashSummaryComponent;
  let fixture: ComponentFixture<SessionCashSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCashSummaryComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
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
