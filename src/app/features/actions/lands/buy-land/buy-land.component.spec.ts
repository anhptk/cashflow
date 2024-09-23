import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLandComponent } from './buy-land.component';

describe('BuyLandComponent', () => {
  let component: BuyLandComponent;
  let fixture: ComponentFixture<BuyLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
