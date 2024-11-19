import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSessionComponent } from './create-new-session.component';
import { RouterModule } from '@angular/router';

describe('CreateNewSessionComponent', () => {
  let component: CreateNewSessionComponent;
  let fixture: ComponentFixture<CreateNewSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateNewSessionComponent,
        RouterModule.forRoot([])
      ]
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
