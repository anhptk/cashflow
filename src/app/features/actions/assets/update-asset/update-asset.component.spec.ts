import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssetComponent } from './update-asset.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('UpdateAssetComponent', () => {
  let component: UpdateAssetComponent;
  let fixture: ComponentFixture<UpdateAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UpdateAssetComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
