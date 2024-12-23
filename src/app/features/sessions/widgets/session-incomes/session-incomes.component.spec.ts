import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionIncomesComponent } from './session-incomes.component';
import { mockProfession } from '../../../../shared/services/utils/test/mock-profession';

describe('SessionIncomesComponent', () => {
  let component: SessionIncomesComponent;
  let fixture: ComponentFixture<SessionIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionIncomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionIncomesComponent);
    fixture.componentRef.setInput('profession', mockProfession);
    fixture.componentRef.setInput('incomeLiabilities', []);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
