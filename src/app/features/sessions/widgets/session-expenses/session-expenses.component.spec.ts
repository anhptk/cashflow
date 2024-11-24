import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpensesComponent } from './session-expenses.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionExpensesComponent', () => {
  let component: SessionExpensesComponent;
  let fixture: ComponentFixture<SessionExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionExpensesComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
