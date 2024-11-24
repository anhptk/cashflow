import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStockComponent } from './sell-stock.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SellStockComponent', () => {
  let component: SellStockComponent;
  let fixture: ComponentFixture<SellStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellStockComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
