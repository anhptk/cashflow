import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTypesSelectComponent } from './action-types-select.component';
import { RouterModule } from '@angular/router';

describe('ActionTypesSelectComponent', () => {
  let component: ActionTypesSelectComponent;
  let fixture: ComponentFixture<ActionTypesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionTypesSelectComponent,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionTypesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
