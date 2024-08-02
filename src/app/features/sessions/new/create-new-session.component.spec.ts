import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSessionComponent } from './create-new-session.component';

describe('CreateNewSessionComponent', () => {
  let component: CreateNewSessionComponent;
  let fixture: ComponentFixture<CreateNewSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
