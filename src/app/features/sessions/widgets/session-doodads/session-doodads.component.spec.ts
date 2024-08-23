import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDoodadsComponent } from './session-doodads.component';

describe('SessionDoodadsComponent', () => {
  let component: SessionDoodadsComponent;
  let fixture: ComponentFixture<SessionDoodadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDoodadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDoodadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
