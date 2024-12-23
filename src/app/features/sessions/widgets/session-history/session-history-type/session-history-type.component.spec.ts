import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryTypeComponent } from './session-history-type.component';

describe('SessionHistoryTypeComponent', () => {
  let component: SessionHistoryTypeComponent;
  let fixture: ComponentFixture<SessionHistoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistoryTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionHistoryTypeComponent);
    fixture.componentRef.setInput('logType', 'Payday');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
