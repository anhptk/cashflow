import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsListComponent } from './actions-list.component';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../shared/services/utils/test/mock-session-store-service';
import { RouterModule } from '@angular/router';

describe('ActionsListComponent', () => {
  let component: ActionsListComponent;
  let fixture: ComponentFixture<ActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionsListComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
