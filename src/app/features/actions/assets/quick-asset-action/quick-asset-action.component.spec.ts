import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAssetActionComponent } from './quick-asset-action.component';

describe('QuickAssetActionComponent', () => {
  let component: QuickAssetActionComponent;
  let fixture: ComponentFixture<QuickAssetActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAssetActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAssetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
