import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellGoldComponent } from './sell-gold.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SellGoldComponent', () => {
  let component: SellGoldComponent;
  let fixture: ComponentFixture<SellGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellGoldComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()},
        {provide: ActivatedRoute, useValue: {snapshot: {params: {assetIndex: 0}}}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
