import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHouseComponent } from './select-house.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SelectHouseComponent', () => {
  let component: SelectHouseComponent;
  let fixture: ComponentFixture<SelectHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHouseComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
