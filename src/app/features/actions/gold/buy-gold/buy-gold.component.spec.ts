import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoldComponent } from './buy-gold.component';

describe('BuyGoldComponent', () => {
  let component: BuyGoldComponent;
  let fixture: ComponentFixture<BuyGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyGoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
