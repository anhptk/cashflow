import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAssetComponent } from './sell-asset.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SellAssetComponent', () => {
  let component: SellAssetComponent;
  let fixture: ComponentFixture<SellAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellAssetComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
