import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSummaryComponent } from './profession-summary.component';

describe('ProfessionSummaryComponent', () => {
  let component: ProfessionSummaryComponent;
  let fixture: ComponentFixture<ProfessionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
