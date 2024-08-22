import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHeaderComponent } from './session-header.component';

describe('SessionHeaderComponent', () => {
  let component: SessionHeaderComponent;
  let fixture: ComponentFixture<SessionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
