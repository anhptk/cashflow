import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAssetsComponent } from './session-assets.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SessionAssetsComponent', () => {
  let component: SessionAssetsComponent;
  let fixture: ComponentFixture<SessionAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionAssetsComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
