import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTypesSelectComponent } from './action-types-select.component';
import { RouterModule } from '@angular/router';
import { SessionStoreService } from '../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../shared/services/utils/test/mock-session-store-service';

describe('ActionTypesSelectComponent', () => {
  let component: ActionTypesSelectComponent;
  let fixture: ComponentFixture<ActionTypesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionTypesSelectComponent,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTypesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
