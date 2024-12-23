import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLoanPayoffComponent } from './session-loan-payoff.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { RouterModule } from '@angular/router';

describe('SessionLoanPayoffComponent', () => {
  let component: SessionLoanPayoffComponent;
  let fixture: ComponentFixture<SessionLoanPayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionLoanPayoffComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
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
