import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpensePayoffComponent } from './session-expense-payoff.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionExpensePayoffComponent', () => {
  let component: SessionExpensePayoffComponent;
  let fixture: ComponentFixture<SessionExpensePayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionExpensePayoffComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
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
