import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitStockComponent } from './split-stock.component';

describe('SplitStockComponent', () => {
  let component: SplitStockComponent;
  let fixture: ComponentFixture<SplitStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
