import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoanRequestComponent } from './session-loan-request.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionLoanRequestComponent', () => {
  let component: SessionLoanRequestComponent;
  let fixture: ComponentFixture<SessionLoanRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLoanRequestComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
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
