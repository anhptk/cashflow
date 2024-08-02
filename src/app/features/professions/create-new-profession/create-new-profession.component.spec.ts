import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProfessionComponent } from './create-new-profession.component';

describe('CreateNewProfessionComponent', () => {
  let component: CreateNewProfessionComponent;
  let fixture: ComponentFixture<CreateNewProfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewProfessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
