import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsWrapperComponent } from './session-details-wrapper.component';
import { RouterModule } from '@angular/router';

describe('SessionDetailsWrapperComponent', () => {
  let component: SessionDetailsWrapperComponent;
  let fixture: ComponentFixture<SessionDetailsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionDetailsWrapperComponent,
        RouterModule.forRoot([])
      ]
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
