import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDoodadsComponent } from './session-doodads.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionDoodadsComponent', () => {
  let component: SessionDoodadsComponent;
  let fixture: ComponentFixture<SessionDoodadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDoodadsComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDoodadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
