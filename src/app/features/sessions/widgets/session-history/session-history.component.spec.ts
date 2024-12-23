import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryComponent } from './session-history.component';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';

describe('SessionHistoryComponent', () => {
  let component: SessionHistoryComponent;
  let fixture: ComponentFixture<SessionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistoryComponent],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
