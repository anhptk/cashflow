import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBusinessComponent } from './sell-business.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';
import { CommonModule } from '@angular/common';

describe('SellBussinessComponent', () => {
  let component: SellBusinessComponent;
  let fixture: ComponentFixture<SellBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SellBusinessComponent,
        CommonModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: SessionStoreService, useValue: new MockSessionStoreService()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
