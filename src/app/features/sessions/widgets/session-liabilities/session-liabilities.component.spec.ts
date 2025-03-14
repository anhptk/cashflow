import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLiabilitiesComponent } from './session-liabilities.component';

describe('SessionLiabilitiesComponent', () => {
  let component: SessionLiabilitiesComponent;
  let fixture: ComponentFixture<SessionLiabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionLiabilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionLiabilitiesComponent);
    fixture.componentRef.setInput('expenseLiabilities', []);
    fixture.componentRef.setInput('assets', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
