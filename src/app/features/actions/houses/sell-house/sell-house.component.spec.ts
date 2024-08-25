import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellHouseComponent } from './sell-house.component';

describe('SellHouseComponent', () => {
  let component: SellHouseComponent;
  let fixture: ComponentFixture<SellHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
