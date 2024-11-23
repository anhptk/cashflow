import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitStockComponent } from './split-stock.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { RouterModule } from '@angular/router';

describe('SplitStockComponent', () => {
  let component: SplitStockComponent;
  let fixture: ComponentFixture<SplitStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SplitStockComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
