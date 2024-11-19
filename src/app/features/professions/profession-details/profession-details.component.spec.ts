import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionDetailsComponent } from './profession-details.component';
import { RouterModule } from '@angular/router';

describe('ProfessionDetailsComponent', () => {
  let component: ProfessionDetailsComponent;
  let fixture: ComponentFixture<ProfessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfessionDetailsComponent,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
