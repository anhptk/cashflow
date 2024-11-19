import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStockComponent } from './select-stock.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SelectStockComponent', () => {
  let component: SelectStockComponent;
  let fixture: ComponentFixture<SelectStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStockComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
