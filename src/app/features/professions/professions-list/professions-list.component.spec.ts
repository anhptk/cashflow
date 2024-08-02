import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsListComponent } from './professions-list.component';

describe('ProfessionsListComponent', () => {
  let component: ProfessionsListComponent;
  let fixture: ComponentFixture<ProfessionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
