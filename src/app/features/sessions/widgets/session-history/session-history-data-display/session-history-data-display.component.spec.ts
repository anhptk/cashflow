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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
