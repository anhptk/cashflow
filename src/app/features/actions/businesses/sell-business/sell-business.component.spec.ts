import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBusinessComponent } from './sell-business.component';

describe('SellBussinessComponent', () => {
  let component: SellBusinessComponent;
  let fixture: ComponentFixture<SellBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
