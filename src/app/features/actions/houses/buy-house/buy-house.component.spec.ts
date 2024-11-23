import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHouseComponent } from './buy-house.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('BuyHouseComponent', () => {
  let component: BuyHouseComponent;
  let fixture: ComponentFixture<BuyHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyHouseComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
