import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSummaryComponent } from './profession-summary.component';
import { ProfessionForm } from '../../../../shared/models/forms/profession-form';
import { FormGroup, FormControl } from '@angular/forms';

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
    component.form = new FormGroup<ProfessionForm>({
      assets: new FormGroup({
        savings: new FormControl<number>(0)
      }),
      liabilities: new FormGroup({
        homeMortgage: new FormControl<number>(0),
        schoolLoan: new FormControl<number>(0),
        carLoan: new FormControl<number>(0),
        creditCard: new FormControl<number>(0),
        retail: new FormControl<number>(0)
      }),
      name: new FormControl<string>(''),
      income: new FormGroup({
        salary: new FormControl<number>(0)
      }),
      expenses: new FormGroup({
        taxes: new FormControl<number>(0),
        homeMortgage: new FormControl<number>(0),
        schoolLoan: new FormControl<number>(0),
        carLoan: new FormControl<number>(0),
        retail: new FormControl<number>(0),
        creditCard: new FormControl<number>(0),
        other: new FormControl<number>(0),
        childSupport: new FormControl<number>(0)
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
