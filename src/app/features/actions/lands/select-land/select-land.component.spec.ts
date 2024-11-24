import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLandComponent } from './select-land.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SelectLandComponent', () => {
  let component: SelectLandComponent;
  let fixture: ComponentFixture<SelectLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLandComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
