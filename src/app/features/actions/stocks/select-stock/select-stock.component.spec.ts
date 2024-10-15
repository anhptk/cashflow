import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStockComponent } from './select-stock.component';

describe('SelectStockComponent', () => {
  let component: SelectStockComponent;
  let fixture: ComponentFixture<SelectStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
