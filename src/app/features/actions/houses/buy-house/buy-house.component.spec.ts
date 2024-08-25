import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHouseComponent } from './buy-house.component';

describe('BuyHouseComponent', () => {
  let component: BuyHouseComponent;
  let fixture: ComponentFixture<BuyHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
