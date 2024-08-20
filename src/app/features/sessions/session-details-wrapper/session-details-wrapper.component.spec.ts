import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsWrapperComponent } from './session-details-wrapper.component';

describe('SessionDetailsWrapperComponent', () => {
  let component: SessionDetailsWrapperComponent;
  let fixture: ComponentFixture<SessionDetailsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDetailsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetailsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
