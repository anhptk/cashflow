import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHouseComponent } from './sell-house.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { CommonModule } from '@angular/common';

describe('SellHouseComponent', () => {
  let component: SellHouseComponent;
  let fixture: ComponentFixture<SellHouseComponent>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(() => {
    mockActivatedRoute = {snapshot: {params: {assetIndex: 0}}} as unknown as ActivatedRoute;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellHouseComponent,
        CommonModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
