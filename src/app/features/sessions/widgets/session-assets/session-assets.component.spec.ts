import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAssetsComponent } from './session-assets.component';

describe('SessionAssetsComponent', () => {
  let component: SessionAssetsComponent;
  let fixture: ComponentFixture<SessionAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
