import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssetComponent } from './select-asset.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
