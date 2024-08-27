import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBusinessComponent } from './buy-business.component';

describe('BuyBusinessComponent', () => {
  let component: BuyBusinessComponent;
  let fixture: ComponentFixture<BuyBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
