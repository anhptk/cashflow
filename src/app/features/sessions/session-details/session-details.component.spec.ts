import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsComponent } from './session-details.component';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../shared/services/utils/test/mock-session-store-service';
import { RouterModule } from '@angular/router';

describe('SessionDetailsComponent', () => {
  let component: SessionDetailsComponent;
  let fixture: ComponentFixture<SessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionDetailsComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
