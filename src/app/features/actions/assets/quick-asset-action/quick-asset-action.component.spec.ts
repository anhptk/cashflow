import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAssetActionComponent } from './quick-asset-action.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('QuickAssetActionComponent', () => {
  let component: QuickAssetActionComponent;
  let fixture: ComponentFixture<QuickAssetActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuickAssetActionComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAssetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
