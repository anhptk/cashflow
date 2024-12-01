import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionIncomesComponent } from './session-incomes.component';

describe('SessionIncomesComponent', () => {
  let component: SessionIncomesComponent;
  let fixture: ComponentFixture<SessionIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionIncomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
