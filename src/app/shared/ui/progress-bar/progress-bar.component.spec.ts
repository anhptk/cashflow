import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.value()).toBe(0);
    expect(component.maxValue()).toBe(100);
    expect(component.progress()).toBe(0);
    expect(component.completed()).toBeFalse();
  });

  it('should calculate progress correctly', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('maxValue', 200);
    fixture.detectChanges();
    expect(component.progress()).toBe(25);
    expect(component.completed()).toBeFalse();
  });

  it('should determine completion status correctly', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.componentRef.setInput('maxValue', 100);
    fixture.detectChanges();
    expect(component.completed()).toBeTrue();
    expect(component.progress()).toBeGreaterThanOrEqual(100);
  });

  it('should calculate overflow progress correctly', () => {
    fixture.componentRef.setInput('value', 150);
    fixture.componentRef.setInput('maxValue', 100);
    fixture.detectChanges();
    expect(component.completed()).toBeTrue();
    expect(component.progress()).toBeGreaterThanOrEqual(100);
  });
});
