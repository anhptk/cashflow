import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteWrapperComponent } from './route-wrapper.component';

describe('RouteWrapperComponent', () => {
  let component: RouteWrapperComponent;
  let fixture: ComponentFixture<RouteWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
