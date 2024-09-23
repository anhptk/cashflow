import { Component } from '@angular/core';
import { BuyAssetComponent } from '../../assets/buy-asset/buy-asset.component';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { DEAL_TYPE } from '../../../../shared/constants/deals.enum';

@Component({
  selector: 'app-buy-land',
  standalone: true,
  imports: [
    BuyAssetComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './buy-land.component.html',
  styleUrl: './buy-land.component.scss'
})
export class BuyLandComponent {
  public readonly LAND_TYPE = DEAL_TYPE.LAND;
  public nameControl = new FormControl('', Validators.required);
}
