import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHouseComponent } from './sell-house.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SellHouseComponent', () => {
  let component: SellHouseComponent;
  let fixture: ComponentFixture<SellHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellHouseComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
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
