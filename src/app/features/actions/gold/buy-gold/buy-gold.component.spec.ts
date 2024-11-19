import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoldComponent } from './buy-gold.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('BuyGoldComponent', () => {
  let component: BuyGoldComponent;
  let fixture: ComponentFixture<BuyGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyGoldComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
