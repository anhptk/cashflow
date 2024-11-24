import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAssetComponent } from './buy-asset.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { FormControl } from '@angular/forms';

describe('BuyAssetComponent', () => {
  let component: BuyAssetComponent;
  let fixture: ComponentFixture<BuyAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyAssetComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyAssetComponent);
    component = fixture.componentInstance;
    component.nameControl = new FormControl<string>('');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
