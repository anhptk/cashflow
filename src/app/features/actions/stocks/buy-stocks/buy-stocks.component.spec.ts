import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStocksComponent } from './buy-stocks.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('BuyStocksComponent', () => {
  let component: BuyStocksComponent;
  let fixture: ComponentFixture<BuyStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyStocksComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
