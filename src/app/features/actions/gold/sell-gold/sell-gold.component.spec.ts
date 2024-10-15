import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellGoldComponent } from './sell-gold.component';

describe('SellGoldComponent', () => {
  let component: SellGoldComponent;
  let fixture: ComponentFixture<SellGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellGoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
