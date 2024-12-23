import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHistoryDataDisplayComponent } from './session-history-data-display.component';

describe('SessionHistoryDataDisplayComponent', () => {
  let component: SessionHistoryDataDisplayComponent;
  let fixture: ComponentFixture<SessionHistoryDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistoryDataDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionHistoryDataDisplayComponent);
    fixture.componentRef.setInput('logType', 'Payday');
    fixture.componentRef.setInput('data', { cash: 1000 });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
