import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssetComponent } from './select-asset.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

describe('SelectAssetComponent', () => {
  let component: SelectAssetComponent;
  let fixture: ComponentFixture<SelectAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAssetComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAssetComponent);
    component = fixture.componentInstance;
    component.assetType = DEAL_TYPE.HOUSING;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
