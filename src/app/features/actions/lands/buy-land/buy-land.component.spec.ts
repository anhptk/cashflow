import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLandComponent } from './buy-land.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('BuyLandComponent', () => {
  let component: BuyLandComponent;
  let fixture: ComponentFixture<BuyLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyLandComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
