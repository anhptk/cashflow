import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGoldComponent } from './select-gold.component';
import { SessionStoreService } from '../../../../shared/services/stores/session-store.service';
import { MockSessionStoreService } from '../../../../shared/services/utils/test/mock-session-store-service';

describe('SelectGoldComponent', () => {
  let component: SelectGoldComponent;
  let fixture: ComponentFixture<SelectGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGoldComponent],
      providers: [
        { provide: SessionStoreService, useValue: new MockSessionStoreService() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
