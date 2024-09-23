import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAssetComponent } from './buy-asset.component';

describe('BuyAssetComponent', () => {
  let component: BuyAssetComponent;
  let fixture: ComponentFixture<BuyAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
