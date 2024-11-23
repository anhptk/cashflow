import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBusinessComponent } from './buy-business.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('BuyBusinessComponent', () => {
  let component: BuyBusinessComponent;
  let fixture: ComponentFixture<BuyBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyBusinessComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
