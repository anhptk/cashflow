import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellLandComponent } from './sell-land.component';

describe('SellLandComponent', () => {
  let component: SellLandComponent;
  let fixture: ComponentFixture<SellLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
