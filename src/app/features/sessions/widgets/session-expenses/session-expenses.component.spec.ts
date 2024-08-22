import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpensesComponent } from './session-expenses.component';

describe('SessionExpensesComponent', () => {
  let component: SessionExpensesComponent;
  let fixture: ComponentFixture<SessionExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
