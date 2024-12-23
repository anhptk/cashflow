import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellLandComponent } from './sell-land.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { CommonModule } from '@angular/common';

describe('SellLandComponent', () => {
  let component: SellLandComponent;
  let fixture: ComponentFixture<SellLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellLandComponent,
        CommonModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
