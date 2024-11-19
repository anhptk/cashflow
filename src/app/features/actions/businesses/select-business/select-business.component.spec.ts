import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBusinessComponent } from './select-business.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SelectBusinessComponent', () => {
  let component: SelectBusinessComponent;
  let fixture: ComponentFixture<SelectBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBusinessComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
